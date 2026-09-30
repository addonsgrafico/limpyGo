<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('direcciones', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('cliente_id')->constrained('clientes')->cascadeOnDelete();
            $table->string('alias', 50)->nullable();
            $table->text('direccion_completa');
            $table->string('ciudad', 100)->nullable();
            $table->string('numero_departamento', 20)->nullable();
            $table->text('referencia')->nullable();
            $table->decimal('latitud', 9, 6)->nullable();
            $table->decimal('longitud', 9, 6)->nullable();
            $table->boolean('es_predeterminada')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('direcciones');
    }
};
