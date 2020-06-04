<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use App\Passwords;
use App\Users;
use Cookie;
use Auth;
use Hash;

class AppController extends Controller {

	// Main method
    function index() {
		// Redirect to user page
		if (!Users::first() && !Passwords::first()) {
			return redirect('/user');
		}

		// Show passwords when logged in
		if (Auth::check()) {
			$passwords = Passwords::orderBy('title', 'asc')->get();

			return view('home', [
				'passwords' => $passwords
			]);
		}

		// Show login page when not logged in
		return view('login');
	}

	// User page
	function user() {
		return view('user', [
			'user' => Auth::user(),
			'setup' => !Users::first() && !Passwords::first()
		]);
	}

	// Logout and go to home
	function logout() {
		Auth::logout();
		return redirect('/');
	}

	// Request: edit user
	function saveUserRequest(Request $request) {
		if (!$request->ajax()) {
			return response('Forbidden', 403);
		}

		// Allow saving when we are setting up first user
		$userSetup = !Users::first() && !Passwords::first();

		// Abort if not logged in
		if (!$userSetup && !Auth::check()) {
			return response()->json([
				'error' => __('txt.saveUser.error.auth')
			]);
		}

		$id = $request->get('id');
		$username = trim($request->get('username'));
		$name = trim($request->get('name'));
		$email = trim($request->get('email'));
		$password = $request->get('password');
		$remember = $request->get('remember');

		$errors = [];

		if (empty($username)) {
			$errors[] = __('txt.saveUser.error.username');
		}
		if (empty($name)) {
			$errors[] = __('txt.saveUser.error.name');
		}
		if (empty($email)) {
			$errors[] = __('txt.saveUser.error.email');
		}
		if ($userSetup && empty($password)) {
			$errors[] = __('txt.saveUser.error.password');
		} else if (($userSetup || !empty($password)) && strlen($password) < 6) {
			$errors[] = __('txt.saveUser.error.passwordLength');
		}

		// Abort if errors found
		if (!empty($errors)) {
			return response()->json([
				'error' => true,
				'errors' => $errors
			]);
		}

		// Save data
		if ($id) {
			$record = Users::find($id);
		}

		if (!$id || !$record) {
			$record = new Users();
		}

		$record->username = $username;
		$record->name = $name;
		$record->email = $email;
		if (!empty($password)) {
			$record->password = Hash::make($password);
		}
		$record->save();

		if ($userSetup) {
			$user_data = [
				'username' => $username,
				'password' => $password
			];
			Auth::attempt($user_data, $remember == '1');
		}

		return response()->json([
			'success' => true,
			'setup' => $userSetup
		]);
	}

	// Request: login
	function loginRequest(Request $request) {
		if (!$request->ajax()) {
			return response('Forbidden', 403);
		}

		$user_data = [
			'username' => $request->get('username'),
			'password' => $request->get('password')
		];

		$remember = $request->get('remember');

		if (Auth::attempt($user_data, $remember == '1')) {
			return response()->json([
				'success' => true
			]);
		} else {
			return response()->json([
				'error' => __('txt.login.error')
			]);
		}
	}

	// Request: Change language
	function changeLocaleRequest(Request $request) {
		if (!$request->ajax()) {
			return response('Forbidden', 403);
		}

		$locale = $request->get('locale');

		// TODO check if language is available

		return response()->json([
			'success' => true
		])->withCookie(cookie()->forever('locale', $locale));
	}

	// Request: save data
	function save(Request $request) {
		if (!$request->ajax()) {
			return response('Forbidden', 403);
		}

		// Abort if not logged in
		if (!Auth::check()) {
			return response()->json([
				'error' => __('txt.save.error.auth')
			]);
		}

		$id = $request->get('id');
		$title = trim($request->get('title'));
		$title = strip_tags($title);
		$content = trim($request->get('content'));
		$content = strip_tags($content, ['<b>', '<u>', '<i>', '<s>', '<a>']);

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
		$record->content = Crypt::encryptString($content);
		$record->save();
		$id = $record->id;

		return response()->json([
			'id' => $id,
			'title' => $title,
			'content' => $content,
			'success' => true
		]);
	}

	// Request: delete date
	function delete(Request $request) {
		if (!$request->ajax()) {
			return response('Forbidden', 403);
		}

		// Abort if not logged in
		if (!Auth::check()) {
			return response()->json([
				'error' => __('txt.save.error.auth')
			]);
		}

		$id = $request->get('id');
		$record = Passwords::find($id);
		$record->delete();

		return response()->json([
			'id' => $id,
			'success' => true
		]);
	}
}
