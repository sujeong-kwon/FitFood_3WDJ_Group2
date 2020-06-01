<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Foodeaten extends Model
{
    protected $fillable = [
        'eaten_start', 'user_id', 'food_id', 'store_id'
    ];
}
