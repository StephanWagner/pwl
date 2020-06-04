<!DOCTYPE html>
<html lang="en">
<head>
<title>Vaulty</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="author" content="Stephan Wagner, stephanwagner.me@gmail.com, https://stephanwagner.me">
<meta name="description" content="">
<link rel="icon" type="image/png" href="/img/favicon.png">
<link rel="apple-touch-icon" type="image/png" href="/img/favicon.png">
<link rel="manifest" href="/manifest.json">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600;700&family=Source+Sans+Pro:wght@400;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp">
<link rel="stylesheet" href="/css/main.css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>

<body>

<div class="page__wrapper">

<header class="header__wrapper">
	<div class="header__container container">
		<div class="header__logo">
			<a href="{{ url('/') }}">
				<img src="/img/logo.svg" alt="">
			</a>
		</div>
		@if (Auth::check())
		<div class="header__spacer"></div>
		<a href="{{ url('/user') }}" class="header__name{{ request()->is('user') ? ' active' : '' }}">
			{{ Auth::user()->name }}
		</a>
		<nav class="main-nav">
			<ul>
				<li class="main-nav__item main-nav__item--logout">
					<a href="{{ url('/logout') }}"><span class="main-nav__icon main-nav__icon--logout material-icons-sharp">power_settings_new</span></a>
				</li>
			</ul>
		</nav>
		@endif
	</div>
</header>

<main>
