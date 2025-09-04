document.addEventListener('DOMContentLoaded', function () {
	// --- Desktop Dropdowns ---
	document.querySelectorAll('li.group').forEach((group) => {
		const button = group.querySelector('button');
		const dropdown = group.querySelector('div.absolute');
		if (!button || !dropdown) return;

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

		// --- Mobile Dropdowns ---
		button.addEventListener('click', function (e) {
			if (!isMobile()) return; // Only for mobile
			e.stopPropagation();
			// Close other dropdowns
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.top = '0px';
			});
			const isShown = dropdown.style.opacity === '1';
			if (!isShown) {
				dropdown.style.opacity = '1';
				dropdown.style.pointerEvents = 'auto';
				dropdown.style.top = '0px'; // adjust for mobile
			} else {
				dropdown.style.opacity = '0';
				dropdown.style.pointerEvents = 'none';
				dropdown.style.top = '0px';
			}
		});
		dropdown.addEventListener('click', function (e) {
			if (isMobile()) e.stopPropagation();
		});
	});

	// --- Hamburger Mobile Menu ---
	const mobileMenuBtn = document.querySelector('button.nav\\:hidden');
	const navMenu = document.querySelector('nav');
	let navOpen = false;
	function openMobileMenu() {
		navMenu.style.opacity = '1';
		navMenu.style.pointerEvents = 'auto';
		navMenu.style.top = '90px'; // or '65px' for nav-sm, adjust as needed
		navOpen = true;
		document.body.classList.add('mobile-menu-open');

		// NEW: Set opacity to 1 for all .max-nav\:opacity-0 elements (show mobile menu content)
		document.querySelectorAll('.max-nav\\:opacity-0').forEach((el) => {
			el.style.opacity = '1';
		});
	}
	function closeMobileMenu() {
		navMenu.style.opacity = '0';
		navMenu.style.pointerEvents = 'none';
		navMenu.style.top = '';
		navOpen = false;
		document.body.classList.remove('mobile-menu-open');
		// Close any dropdowns
		document.querySelectorAll('li.group div.absolute').forEach((dd) => {
			dd.style.opacity = '0';
			dd.style.pointerEvents = 'none';
			dd.style.top = '0px';
		});

		// NEW: Set opacity to 0 for all .max-nav\:opacity-0 elements (hide mobile menu content)
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
		// Mobile: close everything
		if (navOpen && isMobile()) closeMobileMenu();
	});

	// --- Responsive Helper ---
	function isMobile() {
		// You can adjust the breakpoint as needed
		return window.innerWidth <= 1024;
	}
	// Optionally close desktop dropdowns on resize to mobile
	window.addEventListener('resize', function () {
		if (isMobile()) {
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.top = '0px';
			});
			closeMobileMenu();
		} else {
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.top = '52px';
			});
		}
	});
});
