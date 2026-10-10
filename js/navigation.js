const PAGE_ROUTES = {
  aboutme: { id: "about", title: "Raj Firke — About" },
  experience: { id: "expid", title: "Raj Firke — Experience" },
  skills: { id: "skills", title: "Raj Firke — Skills" },
  projects: { id: "products", title: "Raj Firke — Projects" },
  research: { id: "research", title: "Raj Firke — Research" },
  opensource: { id: "opensource", title: "Raj Firke — Open Source" },
  education: { id: "edu", title: "Raj Firke — Education" },
  certificates: { id: "faqs", title: "Raj Firke — Certificates" },
};

const ROUTE_ALIASES = {
  about: "aboutme",
};

const HASH_ROUTES = {
  home: "",
  about: "aboutme",
  expid: "experience",
  skills: "skills",
  products: "projects",
  research: "research",
  opensource: "opensource",
  edu: "education",
  faqs: "certificates",
};

const KNOWN_SLUGS = Object.assign({}, PAGE_ROUTES, ROUTE_ALIASES);

function pathParts() {
  const parts = location.pathname.split("/").filter(Boolean);
  if (parts.length && /index\.html?$/i.test(parts[parts.length - 1])) parts.pop();
  return parts;
}

function siteRoot() {
  const parts = pathParts();
  const last = (parts[parts.length - 1] || "").toLowerCase();
  if (last && Object.prototype.hasOwnProperty.call(KNOWN_SLUGS, last)) parts.pop();
  let root = "/" + parts.join("/");
  if (!root.endsWith("/")) root += "/";
  return root;
}

function canonicalSlug(slug) {
  const key = (slug || "").toLowerCase();
  if (!key) return "";
  if (ROUTE_ALIASES[key]) return ROUTE_ALIASES[key];
  if (PAGE_ROUTES[key]) return key;
  return "";
}

function readSlug() {
  const hash = location.hash.replace(/^#/, "");
  const parts = pathParts();
  const last = (parts[parts.length - 1] || "").toLowerCase();
  const fromPath = Object.prototype.hasOwnProperty.call(KNOWN_SLUGS, last) ? last : "";
  if (fromPath) return fromPath;
  if (hash && Object.prototype.hasOwnProperty.call(HASH_ROUTES, hash)) return HASH_ROUTES[hash];
  return "";
}

function routePath(slug) {
  const root = siteRoot();
  return slug ? root + slug : root;
}

function sectionIdFor(slug) {
  if (!slug) return "home";
  return (PAGE_ROUTES[slug] && PAGE_ROUTES[slug].id) || "home";
}

function titleFor(slug) {
  if (!slug) return "Raj Firke";
  return (PAGE_ROUTES[slug] && PAGE_ROUTES[slug].title) || "Raj Firke";
}

function setActiveSection(sectionId) {
  document.querySelectorAll(".navigation_link").forEach((li) => {
    const link = li.querySelector("a[data-section]");
    const on = link && link.getAttribute("data-section") === sectionId;
    li.classList.toggle("navigation_selected", Boolean(on));
    if (link) {
      if (on) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
  });

  const current = document.querySelector('.navigation_link a[data-section="' + sectionId + '"]');
  const wrap = current && current.closest(".navigation_link-wrapper");
  if (current && wrap) {
    const left = current.offsetLeft - wrap.clientWidth / 2 + current.clientWidth / 2;
    wrap.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }
}

function scrollToSection(sectionId, immediate) {
  const yBefore = window.scrollY;
  if (!sectionId || sectionId === "home") {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: Boolean(immediate) });
    else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
    return yBefore;
  }

  const el = document.getElementById(sectionId);
  if (!el) return yBefore;

  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -16, immediate: Boolean(immediate) });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: immediate ? "auto" : "smooth" });
  }
  return yBefore;
}

function writeRoute(slug, mode) {
  const next = routePath(slug);
  if (location.pathname === next && !location.hash) return;
  const y = window.scrollY;
  const state = { route: slug };
  if (mode === "push") history.pushState(state, "", next);
  else history.replaceState(state, "", next);
  if (Math.abs(window.scrollY - y) > 2) window.scrollTo(0, y);
}

function applyRoute(slug, options) {
  const opts = options || {};
  const canon = canonicalSlug(slug);
  const sectionId = sectionIdFor(canon);

  if (opts.history === "push") writeRoute(canon, "push");
  else if (opts.history === "replace") writeRoute(canon, "replace");

  document.title = titleFor(canon);
  setActiveSection(sectionId);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = location.origin + routePath(canon);
  const og = document.querySelector('meta[property="og:url"]');
  if (og) og.setAttribute("content", location.origin + routePath(canon));

  window.__suppressRouteSpy = true;
  scrollToSection(sectionId, Boolean(opts.immediate));
  clearTimeout(window.__routeSpyTimer);
  if (!opts.immediate) {
    window.__routeSpyTimer = setTimeout(() => {
      window.__suppressRouteSpy = false;
    }, 1500);
  }

  return canon;
}

function closeMobileNav() {
  document.querySelector("header nav .wrapper")?.classList.remove("nav-open");
}

function initRoutes() {
  if (window.__routesReady) return;
  window.__routesReady = true;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-route]");
    if (!link) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target && link.target !== "_self") return;
    event.preventDefault();
    closeMobileNav();
    applyRoute(link.getAttribute("data-route") || "", { history: "push" });
  });

  window.addEventListener("popstate", () => {
    applyRoute(readSlug(), { history: "none" });
  });

  const initial = canonicalSlug(readSlug());
  applyRoute(initial, { history: "replace", immediate: true });
  requestAnimationFrame(() => scrollToSection(sectionIdFor(initial), true));

  let userMoved = false;
  const markMoved = () => {
    userMoved = true;
  };
  window.addEventListener("wheel", markMoved, { passive: true, once: true });
  window.addEventListener("touchstart", markMoved, { passive: true, once: true });
  window.addEventListener("keydown", (event) => {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].indexOf(event.key) !== -1) {
      markMoved();
    }
  });
  window.addEventListener("load", () => {
    if (!userMoved) scrollToSection(sectionIdFor(canonicalSlug(readSlug())), true);
    window.__suppressRouteSpy = false;
    startRouteSpy();
  });

  if (document.readyState === "complete") startRouteSpy();
}

function startRouteSpy() {
  if (window.__routeSpyReady) return;
  window.__routeSpyReady = true;

  const watched = [{ slug: "", id: "home" }].concat(
    Object.keys(PAGE_ROUTES).map((slug) => ({ slug: slug, id: PAGE_ROUTES[slug].id }))
  );

  const sections = watched
    .map((entry) => ({ slug: entry.slug, el: document.getElementById(entry.id) }))
    .filter((entry) => entry.el);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (window.__suppressRouteSpy) return;
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (!visible.length) return;
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const match = sections.find((section) => section.el === visible[0].target);
      if (!match) return;
      const slug = canonicalSlug(match.slug);
      setActiveSection(sectionIdFor(slug));
      if (location.pathname !== routePath(slug)) {
        writeRoute(slug, "replace");
        document.title = titleFor(slug);
      }
    },
    { threshold: [0.15, 0.35, 0.6], rootMargin: "-12% 0px -45% 0px" }
  );

  sections.forEach((section) => observer.observe(section.el));
}

function initNavbar() {
  const openBtn = document.querySelector("#open-nav-menu");
  const closeBtn = document.querySelector("#close-nav-menu");
  const wrapper = document.querySelector("header nav .wrapper");

  openBtn?.addEventListener("click", () => wrapper.classList.add("nav-open"));
  closeBtn?.addEventListener("click", () => wrapper.classList.remove("nav-open"));
}

function initStickyNav() {
  const navbar = document.getElementById("navigation");
  const heroSection = document.getElementById("home");
  if (!navbar || !heroSection) return;

  const triggerOffset = 80;

  function checkScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - triggerOffset;

    if (scrollTop > heroBottom) navbar.classList.add("is-fixed");
    else navbar.classList.remove("is-fixed");
  }

  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();
}

function initAccordion() {
  const allDetails = document.querySelectorAll("details");

  allDetails.forEach((detail) => {
    detail.addEventListener("click", () => {
      allDetails.forEach((d) => {
        if (d !== detail) d.removeAttribute("open");
      });
    });
  });
}

initRoutes();
