<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Review;

class ReviewController extends Controller
{
    //
    public function index()
    {   
        return DB::select('select * from reviews');
    }

    public function store(Request $request)
    {
        $user = $request->session()->get('key');
        $user_ = $request->session()->get($user)->user_email;
        $user_id = DB::table('users')->where('user_email', $user_)->value('user_id');


        $store_id = 1;


        // $review = \App\Review::create([ // user_id와 store_id를 기반으로 표기.
        //     'review_title' => $request->review_title,
        //     'review_message' => $request->review_message,
        //     'review_star_rating' => $request->review_star_rating,
        //     'user_id' => $user_id,
        //     'store_id' => $store_id,
        // ]);
        $review = \App\Review::create([ // user_id와 store_id를 기반으로 표기.
            'review_title' => $request->review_title,
            'review_message' => $request->review_message,
            'review_star_rating' => $request->review_star_rating,
            'user_id' => $user_id,
            'store_id' => $store_id,
        ]);

        return "success";
    }
}
