// Portfolio Interactivity: splash screen, navbar toggle, and modal previews

(() => {
    const splash = document.getElementById("splash");
    const main = document.getElementById("main-content");
    const navToggle = document.getElementById("nav-toggle");
    const primaryMenu = document.getElementById("primary-menu");
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalCode = document.getElementById("modal-code");
    const modalLive = document.getElementById("modal-live");
    const modalClose = document.querySelector(".modal-close");
  
    // Hide splash screen and show main
    window.addEventListener("load", () => {
      setTimeout(() => {
        splash.style.opacity = "0";
        setTimeout(() => splash.remove(), 400);
        main.classList.remove("hidden");
      }, 700);
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
    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  
    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  })();
  