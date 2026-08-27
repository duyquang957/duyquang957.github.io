(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector("[data-site-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  }

  function closeMenu(returnFocus) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    header?.classList.remove("menu-active");
    document.body.classList.remove("menu-open");
    if (returnFocus) menuToggle.focus();
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu(false);
      } else {
        menuToggle.setAttribute("aria-expanded", "true");
        mobileMenu.classList.add("is-open");
        header?.classList.add("menu-active");
        document.body.classList.add("menu-open");
      }
    });

    mobileMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu(false);
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-video-id]").forEach(function (button) {
    button.addEventListener("click", function () {
      const videoId = button.dataset.videoId;
      if (!/^[A-Za-z0-9_-]{11}$/.test(videoId || "")) return;
      const frame = document.createElement("iframe");
      frame.className = "video-frame";
      frame.title = button.dataset.videoTitle || "Product video";
      frame.src = "https://www.youtube-nocookie.com/embed/" + videoId + "?autoplay=1&rel=0";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allowFullscreen = true;
      button.replaceWith(frame);
      frame.focus();
    });
  });

  const lightbox = document.querySelector("[data-lightbox]");
  const galleryItems = Array.from(document.querySelectorAll("[data-gallery-item]"));
  if (lightbox && galleryItems.length) {
    const lightboxImage = lightbox.querySelector("[data-lightbox-image]");
    const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
    const previousButton = lightbox.querySelector("[data-lightbox-previous]");
    const nextButton = lightbox.querySelector("[data-lightbox-next]");
    const closeButton = lightbox.querySelector("[data-lightbox-close]");
    let activeIndex = 0;
    let opener = null;

    function showGalleryImage(index) {
      activeIndex = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[activeIndex];
      const image = item.querySelector("img");
      if (!image || !lightboxImage) return;
      lightboxImage.src = item.dataset.gallerySrc || image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      if (lightboxCaption) {
        lightboxCaption.textContent = image.alt + " · " + (activeIndex + 1) + " of " + galleryItems.length;
      }
    }

    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        opener = item;
        showGalleryImage(index);
        lightbox.showModal();
        closeButton?.focus();
      });
    });

    previousButton?.addEventListener("click", function () { showGalleryImage(activeIndex - 1); });
    nextButton?.addEventListener("click", function () { showGalleryImage(activeIndex + 1); });
    closeButton?.addEventListener("click", function () { lightbox.close(); });
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        lightbox.close();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showGalleryImage(activeIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showGalleryImage(activeIndex + 1);
      }
    });
    lightbox.addEventListener("close", function () {
      if (lightboxImage) lightboxImage.removeAttribute("src");
      opener?.focus();
    });
  }

  const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
  const languagePanels = Array.from(document.querySelectorAll("[data-lang-panel]"));
  if (languageButtons.length && languagePanels.length) {
    const documentLanguages = {
      en: "en",
      vi: "vi",
      fr: "fr",
      es: "es",
      pt: "pt-PT",
      br: "pt-BR",
      in: "hi-IN"
    };

    function selectLanguage(language, moveFocus) {
      languageButtons.forEach(function (button) {
        const selected = button.dataset.language === language;
        button.setAttribute("aria-pressed", selected ? "true" : "false");
        button.tabIndex = selected ? 0 : -1;
        if (selected && moveFocus) button.focus();
      });
      languagePanels.forEach(function (panel) {
        const selected = panel.dataset.langPanel === language;
        panel.classList.toggle("is-active", selected);
        panel.hidden = !selected;
      });
      document.documentElement.lang = documentLanguages[language] || "en";
    }

    languageButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        selectLanguage(button.dataset.language, false);
      });
      button.addEventListener("keydown", function (event) {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % languageButtons.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + languageButtons.length) % languageButtons.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = languageButtons.length - 1;
        selectLanguage(languageButtons[nextIndex].dataset.language, true);
      });
    });

    const initial = languageButtons.find(function (button) {
      return button.getAttribute("aria-pressed") === "true";
    }) || languageButtons[0];
    selectLanguage(initial.dataset.language, false);
  }

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  if (revealItems.length) {
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-revealed");
      });
    } else {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8%" }
      );
      revealItems.forEach(function (item) {
        revealObserver.observe(item);
      });
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
})();
