<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seleccion_ambiente_orden', function (Blueprint $table) {
            $table->foreignUuid('orden_id')->constrained('ordenes')->cascadeOnDelete();
            $table->foreignUuid('ambiente_id')->constrained('ambientes')->cascadeOnDelete();
            $table->integer('cantidad')->default(1);
            $table->decimal('precio_unitario_cobrado', 10, 2);
            $table->primary(['orden_id', 'ambiente_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seleccion_ambiente_orden');
    }
};
