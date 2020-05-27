<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SignupController extends Controller
{
    public function signup(Request $req) {
        try {
            $test = DB::select('select * from users where user_email = ?', [$req->user_email]);

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
                    'user_gender'=>$req->user_gender,
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
    }
}
