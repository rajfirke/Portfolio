function initNavbar() {
  const openBtn = document.querySelector("#open-nav-menu");
  const closeBtn = document.querySelector("#close-nav-menu");
  const wrapper = document.querySelector("header nav .wrapper");
  const homeLink = document.querySelector("#nav-home-link");

  openBtn?.addEventListener("click", () => wrapper.classList.add("nav-open"));
  closeBtn?.addEventListener("click", () => wrapper.classList.remove("nav-open"));

  homeLink?.addEventListener("click", (e) => {
    e.preventDefault();
    wrapper.classList.remove("nav-open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initStickyNav() {
  const navbar = document.getElementById("navigation");
  const heroSection = document.getElementById("home");
  if (!navbar || !heroSection) return;

  const triggerOffset = 80;

  function checkScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - triggerOffset;

    if (scrollTop > heroBottom) {
      navbar.classList.add("is-fixed");
    } else {
      navbar.classList.remove("is-fixed");
    }
  }

  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();

  // Active section highlighting
  const links = document.querySelectorAll(".navigation_link");
  const sections = [];

  links.forEach((li) => {
    const a = li.querySelector("a");
    if (!a) return;
    const id = a.getAttribute("href")?.replace("#", "");
    const sec = id ? document.getElementById(id) : null;
    if (sec) sections.push({ li, sec });
  });

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const match = sections.find((s) => s.sec === entry.target);
        if (!match) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("navigation_selected"));
          match.li.classList.add("navigation_selected");
        }
      });
    },
    { threshold: 0, rootMargin: "-15% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s.sec));
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
