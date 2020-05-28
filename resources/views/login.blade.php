@include('header')

<div class="login__error">
	@if ($error = Session::get('data.error'))
		{{ $error }}
	@else
		&nbsp;
	@endif
</div>

<form method="post" action="{{ url('/loginRequest') }}">
	{{ csrf_field() }}
	<div class="login__wrapper">
		<div class="login__container">
			<div class="login__textfield login__textfield--username">
				<input type="text" name="username" value="{{ Session::get('data.username') }}" placeholder="{{ __('txt.login.username') }}">
			</div>
			<div class="login__textfield login__textfield--password">
				<input type="password" name="password" placeholder="{{ __('txt.login.password') }}">
			</div>
			<div class="login__checkbox">
				<input id="login-remember" type="checkbox" name="remember" value="1" {!! Session::get('data.remember') ? ' checked="checked"' : '' !!}><label for="login-remember">{{ __('txt.login.remember') }}</label>
			</div>
			<div class="login__button">
				<button type="submit">{{ __('txt.login.button') }}</button>
			</div>
		</div>
	</div>
</form>

@include('footer')
