<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('empresas') && ! Schema::hasColumn('empresas', 'logo_url')) {
            Schema::table('empresas', function (Blueprint $table) {
                $table->text('logo_url')->nullable()->after('nombre_comercial');
            });
        }

        if (Schema::hasTable('servicio_empresas') && ! Schema::hasColumn('servicio_empresas', 'imagen_url')) {
            Schema::table('servicio_empresas', function (Blueprint $table) {
                $table->text('imagen_url')->nullable()->after('precio_personalizado');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('empresas') && Schema::hasColumn('empresas', 'logo_url')) {
            Schema::table('empresas', function (Blueprint $table) {
                $table->dropColumn('logo_url');
            });
        }

        if (Schema::hasTable('servicio_empresas') && Schema::hasColumn('servicio_empresas', 'imagen_url')) {
            Schema::table('servicio_empresas', function (Blueprint $table) {
                $table->dropColumn('imagen_url');
            });
        }
    }
};
