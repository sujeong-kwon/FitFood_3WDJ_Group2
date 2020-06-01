<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    //
    public function index()
    {
        return DB::select('select * from reviews');
    }

    public function store(Request $req, $key)
    {
        // $user_ = $req->session()->get($key);
        // $user_name = DB::select('select user_name from users where user_email = ?', [$key->user_email]);
        $user_name = DB::table('users')->where('user_email', $key)->value('user_name');

        $review = \App\Review::create([ // user_id와 store_id를 기반으로 표기.
            // 로그인 한 유저가 댓글을 등록하는 것이므로 세션 정보에서 유저 id를 반환한다.
            'review_title' => $req->review_title,
            'review_message' => $req->review_message,
            'review_star_rating' => $req->review_star_rating,
            'user_name' => $user_name,
            // 'created_at'->timestamps(),
        ]);
    }
}
