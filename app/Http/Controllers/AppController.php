<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Auth;

class AppController extends Controller
{
    function index() {
		if (Auth::check()) {
			return view('home');
		}

		return view('login');
	}

	function loginRequest(Request $request) {

		$user_data = [
			'username' => $request->get('username'),
			'password' => $request->get('password')
		];

		$remember = $request->get('remember');

		if (Auth::attempt($user_data, $remember)) {
			return redirect('/');
		} else {
			return back()->with('data', [
				'username' => $request->get('username'),
				'error' => 'Wrong login details'
			]);
		}
	}

	function logout() {
		Auth::logout();
		return redirect('/');
	}
}
