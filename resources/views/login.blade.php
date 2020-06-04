@include('header')

<form method="post" action="{{ url('/loginRequest') }}">

	{{ csrf_field() }}

	<input id="login-remember" type="hidden" name="remember" value="{{ Session::get('data.remember') ? '1' : '0' }}">

	<div class="login__wrapper">
		<div class="login__container">

			<div class="login__error">
				@if ($error = Session::get('data.error'))
					{{ $error }}
				@else
					&nbsp;
				@endif
			</div>

			<div class="login__textfield login__textfield--username">
				<input class="textfield" type="text" name="username" value="{{ Session::get('data.username') }}" placeholder="{{ __('txt.login.username') }}">
			</div>
			<div class="login__textfield login__textfield--password">
				<input class="textfield" type="password" name="password" placeholder="{{ __('txt.login.password') }}">
			</div>
			<div class="login__checkbox-wrapper checkbox-wrapper{{ Session::get('data.remember') ? ' active' : '' }}" onclick="toggleRememberLogin()">
				<div class="checkbox"><span class="checkbox-icon material-icons-sharp">check</span></div>
				<div class="checkbox-label">{{ __('txt.login.remember') }}</div>
			</div>
			<div class="login__button">
				<button class="button" type="submit">{{ __('txt.login.button.signIn') }}</button>
			</div>
		</div>
	</div>
</form>

@include('footer')
