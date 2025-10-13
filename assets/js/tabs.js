      document.addEventListener("DOMContentLoaded", function () {
        const printTypes = document.querySelectorAll(".print-type");
        const printSamples = document.querySelectorAll(".print-sample");
        printTypes.forEach((type) => {
          type.addEventListener("click", function () {
            // Remove active class from all types and samples
            printTypes.forEach((t) => t.classList.remove("active"));
            printSamples.forEach((s) => {
              s.classList.remove("active");
              s.style.opacity = "0";
              s.style.transform = "translateY(20px)";
            });

            // Add active to clicked type
            this.classList.add("active");

            // Get the target sample
            const targetType = this.getAttribute("data-type");
            const targetSample = document.getElementById(
              targetType + "-sample"
            );

            if (targetSample) {
              // Add active class
              targetSample.classList.add("active");

              // Reset animation
              targetSample.style.transition = "none";
              targetSample.style.opacity = "0";
              targetSample.style.transform = "translateY(20px)";

              // Trigger reflow
              targetSample.offsetHeight;

              // Apply animation
              targetSample.style.transition =
                "opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
              targetSample.style.opacity = "1";
              targetSample.style.transform = "translateY(0)";
            }
          });
        });
      });