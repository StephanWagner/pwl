<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class AppController extends Controller
{
    function index() {
		if (Auth::check()) {
			return view('home');
		}

		return view('login');
	}

	function logout() {
		Auth::logout();
		return redirect('/');
	}

	function loginRequest(Request $request) {

		$user_data = [
			'username' => $request->get('username'),
			'password' => $request->get('password')
		];

		$remember = $request->get('remember');

		if (Auth::attempt($user_data, $remember == '1')) {
			return redirect('/');
		} else {
			return back()->with('data', [
				'username' => $request->get('username'),
				'remember' => $request->get('remember'),
				'error' => __('txt.login.error')
			]);
		}
	}

	function changeLocaleRequest() {
		App::setLocale('de');
	}
}
