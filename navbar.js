document.addEventListener('DOMContentLoaded', function () {
	// --- Desktop Dropdowns ---
	document.querySelectorAll('li.group').forEach((group) => {
		const button = group.querySelector('button');
		const dropdown = group.querySelector('div.absolute');
		const chevron = button.querySelector('svg'); // Find the chevron icon inside the button
		if (!button || !dropdown || !chevron) return;

		let hoverTimeout;

		// Utility for desktop hover (menu stays open as you move over button/dropdown)
		function showDropdown() {
			clearTimeout(hoverTimeout);
			dropdown.style.opacity = '1';
			dropdown.style.pointerEvents = 'auto';
			dropdown.style.top = '52px';
		}
		function hideDropdown() {
			hoverTimeout = setTimeout(() => {
				dropdown.style.opacity = '0';
				dropdown.style.pointerEvents = 'none';
				dropdown.style.top = '52px';
			}, 120); // Small delay for ease of movement
		}

		// Desktop hover
		button.addEventListener('mouseenter', () => {
			if (!isMobile()) showDropdown();
		});
		dropdown.addEventListener('mouseenter', () => {
			if (!isMobile()) showDropdown();
		});
		button.addEventListener('mouseleave', () => {
			if (!isMobile()) hideDropdown();
		});
		dropdown.addEventListener('mouseleave', () => {
			if (!isMobile()) hideDropdown();
		});

		// --- Mobile Dropdowns (Inline Expansion) ---
		chevron.addEventListener('click', function (e) {
			if (!isMobile()) return; // Only for mobile
			e.stopPropagation();

			// Close other dropdowns first
			document.querySelectorAll('li.group').forEach((otherGroup) => {
				if (otherGroup !== group) {
					const otherDropdown = otherGroup.querySelector('div.absolute');
					const otherChevron = otherGroup.querySelector('button svg');
					if (otherDropdown && otherChevron) {
						// Reset to closed state
						otherDropdown.style.position = 'absolute';
						otherDropdown.style.opacity = '0';
						otherDropdown.style.pointerEvents = 'none';
						otherDropdown.style.top = '0px';
						otherDropdown.style.maxHeight = '0';
						otherDropdown.style.overflow = 'hidden';
						otherDropdown.style.transition =
							'max-height 0.3s ease, opacity 0.3s ease';
						// Reset chevron rotation
						otherChevron.style.transform = 'rotate(0deg)';
						otherChevron.style.transition = 'transform 0.3s ease';
					}
				}
			});

			const isOpen =
				dropdown.style.maxHeight && dropdown.style.maxHeight !== '0px';

			if (!isOpen) {
				// Open dropdown
				dropdown.style.position = 'static'; // Make it part of normal flow
				dropdown.style.opacity = '1';
				dropdown.style.pointerEvents = 'auto';
				dropdown.style.top = 'auto';
				dropdown.style.maxHeight = dropdown.scrollHeight + 'px'; // Set to content height
				dropdown.style.overflow = 'visible';
				dropdown.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';

				// Rotate chevron
				chevron.style.transform = 'rotate(180deg)';
				chevron.style.transition = 'transform 0.3s ease';
			} else {
				// Close dropdown
				dropdown.style.maxHeight = '0';
				dropdown.style.overflow = 'hidden';
				dropdown.style.opacity = '0';
				dropdown.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';

				// Reset chevron
				chevron.style.transform = 'rotate(0deg)';

				// After animation, reset to absolute positioning
				setTimeout(() => {
					dropdown.style.position = 'absolute';
					dropdown.style.pointerEvents = 'none';
					dropdown.style.top = '0px';
				}, 300);
			}
		});

		dropdown.addEventListener('click', function (e) {
			if (isMobile()) e.stopPropagation();
		});
	});

	// --- Hamburger Mobile Menu (Keep normal sidebar behavior) ---
	const mobileMenuBtn = document.querySelector('button.nav\\:hidden');
	const navMenu = document.querySelector('nav');
	let navOpen = false;

	function openMobileMenu() {
		navMenu.style.opacity = '1';
		navMenu.style.pointerEvents = 'auto';
		navMenu.style.top = '57px'; // Keep original positioning
		navMenu.style.maxWidth = '100VW'; // Keep original width
		navOpen = true;
		document.body.classList.add('mobile-menu-open');

		// Set opacity to 1 for all .max-nav\:opacity-0 elements (show mobile menu content)
		document.querySelectorAll('.max-nav\\:opacity-0').forEach((el) => {
			el.style.opacity = '1';
		});
	}

	function closeMobileMenu() {
		navMenu.style.opacity = '0';
		navMenu.style.pointerEvents = 'none';
		navMenu.style.top = ''; // Reset to original
		navOpen = false;
		document.body.classList.remove('mobile-menu-open');

		// Close any open dropdowns
		document.querySelectorAll('li.group').forEach((group) => {
			const dropdown = group.querySelector('div.absolute');
			const chevron = group.querySelector('button svg');
			if (dropdown && chevron) {
				dropdown.style.position = 'absolute';
				dropdown.style.opacity = '0';
				dropdown.style.pointerEvents = 'none';
				dropdown.style.top = '0px';
				dropdown.style.maxHeight = '0';
				dropdown.style.overflow = 'hidden';
				chevron.style.transform = 'rotate(0deg)';
			}
		});

		// Set opacity to 0 for all .max-nav\:opacity-0 elements (hide mobile menu content)
		document.querySelectorAll('.max-nav\\:opacity-0').forEach((el) => {
			el.style.opacity = '0';
		});
	}

	if (mobileMenuBtn && navMenu) {
		mobileMenuBtn.addEventListener('click', function (e) {
			e.stopPropagation();
			navOpen ? closeMobileMenu() : openMobileMenu();
		});
	}

	if (navMenu) {
		navMenu.addEventListener('click', function (e) {
			if (isMobile()) e.stopPropagation();
		});
	}

	// --- Close menus/dropdowns on outside click ---
	document.body.addEventListener('click', function () {
		// Desktop: close dropdowns
		if (!isMobile()) {
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.top = '52px';
			});
		}
		// Mobile: close hamburger menu but keep dropdowns working normally
		if (navOpen && isMobile()) closeMobileMenu();
	});

	// --- Responsive Helper ---
	function isMobile() {
		// You can adjust the breakpoint as needed
		return window.innerWidth <= 1024;
	}

	// Handle resize events
	window.addEventListener('resize', function () {
		if (isMobile()) {
			// Reset desktop dropdowns for mobile
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.position = 'absolute';
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.top = '0px';
				dd.style.maxHeight = '0';
			});
			// Reset chevrons
			document.querySelectorAll('li.group button svg').forEach((chevron) => {
				chevron.style.transform = 'rotate(0deg)';
			});
		} else {
			// Reset mobile dropdowns for desktop
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.position = 'absolute';
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.top = '52px';
				dd.style.maxHeight = '';
				dd.style.overflow = '';
			});
			// Reset chevrons
			document.querySelectorAll('li.group button svg').forEach((chevron) => {
				chevron.style.transform = 'rotate(0deg)';
			});
			// Close mobile menu
			closeMobileMenu();
		}
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('section button');

	buttons.forEach((button) => {
		button.addEventListener('click', function () {
			const content = this.nextElementSibling; // the div with answer text
			const icon = this.querySelector('svg path');

			// Close all other open answers
			buttons.forEach((btn) => {
				const otherContent = btn.nextElementSibling;
				const otherIcon = btn.querySelector('svg path');

				if (otherContent !== content) {
					otherContent.style.maxHeight = null;
					otherContent.style.transition = 'max-height 0.3s ease';
					otherIcon.setAttribute('d', 'M12 5V19M5 12H19'); // reset to plus
				}
			});

			// Toggle the clicked one
			if (content.style.maxHeight) {
				// currently open -> close
				content.style.maxHeight = null;
				icon.setAttribute('d', 'M12 5V19M5 12H19'); // plus icon
			} else {
				// open -> expand to scrollHeight
				content.style.maxHeight = content.scrollHeight + 'px';
				icon.setAttribute('d', 'M5 12H19'); // minus icon
			}
		});
	});
});
