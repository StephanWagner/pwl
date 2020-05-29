@include('header')

<div class="interface__wrapper">
	<div class="interface__container container">

		<div class="filters__wrapper">
			<div class="filters__container">
				<div class="interface__button filters__button button-link">
					<span class="interface__button-icon filters__button-icon material-icons-sharp">filter_list</span>
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
				<div data-modal="passwords" data-title="{{ __('txt.modal.passwords.title') }}" class="interface__button options__button options__button--password-creator button-link">
					<span class="interface__button-icon options__button-icon options__button-icon--password-creator material-icons-sharp">grading</span>
				</div>
				<div data-modal="add" data-title="{{ __('txt.modal.add.title') }}" class="interface__button options__button options__button--add button-link">
					<span class="interface__button-icon options__button-icon options__button-icon--add material-icons-sharp">add</span>
				</div>
			</div>
		</div>

	</div>
</div>

@include('modal-add')
@include('modal-passwords')

@include('footer')
