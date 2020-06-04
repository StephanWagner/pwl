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

// Pages
Route::get('/', 'AppController@index');
Route::get('/user', 'AppController@user');
Route::get('/logout', 'AppController@logout');

// Requests
Route::post('/loginRequest', 'AppController@loginRequest');
Route::post('/saveUserRequest', 'AppController@saveUserRequest');
Route::post('/saveRequest', 'AppController@save');
Route::post('/deleteRequest', 'AppController@delete');
