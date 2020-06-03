<?php

namespace App\Store;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Store extends Model
{
    protected $fillable = [
        'store_name', 'store_gps', 'store_address', 'store_star_rating', 'store_category', 'store_model_route'
    ];
}
