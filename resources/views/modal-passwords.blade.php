<div class="modal-content modal-content--passwords">
	<div class="random-passwords__wrapper">
		<div class="random-passwords__options">

			<div class="random-passwords__options-column">
				<div class="random-passwords-options__label-container" data-option="uppercase" onclick="toggleRandomPasswordOption('uppercase')">
					<div class="random-passwords-options__checkbox-container">
						<span class="random-passwords-options__checkbox-icon material-icons-sharp">check_box_outline_blank</span>
					</div>
					<div class="random-passwords-options__label">ABC</div>
				</div>
				<div class="random-passwords-options__label-container" data-option="lowercase" onclick="toggleRandomPasswordOption('lowercase')">
					<div class="random-passwords-options__checkbox-container">
						<span class="random-passwords-options__checkbox-icon material-icons-sharp">check_box_outline_blank</span>
					</div>
					<div class="random-passwords-options__label">abc</div>
				</div>
			</div>

			<div class="random-passwords__options-column">
				<div class="random-passwords-options__label-container" data-option="numbers" onclick="toggleRandomPasswordOption('numbers')">
					<div class="random-passwords-options__checkbox-container">
						<span class="random-passwords-options__checkbox-icon material-icons-sharp">check_box_outline_blank</span>
					</div>
					<div class="random-passwords-options__label">123</div>
				</div>
				<div class="random-passwords-options__label-container" data-option="special" onclick="toggleRandomPasswordOption('special')">
					<div class="random-passwords-options__checkbox-container">
						<span class="random-passwords-options__checkbox-icon material-icons-sharp">check_box_outline_blank</span>
					</div>
					<div class="random-passwords-options__label">!@#</div>
				</div>
			</div>

			<div class="random-passwords__options-column random-passwords__options-column--fill">
				<div class="random-passwords__length-option-wrapper">
					<input class="random-password__length-option" type="range" min="6" max="32" step="1" value="26">
				</div>
				<div class="random-passwords__probability-wrapper">
					{!! __('txt.modal.permutations') !!}
				</div>
			</div>


		</div>
		<div class="random-passwords__list"></div>
	</div>
</div>
