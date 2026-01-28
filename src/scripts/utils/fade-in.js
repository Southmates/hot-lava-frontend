import gsap from 'gsap';

/**
 * Initialize fade-in animation for elements using Intersection Observer
 * @param {string|NodeList|HTMLElement} targets - Elements to animate (selector, NodeList, or single element)
 * @param {Object} options - Configuration options
 * @param {string} [options.start='50%'] - Start position: '50%' or '80%' (default: "50%")
 * @param {number} [options.duration=0.8] - Animation duration in seconds
 * @param {string} [options.ease='power2.out'] - GSAP easing function
 * @param {number} [options.y=30] - Initial Y offset (vertical movement)
 * @param {boolean} [options.once=true] - Animate only once (default: true)
 */
export function initFadeIn(targets, options = {}) {
  const config = {
    start: options.start || '50%',
    duration: options.duration !== undefined ? options.duration : 0.8,
    ease: options.ease || 'power2.out',
    y: options.y !== undefined ? options.y : 30,
    once: options.once !== undefined ? options.once : true,
  };

  // Get elements
  let elements;
  if (typeof targets === 'string') {
    elements = document.querySelectorAll(targets);
  } else if (targets instanceof NodeList) {
    elements = targets;
  } else if (targets instanceof HTMLElement) {
    elements = [targets];
  } else {
    console.warn('initFadeIn: Invalid targets provided');
    return;
  }

  if (elements.length === 0) {
    console.warn('initFadeIn: No elements found', targets);
    return;
  }

  // Calculate threshold based on start position
  const threshold = parseFloat(config.start.replace('%', '')) / 100;

  // Set initial state for all elements
  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;

    gsap.set(element, {
      opacity: 0,
      y: config.y,
    });
  });

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          // Animate element
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: config.duration,
            ease: config.ease,
          });

          // Unobserve if once is true
          if (config.once) {
            observer.unobserve(entry.target);
          }
        } else if (!config.once && !entry.isIntersecting) {
          // Reverse animation if once is false
          gsap.to(entry.target, {
            opacity: 0,
            y: config.y,
            duration: config.duration,
            ease: config.ease,
          });
        }
      });
    },
    {
      threshold: threshold,
      rootMargin: '0px',
    }
  );

  // Observe all elements
  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      observer.observe(element);
    }
  });

  return observer; // Return observer in case we need to disconnect it later
}
