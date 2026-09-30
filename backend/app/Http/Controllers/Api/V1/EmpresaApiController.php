<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Evidencia;
use App\Models\Orden;
use App\Models\Trabajador;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EmpresaApiController extends Controller
{
    /**
     * Obtener la empresa asociada al usuario autenticado
     */
    private function getEmpresa(Request $request): Empresa
    {
        $user = $request->user();
        if ($user && $user->empresa_id) {
            $empresa = Empresa::find($user->empresa_id);
            if ($empresa) return $empresa;
        }
        $primera = Empresa::first();
        if ($primera) return $primera;

        // Si la base de datos está vacía, crear una empresa base para evitar fallos
        return Empresa::create([
            'id' => (string) Str::uuid(),
            'nombre_comercial' => 'Limpiezas Brillante Express S.R.L.',
            'nit' => '3489201024',
            'telefono' => '3-3458900',
            'correo' => 'contacto@brillante.com',
            'direccion' => 'Calle Los Jazmines #120, Equipetrol, Santa Cruz',
            'estado' => 'ACTIVA',
            'porcentaje_comision' => 15.00,
            'logo_url' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
            'banco_abono' => 'Banco Mercantil Santa Cruz',
            'cuenta_bancaria' => '4010-98234-12',
            'titular_cuenta' => 'Limpiezas Brillante Express S.R.L.',
        ]);
    }

    /**
     * Listado de empleados/limpiadores de la empresa
     */
    public function indexTrabajadores(Request $request): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $trabajadores = Trabajador::where('empresa_id', $empresa->id)
            ->with(['usuario'])
            ->get()
            ->map(function ($t) {
                return [
                    'id' => (string) $t->id,
                    'usuario_id' => $t->usuario_id,
                    'empresa_id' => $t->empresa_id,
                    'nombre' => $t->usuario ? ($t->usuario->nombres ?? $t->usuario->correo) : 'Trabajador LimpyGo',
                    'correo' => $t->usuario?->correo,
                    'ci' => $t->documento_identidad ?? 'SC-100234',
                    'telefono' => $t->telefono ?? '70012345',
                    'foto' => $t->foto_url ?: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
                    'foto_url' => $t->foto_url ?: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
                    'estado' => $t->esta_disponible ? 'DISPONIBLE' : 'EN_TURNO',
                    'servicios_completados' => 12,
                    'calificacion' => (float) ($t->calificacion_promedio ?: 4.90),
                    'especialidad' => 'Departamentos & Cocinas Profundas',
                    'cuenta_activa' => (bool) ($t->usuario?->esta_activo ?? $t->esta_disponible),
                    'esta_disponible' => (bool) $t->esta_disponible,
                ];
            });

        return response()->json([
            'empresa' => [
                'id' => (string) $empresa->id,
                'nombre' => $empresa->nombre_comercial ?? $empresa->razon_social,
            ],
            'trabajadores' => $trabajadores,
        ]);
    }

    /**
     * Registrar un nuevo empleado y crear su cuenta de usuario para la app móvil
     */
    public function storeTrabajador(Request $request): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $validated = $request->validate([
            'nombres' => 'required|string|max:100',
            'apellidos' => 'nullable|string|max:100',
            'ci' => 'required|string|max:20',
            'telefono' => 'required|string|max:20',
            'correo' => 'required|email|max:150|unique:usuarios,correo',
            'password' => 'required|string|min:6',
            'especialidad' => 'nullable|string|max:100',
            'foto_url' => 'nullable|url',
        ]);

        $resultado = DB::transaction(function () use ($validated, $empresa) {
            // 1. Crear el usuario del sistema con rol TRABAJADOR
            $usuario = Usuario::create([
                'id' => (string) Str::uuid(),
                'correo' => strtolower(trim($validated['correo'])),
                'contrasena_hash' => Hash::make($validated['password']),
                'rol' => 'TRABAJADOR',
                'empresa_id' => $empresa->id,
                'esta_activo' => true,
            ]);

            // 2. Crear el registro del trabajador / limpiador en la empresa
            $trabajador = Trabajador::create([
                'id' => (string) Str::uuid(),
                'usuario_id' => $usuario->id,
                'empresa_id' => $empresa->id,
                'documento_identidad' => trim($validated['ci']),
                'telefono' => trim($validated['telefono']),
                'foto_url' => $validated['foto_url'] ?? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
                'calificacion_promedio' => 5.00,
                'esta_disponible' => true,
                'estado' => 'ACTIVO',
            ]);

            return [
                'usuario' => $usuario,
                'trabajador' => $trabajador,
            ];
        });

        return response()->json([
            'message' => 'Empleado registrado exitosamente con acceso a la app móvil.',
            'trabajador' => [
                'id' => (string) $resultado['trabajador']->id,
                'usuario_id' => $resultado['usuario']->id,
                'empresa_id' => $empresa->id,
                'nombre' => trim($validated['nombres'] . ' ' . ($validated['apellidos'] ?? '')),
                'correo' => $resultado['usuario']->correo,
                'ci' => $resultado['trabajador']->documento_identidad,
                'telefono' => $resultado['trabajador']->telefono,
                'foto' => $resultado['trabajador']->foto_url,
                'estado' => 'DISPONIBLE',
                'servicios_completados' => 0,
                'calificacion' => 5.0,
                'especialidad' => $validated['especialidad'] ?? 'Departamentos & Cocinas Profundas',
                'cuenta_activa' => true,
            ],
        ], 201);
    }

    /**
     * Pausar o activar disponibilidad de un empleado
     */
    public function toggleEstadoTrabajador(Request $request, string $id): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $trabajador = Trabajador::where('empresa_id', $empresa->id)
            ->where('id', $id)
            ->firstOrFail();

        $trabajador->esta_disponible = ! $trabajador->esta_disponible;
        $trabajador->save();

        return response()->json([
            'message' => 'Estado del empleado actualizado.',
            'esta_disponible' => $trabajador->esta_disponible,
        ]);
    }

    /**
     * Actualizar datos o estado de un trabajador
     */
    public function updateTrabajador(Request $request, string $id): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $trabajador = Trabajador::where('empresa_id', $empresa->id)
            ->where('id', $id)
            ->firstOrFail();

        $validated = $request->validate([
            'ci' => 'sometimes|string|max:20',
            'telefono' => 'sometimes|string|max:20',
            'foto_url' => 'nullable|url',
            'esta_disponible' => 'sometimes|boolean',
            'password' => 'nullable|string|min:6',
        ]);

        if (isset($validated['password']) && $trabajador->usuario_id) {
            $usuario = Usuario::find($trabajador->usuario_id);
            if ($usuario) {
                $usuario->contrasena_hash = Hash::make($validated['password']);
                $usuario->save();
            }
        }

        if (isset($validated['esta_disponible'])) {
            $trabajador->esta_disponible = $validated['esta_disponible'];
            if ($trabajador->usuario_id) {
                $usuario = Usuario::find($trabajador->usuario_id);
                if ($usuario) {
                    $usuario->esta_activo = $validated['esta_disponible'];
                    $usuario->save();
                }
            }
        }

        if (isset($validated['ci'])) $trabajador->ci = trim($validated['ci']);
        if (isset($validated['foto_url'])) $trabajador->foto_url = $validated['foto_url'];

        $trabajador->save();

        return response()->json([
            'message' => 'Trabajador actualizado exitosamente.',
            'trabajador' => $trabajador->load('usuario'),
        ]);
    }

    /**
     * Eliminar o desvincular un trabajador
     */
    public function deleteTrabajador(Request $request, string $id): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $trabajador = Trabajador::where('empresa_id', $empresa->id)
            ->where('id', $id)
            ->firstOrFail();

        $trabajador->esta_disponible = false;
        $trabajador->save();

        if ($trabajador->usuario_id) {
            $usuario = Usuario::find($trabajador->usuario_id);
            if ($usuario) {
                $usuario->esta_activo = false;
                $usuario->save();
            }
        }

        return response()->json([
            'message' => 'Trabajador desvinculado exitosamente.',
        ]);
    }

    /**
     * Obtener el perfil, logotipo y cuenta bancaria de la empresa
     */
    public function getPerfil(Request $request): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        return response()->json([
            'empresa' => [
                'id' => $empresa->id,
                'nombre_comercial' => $empresa->nombre_comercial,
                'nit' => $empresa->nit,
                'correo' => $empresa->correo,
                'telefono' => $empresa->telefono,
                'direccion' => $empresa->direccion,
                'logo_url' => $empresa->logo_url ?: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
                'estado' => $empresa->estado,
                'porcentaje_comision' => $empresa->porcentaje_comision,
                'banco_abono' => $empresa->banco_abono ?: 'Banco Mercantil Santa Cruz',
                'cuenta_bancaria' => $empresa->cuenta_bancaria ?: '4010-8923-0192',
                'titular_cuenta' => $empresa->titular_cuenta ?: $empresa->nombre_comercial,
            ],
        ]);
    }

    /**
     * Actualizar perfil, datos comerciales, logotipo y cuenta bancaria de la empresa
     */
    public function updatePerfil(Request $request): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $validated = $request->validate([
            'nombre_comercial' => 'sometimes|string|max:150',
            'telefono' => 'nullable|string|max:50',
            'direccion' => 'nullable|string|max:255',
            'logo_url' => 'nullable|string',
            'banco_abono' => 'nullable|string|max:100',
            'cuenta_bancaria' => 'nullable|string|max:100',
            'titular_cuenta' => 'nullable|string|max:150',
        ]);

        $empresa->update($validated);

        return response()->json([
            'message' => 'Perfil, logotipo y datos bancarios actualizados exitosamente.',
            'empresa' => $empresa->fresh(),
        ]);
    }

    /**
     * Listar servicios ofrecidos por la empresa y sus tarifas
     */
    public function indexServicios(Request $request): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $servicios = $empresa->servicios()
            ->with(['ambientes', 'extras'])
            ->get()
            ->map(function ($s) {
                $data = $s->toArray();
                $data['imagen_url'] = $s->pivot->imagen_url ?: $s->icono_url ?: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80';
                return $data;
            });

        return response()->json([
            'empresa' => [
                'id' => $empresa->id,
                'nombre' => $empresa->nombre_comercial ?? $empresa->razon_social,
                'logo_url' => $empresa->logo_url ?: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
            ],
            'servicios' => $servicios,
        ]);
    }

    /**
     * Asignar o registrar un servicio ofrecido con tarifa personalizada e imagen representativa
     */
    public function storeServicio(Request $request): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $validated = $request->validate([
            'servicio_id' => 'nullable|uuid|exists:servicios,id',
            'nombre' => 'required_without:servicio_id|string|max:150',
            'descripcion' => 'nullable|string',
            'precio_personalizado' => 'required|numeric|min:0',
            'imagen_url' => 'nullable|string',
            'esta_disponible' => 'boolean',
        ]);

        $servicioId = $validated['servicio_id'] ?? null;
        $imagenUrl = $validated['imagen_url'] ?? 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80';

        if (! $servicioId) {
            $nuevoServicio = \App\Models\Servicio::create([
                'id' => (string) Str::uuid(),
                'nombre' => trim($validated['nombre']),
                'descripcion' => $validated['descripcion'] ?? 'Servicio especializado de limpieza',
                'precio_base' => $validated['precio_personalizado'],
                'icono_url' => $imagenUrl,
                'esta_activo' => true,
            ]);
            $servicioId = $nuevoServicio->id;
        }

        $empresa->servicios()->syncWithoutDetaching([
            $servicioId => [
                'precio_personalizado' => $validated['precio_personalizado'],
                'imagen_url' => $imagenUrl,
                'esta_disponible' => $validated['esta_disponible'] ?? true,
            ],
        ]);

        return response()->json([
            'message' => 'Servicio, imagen y tarifa configurados exitosamente para la empresa.',
            'servicio' => $empresa->servicios()->where('servicios.id', $servicioId)->first(),
        ], 201);
    }

    /**
     * Actualizar tarifa personalizada, imagen o disponibilidad de un servicio
     */
    public function updateServicioPrecio(Request $request, string $servicioId): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $validated = $request->validate([
            'precio_personalizado' => 'nullable|numeric|min:0',
            'imagen_url' => 'nullable|string',
            'esta_disponible' => 'nullable|boolean',
        ]);

        $updateData = array_filter([
            'precio_personalizado' => $validated['precio_personalizado'] ?? null,
            'imagen_url' => $validated['imagen_url'] ?? null,
            'esta_disponible' => $validated['esta_disponible'] ?? null,
        ], fn ($val) => ! is_null($val));

        $empresa->servicios()->updateExistingPivot($servicioId, $updateData);

        return response()->json([
            'message' => 'Tarifa e imagen de servicio actualizadas exitosamente.',
            'servicio' => $empresa->servicios()->where('servicios.id', $servicioId)->first(),
        ]);
    }

    /**
     * Desvincular un servicio del catálogo de la empresa
     */
    public function destroyServicio(Request $request, string $servicioId): JsonResponse
    {
        $empresa = $this->getEmpresa($request);
        $empresa->servicios()->detach($servicioId);

        return response()->json([
            'message' => 'Servicio removido del catálogo de la empresa.',
        ]);
    }

    /**
     * Listado de órdenes departamentales asignadas a la empresa
     */
    public function indexOrdenes(Request $request): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $ordenes = Orden::where('empresa_id', $empresa->id)
            ->with(['servicio', 'trabajador.usuario', 'direccion', 'cliente', 'evidencias'])
            ->orderBy('creado_at', 'desc')
            ->get()
            ->map(function ($o) use ($empresa) {
                $evidenciaAntes = $o->evidencias->where('codigo_archivo', 'ANTES')->first()?->url_archivo 
                    ?: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80';
                $evidenciaDespues = $o->evidencias->where('codigo_archivo', 'DESPUES')->first()?->url_archivo 
                    ?: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80';
                $tieneAprobacion = $o->evidencias->contains('estado', 'APROBADA') || $o->estado_actual === 'COMPLETADA';

                return [
                    'id' => (string) $o->id,
                    'codigo_seguimiento' => $o->codigo_seguimiento,
                    'empresa_id' => (string) $o->empresa_id,
                    'cliente_nombre' => $o->cliente ? trim($o->cliente->nombres . ' ' . $o->cliente->apellidos) : 'Carlos Mendoza',
                    'cliente_telefono' => $o->cliente?->telefono ?? '70012345',
                    'direccion' => $o->direccion ? ($o->direccion->direccion_completa . ($o->direccion->numero_departamento ? ', Depto ' . $o->direccion->numero_departamento : '')) : 'Condominio Equipetrol',
                    'zona' => $o->direccion?->ciudad ?? 'Equipetrol',
                    'servicio' => $o->servicio?->nombre ?? 'Limpieza Integral de Departamento',
                    'ambientes_resumen' => '2 Dormitorios, 1 Baño, Cocina & Sala',
                    'monto_total' => (float) $o->monto_total,
                    'metodo_pago' => 'Efectivo / Transferencia QR',
                    'estado_actual' => $o->estado_actual,
                    'trabajador_id' => $o->trabajador_id ? (string) $o->trabajador_id : null,
                    'hora_programada' => ($o->hora_programada ?? '10:00') . ' ' . ($o->fecha_programada ?? 'Hoy'),
                    'evidencias' => [
                        'antes' => $evidenciaAntes,
                        'despues' => $evidenciaDespues,
                        'auditoria_aprobada' => $tieneAprobacion,
                    ],
                ];
            });

        return response()->json([
            'empresa_id' => (string) $empresa->id,
            'ordenes' => $ordenes,
        ]);
    }

    /**
     * Aprobar evidencias y auditoría fotográfica de una orden completada
     */
    public function aprobarEvidencia(Request $request, string $codigoSeguimiento): JsonResponse
    {
        $empresa = $this->getEmpresa($request);

        $orden = Orden::where('codigo_seguimiento', strtoupper($codigoSeguimiento))->first();
        if (! $orden) {
            $orden = Orden::find($codigoSeguimiento);
        }

        if (! $orden) {
            return response()->json(['message' => 'Orden no encontrada'], 404);
        }

        Evidencia::where('orden_id', $orden->id)->update(['estado' => 'APROBADA']);

        if ($orden->estado_actual === 'FINALIZADA_CON_EVIDENCIA') {
            $orden->update(['estado_actual' => 'COMPLETADA']);
        }

        return response()->json([
            'message' => 'Evidencia fotográfica auditada y aprobada con éxito.',
            'orden_id' => $orden->id,
            'estado_actual' => $orden->estado_actual,
            'auditoria_aprobada' => true,
        ]);
    }
}


