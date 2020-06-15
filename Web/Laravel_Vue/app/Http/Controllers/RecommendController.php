<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Store;

class RecommendController extends Controller
{
    public function index()
    {
        return DB::select('select * from stores');  // 식단 추천이 되야하는데 지금은 가게 목록 페이지로 변질된 상태. 더불어 적절한 테이블도 없음
    }

    public function store()
    {

    }

    public function recipe_detail($id)
    {
        $selected_recipe_detail = DB::table('recipes')->where('recipe_id', $id)->get();

        $recipe_nutrient = DB::table('nutrients')->where('recipe_id', $id)->get();

        return [$selected_recipe_detail, $recipe_nutrient];
    }
}
