<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNutrientTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nutrients', function (Blueprint $table) {
            $table->bigIncrements('nutrient_id');
            $table->float('nutrient_calorie')->nullable();
            $table->float('nutrient_carbohydrate')->nullable();
            $table->float('nutrient_protein')->nullable();
            $table->float('nutrient_fat')->nullable();
            $table->float('nutrient_salt')->nullable();
            $table->float('nutrient_cholesterol')->nullable();
            $table->float('nutrient_kamium')->nullable();
            $table->unsignedBigInteger('food_id')->unsigned()->nullable();
            $table->unsignedBigInteger('recipe_id')->unsigned()->nullable();
            
            $table->foreign('food_id')->references('food_id')->on('foods')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nutrients');
    }
}
