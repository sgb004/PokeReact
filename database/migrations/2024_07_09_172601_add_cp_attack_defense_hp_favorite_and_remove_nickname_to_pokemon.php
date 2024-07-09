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
        Schema::table('pokemon', function (Blueprint $table) {
            $table->integer('cp' )->nullable()->after('api_id');
			$table->unsignedTinyInteger('attack')->nullable()->after('cp');
			$table->unsignedTinyInteger('defense')->nullable()->after('attack');
			$table->unsignedTinyInteger('hp')->nullable()->after('defense');
			$table->boolean('favorite')->nullable()->after('hp');
			$table->dropColumn('nickname');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pokemon', function (Blueprint $table) {
            //
        });
    }
};
