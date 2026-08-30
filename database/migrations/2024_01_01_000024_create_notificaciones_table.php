<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('usuario_id')->constrained('usuarios')->cascadeOnDelete();
            $table->string('titulo', 200);
            $table->text('mensaje');
            $table->boolean('fue_leida')->default(false);
            $table->timestamp('enviado_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notificaciones');
    }
};
