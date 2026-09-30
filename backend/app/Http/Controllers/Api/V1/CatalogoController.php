<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Ambiente;
use App\Models\Cupon;
use App\Models\Servicio;
use App\Models\ServicioExtra;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CatalogoController extends Controller
{
    /**
     * Listado de tipos de servicios principales (Limpieza General, Profunda, etc.)
     */
    public function servicios(): JsonResponse
    {
        $servicios = Servicio::where('esta_activo', true)->get()->map(function ($s) {
            $data = $s->toArray();
            $data['imagen_url'] = $s->icono_url ?: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80';
            return $data;
        });

        return response()->json([
            'servicios' => $servicios,
        ]);
    }

    /**
     * Listado de Empresas Aliadas verificadas (Estilo PedidosYa / Marketplace de Limpieza)
     */
    public function empresas(): JsonResponse
    {
        $empresas = \App\Models\Empresa::where('estado', 'ACTIVA')
            ->with(['servicios' => function ($q) {
                $q->where('servicio_empresas.esta_disponible', true);
            }, 'trabajadores' => function ($q) {
                $q->where('esta_disponible', true)->where('estado', 'ACTIVO');
            }])
            ->get()
            ->map(function ($empresa) {
                $trabajadoresCount = $empresa->trabajadores->count();
                $califPromedio = $empresa->trabajadores->avg('calificacion_promedio') ?: 4.85;

                return [
                    'id' => $empresa->id,
                    'nombre_comercial' => $empresa->nombre_comercial,
                    'logo_url' => $empresa->logo_url ?: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
                    'telefono' => $empresa->telefono,
                    'correo' => $empresa->correo,
                    'direccion' => $empresa->direccion,
                    'porcentaje_comision' => $empresa->porcentaje_comision,
                    'calificacion' => number_format($califPromedio, 1),
                    'total_resenas' => 120 + ($trabajadoresCount * 25),
                    'tiempo_llegada_minutos' => rand(12, 25),
                    'tiempo_estimado' => '15-25 min',
                    'insumos_incluidos' => true,
                    'es_verificada' => true,
                    'trabajadores_disponibles' => $trabajadoresCount,
                    'servicios' => $empresa->servicios->map(function ($s) {
                        $img = $s->pivot->imagen_url ?: $s->icono_url ?: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80';
                        return [
                            'id' => $s->id,
                            'nombre' => $s->nombre,
                            'descripcion' => $s->descripcion,
                            'precio' => $s->pivot->precio_personalizado ?: $s->precio_base,
                            'duracion_minutos' => $s->duracion_estimada_minutos,
                            'imagen_url' => $img,
                            'icono_url' => $img,
                        ];
                    }),
                ];
            });

        return response()->json([
            'empresas' => $empresas,
        ]);
    }

    /**
     * Listado de ambientes con sus tarifas unitarias (baños, dormitorios, cocina, etc.)
     */
    public function ambientes(Request $request): JsonResponse
    {
        $servicioId = $request->query('servicio_id');

        if ($servicioId) {
            $ambientes = DB::table('ambientes')
                ->leftJoin('precio_ambiente_servicio', function ($join) use ($servicioId) {
                    $join->on('ambientes.id', '=', 'precio_ambiente_servicio.ambiente_id')
                        ->where('precio_ambiente_servicio.servicio_id', '=', $servicioId);
                })
                ->where('ambientes.esta_activo', true)
                ->select(
                    'ambientes.id',
                    'ambientes.nombre',
                    'ambientes.descripcion',
                    'ambientes.icono_url',
                    DB::raw('COALESCE(precio_ambiente_servicio.precio_adicional, 15.00) as precio_unitario'),
                    DB::raw('COALESCE(precio_ambiente_servicio.tiempo_estimado_minutos, 25) as tiempo_estimado_minutos')
                )
                ->get();
        } else {
            $ambientes = Ambiente::where('esta_activo', true)->get();
        }

        return response()->json([
            'ambientes' => $ambientes,
        ]);
    }

    /**
     * Listado de servicios extras (horno, heladera, planchado)
     */
    public function extras(Request $request): JsonResponse
    {
        $query = ServicioExtra::query();

        if ($request->has('servicio_id')) {
            $query->where('servicio_id', $request->query('servicio_id'));
        }

        $extras = $query->get();

        return response()->json([
            'extras' => $extras,
        ]);
    }

    /**
     * Motor de Cotización Dinámica en Tiempo Real (Estilo Yango)
     */
    public function cotizar(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'servicio_id' => 'required|uuid|exists:servicios,id',
            'ambientes' => 'sometimes|array',
            'ambientes.*.ambiente_id' => 'required|uuid|exists:ambientes,id',
            'ambientes.*.cantidad' => 'required|integer|min:0|max:20',
            'extras' => 'sometimes|array',
            'extras.*' => 'uuid|exists:servicio_extras,id',
            'cupon_codigo' => 'nullable|string|max:50',
        ]);

        $servicio = Servicio::findOrFail($validated['servicio_id']);
        $duracionTotal = $servicio->duracion_estimada_minutos;

        // 1. Cálculo de ambientes
        $subtotalAmbientes = 0;
        $desgloseAmbientes = [];

        if (! empty($validated['ambientes'])) {
            foreach ($validated['ambientes'] as $item) {
                if ($item['cantidad'] <= 0) continue;

                $ambiente = Ambiente::find($item['ambiente_id']);
                $tarifa = DB::table('precio_ambiente_servicio')
                    ->where('ambiente_id', $item['ambiente_id'])
                    ->where('servicio_id', $servicio->id)
                    ->first();

                $precioUnitario = $tarifa ? (float) $tarifa->precio_adicional : 15.00;
                $tiempoMinutos = $tarifa ? (int) $tarifa->tiempo_estimado_minutos : 25;

                $subtotalItem = $precioUnitario * $item['cantidad'];
                $subtotalAmbientes += $subtotalItem;
                $duracionTotal += ($tiempoMinutos * $item['cantidad']);

                $desgloseAmbientes[] = [
                    'ambiente_id' => $ambiente->id,
                    'nombre' => $ambiente->nombre,
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $precioUnitario,
                    'subtotal' => $subtotalItem,
                ];
            }
        }

        // 2. Cálculo de extras
        $subtotalExtras = 0;
        $desgloseExtras = [];

        if (! empty($validated['extras'])) {
            $extrasList = ServicioExtra::whereIn('id', $validated['extras'])->get();
            foreach ($extrasList as $extra) {
                $subtotalExtras += (float) $extra->precio_adicional;
                $duracionTotal += 30; // 30 min por extra aproximado

                $desgloseExtras[] = [
                    'extra_id' => $extra->id,
                    'nombre' => $extra->nombre,
                    'precio' => (float) $extra->precio_adicional,
                ];
            }
        }

        // 3. Montos y traslado
        $precioBase = (float) $servicio->precio_base;
        $montoSubtotal = $precioBase + $subtotalAmbientes + $subtotalExtras;
        $costoTraslado = 15.00; // Tarifa fija estándar de desplazamiento de equipo

        // 4. Validación de cupón de descuento
        $montoDescuento = 0.00;
        $cuponInfo = null;

        if (! empty($validated['cupon_codigo'])) {
            $codigo = strtoupper(trim($validated['cupon_codigo']));
            $cupon = Cupon::where('codigo', $codigo)
                ->where('esta_activo', true)
                ->first();

            if ($cupon) {
                $valido = true;
                if ($cupon->expira_at && now()->gt($cupon->expira_at)) {
                    $valido = false;
                }
                if ($cupon->limite_usos && $cupon->usos_actuales >= $cupon->limite_usos) {
                    $valido = false;
                }
                if ($montoSubtotal < (float) $cupon->compra_minima) {
                    $valido = false;
                }

                if ($valido) {
                    if ($cupon->tipo_descuento === 'PORCENTAJE') {
                        $montoDescuento = round(($montoSubtotal * (float) $cupon->valor_descuento) / 100, 2);
                    } else {
                        $montoDescuento = min((float) $cupon->valor_descuento, $montoSubtotal);
                    }

                    $cuponInfo = [
                        'id' => $cupon->id,
                        'codigo' => $cupon->codigo,
                        'tipo_descuento' => $cupon->tipo_descuento,
                        'valor' => (float) $cupon->valor_descuento,
                        'ahorro' => $montoDescuento,
                    ];
                }
            }
        }

        $montoTotal = max(0, round($montoSubtotal + $costoTraslado - $montoDescuento, 2));

        return response()->json([
            'servicio' => [
                'id' => $servicio->id,
                'nombre' => $servicio->nombre,
                'precio_base' => $precioBase,
            ],
            'desglose_ambientes' => $desgloseAmbientes,
            'desglose_extras' => $desgloseExtras,
            'costos' => [
                'precio_base' => $precioBase,
                'subtotal_ambientes' => round($subtotalAmbientes, 2),
                'subtotal_extras' => round($subtotalExtras, 2),
                'monto_subtotal' => round($montoSubtotal, 2),
                'costo_traslado' => round($costoTraslado, 2),
                'monto_descuento' => round($montoDescuento, 2),
                'monto_total' => $montoTotal,
                'moneda' => 'BOB', // Bolivianos
            ],
            'tiempo_estimado_minutos' => $duracionTotal,
            'tiempo_estimado_formateado' => sprintf('%dh %02dmin', floor($duracionTotal / 60), $duracionTotal % 60),
            'cupon_aplicado' => $cuponInfo,
        ]);
    }
}
