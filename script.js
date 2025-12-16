// Portfolio Interactivity
(() => {
  const splash = document.getElementById("splash");
  const main = document.getElementById("main-content");
  const navToggle = document.getElementById("nav-toggle");
  const primaryMenu = document.getElementById("primary-menu");
  const navbar = document.getElementById("navbar");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalCode = document.getElementById("modal-code");
  const modalClose = document.querySelector(".modal-close");
  const scrollProgress = document.getElementById("scroll-progress");
  const contactForm = document.getElementById("contact-form");

  // Hide splash screen
  window.addEventListener("load", () => {
    setTimeout(() => {
      splash.style.opacity = "0";
      setTimeout(() => {
        splash.remove();
        main.classList.remove("hidden");
      }, 500);
    }, 1500);
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update scroll progress bar
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
  });

  // Toggle mobile navigation
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      primaryMenu.style.display = expanded ? "none" : "flex";
    });
  }

  // Close mobile nav when clicking links
  primaryMenu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        primaryMenu.style.display = "none";
        navToggle.setAttribute("aria-expanded", "false");
      }
    })
  );

  // Modal preview handler
  document.querySelectorAll(".preview-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".portfolio-item");
      if (!card) return;
      
      const title = card.dataset.title;
      const desc = card.dataset.desc;
      const img = card.dataset.img || card.querySelector("img").src;
      const code = card.querySelector(".link-code")?.href || "#";

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalImg.src = img;
      modalCode.href = code;
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal
  const closeModal = () => {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Contact form handling
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // In a real application, you would send this data to a server
    alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
    contactForm.reset();
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();