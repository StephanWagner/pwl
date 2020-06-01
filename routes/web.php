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

Route::get('/', 'AppController@index');
Route::get('/logout', 'AppController@logout');

Route::post('/loginRequest', 'AppController@loginRequest');
Route::post('/save', 'AppController@save');
Route::post('/delete', 'AppController@delete');
