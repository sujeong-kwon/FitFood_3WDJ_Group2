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
Route::post('/updateReview', 'ReviewController@update');
Route::post('/deleteReview', 'ReviewController@delete');
Route::get('/showReview/{id}', 'ReviewController@index');

Route::get('/recommendShow', 'RecommendController@index');
// NewStore@register stores 테이블에 메뉴 등록
Route::post('/saveStore', 'StoreController@store');
Route::post('/saveBreak', 'FoodeatenController@save_breakfast');

// NewStore.vue script부분에서 자체구현 성공. 현재 안쓰이는 라우팅주소
Route::post('/storeMenu', 'StoreController@storeMenu');

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
// 식사 시작
Route::get('/start', 'FoodeatenController@start');
// 식사 종료 
Route::get('/end', 'FoodeatenController@end');

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/get_recommend_detail/{id}', 'StoreController@detail');
Route::get('/get_recipe_detail/{id}', 'RecommendController@recipe_detail');
Route::get('/get_store_gps', 'StoreController@get_store_gps');


Route::post('/upload', 'StoreController@storeImg');
