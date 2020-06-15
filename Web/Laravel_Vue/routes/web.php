<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/check','LoginController@index');

Route::get('/show/{key}','LoginController@show');
Route::post('/signup','SignupController@signup');
Route::get('/logout','LoginController@logout');

// fitfood 앱 회원가입 
Route::post('/singup_app', 'UserController@store');
// fitfood 앱 로그인 요청
Route::post('/login_app', 'UserController@check');

Route::get('/showStore', 'StoreController@index');
Route::post('/storeReview', 'ReviewController@store');
Route::get('/showReview', 'ReviewController@index');

Route::get('/recommendShow', 'RecommendController@index');
Route::post('/saveStore', 'StoreController@store');

// 음식이름, 이메일, 가게이름(번호) 받으면 foodeatens 테이블에 저장
Route::post('/app_eaten', 'FoodeatenController@store');
// 이메일이랑 년월일 받으면 그날 먹은 음식 데이터 반환
Route::post('/eaten_data', 'FoodeatenController@show');
// 가게 id를 받으면 그 가게 정보 반환
Route::post('/get_store_data', 'StoreController@show');
// 위도, 경도를 받으면 가게 id 반환
Route::post('/get_store_id', 'StoreController@select_id');
// 위도, 경도에 따른 가까운 가게 정보 반환
Route::post('/gps', 'StoreController@select_gps');
// 일별 영양섭취 데이터 반환
Route::get('/graph_days', 'GraphController@days');
// 월별 영양섭취 데이터 반환
Route::get('/graph_months', 'GraphController@months');
// email 받았을 시 유저 데이터 반환
Route::post('/user', 'UserController@user_select');


Route::get('/home', 'HomeController@index')->name('home');

// test
Route::get('/eaten_dataa', 'FoodeatenController@show');