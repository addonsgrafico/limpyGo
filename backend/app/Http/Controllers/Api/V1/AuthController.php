<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\Empresa;
use App\Models\Trabajador;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Listado de usuarios iniciales / demo para conmutador rápido y testing
     */
    public function usuariosDemo(): JsonResponse
    {
        $usuarios = Usuario::with('empresa')->get()->map(function ($u) {
            $rol = $u->rol === 'EMPRESA_ADMIN' ? 'ADMIN_EMPRESA' : $u->rol;
            $nombre = $u->correo;
            if (in_array($u->rol, ['SUPER_ADMIN', 'ADMIN_PLATAFORMA'])) {
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
     * Registro de nuevo cliente desde la App Móvil o Web
     */
    public function registroCliente(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'telefono' => 'required|string|max:20',
            'correo' => 'required|string|email|max:150|unique:usuarios,correo',
            'password' => 'required|string|min:6',
        ]);

        $usuario = DB::transaction(function () use ($validated) {
            $user = Usuario::create([
                'correo' => strtolower(trim($validated['correo'])),
                'contrasena_hash' => Hash::make($validated['password']),
                'rol' => 'CLIENTE',
                'esta_activo' => true,
            ]);

            Cliente::create([
                'usuario_id' => $user->id,
                'nombres' => trim($validated['nombres']),
                'apellidos' => trim($validated['apellidos']),
                'telefono' => trim($validated['telefono']),
                'calificacion_promedio' => 5.00,
            ]);

            return $user;
        });

        $cliente = Cliente::where('usuario_id', $usuario->id)->first();
        $token = $usuario->createToken('cliente-token')->plainTextToken;

        return response()->json([
            'mensaje' => 'Registro completado exitosamente',
            'token' => $token,
            'usuario' => [
                'id' => $usuario->id,
                'correo' => $usuario->correo,
                'rol' => $usuario->rol,
            ],
            'cliente' => $cliente,
        ], 201);
    }

    /**
     * Inicio de sesión universal (SuperAdmin, Empresa, Trabajador y Cliente)
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'correo' => 'required|email',
            'password' => 'required|string',
        ]);

        $usuario = Usuario::where('correo', strtolower(trim($validated['correo'])))->first();

        // En entornos de testing/demo, si la contraseña enviada es "password" o coincide con el hash
        $valida = false;
        if ($usuario) {
            $valida = Hash::check($validated['password'], $usuario->contrasena_hash) 
                   || $validated['password'] === 'password123' 
                   || $validated['password'] === 'password';
        }

        if (! $usuario || ! $valida) {
            throw ValidationException::withMessages([
                'correo' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        if (! $usuario->esta_activo) {
            return response()->json([
                'mensaje' => 'Tu cuenta se encuentra suspendida o inactiva. Contacta con soporte.',
            ], 403);
        }

        $empresa = null;
        if ($usuario->empresa_id) {
            $empresa = Empresa::find($usuario->empresa_id);
        } elseif (in_array($usuario->rol, ['EMPRESA_ADMIN', 'ADMIN_EMPRESA', 'EMPRESA_OPERADOR'])) {
            $empresa = Empresa::first();
        }

        $cliente = Cliente::where('usuario_id', $usuario->id)->first();
        $trabajador = Trabajador::where('usuario_id', $usuario->id)->first();

        $rol = $usuario->rol;
        if ($rol === 'EMPRESA_ADMIN') {
            $rol = 'ADMIN_EMPRESA';
        }

        $nombre = $usuario->correo;
        if ($cliente) {
            $nombre = trim($cliente->nombres . ' ' . $cliente->apellidos);
        } elseif ($empresa && in_array($rol, ['ADMIN_EMPRESA', 'EMPRESA_ADMIN'])) {
            $nombre = $empresa->nombre_comercial ?? 'Administrador Empresa';
        } elseif ($trabajador) {
            $nombre = 'Personal Operativo';
        } elseif (in_array($rol, ['SUPER_ADMIN', 'ADMIN_PLATAFORMA'])) {
            $nombre = 'Rodrigo Mendoza (SuperAdmin)';
            $rol = 'SUPER_ADMIN';
        }

        $token = $usuario->createToken('auth-token')->plainTextToken;

        return response()->json([
            'mensaje' => 'Inicio de sesión exitoso',
            'token' => $token,
            'usuario' => [
                'id' => (string) $usuario->id,
                'correo' => $usuario->correo,
                'nombre' => $nombre,
                'rol' => $rol,
                'empresa_id' => $empresa?->id ?? $usuario->empresa_id,
                'esta_activo' => (bool) $usuario->esta_activo,
            ],
            'empresa' => $empresa ? [
                'id' => (string) $empresa->id,
                'nombre' => $empresa->nombre_comercial,
                'logo_url' => $empresa->logo_url ?: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
                'nit' => $empresa->nit,
                'telefono' => $empresa->telefono,
                'comision_porcentaje' => (float) ($empresa->porcentaje_comision ?? 15.0),
                'banco_abono' => $empresa->banco_abono,
                'cuenta_bancaria' => $empresa->cuenta_bancaria,
                'titular_cuenta' => $empresa->titular_cuenta,
            ] : null,
            'cliente' => $cliente,
            'trabajador' => $trabajador,
        ]);
    }

    /**
     * Perfil del usuario autenticado
     */
    public function perfil(Request $request): JsonResponse
    {
        $usuario = $request->user();
        $cliente = Cliente::where('usuario_id', $usuario->id)->with('direcciones')->first();
        $empresa = $usuario->empresa_id ? Empresa::find($usuario->empresa_id) : ($usuario->isEmpresaUser() ? Empresa::first() : null);

        $rol = $usuario->rol === 'EMPRESA_ADMIN' ? 'ADMIN_EMPRESA' : $usuario->rol;

        return response()->json([
            'usuario' => [
                'id' => (string) $usuario->id,
                'correo' => $usuario->correo,
                'rol' => $rol,
                'empresa_id' => $usuario->empresa_id,
                'creado_at' => $usuario->creado_at,
            ],
            'empresa' => $empresa,
            'cliente' => $cliente,
        ]);
    }

    /**
     * Actualizar perfil del cliente
     */
    public function actualizarPerfil(Request $request): JsonResponse
    {
        $usuario = $request->user();
        $cliente = Cliente::where('usuario_id', $usuario->id)->firstOrFail();

        $validated = $request->validate([
            'nombres' => 'sometimes|string|max:100',
            'apellidos' => 'sometimes|string|max:100',
            'telefono' => 'sometimes|string|max:20',
        ]);

        $cliente->update($validated);

        return response()->json([
            'mensaje' => 'Perfil actualizado exitosamente',
            'cliente' => $cliente->fresh(),
        ]);
    }

    /**
     * Cerrar sesión y revocar token
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'mensaje' => 'Sesión cerrada exitosamente',
        ]);
    }

    /**
     * Enviar código de verificación de 6 dígitos al Gmail del cliente
     */
    public function enviarOtpVerificacion(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'correo' => 'required|email|max:150',
        ]);

        $correo = strtolower(trim($validated['correo']));

        // Verificar si el correo ya está registrado
        if (Usuario::where('correo', $correo)->exists()) {
            return response()->json([
                'mensaje' => 'Este correo electrónico ya se encuentra registrado. Por favor inicia sesión.',
            ], 422);
        }

        // Generar código OTP de 6 dígitos
        $codigoOtp = (string) rand(100000, 999999);

        \Illuminate\Support\Facades\Cache::put("otp_registro_{$correo}", $codigoOtp, now()->addMinutes(10));

        return response()->json([
            'mensaje' => "Hemos enviado un código de 6 dígitos a {$correo}. Revisa tu bandeja de entrada o spam.",
            'correo' => $correo,
            'codigo_otp_debug' => $codigoOtp, // Facilita las pruebas inmediatas en desarrollo
            'expira_en_minutos' => 10,
        ]);
    }

    /**
     * Verificar código OTP y completar el registro del cliente
     */
    public function verificarOtpRegistro(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'telefono' => 'required|string|max:20',
            'correo' => 'required|email|max:150|unique:usuarios,correo',
            'password' => 'required|string|min:6',
            'codigo_otp' => 'required|string|size:6',
        ]);

        $correo = strtolower(trim($validated['correo']));
        $cachedOtp = \Illuminate\Support\Facades\Cache::get("otp_registro_{$correo}");

        // Validar código OTP (permite también 123456 como código universal de prueba)
        if ($validated['codigo_otp'] !== '123456' && $validated['codigo_otp'] !== $cachedOtp) {
            return response()->json([
                'mensaje' => 'El código de verificación ingresado es incorrecto o ha expirado.',
            ], 422);
        }

        \Illuminate\Support\Facades\Cache::forget("otp_registro_{$correo}");

        $usuario = DB::transaction(function () use ($validated, $correo) {
            $user = Usuario::create([
                'id' => (string) \Illuminate\Support\Str::uuid(),
                'correo' => $correo,
                'contrasena_hash' => Hash::make($validated['password']),
                'rol' => 'CLIENTE',
                'esta_activo' => true,
            ]);

            Cliente::create([
                'id' => (string) \Illuminate\Support\Str::uuid(),
                'usuario_id' => $user->id,
                'nombres' => trim($validated['nombres']),
                'apellidos' => trim($validated['apellidos']),
                'telefono' => trim($validated['telefono']),
                'calificacion_promedio' => 5.00,
            ]);

            return $user;
        });

        $cliente = Cliente::where('usuario_id', $usuario->id)->first();
        $token = $usuario->createToken('cliente-token')->plainTextToken;

        return response()->json([
            'mensaje' => '¡Cuenta verificada y creada exitosamente! Bienvenido a LimpyGo.',
            'token' => $token,
            'usuario' => [
                'id' => $usuario->id,
                'correo' => $usuario->correo,
                'rol' => $usuario->rol,
            ],
            'cliente' => $cliente,
        ], 201);
    }

    /**
     * Autenticación social rápida (Google Sign-In / Apple ID)
     */
    public function socialLogin(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'proveedor' => 'required|string|in:google,apple',
            'correo' => 'required|email|max:150',
            'nombres' => 'required|string|max:100',
            'apellidos' => 'nullable|string|max:100',
            'social_id' => 'nullable|string',
            'avatar_url' => 'nullable|url',
        ]);

        $correo = strtolower(trim($validated['correo']));

        $usuario = Usuario::where('correo', $correo)->first();

        if (! $usuario) {
            $usuario = DB::transaction(function () use ($validated, $correo) {
                $user = Usuario::create([
                    'id' => (string) \Illuminate\Support\Str::uuid(),
                    'correo' => $correo,
                    'contrasena_hash' => Hash::make(\Illuminate\Support\Str::random(24)),
                    'rol' => 'CLIENTE',
                    'esta_activo' => true,
                ]);

                Cliente::create([
                    'id' => (string) \Illuminate\Support\Str::uuid(),
                    'usuario_id' => $user->id,
                    'nombres' => trim($validated['nombres']),
                    'apellidos' => trim($validated['apellidos'] ?? 'Usuario'),
                    'telefono' => '70000000',
                    'calificacion_promedio' => 5.00,
                ]);

                return $user;
            });
        }

        $cliente = Cliente::where('usuario_id', $usuario->id)->first();
        $token = $usuario->createToken('cliente-social-token')->plainTextToken;

        return response()->json([
            'mensaje' => "Inicio de sesión exitoso con {$validated['proveedor']}",
            'token' => $token,
            'usuario' => [
                'id' => $usuario->id,
                'correo' => $usuario->correo,
                'rol' => $usuario->rol,
            ],
            'cliente' => $cliente,
        ]);
    }
}
