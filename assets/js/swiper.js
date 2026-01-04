const swiper = new Swiper(".digi-logo-slider", {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 30
    },
    1400: {
      slidesPerView: 7,
      spaceBetween: 24
    }
  }
});