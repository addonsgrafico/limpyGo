<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CatalogoController;
use App\Http\Controllers\Api\V1\DireccionController;
use App\Http\Controllers\Api\V1\OrdenController;
use App\Http\Controllers\Api\V1\TrabajadorApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // 0. Health Check de la API y Conexión de Base de Datos
    Route::get('health', function () {
        $dbStatus = 'disconnected';
        try {
            DB::connection()->getPdo();
            $dbStatus = 'connected';
        } catch (\Exception $e) {
            $dbStatus = 'error: ' . $e->getMessage();
        }

        return response()->json([
            'status' => 'ok',
            'servicio' => 'LimpyGo API Core',
            'version' => '1.0.0',
            'timestamp' => now()->toIso8601String(),
            'database' => $dbStatus,
        ]);
    });

    // 1. Autenticación Pública Móvil y Web
    Route::prefix('auth')->group(function () {
        Route::get('usuarios-demo', [AuthController::class, 'usuariosDemo']);
        Route::post('registro-cliente', [AuthController::class, 'registroCliente']);
        Route::post('enviar-otp-verificacion', [AuthController::class, 'enviarOtpVerificacion']);
        Route::post('verificar-otp-registro', [AuthController::class, 'verificarOtpRegistro']);
        Route::post('social-login', [AuthController::class, 'socialLogin']);
        Route::post('login', [AuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('perfil', [AuthController::class, 'perfil']);
            Route::put('perfil', [AuthController::class, 'actualizarPerfil']);
            Route::post('logout', [AuthController::class, 'logout']);
        });
    });

    // 2. Catálogo y Cotizador Dinámico (Público para cotizaciones rápidas sin login)
    Route::prefix('cliente')->group(function () {
        Route::get('servicios', [CatalogoController::class, 'servicios']);
        Route::get('empresas', [CatalogoController::class, 'empresas']);
        Route::get('ambientes', [CatalogoController::class, 'ambientes']);
        Route::get('extras', [CatalogoController::class, 'extras']);
        Route::post('cotizar', [CatalogoController::class, 'cotizar']);

        // 3. Rutas de Cliente Autenticado (Direcciones, Solicitud y Tracking)
        Route::middleware('auth:sanctum')->group(function () {
            // Direcciones
            Route::get('direcciones', [DireccionController::class, 'index']);
            Route::post('direcciones', [DireccionController::class, 'store']);
            Route::delete('direcciones/{id}', [DireccionController::class, 'destroy']);

            // Órdenes
            Route::get('ordenes', [OrdenController::class, 'index']);
            Route::post('ordenes', [OrdenController::class, 'store']);
            Route::get('ordenes/{codigoSeguimiento}', [OrdenController::class, 'show']);
            Route::post('ordenes/{codigoSeguimiento}/calificar', [OrdenController::class, 'calificar']);
        });

        // Stream en vivo (SSE) para actualización instantánea de órdenes sin F5
        Route::get('ordenes/{codigoSeguimiento}/stream', [OrdenController::class, 'streamOrden']);
    });

    // 4. Rutas de App Móvil del Trabajador (Limpiador)
    Route::prefix('trabajador')->middleware('auth:sanctum')->group(function () {
        Route::get('mis-ordenes', [TrabajadorApiController::class, 'misOrdenes']);
        Route::patch('ordenes/{codigoSeguimiento}/estado', [TrabajadorApiController::class, 'cambiarEstado']);
        Route::post('ordenes/{codigoSeguimiento}/evidencias', [TrabajadorApiController::class, 'subirEvidencia']);
    });

    // 5. Rutas de Empresa de Limpieza (Autogestión de personal, órdenes y catálogo)
    Route::prefix('empresa')->middleware('auth:sanctum')->group(function () {
        Route::get('perfil', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'getPerfil']);
        Route::put('perfil', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'updatePerfil']);
        
        // Gestión de Órdenes
        Route::get('ordenes', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'indexOrdenes']);
        Route::post('ordenes/{codigoSeguimiento}/asignar-trabajador', [OrdenController::class, 'asignarTrabajador']);
        Route::post('ordenes/{codigoSeguimiento}/aprobar-evidencia', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'aprobarEvidencia']);

        // Gestión de Trabajadores
        Route::get('trabajadores', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'indexTrabajadores']);
        Route::post('trabajadores', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'storeTrabajador']);
        Route::put('trabajadores/{id}', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'updateTrabajador']);
        Route::delete('trabajadores/{id}', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'deleteTrabajador']);

        // Catálogo de Servicios y Tarifas de la Empresa
        Route::get('servicios', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'indexServicios']);
        Route::post('servicios', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'storeServicio']);
        Route::put('servicios/{servicioId}', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'updateServicioPrecio']);
        Route::delete('servicios/{servicioId}', [\App\Http\Controllers\Api\V1\EmpresaApiController::class, 'destroyServicio']);
    });

    // 6. Rutas de Super Administrador (LimpyGo Global Platform)
    Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'dashboard']);
        Route::get('empresas', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'indexEmpresas']);
        Route::post('empresas', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'storeEmpresa']);
        Route::put('empresas/{id}', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'updateEmpresa']);
        Route::get('usuarios', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'indexUsuarios']);
        Route::post('usuarios', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'storeUsuario']);
        Route::put('usuarios/{id}', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'updateUsuario']);
        Route::get('ordenes', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'indexOrdenes']);
        Route::get('politicas', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'getPoliticas']);
        Route::put('politicas', [\App\Http\Controllers\Api\V1\AdminApiController::class, 'updatePoliticas']);
    });
});

