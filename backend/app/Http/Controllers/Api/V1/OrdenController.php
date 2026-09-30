<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Calificacion;
use App\Models\Cliente;
use App\Models\Cupon;
use App\Models\Direccion;
use App\Models\Empresa;
use App\Models\HistorialEstadoOrden;
use App\Models\Orden;
use App\Models\PrecioAmbienteServicio;
use App\Models\SeleccionAmbienteOrden;
use App\Models\SeleccionExtraOrden;
use App\Models\Servicio;
use App\Models\ServicioExtra;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrdenController extends Controller
{
    /**
     * Listado de órdenes del cliente autenticado
     */
    public function index(Request $request): JsonResponse
    {
        $cliente = Cliente::where('usuario_id', $request->user()->id)->firstOrFail();

        $ordenes = Orden::where('cliente_id', $cliente->id)
            ->with(['servicio', 'empresa', 'trabajador.usuario', 'direccion'])
            ->orderBy('creado_at', 'desc')
            ->get();

        return response()->json([
            'ordenes' => $ordenes,
        ]);
    }

    /**
     * Crear una nueva orden de servicio de limpieza (Solicitud tipo Yango)
     */
    public function store(Request $request): JsonResponse
    {
        $cliente = Cliente::where('usuario_id', $request->user()->id)->firstOrFail();

        $validated = $request->validate([
            'servicio_id' => 'required|uuid|exists:servicios,id',
            'empresa_id' => 'nullable|uuid|exists:empresas,id',
            'direccion_id' => 'required|uuid|exists:direcciones,id',
            'fecha_programada' => 'required|date|after_or_equal:today',
            'hora_programada' => 'required',
            'ambientes' => 'sometimes|array',
            'ambientes.*.ambiente_id' => 'required|uuid|exists:ambientes,id',
            'ambientes.*.cantidad' => 'required|integer|min:1',
            'extras' => 'sometimes|array',
            'extras.*' => 'uuid|exists:servicio_extras,id',
            'cupon_codigo' => 'nullable|string|max:50',
            'observaciones' => 'nullable|string|max:500',
        ]);

        // Verificar que la dirección pertenezca al cliente
        $direccion = Direccion::where('cliente_id', $cliente->id)
            ->where('id', $validated['direccion_id'])
            ->firstOrFail();

        $servicio = Servicio::findOrFail($validated['servicio_id']);

        $orden = DB::transaction(function () use ($validated, $cliente, $servicio) {
            // 1. Calcular subtotal por ambientes
            $subtotalAmbientes = 0;
            $itemsAmbientes = [];

            if (! empty($validated['ambientes'])) {
                foreach ($validated['ambientes'] as $item) {
                    $tarifa = DB::table('precio_ambiente_servicio')
                        ->where('ambiente_id', $item['ambiente_id'])
                        ->where('servicio_id', $servicio->id)
                        ->first();

                    $precioUnitario = $tarifa ? (float) $tarifa->precio_adicional : 15.00;
                    $subtotalAmbientes += $precioUnitario * $item['cantidad'];

                    $itemsAmbientes[] = [
                        'ambiente_id' => $item['ambiente_id'],
                        'cantidad' => $item['cantidad'],
                        'precio_unitario' => $precioUnitario,
                    ];
                }
            }

            // 2. Calcular subtotal por extras
            $subtotalExtras = 0;
            $itemsExtras = [];

            if (! empty($validated['extras'])) {
                $extrasList = ServicioExtra::whereIn('id', $validated['extras'])->get();
                foreach ($extrasList as $extra) {
                    $precioExtra = (float) $extra->precio_adicional;
                    $subtotalExtras += $precioExtra;
                    $itemsExtras[] = [
                        'servicio_extra_id' => $extra->id,
                        'precio' => $precioExtra,
                    ];
                }
            }

            // 3. Montos y traslado
            $precioBase = (float) $servicio->precio_base;
            $montoSubtotal = $precioBase + $subtotalAmbientes + $subtotalExtras;
            $costoTraslado = 15.00;

            // 4. Cupón
            $cuponId = null;
            $montoDescuento = 0.00;

            if (! empty($validated['cupon_codigo'])) {
                $cupon = Cupon::where('codigo', strtoupper(trim($validated['cupon_codigo'])))
                    ->where('esta_activo', true)
                    ->first();

                if ($cupon && $montoSubtotal >= (float) $cupon->compra_minima) {
                    $cuponId = $cupon->id;
                    if ($cupon->tipo_descuento === 'PORCENTAJE') {
                        $montoDescuento = round(($montoSubtotal * (float) $cupon->valor_descuento) / 100, 2);
                    } else {
                        $montoDescuento = min((float) $cupon->valor_descuento, $montoSubtotal);
                    }
                    $cupon->increment('usos_actuales');
                }
            }

            $montoTotal = max(0, round($montoSubtotal + $costoTraslado - $montoDescuento, 2));

            // 5. Empresa de limpieza proveedora (seleccionada por el cliente o asignada activa)
            $empresaId = $validated['empresa_id'] ?? null;
            if (! $empresaId) {
                $empresaDefault = Empresa::where('estado', 'ACTIVA')->first();
                $empresaId = $empresaDefault ? $empresaDefault->id : null;
            }

            // La designación del trabajador es autogestionada por la empresa de limpieza (no delegación ciega)
            $estadoInicial = 'PENDIENTE_ASIGNACION_TRABAJADOR';

            // 6. Generar código de seguimiento único tipo LG-ABC123
            $codigoSeguimiento = 'LG-' . strtoupper(Str::random(6));

            $nuevaOrden = Orden::create([
                'codigo_seguimiento' => $codigoSeguimiento,
                'cliente_id' => $cliente->id,
                'direccion_id' => $validated['direccion_id'],
                'servicio_id' => $servicio->id,
                'empresa_id' => $empresaId,
                'trabajador_id' => null,
                'cupon_id' => $cuponId,
                'estado_actual' => $estadoInicial,
                'fecha_programada' => $validated['fecha_programada'],
                'hora_programada' => $validated['hora_programada'],
                'costo_traslado' => $costoTraslado,
                'monto_subtotal' => $montoSubtotal,
                'monto_descuento' => $montoDescuento,
                'monto_total' => $montoTotal,
                'observaciones' => $validated['observaciones'] ?? null,
                'creado_at' => now(),
            ]);

            // Guardar selección de ambientes
            foreach ($itemsAmbientes as $ia) {
                DB::table('seleccion_ambiente_orden')->insert([
                    'orden_id' => $nuevaOrden->id,
                    'ambiente_id' => $ia['ambiente_id'],
                    'cantidad' => $ia['cantidad'],
                    'precio_unitario_cobrado' => $ia['precio_unitario'],
                ]);
            }

            // Guardar selección de extras
            foreach ($itemsExtras as $ie) {
                DB::table('seleccion_extra_orden')->insert([
                    'orden_id' => $nuevaOrden->id,
                    'servicio_extra_id' => $ie['servicio_extra_id'],
                    'precio_cobrado' => $ie['precio'],
                ]);
            }

            // Registrar primer hito en el historial de estados
            DB::table('historial_estado_orden')->insert([
                'id' => (string) Str::uuid(),
                'orden_id' => $nuevaOrden->id,
                'modificado_por' => $cliente->usuario_id,
                'estado_anterior' => null,
                'estado_nuevo' => 'CREADA',
                'comentario' => 'Solicitud de servicio creada por el cliente desde la app.',
                'fecha_cambio' => now(),
            ]);

            return $nuevaOrden;
        });

        return response()->json([
            'mensaje' => '¡Tu orden de limpieza fue creada con éxito!',
            'orden' => $orden->load(['servicio', 'empresa', 'direccion']),
        ], 201);
    }

    /**
     * Seguimiento de orden en tiempo real (Tracking estilo Yango)
     */
    public function show(Request $request, string $codigoSeguimiento): JsonResponse
    {
        $orden = Orden::where('codigo_seguimiento', strtoupper($codigoSeguimiento))
            ->with([
                'servicio',
                'empresa',
                'trabajador.usuario',
                'direccion',
                'evidencias',
                'calificacion',
            ])
            ->firstOrFail();

        // Obtener historial cronológico de estados
        $historial = DB::table('historial_estado_orden')
            ->where('orden_id', $orden->id)
            ->orderBy('fecha_cambio', 'asc')
            ->get();

        // Ambientes contratados
        $ambientes = DB::table('seleccion_ambiente_orden')
            ->join('ambientes', 'seleccion_ambiente_orden.ambiente_id', '=', 'ambientes.id')
            ->where('seleccion_ambiente_orden.orden_id', $orden->id)
            ->select(
                'ambientes.nombre',
                'seleccion_ambiente_orden.cantidad',
                'seleccion_ambiente_orden.precio_unitario_cobrado'
            )
            ->get();

        // Extras contratados
        $extras = DB::table('seleccion_extra_orden')
            ->join('servicio_extras', 'seleccion_extra_orden.servicio_extra_id', '=', 'servicio_extras.id')
            ->where('seleccion_extra_orden.orden_id', $orden->id)
            ->select('servicio_extras.nombre', 'seleccion_extra_orden.precio_cobrado')
            ->get();

        return response()->json([
            'orden' => $orden,
            'ambientes' => $ambientes,
            'extras' => $extras,
            'historial_estados' => $historial,
            'trabajador_info' => $orden->trabajador ? [
                'documento_identidad' => $orden->trabajador->documento_identidad,
                'telefono' => $orden->trabajador->telefono,
                'foto_url' => $orden->trabajador->foto_url,
                'calificacion_promedio' => $orden->trabajador->calificacion_promedio,
                'correo' => $orden->trabajador->usuario?->correo,
            ] : null,
        ]);
    }

    /**
     * Calificar servicio completado (1 a 5 estrellas)
     */
    public function calificar(Request $request, string $codigoSeguimiento): JsonResponse
    {
        $cliente = Cliente::where('usuario_id', $request->user()->id)->firstOrFail();
        $orden = Orden::where('codigo_seguimiento', strtoupper($codigoSeguimiento))
            ->where('cliente_id', $cliente->id)
            ->firstOrFail();

        if (! $orden->trabajador_id) {
            return response()->json([
                'mensaje' => 'Esta orden no tiene un trabajador asignado para calificar.',
            ], 422);
        }

        $validated = $request->validate([
            'estrellas' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string|max:500',
        ]);

        $calificacion = Calificacion::create([
            'orden_id' => $orden->id,
            'cliente_id' => $cliente->id,
            'trabajador_id' => $orden->trabajador_id,
            'estrellas' => $validated['estrellas'],
            'comentario' => $validated['comentario'] ?? null,
            'creado_at' => now(),
        ]);

        // Actualizar promedio del trabajador
        $nuevoPromedio = Calificacion::where('trabajador_id', $orden->trabajador_id)->avg('estrellas');
        $orden->trabajador->update([
            'calificacion_promedio' => round($nuevoPromedio, 2),
        ]);

        return response()->json([
            'mensaje' => '¡Gracias por calificar el servicio!',
            'calificacion' => $calificacion,
        ], 201);
    }

    /**
     * Designación manual y autogestionada del trabajador por parte de la empresa de limpieza
     */
    public function asignarTrabajador(Request $request, string $codigoSeguimiento): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validate([
            'trabajador_id' => 'required|uuid|exists:trabajadores,id',
        ]);

        $orden = Orden::where('codigo_seguimiento', $codigoSeguimiento)->firstOrFail();

        // Validar permisos: usuario de empresa solo gestiona sus propias órdenes
        if ($user && $user->isEmpresaUser() && $user->empresa_id !== $orden->empresa_id) {
            return response()->json(['message' => 'No autorizado para gestionar órdenes de otra empresa'], 403);
        }

        // Validar que el trabajador pertenezca a la empresa de la orden
        $trabajador = \App\Models\Trabajador::findOrFail($validated['trabajador_id']);
        if ($orden->empresa_id && $trabajador->empresa_id !== $orden->empresa_id) {
            return response()->json(['message' => 'El trabajador no pertenece a la empresa designada'], 422);
        }

        $estadoAnterior = $orden->estado_actual;
        $orden->update([
            'trabajador_id' => $trabajador->id,
            'estado_actual' => 'TRABAJADOR_ASIGNADO',
        ]);

        DB::table('historial_estado_orden')->insert([
            'id' => (string) Str::uuid(),
            'orden_id' => $orden->id,
            'estado_anterior' => $estadoAnterior,
            'estado_nuevo' => 'TRABAJADOR_ASIGNADO',
            'cambiado_por_usuario_id' => $user ? $user->id : null,
            'comentario' => 'Trabajador designado por la empresa de limpieza',
            'creado_at' => now(),
        ]);

        return response()->json([
            'mensaje' => 'Trabajador designado con éxito por la empresa',
            'orden' => $orden->fresh(['trabajador.usuario', 'empresa', 'servicio', 'direccion']),
        ]);
    }

    /**
     * Stream en tiempo real sin consumo excesivo (Server-Sent Events / SSE)
     * Permite al frontend y a la app móvil actualizar el estado de la orden
     * al milisegundo sin necesidad de oprimir F5.
     */
    public function streamOrden(Request $request, string $codigoSeguimiento)
    {
        $orden = Orden::where('codigo_seguimiento', strtoupper($codigoSeguimiento))
            ->with(['servicio', 'empresa', 'trabajador.usuario', 'direccion'])
            ->first();

        if (! $orden) {
            return response()->json(['message' => 'Orden no encontrada'], 404);
        }

        return response()->stream(function () use ($orden) {
            $lastState = null;
            $lastWorker = null;
            $startTime = time();

            // Ejecuta hasta 25 segundos y luego cierra el stream para que el cliente reconecte limpiamente
            while (time() - $startTime < 25) {
                $current = Orden::where('id', $orden->id)
                    ->with(['servicio', 'empresa', 'trabajador.usuario', 'direccion', 'evidencias'])
                    ->first();

                if (! $current) {
                    break;
                }

                $stateChanged = ($current->estado_actual !== $lastState);
                $workerChanged = ($current->trabajador_id !== $lastWorker);

                if ($stateChanged || $workerChanged) {
                    $lastState = $current->estado_actual;
                    $lastWorker = $current->trabajador_id;

                    $payload = json_encode([
                        'event' => 'order_updated',
                        'timestamp' => now()->toIso8601String(),
                        'orden' => $current,
                        'trabajador_info' => $current->trabajador ? [
                            'nombre' => $current->trabajador->usuario ? ($current->trabajador->usuario->nombres . ' ' . $current->trabajador->usuario->apellidos) : 'Personal de Limpieza',
                            'telefono' => $current->trabajador->telefono ?? '76098234',
                            'foto_url' => $current->trabajador->foto_url,
                            'calificacion' => $current->trabajador->calificacion_promedio ?? 4.9,
                            'empresa' => $current->empresa?->nombre_comercial,
                        ] : null,
                        'evidencias' => $current->evidencias,
                    ]);

                    echo "data: {$payload}\n\n";
                    if (ob_get_level() > 0) {
                        ob_flush();
                    }
                    flush();
                }

                // Heartbeat silencioso y ultra bajo consumo
                usleep(1200000); // 1.2 segundos entre chequeos
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no',
        ]);
    }
}

