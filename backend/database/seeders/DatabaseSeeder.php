<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Empresa;
use App\Models\Orden;
use App\Models\Servicio;
use App\Models\Trabajador;
use App\Models\User;
use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Usuarios Administradores de LimpyGo (Super Admin)
        Usuario::firstOrCreate(
            ['correo' => 'admin@limpygo.com'],
            [
                'contrasena_hash' => Hash::make('password'),
                'rol' => 'SUPER_ADMIN',
                'esta_activo' => true,
            ]
        );

        Usuario::firstOrCreate(
            ['correo' => 'test@example.com'],
            [
                'contrasena_hash' => Hash::make('password'),
                'rol' => 'SUPER_ADMIN',
                'esta_activo' => true,
            ]
        );

        // 2. Empresas Aliadas
        $empresaBrillante = Empresa::firstOrCreate(
            ['nit' => '1029384756'],
            [
                'nombre_comercial' => 'Limpiezas Brillante Express S.R.L.',
                'correo' => 'contacto@brillante.com',
                'telefono' => '71234567',
                'direccion' => 'Calle Los Jazmines #120, Santa Cruz',
                'estado' => 'ACTIVA',
                'porcentaje_comision' => 15.00,
            ]
        );

        $empresaEcoClean = Empresa::firstOrCreate(
            ['nit' => '9988776655'],
            [
                'nombre_comercial' => 'EcoClean Bolivia S.R.L.',
                'correo' => 'contacto@ecoclean.com',
                'telefono' => '76543210',
                'direccion' => 'Av. Banzer Km 8, Santa Cruz',
                'estado' => 'ACTIVA',
                'porcentaje_comision' => 12.50,
            ]
        );

        // 3. Administradores de Empresas Aliadas
        Usuario::firstOrCreate(
            ['correo' => 'empresa@brillante.com'],
            [
                'contrasena_hash' => Hash::make('password'),
                'rol' => 'EMPRESA_ADMIN',
                'empresa_id' => $empresaBrillante->id,
                'esta_activo' => true,
            ]
        );

        Usuario::firstOrCreate(
            ['correo' => 'empresa@ecoclean.com'],
            [
                'contrasena_hash' => Hash::make('password'),
                'rol' => 'EMPRESA_ADMIN',
                'empresa_id' => $empresaEcoClean->id,
                'esta_activo' => true,
            ]
        );

        // 4. Trabajadores de Brillante Express
        $userTrabajador1 = Usuario::firstOrCreate(
            ['correo' => 'maria.limpieza@brillante.com'],
            [
                'contrasena_hash' => Hash::make('password'),
                'rol' => 'TRABAJADOR',
                'empresa_id' => $empresaBrillante->id,
                'esta_activo' => true,
            ]
        );

        Trabajador::firstOrCreate(
            ['documento_identidad' => '8921345SC'],
            [
                'usuario_id' => $userTrabajador1->id,
                'empresa_id' => $empresaBrillante->id,
                'telefono' => '69011223',
                'antecedentes_verificados' => true,
                'calificacion_promedio' => 4.90,
                'esta_disponible' => true,
                'estado' => 'ACTIVO',
            ]
        );

        // 5. Trabajador de EcoClean
        $userTrabajador2 = Usuario::firstOrCreate(
            ['correo' => 'juan.perez@ecoclean.com'],
            [
                'contrasena_hash' => Hash::make('password'),
                'rol' => 'TRABAJADOR',
                'empresa_id' => $empresaEcoClean->id,
                'esta_activo' => true,
            ]
        );

        Trabajador::firstOrCreate(
            ['documento_identidad' => '7845123SC'],
            [
                'usuario_id' => $userTrabajador2->id,
                'empresa_id' => $empresaEcoClean->id,
                'telefono' => '69099887',
                'antecedentes_verificados' => true,
                'calificacion_promedio' => 4.80,
                'esta_disponible' => true,
                'estado' => 'ACTIVO',
            ]
        );

        // 6. Servicios de Limpieza
        $servicioGeneral = Servicio::firstOrCreate(
            ['nombre' => 'Limpieza General de Departamento'],
            [
                'descripcion' => 'Aspirado, trapeado, desinfección de baños y limpieza de cocina y superficies comunes.',
                'precio_base' => 120.00,
                'duracion_estimada_minutos' => 180,
                'esta_activo' => true,
            ]
        );

        $servicioProfundo = Servicio::firstOrCreate(
            ['nombre' => 'Limpieza Profunda Post-Mudanza'],
            [
                'descripcion' => 'Desinfección integral intensiva de pisos, azulejos, ventanas interiores y mobiliario vacío.',
                'precio_base' => 250.00,
                'duracion_estimada_minutos' => 300,
                'esta_activo' => true,
            ]
        );

        // 6.1 Ambientes estándar de departamentos
        $ambienteDormitorio = \App\Models\Ambiente::firstOrCreate(
            ['nombre' => 'Dormitorio'],
            ['descripcion' => 'Habitación individual o matrimonial', 'esta_activo' => true]
        );

        $ambienteBano = \App\Models\Ambiente::firstOrCreate(
            ['nombre' => 'Baño'],
            ['descripcion' => 'Inodoro, lavamanos, ducha/tina y azulejos', 'esta_activo' => true]
        );

        $ambienteCocina = \App\Models\Ambiente::firstOrCreate(
            ['nombre' => 'Cocina'],
            ['descripcion' => 'Mesones, lavaplatos, campana y superficies', 'esta_activo' => true]
        );

        $ambienteSala = \App\Models\Ambiente::firstOrCreate(
            ['nombre' => 'Sala / Comedor'],
            ['descripcion' => 'Área social principal del departamento', 'esta_activo' => true]
        );

        $ambienteBalcon = \App\Models\Ambiente::firstOrCreate(
            ['nombre' => 'Balcón / Terraza'],
            ['descripcion' => 'Piso exterior y barandas', 'esta_activo' => true]
        );

        // Tarifas por ambiente para Limpieza General
        $tarifasGeneral = [
            $ambienteDormitorio->id => ['precio' => 20.00, 'minutos' => 30],
            $ambienteBano->id => ['precio' => 25.00, 'minutos' => 35],
            $ambienteCocina->id => ['precio' => 30.00, 'minutos' => 45],
            $ambienteSala->id => ['precio' => 25.00, 'minutos' => 35],
            $ambienteBalcon->id => ['precio' => 15.00, 'minutos' => 20],
        ];

        foreach ($tarifasGeneral as $ambId => $t) {
            \Illuminate\Support\Facades\DB::table('precio_ambiente_servicio')->updateOrInsert(
                ['ambiente_id' => $ambId, 'servicio_id' => $servicioGeneral->id],
                ['precio_adicional' => $t['precio'], 'tiempo_estimado_minutos' => $t['minutos']]
            );
        }

        // 6.2 Servicios Extras
        \App\Models\ServicioExtra::firstOrCreate(
            ['servicio_id' => $servicioGeneral->id, 'nombre' => 'Limpieza interior de Horno'],
            ['descripcion' => 'Desengrasado profundo de parrillas y paredes internas', 'precio_adicional' => 35.00]
        );

        \App\Models\ServicioExtra::firstOrCreate(
            ['servicio_id' => $servicioGeneral->id, 'nombre' => 'Desinfección interior de Heladera'],
            ['descripcion' => 'Lavado y sanitizado de bandejas y compartimentos', 'precio_adicional' => 40.00]
        );

        \App\Models\ServicioExtra::firstOrCreate(
            ['servicio_id' => $servicioGeneral->id, 'nombre' => 'Planchado de ropa (1 hora)'],
            ['descripcion' => 'Servicio complementario de planchado por hora', 'precio_adicional' => 30.00]
        );

        // 6.3 Cupones de descuento
        \App\Models\Cupon::firstOrCreate(
            ['codigo' => 'LIMPY10'],
            [
                'tipo_descuento' => 'PORCENTAJE',
                'valor_descuento' => 10.00, // 10%
                'compra_minima' => 100.00,
                'limite_usos' => 500,
                'usos_actuales' => 0,
                'esta_activo' => true,
                'expira_at' => now()->addMonths(6),
            ]
        );

        \App\Models\Cupon::firstOrCreate(
            ['codigo' => 'LIMPY20'],
            [
                'tipo_descuento' => 'MONTO_FIJO',
                'valor_descuento' => 20.00, // 20 Bs
                'compra_minima' => 150.00,
                'limite_usos' => 100,
                'usos_actuales' => 0,
                'esta_activo' => true,
                'expira_at' => now()->addMonths(3),
            ]
        );

        // 7. Cliente de Prueba
        $userCliente = Usuario::firstOrCreate(
            ['correo' => 'cliente@example.com'],
            [
                'contrasena_hash' => Hash::make('password'),
                'rol' => 'CLIENTE',
                'esta_activo' => true,
            ]
        );

        $cliente = Cliente::firstOrCreate(
            ['usuario_id' => $userCliente->id],
            [
                'nombres' => 'Carlos',
                'apellidos' => 'Mendoza Vaca',
                'telefono' => '70012345',
                'calificacion_promedio' => 5.00,
            ]
        );

        $direccion = Direccion::firstOrCreate(
            ['cliente_id' => $cliente->id, 'alias' => 'Mi Departamento'],
            [
                'direccion_completa' => 'Av. San Martín #450, Edificio Los Robles, Equipetrol',
                'numero_departamento' => '4B',
                'ciudad' => 'Santa Cruz de la Sierra',
                'latitud' => -17.7765,
                'longitud' => -63.1950,
                'es_predeterminada' => true,
            ]
        );

        // 8. Órdenes de Prueba
        Orden::firstOrCreate(
            ['codigo_seguimiento' => 'LG-2026-0001'],
            [
                'cliente_id' => $cliente->id,
                'direccion_id' => $direccion->id,
                'servicio_id' => $servicioGeneral->id,
                'empresa_id' => $empresaBrillante->id,
                'estado_actual' => 'CREADA',
                'fecha_programada' => now()->addDay()->toDateString(),
                'hora_programada' => '09:00:00',
                'costo_traslado' => 15.00,
                'monto_subtotal' => 120.00,
                'monto_descuento' => 0.00,
                'monto_total' => 135.00,
                'observaciones' => 'Limpieza estándar matutina. Hay una mascota pequeña en el depto.',
            ]
        );

        Orden::firstOrCreate(
            ['codigo_seguimiento' => 'LG-2026-0002'],
            [
                'cliente_id' => $cliente->id,
                'direccion_id' => $direccion->id,
                'servicio_id' => $servicioProfundo->id,
                'empresa_id' => $empresaEcoClean->id,
                'estado_actual' => 'CREADA',
                'fecha_programada' => now()->addDays(2)->toDateString(),
                'hora_programada' => '14:00:00',
                'costo_traslado' => 20.00,
                'monto_subtotal' => 250.00,
                'monto_descuento' => 0.00,
                'monto_total' => 270.00,
                'observaciones' => 'Limpieza profunda previo a entrega de llaves.',
            ]
        );
    }
}
