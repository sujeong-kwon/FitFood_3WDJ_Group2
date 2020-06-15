<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoodeatenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('foodeatens', function (Blueprint $table) {
            $table->bigIncrements('eaten_id');
            $table->string('eaten_food_image')->nullable();
            $table->datetime('eaten_entered')->nullable();
            $table->datetime('eaten_start')->nullable();
            $table->datetime('eaten_end')->nullable();
            $table->unsignedBigInteger('user_id')->unsigned();
            $table->unsignedBigInteger('food_id')->unsigned()->nullable();
            $table->unsignedBigInteger('recipe_id')->unsigned()->nullable();
            $table->unsignedBigInteger('store_id')->unsigned()->nullable();
            $table->unsignedBigInteger('nutrient_id')->unsigned()->nullable();

            $table->foreign('user_id')->references('user_id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('food_id')->references('food_id')->on('foods')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('store_id')->references('store_id')->on('stores')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('nutrient_id')->references('nutrient_id')->on('nutrients')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('foodeatens');
    }
}
