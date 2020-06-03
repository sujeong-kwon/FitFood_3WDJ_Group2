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
Route::post('/signup','SignupController@index');
Route::get('/logout','LoginController@logout');

Route::get('/showStore', 'StoreController@index');
Route::post('/storeReview', 'ReviewController@store');
Route::get('/showReview', 'ReviewController@index');

Route::get('/home', 'HomeController@index')->name('home');
