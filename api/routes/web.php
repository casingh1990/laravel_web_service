<?php

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

Route::put('api/hero', 'HeroController@update');
Route::post('hero', 'HeroController@store');

//Route::post('/register', 'RegisterController@register');
//Route::post('/login', ['as'=>'login', 'uses'=>'LoginController@postLogin']);
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('getvideos/{id}', 'VideoController@getVideo');
Route::resource('videos', 'VideoController');
