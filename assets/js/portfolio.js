// Portfolio filter
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) =>
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");
    portfolioItems.forEach((item) => {
      item.style.display =
        filterValue === "all" || item.classList.contains(filterValue)
          ? "block"
          : "none";
    });
  })
);
