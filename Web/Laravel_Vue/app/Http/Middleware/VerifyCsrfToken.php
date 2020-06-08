<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/singup',
        'http://ec2-52-72-52-75.compute-1.amazonaws.com/signup',
        '/login',
        'http://ec2-52-72-52-75.compute-1.amazonaws.com/login',
        '/app_eaten',
        'http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten',
        '/eaten_data',
        'http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data',
        '/get_store_data',
        'http://ec2-52-72-52-75.compute-1.amazonaws.com/get_store_data',
        '/get_store_id',
        'http://ec2-52-72-52-75.compute-1.amazonaws.com/get_store_id',
        '/gps',
        'http://ec2-52-72-52-75.compute-1.amazonaws.com/gps',
    ];
}
