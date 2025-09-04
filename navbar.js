// Improved Mobile Navbar: dropdown overlays below item, width matches dropdown content, normal mobile behavior

document.addEventListener('DOMContentLoaded', function () {
	// Helper: detect mobile
	function isMobile() {
		return window.innerWidth <= 1024;
	}

	// --- Desktop Dropdowns ---
	document.querySelectorAll('li.group').forEach((group) => {
		const button = group.querySelector('button');
		const dropdown = group.querySelector('div.absolute');
		const chevron = button && button.querySelector('svg');
		if (!button || !dropdown || !chevron) return;

		let hoverTimeout;

		// Desktop hover logic
		function showDropdown() {
			clearTimeout(hoverTimeout);
			dropdown.style.opacity = '1';
			dropdown.style.pointerEvents = 'auto';
			dropdown.style.top = '52px';
			dropdown.style.left = '';
			dropdown.style.right = '-150px';
			dropdown.style.width = '';
			dropdown.style.position = 'absolute';
			dropdown.style.zIndex = '';
			dropdown.style.background = '';
			dropdown.style.borderRadius = '';
			dropdown.style.boxShadow = '';
		}
		function hideDropdown() {
			hoverTimeout = setTimeout(() => {
				dropdown.style.opacity = '0';
				dropdown.style.pointerEvents = 'none';
				dropdown.style.top = '52px';
				dropdown.style.left = '';
				dropdown.style.right = '-150px';
				dropdown.style.width = '';
				dropdown.style.position = 'absolute';
				dropdown.style.zIndex = '';
				dropdown.style.background = '';
				dropdown.style.borderRadius = '';
				dropdown.style.boxShadow = '';
			}, 120);
		}

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

		// --- Mobile Dropdown ---
		chevron.addEventListener('click', function (e) {
			if (!isMobile()) return;
			e.stopPropagation();

			// Close other mobile dropdowns
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.position = 'absolute';
				dd.style.top = '';
				dd.style.left = '';
				dd.style.right = '-150px';
				dd.style.width = '';
				dd.style.zIndex = '';
				dd.style.background = '';
				dd.style.borderRadius = '';
				dd.style.boxShadow = '';
			});
			const isShown = dropdown.style.opacity === '1';
			if (!isShown) {
				// Position dropdown below button, overlay content, normal width
				dropdown.style.opacity = '1';
				dropdown.style.pointerEvents = 'auto';
				dropdown.style.position = 'absolute';
				dropdown.style.left = '0';
				dropdown.style.right = '0';
				dropdown.style.top = button.offsetHeight + 'px'; // Just beneath the button
				dropdown.style.width = 'auto'; // Use dropdown's CSS width
				dropdown.style.zIndex = '100';
				// dropdown.style.background = '#fff';
				dropdown.style.borderRadius = '0 0 16px 16px';
				dropdown.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
			} else {
				dropdown.style.opacity = '0';
				dropdown.style.pointerEvents = 'none';
				dropdown.style.position = 'absolute';
				dropdown.style.left = '';
				dropdown.style.right = '-150px';
				dropdown.style.top = '';
				dropdown.style.width = '';
				dropdown.style.zIndex = '';
				dropdown.style.background = '';
				dropdown.style.borderRadius = '';
				dropdown.style.boxShadow = '';
			}
		});

		// Prevent closing when interacting inside dropdown
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
		navMenu.style.top = '50px';
		navOpen = true;
		document.body.classList.add('mobile-menu-open');
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
		document.querySelectorAll('li.group div.absolute').forEach((dd) => {
			dd.style.opacity = '0';
			dd.style.pointerEvents = 'none';
			dd.style.position = 'absolute';
			dd.style.left = '';
			dd.style.right = '-150px';
			dd.style.top = '';
			dd.style.width = '';
			dd.style.zIndex = '';
			dd.style.background = '';
			dd.style.borderRadius = '';
			dd.style.boxShadow = '';
		});
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
		if (!isMobile()) {
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.position = 'absolute';
				dd.style.left = '';
				dd.style.right = '-150px';
				dd.style.top = '52px';
				dd.style.width = '';
				dd.style.zIndex = '';
				dd.style.background = '';
				dd.style.borderRadius = '';
				dd.style.boxShadow = '';
			});
		}
		if (navOpen && isMobile()) closeMobileMenu();
	});

	// --- Responsive Helper ---
	window.addEventListener('resize', function () {
		if (isMobile()) {
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.position = 'absolute';
				dd.style.left = '';
				dd.style.right = '-150px';
				dd.style.top = '';
				dd.style.width = '';
				dd.style.zIndex = '';
				dd.style.background = '';
				dd.style.borderRadius = '';
				dd.style.boxShadow = '';
			});
			closeMobileMenu();
		} else {
			document.querySelectorAll('li.group div.absolute').forEach((dd) => {
				dd.style.opacity = '0';
				dd.style.pointerEvents = 'none';
				dd.style.position = 'absolute';
				dd.style.left = '';
				dd.style.right = '-150px';
				dd.style.top = '52px';
				dd.style.width = '';
				dd.style.zIndex = '';
				dd.style.background = '';
				dd.style.borderRadius = '';
				dd.style.boxShadow = '';
			});
		}
	});
});
