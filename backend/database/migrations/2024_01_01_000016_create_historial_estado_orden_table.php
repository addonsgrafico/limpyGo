<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historial_estado_orden', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('orden_id')->constrained('ordenes')->cascadeOnDelete();
            $table->foreignUuid('modificado_por')->nullable()->constrained('usuarios')->nullOnDelete();
            $table->string('estado_anterior', 40)->nullable();
            $table->string('estado_nuevo', 40);
            $table->text('comentario')->nullable();
            $table->timestamp('fecha_cambio')->useCurrent();

            $table->foreign('estado_anterior')->references('codigo')->on('estados_orden');
            $table->foreign('estado_nuevo')->references('codigo')->on('estados_orden');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historial_estado_orden');
    }
};
