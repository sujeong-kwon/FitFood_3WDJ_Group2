<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SignupController extends Controller
{
    public function signup(Request $req) {  //$req = signup.vue에서 post로 받아온 user정보
        try {
            $test = DB::select('select * from users where user_email = ?', [$req->user_email]); // signup.vue에서 유저에게 입력받은 email이 이미 db에 있는가를 확인

            if ($test) {    // 같은 이메일 중복 방지
                return "False";
            } else {
                $user=\App\User::create([
                    'user_name'=>$req->user_name,
                    'user_email'=>$req->user_email,
                    'user_password'=>bcrypt($req->user_password),
                    'user_birthday'=>$req->user_birthday,
                    'user_height'=>$req->user_height,
                    'user_weight'=>$req->user_weight,
                    'user_gender'=>$req->user_gender,
                    // 'user_character_image'=>$req->user_character_image,
                    // 'user_character_color'=>$req->user_character_color,
                ]);

                $user_ = ['user_email' => $req->user_email, 'password' => $req->user_password]; // 유저가 회원가입 요청한 이메일/ 패스워드
                if(Auth::attempt($user_))   // auth에 유저정보 저장
                {
                    $user = Auth::user();
                    $key = md5(uniqid(rand(), true));   // 랜덤한 문자열을 생성
                    $req->session()->put($key, $user);  // auth안의 session함수에 $key(랜덤문자열)를 담은 user변수를 집어넣는다.
        
                    return $key;
                };
            }
        } catch(\Illuminate\Database\QueryException $e) {
            dd($e->getMessage());
        };
    }
}
