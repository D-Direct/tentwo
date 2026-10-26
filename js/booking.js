/**
 * TEN TWO - Booking JavaScript
 * Handles all booking-related functionality
 *
 * This file contains:
 * - BOOKING_CONFIG (centralized pricing, OTA URLs, promo settings)
 * - Helper functions for pricing and validation
 * - Booking UI functions for price updates and OTA buttons
 * - Enquiry modal functionality
 * - Check availability button handlers
 * - Rates check dates link handler
 * - Dynamic hero positioning
 * - WhatsApp link tracking
 */

(function() {
  'use strict';

  // =============================================================================
  // BOOKING CONFIGURATION - CENTRALIZED SETTINGS
  // =============================================================================

  /**
   * All promo pricing, OTA URLs, and booking settings in one place
   */
  const BOOKING_CONFIG = {
    // Promo settings
    promo: {
      enabled: true, // Set to false to disable promo
      endDate: '2026-12-31T23:59:59', // Sri Lanka time - promo ends 31 Dec 2026
      offerName: '4th night free · Book by 31 Dec',

      // Normal prices (shown crossed out during promo)
      normalPrices: {
        '1-2': 200,  // 1-2 guests
        '3-4': 225,  // 3-4 guests
        '5-6': 250   // 5-6 guests
      },

      // Promo prices (active until endDate)
      promoPrices: {
        '1-2': 150,  // 1-2 guests
        '3-4': 165,  // 3-4 guests
        '5-6': 190   // 5-6 guests
      },

      // 4th night free rule: for every 4 nights, 1 is free
      freeNightRule: {
        everyNights: 4,
        freeNights: 1
      }
    },

    // OTA Platform URLs
    ota: {
      airbnb: {
        listingId: '1774271605081797145',
        baseUrl: 'https://www.airbnb.com',
        shortUrl: 'https://airbnb.com/h/tentwo'
      },
      booking: {
        url: 'https://www.booking.com/hotel/lk/luxury-villa-in-kandy-with-a-private-pool.html'
      },
      agoda: {
        url: 'https://www.agoda.com/luxury-villa-in-kandy-with-a-private-pool/hotel/kandy-lk.html',
        dsParam: 'T8a9OBi6VA0RYSor' // Keep existing ds parameter
      }
    }
  };

  // =============================================================================
  // HELPER FUNCTIONS
  // =============================================================================

  /**
   * Check if promo is currently active
   * @returns {boolean} True if promo is active
   */
  function isPromoActive() {
    if (!BOOKING_CONFIG.promo.enabled) return false;
    const now = new Date();
    const endDate = new Date(BOOKING_CONFIG.promo.endDate);
    // Convert both to Sri Lanka time for comparison
    const nowSL = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
    return nowSL <= endDate;
  }

  /**
   * Get price for guest count with promo consideration
   * @param {string|number} guests - Number of guests
   * @param {boolean} usePromo - Whether to use promo pricing
   * @returns {Object} Price object with promo, normal, and isPromo flag
   */
  function getPriceForGuests(guests, usePromo = true) {
    const guestNum = parseInt(guests);
    let tier;
    if (guestNum <= 2) tier = '1-2';
    else if (guestNum <= 4) tier = '3-4';
    else tier = '5-6';

    const promoActive = isPromoActive();
    if (promoActive && usePromo) {
      return {
        promo: BOOKING_CONFIG.promo.promoPrices[tier],
        normal: BOOKING_CONFIG.promo.normalPrices[tier],
        isPromo: true
      };
    } else {
      return {
        promo: BOOKING_CONFIG.promo.normalPrices[tier],
        normal: BOOKING_CONFIG.promo.normalPrices[tier],
        isPromo: false
      };
    }
  }

  /**
   * Calculate total with 4th night free rule
   * @param {number} nights - Total number of nights
   * @param {number} pricePerNight - Price per night
   * @returns {Object} Calculation result with total, freeNights, and paidNights
   */
  function calculateTotal(nights, pricePerNight) {
    if (nights <= 0) return 0;
    const rule = BOOKING_CONFIG.promo.freeNightRule;
    const freeNights = Math.floor(nights / rule.everyNights) * rule.freeNights;
    const paidNights = nights - freeNights;
    return {
      total: paidNights * pricePerNight,
      freeNights: freeNights,
      paidNights: paidNights
    };
  }

  /**
   * Build OTA URLs with dates and guests
   * @param {string} platform - Platform name (airbnb, booking, agoda)
   * @param {string} checkIn - Check-in date
   * @param {string} checkOut - Check-out date
   * @param {string|number} guests - Number of guests
   * @returns {string} OTA URL
   */
  function buildOTAUrl(platform, checkIn, checkOut, guests) {
    const config = BOOKING_CONFIG.ota[platform];
    if (!checkIn || !checkOut) {
      // No dates selected - return base URL
      if (platform === 'airbnb') return config.shortUrl;
      if (platform === 'booking') return config.url;
      if (platform === 'agoda') return config.url + '?ds=' + config.dsParam;
    }

    const guestsNum = parseInt(guests) || 2;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (platform === 'airbnb') {
      return `${config.baseUrl}/rooms/${config.listingId}?check_in=${checkIn}&check_out=${checkOut}&adults=${guestsNum}`;
    } else if (platform === 'booking') {
      return `${config.url}?checkin=${checkIn}&checkout=${checkOut}&group_adults=${guestsNum}&group_children=0&no_rooms=1`;
    } else if (platform === 'agoda') {
      return `${config.url}?checkIn=${checkIn}&los=${nights}&adults=${guestsNum}&rooms=1&ds=${config.dsParam}`;
    }
  }

  /**
   * Validate email or WhatsApp number
   * @param {string} contact - Email or phone number
   * @returns {Object} Validation result with valid flag and message
   */
  function validateEmailOrWhatsApp(contact) {
    if (!contact || contact.trim() === '') {
      return { valid: false, message: 'Please enter your email or WhatsApp number' };
    }

    const trimmed = contact.trim();

    // Check if it's an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(trimmed)) {
      return { valid: true, message: '' };
    }

    // Check if it's a phone number (WhatsApp)
    // Allow formats: +1234567890, 1234567890, +44 7700 900000, etc.
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
    if (phoneRegex.test(trimmed.replace(/\s/g, ''))) {
      return { valid: true, message: '' };
    }

    return { valid: false, message: 'Please enter a valid email or WhatsApp number (e.g., you@email.com or +44 7700 900000)' };
  }

  /**
   * Format date for display
   * @param {string} dateStr - Date string
   * @returns {string} Formatted date
   */
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // =============================================================================
  // BOOKING UI FUNCTIONS
  // =============================================================================

  /**
   * Update price line based on dates and guests
   * @param {string} checkIn - Check-in date
   * @param {string} checkOut - Check-out date
   * @param {string|number} guests - Number of guests
   * @param {string} elementId - Element ID to update
   */
  function updatePriceLine(checkIn, checkOut, guests, elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const pricing = getPriceForGuests(guests);

    if (!checkIn || !checkOut) {
      // No dates selected
      if (pricing.isPromo) {
        element.innerHTML = `From USD ${pricing.promo}/night · ${BOOKING_CONFIG.promo.offerName}`;
      } else {
        element.innerHTML = `From USD ${pricing.promo}/night`;
      }
      return;
    }

    // Dates selected - calculate total
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      element.innerHTML = `From USD ${pricing.promo}/night`;
      return;
    }

    const calc = calculateTotal(nights, pricing.promo);
    const normalTotal = nights * pricing.normal;
    const savings = normalTotal - calc.total;

    let html = `${nights} night${nights > 1 ? 's' : ''} · USD ${calc.total}`;

    if (pricing.isPromo) {
      html += ` <span class="price-crossed">USD ${normalTotal}</span>`;
      if (calc.freeNights > 0) {
        html += ` · ${calc.freeNights} night${calc.freeNights > 1 ? 's' : ''} free`;
      }
      html += ` <span class="price-save">save USD ${savings}</span>`;
    }

    element.innerHTML = html;
  }

  /**
   * Update residence rates text based on promo
   */
  function updateResidenceRates() {
    const element = document.getElementById('residenceRatesText');
    if (!element) return;

    if (isPromoActive()) {
      element.textContent = '1–2 guests USD 150 · 3–4 guests USD 165 · 5–6 guests USD 190 per night';
    } else {
      element.textContent = '1–2 guests USD 200 · 3–4 guests USD 225 · 5–6 guests USD 250 per night';
    }
  }

  /**
   * Initialize OTA buttons for a specific prefix (qb or mb)
   * @param {string} prefix - Button prefix ('qb' for desktop, 'mb' for mobile)
   */
  function initOTAButtons(prefix) {
    const checkInId = prefix === 'qb' ? 'qbIn' : 'mbCheckIn';
    const checkOutId = prefix === 'qb' ? 'qbOut' : 'mbCheckOut';
    const guestsId = prefix === 'qb' ? 'qbGuests' : 'mbGuests';

    ['airbnb', 'booking', 'agoda'].forEach(platform => {
      const btn = document.getElementById(`${prefix}${platform.charAt(0).toUpperCase() + platform.slice(1)}Btn`);
      if (!btn) return;

      btn.addEventListener('click', function() {
        const checkIn = document.getElementById(checkInId).value;
        const checkOut = document.getElementById(checkOutId).value;
        const guests = document.getElementById(guestsId).value;

        // Calculate nights for tracking
        let nights = 0;
        if (checkIn && checkOut) {
          const checkInDate = new Date(checkIn);
          const checkOutDate = new Date(checkOut);
          nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        }

        // Track OTA click
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'ota_click',
          platform: platform,
          nights: nights,
          guests: parseInt(guests) || 0
        });

        // Open OTA with dates
        const url = buildOTAUrl(platform, checkIn, checkOut, guests);
        window.open(url, '_blank');
      });
    });
  }

  // =============================================================================
  // ENQUIRY MODAL FUNCTIONS
  // =============================================================================

  /**
   * Open enquiry modal with booking details
   * @param {string} prefix - Form prefix ('qb' for desktop, 'mb' for mobile)
   */
  function openEnquiryModal(prefix) {
    const modal = document.getElementById('enquiryModal');
    const summary = document.getElementById('enquiryDatesSummary');

    const checkInId = prefix === 'qb' ? 'qbIn' : 'mbCheckIn';
    const checkOutId = prefix === 'qb' ? 'qbOut' : 'mbCheckOut';
    const guestsId = prefix === 'qb' ? 'qbGuests' : 'mbGuests';

    const checkIn = document.getElementById(checkInId).value;
    const checkOut = document.getElementById(checkOutId).value;
    const guests = document.getElementById(guestsId).value;

    // Set summary
    if (checkIn && checkOut && guests) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const pricing = getPriceForGuests(guests);
      const calc = calculateTotal(nights, pricing.promo);

      let summaryHTML = `<strong>${guests} guest${guests > 1 ? 's' : ''}</strong> · ${nights} night${nights > 1 ? 's' : ''}<br>`;
      summaryHTML += `Check-in: ${formatDate(checkIn)} · Check-out: ${formatDate(checkOut)}<br>`;
      summaryHTML += `<strong>Total: USD ${calc.total}</strong>`;

      if (pricing.isPromo && calc.freeNights > 0) {
        summaryHTML += ` (${calc.freeNights} night${calc.freeNights > 1 ? 's' : ''} free)`;
      }

      summary.innerHTML = summaryHTML;
    } else {
      summary.innerHTML = '<strong>General Enquiry</strong>';
    }

    // Store data for submission
    modal.dataset.checkIn = checkIn;
    modal.dataset.checkOut = checkOut;
    modal.dataset.guests = guests;

    modal.style.display = 'block';
  }

  /**
   * Handle enquiry form submission
   * @param {Event} e - Submit event
   */
  async function handleEnquirySubmit(e) {
    e.preventDefault();

    const modal = document.getElementById('enquiryModal');
    const submitBtn = document.getElementById('enquirySubmitBtn');
    const contactError = document.getElementById('enquiryContactError');

    const name = document.getElementById('enquiryName').value;
    const contact = document.getElementById('enquiryContact').value;
    const country = document.getElementById('enquiryCountry').value;
    const website = document.getElementById('enquiryWebsite').value;

    const checkIn = modal.dataset.checkIn;
    const checkOut = modal.dataset.checkOut;
    const guests = modal.dataset.guests || '2';

    // Validate contact
    const validation = validateEmailOrWhatsApp(contact);
    if (!validation.valid) {
      contactError.textContent = validation.message;
      contactError.style.display = 'block';
      return;
    }
    contactError.style.display = 'none';

    // Calculate pricing details
    let nights = 0;
    let pricePerNight = 0;
    let freeNights = 0;
    let total = 0;

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

      const pricing = getPriceForGuests(guests);
      pricePerNight = pricing.promo;
      const calc = calculateTotal(nights, pricePerNight);
      freeNights = calc.freeNights;
      total = calc.total;
    }

    // Prepare email data
    const emailData = {
      name: name,
      contact: contact,
      country: country,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      nights: nights,
      pricePerNight: pricePerNight,
      freeNights: freeNights,
      estimatedTotal: total,
      offerName: isPromoActive() ? BOOKING_CONFIG.promo.offerName : '',
      formType: 'Direct Enquiry Modal',
      website: website
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';

    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      // Track submission
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'availability_form_submit',
        form_type: 'enquiry_modal',
        nights: nights,
        total_usd: total,
        eventCallback: function() {
          window.location.href = '/thank-you.html';
        },
        eventTimeout: 300
      });

      setTimeout(() => {
        window.location.href = '/thank-you.html';
      }, 500);

    } catch (err) {
      console.error('Error submitting enquiry:', err);
      window.location.href = '/thank-you.html';
    }
  }

  /**
   * Initialize enquiry modal
   */
  function initEnquiryModal() {
    const modal = document.getElementById('enquiryModal');
    const closeBtn = document.getElementById('enquiryModalClose');
    const enquiryForm = document.getElementById('enquiryForm');

    // Desktop enquire link
    const qbEnquireLink = document.getElementById('qbEnquireLink');
    if (qbEnquireLink) {
      qbEnquireLink.addEventListener('click', function(e) {
        e.preventDefault();
        openEnquiryModal('qb');
      });
    }

    // Mobile enquire link
    const mbEnquireLink = document.getElementById('mbEnquireLink');
    if (mbEnquireLink) {
      mbEnquireLink.addEventListener('click', function(e) {
        e.preventDefault();
        openEnquiryModal('mb');
      });
    }

    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
      });
    }

    // Close on outside click
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Handle form submission
    if (enquiryForm) {
      enquiryForm.addEventListener('submit', handleEnquirySubmit);
    }
  }

  // =============================================================================
  // CHECK AVAILABILITY BUTTON HANDLERS
  // =============================================================================

  /**
   * Initialize check availability buttons
   */
  function initCheckAvailabilityButtons() {
    // Desktop CHECK AVAILABILITY button - scroll to top and focus check-in field
    const desktopCheckAvailability = document.getElementById('desktopCheckAvailability');
    if (desktopCheckAvailability) {
      desktopCheckAvailability.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => {
          const checkInField = document.getElementById('qbIn');
          if (checkInField) {
            checkInField.focus();
          }
        }, 500);
      });
    }

    // Mobile CHECK AVAILABILITY button - scroll to mobile booking section
    const mobileCheckAvailability = document.getElementById('mobileCheckAvailability');
    if (mobileCheckAvailability) {
      mobileCheckAvailability.addEventListener('click', function(e) {
        e.preventDefault();
        const mobileBooking = document.getElementById('mobileBooking');
        if (mobileBooking) {
          mobileBooking.style.display = 'block';
          setTimeout(() => {
            const sectionTop = mobileBooking.getBoundingClientRect().top + window.pageYOffset;
            const scrollPosition = sectionTop - 76;
            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth'
            });
          }, 100);
        }
      });
    }
  }

  // =============================================================================
  // RATES CHECK DATES LINK HANDLER
  // =============================================================================

  /**
   * Initialize rates check dates link
   */
  function initRatesCheckDates() {
    // Rates section "CHECK DATES" link - behaves like desktop button
    const ratesCheckDates = document.getElementById('ratesCheckDates');
    if (ratesCheckDates) {
      ratesCheckDates.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => {
          const checkInField = document.getElementById('qbIn');
          if (checkInField) {
            checkInField.focus();
          }
        }, 500);
      });
    }
  }

  // =============================================================================
  // WHATSAPP LINK HANDLERS
  // =============================================================================

  /**
   * Initialize WhatsApp link tracking
   */
  function initWhatsAppTracking() {
    // Desktop WhatsApp link
    const qbWhatsAppLink = document.getElementById('qbWhatsAppLink');
    if (qbWhatsAppLink) {
      qbWhatsAppLink.addEventListener('click', function() {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
          event: 'whatsapp_click',
          link_location: 'desktop_booking'
        });
      });
    }

    // Mobile WhatsApp link
    const mbWhatsAppLink = document.getElementById('mbWhatsAppLink');
    if (mbWhatsAppLink) {
      mbWhatsAppLink.addEventListener('click', function() {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
          event: 'whatsapp_click',
          link_location: 'mobile_booking'
        });
      });
    }
  }

  // =============================================================================
  // DYNAMIC HERO POSITIONING
  // =============================================================================

  /**
   * Position hero block dynamically on desktop
   */
  function positionHeroBlock() {
    if (window.innerWidth <= 900) return;

    const heroBottom = document.querySelector('.hero-bottom');
    const header = document.getElementById('header');

    if (!heroBottom) return;

    // Measure full height (all elements are now always visible)
    const heroHeight = heroBottom.offsetHeight;

    // Calculate position: 100vh - height - 40px bottom margin
    const headerHeight = header ? header.offsetHeight : 0;
    const minTop = headerHeight + 40;
    const idealTop = window.innerHeight - heroHeight - 40;
    const finalTop = Math.max(minTop, idealTop);

    heroBottom.style.top = finalTop + 'px';
    heroBottom.style.transform = 'translateX(-50%)';
  }

  /**
   * Initialize dynamic hero positioning
   */
  function initDynamicHeroPositioning() {
    // Position on load and resize (desktop only)
    if (window.innerWidth > 900) {
      // Wait for fonts and images to load
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', positionHeroBlock);
      } else {
        positionHeroBlock();
      }

      window.addEventListener('load', positionHeroBlock);
      window.addEventListener('resize', positionHeroBlock);
    }
  }

  // =============================================================================
  // MAIN INITIALIZATION FUNCTION
  // =============================================================================

  /**
   * Initialize all booking UI functionality
   */
  function initBookingUI() {
    // Desktop booking UI
    const qbIn = document.getElementById('qbIn');
    const qbOut = document.getElementById('qbOut');
    const qbGuests = document.getElementById('qbGuests');

    if (qbIn && qbOut && qbGuests) {
      const updateDesktop = () => updatePriceLine(qbIn.value, qbOut.value, qbGuests.value, 'qbPriceLine');
      qbIn.addEventListener('change', updateDesktop);
      qbOut.addEventListener('change', updateDesktop);
      qbGuests.addEventListener('change', updateDesktop);
      updateDesktop(); // Initial update
    }

    // Mobile booking UI
    const mbIn = document.getElementById('mbCheckIn');
    const mbOut = document.getElementById('mbCheckOut');
    const mbGuests = document.getElementById('mbGuests');

    if (mbIn && mbOut && mbGuests) {
      const updateMobile = () => updatePriceLine(mbIn.value, mbOut.value, mbGuests.value, 'mbPriceLine');
      mbIn.addEventListener('change', updateMobile);
      mbOut.addEventListener('change', updateMobile);
      mbGuests.addEventListener('change', updateMobile);
      updateMobile(); // Initial update
    }

    // Initialize OTA buttons
    initOTAButtons('qb');
    initOTAButtons('mb');

    // Initialize modal
    initEnquiryModal();

    // Update residence rates
    updateResidenceRates();

    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    if (qbIn) qbIn.setAttribute('min', today);
    if (qbOut) qbOut.setAttribute('min', today);
    if (mbIn) mbIn.setAttribute('min', today);
    if (mbOut) mbOut.setAttribute('min', today);

    // Initialize check availability buttons
    initCheckAvailabilityButtons();

    // Initialize rates check dates link
    initRatesCheckDates();

    // Initialize WhatsApp tracking
    initWhatsAppTracking();

    // Initialize dynamic hero positioning
    initDynamicHeroPositioning();
  }

  // =============================================================================
  // AUTO-INITIALIZATION
  // =============================================================================

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBookingUI);
  } else {
    initBookingUI();
  }

  // Expose functions for external use if needed
  window.TENTWO_BOOKING = {
    isPromoActive: isPromoActive,
    getPriceForGuests: getPriceForGuests,
    calculateTotal: calculateTotal,
    buildOTAUrl: buildOTAUrl
  };

})();
