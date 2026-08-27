(function () {
  "use strict";

  const state = {
    items: [],
    selectedId: "",
    filter: "all",
    query: "",
    activeLayer: 0
  };

  const rail = document.querySelector("[data-catalogue-rail]");
  const tabs = Array.from(document.querySelectorAll("[data-catalogue-filter]"));
  const search = document.querySelector("[data-catalogue-search]");
  const clearSearch = document.querySelector("[data-clear-search]");
  const empty = document.querySelector("[data-catalogue-empty]");
  const errorPanel = document.querySelector("[data-catalogue-error]");
  const status = document.querySelector("[data-catalogue-status]");
  const heroTitle = document.querySelector("[data-selected-title]");
  const heroSummary = document.querySelector("[data-selected-summary]");
  const heroKind = document.querySelector("[data-selected-kind]");
  const heroBadge = document.querySelector("[data-selected-badge]");
  const heroPlatforms = document.querySelector("[data-selected-platforms]");
  const heroLink = document.querySelector("[data-selected-link]");
  const backdropLayers = Array.from(document.querySelectorAll("[data-backdrop-layer]"));

  function isSafeUrl(value) {
    if (typeof value !== "string" || !value || value !== value.trim()) return false;
    if (/[\u0000-\u001f\u007f]/.test(value) || value.startsWith("//") || value.includes("\\")) return false;
    if (/^https:\/\//i.test(value)) {
      try {
        const parsed = new URL(value);
        return parsed.protocol === "https:" && Boolean(parsed.hostname) && !parsed.username && !parsed.password;
      } catch (_error) {
        return false;
      }
    }
    if (/^[a-z][a-z\d+.-]*:/i.test(value)) return false;
    const pathOnly = value.split(/[?#]/, 1)[0];
    if (!pathOnly || /%2f|%5c/i.test(pathOnly)) return false;
    try {
      const rootRelative = pathOnly.replace(/^\//, "").replace(/^(?:\.\/)+/, "");
      const decoded = decodeURIComponent(rootRelative);
      if (!decoded || decoded.includes("\0")) return false;
      return !decoded.split("/").some(function (segment) { return segment === "." || segment === ".."; });
    } catch (_error) {
      return false;
    }
  }

  function canonicalUrl(value) {
    if (/^https:\/\//i.test(value)) return new URL(value).href;
    return value.split(/[?#]/, 1)[0].replace(/^\//, "").replace(/^(?:\.\/)+/, "");
  }

  function navigableHref(value) {
    if (window.location.protocol !== "file:" || /^https:\/\//i.test(value)) return value;
    const parts = value.match(/^([^?#]*)([?#].*)?$/);
    if (!parts || !parts[1].endsWith("/")) return value;
    return parts[1] + "index.html" + (parts[2] || "");
  }

  function validateItem(item, ids, hrefs) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return null;
    const allowed = new Set(["id", "title", "kind", "href", "summary", "cover", "icon", "platforms", "badge", "accent", "hidden"]);
    if (Object.keys(item).some(function (key) { return !allowed.has(key); })) return null;
    const required = ["id", "title", "kind", "href", "summary", "cover", "icon"];
    if (required.some(function (key) { return typeof item[key] !== "string" || !item[key] || item[key] !== item[key].trim(); })) return null;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || ids.has(item.id)) return null;
    if (item.kind !== "game" && item.kind !== "app") return null;
    if (!isSafeUrl(item.href) || !isSafeUrl(item.cover) || !isSafeUrl(item.icon)) return null;
    const href = canonicalUrl(item.href);
    if (hrefs.has(href)) return null;
    if (item.platforms !== undefined && (!Array.isArray(item.platforms) || !item.platforms.length || item.platforms.some(function (platform) { return typeof platform !== "string" || !platform || platform !== platform.trim(); }))) return null;
    if (item.accent !== undefined && (typeof item.accent !== "string" || !/^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(item.accent))) return null;
    if (item.badge !== undefined && (typeof item.badge !== "string" || !item.badge || item.badge !== item.badge.trim())) return null;
    if (item.hidden !== undefined && typeof item.hidden !== "boolean") return null;
    ids.add(item.id);
    hrefs.add(href);
    return {
      id: item.id,
      title: item.title.trim(),
      kind: item.kind,
      href: item.href.trim(),
      summary: item.summary.trim(),
      cover: item.cover.trim(),
      icon: item.icon.trim(),
      platforms: (item.platforms || []).map(function (value) { return value.trim(); }),
      badge: (item.badge || "").trim(),
      accent: item.accent || "#3b82f6",
      hidden: item.hidden === true
    };
  }

  function assignImageFallback(image, fallback) {
    image.addEventListener("error", function () {
      if (image.dataset.fallbackApplied === "true") return;
      image.dataset.fallbackApplied = "true";
      image.src = fallback;
    });
  }

  function createCard(item, index) {
    const link = document.createElement("a");
    link.className = "catalogue-card";
    link.dataset.catalogueCard = item.id;
    link.dataset.kind = item.kind;
    link.dataset.search = (item.title + " " + item.summary + " " + item.platforms.join(" ")).toLowerCase();
    link.href = navigableHref(item.href);
    link.style.setProperty("--card-accent", item.accent);
    link.setAttribute("aria-label", "Open " + item.title);
    if (/^https:\/\//i.test(item.href)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    const media = document.createElement("span");
    media.className = "catalogue-card__media";
    media.setAttribute("aria-hidden", "true");
    const cover = document.createElement("img");
    cover.src = item.cover;
    cover.alt = "";
    cover.loading = index < 3 ? "eager" : "lazy";
    cover.decoding = "async";
    assignImageFallback(cover, "images/generated/responsive/playluma-hero-960.jpg");
    media.appendChild(cover);

    const veil = document.createElement("span");
    veil.className = "catalogue-card__veil";
    veil.setAttribute("aria-hidden", "true");

    const content = document.createElement("span");
    content.className = "catalogue-card__content";
    const icon = document.createElement("img");
    icon.className = "catalogue-card__icon";
    icon.src = item.icon;
    icon.alt = "";
    icon.loading = "lazy";
    icon.decoding = "async";
    assignImageFallback(icon, "assets/playluma-icon-96.png");
    const copy = document.createElement("span");
    copy.className = "catalogue-card__copy";
    const kind = document.createElement("span");
    kind.className = "catalogue-card__kind";
    kind.textContent = item.kind;
    const title = document.createElement("span");
    title.className = "catalogue-card__title";
    title.textContent = item.title;
    copy.append(kind, title);
    content.append(icon, copy);
    link.append(media, veil, content);

    link.addEventListener("mouseenter", function () { selectItem(item.id); });
    link.addEventListener("focus", function () { selectItem(item.id); });
    link.addEventListener("keydown", handleCardKeydown);
    return link;
  }

  function handleCardKeydown(event) {
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    const cards = visibleCards();
    if (!cards.length) return;
    event.preventDefault();
    const current = cards.indexOf(event.currentTarget);
    const firstTop = cards[0].offsetTop;
    const nextRow = cards.findIndex(function (card) { return card.offsetTop > firstTop; });
    const columns = nextRow === -1 ? cards.length : nextRow;
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % cards.length;
    if (event.key === "ArrowLeft") next = (current - 1 + cards.length) % cards.length;
    if (event.key === "ArrowDown") next = Math.min(current + columns, cards.length - 1);
    if (event.key === "ArrowUp") next = Math.max(current - columns, 0);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = cards.length - 1;
    cards[next].focus();
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cards[next].scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "nearest" });
  }

  function visibleCards() {
    return Array.from(rail.querySelectorAll("[data-catalogue-card]:not([hidden])"));
  }

  function updateBackdrop(item) {
    if (backdropLayers.length < 2) return;
    const nextIndex = state.activeLayer === 0 ? 1 : 0;
    const next = backdropLayers[nextIndex];
    const current = backdropLayers[state.activeLayer];
    const preload = new Image();
    preload.onload = function () {
      next.style.backgroundImage = "url(\"" + item.cover.replace(/\"/g, "%22") + "\")";
      next.classList.add("is-active");
      current.classList.remove("is-active");
      state.activeLayer = nextIndex;
    };
    preload.onerror = function () {
      next.style.backgroundImage = "url(\"images/generated/responsive/playluma-hero-1600.jpg\")";
      next.classList.add("is-active");
      current.classList.remove("is-active");
      state.activeLayer = nextIndex;
    };
    preload.src = item.cover;
  }

  function selectItem(id, options) {
    const item = state.items.find(function (entry) { return entry.id === id; });
    if (!item || state.selectedId === id && !(options && options.force)) return;
    state.selectedId = id;
    document.documentElement.style.setProperty("--accent", item.accent);
    heroTitle.textContent = item.title;
    heroSummary.textContent = item.summary;
    heroKind.textContent = item.kind;
    heroBadge.textContent = item.badge || "Playluma original";
    heroPlatforms.textContent = item.platforms.length ? item.platforms.join(" · ") : "Explore now";
    heroLink.href = navigableHref(item.href);
    heroLink.setAttribute("aria-label", "Open " + item.title);
    if (/^https:\/\//i.test(item.href)) {
      heroLink.target = "_blank";
      heroLink.rel = "noopener noreferrer";
    } else {
      heroLink.removeAttribute("target");
      heroLink.removeAttribute("rel");
    }
    rail.querySelectorAll("[data-catalogue-card]").forEach(function (card) {
      const selected = card.dataset.catalogueCard === item.id;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-current", selected ? "true" : "false");
    });
    updateBackdrop(item);
  }

  function matches(item) {
    if (item.hidden) return false;
    if (state.filter !== "all" && item.kind !== state.filter) return false;
    if (!state.query) return true;
    const haystack = (item.title + " " + item.summary + " " + item.platforms.join(" ") + " " + item.badge).toLowerCase();
    return haystack.includes(state.query);
  }

  function applyFilters() {
    const matchesById = new Set(state.items.filter(matches).map(function (item) { return item.id; }));
    rail.querySelectorAll("[data-catalogue-card]").forEach(function (card) {
      card.hidden = !matchesById.has(card.dataset.catalogueCard);
    });
    const cards = visibleCards();
    empty.classList.toggle("is-visible", cards.length === 0);
    rail.hidden = cards.length === 0;
    status.textContent = cards.length + (cards.length === 1 ? " title" : " titles") + " in this view";
    if (cards.length && !matchesById.has(state.selectedId)) {
      selectItem(cards[0].dataset.catalogueCard, { force: true });
    }
  }

  function render(items) {
    const fragment = document.createDocumentFragment();
    items.forEach(function (item, index) {
      fragment.appendChild(createCard(item, index));
    });
    rail.replaceChildren(fragment);
    window.requestAnimationFrame(function () {
      rail.querySelectorAll(".catalogue-card").forEach(function (card, index) {
        window.setTimeout(function () { card.classList.add("is-visible"); }, index * 65);
      });
    });
    applyFilters();

  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      state.filter = tab.dataset.catalogueFilter;
      tabs.forEach(function (candidate) {
        candidate.setAttribute("aria-pressed", candidate === tab ? "true" : "false");
      });
      applyFilters();
    });
    tab.addEventListener("keydown", function (event) {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const current = tabs.indexOf(tab);
      let next = current;
      if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      tabs[next].focus();
      tabs[next].click();
    });
  });

  search?.addEventListener("input", function () {
    state.query = search.value.trim().toLowerCase();
    clearSearch.classList.toggle("is-visible", Boolean(state.query));
    applyFilters();
  });

  clearSearch?.addEventListener("click", function () {
    search.value = "";
    state.query = "";
    clearSearch.classList.remove("is-visible");
    applyFilters();
    search.focus();
  });

  Promise.resolve()
    .then(function () {
      return window.PLAYLUMA_CATALOG;
    })
    .then(function (data) {
      if (!data || data.version !== 1 || !Array.isArray(data.items)) throw new Error("Unsupported catalogue format");
      const ids = new Set();
      const hrefs = new Set();
      const valid = data.items.map(function (item) { return validateItem(item, ids, hrefs); }).filter(Boolean);
      if (!valid.length || valid.length !== data.items.length) throw new Error("Invalid catalogue item");
      state.items = valid;
      render(valid);
    })
    .catch(function () {
      errorPanel.classList.add("is-visible");
      rail.hidden = true;
      document.querySelector(".catalogue-tools").hidden = true;
      status.textContent = "Catalogue unavailable";
    });
})();
