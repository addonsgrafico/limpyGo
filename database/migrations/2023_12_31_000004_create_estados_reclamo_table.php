<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('estados_reclamo', function (Blueprint $table) {
            $table->string('codigo', 30)->primary();
            $table->string('descripcion', 100)->nullable();
        });

        DB::table('estados_reclamo')->insert([
            ['codigo' => 'ABIERTO', 'descripcion' => null],
            ['codigo' => 'CERRADO', 'descripcion' => null],
            ['codigo' => 'EN_INVESTIGACION', 'descripcion' => null],
            ['codigo' => 'RESUELTO_DECLINADO', 'descripcion' => null],
            ['codigo' => 'RESUELTO_REEMBOLSADO', 'descripcion' => null],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('estados_reclamo');
    }
};
