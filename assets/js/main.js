// Back to Top Button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

backToTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Navbar scroll effect (✨ CSS بداله أفضل، لكن أبقيته هنا)
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 100);
});

    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero-title2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
    document.addEventListener("DOMContentLoaded", function () {
  const parentLinks = document.querySelectorAll(".mega-parent > a");
  const overlay = document.querySelector(".overlay");
  const navMenu = document.querySelector(".nav-menu");

  parentLinks.forEach((parentLink) => {
    const megaMenu = parentLink.nextElementSibling; // الميجا منيو الخاصة بيه

    parentLink.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        navMenu.classList.add("active");
      }
      e.preventDefault();
      e.stopPropagation();

      const isOpen = megaMenu.classList.contains("open");

      // قفل كل القوايم المفتوحة
      document
        .querySelectorAll(".mega-menu.open")
        .forEach((menu) => menu.classList.remove("open"));
      overlay.classList.remove("show");

      // افتح لو مش مفتوحة
      if (!isOpen) {
        megaMenu.classList.add("open");
        overlay.classList.add("show");
      }
    });
  });

  // كليك على الـ overlay يقفل الكل
  overlay.addEventListener("click", function () {
    document
      .querySelectorAll(".mega-menu.open")
      .forEach((menu) => menu.classList.remove("open"));
    overlay.classList.remove("show");
  });

  // كليك بره يقفل برضه
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".mega-parent")) {
      document
        .querySelectorAll(".mega-menu.open")
        .forEach((menu) => menu.classList.remove("open"));
      overlay.classList.remove("show");
    }
  });
        addScrollIndicator();

      // Initialize intersection observer for animations
      // initScrollAnimations();

});
      // Add scroll progress indicator
      function addScrollIndicator() {
        const indicator = document.createElement("div");
        indicator.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 1000;
        transition: width 0.3s ease;
        width: 0%;
    `;
        document.body.appendChild(indicator);

        window.addEventListener("scroll", () => {
          const scrolled =
            (window.scrollY /
              (document.documentElement.scrollHeight - window.innerHeight)) *
            100;
          indicator.style.width = Math.min(scrolled, 100) + "%";
        });
      }

    // Scroll animations using Intersection Observer
    function initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
    }