<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('usuario_id')->constrained('usuarios')->cascadeOnDelete();
            $table->string('nombres', 100);
            $table->string('apellidos', 100);
            $table->string('telefono', 20)->nullable();
            $table->decimal('calificacion_promedio', 3, 2)->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
