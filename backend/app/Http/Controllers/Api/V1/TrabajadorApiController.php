<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Evidencia;
use App\Models\HistorialEstadoOrden;
use App\Models\Orden;
use App\Models\Trabajador;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TrabajadorApiController extends Controller
{
    /**
     * Obtener el perfil del trabajador autenticado
     */
    private function getTrabajador(Request $request): Trabajador
    {
        return Trabajador::where('usuario_id', $request->user()->id)->firstOrFail();
    }

    /**
     * Listado de órdenes asignadas al trabajador
     */
    public function misOrdenes(Request $request): JsonResponse
    {
        $trabajador = $this->getTrabajador($request);

        $ordenes = Orden::where('trabajador_id', $trabajador->id)
            ->with(['servicio', 'direccion', 'cliente', 'evidencias'])
            ->orderBy('creado_at', 'desc')
            ->get();

        return response()->json([
            'trabajador' => [
                'id' => $trabajador->id,
                'calificacion_promedio' => $trabajador->calificacion_promedio,
                'esta_disponible' => $trabajador->esta_disponible,
            ],
            'ordenes' => $ordenes,
        ]);
    }

    /**
     * Actualizar estado de una orden asignada (Flujo tipo Yango de limpiador)
     */
    public function cambiarEstado(Request $request, string $codigoSeguimiento): JsonResponse
    {
        $trabajador = $this->getTrabajador($request);

        $orden = Orden::where('codigo_seguimiento', strtoupper($codigoSeguimiento))
            ->where('trabajador_id', $trabajador->id)
            ->firstOrFail();

        $validated = $request->validate([
            'estado_nuevo' => 'required|string|in:EN_CAMINO,LLEGUE,EN_PROCESO,FINALIZADA_CON_EVIDENCIA,COMPLETADA',
            'comentario' => 'nullable|string|max:255',
        ]);

        $estadoAnterior = $orden->estado_actual;
        $estadoNuevo = $validated['estado_nuevo'];

        DB::transaction(function () use ($orden, $trabajador, $estadoAnterior, $estadoNuevo, $validated) {
            $orden->update([
                'estado_actual' => $estadoNuevo,
                'iniciado_at' => ($estadoNuevo === 'EN_PROCESO' && ! $orden->iniciado_at) ? now() : $orden->iniciado_at,
                'finalizado_at' => (in_array($estadoNuevo, ['FINALIZADA_CON_EVIDENCIA', 'COMPLETADA'])) ? now() : $orden->finalizado_at,
            ]);

            DB::table('historial_estado_orden')->insert([
                'id' => (string) Str::uuid(),
                'orden_id' => $orden->id,
                'modificado_por' => $trabajador->usuario_id,
                'estado_anterior' => $estadoAnterior,
                'estado_nuevo' => $estadoNuevo,
                'comentario' => $validated['comentario'] ?? "Estado actualizado a {$estadoNuevo} por el trabajador.",
                'fecha_cambio' => now(),
            ]);
        });

        return response()->json([
            'mensaje' => "Estado de la orden actualizado a {$estadoNuevo}",
            'orden' => $orden->fresh(['servicio', 'direccion', 'cliente']),
        ]);
    }

    /**
     * Subir evidencia fotográfica del servicio (Antes y Después)
     */
    public function subirEvidencia(Request $request, string $codigoSeguimiento): JsonResponse
    {
        $trabajador = $this->getTrabajador($request);

        $orden = Orden::where('codigo_seguimiento', strtoupper($codigoSeguimiento))
            ->where('trabajador_id', $trabajador->id)
            ->firstOrFail();

        $validated = $request->validate([
            'url_archivo' => 'required|string',
            'codigo_archivo' => 'required|string|in:ANTES,DESPUES',
        ]);

        $evidencia = Evidencia::create([
            'orden_id' => $orden->id,
            'trabajador_id' => $trabajador->id,
            'codigo_archivo' => $validated['codigo_archivo'],
            'url_archivo' => $validated['url_archivo'],
            'estado' => 'ACTIVA',
            'subido_at' => now(),
        ]);

        return response()->json([
            'mensaje' => 'Evidencia fotográfica registrada exitosamente',
            'evidencia' => $evidencia,
        ], 201);
    }
}
