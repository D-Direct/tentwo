/**
 * TEN TWO - Shared JavaScript
 * Common functionality used across all pages
 *
 * This file contains:
 * - Header scroll behavior
 * - Mobile menu functionality
 * - Smooth scroll handlers
 * - Intersection observer for reveal animations
 * - Gallery filtering
 * - Floating WhatsApp visibility control
 * - Navigation link handlers
 */

(function() {
  'use strict';

  // =============================================================================
  // HEADER SCROLL BEHAVIOR
  // =============================================================================

  /**
   * Adds 'scrolled' class to header when page is scrolled down
   */
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // =============================================================================
  // MOBILE MENU
  // =============================================================================

  /**
   * Toggle mobile menu and close on link click
   */
  function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileToggle || !mobileMenu) return;

    // Toggle menu
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // =============================================================================
  // SMOOTH SCROLL
  // =============================================================================

  /**
   * Smooth scroll to target element with header offset
   * @param {string} targetId - ID of target element (without #)
   * @param {number} offset - Offset from top (default: 76px for header)
   */
  function smoothScrollTo(targetId, offset = 76) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const scrollPosition = targetPosition - offset;
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Initialize smooth scroll for navigation links
   */
  function initSmoothScroll() {
    // Handle all section navigation links (desktop and mobile)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' || !href) return;

      const targetId = href.substring(1);
      // Only handle section links (residence, gallery, location)
      if (targetId === 'residence' || targetId === 'gallery' || targetId === 'location') {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          smoothScrollTo(targetId, 76);
        });
      }
    });
  }

  // =============================================================================
  // INTERSECTION OBSERVER (REVEAL ANIMATIONS)
  // =============================================================================

  /**
   * Initialize reveal animations for elements with .reveal and .reveal-image classes
   */
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-image');

    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // =============================================================================
  // GALLERY FILTERING
  // =============================================================================

  /**
   * Filter gallery items by category
   * @param {string} filterValue - Category to filter by
   */
  function filterGallery(filterValue) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    const activeButton = document.querySelector(`[data-filter="${filterValue}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }

    // Filter gallery items
    galleryItems.forEach((item) => {
      const category = item.getAttribute('data-category');
      if (category === filterValue) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  /**
   * Initialize gallery filtering functionality
   */
  function initGalleryFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    // Initialize gallery - show only outdoor-rooftop on page load
    galleryItems.forEach((item) => {
      const category = item.getAttribute('data-category');
      if (category !== 'outdoor-rooftop') {
        item.classList.add('hidden');
      }
    });

    // Filter button clicks
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterGallery(filter);
      });
    });
  }

  // =============================================================================
  // FLOATING WHATSAPP VISIBILITY (MOBILE)
  // =============================================================================

  /**
   * Hide floating WhatsApp button when hero section is visible or bottom sheet is open
   * For pages without hero (about, kandy-guide), show after 300px scrolling
   */
  function initFloatingWhatsAppVisibility() {
    const heroSection = document.querySelector('.hero');
    const floatingWhatsApp = document.querySelector('.floating-whatsapp');
    const bottomSheet = document.getElementById('mobileBooking');

    if (!floatingWhatsApp) return;

    // For pages with hero section (homepage)
    if (heroSection) {
      // Hide when hero is visible
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            floatingWhatsApp.classList.add('hidden-on-hero');
          } else {
            floatingWhatsApp.classList.remove('hidden-on-hero');
          }
        });
      }, {
        threshold: 0.1
      });

      heroObserver.observe(heroSection);

      // Hide when bottom sheet is open
      if (bottomSheet) {
        const sheetObserver = new MutationObserver(() => {
          if (bottomSheet.classList.contains('active')) {
            floatingWhatsApp.classList.add('hidden-on-sheet');
          } else {
            floatingWhatsApp.classList.remove('hidden-on-sheet');
          }
        });

        sheetObserver.observe(bottomSheet, {
          attributes: true,
          attributeFilter: ['class']
        });
      }
    } else {
      // For pages without hero (about, kandy-guide), show after 300px scrolling
      let hasScrolledEnough = false;

      function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY > 300 && !hasScrolledEnough) {
          hasScrolledEnough = true;
          floatingWhatsApp.classList.remove('hidden-on-hero');
        } else if (scrollY <= 300 && hasScrolledEnough) {
          hasScrolledEnough = false;
          floatingWhatsApp.classList.add('hidden-on-hero');
        }
      }

      // Initially hidden
      floatingWhatsApp.classList.add('hidden-on-hero');

      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  }

  // =============================================================================
  // GALLERY VIEWER
  // =============================================================================

  /**
   * Initialize gallery viewer functionality
   */
  function initGalleryViewer() {
    let currentImages = [];
    let currentIndex = 0;

    const viewer = document.getElementById('galleryViewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerClose = document.getElementById('viewerClose');
    const viewerPrev = document.getElementById('viewerPrev');
    const viewerNext = document.getElementById('viewerNext');
    const viewerCounter = document.getElementById('viewerCounter');

    if (!viewer || !viewerImage) return;

    // Click on gallery item
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const activeFilter = document.querySelector('.filter-btn.active');
        if (!activeFilter) return;

        const filterValue = activeFilter.dataset.filter;
        currentImages = Array.from(document.querySelectorAll(`.gallery-item[data-category="${filterValue}"] img`));
        const clickedImg = this.querySelector('img');
        currentIndex = currentImages.indexOf(clickedImg);

        if (currentIndex !== -1) {
          showImage(currentIndex);
          viewer.style.display = 'flex';
        }
      });
    });

    // Close viewer
    function closeViewer() {
      viewer.style.display = 'none';
    }

    if (viewerClose) {
      viewerClose.addEventListener('click', closeViewer);
    }

    viewer.addEventListener('click', function(e) {
      if (e.target === viewer) closeViewer();
    });

    document.addEventListener('keydown', function(e) {
      if (viewer.style.display === 'flex') {
        if (e.key === 'Escape') closeViewer();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
      }
    });

    // Navigation
    if (viewerPrev) {
      viewerPrev.addEventListener('click', showPrev);
    }
    if (viewerNext) {
      viewerNext.addEventListener('click', showNext);
    }

    // Touch swipe
    let touchStartX = 0;
    viewer.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
    viewer.addEventListener('touchend', function(e) {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) showNext();
      if (touchEndX - touchStartX > 50) showPrev();
    });

    function showImage(index) {
      currentIndex = index;
      if (currentImages[index]) {
        viewerImage.src = currentImages[index].src;
        viewerImage.alt = currentImages[index].alt;
        if (viewerCounter) {
          viewerCounter.textContent = `${index + 1} / ${currentImages.length}`;
        }
      }
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % currentImages.length;
      showImage(currentIndex);
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      showImage(currentIndex);
    }
  }

  // =============================================================================
  // MOBILE WHATSAPP LINK TRACKING
  // =============================================================================

  /**
   * Track clicks on mobile WhatsApp link in menu
   */
  function initMobileWhatsAppTracking() {
    const mobileWhatsAppLink = document.getElementById('mobileWhatsAppLink');
    if (!mobileWhatsAppLink) return;

    mobileWhatsAppLink.addEventListener('click', function() {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: 'whatsapp_click',
        link_location: 'mobile_menu'
      });
    });
  }

  // =============================================================================
  // INITIALIZATION
  // =============================================================================

  /**
   * Initialize all shared functionality
   */
  function init() {
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initRevealAnimations();
    initGalleryFiltering();
    initGalleryViewer();
    initFloatingWhatsAppVisibility();
    initMobileWhatsAppTracking();
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose smoothScrollTo for use by other scripts if needed
  window.smoothScrollTo = smoothScrollTo;

})();
