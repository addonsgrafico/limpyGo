<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('precio_ambiente_servicio', function (Blueprint $table) {
            $table->foreignUuid('ambiente_id')->constrained('ambientes')->cascadeOnDelete();
            $table->foreignUuid('servicio_id')->constrained('servicios')->cascadeOnDelete();
            $table->decimal('precio_adicional', 10, 2)->default(0);
            $table->integer('tiempo_estimado_minutos')->default(0);
            $table->primary(['ambiente_id', 'servicio_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('precio_ambiente_servicio');
    }
};
