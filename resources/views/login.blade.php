@include('header')

<div class="login__wrapper">

	<input id="login-remember" type="hidden" name="remember" value="">

	<div class="login__container">

		<div class="login__error">&nbsp;</div>

		<div class="login__textfield login__textfield--username">
			<input class="textfield login__username-input" type="text" name="username" placeholder="{{ __('txt.login.username') }}">
		</div>
		<div class="login__textfield login__textfield--password">
			<input class="textfield login__password-input" type="password" name="password" placeholder="{{ __('txt.login.password') }}">
		</div>
		<div class="login__checkbox-wrapper checkbox-wrapper" onclick="toggleRememberLogin()">
			<div class="checkbox"><span class="checkbox-icon material-icons-sharp">check</span></div>
			<div class="checkbox-label">{{ __('txt.login.remember') }}</div>
		</div>
		<div class="login__button">
			<button class="button login__button-input">{{ __('txt.login.button.signIn') }}</button>
		</div>
	</div>
</div>

@include('footer')
