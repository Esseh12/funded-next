// Desktop navbar dropdown: keep open on hover, allow clicking dropdown content

document.addEventListener('DOMContentLoaded', function () {
	// For each main nav dropdown (Markets, FAQ, About FN, Partners, More)
	document.querySelectorAll('li.group').forEach((group) => {
		const button = group.querySelector('button');
		const dropdown = group.querySelector('div.absolute');
		if (!button || !dropdown) return;

		// Show dropdown on mouseenter (hover on button or group)
		group.addEventListener('mouseenter', () => {
			dropdown.style.opacity = '1';
			dropdown.style.pointerEvents = 'auto';
			dropdown.style.top = '52px'; // adjust for your layout if needed
		});

		// Hide dropdown on mouseleave (when leaving the whole group, including dropdown!)
		group.addEventListener('mouseleave', () => {
			dropdown.style.opacity = '0';
			dropdown.style.pointerEvents = 'none';
			dropdown.style.top = '52px';
		});

		// Optional: Prevent hiding when hovering dropdown itself
		// (Not strictly necessary if mouseleave is set on the group, but helps for complex layouts)
		dropdown.addEventListener('mouseenter', () => {
			dropdown.style.opacity = '1';
			dropdown.style.pointerEvents = 'auto';
		});
		dropdown.addEventListener('mouseleave', () => {
			dropdown.style.opacity = '0';
			dropdown.style.pointerEvents = 'none';
		});
	});
});
