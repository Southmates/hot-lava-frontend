// src/scripts/utils/ukiyo.js
import Ukiyo from 'ukiyojs';

/**
 * Initialize UKIYO parallax effect on images
 * @param {string|HTMLElement|NodeList} targets - Image elements to apply parallax
 * @param {Object} options - UKIYO configuration options
 */
export function initUkiyo(targets, options = {}) {
  const elements = typeof targets === 'string' 
    ? document.querySelectorAll(targets)
    : targets instanceof NodeList 
      ? targets 
      : [targets];

  if (elements.length === 0) {
    console.warn('Ukiyo: No elements found', targets);
    return [];
  }

  const defaultOptions = {
    scale: 1.5,
    speed: 1.5,
    willChange: true,
    wrapperClass: 'ukiyo-wrapper',
    externalRAF: false,
    ...options
  };

  return Array.from(elements).map(element => {
    return new Ukiyo(element, defaultOptions);
  });
}