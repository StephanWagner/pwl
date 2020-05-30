<div class="modal-content modal-content--edit">

	{{ csrf_field() }}

	<input type="hidden" class="edit__id-input" value="">

	<div class="edit__wrapper">
		<div class="edit__container">
			<div class="edit__title-container">
				<input type="text" class="edit__title-input edit-textfield textfield" value="" spellcheck="false" autocomplete="false" placeholder="Title">
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
