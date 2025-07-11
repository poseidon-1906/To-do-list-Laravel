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
        Schema::create('lists', function (Blueprint $table) { // Correction ici: 'lists' au lieu de 'list'
            $table->id();
            $table->string('title');
            $table->string('description')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Correction ici pour 'constrained()'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Dans la fonction down, nous supprimons la table 'lists'
        Schema::dropIfExists('lists');
    }
};