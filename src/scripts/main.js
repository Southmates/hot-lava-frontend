import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import customCursor from "./utils/cursor.js";
import { handleDynamicContentResize } from "./utils/dynamic-resize.js";
import { initSectionColors } from "./utils/section-colors.js";

import { register } from "swiper/element/bundle";
register();

// Reset scroll position on page reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Initialize Lenis smooth scroll
export const lenis = new Lenis({
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

// Make lenis available globally for components
window.lenis = lenis;

// Navigation handler with anchor scrolling and menu state
function handleNav() {
  const homeLink = document.querySelector(".home-link");
  const aboutLink = document.querySelector(".about-link");
  const ourWayLink = document.querySelector(".how-we-work-link");
  const shopLink = document.querySelector(".shop-link");
  const contactLink = document.querySelector(".contact-link");

  const homeEl = document.querySelector("#home");
  const aboutEl = document.querySelector("#about-us");
  const ourWayEl = document.querySelector("#work");
  const shopEl = document.querySelector("#shop");
  const contactEl = document.querySelector("#contact");

  const mobileNavBtn = document.querySelector(".burger");
  const mobileNavBtnClose = document.querySelector(".close");
  const mobileNav = document.querySelector(".mobile");

  const setHomeMenu = () => {
    shopLink.classList.remove("active");
    aboutLink.classList.remove("active");
    ourWayLink.classList.remove("active");
    contactLink.classList.remove("active");
    mobileNav.classList.add("hidden");
    mobileNavOpen = false;
  };

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
  if (homeLink && homeEl) {
    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      lenis.scrollTo(homeEl, { offset: 0, duration: 1.2 });
      setHomeMenu();
    });
  }

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

  if (mobileNavBtn) {
    mobileNavBtn.addEventListener("click", () => {
      if (mobileNavOpen) {
        mobileNav.classList.add("hidden");
        mobileNavOpen = false;
      } else {
        mobileNav.classList.remove("hidden");
        mobileNavOpen = true;
      }
    });
  }

  if (mobileNavBtnClose) {
    mobileNavBtnClose.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
      mobileNavOpen = false;
    });
  }
}

// Modal handler - stop/start Lenis when modal opens/closes
function handleModal() {
  const worksTrigger = document.querySelectorAll(".js-work");
  const modalSliders = document.querySelectorAll(".work__slider");
  const closeModalBtn = document.querySelector(".js-close");
  const modalTarget = document.querySelector(".modal");
  const videoIframe = document.getElementById("work-video");

  // Convert Vimeo URL to embed format
  function getVimeoEmbedUrl(url) {
    const videoId = url.match(/\/(\d+)/)?.[1];
    if (!videoId) return '';
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=0&muted=0`;
  }

  // Stop video playback
  function stopVideo() {
    if (videoIframe) {
      videoIframe.src = '';
    }
  }

  // Open modal and stop scroll
  worksTrigger.forEach((item) => {
    item.addEventListener("click", (e) => {
      const workItem = e.currentTarget;
      const videoUrl = workItem.dataset.video;
      
      // Only open modal if there's a video URL
      if (!videoUrl || videoUrl.trim() === '') {
        return;
      }

      if (videoIframe) {
        const embedUrl = getVimeoEmbedUrl(videoUrl);
        if (embedUrl) {
          videoIframe.src = embedUrl;
        } else {
          return; // Invalid video URL, don't open modal
        }
      }

      modalTarget.classList.add("is-active");

      const targetSlide = workItem.dataset.slide;
      const targetClient = document.querySelector(`[data-client=${targetSlide}]`);
      if (targetClient) {
        targetClient.hidden = false;
      }

      lenis.stop();
    });
  });

  // Close modal and restart scroll
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close modal on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalTarget.classList.contains("is-active")) {
      closeModal();
    }
  });

  function closeModal() {
    stopVideo();
    modalTarget.classList.remove("is-active");
    modalSliders.forEach((slider) => (slider.hidden = true));
    lenis.start();
  }
}

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

// Update active menu state based on scroll position
function handleActiveMenuState() {
  const homeLink = document.querySelector(".home-link");
  const aboutLink = document.querySelector(".about-link");
  const ourWayLink = document.querySelector(".how-we-work-link");
  const shopLink = document.querySelector(".shop-link");
  const contactLink = document.querySelector(".contact-link");

  const homeEl = document.querySelector("#home");
  const aboutEl = document.querySelector("#about-us");
  const ourWayEl = document.querySelector("#work");
  const shopEl = document.querySelector("#shop");
  const contactEl = document.querySelector("#contact");

  if (!homeLink || !aboutLink || !ourWayLink || !shopLink || !contactLink) return;

  const links = [
    { link: homeLink, element: homeEl, id: 'home' },
    { link: aboutLink, element: aboutEl, id: 'about' },
    { link: ourWayLink, element: ourWayEl, id: 'work' },
    { link: shopLink, element: shopEl, id: 'shop' },
    { link: contactLink, element: contactEl, id: 'contact' },
  ].filter(item => item.element); // Filtrar elementos que no existen

  // Función para actualizar el estado activo
  const updateActiveState = (activeId) => {
    links.forEach(({ link, id }) => {
      if (id === activeId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  // Crear ScrollTriggers para cada sección
  links.forEach(({ element, id }) => {
    if (!element) return;

    ScrollTrigger.create({
      trigger: element,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => updateActiveState(id),
      onEnterBack: () => updateActiveState(id),
      onLeave: () => {
        // Determinar qué sección es la siguiente
        const currentScroll = window.scrollY || window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const centerPoint = currentScroll + viewportHeight / 2;

        // Encontrar la sección más cercana al centro del viewport
        let closestSection = null;
        let closestDistance = Infinity;

        links.forEach(({ element: el, id: sectionId }) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + currentScroll;
          const elementCenter = elementTop + rect.height / 2;
          const distance = Math.abs(centerPoint - elementCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = sectionId;
          }
        });

        if (closestSection) {
          updateActiveState(closestSection);
        }
      },
      onLeaveBack: () => {
        // Similar a onLeave pero para scroll hacia arriba
        const currentScroll = window.scrollY || window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const centerPoint = currentScroll + viewportHeight / 2;

        let closestSection = null;
        let closestDistance = Infinity;

        links.forEach(({ element: el, id: sectionId }) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + currentScroll;
          const elementCenter = elementTop + rect.height / 2;
          const distance = Math.abs(centerPoint - elementCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = sectionId;
          }
        });

        if (closestSection) {
          updateActiveState(closestSection);
        }
      },
    });
  });

  // Estado inicial basado en la posición del scroll
  const updateInitialState = () => {
    const currentScroll = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const centerPoint = currentScroll + viewportHeight / 2;

    let closestSection = null;
    let closestDistance = Infinity;

    links.forEach(({ element: el, id: sectionId }) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + currentScroll;
      const elementCenter = elementTop + rect.height / 2;
      const distance = Math.abs(centerPoint - elementCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = sectionId;
      }
    });

    if (closestSection) {
      updateActiveState(closestSection);
    }
  };

  // Actualizar estado inicial después de que todo esté cargado
  if (document.readyState === 'complete') {
    setTimeout(updateInitialState, 100);
  } else {
    window.addEventListener('load', () => {
      setTimeout(updateInitialState, 100);
    });
  }
}

// Initialize all functions
handleNav();
handleModal();
handleHeaderVisibility();
handleActiveMenuState();
handleDynamicContentResize(lenis);
// customCursor();

// Initialize section-based body color changes
initSectionColors();
