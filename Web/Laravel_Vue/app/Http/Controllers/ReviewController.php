<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Review;

class ReviewController extends Controller
{
    //
    public function index($id)
    {   
        $store_id = $id;

        $reviews = DB::table('reviews')->where('store_id', $store_id)->get();
        $reviews_data_json = json_encode($reviews);

        // return DB::select('select * from reviews');
        return $reviews_data_json;
    }

    public function store(Request $request)
    {
        $user = $request->session()->get('key');
        $user_ = $request->session()->get($user)->user_email;
        $user_id = DB::table('users')->where('user_email', $user_)->value('user_id');

        // $store_id = 1;

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
            'store_id' => $request->store_id,
        ]);

        $sum_star = 0.00;

        $review_star_rating = DB::select('SELECT GROUP_CONCAT(review_star_rating SEPARATOR  \', \') as stars
        FROM reviews
        WHERE store_id = ?', [$request->store_id]);
        
        $star_array = explode(", ", $review_star_rating[0]->stars);
        $review_star_count = count($star_array);

        for($i = 0; $i < $review_star_count; $i++) {
            $sum_star += $star_array[$i];
        }

        $float_star_rating = (Float)($sum_star / $review_star_count);
        $average_star_rating = number_format($float_star_rating, 2);
        
        $store_star_rating = DB::table('stores')
            ->where('store_id', $request->store_id)
            ->update(
            ['store_star_rating'=>$average_star_rating]
        );

        return "success";
    }

    public function update(Request $request)
    {
        $review_id = $request->review_id;

        $update_review = DB::table('reviews')
            ->where('review_id', $review_id)
            ->update([
            'review_title' => $request->review_title,
            'review_message' => $request->review_message,
            'review_star_rating' => $request->review_star_rating,
            'review_id' => $review_id
            ]);


        $sum_star = 0.00;

        $review_star_rating = DB::select('SELECT GROUP_CONCAT(review_star_rating SEPARATOR  \', \') as stars
        FROM reviews
        WHERE store_id = ?', [$request->store_id]);
        
        $star_array = explode(", ", $review_star_rating[0]->stars);
        $review_star_count = count($star_array);

        for($i = 0; $i < $review_star_count; $i++) {
            $sum_star += $star_array[$i];
        }

        $float_star_rating = (Float)($sum_star / $review_star_count);
        $average_star_rating = number_format($float_star_rating, 2);
        
        $store_star_rating = DB::table('stores')
            ->where('store_id', $request->store_id)
            ->update(
            ['store_star_rating'=>$average_star_rating]
        );

        return "success";
    }

    public function delete(Request $request)
    {
        $delete_review_id = $request->review_id;

        $delete_review = DB::table('reviews')
                            ->where('review_id', $delete_review_id)
                            ->delete();


        $sum_star = 0.00;

        $review_star_rating = DB::select('SELECT GROUP_CONCAT(review_star_rating SEPARATOR  \', \') as stars
        FROM reviews
        WHERE store_id = ?', [$request->store_id]);
        
        if ($review_star_rating[0]->stars !== null ) {
            $star_array = explode(", ", $review_star_rating[0]->stars);
            $review_star_count = count($star_array);

            for($i = 0; $i < $review_star_count; $i++) {
                $sum_star += $star_array[$i];
            }

            $float_star_rating = (Float)($sum_star / $review_star_count);
            $average_star_rating = number_format($float_star_rating, 2);
        } else {
            $average_star_rating = $sum_star;
        }
        
        
        $store_star_rating = DB::table('stores')
            ->where('store_id', $request->store_id)
            ->update(
            ['store_star_rating'=>$average_star_rating]
        );
        
        return "success";
    }
}
