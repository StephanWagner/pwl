@include('header')

<div class="interface__wrapper">
	<div class="interface__container container">

		<div class="filters__wrapper">
			<div class="filters__container">
				<div class="interface__button filters__button">
					<span class="interface__button-icon filters__button-icon material-icons">filter_list</span>
					<span class="filters__label">{{ __('txt.filter.button') }}</span>
				</div>
			</div>
		</div>

		<div class="search__wrapper">
			<div class="search__container">
				<input class="search__textfield" type="text" placeholder="{{ __('txt.search.placeholder') }}">
			</div>
		</div>

		<div class="options__wrapper">
			<div class="options__container">
				<div class="interface__button options__button options__button--password-creator">
					<span class="interface__button-icon options__button-icon options__button-icon--password-creator material-icons">grading</span>
				</div>
				<div class="interface__button options__button options__button--add">
					<span class="interface__button-icon options__button-icon options__button-icon--add material-icons">add</span>
				</div>
			</div>
		</div>

	</div>
</div>

@include('footer')
