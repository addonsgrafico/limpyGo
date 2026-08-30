<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('liquidaciones', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('empresa_id')->constrained('empresas')->cascadeOnDelete();
            $table->date('fecha_inicio_periodo');
            $table->date('fecha_fin_periodo');
            $table->decimal('monto_total_liquidado', 10, 2);
            $table->string('estado', 20)->default('PENDIENTE');
            $table->string('referencia_bancaria', 100)->nullable();
            $table->timestamp('procesado_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('liquidaciones');
    }
};
