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
    ".about-card, .hex-service, .team-member, .blog-post"
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
  ".about-card, .hex-service, .team-member, .testimonial-card, .blog-post, .contact-item"
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
    .team-member,
    .blog-post,
    .contact-item {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .about-card.scrolled,
    .hex-service.scrolled,
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

// Chat Widget Toggle
const chatToggle = document.querySelector(".chat-toggle");
const chatWidget = document.querySelector(".chat-widget");
const chatClose = document.querySelector(".chat-close");

if (chatToggle && chatWidget) {
  chatToggle.addEventListener("click", () => {
    chatWidget.classList.add("active");
    chatToggle.style.display = "none";
  });
}

if (chatClose && chatWidget) {
  chatClose.addEventListener("click", () => {
    chatWidget.classList.remove("active");
    if (chatToggle) {
      chatToggle.style.display = "block";
    }
  });
}

// Chat Functionality
const chatInput = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".send-btn");
const chatBody = document.querySelector(".chat-body");

function addMessage(message, isUser = false) {
  if (!chatBody) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${
    isUser ? "user-message" : "bot-message"
  }`;
  messageDiv.innerHTML = `<p>${message}</p>`;
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
  if (!chatInput) return;

  const message = chatInput.value.trim();
  if (message) {
    addMessage(message, true);
    chatInput.value = "";

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "شكراً لتواصلك معنا! سيقوم أحد ممثلينا بالرد عليك قريباً.",
        "نحن سعداء لخدمتك. كيف يمكننا مساعدتك اليوم؟",
        "تم استلام رسالتك بنجاح. سنتواصل معك في أقرب وقت ممكن.",
        "مرحباً بك في رايتو تك! نحن هنا لمساعدتك.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse);
    }, 1000);
  }
}

if (sendBtn) {
  sendBtn.addEventListener("click", sendMessage);
}

if (chatInput) {
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

// Button hover effects
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.05)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

      // Enhanced Button Ripple Effect
      document
        .querySelectorAll(
          ".btn-primary, .btn-secondary, .service-card, .feature-card"
        )
        .forEach((btn) => {
          btn.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

            this.style.position = "relative";
            this.style.overflow = "hidden";
            this.appendChild(ripple);

            setTimeout(() => {
              ripple.remove();
            }, 600);
          });
        });

      // Add ripple animation
      const rippleStyle = document.createElement("style");
      rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
      document.head.appendChild(rippleStyle);

          // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
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

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe sections for fade-in animation
      document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
      });

      // Observe cards for staggered animation
      document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      });
    }

    // Utility functions
    function createRippleEffect(event, element) {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        margin-left: -5px;
        margin-top: -5px;
        pointer-events: none;
    `;

      element.style.position = 'relative';
      element.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
            const sections = document.querySelectorAll("section");
      // Service Cards Click Effect
      document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("click", () => {
          const service = card.getAttribute("data-service");
          if (service) {
            const targetSection = document.getElementById(service);
            if (targetSection) {
              const offsetTop = targetSection.offsetTop - 80;
              window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
              });
            }
          }
        });
      });

      // Printing Types Toggle
      document.querySelectorAll(".print-type").forEach((type) => {
        type.addEventListener("click", () => {
          // Remove active class from all types
          document
            .querySelectorAll(".print-type")
            .forEach((t) => t.classList.remove("active"));
          document
            .querySelectorAll(".print-sample")
            .forEach((s) => s.classList.remove("active"));

          // Add active class to clicked type
          type.classList.add("active");

          // Show corresponding sample
          const typeData = type.getAttribute("data-type");
          const sample = document.getElementById(`${typeData}-sample`);
          if (sample) {
            sample.classList.add("active");
          }
        });
      });


      // Dashboard Controls
      document.querySelectorAll(".control-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll(".control-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          // Animate stats
          animateStats();
        });
      });

      // Animate Statistics
      function animateStats() {
        const statNumbers = document.querySelectorAll(".stat-number");

        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
          }, 16);
        });
      }

      // Intersection Observer for Animations
      const observerOptions2 = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Animate stats when reports section is visible
            if (entry.target.id === "reports") {
              setTimeout(animateStats, 500);
            }
          }
        });
      }, observerOptions2);

      // Initialize animations on DOM load
      document.addEventListener("DOMContentLoaded", () => {
        // Observe all sections
        sections.forEach((section) => {
          mainObserver.observe(section);
        });

        // Observe animated elements
        const animatedElements = document.querySelectorAll(
          ".service-card, .custom-card, .feature-card, .stat-card"
        );
        animatedElements.forEach((el) => {
          mainObserver.observe(el);
        });
      });

      // Parallax Effect
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll(
          ".hero-particles, .video-bg-effects, .customization-shapes"
        );

        parallaxElements.forEach((element, index) => {
          const speed = 0.5 + index * 0.1;
          if (element) {
            element.style.transform = `translateY(${scrolled * speed}px)`;
          }
        });
      });

      // Performance optimization
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      if (reduceMotion.matches) {
        document.documentElement.style.setProperty(
          "--animation-duration",
          "0.01s"
        );
      }

      // Initialize all animations with stagger effect
      setTimeout(() => {
        const allCards = document.querySelectorAll(
          ".service-card, .custom-card, .feature-card, .stat-card"
        );
        allCards.forEach((card, index) => {
          card.style.animationDelay = `${index * 0.1}s`;
        });
      }, 100);

      // Service card interactions
      document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          card.style.background = "rgba(23, 170, 189, 0.05)";
        });

        card.addEventListener("mouseleave", () => {
          card.style.background = "white";
        });
      });

      // Feature card interactions
      document
        .querySelectorAll(".feature-card:not(.highlight)")
        .forEach((card) => {
          card.addEventListener("mouseenter", () => {
            card.style.background = "rgba(23, 170, 189, 0.02)";
          });

          card.addEventListener("mouseleave", () => {
            card.style.background = "white";
          });
        });

      // Integration diagram interactions
      document.querySelectorAll(".system-node").forEach((node) => {
        node.addEventListener("click", () => {
          const nodeName = node.querySelector("span").textContent;
          showNotification(`تم النقر على: ${nodeName}`, "info");
        });
      });

      // Control buttons functionality
      document.querySelectorAll(".control-item").forEach((control) => {
        control.addEventListener("click", () => {
          const icon = control.querySelector("i");
          if (icon.classList.contains("fa-volume-up")) {
            showNotification("تم كتم الصوت", "info");
            icon.classList.replace("fa-volume-up", "fa-volume-mute");
          } else if (icon.classList.contains("fa-volume-mute")) {
            showNotification("تم تشغيل الصوت", "info");
            icon.classList.replace("fa-volume-mute", "fa-volume-up");
          } else if (icon.classList.contains("fa-expand")) {
            showNotification("تم التبديل إلى وضع ملء الشاشة", "info");
          } else if (icon.classList.contains("fa-cog")) {
            showNotification("تم فتح الإعدادات", "info");
          }
        });
      });