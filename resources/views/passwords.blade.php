<div class="passwords__wrapper">
	<div class="passwords__container">
		@foreach ($passwords as $password)

			<div class="passwords__item-wrapper passwords__item-wrapper-{{ $password->id }}" data-id="{{ $password->id }}">
				<div class="passwords__item-container">
					<div class="passwords__title-wrapper">
						<div class="passwords__title-container container">
							<div class="passwords__title" data-password-title="{{ $password->id }}" onclick="togglePasswordContent({{ $password->id }})">
								{{ $password->title }}
							</div>
							<div class="passwords__title-button passwords__title-button--edit button-link" data-modal="edit" data-id="{{ $password->id }}" data-title="{{ __('txt.modal.edit.title') }}">
								<span class="passwords__title-button-icon passwords__title-button-icon--edit material-icons-sharp">create</span>
							</div>
							<div class="passwords__title-button passwords__title-button--delete button-link">
								<span class="passwords__title-button-icon passwords__title-button-icon--delete material-icons-sharp">delete</span>
							</div>
						</div>
					</div>
					<div class="passwords__content-toggler">
						<div class="passwords__content-wrapper">
							<div class="passwords__content-container container">
								<div class="passwords__content" data-password-content="{{ $password->id }}">{!! Crypt::decryptString($password->content) !!}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		@endforeach
	</div>
</div>




