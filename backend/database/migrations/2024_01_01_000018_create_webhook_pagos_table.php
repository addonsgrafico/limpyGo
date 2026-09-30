<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('webhook_pagos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('pago_id')->nullable()->constrained('pagos')->nullOnDelete();
            $table->json('datos_crudos');
            $table->string('estado', 20);
            $table->timestamp('recibido_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('webhook_pagos');
    }
};
