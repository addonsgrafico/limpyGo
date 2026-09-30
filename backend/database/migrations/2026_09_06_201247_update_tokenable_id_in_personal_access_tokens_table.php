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
        if (\Illuminate\Support\Facades\DB::getDriverName() === 'pgsql') {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE personal_access_tokens ALTER COLUMN tokenable_id TYPE VARCHAR(36)");
        } else {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE personal_access_tokens MODIFY tokenable_id VARCHAR(36) NOT NULL");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (\Illuminate\Support\Facades\DB::getDriverName() === 'pgsql') {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE personal_access_tokens ALTER COLUMN tokenable_id TYPE BIGINT USING tokenable_id::bigint");
        } else {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE personal_access_tokens MODIFY tokenable_id BIGINT UNSIGNED NOT NULL");
        }
    }
};
