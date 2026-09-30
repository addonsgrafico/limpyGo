<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->string('banco_abono', 100)->nullable()->after('porcentaje_comision');
            $table->string('cuenta_bancaria', 100)->nullable()->after('banco_abono');
            $table->string('titular_cuenta', 150)->nullable()->after('cuenta_bancaria');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->dropColumn(['banco_abono', 'cuenta_bancaria', 'titular_cuenta']);
        });
    }
};
