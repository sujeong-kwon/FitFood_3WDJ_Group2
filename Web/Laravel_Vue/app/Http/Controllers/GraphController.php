<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraphController extends Controller
{

    public function days(Request $req)
    {
        $data = $req->session()->all();
        $key = $req->session()->get('key');
        
        if ($key) {
            $user_id = $req->session()->get($key)->user_id;
            
            $now = date(strtotime("+9 hours")); // aws의 날짜 기준이 미국이라서 한국시간으로 지정
            $month = date("m", $now); // 현재 날짜의 월
            
            switch ($month) { // 요일 수 구하기
                case 01: case 03: case 05: case 07: case '08': case 10: case 12:
                    $month_length = 31;
                    break;
                case 04: case 06: case '09': case 11:
                    $month_length = 30;
                    break;
                case 02:
                    $month_length = 28;
                    break;
            }

            $calorie = Array();
            $carbohydrate = Array();
            $protein = Array();
            $fat = Array();
            $salt = Array();
            $cholesterol = Array();
            $kamium = Array();

            for($i = 1; $i <= $month_length; $i++) {
                $sum_calorie = 0;
                $sum_carbohydrate = 0;
                $sum_protein = 0;
                $sum_fat = 0;
                $sum_salt = 0;
                $sum_cholesterol = 0;
                $sum_kamium = 0;
                
                $eaten_food = DB::select('select food_id from foodeatens where user_id = ? and date_format(eaten_start, ?) = ? and date_format(eaten_start, ?) = ? ', [$user_id, '%m', $month, '%d', $i]);
                $eaten_food_list = count($eaten_food);
                
                if ($eaten_food_list == 0) {
                    array_push($calorie, $sum_calorie);
                    array_push($carbohydrate, $sum_carbohydrate);
                    array_push($protein, $sum_protein);
                    array_push($fat, $sum_fat);
                    array_push($salt, $sum_salt);
                    array_push($cholesterol, $sum_cholesterol);
                    array_push($kamium, $sum_kamium);
                    continue;
                }
                
                $eaten_food_a = Array();
                for ($f = 0; $f < $eaten_food_list; $f++) {
                    array_push($eaten_food_a, $eaten_food[$f]->food_id);
                }
                    
                foreach ($eaten_food_a as $food_id) {
                    $eat_food_nutrient = DB::select('select nutrient_calorie, nutrient_carbohydrate, nutrient_protein, 
                    nutrient_fat, nutrient_salt, nutrient_cholesterol, nutrient_kamium from nutrients where food_id = ?', [$food_id]);
                    
                    if ($eat_food_nutrient) {
                        $sum_calorie += $eat_food_nutrient[0]->nutrient_calorie;
                        $sum_carbohydrate += $eat_food_nutrient[0]->nutrient_carbohydrate;
                        $sum_protein += $eat_food_nutrient[0]->nutrient_protein;
                        $sum_fat += $eat_food_nutrient[0]->nutrient_fat;
                        $sum_salt += $eat_food_nutrient[0]->nutrient_salt;
                        $sum_cholesterol += $eat_food_nutrient[0]->nutrient_cholesterol;
                        $sum_kamium += $eat_food_nutrient[0]->nutrient_kamium;
                    } else {
                        
                    }
                }

                array_push($calorie, $sum_calorie);
                array_push($carbohydrate, $sum_carbohydrate);
                array_push($protein, $sum_protein);
                array_push($fat, $sum_fat);
                array_push($salt, $sum_salt);
                array_push($cholesterol, $sum_cholesterol);
                array_push($kamium, $sum_kamium);
                
            }

            $days_nutrients = array(
                'calorie'=>$calorie,
                'carbohydrate'=>$carbohydrate,
                'protein'=>$protein,
                'fat'=>$fat,
                'salt'=>$salt,
                'cholesterol'=>$cholesterol,
                'kamium'=>$kamium
            );
            return json_encode($days_nutrients);

        } else {
            // 로그인 유도하는 화면으로
            return "False";
        }

    }

    public function months(Request $req)
    {
        $data = $req->session()->all();
        $key = $req->session()->get('key');
        
        if ($key) {
            $user_id = $req->session()->get($key)->user_id;
            
            $now = date(strtotime("+9 hours")); // aws의 날짜 기준이 미국이라서 한국시간으로 지정
            $year = date("Y", $now); // 현재 날짜의 해
            
            $calorie = Array();
            $carbohydrate = Array();
            $protein = Array();
            $fat = Array();
            $salt = Array();
            $cholesterol = Array();
            $kamium = Array();

            for($i = 1; $i <= 12; $i++) {
                $sum_calorie = 0;
                $sum_carbohydrate = 0;
                $sum_protein = 0;
                $sum_fat = 0;
                $sum_salt = 0;
                $sum_cholesterol = 0;
                $sum_kamium = 0;

                $eaten_food = DB::select('select food_id from foodeatens where user_id = ? and date_format(eaten_start, ?) = ? and date_format(eaten_start, ?) = ? ', [$user_id, '%Y', $year, '%m', $i]);
                $eaten_food_list = count($eaten_food);

                if ($eaten_food_list == 0) {
                    array_push($calorie, $sum_calorie);
                    array_push($carbohydrate, $sum_carbohydrate);
                    array_push($protein, $sum_protein);
                    array_push($fat, $sum_fat);
                    array_push($salt, $sum_salt);
                    array_push($cholesterol, $sum_cholesterol);
                    array_push($kamium, $sum_kamium);
                    continue;
                }

                $eaten_food_a = Array();
                for ($f = 0; $f < $eaten_food_list; $f++) {
                    array_push($eaten_food_a, $eaten_food[$f]->food_id);
                }
                
                foreach ($eaten_food_a as $food_id) {
                    $eat_food_nutrient = DB::select('select nutrient_calorie, nutrient_carbohydrate, nutrient_protein, 
                    nutrient_fat, nutrient_salt, nutrient_cholesterol, nutrient_kamium from nutrients where food_id = ?', [$food_id]);
                    
                    if ($eat_food_nutrient) {
                        $sum_calorie += $eat_food_nutrient[0]->nutrient_calorie;
                        $sum_carbohydrate += $eat_food_nutrient[0]->nutrient_carbohydrate;
                        $sum_protein += $eat_food_nutrient[0]->nutrient_protein;
                        $sum_fat += $eat_food_nutrient[0]->nutrient_fat;
                        $sum_salt += $eat_food_nutrient[0]->nutrient_salt;
                        $sum_cholesterol += $eat_food_nutrient[0]->nutrient_cholesterol;
                        $sum_kamium += $eat_food_nutrient[0]->nutrient_kamium;
                    } else {
                        
                    }
                }

                array_push($calorie, $sum_calorie);
                array_push($carbohydrate, $sum_carbohydrate);
                array_push($protein, $sum_protein);
                array_push($fat, $sum_fat);
                array_push($salt, $sum_salt);
                array_push($cholesterol, $sum_cholesterol);
                array_push($kamium, $sum_kamium);
                
            }

            $days_nutrients = array(
                'calorie'=>$calorie,
                'carbohydrate'=>$carbohydrate,
                'protein'=>$protein,
                'fat'=>$fat,
                'salt'=>$salt,
                'cholesterol'=>$cholesterol,
                'kamium'=>$kamium
            );
            return json_encode($days_nutrients);

        } else {
            // 로그인 유도하는 화면으로
            return "False";
        }

    }
}
