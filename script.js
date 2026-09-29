const navigationSections = document.querySelectorAll("[data-nav-section]");
const projectLinks = document.querySelectorAll('.project-nav a[href^="#"]');
const revealElements = document.querySelectorAll(
  ".introduction, .project__header, .project__image, .project__details section, .areas",
);

if ("IntersectionObserver" in window) {
  revealElements.forEach((element) => element.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

if ("IntersectionObserver" in window && navigationSections.length > 1) {
  const visibleSections = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target);
        } else {
          visibleSections.delete(entry.target);
        }
      });

      const visibleSection = [...visibleSections].sort(
        (first, second) =>
          Math.abs(first.getBoundingClientRect().top - window.innerHeight * 0.3) -
          Math.abs(second.getBoundingClientRect().top - window.innerHeight * 0.3),
      )[0];

      if (!visibleSection) return;

      projectLinks.forEach((link) => {
        const isActive = link.hash === `#${visibleSection.id}`;
        link.classList.toggle("is-active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    { rootMargin: "-15% 0px -15%", threshold: 0 },
  );

  navigationSections.forEach((section) => observer.observe(section));
}
