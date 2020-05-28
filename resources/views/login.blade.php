<!DOCTYPE html>
<html lang="en">
<head>
<title>vaulty</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="author" content="Stephan Wagner, stephanwagner.me@gmail.com">
<meta name="description" content="">
<link rel="icon" type="image/png" href="/img/favicon/favicon-stephan-512.png">
<link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<link rel="stylesheet" href="/css/main.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>

<body>

<h1>Login</h1>


@if ($error = Session::get('data.error'))

<b>{{ $error }}</b>

@endif


<form method="post" action="{{ url('/loginRequest') }}">
	{{ csrf_field() }}
	<input type="text" name="username" value="{{ Session::get('data.username') }}" placeholder="username">
	<input type="password" name="password" placeholder="Password">
	<input type="checkbox"> Remember me
	<button type="submit">Submit</button>
</form>

<script src="/js/main.js"></script>

</body>
</html>
