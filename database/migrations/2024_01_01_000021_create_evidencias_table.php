<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evidencias', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('orden_id')->constrained('ordenes')->cascadeOnDelete();
            $table->foreignUuid('trabajador_id')->constrained('trabajadores')->cascadeOnDelete();
            $table->string('codigo_archivo', 100);
            $table->text('url_archivo');
            $table->string('estado', 20)->default('ACTIVA');
            $table->timestamp('subido_at')->useCurrent();
            $table->timestamp('expira_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evidencias');
    }
};
