(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const form = document.querySelector("[data-estimate-form]");
  const status = document.querySelector("[data-form-status]");
  const revealNodes = document.querySelectorAll(".reveal");

  const setScrolled = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  if (toggle && nav && header) {
    const closeNav = () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      header.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      header.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const offset = header ? header.offsetHeight + 8 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  if (revealNodes.length) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const delay = Number(entry.target.getAttribute("data-reveal-delay") || 0);
            window.setTimeout(() => entry.target.classList.add("is-visible"), delay);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
      );
      revealNodes.forEach((node) => observer.observe(node));
    }
  }

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwI4uHLLIdK-1qdQmvV2qwcuEf0FOUyEIkGQfUu6KqGfuUEO_kZH5lpWqOrpMAifU3Lng/exec";

  if (form && status) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.classList.remove("is-error");

      if (!form.checkValidity()) {
        status.textContent = "Please complete the required fields.";
        status.classList.add("is-error");
        form.reportValidity();
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.textContent : "Request Estimate";

      try {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending...";
        }
        status.textContent = "Submitting your estimate request...";

        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();

        // Convert FormData to URLSearchParams for Google Apps Script e.parameter
        const params = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
          params.append(key, value);
        }

        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: params.toString()
        });

        status.textContent = `Thank you${name ? `, ${name}` : ""}! Your estimate request has been received. We'll be in touch soon.`;
        form.reset();
      } catch (error) {
        console.error("Form submission error:", error);
        status.textContent = "Sorry, something went wrong while submitting. Please try calling or messaging us directly.";
        status.classList.add("is-error");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  }
})();
