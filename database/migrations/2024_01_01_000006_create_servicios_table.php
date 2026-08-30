<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('servicios', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nombre', 100);
            $table->text('descripcion')->nullable();
            $table->decimal('precio_base', 10, 2);
            $table->integer('duracion_estimada_minutos');
            $table->text('icono_url')->nullable();
            $table->boolean('esta_activo')->default(true);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('servicios');
    }
};
