// =========================================================
// Sahil Kumar — Portfolio interactions
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  initTypedRole(prefersReducedMotion);
  initMobileNav();
  initScrollReveal(prefersReducedMotion);
  initActiveNavLink();
  initFooterYear();
  initScrollProgress();
  initCopyEmailButton();
  initAnimatedStats(prefersReducedMotion);
  initHeroNameHover();
  initCertificateModal();
});

/* ---------------------------------------------------------
   1. Typed / rotating role text in the hero terminal prompt
   EDIT: change the strings below to update what rotates.
--------------------------------------------------------- */
function initTypedRole(prefersReducedMotion) {
  const el = document.getElementById("typedRole");
  if (!el) return;

  const roles = [
    "Data Analyst",
    "Data Detective",
    "Problem Solver",
    "Data → Insights",
  ];

  // If the user prefers less motion, just show the first role, static.
  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 30;
  const PAUSE_AFTER_TYPE = 1400;
  const PAUSE_AFTER_DELETE = 300;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

/* ---------------------------------------------------------
   2. Mobile nav toggle
--------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after a link is tapped
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   3. Reveal sections/cards as they scroll into view
--------------------------------------------------------- */
function initScrollReveal(prefersReducedMotion) {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------------------------------------------------------
   4. Highlight the nav link for the section in view
--------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link");
  const navLogo = document.querySelector(".nav__logo");
  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

  const linkFor = (id) =>
    document.querySelector(`.nav__link[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === "top") {
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            navLogo?.classList.add("is-at-top");
          } else {
            navLogo?.classList.remove("is-at-top");
          }
          return;
        }

        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   5. Auto-update the footer year
--------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   6. Hero name hover accent
--------------------------------------------------------- */
function initHeroNameHover() {
  const heroName = document.querySelector(".hero__name");
  if (!heroName) return;

  const defaultColor = getComputedStyle(document.body).getPropertyValue("--text").trim();
  const hoverColor = getComputedStyle(document.body).getPropertyValue("--accent").trim();

  heroName.addEventListener("mouseenter", () => {
    heroName.style.color = hoverColor;
  });

  heroName.addEventListener("mouseleave", () => {
    heroName.style.color = defaultColor;
  });
}

/* ---------------------------------------------------------
   7. Scroll progress bar at the top of the page
--------------------------------------------------------- */
function initScrollProgress() {
  const progress = document.createElement("div");
  Object.assign(progress.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "3px",
    background: "linear-gradient(90deg, #7cc7ff 0%, #6fe6d2 100%)",
    boxShadow: "0 0 18px rgba(124, 199, 255, 0.9)",
    transformOrigin: "left center",
    transform: "scaleX(0)",
    zIndex: "9999",
    pointerEvents: "none"
  });

  document.body.appendChild(progress);

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${Math.min(Math.max(progressValue, 0), 1)})`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
}

/* ---------------------------------------------------------
   8. Copy email button with user feedback
--------------------------------------------------------- */
function initCopyEmailButton() {
  const button = document.querySelector(".copy-email-btn");
  if (!button) return;

  const email = "w3.sahilkumar@gmail.com";

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      const previousText = button.textContent;
      button.textContent = "Copied!";
      button.classList.add("is-copied");

      setTimeout(() => {
        button.textContent = previousText;
        button.classList.remove("is-copied");
      }, 1200);
    } catch (error) {
      const link = document.createElement("a");
      link.href = `mailto:${email}`;
      link.click();
    }
  });
}

/* ---------------------------------------------------------
   9. Animated stats counters when visible
--------------------------------------------------------- */
function initAnimatedStats(prefersReducedMotion) {
  const stats = document.querySelectorAll(".stat-number");
  if (!stats.length) return;

  if (prefersReducedMotion) {
    stats.forEach((stat) => {
      stat.textContent = `${stat.dataset.target}${stat.dataset.suffix || ""}`;
    });
    return;
  }

  const animateCounter = (element) => {
    const target = Number(element.dataset.target || 0);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      element.textContent = `${value}${element.dataset.suffix || ""}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

/* ---------------------------------------------------------
   10. Certificate modal / lightbox functionality
--------------------------------------------------------- */
function initCertificateModal() {
  const modal = document.getElementById("certModal");
  const modalImage = document.getElementById("certModalImage");
  const modalClose = document.getElementById("certModalClose");
  const zoomButtons = document.querySelectorAll(".cert-card__zoom-btn");
  const certImages = document.querySelectorAll(".cert-card__image");
  const certCards = document.querySelectorAll(".cert-card");

  if (!modal || !zoomButtons.length) return;

  const openModal = (imageSrc) => {
    modalImage.src = imageSrc;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  // Open modal on zoom button click
  zoomButtons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const imageSrc = certImages[index].src;
      openModal(imageSrc);
    });
  });

  // Open modal on image click
  certImages.forEach((img) => {
    img.addEventListener("click", () => {
      openModal(img.src);
    });
  });

  // Close modal on close button click
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Close modal on overlay click
  const overlay = document.querySelector(".cert-modal__overlay");
  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // 3D Tilt effect on mouse movement
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  certCards.forEach((card) => {
    const imageContainer = card.querySelector(".cert-card__image-container");
    
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      imageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener("mouseleave", () => {
      imageContainer.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
  });
}

