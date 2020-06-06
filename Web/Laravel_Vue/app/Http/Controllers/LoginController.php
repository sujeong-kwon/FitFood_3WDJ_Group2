<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use User;

class LoginController extends Controller
{
    public function show(Request $request, $key)
    {
        $user = $request->session()->get($key);

        return $user;
        //
    }

    public function index(Request $req)
    {
        $user_ = ['user_email' => $req->user_email, 'password' => $req->user_password];
        if(Auth::attempt($user_))
        {
            $user = Auth::user();
            $key = md5(uniqid(rand(), true));
            $req->session()->put('key', $key);
            $req->session()->put($key, $user);

            return $key;
        };
    }

    public function logout()
    {
        Auth::logout();
        $req->session()->flush();
        return redirect('/');
    }
}
