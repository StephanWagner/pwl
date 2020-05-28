<!DOCTYPE html>
<html lang="en">
<head>
<title>vaulty</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="author" content="Stephan Wagner, stephanwagner.me@gmail.com, https://stephanwagner.me">
<meta name="description" content="">
<link rel="icon" type="image/png" href="/img/favicon.png">
<link rel="apple-touch-icon" type="image/png" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="/css/main.css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>

<body>

@if (Auth::check())
<header class="header__wrapper">
	<div class="header__container container">
		<div class="header__logo">
			<img src="/img/logo.svg" alt="">
		</div>
		<div class="header__name">
			{{ Auth::user()->name }}
		</div>
		<nav class="main-nav">
			<ul>
				<li class="main-nav__item main-nav__item--logout">
					<a href="{{ url('/logout') }}"><span class="main-nav__icon main-nav__icon--logout material-icons">power_settings_new</span></a>
				</li>
			</ul>
		</nav>
	</div>
</header>
@else
<header class="header__logged-out"></header>
@endif
