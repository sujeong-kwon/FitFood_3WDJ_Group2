<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Store;
use Food;

class StoreController extends Controller
{
    //
    public function index()
    {
        return DB::select('select * from stores');
    }

    public function store(Request $request)
    {
        $store_category = $request->store_category;
        if($store_category = 1){
            $store_category = "한식";
        }else if($store_category = 2){
            $store_category = "일식";
        }else if($store_category = 3){
            $store_category = "양식";
        }else{
            $store_category = "중식";
        }

        $store=\App\Store::create([
            'store_name' => $request->store_name,
            // 'store_name' => '맛있어져라테스트',
            'store_address' => $request->store_address,
            // 'store_address' => '맛있는미각의지역',
            'store_category' => $store_category,
            // 'store_category' => '한식',
            'store_issuance_number' => $request->store_issuance_number,
            // 'store_issuance_number' => 123123,
            // 'store_model_route' => '', 이렇게 비워보고 fillable에 걸리면 주석해제
        ]);

        // $store_id = DB::select('select MIN(store_id) from stores');
        // $store_id = DB::select('select MAX(store_id) from stores'); // 간헐적 에러발생(마크)
        $store_id = 1;

        // $food_name = DB::select('select * from foods where food_name = ?', $request->items);    // 사용자가 입력한 메뉴이름을 테이블에서 찾음.
                                                                        // 뭘로, 어디에 저장해야 하지? nutrient? foods? 근데 foods에 하면 지금 한거랑 같아서 의미가 없는데?

        // $food=\App\Food::create([
        //     // 'food_name' => $request->items->food_name,
        //     'food_name' => '맛있는테스트메뉴',
        //     'store_id' => $store_id,
        // ]);

        $food = DB::table('foods')->insert([
            'food_name' => $request->items,
            // 'store_id' => $store_id,
            'store_id' => $store_id,
        ]);

        return "success";
    }

    public function show(Request $req)
    {
        $store_id = $req->store_id;
        // $store_id = 3;

        $store_data = DB::table('stores')->where('store_id', $store_id)->get();
        
        $store_data_json = json_encode($store_data);
        
        return $store_data_json;
    }

    public function select_id(Request $req)
    {
        $store_latitude = $req->latitude; 
        $store_longitude = $req->longitude; 
        $store_gps = [(double)$store_latitude,(double)$store_longitude];
        // $latitude = '128.6248589';
        // $longitude = '35.89441684';
        // $gps = [(double)$latitude,(double)$longitude];

        $store_id_a = DB::table('stores')->where('store_gps', $store_gps)->pluck('store_id');
        $store_id = $store_id_a[0];
        
        return $store_id;
    }

    public function select_gps(Request $req) 
    {
        $latitude = $req->Latitude;  
        $longitude = $req->Longitude;
        // $latitude ='128.6205330';
        // $longitude = '35.89359071';

        $gps_all = DB::select('select store_gps_latitude, store_gps_longitude from stores');

        $compare_value = 1000;
        $select_gps_latitude;
        $select_gps_longitude;
        foreach ($gps_all as $gps) {
            $distance = sqrt( pow(($gps->store_gps_latitude - $latitude), 2) + pow(($gps->store_gps_longitude - $longitude), 2) );
            
            if ($compare_value > $distance) {
                $compare_value = $distance; 
                $select_gps_latitude = $gps->store_gps_latitude;
                $select_gps_longitude = $gps->store_gps_longitude;
            }
            else if ($compare_value <= $distance) {
                
            }
        }
        $store_data = DB::select("select * from stores where store_gps_latitude = ? and store_gps_longitude = ?", [$select_gps_latitude, $select_gps_longitude]);

        return $store_data;
    }

    public function storeMenu(Request $request){
        $items = array("img" => $request->img, "name" => $request->name);

        return $items;
    }
}
