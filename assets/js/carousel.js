// Releases carousel.
// Loaded with `defer` from `_includes/head.html`. The early return lets the
// same script ship on every page without cost when the carousel is absent.
(function () {
  'use strict';

  function init() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    if (totalItems === 0 || !track) return;

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let startTransform = 0;

    // Normalize index to be circular.
    function normalizeIndex(index) {
      return ((index % totalItems) + totalItems) % totalItems;
    }

    const liveRegion = carousel.querySelector('.carousel-live');

    function announceActive() {
      if (!liveRegion) return;
      const activeItem = items[currentIndex];
      const title = activeItem && activeItem.querySelector('h3');
      if (!title) return;
      liveRegion.textContent =
        'Release ' + (currentIndex + 1) + ' de ' + totalItems + ': ' + title.textContent.trim();
    }

    function updateCarousel(animate) {
      if (animate === undefined) animate = true;
      const itemWidth = items[0].offsetWidth;
      // Responsive gap based on screen size.
      const gap = window.innerWidth < 768 ? 16 : 32;
      const itemStep = itemWidth + gap;

      items.forEach((item, index) => {
        if (!animate) {
          item.style.transition = 'none';
        } else {
          item.style.transition = '';
        }

        // Calculate circular distance.
        let distance = index - currentIndex;
        if (distance > totalItems / 2) {
          distance -= totalItems;
        } else if (distance < -totalItems / 2) {
          distance += totalItems;
        }

        // Position each item relative to centre.
        const offset = distance * itemStep;
        // Responsive scale: smaller on mobile.
        const inactiveScale = window.innerWidth < 768 ? 0.75 : 0.85;
        const scale = distance === 0 ? 1 : inactiveScale;
        item.style.transform = 'translateX(calc(-50% + ' + offset + 'px)) scale(' + scale + ')';

        // Update active state, visibility, and keyboard reachability.
        const isActive = distance === 0;
        const link = item.querySelector('a');

        if (isActive) {
          item.classList.add('active');
          item.setAttribute('aria-current', 'true');
          item.removeAttribute('aria-hidden');
          if (link) link.removeAttribute('tabindex');
        } else {
          item.classList.remove('active');
          item.removeAttribute('aria-current');
          item.setAttribute('aria-hidden', 'true');
          if (link) link.setAttribute('tabindex', '-1');
        }

        if (!animate) {
          requestAnimationFrame(() => {
            item.style.transition = '';
          });
        }
      });

      updateDots();
      announceActive();
    }

    function updateDots() {
      const dots = carousel.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('active');
          dot.removeAttribute('aria-current');
        }
      });
    }

    function goToSlide(index) {
      currentIndex = normalizeIndex(index);
      updateCarousel();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Touch/Mouse events.
    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      startTransform = currentIndex;
      track.style.cursor = 'grabbing';
    });

    track.addEventListener(
      'touchstart',
      (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        startTransform = currentIndex;
      },
      { passive: true }
    );

    const handleMove = (clientX) => {
      if (!isDragging) return;

      const deltaX = startX - clientX;
      const itemWidth = items[0].offsetWidth;
      const threshold = itemWidth / 3;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          currentIndex = startTransform + 1;
        } else {
          currentIndex = startTransform - 1;
        }
        currentIndex = normalizeIndex(currentIndex);
        isDragging = false;
        track.style.cursor = '';
        updateCarousel();
      }
    };

    document.addEventListener('mousemove', (e) => {
      handleMove(e.pageX);
    });

    document.addEventListener(
      'touchmove',
      (e) => {
        handleMove(e.touches[0].pageX);
      },
      { passive: true }
    );

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        track.style.cursor = '';
        updateCarousel();
      }
    });

    document.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        updateCarousel();
      }
    });

    // Keyboard navigation.
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalItems - 1);
      }
    });

    // Click on items to navigate.
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        const realIndex = parseInt(item.dataset.index, 10);
        if (realIndex !== currentIndex) {
          e.preventDefault();
          let distance = realIndex - currentIndex;
          if (distance > totalItems / 2) {
            distance -= totalItems;
          } else if (distance < -totalItems / 2) {
            distance += totalItems;
          }
          goToSlide(currentIndex + distance);
        }
      });
    });

    // Dots navigation.
    const dots = carousel.querySelectorAll('.carousel-dot');
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.dataset.index, 10);
        goToSlide(targetIndex);
      });
    });

    // Initialize.
    updateCarousel(false);

    // Handle resize.
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCarousel(false);
      }, 250);
    });
  }

  // `defer` guarantees the DOM is parsed, so init immediately. Fall back to
  // DOMContentLoaded if the script is loaded without defer by mistake.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
