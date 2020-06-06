<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->bigIncrements('store_id');
            $table->string('store_name');
            $table->string('store_address')->nullable();
            $table->string('store_gps_latitude')->nullable();
            $table->string('store_gps_longitude')->nullable();
            $table->float('store_star_rating')->nullable()->default(0);
            $table->string('store_category');
            $table->string('store_model_route');
            $table->string('store_image');
            $table->integer('store_issuance_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stores');
    }
}
