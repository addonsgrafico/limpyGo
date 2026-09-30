<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\Direccion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DireccionController extends Controller
{
    /**
     * Listado de direcciones del cliente autenticado
     */
    public function index(Request $request): JsonResponse
    {
        $cliente = Cliente::where('usuario_id', $request->user()->id)->firstOrFail();
        $direcciones = Direccion::where('cliente_id', $cliente->id)->get();

        return response()->json([
            'direcciones' => $direcciones,
        ]);
    }

    /**
     * Guardar una nueva dirección
     */
    public function store(Request $request): JsonResponse
    {
        $cliente = Cliente::where('usuario_id', $request->user()->id)->firstOrFail();

        $validated = $request->validate([
            'alias' => 'nullable|string|max:50',
            'direccion_completa' => 'required|string',
            'numero_departamento' => 'nullable|string|max:20',
            'referencia' => 'nullable|string',
            'ciudad' => 'nullable|string|max:100',
            'latitud' => 'nullable|numeric',
            'longitud' => 'nullable|numeric',
            'es_predeterminada' => 'boolean',
        ]);

        if (! empty($validated['es_predeterminada'])) {
            Direccion::where('cliente_id', $cliente->id)->update(['es_predeterminada' => false]);
        }

        $direccion = Direccion::create(array_merge($validated, [
            'cliente_id' => $cliente->id,
            'ciudad' => $validated['ciudad'] ?? 'Santa Cruz de la Sierra',
        ]));

        return response()->json([
            'mensaje' => 'Dirección guardada exitosamente',
            'direccion' => $direccion,
        ], 201);
    }

    /**
     * Eliminar una dirección
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $cliente = Cliente::where('usuario_id', $request->user()->id)->firstOrFail();
        $direccion = Direccion::where('cliente_id', $cliente->id)->where('id', $id)->firstOrFail();

        $direccion->delete();

        return response()->json([
            'mensaje' => 'Dirección eliminada correctamente',
        ]);
    }
}
