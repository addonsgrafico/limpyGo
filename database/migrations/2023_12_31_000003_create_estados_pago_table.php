<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('estados_pago', function (Blueprint $table) {
            $table->string('codigo', 20)->primary();
            $table->string('descripcion', 100)->nullable();
        });

        DB::table('estados_pago')->insert([
            ['codigo' => 'APROBADO', 'descripcion' => null],
            ['codigo' => 'EXPIRADO', 'descripcion' => null],
            ['codigo' => 'FALLIDO', 'descripcion' => null],
            ['codigo' => 'PENDIENTE', 'descripcion' => null],
            ['codigo' => 'REEMBOLSADO', 'descripcion' => null],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('estados_pago');
    }
};
