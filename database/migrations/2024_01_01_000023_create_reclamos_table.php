<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reclamos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('orden_id')->constrained('ordenes')->cascadeOnDelete();
            $table->foreignUuid('cliente_id')->constrained('clientes')->cascadeOnDelete();
            $table->string('titulo', 150);
            $table->text('descripcion');
            $table->string('estado', 30)->default('ABIERTO');
            $table->foreign('estado')->references('codigo')->on('estados_reclamo');
            $table->text('notas_resolucion')->nullable();
            $table->timestamp('creado_at')->useCurrent();
            $table->timestamp('resuelto_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reclamos');
    }
};
