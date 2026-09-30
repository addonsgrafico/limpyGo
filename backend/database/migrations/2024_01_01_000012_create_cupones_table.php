<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cupones', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('codigo', 50)->unique();
            $table->string('tipo_descuento', 20); // ej. PORCENTAJE, MONTO_FIJO
            $table->decimal('valor_descuento', 10, 2);
            $table->decimal('compra_minima', 10, 2)->default(0);
            $table->integer('limite_usos')->nullable();
            $table->integer('usos_actuales')->default(0);
            $table->boolean('esta_activo')->default(true);
            $table->timestamp('expira_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cupones');
    }
};
