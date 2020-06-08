<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use User;

class SignupController extends Controller
{
    public function signup(Request $req) {
        try {
            $test = DB::select('select * from users where user_email = ?', [$req->user_email]);

            $user_activity_index = $req->user_activity_index;

            if($user_activity_index = 25){
                $user_activity_index = "활동이 적다";
            }else if($user_activity_index = 30){
                $user_activity_index = "평범하다";
            }else if($user_activity_index = 35){
                $user_activity_index = "활동적이다";
            }else if($user_activity_index = 40){
                $user_activity_index = "많이 활동적이다";
            }

            $user_gender = $req->user_gender;

            if($user_gender = 1){
                $user_gender = "남자";
            }else if($user_gender = 2){
                $user_gender = "여자";
            }

            if ($test) {
                return "False";
            } else {
                $user=\App\User::create([
                    'user_name'=>$req->user_name,
                    'user_email'=>$req->user_email,
                    'user_password'=>bcrypt($req->user_password),
                    'user_birthday'=>$req->user_birthday,
                    'user_height'=>$req->user_height,
                    'user_weight'=>$req->user_weight,
                    'user_gender'=>$user_gender,
                    'user_activity_index'=>$user_activity_index,
                    // 'user_character_image'=>$req->user_character_image,
                    // 'user_character_color'=>$req->user_character_color,
                ]);

                $user_ = ['user_email' => $req->user_email, 'password' => $req->user_password];
                if(Auth::attempt($user_))
                {
                    $user = Auth::user();
                    $key = md5(uniqid(rand(), true));
                    $req->session()->put($key, $user);
        
                    return $key;
                };
            }
        } catch(\Illuminate\Database\QueryException $e) {
            dd($e->getMessage());
        };

        // return $req;
    }
}
