<div class="interface__wrapper">
	<div class="interface__container container">

	<div class="options__wrapper options__wrapper--left">
			<div class="options__container">
				<div data-modal="edit" data-id="new" data-title="{{ __('txt.modal.add.title') }}" class="interface__button options__button options__button--add button-link">
					<span class="interface__button-icon options__button-icon options__button-icon--add material-icons-sharp">add</span>
				</div>
			</div>
		</div>

		<div class="search__wrapper">
			<div class="search__container">
				<input class="search__textfield"{{ $passwords->isEmpty() ? ' disabled="disabled"' : '' }} type="text" placeholder="{{ __('txt.search.placeholder') }}">
			</div>
		</div>

		<div class="options__wrapper options__wrapper--right">
			<div class="options__container">
				<div data-modal="passwords" data-title="{{ __('txt.modal.passwords.title') }}" class="interface__button options__button options__button--password-creator button-link">
					<span class="interface__button-icon options__button-icon options__button-icon--password-creator material-icons-sharp">grading</span>
				</div>
			</div>
		</div>

	</div>
</div>
