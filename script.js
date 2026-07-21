// ==========================================================
// GSAP PLUGINS
// ==========================================================

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ==========================================================
// ALWAYS START FROM TOP
// ==========================================================

// Disable browser scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Force top BEFORE page paints
window.scrollTo(0, 0);

window.addEventListener("DOMContentLoaded", () => {

  window.scrollTo(0, 0);

  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    initAnimations();
  });

});


// ==========================================================
// MAIN INITIALIZER
// ==========================================================

function initAnimations() {

  // =============================
  // HERO INTRO
  // =============================

  const tl = gsap.timeline();

  tl

    .from(".logo", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power4.out"
    })

    .from(".menu-btn span", {
      opacity: 0,
      x: 40,
      stagger: 0.1,
      duration: 0.8
    }, "-=0.6")

    .from(".char", {
      y: "110%",
      opacity: 0,
      stagger: 0.08,
      duration: 1.3,
      ease: "power4.out"
    }, "-=0.5")

    .from(".meta-item", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1
    }, "-=0.8")

    .from(".divider", {
      scaleY: 0,
      transformOrigin: "top center",
      stagger: 0.2
    }, "-=1");



  // =============================
  // SPLIT TEXT
  // =============================

  if (document.querySelector(".about-description")) {

    const split = new SplitType(".about-description", {
      types: "words"
    });

    gsap.to(split.words, {

      color: "#d7d2d2",

      stagger: 0.08,

      scrollTrigger: {

        trigger: ".about-description",

        start: "top 80%",

        end: "bottom 50%",

        scrub: true

      }

    });

  }



  // =============================
  // COUNTERS
  // =============================

  ScrollTrigger.create({

    trigger: ".stats-container",

    start: "top 75%",

    once: true,

    onEnter() {
      document.querySelectorAll(".counter").forEach(counter => {
        const target = parseFloat(counter.dataset.count);
        gsap.to(counter, {
          innerText: target,

          duration: 2.5,

          ease: "power3.out",

          snap: {
            innerText: target % 1 === 0 ? 1 : 0.1
          },

          onUpdate() {

            const value = parseFloat(counter.innerText);

            counter.innerText =
              target % 1 === 0
                ? Math.floor(value)
                : value.toFixed(1);

          }

        });

      });

    }

  });



  // =============================
  // NAVBAR
  // =============================

  const navbar = document.querySelector(".navbar");
  const navCircle = document.querySelector(".nav-circle");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navbar && navCircle && navLinks.length) {

    gsap.set(navbar, {
      y: -100,
      opacity: 0
    });

    // Show after scrolling

    ScrollTrigger.create({

      start: 150,

      onEnter: () => {

        gsap.to(navbar, {

          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out"

        });

      },

      onLeaveBack: () => {

        gsap.to(navbar, {

          y: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"

        });

      }

    });



    function moveCircle(link) {

      navLinks.forEach(item => item.classList.remove("active"));

      link.classList.add("active");

      const linkRect = link.getBoundingClientRect();
      const navRect = navbar.getBoundingClientRect();

      gsap.to(navCircle, {

        x: linkRect.left - navRect.left,

        width: linkRect.width,

        backgroundColor: link.dataset.color,

        duration: 0.45,

        ease: "power3.out"

      });

    }



    // Initial position

    requestAnimationFrame(() => {

      const active = document.querySelector(".nav-link.active");

      if (active) {

        moveCircle(active);

      }

    });



    // Active section

    navLinks.forEach(link => {

      const section = document.querySelector(link.getAttribute("href"));

      if (!section) return;

      ScrollTrigger.create({

        trigger: section,

        start: "top center",

        end: "bottom center",

        onEnter: () => moveCircle(link),

        onEnterBack: () => moveCircle(link)

      });

    });



    // Smooth scroll

    navLinks.forEach(link => {

      link.addEventListener("click", e => {

        e.preventDefault();

        gsap.to(window, {

          duration: 1.2,

          scrollTo: {

            y: link.getAttribute("href"),

            offsetY: 20

          },

          ease: "power3.inOut"

        });

      });

    });

  }

  // Refresh after everything is ready

  ScrollTrigger.refresh();

}