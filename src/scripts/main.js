import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import customCursor from "./cursor.js";

import { register } from "swiper/element/bundle";
register();

// Reset scroll position on page reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Sync Lenis with ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Integrate Lenis with GSAP ticker for better performance
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable lag smoothing to prevent delays in scroll animations
gsap.ticker.lagSmoothing(0);

// Navigation handler with anchor scrolling and menu state
function handleNav() {
  const aboutLink = document.querySelector(".about-link");
  const ourWayLink = document.querySelector(".how-we-work-link");
  const shopLink = document.querySelector(".shop-link");
  const contactLink = document.querySelector(".contact-link");

  const aboutEl = document.querySelector("#about-us");
  const ourWayEl = document.querySelector("#work");
  const shopEl = document.querySelector("#shop");
  const contactEl = document.querySelector("#contact");

  const mobileNavBtn = document.querySelector(".burger");
  const mobileNavBtnClose = document.querySelector(".close");
  const mobileNav = document.querySelector(".mobile");

  const setAboutMenu = () => {
    shopLink.classList.remove("active");
    aboutLink.classList.add("active");
    ourWayLink.classList.remove("active");
    contactLink.classList.remove("active");
    mobileNav.classList.add("hidden");
    mobileNavOpen = false;
  };

  const setOurWayMenu = () => {
    shopLink.classList.remove("active");
    aboutLink.classList.remove("active");
    ourWayLink.classList.add("active");
    contactLink.classList.remove("active");
    mobileNav.classList.add("hidden");
    mobileNavOpen = false;
  };

  const setShopMenu = () => {
    shopLink.classList.add("active");
    ourWayLink.classList.remove("active");
    aboutLink.classList.remove("active");
    contactLink.classList.remove("active");
    mobileNav.classList.add("hidden");
    mobileNavOpen = false;
  };

  const setContactMenu = () => {
    shopLink.classList.remove("active");
    contactLink.classList.add("active");
    aboutLink.classList.remove("active");
    ourWayLink.classList.remove("active");
    mobileNav.classList.add("hidden");
    mobileNavOpen = false;
  };

  // Anchor navigation with smooth scroll
  if (aboutLink && aboutEl) {
    aboutLink.addEventListener("click", (e) => {
      e.preventDefault();
      lenis.scrollTo(aboutEl, { offset: 0, duration: 1.2 });
      setAboutMenu();
    });
  }

  if (ourWayLink && ourWayEl) {
    ourWayLink.addEventListener("click", (e) => {
      e.preventDefault();
      lenis.scrollTo(ourWayEl, { offset: 0, duration: 1.2 });
      setOurWayMenu();
    });
  }

  if (shopLink && shopEl) {
    shopLink.addEventListener("click", (e) => {
      e.preventDefault();
      lenis.scrollTo(shopEl, { offset: 0, duration: 1.2 });
      setShopMenu();
    });
  }

  if (contactLink && contactEl) {
    contactLink.addEventListener("click", (e) => {
      e.preventDefault();
      lenis.scrollTo(contactEl, { offset: 0, duration: 1.2 });
      setContactMenu();
    });
  }

  // Mobile navigation toggle
  let mobileNavOpen = false;

  mobileNavBtn.addEventListener("click", () => {
    if (mobileNavOpen) {
      mobileNav.classList.add("hidden");
      mobileNavOpen = false;
    } else {
      mobileNav.classList.remove("hidden");
      mobileNavOpen = true;
    }
  });

  mobileNavBtnClose.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
    mobileNavOpen = false;
  });
}

// Modal handler - stop/start Lenis when modal opens/closes
function handleModal() {
  const worksTrigger = document.querySelectorAll(".js-work");
  const modalSliders = document.querySelectorAll(".work__slider");
  const closeModalBtn = document.querySelector(".js-close");
  const modalTarget = document.querySelector(".modal");

  // Open modal and stop scroll
  worksTrigger.forEach((item) => {
    item.addEventListener("click", (item) => {
      modalTarget.classList.add("is-active");

      const targetSlide = item.target.dataset.slide;
      document.querySelector(`[data-client=${targetSlide}]`).hidden = false;

      lenis.stop();
    });
  });

  // Close modal and restart scroll
  closeModalBtn.addEventListener("click", closeModal);

  function closeModal() {
    modalTarget.classList.remove("is-active");
    modalSliders.forEach((slider) => (slider.hidden = true));
    lenis.start();
  }
}

// GSAP ScrollTrigger animations
// Select elements
const logo = document.querySelector(".logo");
const burguer = document.querySelector(".burguer-btn");
const heroLogo = document.querySelectorAll(".logo-container");
const copyright = document.querySelector(".copyright__text");
const slogan = document.querySelector(".slogan");
const navbar = document.querySelector(".navbar");
const lastWord = document.querySelector(".last-brand");

// Logo animation
gsap.fromTo(
  logo,
  {
    willChange: "opacity",
    opacity: 0,
    y: -30,
  },
  {
    ease: "power1.inOut",
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: logo,
      start: "top bottom",
      end: "center top",
    },
  }
);

// Burger button animation
gsap.fromTo(
  burguer,
  {
    willChange: "opacity",
    opacity: 0,
    y: -30,
  },
  {
    ease: "power1.inOut",
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: burguer,
      start: "top bottom",
      end: "center top",
    },
  }
);

// Hero logo animation
gsap.fromTo(
  heroLogo,
  {
    willChange: "opacity",
    opacity: 0,
    y: 30,
  },
  {
    ease: "power1.inOut",
    opacity: 1,
    delay: 1.2,
    y: 0,
    scrollTrigger: {
      trigger: slogan,
      start: "top bottom",
      end: "center top",
    },
  }
);

// Copyright animation
gsap.fromTo(
  copyright,
  {
    willChange: "opacity",
    opacity: 0,
    y: 30,
  },
  {
    ease: "power1.inOut",
    opacity: 1,
    delay: 1.2,
    y: 0,
    scrollTrigger: {
      trigger: copyright,
      start: "top bottom",
      end: "center top",
    },
  }
);

// Navbar animation
gsap.fromTo(
  navbar,
  {
    willChange: "opacity",
    opacity: 0,
    x: 30,
  },
  {
    ease: "power1.inOut",
    opacity: 1,
    delay: 1.5,
    x: 0,
    scrollTrigger: {
      trigger: slogan,
      start: "top bottom",
      end: "center top",
    },
  }
);

// Last brand animation
gsap.fromTo(
  lastWord,
  {
    willChange: "opacity",
    opacity: 0,
    y: 60,
  },
  {
    ease: "power1.inOut",
    opacity: 1,
    delay: 0.5,
    y: 0,
    scrollTrigger: {
      trigger: lastWord,
      start: "top bottom",
      end: "center top",
    },
  }
);

// Header visibility based on hero viewport
function handleHeaderVisibility() {
  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");

  if (!header || !hero) return;

  ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "bottom top",
    onLeave: () => {
      header.classList.add("is-active");
    },
    onEnterBack: () => {
      header.classList.remove("is-active");
    },
  });
}

// Initialize all functions
handleNav();
handleModal();
handleHeaderVisibility();
customCursor();
