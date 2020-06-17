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

            $eaten_data = DB::select('SELECT f.eaten_id, f.user_id, f.eaten_start, f.food_id, f.recipe_id, f.nutrient_id, n.nutrient_calorie, nutrient_carbohydrate, nutrient_protein, nutrient_fat, nutrient_salt, nutrient_cholesterol, nutrient_kamium
            FROM foodeatens f INNER JOIN nutrients n
            ON f.food_id = n.food_id OR f.recipe_id = n.recipe_id 
            WHERE f.user_id = ? AND date_format(f.eaten_start, ?) = ?', [$user_id, '%m', $month]);
            $eaten_data_count = count($eaten_data);

            for ( $t = 1 ; $t <= $month_length; $t++) {
                $sum_calorie = 0;
                $sum_carbohydrate = 0;
                $sum_protein = 0;
                $sum_fat = 0;
                $sum_salt = 0;
                $sum_cholesterol = 0;
                $sum_kamium = 0;

                $eaten_food_id_a = Array();
                $eaten_recipe_id_a = Array();

                for($c = 0; $c < $eaten_data_count; $c++) {
                    // 1~31 = 02
                    if( $t == date("d", strtotime($eaten_data[$c]->eaten_start)) ) {
                        if ($eaten_data[$c]->food_id !== NULL) {
                            array_push($eaten_food_id_a, $eaten_data[$c]->food_id);
                        } else if ($eaten_data[$c]->food_id == NULL) {
                            array_push($eaten_recipe_id_a, $eaten_data[$c]->recipe_id);
                        }
                    } else if ( $t !== date("d", strtotime($eaten_data[$c]->eaten_start)) ) { }
                }

                if ($eaten_food_id_a == [] && $eaten_recipe_id_a == []) {
                    array_push($calorie, $sum_calorie);
                    array_push($carbohydrate, $sum_carbohydrate);
                    array_push($protein, $sum_protein);
                    array_push($fat, $sum_fat);
                    array_push($salt, $sum_salt);
                    array_push($cholesterol, $sum_cholesterol);
                    array_push($kamium, $sum_kamium);
                    continue;
                } else { }

                if ($eaten_food_id_a !== []) {
                    foreach ($eaten_food_id_a as $food_id) {
                        for ($count = 0; $count < $eaten_data_count; $count++) {
                            if ($food_id != $eaten_data[$count]->food_id) {continue;}
                            else { 
                                $sum_calorie += $eaten_data[$count]->nutrient_calorie;
                                $sum_carbohydrate += $eaten_data[$count]->nutrient_carbohydrate;
                                $sum_protein += $eaten_data[$count]->nutrient_protein;
                                $sum_fat += $eaten_data[$count]->nutrient_fat;
                                $sum_salt += $eaten_data[$count]->nutrient_salt;
                                $sum_cholesterol += $eaten_data[$count]->nutrient_cholesterol;
                                $sum_kamium += $eaten_data[$count]->nutrient_kamium;
                                break;
                            }
                        }
                    }
                }

                if ($eaten_recipe_id_a !== []) {
                    foreach ($eaten_recipe_id_a as $recipe_id) {
                        for ($count = 0; $count < $eaten_data_count; $count++) {
                            if ($recipe_id != $eaten_data[$count]->recipe_id) {continue;}
                            else { 
                                $sum_calorie += $eaten_data[$count]->nutrient_calorie;
                                $sum_carbohydrate += $eaten_data[$count]->nutrient_carbohydrate;
                                $sum_protein += $eaten_data[$count]->nutrient_protein;
                                $sum_fat += $eaten_data[$count]->nutrient_fat;
                                $sum_salt += $eaten_data[$count]->nutrient_salt;
                                $sum_cholesterol += $eaten_data[$count]->nutrient_cholesterol;
                                $sum_kamium += $eaten_data[$count]->nutrient_kamium;
                                break;
                            }
                        }
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

            $eaten_data = DB::select('SELECT f.eaten_id, f.user_id, f.eaten_start, f.food_id, f.recipe_id, f.nutrient_id, n.nutrient_calorie, nutrient_carbohydrate, nutrient_protein, nutrient_fat, nutrient_salt, nutrient_cholesterol, nutrient_kamium
            FROM foodeatens f INNER JOIN nutrients n
            ON f.food_id = n.food_id OR f.recipe_id = n.recipe_id 
            WHERE f.user_id = ? AND date_format(f.eaten_start, ?) = ?', [$user_id, '%Y', $year]);
            $eaten_data_count = count($eaten_data);

            for($month = 1; $month <= 12; $month++) {
                $sum_calorie = 0;
                $sum_carbohydrate = 0;
                $sum_protein = 0;
                $sum_fat = 0;
                $sum_salt = 0;
                $sum_cholesterol = 0;
                $sum_kamium = 0;

                $eaten_food_id_a = Array();
                $eaten_recipe_id_a = Array();
                for($c = 0; $c < $eaten_data_count; $c++) {
                    if( $month == date("m", strtotime($eaten_data[$c]->eaten_start)) ) {
                        if ($eaten_data[$c]->food_id !== NULL) {
                            array_push($eaten_food_id_a, $eaten_data[$c]->food_id);
                        } else if ($eaten_data[$c]->food_id == NULL) {
                            array_push($eaten_recipe_id_a, $eaten_data[$c]->recipe_id);
                        }
                    } else if ( $month !== date("m", strtotime($eaten_data[$c]->eaten_start)) ) { }
                }

                if ($eaten_food_id_a == [] && $eaten_recipe_id_a == []) {
                    array_push($calorie, $sum_calorie);
                    array_push($carbohydrate, $sum_carbohydrate);
                    array_push($protein, $sum_protein);
                    array_push($fat, $sum_fat);
                    array_push($salt, $sum_salt);
                    array_push($cholesterol, $sum_cholesterol);
                    array_push($kamium, $sum_kamium);
                    continue;
                } else { }

                if ($eaten_food_id_a !== []) {
                    foreach ($eaten_food_id_a as $food_id) {
                        for ($count = 0; $count < $eaten_data_count; $count++) {
                            if ($food_id != $eaten_data[$count]->food_id) {continue;}
                            else { 
                                $sum_calorie += $eaten_data[$count]->nutrient_calorie;
                                $sum_carbohydrate += $eaten_data[$count]->nutrient_carbohydrate;
                                $sum_protein += $eaten_data[$count]->nutrient_protein;
                                $sum_fat += $eaten_data[$count]->nutrient_fat;
                                $sum_salt += $eaten_data[$count]->nutrient_salt;
                                $sum_cholesterol += $eaten_data[$count]->nutrient_cholesterol;
                                $sum_kamium += $eaten_data[$count]->nutrient_kamium;
                                break;
                            }
                        }
                    }
                }
                
                if ($eaten_recipe_id_a !== []) {
                    foreach ($eaten_recipe_id_a as $recipe_id) {
                        for ($count = 0; $count < $eaten_data_count; $count++) {
                            if ($recipe_id != $eaten_data[$count]->recipe_id) {continue;}
                            else { 
                                $sum_calorie += $eaten_data[$count]->nutrient_calorie;
                                $sum_carbohydrate += $eaten_data[$count]->nutrient_carbohydrate;
                                $sum_protein += $eaten_data[$count]->nutrient_protein;
                                $sum_fat += $eaten_data[$count]->nutrient_fat;
                                $sum_salt += $eaten_data[$count]->nutrient_salt;
                                $sum_cholesterol += $eaten_data[$count]->nutrient_cholesterol;
                                $sum_kamium += $eaten_data[$count]->nutrient_kamium;
                                break;
                            }
                        }
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

            $month_nutrients = array(
                'calorie'=>$calorie,
                'carbohydrate'=>$carbohydrate,
                'protein'=>$protein,
                'fat'=>$fat,
                'salt'=>$salt,
                'cholesterol'=>$cholesterol,
                'kamium'=>$kamium
            );
            
            return json_encode($month_nutrients);

        } else {
            // 로그인 유도하는 화면으로
            return "False";
        }

    }
}
