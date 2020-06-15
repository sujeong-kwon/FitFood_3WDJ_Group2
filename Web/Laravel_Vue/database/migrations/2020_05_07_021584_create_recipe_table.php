<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->bigIncrements('recipe_id');
            $table->string('recipe_food')->nullable();
            $table->string('recipe_method')->nullable();
            $table->string('recipe_kind')->nullable();
            $table->string('recipe_gram')->nullable();
            $table->string('recipe_hashtag')->nullable();
            $table->string('recipe_image_1')->nullable();
            $table->string('recipe_image_2')->nullable();
            $table->string('recipe_material')->nullable();
            $table->string('how_to_make_1')->nullable();
            $table->string('how_to_make_image_1')->nullable();
            $table->string('how_to_make_2')->nullable();
            $table->string('how_to_make_image_2')->nullable();
            $table->string('how_to_make_3')->nullable();
            $table->string('how_to_make_image_3')->nullable();
            $table->string('how_to_make_4')->nullable();
            $table->string('how_to_make_image_4')->nullable();
            $table->string('how_to_make_5')->nullable();
            $table->string('how_to_make_image_5')->nullable();
            $table->string('how_to_make_6')->nullable();
            $table->string('how_to_make_image_6')->nullable();
            $table->string('how_to_make_7')->nullable();
            $table->string('how_to_make_image_7')->nullable();
            $table->string('how_to_make_8')->nullable();
            $table->string('how_to_make_image_8')->nullable();
            $table->string('how_to_make_9')->nullable();
            $table->string('how_to_make_image_9')->nullable();
            $table->string('how_to_make_10')->nullable();
            $table->string('how_to_make_image_10')->nullable();
            $table->string('how_to_make_11')->nullable();
            $table->string('how_to_make_image_11')->nullable();
            $table->string('how_to_make_12')->nullable();
            $table->string('how_to_make_image_12')->nullable();
            $table->string('how_to_make_13')->nullable();
            $table->string('how_to_make_image_13')->nullable();
            $table->string('how_to_make_14')->nullable();
            $table->string('how_to_make_image_14')->nullable();
            $table->string('how_to_make_15')->nullable();
            $table->string('how_to_make_image_15')->nullable();
            // $table->unsignedBigInteger('food_id')->unsigned();

            // $table->foreign('food_id')->references('food_id')->on('foods')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
}
