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
            'store_address' => $request->store_address,
            'store_category' => $store_category,
            'store_issuance_number' => $request->store_issuance_number,
            'store_gps_latitude' => $request->store_gps_latitude,
            'store_gps_longitude' => $request->store_gps_longitude
        ]);

        $store_id =\App\Store::max('store_id');

        $food = DB::table('foods')->insert([
            'food_name' => $request->food_name,
            'store_id' => $store_id,
        ]);

        return $store_id;
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
        // NewStore.vue script부분에서 자체처리함. 안쓰이는 함수
        // $items = array("img" => $request->img, "name" => $request->name);

        // return $items;
        return $request;
    }

    public function storeImg(Request $request){
        // $uploadedFiles = $request->pics;

        // foreach ($uploadedFiles as $file){
        //     $file->store('dummy');  // 파일 저장
        // }

        return response(['status'=>'success'], 200);
    }

    public function detail($id)
    {
        $store_id = $id;

        $detail_store_info = DB::table('stores')->where('store_id', $store_id)->get();

        $detail_food_info = DB::table('foods')->where('store_id', $store_id)->get();

        return [$detail_store_info, $detail_food_info];
    }

    public function get_store_gps(){
        $store_name = DB::table('stores')->value('store_name');
        $store_gps_latitude = DB::table('stores')->where('store_id', '<=', 3)->value('store_gps_latitude'); // 일단 3개만
        $store_gps_longitude = DB::table('stores')->where('store_id', '<=', 3)->value('store_gps_longitude');   // 너무 많아서 렉걸릴수도 있으니까

        // $store_gps = [$store_gps_latitude, $store_gps_longitude];

        return [$store_name, $store_gps_latitude, $store_gps_longitude];
    }
}
