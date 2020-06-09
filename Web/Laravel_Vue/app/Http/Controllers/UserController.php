<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    
    public function user_select(Request $req)
    {
        $user_email = $req->user_email;
        // $user_email = 'tester@tester.com';

        $user_data = DB::table('users')->where('user_email', $user_email)->get();

        return $user_data;
    }
}
