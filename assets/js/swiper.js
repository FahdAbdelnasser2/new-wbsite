      const swiper = new Swiper(".digi-logo-slider", {
        loop: true, // يكرر العرض
        slidesPerView: 4, // عدد اللوجوهات في الشاشة
        spaceBetween: 30, // مسافة بين العناصر
        autoplay: {
          delay: 2000, // يقلب كل ثانيتين
          disableOnInteraction: false, // يفضل شغال حتى لو المستخدم قلب يدوي
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
        },
      });