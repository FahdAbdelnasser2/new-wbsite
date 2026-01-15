
      // ============================================
      // Contact Form Handler
      // ============================================
      document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
          const successModal = new bootstrap.Modal(document.getElementById('successModal'));
          const sectorSelect = document.getElementById('sector');
          const phoneInput = document.getElementById('phone');

          // Smart Dropdown Handler
          sectorSelect.addEventListener('change', function() {
            const selectedSector = this.value;
            const fuelQuestion = document.getElementById('fuelQuestion');
            const factoryQuestion = document.getElementById('factoryQuestion');

            // Hide all smart questions first
            document.querySelectorAll('.smart-question').forEach(q => q.style.display = 'none');

            // Show relevant question based on selected sector
            if (selectedSector === 'fuel' && fuelQuestion) {
              fuelQuestion.style.display = 'block';
            } else if (selectedSector === 'factory' && factoryQuestion) {
              factoryQuestion.style.display = 'block';
            }
          });

          // Phone input formatting
          phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0 && !value.startsWith('966')) {
              if (value.startsWith('5')) {
                value = '966' + value;
              } else if (value.startsWith('0')) {
                value = '966' + value.substring(1);
              }
            }

            if (value.startsWith('966')) {
              e.target.value = '+' + value.substring(0, 3) + ' ' + value.substring(3, 12);
            } else {
              e.target.value = value;
            }
          });

          // Form submission handler
          contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
              fullName: document.getElementById('fullName').value,
              companyName: document.getElementById('companyName').value,
              phone: document.getElementById('phone').value,
              email: document.getElementById('email').value,
              sector: document.getElementById('sector').value,
              stationCount: document.getElementById('stationCount') ? document.getElementById('stationCount').value : null,
              factoryType: document.getElementById('factoryType') ? document.getElementById('factoryType').value : null,
              message: document.getElementById('message').value,
              timestamp: new Date().toISOString()
            };

            console.log('Form submitted:', formData);

            // Send data to WhatsApp as backup
            const whatsappMessage = `
مرحباً، لدي طلب استشارة جديد:
الاسم: ${formData.fullName}
الشركة: ${formData.companyName}
الجوال: ${formData.phone}
البريد: ${formData.email}
القطاع: ${formData.sector}
${formData.stationCount ? `عدد المحطات: ${formData.stationCount}` : ''}
${formData.factoryType ? `نوع الإنتاج: ${formData.factoryType}` : ''}
${formData.message ? `ملاحظات: ${formData.message}` : ''}
            `;

            const submitButton = contactForm.querySelector('.contact-btn-submit');
            const originalContent = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm ms-2"></span> جاري الإرسال...';

            // Simulate submission delay
            setTimeout(() => {
              contactForm.reset();
              submitButton.disabled = false;
              submitButton.innerHTML = originalContent;

              // Hide all smart questions
              document.querySelectorAll('.smart-question').forEach(q => q.style.display = 'none');

              // Show success modal
              successModal.show();

              // Optional: Send to WhatsApp
              // const whatsappUrl = `https://wa.me/966501234567?text=${encodeURIComponent(whatsappMessage)}`;
              // window.open(whatsappUrl, '_blank');
            }, 1500);
          });

          // Input focus animation
          const formInputs = document.querySelectorAll('.form-control');
          formInputs.forEach(input => {
            input.addEventListener('focus', function() {
              this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
              if (this.value === '') {
                this.parentElement.classList.remove('focused');
              }
            });
          });

          // Intersection observer for step cards animation
          const stepCards = document.querySelectorAll('.expectation-card');
          const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
          };

          const observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
                }, index * 200);
              }
            });
          }, observerOptions);

          stepCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
          });

          // Testimonials hover effect
          const testimonialCards = document.querySelectorAll('.testimonial-card');
          testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
              this.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', function() {
              this.style.transform = 'translateY(0)';
            });
          });
        }
      });