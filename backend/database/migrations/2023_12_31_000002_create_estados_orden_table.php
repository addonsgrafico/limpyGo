<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('estados_orden', function (Blueprint $table) {
            $table->string('codigo', 40)->primary();
            $table->string('descripcion', 100)->nullable();
        });

        DB::table('estados_orden')->insert(collect([
            'CANCELADA',
            'COMPLETADA',
            'CREADA',
            'EMPRESA_ASIGNADA',
            'EN_CAMINO',
            'EN_PROCESO',
            'EN_RECLAMO',
            'FINALIZADA_CON_EVIDENCIA',
            'FINALIZADA_PENDIENTE_EVIDENCIA',
            'LLEGUE',
            'PAGADA',
            'PENDIENTE_ASIGNACION_TRABAJADOR',
            'PENDIENTE_PAGO',
            'QR_GENERADO',
            'REEMBOLSADA',
            'TRABAJADOR_ASIGNADO',
        ])->map(fn ($codigo) => ['codigo' => $codigo, 'descripcion' => null])->toArray());
    }

    public function down(): void
    {
        Schema::dropIfExists('estados_orden');
    }
};
