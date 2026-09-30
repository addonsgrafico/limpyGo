<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles_usuario', function (Blueprint $table) {
            $table->string('codigo', 30)->primary();
            $table->string('descripcion', 100)->nullable();
        });

        DB::table('roles_usuario')->insert([
            ['codigo' => 'ADMIN_PLATAFORMA', 'descripcion' => 'Administrador de la plataforma'],
            ['codigo' => 'CLIENTE', 'descripcion' => 'Cliente'],
            ['codigo' => 'EMPRESA_ADMIN', 'descripcion' => 'Administrador de empresa'],
            ['codigo' => 'EMPRESA_OPERADOR', 'descripcion' => 'Operador de empresa'],
            ['codigo' => 'SUPER_ADMIN', 'descripcion' => 'Super administrador'],
            ['codigo' => 'TRABAJADOR', 'descripcion' => 'Trabajador'],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('roles_usuario');
    }
};
