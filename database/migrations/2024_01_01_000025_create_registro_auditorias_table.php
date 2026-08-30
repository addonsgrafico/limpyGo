<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registro_auditorias', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('usuario_id')->nullable()->constrained('usuarios')->nullOnDelete();
            $table->string('nombre_entidad', 100);
            $table->uuid('entidad_id')->nullable();
            $table->string('accion', 100);
            $table->json('estado_anterior')->nullable();
            $table->json('estado_nuevo')->nullable();
            $table->string('direccion_ip', 45)->nullable();
            $table->timestamp('creado_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registro_auditorias');
    }
};
