<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trabajadores', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('usuario_id')->constrained('usuarios')->cascadeOnDelete();
            $table->foreignUuid('empresa_id')->constrained('empresas')->cascadeOnDelete();
            $table->string('documento_identidad', 50)->unique();
            $table->string('telefono', 20)->nullable();
            $table->text('foto_url')->nullable();
            $table->boolean('antecedentes_verificados')->default(false);
            $table->decimal('calificacion_promedio', 3, 2)->default(0);
            $table->boolean('esta_disponible')->default(true);
            $table->string('estado', 20)->default('ACTIVO');
            $table->decimal('latitud_actual', 9, 6)->nullable();
            $table->decimal('longitud_actual', 9, 6)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trabajadores');
    }
};
