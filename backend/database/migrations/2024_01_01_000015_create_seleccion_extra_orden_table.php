<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seleccion_extra_orden', function (Blueprint $table) {
            $table->foreignUuid('orden_id')->constrained('ordenes')->cascadeOnDelete();
            $table->foreignUuid('servicio_extra_id')->constrained('servicio_extras')->cascadeOnDelete();
            $table->decimal('precio_cobrado', 10, 2);
            $table->primary(['orden_id', 'servicio_extra_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seleccion_extra_orden');
    }
};
