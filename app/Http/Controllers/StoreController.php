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
        // $stores = \App\Store::paginate(5);

        return DB::select('select * from stores');

        // return [
        //     'store_id' => $this->store_id,
        //     'store_name' => $this->store_name,
        //     'store_address' => $this->store_address,
        //     'store_category' => $this->store_category,
        //     'store_star_rating' => $this->store_star_rating,
        // ];
    }
}
