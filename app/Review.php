<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Review extends Model
{
    //
    protected $fillable = [
        'review_title', 'review_message', 'review_star_rating', 'user_id', 'store_id'
    ];
}
