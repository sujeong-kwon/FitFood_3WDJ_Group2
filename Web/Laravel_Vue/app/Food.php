<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Food extends Model
{
    protected $fillable = [
        'food_name', 'store_id'
    ];
}
