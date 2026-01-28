import gsap from 'gsap';

/**
 * Initialize custom cursor with text for specific elements
 * @param {string} selector - CSS selector for elements that trigger the cursor
 * @param {Object} options - Configuration options
 * @param {string} options.text - Text to display in cursor (default: 'VIEW BIO')
 * @param {string} [options.cursorId='custom-cursor'] - ID for the cursor element
 * @param {number} [options.minWidth=1024] - Minimum width for desktop (default: 1024)
 */
export function initCustomCursor(selector, options = {}) {
  const config = {
    text: options.text || 'VIEW BIO',
    cursorId: options.cursorId || 'custom-cursor',
    minWidth: options.minWidth !== undefined ? options.minWidth : 1024,
  };

  // Only on desktop
  if (window.innerWidth < config.minWidth) return;

  // Get or create cursor element
  let cursor = document.getElementById(config.cursorId);
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.id = config.cursorId;
    cursor.className = 'custom-cursor';
    cursor.innerHTML = `
      <div class="custom-cursor__circle">
        <span class="custom-cursor__text">${config.text}</span>
      </div>
    `;
    document.body.appendChild(cursor);
  } else {
    // Update text if cursor already exists
    const textElement = cursor.querySelector('.custom-cursor__text');
    if (textElement) {
      textElement.textContent = config.text;
    }
  }

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) {
    console.warn(`initCustomCursor: No elements found for selector "${selector}"`);
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let isHovering = false;
  let cursorTween = null;

  // Set initial cursor position
  gsap.set(cursor, {
    x: 0,
    y: 0,
    opacity: 0,
  });

  // Track mouse position globally
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor position smoothly when hovering
    if (isHovering && cursor) {
      if (cursorTween) cursorTween.kill();
      
      cursorTween = gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  });

  // Show cursor on element hover
  elements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      isHovering = true;
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    element.addEventListener('mouseleave', () => {
      isHovering = false;
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      if (cursorTween) {
        cursorTween.kill();
        cursorTween = null;
      }
    });
  });

  return cursor;
}
