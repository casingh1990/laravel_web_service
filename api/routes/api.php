<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', 'Auth\LoginController@login');
Route::post('register', 'Auth\RegisterController@register');

Route::post('items', 'ItemController@store');
Route::get('items', 'ItemController@get');

Route::get('hero/{id}', 'HeroController@index');
Route::post('hero', 'HeroController@save');
Route::resource('hero', 'HeroController');
Route::get('csrf_token', 'HeroController@getCSRFToken');
