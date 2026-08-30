<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ordenes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('codigo_seguimiento', 12)->unique();
            $table->foreignUuid('cliente_id')->constrained('clientes')->cascadeOnDelete();
            $table->foreignUuid('direccion_id')->constrained('direcciones')->cascadeOnDelete();
            $table->foreignUuid('servicio_id')->constrained('servicios')->cascadeOnDelete();
            $table->foreignUuid('empresa_id')->nullable()->constrained('empresas')->nullOnDelete();
            $table->foreignUuid('trabajador_id')->nullable()->constrained('trabajadores')->nullOnDelete();
            $table->foreignUuid('cupon_id')->nullable()->constrained('cupones')->nullOnDelete();

            $table->string('estado_actual', 40)->default('CREADA');
            $table->foreign('estado_actual')->references('codigo')->on('estados_orden');

            $table->date('fecha_programada');
            $table->time('hora_programada');
            $table->decimal('costo_traslado', 10, 2)->default(0);
            $table->decimal('monto_subtotal', 10, 2)->default(0);
            $table->decimal('monto_descuento', 10, 2)->default(0);
            $table->decimal('monto_total', 10, 2)->default(0);
            $table->text('observaciones')->nullable();

            $table->timestamp('creado_at')->useCurrent();
            $table->timestamp('iniciado_at')->nullable();
            $table->timestamp('finalizado_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ordenes');
    }
};
