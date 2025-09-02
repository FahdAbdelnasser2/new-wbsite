// let year = document.querySelector(".text-year");
// let date = new Date();
// year.textContent = date.getFullYear();
const backToTop = document.getElementById("backToTop");
// Header Scroll Effect
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  lastScrollY = currentScrollY;
  // Back to top button
  if (currentScrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});
// Back to Top Button
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1500);
});

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();
//     const target = document.querySelector(this.getAttribute("href"));
//     if (target) {
//       target.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   });
// });

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      entry.target.classList.add("animate");

      // Counter animation for stats
      if (entry.target.classList.contains("stat-number")) {
        animateCounter(entry.target);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".about-card, .hex-service, .portfolio-item, .team-member, .blog-post"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Counter animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Portfolio filter
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (filterValue === "all" || item.classList.contains(filterValue)) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 100);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// Testimonials slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");

function showTestimonial(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.remove("active");
    if (i === index) {
      card.classList.add("active");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.remove("active");
    if (i === index) {
      dot.classList.add("active");
    }
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial =
    (currentTestimonial - 1 + testimonialCards.length) %
    testimonialCards.length;
  showTestimonial(currentTestimonial);
}

// nextBtn.addEventListener("click", nextTestimonial);
// prevBtn.addEventListener("click", prevTestimonial);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Auto-play testimonials
setInterval(nextTestimonial, 5000);

// Contact form animation
const formInputs = document.querySelectorAll(".form-input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (input.value === "") {
      input.parentElement.classList.remove("focused");
    }
  });
});

// // Form submission
// const contactForm = document.querySelector(".contact-form");
// contactForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const submitBtn = document.querySelector(".submit-btn");
//   const originalText = submitBtn.innerHTML;

//   submitBtn.innerHTML = "<span>جاري الإرسال...</span>";
//   submitBtn.disabled = true;

//   // Simulate form submission
//   setTimeout(() => {
//     submitBtn.innerHTML = "<span>تم الإرسال بنجاح!</span>";
//     setTimeout(() => {
//       submitBtn.innerHTML = originalText;
//       submitBtn.disabled = false;
//       contactForm.reset();
//     }, 2000);
//   }, 2000);
// });

// Parallax effect for floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  // Hero section parallax
  const heroParticles = document.querySelector(".floating-particles");
  if (heroParticles) {
    heroParticles.style.transform = `translateY(${rate * 0.2}px)`;
  }

  // Contact section parallax
  const contactParticles = document.querySelector(".contact-particles");
  if (contactParticles) {
    contactParticles.style.transform = `translateY(${rate * 0.1}px)`;
  }
});

// Hover effects for service hexagons
const hexServices = document.querySelectorAll(".hex-service");
hexServices.forEach((hex) => {
  hex.addEventListener("mouseenter", () => {
    hex.style.transform = "translateY(-10px) scale(1.05) rotateY(10deg)";
  });

  hex.addEventListener("mouseleave", () => {
    hex.style.transform = "translateY(0) scale(1) rotateY(0deg)";
  });
});

// Team member interactions
const teamMembers = document.querySelectorAll(".team-member");
teamMembers.forEach((member) => {
  member.addEventListener("mouseenter", () => {
    member.style.transform = member.style.transform.replace(
      "translateY(-50%)",
      "translateY(-60%)"
    );
    member.style.zIndex = "10";
  });

  member.addEventListener("mouseleave", () => {
    member.style.transform = member.style.transform.replace(
      "translateY(-60%)",
      "translateY(-50%)"
    );
    member.style.zIndex = "1";
  });
});

// Blog post hover effects
const blogPosts = document.querySelectorAll(".blog-post");
blogPosts.forEach((post) => {
  post.addEventListener("mouseenter", () => {
    post.style.transform = "translateY(-5px) scale(1.02)";
  });

  post.addEventListener("mouseleave", () => {
    post.style.transform = "translateY(0) scale(1)";
  });
});

// Add dynamic background color change
let colorIndex = 0;
const colors = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
];

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect
window.addEventListener("load", () => {
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
      const words = heroTitle.querySelectorAll(".title-word");
      words.forEach((word, index) => {
        setTimeout(() => {
          word.style.opacity = "1";
          word.style.transform = "translateY(0)";
        }, index * 200);
      });
    }
  }, 2000);
});

// Add scroll-triggered animations
const scrollElements = document.querySelectorAll(
  ".about-card, .hex-service, .portfolio-item, .team-member, .testimonial-card, .blog-post, .contact-item"
);

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener("scroll", handleScrollAnimation);

// Add CSS for scroll animations
const style = document.createElement("style");
style.textContent = `
    .about-card,
    .hex-service,
    .portfolio-item,
    .team-member,
    .blog-post,
    .contact-item {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .about-card.scrolled,
    .hex-service.scrolled,
    .portfolio-item.scrolled,
    .team-member.scrolled,
    .blog-post.scrolled,
    .contact-item.scrolled {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize scroll animation on load
window.addEventListener("load", handleScrollAnimation);

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
});
