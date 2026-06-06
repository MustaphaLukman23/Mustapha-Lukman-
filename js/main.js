/* =================================================================
   Blogr Landing Page — Interactions
   - Mobile menu toggle (open/close, accessible)
   - Dropdown menus (Product / Company / Connect)
   - Close on outside click, Escape key, and viewport resize
   ================================================================= */
(function () {
  "use strict";

  const MOBILE_BREAKPOINT = 700;

  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const dropdownButtons = Array.from(
    document.querySelectorAll(".nav__dropdown-btn")
  );

  /* ---------- Helpers ---------- */
  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  function closeAllDropdowns(except) {
    dropdownButtons.forEach((btn) => {
      if (btn !== except) btn.setAttribute("aria-expanded", "false");
    });
  }

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    closeAllDropdowns();
  }

  function openMenu() {
    if (!menu || !toggle) return;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  /* ---------- Mobile menu toggle ---------- */
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });
  }

  /* ---------- Dropdowns ---------- */
  dropdownButtons.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      const expanded = btn.getAttribute("aria-expanded") === "true";
      closeAllDropdowns(btn);
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    });
  });

  /* ---------- Close dropdowns when clicking outside ---------- */
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav__item")) {
      closeAllDropdowns();
    }
  });

  /* ---------- Keyboard: Escape closes everything ---------- */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllDropdowns();
      if (isMobile()) closeMenu();
    }
  });

  /* ---------- Reset state when crossing the breakpoint ---------- */
  let resizeTimer;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (!isMobile()) {
        // back on desktop: ensure mobile menu state is cleared
        menu && menu.classList.remove("is-open");
        toggle && toggle.setAttribute("aria-expanded", "false");
        closeAllDropdowns();
      }
    }, 150);
  });
})();
