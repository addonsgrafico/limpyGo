<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calificaciones', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('orden_id')->constrained('ordenes')->cascadeOnDelete();
            $table->foreignUuid('cliente_id')->constrained('clientes')->cascadeOnDelete();
            $table->foreignUuid('trabajador_id')->constrained('trabajadores')->cascadeOnDelete();
            $table->integer('estrellas');
            $table->text('comentario')->nullable();
            $table->json('etiquetas_seleccionadas')->nullable();
            $table->timestamp('creado_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calificaciones');
    }
};
