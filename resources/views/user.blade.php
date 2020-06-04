@include('header')

<form method="post" action="{{ url('/userRequest') }}">

	{{ csrf_field() }}

	<input id="login-remember" type="hidden" name="remember" value="{{ Session::get('data.remember') ? '1' : '0' }}">

	<div class="login__wrapper login__wrapper--user">

		<h2 class="user-headline">Please set up the admin user</h2>

		<div class="login__container">

			<div class="login__error">
				@if ($error = Session::get('data.error'))
					{{ $error }}
				@else
					&nbsp;
				@endif
			</div>

			<div class="login__textfield login__textfield--username">
				<div class="login__textfield-label">Username</div>
				<input class="textfield" type="text" name="username" value="{{ Session::get('data.username') }}">
			</div>
			<div class="login__textfield login__textfield--name">
				<div class="login__textfield-label">Display name</div>
				<input class="textfield" type="text" name="name" value="{{ Session::get('data.name') }}">
			</div>
			<div class="login__textfield login__textfield--email">
				<div class="login__textfield-label">E-Mail address</div>
				<input class="textfield" type="text" name="email" value="{{ Session::get('data.email') }}">
			</div>
			<div class="login__textfield login__textfield--password">
				<div class="login__textfield-label">Password</div>
				<input class="textfield" type="password" name="password">
			</div>
			<div class="login__checkbox-wrapper{{ Session::get('data.remember') ? ' active' : '' }}" onclick="toggleRememberLogin()">
				<div class="login__checkbox"><span class="login__checkbox-icon material-icons-sharp">check</span></div>
				<div class="login__checkbox-label">{{ __('txt.login.remember') }}</div>
			</div>
			<div class="login__button">
				<button class="button" type="submit">{{ __('txt.login.button.saveAndSignIn') }}</button>
			</div>
		</div>
	</div>
</form>

@include('footer')
