<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    
    public function store(Request $req)
    {
        $this->validate($req, [
            'user_email'=>'required|email|max:255|unique:users'
        ]);

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

                return "success";
            }
        } catch(\Illuminate\Database\QueryException $e) {
            dd($e->getMessage());
        };
    } 

    public function check(Request $req)
    {
        // 유효성 검사
        $this->validate($req,[
            'user_email'=>'required|string|max:255',
            'user_password'=>'required'
        ]);

        // 로그인 시도
        if (Auth::attempt(['user_email' => $req->user_email, 'user_password' => $req->user_password])) {
            
            return response()->text("Login Success");
        }
        // 실패 시
        return "Login Fail";
    }

    public function user_select(Request $req)
    {
        $user_email = $req->user_email;
        // $user_email = 'tester@tester.com';

        $user_data = DB::table('users')->where('user_email', $user_email)->get();

        return $user_data;
    }
}
