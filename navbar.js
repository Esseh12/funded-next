document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('li.group').forEach((group) => {
		const button = group.querySelector('button');
		const dropdown = group.querySelector('div.absolute');
		if (!button || !dropdown) return;

		let hoverTimeout;

		// Utility to show dropdown
		function showDropdown() {
			clearTimeout(hoverTimeout);
			dropdown.style.opacity = '1';
			dropdown.style.pointerEvents = 'auto';
			dropdown.style.top = '52px';
		}

		// Utility to hide dropdown (with small delay to allow mouse to move between button and dropdown)
		function hideDropdown() {
			hoverTimeout = setTimeout(() => {
				dropdown.style.opacity = '0';
				dropdown.style.pointerEvents = 'none';
				dropdown.style.top = '52px';
			}, 120); // 120ms delay makes it feel natural
		}

		// Show on mouseenter for button or dropdown
		button.addEventListener('mouseenter', showDropdown);
		dropdown.addEventListener('mouseenter', showDropdown);

		// Hide on mouseleave for button or dropdown
		button.addEventListener('mouseleave', hideDropdown);
		dropdown.addEventListener('mouseleave', hideDropdown);

		// Optional: open on click
		button.addEventListener('click', (e) => {
			e.stopPropagation();
			showDropdown();
		});
	});
});
