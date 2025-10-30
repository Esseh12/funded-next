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

(function () {
	function qs(selector, root = document) {
		return root.querySelector(selector);
	}
	function qsa(selector, root = document) {
		return Array.from(root.querySelectorAll(selector));
	}

	document.addEventListener('DOMContentLoaded', function () {
		const wrap = qs('.js-toggle-wrap');
		if (!wrap) return;

		// find buttons: prefer a specific container, else search inside wrap
		const buttonContainer = qs('.js-country-toggle', wrap) || wrap;
		const buttons = qsa('button[data-country]', buttonContainer);
		if (!buttons.length) return;

		const highlight = qs('.js-toggle-highlight', wrap);
		const galleries = qsa('.country-gallery');

		// helper to set ARIA and active classes (you can customize classes below)
		const setButtonActive = (btn) => {
			buttons.forEach((b) => {
				b.classList.remove('bg-purple', 'text-white'); // remove old visual classes
				b.setAttribute('aria-pressed', 'false');
			});
			btn.classList.add('bg-purple', 'text-white');
			btn.setAttribute('aria-pressed', 'true');
		};

		// Position highlight relative to the wrapper
		const positionHighlight = (btn) => {
			if (!highlight) return;
			// If highlight is hidden on small screens (via CSS), still set position/width
			const wrapRect = wrap.getBoundingClientRect();
			const btnRect = btn.getBoundingClientRect();

			const left = btnRect.left - wrapRect.left + wrap.scrollLeft;
			const width = btnRect.width;

			// apply styles
			highlight.style.left = `${Math.round(left)}px`;
			highlight.style.width = `${Math.round(width)}px`;
		};

		// Show the gallery for the selected country and hide others
		const showGallery = (country) => {
			if (!galleries.length) return;
			galleries.forEach((g) => {
				if (g.dataset.country === country) {
					g.style.display = '';
					g.classList.remove('hidden');
				} else {
					g.style.display = 'none';
					g.classList.add('hidden');
				}
			});
		};

		// Activate a button (visual + highlight + gallery)
		const activate = (btn) => {
			if (!btn) return;
			setButtonActive(btn);
			positionHighlight(btn);
			const country = btn.dataset.country;
			if (country) showGallery(country);
		};

		// Event listeners for each button
		buttons.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				activate(btn);
			});
			// optional: handle keyboard activation (Enter / Space)
			btn.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					activate(btn);
				}
			});
		});

		// Initialize: prefer a button that already appears active (has bg-purple or aria-pressed true),
		// otherwise use the first button.
		let initial =
			buttons.find(
				(b) =>
					b.classList.contains('bg-purple') ||
					b.getAttribute('aria-pressed') === 'true'
			) || buttons[0];
		// Small timeout to allow layout (images/ fonts) to settle so measurements are correct
		setTimeout(() => activate(initial), 50);

		// Reposition highlight on window resize or orientation change
		let resizeTimer = null;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				const active =
					buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ||
					buttons[0];
				positionHighlight(active);
			}, 80);
		});

		// If DOM changes later (you add more buttons/galleries dynamically), you can call:
		// window.dispatchEvent(new Event('resize')) or re-run the activate function on the new element.
	});
})();

(function () {
	function qs(selector, root = document) {
		return root.querySelector(selector);
	}
	function qsa(selector, root = document) {
		return Array.from(root.querySelectorAll(selector));
	}

	document.addEventListener('DOMContentLoaded', function () {
		const wrappers = qsa('.js-toggle-wrap');
		if (!wrappers.length) return;

		wrappers.forEach((wrap) => {
			const buttonContainer = qs('.js-country-toggle', wrap) || wrap;
			const buttons = qsa('button[data-country]', buttonContainer);
			if (!buttons.length) return;

			const highlight = qs('.js-toggle-highlight', wrap);
			// Scope galleries to the same section as the wrapper for isolation
			const section = wrap.closest('section') || document;
			const galleries = qsa('.country-gallery', section);

			// Visual activation for buttons
			const setButtonActive = (btn) => {
				buttons.forEach((b) => {
					b.classList.remove('bg-purple', 'text-white'); // visual classes you used
					b.setAttribute('aria-pressed', 'false');
				});
				if (!btn) return;
				btn.classList.add('bg-purple', 'text-white');
				btn.setAttribute('aria-pressed', 'true');
			};

			// Position highlight relative to the wrapper element
			const positionHighlight = (btn) => {
				if (!highlight || !btn) return;
				const wrapRect = wrap.getBoundingClientRect();
				const btnRect = btn.getBoundingClientRect();
				const left = btnRect.left - wrapRect.left + wrap.scrollLeft;
				const width = btnRect.width;
				highlight.style.left = `${Math.round(left)}px`;
				highlight.style.width = `${Math.round(width)}px`;
			};

			// Show correct gallery in this section
			const showGallery = (country) => {
				if (!galleries.length) return;
				galleries.forEach((g) => {
					if (g.dataset.country === country) {
						g.style.display = '';
						g.classList.remove('hidden');
					} else {
						g.style.display = 'none';
						g.classList.add('hidden');
					}
				});
			};

			const activate = (btn) => {
				if (!btn) return;
				setButtonActive(btn);
				positionHighlight(btn);
				const country = btn.dataset.country;
				if (country) showGallery(country);
			};

			// Attach listeners
			buttons.forEach((btn) => {
				btn.addEventListener('click', () => activate(btn));
				btn.addEventListener('keydown', (e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						activate(btn);
					}
				});
			});

			// Initial activation: prefer an already-marked button, else first
			const initial =
				buttons.find(
					(b) =>
						b.classList.contains('bg-purple') ||
						b.getAttribute('aria-pressed') === 'true'
				) || buttons[0];
			// Slight delay so layout settles (images, fonts)
			setTimeout(() => activate(initial), 50);

			// Reposition on resize
			let resizeTimer = null;
			window.addEventListener('resize', () => {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(() => {
					const active =
						buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ||
						buttons[0];
					positionHighlight(active);
				}, 80);
			});
		});
	});
})();

(function () {
	function qs(selector, root = document) {
		return root.querySelector(selector);
	}
	function qsa(selector, root = document) {
		return Array.from(root.querySelectorAll(selector));
	}

	document.addEventListener('DOMContentLoaded', function () {
		const wrappers = qsa('.js-toggle-wrap');
		if (!wrappers.length) return;

		wrappers.forEach((wrap) => {
			const buttonContainer = qs('.js-country-toggle', wrap) || wrap;
			const buttons = qsa('button[data-country]', buttonContainer);
			if (!buttons.length) return;

			const highlight = qs('.js-toggle-highlight', wrap);
			// Scope galleries to the same section as the wrapper for isolation
			const section = wrap.closest('section') || document;
			const galleries = qsa('.country-gallery', section);

			// Visual activation for buttons
			const setButtonActive = (btn) => {
				buttons.forEach((b) => {
					b.classList.remove('bg-purple', 'text-white'); // visual classes you used
					b.setAttribute('aria-pressed', 'false');
				});
				if (!btn) return;
				btn.classList.add('bg-purple', 'text-white');
				btn.setAttribute('aria-pressed', 'true');
			};

			// Position highlight relative to the wrapper element
			const positionHighlight = (btn) => {
				if (!highlight || !btn) return;
				const wrapRect = wrap.getBoundingClientRect();
				const btnRect = btn.getBoundingClientRect();
				const left = btnRect.left - wrapRect.left + wrap.scrollLeft;
				const width = btnRect.width;
				highlight.style.left = `${Math.round(left)}px`;
				highlight.style.width = `${Math.round(width)}px`;
			};

			// Show correct gallery in this section
			const showGallery = (country) => {
				if (!galleries.length) return;
				galleries.forEach((g) => {
					if (g.dataset.country === country) {
						g.style.display = '';
						g.classList.remove('hidden');
					} else {
						g.style.display = 'none';
						g.classList.add('hidden');
					}
				});
			};

			const activate = (btn) => {
				if (!btn) return;
				setButtonActive(btn);
				positionHighlight(btn);
				const country = btn.dataset.country;
				if (country) showGallery(country);
			};

			// Attach listeners
			buttons.forEach((btn) => {
				btn.addEventListener('click', () => activate(btn));
				btn.addEventListener('keydown', (e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						activate(btn);
					}
				});
			});

			// Initial activation: prefer an already-marked button, else first
			const initial =
				buttons.find(
					(b) =>
						b.classList.contains('bg-purple') ||
						b.getAttribute('aria-pressed') === 'true'
				) || buttons[0];
			// Slight delay so layout settles (images, fonts)
			setTimeout(() => activate(initial), 50);

			// Reposition on resize
			let resizeTimer = null;
			window.addEventListener('resize', () => {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(() => {
					const active =
						buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ||
						buttons[0];
					positionHighlight(active);
				}, 80);
			});
		});
	});
})();

// Initialize Swiper for the events slider.
// Requirements:
// - include Swiper CSS and JS (CDN links shown in the HTML file above).
// - keep .custom-event-slider on the .swiper container.
// - prev button has .prev-btn, next button has .next-btn (already in your markup).
// This file must be included after Swiper JS (defer or before </body>).

document.addEventListener('DOMContentLoaded', function () {
	// Defensive: ensure Swiper is loaded
	if (typeof Swiper === 'undefined') {
		console.warn(
			'Swiper is not loaded. Make sure you include swiper-bundle.min.js before this script.'
		);
		return;
	}

	const sliderEl = document.querySelector('.custom-event-slider');
	if (!sliderEl) return;

	const swiper = new Swiper(sliderEl, {
		// Let slides size themselves (they have their own widths); Swiper will measure them
		slidesPerView: 'auto',
		spaceBetween: 22,
		centeredSlides: false,
		loop: false,
		// navigation using your existing buttons
		navigation: {
			nextEl: '.next-btn',
			prevEl: '.prev-btn',
		},
		// optional UX
		keyboard: { enabled: true },
		grabCursor: true,
		// observe DOM changes so Swiper recalculates when slides/images load or change
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		// make sure swiper updates when images load to recalc sizes
		on: {
			init() {
				// update after images load
				const imgs = sliderEl.querySelectorAll('img');
				let loaded = 0;
				if (!imgs.length) return;
				imgs.forEach((img) => {
					if (img.complete) {
						loaded++;
					} else {
						img.addEventListener('load', () => {
							loaded++;
							if (loaded === imgs.length) swiper.update();
						});
						img.addEventListener('error', () => {
							loaded++;
							if (loaded === imgs.length) swiper.update();
						});
					}
				});
				// If all images were already loaded, force update
				if (loaded === imgs.length) {
					setTimeout(() => swiper.update(), 50);
				}
			},
		},
		breakpoints: {
			640: {
				spaceBetween: 18,
			},
			1024: {
				spaceBetween: 22,
			},
			1280: {
				spaceBetween: 28,
			},
		},
	});

	// Expose for debugging
	window.fundedNextEventsSwiper = swiper;
});
