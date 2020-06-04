@include('header')

<h2 class="user__headline">
	@if ($setup)
		{{ __('txt.user.setup.headline') }}
	@else
		{{ __('txt.user.headline') }}
	@endif
</h2>

<div class="user__wrapper">

	<input type="hidden" class="user__id-input" value="{{ !empty($user['id']) ? $user['id'] : '' }}">
	<input type="hidden" class="user__setup-input" value="{{ !empty($setup) ? '1' : '' }}">

	<input id="login-remember" type="hidden" name="remember" value="">

	<div class="user__container">

		<div class="user__error"></div>

		<div class="user__textfield user__textfield--username">
			<div class="textfield-label">{{ __('txt.user.input.username') }}</div>
			<input class="textfield user__username-input" type="text" name="username" value="{{ !empty($user['username']) ? $user['username'] : 'admin' }}">
		</div>
		<div class="user__textfield user__textfield--name">
			<div class="textfield-label">{{ __('txt.user.input.name') }}</div>
			<input class="textfield user__name-input" type="text" name="name" value="{{ !empty($user['name']) ? $user['name'] : 'Admin' }}">
		</div>
		<div class="user__textfield user__textfield--email">
			<div class="textfield-label">{{ __('txt.user.input.email') }}</div>
			<input class="textfield user__email-input" type="text" name="email" value="{{ !empty($user['email']) ? $user['email'] : '' }}">
		</div>
		<div class="user__textfield user__textfield--password">
			<div class="textfield-label">{{ __('txt.user.input.password') }}</div>
			<input class="textfield user__password-input" type="password" name="password">
		</div>
		@if ($setup)
		<div class="user__checkbox-wrapper checkbox-wrapper{{ Session::get('data.remember') ? ' active' : '' }}" onclick="toggleRememberLogin()">
			<div class="checkbox"><span class="checkbox-icon material-icons-sharp">check</span></div>
			<div class="checkbox-label">{{ __('txt.login.remember') }}</div>
		</div>
		@endif
		<div class="user__button">
			<button class="button user__button-input">
				@if ($setup)
					{{ __('txt.user.button.saveAndSignIn') }}
				@else
					{{ __('txt.user.button.save') }}
				@endif
			</button>
		</div>
	</div>
</div>

@include('footer')
