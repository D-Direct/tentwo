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
  // MOBILE GALLERY THUMBNAIL GRID
  // =============================================================================

  /**
   * Initialize mobile gallery thumbnail grid functionality
   */
  function initMobileGallery() {
    // Only run on mobile
    if (window.innerWidth > 768) return;

    const gallerySection = document.querySelector('.gallery-section');
    const galleryIntro = document.querySelector('.gallery-intro');
    if (!gallerySection || !galleryIntro) return;

    // Create highlights label
    const highlightsLabel = document.createElement('div');
    highlightsLabel.className = 'gallery-highlights-label';
    highlightsLabel.id = 'highlightsLabel';
    highlightsLabel.textContent = 'HIGHLIGHTS';

    // Create mobile filter buttons
    const mobileFilters = document.createElement('div');
    mobileFilters.className = 'gallery-filters-mobile';
    mobileFilters.innerHTML = `
      <button class="filter-btn-mobile" data-filter-mobile="all">All</button>
      <button class="filter-btn-mobile" data-filter-mobile="outdoor">Outdoor</button>
      <button class="filter-btn-mobile" data-filter-mobile="living">Living</button>
      <button class="filter-btn-mobile" data-filter-mobile="suites">Suites</button>
    `;

    // Insert after gallery intro
    galleryIntro.after(highlightsLabel);
    highlightsLabel.after(mobileFilters);

    // Create mobile thumbnail grid
    const mobileGrid = document.createElement('div');
    mobileGrid.className = 'gallery-grid-mobile';
    mobileGrid.id = 'galleryGridMobile';

    // Insert after mobile filters
    mobileFilters.after(mobileGrid);

    // Create "Show all photos" button
    const showAllBtn = document.createElement('button');
    showAllBtn.className = 'show-all-btn';
    showAllBtn.id = 'showAllPhotosBtn';
    showAllBtn.textContent = 'Show all photos (31)';

    // Insert after mobile grid
    mobileGrid.after(showAllBtn);

    // Get all gallery items from desktop grid
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Map categories: outdoor-rooftop -> outdoor, living-kitchen -> living, master/garden/upper -> suites
    function getCategoryGroup(category) {
      if (category === 'outdoor-rooftop') return 'outdoor';
      if (category === 'living-kitchen') return 'living';
      if (category === 'master' || category === 'garden' || category === 'upper') return 'suites';
      return category;
    }

    // Build thumbnail grid
    let allThumbs = [];
    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (!img) return;

      const category = item.getAttribute('data-category');
      const categoryGroup = getCategoryGroup(category);

      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb';
      thumb.setAttribute('data-category-mobile', categoryGroup);
      thumb.setAttribute('data-category-original', category);
      thumb.setAttribute('data-index', index);
      thumb.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy" />`;

      // Click handler to open viewer
      thumb.addEventListener('click', function() {
        openMobileViewer(index, getCurrentFilteredItems());
      });

      allThumbs.push(thumb);
      mobileGrid.appendChild(thumb);
    });

    // Filter and show/hide logic
    let currentMode = 'highlights'; // 'highlights', 'all', 'outdoor', 'living', 'suites'

    // Define highlight photos: outdoor-1, rooftop-1, living-kitchen-1, master-1, outdoor-2, living-kitchen-2, garden-1, master-2, upper-1
    const highlightIndices = [];
    const categoryFirstIndices = {
      'outdoor-rooftop': [],
      'living-kitchen': [],
      'master': [],
      'garden': [],
      'upper': []
    };

    // Find first photos of each category
    galleryItems.forEach((item, index) => {
      const cat = item.getAttribute('data-category');
      if (!categoryFirstIndices[cat]) categoryFirstIndices[cat] = [];
      categoryFirstIndices[cat].push(index);
    });

    // Build highlight list (9 photos): outdoor-1, rooftop-1, living-1, master-1, outdoor-2, living-2, garden-1, master-2, upper-1
    // Note: outdoor-rooftop category includes both outdoor and rooftop photos
    if (categoryFirstIndices['outdoor-rooftop'][0] !== undefined) highlightIndices.push(categoryFirstIndices['outdoor-rooftop'][0]); // outdoor-1 or rooftop-1
    if (categoryFirstIndices['outdoor-rooftop'][1] !== undefined) highlightIndices.push(categoryFirstIndices['outdoor-rooftop'][1]); // next outdoor/rooftop
    if (categoryFirstIndices['living-kitchen'][0] !== undefined) highlightIndices.push(categoryFirstIndices['living-kitchen'][0]); // living-1
    if (categoryFirstIndices['master'][0] !== undefined) highlightIndices.push(categoryFirstIndices['master'][0]); // master-1
    if (categoryFirstIndices['outdoor-rooftop'][2] !== undefined) highlightIndices.push(categoryFirstIndices['outdoor-rooftop'][2]); // outdoor-2
    if (categoryFirstIndices['living-kitchen'][1] !== undefined) highlightIndices.push(categoryFirstIndices['living-kitchen'][1]); // living-2
    if (categoryFirstIndices['garden'][0] !== undefined) highlightIndices.push(categoryFirstIndices['garden'][0]); // garden-1
    if (categoryFirstIndices['master'][1] !== undefined) highlightIndices.push(categoryFirstIndices['master'][1]); // master-2
    if (categoryFirstIndices['upper'][0] !== undefined) highlightIndices.push(categoryFirstIndices['upper'][0]); // upper-1

    function getCurrentFilteredItems() {
      if (currentMode === 'highlights') {
        return highlightIndices.map(idx => galleryItems[idx]);
      }

      if (currentMode === 'all') {
        // Interleave by category: outdoor, living, suites, outdoor, living, suites...
        const outdoor = Array.from(galleryItems).filter(item => getCategoryGroup(item.getAttribute('data-category')) === 'outdoor');
        const living = Array.from(galleryItems).filter(item => getCategoryGroup(item.getAttribute('data-category')) === 'living');
        const suites = Array.from(galleryItems).filter(item => getCategoryGroup(item.getAttribute('data-category')) === 'suites');

        const interleaved = [];
        const maxLen = Math.max(outdoor.length, living.length, suites.length);
        for (let i = 0; i < maxLen; i++) {
          if (outdoor[i]) interleaved.push(outdoor[i]);
          if (living[i]) interleaved.push(living[i]);
          if (suites[i]) interleaved.push(suites[i]);
        }
        return interleaved;
      }

      return Array.from(galleryItems).filter(item => {
        const cat = getCategoryGroup(item.getAttribute('data-category'));
        return cat === currentMode;
      });
    }

    function filterThumbnails(mode) {
      currentMode = mode;
      const thumbs = mobileGrid.querySelectorAll('.gallery-thumb');

      if (mode === 'highlights') {
        // Show only highlight photos (9)
        thumbs.forEach((thumb, index) => {
          const thumbIndex = parseInt(thumb.getAttribute('data-index'));
          if (highlightIndices.includes(thumbIndex)) {
            thumb.classList.remove('hidden');
          } else {
            thumb.classList.add('hidden');
          }
        });
        showAllBtn.classList.remove('hidden');
        highlightsLabel.classList.remove('hidden');
      } else if (mode === 'all') {
        // Show all in interleaved order
        const interleavedItems = getCurrentFilteredItems();
        const interleavedIndices = interleavedItems.map(item => Array.from(galleryItems).indexOf(item));

        thumbs.forEach(thumb => {
          const thumbIndex = parseInt(thumb.getAttribute('data-index'));
          if (interleavedIndices.includes(thumbIndex)) {
            thumb.classList.remove('hidden');
            // Reorder in DOM
            const orderIndex = interleavedIndices.indexOf(thumbIndex);
            thumb.style.order = orderIndex;
          } else {
            thumb.classList.add('hidden');
          }
        });
        showAllBtn.classList.add('hidden');
        highlightsLabel.classList.add('hidden');
      } else {
        // Show all for specific category
        thumbs.forEach(thumb => {
          const category = thumb.getAttribute('data-category-mobile');
          if (category === mode) {
            thumb.classList.remove('hidden');
            thumb.style.order = '';
          } else {
            thumb.classList.add('hidden');
          }
        });
        showAllBtn.classList.add('hidden');
        highlightsLabel.classList.add('hidden');
      }
    }

    // Mobile filter button handlers
    const filterBtnsMobile = mobileFilters.querySelectorAll('.filter-btn-mobile');
    filterBtnsMobile.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active state
        filterBtnsMobile.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Apply filter
        const filterValue = this.getAttribute('data-filter-mobile');
        filterThumbnails(filterValue);
      });
    });

    // Show all button handler
    showAllBtn.addEventListener('click', function() {
      filterThumbnails('all');
      // Highlight the All button
      filterBtnsMobile.forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('[data-filter-mobile="all"]');
      if (allBtn) allBtn.classList.add('active');
    });

    // Initial state: highlights (no button highlighted)
    filterThumbnails('highlights');

    // Mobile viewer with suite captions
    function openMobileViewer(startIndex, filteredItems) {
      const viewer = document.getElementById('galleryViewer');
      const viewerImage = document.getElementById('viewerImage');
      const viewerCounter = document.getElementById('viewerCounter');

      if (!viewer || !viewerImage) return;

      let currentIndex = 0;

      // Find the index in filtered items
      const startItem = galleryItems[startIndex];
      currentIndex = Array.from(filteredItems).indexOf(startItem);

      if (currentIndex === -1) currentIndex = 0;

      // Create caption element if it doesn't exist
      let viewerCaption = document.getElementById('viewerCaptionMobile');
      if (!viewerCaption) {
        viewerCaption = document.createElement('div');
        viewerCaption.id = 'viewerCaptionMobile';
        viewerCaption.className = 'viewer-caption-mobile';
        viewer.appendChild(viewerCaption);
      }

      // Create mobile controls row if it doesn't exist
      let viewerControlsMobile = document.getElementById('viewerControlsMobile');
      if (!viewerControlsMobile) {
        viewerControlsMobile = document.createElement('div');
        viewerControlsMobile.id = 'viewerControlsMobile';
        viewerControlsMobile.className = 'viewer-controls-mobile';
        viewerControlsMobile.innerHTML = `
          <button class="viewer-nav-btn-mobile" id="viewerPrevMobile">\u2039</button>
          <div class="viewer-counter-mobile" id="viewerCounterMobile">1 / 1</div>
          <button class="viewer-nav-btn-mobile" id="viewerNextMobile">\u203A</button>
        `;
        viewer.appendChild(viewerControlsMobile);
      }

      const viewerCounterMobile = document.getElementById('viewerCounterMobile');
      const viewerPrevMobile = document.getElementById('viewerPrevMobile');
      const viewerNextMobile = document.getElementById('viewerNextMobile');

      function updateViewer(index, animated = false) {
        const item = filteredItems[index];
        if (!item) return;

        const img = item.querySelector('img');
        if (img) {
          if (animated) {
            // Add slide animation
            viewerImage.style.opacity = '0';
            viewerImage.style.transform = 'scale(0.95)';
            setTimeout(() => {
              viewerImage.src = img.src;
              viewerImage.alt = img.alt;
              viewerImage.style.opacity = '1';
              viewerImage.style.transform = 'scale(1)';
            }, 150);
          } else {
            viewerImage.src = img.src;
            viewerImage.alt = img.alt;
          }
        }

        // Update mobile counter
        if (viewerCounterMobile) {
          viewerCounterMobile.textContent = `${index + 1} / ${filteredItems.length}`;
        }

        // Update desktop counter (hidden on mobile)
        if (viewerCounter) {
          viewerCounter.textContent = `${index + 1} / ${filteredItems.length}`;
        }

        // Update caption for suites
        const category = item.getAttribute('data-category');
        if (category === 'master') {
          viewerCaption.textContent = 'Master suite';
          viewerCaption.style.display = 'block';
        } else if (category === 'garden') {
          viewerCaption.textContent = 'Garden suite';
          viewerCaption.style.display = 'block';
        } else if (category === 'upper') {
          viewerCaption.textContent = 'Upper suite';
          viewerCaption.style.display = 'block';
        } else {
          viewerCaption.style.display = 'none';
        }
      }

      // Show viewer
      updateViewer(currentIndex);
      viewer.style.display = 'flex';

      // Mobile button navigation handlers
      if (viewerPrevMobile) {
        viewerPrevMobile.onclick = function() {
          currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
          updateViewer(currentIndex, true);
        };
      }

      if (viewerNextMobile) {
        viewerNextMobile.onclick = function() {
          currentIndex = (currentIndex + 1) % filteredItems.length;
          updateViewer(currentIndex, true);
        };
      }

      // Desktop navigation handlers (hidden on mobile)
      const viewerPrev = document.getElementById('viewerPrev');
      const viewerNext = document.getElementById('viewerNext');

      if (viewerPrev) {
        viewerPrev.onclick = function() {
          currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
          updateViewer(currentIndex, true);
        };
      }

      if (viewerNext) {
        viewerNext.onclick = function() {
          currentIndex = (currentIndex + 1) % filteredItems.length;
          updateViewer(currentIndex, true);
        };
      }

      // Touch swipe functionality for mobile
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;
      const minSwipeDistance = 40;

      function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }

      function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      }

      function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Check if swipe is mostly horizontal (not vertical scroll)
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe detected
          if (Math.abs(deltaX) >= minSwipeDistance) {
            if (deltaX > 0) {
              // Swipe right - previous photo
              currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
              updateViewer(currentIndex, true);
            } else {
              // Swipe left - next photo
              currentIndex = (currentIndex + 1) % filteredItems.length;
              updateViewer(currentIndex, true);
            }
          }
        }
      }

      // Add touch listeners to viewer
      viewer.removeEventListener('touchstart', handleTouchStart);
      viewer.removeEventListener('touchend', handleTouchEnd);
      viewer.addEventListener('touchstart', handleTouchStart, { passive: true });
      viewer.addEventListener('touchend', handleTouchEnd, { passive: true });

      // Keyboard navigation
      function handleKeydown(e) {
        if (viewer.style.display !== 'flex') return;
        if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
          updateViewer(currentIndex, true);
        } else if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % filteredItems.length;
          updateViewer(currentIndex, true);
        }
      }

      document.removeEventListener('keydown', handleKeydown);
      document.addEventListener('keydown', handleKeydown);
    }
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
    initMobileGallery();
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
