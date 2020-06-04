@include('header')

<h2 class="user__headline">{{ __('txt.user.setup.headline') }}</h2>

<form method="post" action="{{ url('/userRequest') }}">

	{{ csrf_field() }}

	<input id="login-remember" type="hidden" name="remember" value="{{ Session::get('data.remember') ? '1' : '0' }}">

	<div class="user__wrapper">

		<div class="user__container">

			<div class="user__error">
				@if ($error = Session::get('data.error'))
					{{ $error }}
				@else
					&nbsp;
				@endif
			</div>

			<div class="user__textfield user__textfield--username">
				<div class="textfield-label">Username</div>
				<input class="textfield" type="text" name="username" value="{{ Session::get('data.username') }}">
			</div>
			<div class="user__textfield user__textfield--name">
				<div class="textfield-label">Display name</div>
				<input class="textfield" type="text" name="name" value="{{ Session::get('data.name') }}">
			</div>
			<div class="user__textfield user__textfield--email">
				<div class="textfield-label">E-Mail address</div>
				<input class="textfield" type="text" name="email" value="{{ Session::get('data.email') }}">
			</div>
			<div class="user__textfield user__textfield--password">
				<div class="textfield-label">Password</div>
				<input class="textfield" type="password" name="password">
			</div>
			<div class="user__checkbox-wrapper checkbox-wrapper{{ Session::get('data.remember') ? ' active' : '' }}" onclick="toggleRememberLogin()">
				<div class="checkbox"><span class="checkbox-icon material-icons-sharp">check</span></div>
				<div class="checkbox-label">{{ __('txt.login.remember') }}</div>
			</div>
			<div class="user__button">
				<button class="button" type="submit">{{ __('txt.user.button.saveAndSignIn') }}</button>
			</div>
		</div>
	</div>
</form>

@include('footer')
