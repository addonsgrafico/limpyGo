<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('servicio_empresas', function (Blueprint $table) {
            $table->foreignUuid('empresa_id')->constrained('empresas')->cascadeOnDelete();
            $table->foreignUuid('servicio_id')->constrained('servicios')->cascadeOnDelete();
            $table->decimal('precio_personalizado', 10, 2)->nullable();
            $table->boolean('esta_disponible')->default(true);
            $table->primary(['empresa_id', 'servicio_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('servicio_empresas');
    }
};
