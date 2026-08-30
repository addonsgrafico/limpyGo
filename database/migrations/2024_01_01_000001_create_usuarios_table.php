<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('correo', 150)->unique();
            $table->string('contrasena_hash', 255);
            $table->string('rol', 30);
            $table->foreign('rol')->references('codigo')->on('roles_usuario');
            $table->boolean('esta_activo')->default(true);
            $table->timestamp('creado_at')->useCurrent();
            $table->timestamp('actualizado_at')->nullable()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
