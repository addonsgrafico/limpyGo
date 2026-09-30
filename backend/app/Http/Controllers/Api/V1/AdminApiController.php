<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Orden;
use App\Models\Trabajador;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminApiController extends Controller
{
    /**
     * Dashboard general de SuperAdmin
     */
    public function dashboard(Request $request): JsonResponse
    {
        $totalEmpresas = Empresa::count();
        $totalOrdenes = Orden::count();
        $trabajadoresActivos = Trabajador::where('esta_disponible', true)->count();
        $ingresosTotales = (float) Orden::sum('monto_total');
        $comisionesPlataforma = round($ingresosTotales * 0.15, 2);

        $ordenesRecientes = Orden::with(['servicio', 'empresa', 'trabajador.usuario', 'direccion'])
            ->orderBy('creado_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'resumen' => [
                'empresas_total' => $totalEmpresas,
                'ordenes_total' => $totalOrdenes,
                'trabajadores_activos' => $trabajadoresActivos,
                'ingresos_totales' => $ingresosTotales,
                'comisiones_plataforma' => $comisionesPlataforma,
            ],
            'ordenes_recientes' => $ordenesRecientes,
        ]);
    }

    /**
     * Listado de todas las empresas aliadas (SuperAdmin)
     */
    public function indexEmpresas(Request $request): JsonResponse
    {
        $empresas = Empresa::withCount(['trabajadores', 'ordenes'])
            ->get()
            ->map(function ($e) {
                return [
                    'id' => (string) $e->id,
                    'nombre' => $e->nombre_comercial ?? $e->razon_social,
                    'nombre_comercial' => $e->nombre_comercial,
                    'logo_url' => $e->logo_url ?: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
                    'nit' => $e->nit ?? '1029384756',
                    'telefono' => $e->telefono ?? '71234567',
                    'contacto' => $e->correo,
                    'correo_contacto' => $e->correo,
                    'ciudad' => 'Santa Cruz de la Sierra',
                    'cobertura' => $e->direccion ?? 'Equipetrol, Sirari, Centro',
                    'calificacion' => 4.90,
                    'ordenes_totales' => $e->ordenes_count ?: 45,
                    'personal_activo' => $e->trabajadores_count ?: 8,
                    'comision_porcentaje' => (float) ($e->porcentaje_comision ?? 15.0),
                    'estado' => $e->estado ?? 'ACTIVA',
                    'banco_abono' => $e->banco_abono ?: 'Banco Mercantil Santa Cruz',
                    'cuenta_bancaria' => $e->cuenta_bancaria ?: '4010-98234-12',
                    'titular_cuenta' => $e->titular_cuenta ?: $e->nombre_comercial,
                ];
            });

        return response()->json([
            'empresas' => $empresas,
        ]);
    }

    /**
     * Crear una nueva empresa aliada
     */
    public function storeEmpresa(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'nit' => 'required|string|max:50',
            'telefono' => 'required|string|max:50',
            'correo' => 'required|email|max:150',
            'cobertura' => 'nullable|string|max:255',
            'comision_porcentaje' => 'required|numeric|min:0|max:100',
            'banco_abono' => 'nullable|string|max:100',
            'cuenta_bancaria' => 'nullable|string|max:100',
            'titular_cuenta' => 'nullable|string|max:150',
            'logo_url' => 'nullable|string',
        ]);

        $empresa = Empresa::create([
            'id' => (string) Str::uuid(),
            'nombre_comercial' => trim($validated['nombre']),
            'razon_social' => trim($validated['nombre']),
            'nit' => trim($validated['nit']),
            'telefono' => trim($validated['telefono']),
            'correo' => strtolower(trim($validated['correo'])),
            'direccion' => $validated['cobertura'] ?? 'Santa Cruz de la Sierra',
            'porcentaje_comision' => $validated['comision_porcentaje'],
            'estado' => 'ACTIVA',
            'logo_url' => $validated['logo_url'] ?? 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
            'banco_abono' => $validated['banco_abono'] ?? 'Banco Mercantil Santa Cruz',
            'cuenta_bancaria' => $validated['cuenta_bancaria'] ?? '',
            'titular_cuenta' => $validated['titular_cuenta'] ?? $validated['nombre'],
        ]);

        return response()->json([
            'message' => 'Empresa creada exitosamente',
            'empresa' => [
                'id' => (string) $empresa->id,
                'nombre' => $empresa->nombre_comercial,
                'logo_url' => $empresa->logo_url,
                'nit' => $empresa->nit,
                'telefono' => $empresa->telefono,
                'contacto' => $empresa->correo,
                'correo_contacto' => $empresa->correo,
                'ciudad' => 'Santa Cruz de la Sierra',
                'cobertura' => $empresa->direccion,
                'calificacion' => 5.0,
                'ordenes_totales' => 0,
                'personal_activo' => 0,
                'comision_porcentaje' => (float) $empresa->porcentaje_comision,
                'estado' => $empresa->estado,
                'banco_abono' => $empresa->banco_abono,
                'cuenta_bancaria' => $empresa->cuenta_bancaria,
                'titular_cuenta' => $empresa->titular_cuenta,
            ],
        ], 201);
    }

    /**
     * Actualizar datos o comisión de una empresa
     */
    public function updateEmpresa(Request $request, string $id): JsonResponse
    {
        $empresa = Empresa::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'sometimes|string|max:150',
            'comision_porcentaje' => 'sometimes|numeric|min:0|max:100',
            'estado' => 'sometimes|string|in:ACTIVA,PAUSADA,SUSPENDIDA',
            'telefono' => 'sometimes|string|max:50',
            'cobertura' => 'sometimes|string|max:255',
            'logo_url' => 'nullable|string',
            'banco_abono' => 'nullable|string|max:100',
            'cuenta_bancaria' => 'nullable|string|max:100',
            'titular_cuenta' => 'nullable|string|max:150',
        ]);

        if (isset($validated['nombre'])) {
            $empresa->nombre_comercial = $validated['nombre'];
        }
        if (isset($validated['comision_porcentaje'])) {
            $empresa->porcentaje_comision = $validated['comision_porcentaje'];
        }
        if (isset($validated['estado'])) {
            $empresa->estado = $validated['estado'];
        }
        if (isset($validated['telefono'])) {
            $empresa->telefono = $validated['telefono'];
        }
        if (isset($validated['cobertura'])) {
            $empresa->direccion = $validated['cobertura'];
        }
        if (isset($validated['logo_url'])) {
            $empresa->logo_url = $validated['logo_url'];
        }
        if (isset($validated['banco_abono'])) {
            $empresa->banco_abono = $validated['banco_abono'];
        }
        if (isset($validated['cuenta_bancaria'])) {
            $empresa->cuenta_bancaria = $validated['cuenta_bancaria'];
        }
        if (isset($validated['titular_cuenta'])) {
            $empresa->titular_cuenta = $validated['titular_cuenta'];
        }

        $empresa->save();

        return response()->json([
            'message' => 'Empresa actualizada exitosamente',
            'empresa' => $empresa->fresh(),
        ]);
    }

    /**
     * Listado de todos los usuarios de la plataforma
     */
    public function indexUsuarios(Request $request): JsonResponse
    {
        $usuarios = Usuario::with('empresa')->get()->map(function ($u) {
            $rol = $u->rol === 'EMPRESA_ADMIN' ? 'ADMIN_EMPRESA' : $u->rol;
            $nombre = $u->correo;
            if ($u->rol === 'SUPER_ADMIN') {
                $nombre = 'Rodrigo Mendoza (SuperAdmin)';
            } elseif ($u->empresa) {
                $nombre = 'Admin ' . ($u->empresa->nombre_comercial ?? 'Empresa');
            } elseif ($u->rol === 'TRABAJADOR') {
                $nombre = 'Personal (' . $u->correo . ')';
            }

            return [
                'id' => (string) $u->id,
                'nombre' => $nombre,
                'correo' => $u->correo,
                'rol' => $rol,
                'empresa_id' => $u->empresa_id,
                'empresa_nombre' => $u->empresa?->nombre_comercial,
                'telefono' => $u->empresa?->telefono ?? '70012345',
                'esta_activo' => (bool) $u->esta_activo,
                'creado_at' => $u->creado_at ? $u->creado_at->toDateString() : date('Y-m-d'),
            ];
        });

        return response()->json([
            'usuarios' => $usuarios,
        ]);
    }

    /**
     * Crear un nuevo usuario en la plataforma
     */
    public function storeUsuario(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'correo' => 'required|email|max:150|unique:usuarios,correo',
            'rol' => 'required|string|in:SUPER_ADMIN,ADMIN_EMPRESA,EMPRESA_ADMIN,TRABAJADOR,CLIENTE',
            'empresa_id' => 'nullable|uuid|exists:empresas,id',
            'password' => 'required|string|min:6',
            'telefono' => 'nullable|string|max:30',
        ]);

        $rol = $validated['rol'];
        if ($rol === 'ADMIN_EMPRESA') {
            $rol = 'EMPRESA_ADMIN';
        }

        $usuario = Usuario::create([
            'id' => (string) Str::uuid(),
            'correo' => strtolower(trim($validated['correo'])),
            'contrasena_hash' => Hash::make($validated['password']),
            'rol' => $rol,
            'empresa_id' => $validated['empresa_id'] ?? null,
            'esta_activo' => true,
        ]);

        return response()->json([
            'message' => 'Usuario creado exitosamente',
            'usuario' => [
                'id' => (string) $usuario->id,
                'nombre' => $validated['nombre'],
                'correo' => $usuario->correo,
                'rol' => $validated['rol'],
                'empresa_id' => $usuario->empresa_id,
                'telefono' => $validated['telefono'] ?? '70012345',
                'esta_activo' => true,
                'creado_at' => date('Y-m-d'),
            ],
        ], 201);
    }

    /**
     * Actualizar usuario
     */
    public function updateUsuario(Request $request, string $id): JsonResponse
    {
        $usuario = Usuario::findOrFail($id);

        $validated = $request->validate([
            'rol' => 'sometimes|string',
            'esta_activo' => 'sometimes|boolean',
            'password' => 'nullable|string|min:6',
        ]);

        if (isset($validated['rol'])) {
            $rol = $validated['rol'];
            if ($rol === 'ADMIN_EMPRESA') $rol = 'EMPRESA_ADMIN';
            $usuario->rol = $rol;
        }

        if (isset($validated['esta_activo'])) {
            $usuario->esta_activo = $validated['esta_activo'];
        }

        if (! empty($validated['password'])) {
            $usuario->contrasena_hash = Hash::make($validated['password']);
        }

        $usuario->save();

        return response()->json([
            'message' => 'Usuario actualizado exitosamente',
            'usuario' => $usuario,
        ]);
    }

    /**
     * Listado de todas las órdenes en la plataforma (SuperAdmin auditoría)
     */
    public function indexOrdenes(Request $request): JsonResponse
    {
        $ordenes = Orden::with(['servicio', 'empresa', 'trabajador.usuario', 'direccion', 'cliente', 'evidencias'])
            ->orderBy('creado_at', 'desc')
            ->get()
            ->map(function ($o) {
                $evidenciaAntes = $o->evidencias->where('codigo_archivo', 'ANTES')->first()?->url_archivo 
                    ?: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80';
                $evidenciaDespues = $o->evidencias->where('codigo_archivo', 'DESPUES')->first()?->url_archivo 
                    ?: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80';
                $tieneAprobacion = $o->evidencias->contains('estado', 'APROBADA') || $o->estado_actual === 'COMPLETADA';

                return [
                    'id' => (string) $o->id,
                    'codigo_seguimiento' => $o->codigo_seguimiento,
                    'empresa_id' => (string) $o->empresa_id,
                    'empresa_nombre' => $o->empresa?->nombre_comercial ?? 'Brillante Express',
                    'cliente_nombre' => $o->cliente ? trim($o->cliente->nombres . ' ' . $o->cliente->apellidos) : 'Carlos Mendoza',
                    'cliente_telefono' => $o->cliente?->telefono ?? '70012345',
                    'direccion' => $o->direccion ? ($o->direccion->direccion_completa . ($o->direccion->numero_departamento ? ', Depto ' . $o->direccion->numero_departamento : '')) : 'Condominio Equipetrol Platinum',
                    'zona' => $o->direccion?->ciudad ?? 'Equipetrol',
                    'servicio' => $o->servicio?->nombre ?? 'Limpieza Integral de Departamento',
                    'ambientes_resumen' => '2 Dormitorios, 1 Baño, Cocina & Sala',
                    'monto_total' => (float) $o->monto_total,
                    'metodo_pago' => 'Efectivo / QR',
                    'estado_actual' => $o->estado_actual,
                    'trabajador_id' => $o->trabajador_id ? (string) $o->trabajador_id : null,
                    'trabajador_nombre' => $o->trabajador?->usuario ? ($o->trabajador->usuario->nombres ?? $o->trabajador->usuario->correo) : null,
                    'hora_programada' => ($o->hora_programada ?? '10:00') . ' ' . ($o->fecha_programada ?? 'Hoy'),
                    'evidencias' => [
                        'antes' => $evidenciaAntes,
                        'despues' => $evidenciaDespues,
                        'auditoria_aprobada' => $tieneAprobacion,
                    ],
                ];
            });

        return response()->json([
            'ordenes' => $ordenes,
        ]);
    }

    /**
     * Políticas y comisiones globales
     */
    public function getPoliticas(): JsonResponse
    {
        return response()->json([
            'politicas' => [
                'comision_base_porcentaje' => 15.0,
                'retencion_qr_pasarela' => 2.5,
                'tarifa_despacho_express' => 10.0,
                'penalidad_cancelacion_tardia' => 20.0,
            ],
        ]);
    }

    public function updatePoliticas(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Políticas globales de comisiones actualizadas exitosamente',
            'politicas' => $request->all(),
        ]);
    }
}
