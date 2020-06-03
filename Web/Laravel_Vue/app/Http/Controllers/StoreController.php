<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Store;

class StoreController extends Controller
{
    //
    public function index()
    {
        return DB::select('select * from stores');
    }
}
