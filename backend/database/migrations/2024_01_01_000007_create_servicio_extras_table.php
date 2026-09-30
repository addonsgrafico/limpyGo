<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('servicio_extras', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('servicio_id')->constrained('servicios')->cascadeOnDelete();
            $table->string('nombre', 100);
            $table->text('descripcion')->nullable();
            $table->decimal('precio_adicional', 10, 2);
            $table->text('icono_url')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('servicio_extras');
    }
};
