// Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("animate");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document
  .querySelectorAll(".about-card, .hex-service, .team-member, .blog-post")
  .forEach((el) => observer.observe(el));
