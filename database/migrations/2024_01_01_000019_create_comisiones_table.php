<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comisiones', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('orden_id')->constrained('ordenes')->cascadeOnDelete();
            $table->decimal('monto_bruto', 10, 2);
            $table->decimal('porcentaje_comision', 5, 2);
            $table->decimal('monto_comision_plataforma', 10, 2);
            $table->decimal('monto_neto_empresa', 10, 2);
            $table->string('estado_liquidacion', 20)->default('PENDIENTE');
            $table->timestamp('calculado_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comisiones');
    }
};
