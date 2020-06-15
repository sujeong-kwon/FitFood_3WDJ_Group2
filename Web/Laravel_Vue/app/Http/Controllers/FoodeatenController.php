<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FoodeatenController extends Controller
{
    public function store(Request $req)
    {
        $store_id = $req->store_name; 
        $food_name = $req->food_name; 
        $user_email = $req->user_email; 
        // $store_id = 29;
        // $food_name = "간짜장";
        // $user_email = "tester@tester.com"
        $mytime = date("Y-m-d H:i:s");
        $mytime = date("Y-m-d H:i:s", strtotime("+9 hours"));
        
        $eat_store_id_a = DB::table('stores')->where('store_id', $store_id)->pluck('store_id');
        $eat_store_id = $eat_store_id_a[0];
        
        $eat_food_id_a = DB::table('foods')->where([['store_id', $eat_store_id], ['food_name', $food_name]])->pluck('food_id');
        $eat_food_id = $eat_food_id_a[0]; 
        
        $eat_user_id_a = DB::table('users')->where('user_email', $user_email)->pluck('user_id');
        $eat_user_id = $eat_user_id_a[0];
        
        DB::table('foodeatens')->insert(
            ['eaten_start'=>$mytime, 
            'user_id'=>$eat_user_id, 
            'store_id'=>$eat_store_id, 
            'food_id'=>$eat_food_id]
        );
        
        return "Success";
        
    } 

    public function show(Request $req)
    {
        $user_email = 'tester@tester.com'; 
        $eaten_start_date = '2020-06-02';
        // $user_email = $req->user_email; 
        // $eaten_start_date = $req->date; 
        
        $eat_user_id_a = DB::table('users')->where('user_email', $user_email)->pluck('user_id');
        $eat_user_id = $eat_user_id_a[0];

        $eat_user_gender_a = DB::table('users')->where('user_id', $eat_user_id)->pluck('user_gender');
        $eat_user_gender = $eat_user_gender_a[0];
        
        $eat_food_id_json = DB::select('select food_id, eaten_start from foodeatens where user_id = ? and date_format(eaten_start, ?) = date(?)', [$eat_user_id, '%Y-%m-%d', $eaten_start_date]);
        $json_list = count($eat_food_id_json);
        $eat_food_id_a = Array();
        $eaten_start = Array();
        for ($i = 0; $i < $json_list; $i++)
        {
            array_push($eat_food_id_a, $eat_food_id_json[$i]->food_id);
            array_push($eaten_start, $eat_food_id_json[$i]->eaten_start);
        }
        
        $eat_food_list = Array();
        foreach ($eat_food_id_a as $food_id_value)
        {
            $eat_food_data = DB::select('select * from foods where food_id = ?', [$food_id_value]);

            array_push($eat_food_list, $eat_food_data);
        }

        $nutrients_list = Array();
        foreach ($eat_food_id_a as $food_id_value)
        {
            $eat_food_nutrient = DB::select('select nutrient_calorie, nutrient_carbohydrate, nutrient_protein, 
            nutrient_fat, nutrient_salt, nutrient_cholesterol, nutrient_kamium, food_id from nutrients where food_id = ?', [$food_id_value]);

            array_push($nutrients_list, $eat_food_nutrient);
        }


        $eaten_data = array('user_gender'=>$eat_user_gender, 'food_list'=>$eat_food_list, 'eaten_start_list'=>$eaten_start, 'nutrients_list'=>$nutrients_list);
        $eaten_data_json = json_encode($eaten_data);
        
        return $eaten_data_json;
    }

    public function save_breakfast(Request $request)
    {
        $user = $request->session()->get('key');
        $user_ = $request->session()->get($user)->user_email;
        $user_id = DB::table('users')->where('user_email', $user_)->value('user_id'); 
        $food_id = DB::table('foods')->where('food_name', $request->food_name)->value('food_id');
        $nutrient_id = DB::table('nutrients')->where('food_id', $food_id)->value('nutrient_id');

        $user_foodeatens = DB::table('foodeatens')->insert([
            'eaten_start' => \Carbon\Carbon::now(),
            'eaten_end' => \Carbon\Carbon::now(),
            'user_id' => $user_id,
            'food_id' => $food_id,
            'nutrient_id' => $nutrient_id
        ]);

        return "success";
    }
}
