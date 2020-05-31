<div class="passwords__wrapper">
	<div class="passwords__container">
		@foreach ($passwords as $password)

			<div class="passwords__item-wrapper" data-id="{{ $password->id }}">
				<div class="passwords__item-container container">
					<div class="passwords__title-container" onclick="togglePasswordContent({{ $password->id }})">
						<div class="passwords__title" data-password-title="{{ $password->id }}">
							{{ $password->title }}
						</div>
						<div class="passwords__edit-button button-link" data-modal="edit" data-id="{{ $password->id }}" data-title="{{ __('txt.modal.edit.title') }}">
							<span class="passwords__edit-button-icon material-icons-sharp">create</span>
						</div>
						<div class="passwords__delete-button button-link">
							<span class="passwords__delete-button-icon material-icons-sharp">delete</span>
						</div>
					</div>
					<div class="passwords__content" data-password-content="{{ $password->id }}">{{ Crypt::decryptString($password->content) }}</div>
				</div>
			</div>

		@endforeach
	</div>
</div>




