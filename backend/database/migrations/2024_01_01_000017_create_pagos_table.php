<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('orden_id')->constrained('ordenes')->cascadeOnDelete();
            $table->string('codigo_transaccion_pasarela', 150)->unique()->nullable();
            $table->string('metodo_pago', 50);
            $table->decimal('monto', 10, 2);
            $table->string('estado', 20)->default('PENDIENTE');
            $table->foreign('estado')->references('codigo')->on('estados_pago');
            $table->text('qr_imagen_url')->nullable();
            $table->timestamp('qr_expira_at')->nullable();
            $table->timestamp('pagado_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};
