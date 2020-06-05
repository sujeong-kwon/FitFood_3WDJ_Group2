<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Store extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'store_name', 'store_address', 'store_category', 'store_model_route'
    ];
}
