<div class="modal-content modal-content--edit">

	{{ csrf_field() }}

	<input type="hidden" class="edit__id-input" value="">

	<div class="edit__wrapper">
		<div class="edit__container">
			<div class="edit__title-container">
				<input type="text" class="edit__title-input edit-textfield textfield" value="" spellcheck="false" autocomplete="false" placeholder="Title">
			</div>
			<div class="edit__textarea-options">
				<div class="edit__textarea-option button-link" onclick="insertMetachars('b')"><span class="edit__textarea-option-icon material-icons-sharp">format_bold</span></div>
				<div class="edit__textarea-option button-link" onclick="insertMetachars('i')"><span class="edit__textarea-option-icon material-icons-sharp">format_italic</span></div>
				<div class="edit__textarea-option button-link" onclick="insertMetachars('u')"><span class="edit__textarea-option-icon material-icons-sharp">format_underline</span></div>
				<div class="edit__textarea-option button-link" onclick="insertMetachars('s')"><span class="edit__textarea-option-icon material-icons-sharp">format_strikethrough</span></div>
				<div class="edit__textarea-option button-link" onclick="insertMetachars('a')"><span class="edit__textarea-option-icon material-icons-sharp">link</span></div>
			</div>
			<div class="edit__content-container">
				<textarea class="edit__content-input edit-textfield textfield" resize="false" spellcheck="false" autocomplete="false"></textarea>
			</div>
			<div class="edit__button-container">
				<button class="edit__button button" onclick="save()">Save</button>
			</div>
		</div>
	</div>
</div>
