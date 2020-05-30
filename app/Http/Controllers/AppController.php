<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Passwords;
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

	function save(Request $request) {

		if (!Auth::check()) {
			return response()->json([
				'error' => __('txt.save.error.auth')
			]);
		}

		$id = $request->get('id');
		$title = trim($request->get('title'));
		$content = trim($request->get('content'));

		if (empty($title)) {
			return response()->json([
				'error' => __('txt.save.error.title')
			]);
		}

		if (empty($content)) {
			return response()->json([
				'error' => __('txt.save.error.content')
			]);
		}

		// Save data
		if ($id) {
			$record = Passwords::find($id);
		}

		if (!$id || !$record) {
			$record = new Passwords();
		}

		$record->title = $title;
		$record->content = $content;
		$record->save();
		$id = $record->id;

		return response()->json([
			'id' => $id,
			'success' => true
		]);
	}
}
