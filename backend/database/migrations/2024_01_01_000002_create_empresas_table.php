<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nombre_comercial', 150);
            $table->string('nit', 50)->unique();
            $table->string('correo', 150)->unique();
            $table->string('telefono', 20)->nullable();
            $table->text('direccion')->nullable();
            $table->string('estado', 20)->default('ACTIVA');
            $table->decimal('porcentaje_comision', 5, 2)->default(0);
            $table->timestamp('creado_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
