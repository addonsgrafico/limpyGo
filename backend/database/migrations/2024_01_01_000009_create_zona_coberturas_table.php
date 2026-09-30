<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('zona_coberturas', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('empresa_id')->constrained('empresas')->cascadeOnDelete();
            $table->string('nombre_zona', 100);
            // POLYGON solo es soportado de forma nativa en MySQL/PostGIS.
            // Si usas MySQL 8+, puedes cambiar esto por: $table->polygon('poligono_coordenadas');
            $table->json('poligono_coordenadas')->nullable();
            $table->boolean('esta_activa')->default(true);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('zona_coberturas');
    }
};
