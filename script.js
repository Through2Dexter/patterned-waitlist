// Enhanced form submission with better UX
document
  .getElementById("waitlistForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit-btn");
    const originalText =
      submitBtn.querySelector(".submit-btn-text").textContent;

    // Show loading state
    submitBtn.querySelector(".submit-btn-text").textContent = "Joining...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    // Get form data
    const formData = {
      email: document.getElementById("email").value,
      userType: document.getElementById("userType").value,
      location: document.getElementById("location").value,
      timestamp: new Date().toISOString(),
    };

    // Send data to Google Apps Script
    fetch(
      "https://script.google.com/macros/s/AKfycbzLL-DiO-sO_RCb1b6k3pYtQUPpA5wZYoZylYbTrmsMfDjqDb1Oa6PIP6fP8-99AYtwlw/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email: formData.email,
          location: formData.location,
          userType: formData.userType,
          timestamp: formData.timestamp,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Show success state
          const form = document.getElementById("waitlistForm");
          const successMessage = document.getElementById("successMessage");

          form.style.transform = "scale(0.95)";
          form.style.opacity = "0.3";

          setTimeout(() => {
            form.style.display = "none";
            successMessage.style.display = "block";
            successMessage.style.animation = "slideInUp 0.5s ease-out";
          }, 300);

          // Reset after delay
          setTimeout(() => {
            form.style.display = "block";
            form.style.transform = "scale(1)";
            form.style.opacity = "1";
            successMessage.style.display = "none";
            this.reset();

            // Reset button state
            submitBtn.querySelector(".submit-btn-text").textContent =
              originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
          }, 4000);
        } else {
          console.error(data.message);
          submitBtn.querySelector(".submit-btn-text").textContent =
            originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        submitBtn.querySelector(".submit-btn-text").textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      });
  });

// Enhanced feature card interactions
document.querySelectorAll(".feature-card").forEach((card, index) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = `translateY(-12px) scale(1.03) rotate(${
      Math.random() * 2 - 1
    }deg)`;

    // Animate icon
    const icon = this.querySelector(".feature-icon");
    icon.style.transform = "scale(1.1) rotate(5deg)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1) rotate(0deg)";

    const icon = this.querySelector(".feature-icon");
    icon.style.transform = "scale(1) rotate(0deg)";
  });

  // Stagger animation on load
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";

  setTimeout(() => {
    card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, 200 + index * 150);
});

// Form input enhancements
document.querySelectorAll(".form-input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-2px)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});

// Parallax effect for floating elements
window.addEventListener("mousemove", (e) => {
  const elements = document.querySelectorAll(".floating-element");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  elements.forEach((element, index) => {
    const speed = (index + 1) * 0.5;
    const xMove = (x - 0.5) * speed * 20;
    const yMove = (y - 0.5) * speed * 20;

    element.style.transform += ` translate(${xMove}px, ${yMove}px)`;
  });
});

// Smooth scroll and intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Performance optimization
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  document.querySelectorAll("*").forEach((el) => {
    el.style.animationDuration = "0.01ms";
    el.style.transitionDuration = "0.01ms";
  });
}
