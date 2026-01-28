      // ============================================
      // Testimonials Tab Switcher + Video Handler
      // ============================================
      document.addEventListener("DOMContentLoaded", function () {
        const tabs = document.querySelectorAll(".testimonial-tab");
        const contents = document.querySelectorAll(".testimonial-tab-content");
        let currentTab = 1;
        let currentVideoUrl = "https://www.youtube.com/embed/1Q8fG0TtVAY";

        tabs.forEach((tab) => {
          tab.addEventListener("click", function () {
            const tabNumber = this.getAttribute("data-tab");
            currentTab = tabNumber;

            tabs.forEach((t) => t.classList.remove("active"));
            this.classList.add("active");

            // Hide all content
            contents.forEach((content) => {
              content.classList.remove("active");
            });

            // Show selected content
            const activeContent = document.querySelector(
              `.testimonial-tab-content[data-tab="${tabNumber}"]`
            );
            if (activeContent) {
              activeContent.classList.add("active");
              // Get video url from data attribute
              const videoUrl = activeContent
                .querySelector(".testimonial-title")
                .getAttribute("data-video");
              currentVideoUrl = videoUrl;
            }
          });
        });

        // Video modal logic
        const testimonialVideoModal =
          document.getElementById("testimonialVideo");
        const videoFrame = document.getElementById("testimonialVideoFrame");
        const videoTrigger = document.getElementById("testimonialVideoTrigger");
        if (testimonialVideoModal && videoFrame && videoTrigger) {
          videoTrigger.addEventListener("click", function () {
            // Set video src for the current tab
            const activeContent = document.querySelector(
              `.testimonial-tab-content[data-tab="${currentTab}"]`
            );
            let videoUrl = currentVideoUrl;
            if (activeContent) {
              const title = activeContent.querySelector(".testimonial-title");
              if (title && title.getAttribute("data-video")) {
                videoUrl = title.getAttribute("data-video");
              }
            }
            videoFrame.src = videoUrl + "?autoplay=1";
          });
          testimonialVideoModal.addEventListener("hide.bs.modal", function () {
            videoFrame.src = "";
          });
        }
      });

      // ============================================
      // Video Modal Handler
      // ============================================
      const testimonialVideoModal = document.getElementById("testimonialVideo");
      if (testimonialVideoModal) {
        testimonialVideoModal.addEventListener("show.bs.modal", function () {
          // ضع رابط الفيديو هنا
          const videoFrame = document.getElementById("testimonialVideoFrame");
          videoFrame.src =
            "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1";
        });

        testimonialVideoModal.addEventListener("hide.bs.modal", function () {
          const videoFrame = document.getElementById("testimonialVideoFrame");
          videoFrame.src = "";
        });
      }
// Video Popup: Watch System Button
document.addEventListener("DOMContentLoaded", function () {
    var watchBtn = document.getElementById("watchSystemBtn");
    var videoModal = document.getElementById("videoModal");
    var videoIframe = document.getElementById("systemDemoVideo");
    var videoSrc = videoIframe ? videoIframe.src : null;
    if (watchBtn && videoModal && videoIframe) {
        watchBtn.addEventListener("click", function (e) {
            e.preventDefault();
            var modal = new bootstrap.Modal(videoModal);
            modal.show();
        });
        videoModal.addEventListener("hidden.bs.modal", function () {
            // Stop video playback by resetting src
            videoIframe.src = "";
            setTimeout(function () { videoIframe.src = videoSrc; }, 200);
        });
    }
});
      function handleFaqSubmit(event) {
        event.preventDefault();
        const question = document.getElementById('faqQuestion').value;
        if (!question.trim()) {
          alert('يرجى كتابة السؤال');
          return;
        }
        const phoneNumber = '966538499438';
        const message = question;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        document.getElementById('faqQuestionForm').reset();
      }
const backToTop=document.getElementById("backToTop");window.addEventListener("scroll",()=>{backToTop.classList.toggle("visible",500<window.scrollY)}),backToTop?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));const hamburger=document.querySelector(".hamburger"),navMenu=document.querySelector(".nav-menu");hamburger?.addEventListener("click",()=>{hamburger.classList.toggle("active"),navMenu.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>{hamburger.classList.remove("active"),navMenu.classList.remove("active")})),window.addEventListener("scroll",()=>{const a=document.querySelector(".navbar");a&&a.classList.toggle("scrolled",100<window.scrollY)});const heroTitle=document.querySelector(".hero-title2");if(heroTitle){const a=heroTitle.textContent;setTimeout(()=>{typeWriter(heroTitle,a,150)},1e3)}document.addEventListener("DOMContentLoaded",function(){const a=document.querySelectorAll(".mega-parent > a"),b=document.querySelector(".overlay"),c=document.querySelector(".nav-menu");a.forEach(a=>{const d=a.nextElementSibling;a.addEventListener("click",function(a){991>=window.innerWidth&&c.classList.add("active"),a.preventDefault(),a.stopPropagation();const e=d.classList.contains("open");document.querySelectorAll(".mega-menu.open").forEach(a=>a.classList.remove("open")),b.classList.remove("show"),e||(d.classList.add("open"),b.classList.add("show"))})}),b.addEventListener("click",function(){document.querySelectorAll(".mega-menu.open").forEach(a=>a.classList.remove("open")),b.classList.remove("show")}),document.addEventListener("click",function(a){a.target.closest(".mega-parent")||(document.querySelectorAll(".mega-menu.open").forEach(a=>a.classList.remove("open")),b.classList.remove("show"))}),addScrollIndicator()});function addScrollIndicator(){const a=document.createElement("div");a.style.cssText=`
        position: fixed;
        top: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 1000;
        transition: width 0.3s ease;
        width: 0%;
    `,document.body.appendChild(a),window.addEventListener("scroll",()=>{const b=100*(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight));a.style.width=Math.min(b,100)+"%"})}function initScrollAnimations(){}

/* New Modern Testimonial Script */
document.addEventListener("DOMContentLoaded", function () {
    const modernDots = document.querySelectorAll(".testi-dot");
    const modernContents = document.querySelectorAll(".modern-testi-item");

    if (modernDots.length > 0) {
        modernDots.forEach((dot) => {
            dot.addEventListener("click", function() {
                const tabNumber = this.getAttribute("data-tab");
                
                // Update Dots
                modernDots.forEach((d) => d.classList.remove("active"));
                this.classList.add("active");

                // Update Content
                modernContents.forEach((c) => c.classList.remove("active"));
                // Target specific active item
                const activeItem = document.querySelector(`.modern-testi-item[data-tab="${tabNumber}"]`);
                if(activeItem) {
                    activeItem.classList.add("active");
                }
            });
        });
    }
});