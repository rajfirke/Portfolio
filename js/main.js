document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initStickyNav();
  initAccordion();
  initProjects();
  initScrollReveal();
  initCardGlow();
  initStatCounter();
  initScrollProgress();
  initCardTilt();
});

function initScrollReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const viewportH = window.innerHeight;

  const revealMap = [
    { sel: ".about-label",                    cls: "reveal" },
    { sel: ".about-grid",                     cls: "reveal" },
    { sel: ".about-stats .stat-card",         cls: "reveal", stagger: 0.08 },
    { sel: ".exp-label",                      cls: "reveal" },
    { sel: ".experience-item",                cls: "reveal", stagger: 0.07 },
    { sel: ".skills-label",                   cls: "reveal" },
    { sel: ".marquee-wrap",                   cls: "reveal-scale" },
    { sel: ".bento-card",                     cls: "reveal", stagger: 0.06 },
    { sel: ".projects-label",                 cls: "reveal" },
    { sel: ".project-featured",               cls: "reveal-scale" },
    { sel: ".project-card",                   cls: "reveal", stagger: 0.06 },
    { sel: ".research-label",                 cls: "reveal" },
    { sel: ".research-col",                   cls: "reveal-left", stagger: 0.12 },
    { sel: ".os-label",                       cls: "reveal" },
    { sel: ".os-card",                        cls: "reveal", stagger: 0.1 },
    { sel: ".edu-label",                      cls: "reveal" },
    { sel: ".edu-cards-row",                  cls: "reveal-scale" },
    { sel: ".edu-rail",                       cls: "reveal" },
    { sel: ".faqs-section .custom-header",    cls: "reveal" },
    { sel: ".faqs-section details",           cls: "reveal", stagger: 0.05 },
    { sel: ".footer-grid",                    cls: "reveal" },
  ];

  const allElements = [];

  revealMap.forEach(({ sel, cls, stagger }) => {
    const els = document.querySelectorAll(sel);
    let groupIdx = 0;

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();

      if (rect.top < viewportH * 0.88) return;

      el.classList.add(cls);

      if (stagger && groupIdx > 0) {
        el.style.transitionDelay = (groupIdx * stagger) + "s";
      }
      groupIdx++;

      allElements.push(el);
    });
  });

  if (!allElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
  );

  allElements.forEach((el) => observer.observe(el));
}

function initCardGlow() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cards = document.querySelectorAll(
    ".stat-card, .project-card, .os-card, .experience-item"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--glow-x", (e.clientX - rect.left) + "px");
      card.style.setProperty("--glow-y", (e.clientY - rect.top) + "px");
    });
  });
}

function initStatCounter() {
  const statNums = document.querySelectorAll(".stat-number");
  if (!statNums.length) return;

  const animated = new Set();

  function animateNumber(el) {
    if (animated.has(el)) return;
    animated.add(el);

    const raw = el.textContent.trim();
    const suffix = raw.replace(/[\d.]/g, "");
    const target = parseFloat(raw);

    if (isNaN(target)) return;

    const duration = 1400;
    const start = performance.now();
    const isInt = Number.isInteger(target);

    el.textContent = "0" + suffix;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      el.textContent = (isInt ? Math.round(current) : current.toFixed(1)) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) animateNumber(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach((el) => observer.observe(el));
}

function initCardTilt() {
  if (window.matchMedia("(hover: none)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cards = document.querySelectorAll(".project-featured, .bento-card");

  cards.forEach((card) => {
    card.style.transformStyle = "preserve-3d";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * 7;
      const tiltY = (x - 0.5) * 7;
      card.style.transform =
        `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.prepend(bar);

  function update() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight <= 0) return;
    bar.style.width = ((scrollTop / scrollHeight) * 100).toFixed(2) + "%";
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}
