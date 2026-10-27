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
   * All pricing, OTA URLs, and booking settings in one place
   */
  const BOOKING_CONFIG = {
    // Fixed nightly rates (no promo)
    pricing: {
      '1-2': 150,  // 1-2 guests USD per night
      '3-4': 165,  // 3-4 guests USD per night
      '5-6': 190   // 5-6 guests USD per night
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
   * Get price per night for guest count
   * @param {string|number} guests - Number of guests
   * @returns {number} Price per night in USD
   */
  function getPriceForGuests(guests) {
    const guestNum = parseInt(guests);
    let tier;
    if (guestNum <= 2) tier = '1-2';
    else if (guestNum <= 4) tier = '3-4';
    else tier = '5-6';

    return BOOKING_CONFIG.pricing[tier];
  }

  /**
   * Calculate nights between two dates
   * @param {string} checkIn - Check-in date
   * @param {string} checkOut - Check-out date
   * @returns {number} Number of nights
   */
  function calculateNights(checkIn, checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  }

  /**
   * Calculate total pricing for a stay
   * @param {number} nights - Number of nights
   * @param {number} guests - Number of guests
   * @returns {Object} Pricing details
   */
  function calculatePricing(nights, guests) {
    const pricePerNight = getPriceForGuests(guests);
    const total = nights * pricePerNight;
    return {
      pricePerNight: pricePerNight,
      nights: nights,
      estimatedTotal: total
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

    const pricePerNight = getPriceForGuests(guests);

    if (!checkIn || !checkOut) {
      // No dates selected - show default message
      element.innerHTML = `From USD ${pricePerNight}/night`;
      return;
    }

    // Dates selected - calculate total
    const nights = calculateNights(checkIn, checkOut);

    if (nights <= 0) {
      element.innerHTML = `From USD ${pricePerNight}/night`;
      return;
    }

    const total = nights * pricePerNight;
    element.innerHTML = `${nights} night${nights > 1 ? 's' : ''} · USD ${total}`;
  }

  /**
   * Update residence rates text
   */
  function updateResidenceRates() {
    const element = document.getElementById('residenceRatesText');
    if (!element) return;

    element.textContent = '1–2 guests USD 150 · 3–4 guests USD 165 · 5–6 guests USD 190 per night';
  }

  /**
   * Initialize OTA buttons for a specific prefix (qb or mb)
   * @param {string} prefix - Button prefix ('qb' for desktop)
   */
  function initOTAButtons(prefix) {
    const checkInId = 'qbIn';
    const checkOutId = 'qbOut';
    const guestsId = 'qbGuests';

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
   * @param {string} prefix - Form prefix ('qb' or 'mb')
   */
  function openEnquiryModal(prefix) {
    const modal = document.getElementById('enquiryModal');
    const summary = document.getElementById('enquiryDatesSummary');
    const dateFields = document.getElementById('enquiryDateFields');
    const enquiryCheckIn = document.getElementById('enquiryCheckIn');
    const enquiryCheckOut = document.getElementById('enquiryCheckOut');
    const enquiryGuests = document.getElementById('enquiryGuests');

    // Try to get dates from either quick book or mobile forms
    let checkIn, checkOut, guests;

    if (prefix === 'mb') {
      checkIn = document.getElementById('mbIn')?.value || '';
      checkOut = document.getElementById('mbOut')?.value || '';
      guests = document.getElementById('mbGuests')?.value || '2';
    } else {
      checkIn = document.getElementById('qbIn')?.value || '';
      checkOut = document.getElementById('qbOut')?.value || '';
      guests = document.getElementById('qbGuests')?.value || '2';
    }

    // Show summary if dates selected, otherwise show date input fields
    if (checkIn && checkOut) {
      // Dates exist - show summary, hide fields
      summary.style.display = 'block';
      dateFields.style.display = 'none';

      // Remove required from hidden fields to prevent validation errors
      enquiryCheckIn.removeAttribute('required');
      enquiryCheckOut.removeAttribute('required');
      enquiryGuests.removeAttribute('required');

      const nights = calculateNights(checkIn, checkOut);
      const pricePerNight = getPriceForGuests(guests);
      const total = nights * pricePerNight;

      let summaryHTML = `<strong>${guests} guest${guests > 1 ? 's' : ''}</strong> · ${nights} night${nights > 1 ? 's' : ''}<br>`;
      summaryHTML += `Check-in: ${formatDate(checkIn)} · Check-out: ${formatDate(checkOut)}<br>`;
      summaryHTML += `<strong>Total: USD $${total}</strong>`;

      summary.innerHTML = summaryHTML;

      // Store data for submission
      modal.dataset.checkIn = checkIn;
      modal.dataset.checkOut = checkOut;
      modal.dataset.guests = guests;
    } else {
      // No dates - show fields, hide summary
      summary.style.display = 'none';
      dateFields.style.display = 'flex';

      // Add required back when fields are visible
      enquiryCheckIn.setAttribute('required', '');
      enquiryCheckOut.setAttribute('required', '');
      enquiryGuests.setAttribute('required', '');

      // Set min dates
      const today = new Date().toISOString().split('T')[0];
      enquiryCheckIn.setAttribute('min', today);
      enquiryCheckOut.setAttribute('min', today);

      // Reset fields
      enquiryCheckIn.value = '';
      enquiryCheckOut.value = '';
      enquiryGuests.value = '2';

      // Clear stored data
      delete modal.dataset.checkIn;
      delete modal.dataset.checkOut;
      delete modal.dataset.guests;
    }

    // Show modal and lock scroll
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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

    // Get dates either from stored data or from modal form fields
    let checkIn = modal.dataset.checkIn;
    let checkOut = modal.dataset.checkOut;
    let guests = modal.dataset.guests || '2';

    // If no stored dates, get from modal input fields
    if (!checkIn || !checkOut) {
      const enquiryCheckIn = document.getElementById('enquiryCheckIn');
      const enquiryCheckOut = document.getElementById('enquiryCheckOut');
      const enquiryGuests = document.getElementById('enquiryGuests');

      checkIn = enquiryCheckIn?.value || '';
      checkOut = enquiryCheckOut?.value || '';
      guests = enquiryGuests?.value || '2';
    }

    // Validate dates
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

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
    let total = 0;

    if (checkIn && checkOut) {
      nights = calculateNights(checkIn, checkOut);

      if (nights < 1) {
        alert('Check-out date must be after check-in date');
        return;
      }

      pricePerNight = getPriceForGuests(guests);
      total = nights * pricePerNight;
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
      estimatedTotal: total,
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
        event: 'generate_lead',
        form: 'enquiry',
        nights: nights,
        guests: parseInt(guests),
        value: total,
        currency: 'USD',
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
   * Close enquiry modal
   */
  function closeEnquiryModal() {
    const modal = document.getElementById('enquiryModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Update price display in modal date fields
   */
  function updateEnquiryPriceDisplay() {
    const checkIn = document.getElementById('enquiryCheckIn')?.value;
    const checkOut = document.getElementById('enquiryCheckOut')?.value;
    const guests = document.getElementById('enquiryGuests')?.value || '2';
    const priceDisplay = document.getElementById('enquiryPriceDisplay');

    if (!priceDisplay) return;

    if (!checkIn || !checkOut) {
      priceDisplay.innerHTML = ''; // Hide when no dates
      return;
    }

    const nights = calculateNights(checkIn, checkOut);
    if (nights < 1) {
      priceDisplay.innerHTML = '<small style="color: #ff6b6b;">Check-out must be after check-in</small>';
      return;
    }

    const pricing = calculatePricing(nights, parseInt(guests));
    priceDisplay.innerHTML = `<small>USD $${pricing.pricePerNight}/night × ${nights} nights = <strong>$${pricing.estimatedTotal}</strong></small>`;
  }

  /**
   * Initialize enquiry modal
   */
  function initEnquiryModal() {
    const modal = document.getElementById('enquiryModal');
    const closeBtn = document.getElementById('enquiryModalClose');
    const overlay = document.getElementById('enquiryModalOverlay');
    const enquiryForm = document.getElementById('enquiryForm');

    // Enquire links (desktop and mobile)
    const qbEnquireLink = document.getElementById('qbEnquireLink');
    const qbEnquireLink2 = document.getElementById('qbEnquireLink2');
    const mbEnquireLink = document.getElementById('mbEnquireLink');

    if (qbEnquireLink) {
      qbEnquireLink.addEventListener('click', function(e) {
        e.preventDefault();
        openEnquiryModal('qb');
      });
    }

    if (qbEnquireLink2) {
      qbEnquireLink2.addEventListener('click', function(e) {
        e.preventDefault();
        openEnquiryModal('qb');
      });
    }

    if (mbEnquireLink) {
      mbEnquireLink.addEventListener('click', function(e) {
        e.preventDefault();
        openEnquiryModal('mb');
      });
    }

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeEnquiryModal);
    }

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeEnquiryModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeEnquiryModal();
      }
    });

    // Live price updates when dates change in modal
    const enquiryCheckIn = document.getElementById('enquiryCheckIn');
    const enquiryCheckOut = document.getElementById('enquiryCheckOut');
    const enquiryGuests = document.getElementById('enquiryGuests');

    if (enquiryCheckIn) {
      enquiryCheckIn.addEventListener('change', updateEnquiryPriceDisplay);
    }
    if (enquiryCheckOut) {
      enquiryCheckOut.addEventListener('change', updateEnquiryPriceDisplay);
    }
    if (enquiryGuests) {
      enquiryGuests.addEventListener('change', updateEnquiryPriceDisplay);
    }

    // Handle form submission
    if (enquiryForm) {
      enquiryForm.addEventListener('submit', handleEnquirySubmit);
    }
  }

  // =============================================================================
  // MOBILE BOTTOM SHEET HANDLERS
  // =============================================================================

  /**
   * Initialize mobile bottom sheet
   */
  function initMobileBottomSheet() {
    const mobileBookingBtn = document.getElementById('mobileBookingBtn');
    const bottomSheet = document.getElementById('mobileBottomSheet');
    const sheetOverlay = document.getElementById('sheetOverlay');

    // Mobile form elements
    const mbIn = document.getElementById('mbIn');
    const mbOut = document.getElementById('mbOut');
    const mbGuests = document.getElementById('mbGuests');
    const mbPriceMessage = document.getElementById('mbPriceMessage');

    // Mobile OTA buttons
    const mbAirbnbBtn = document.getElementById('mbAirbnbBtn');
    const mbBookingBtn = document.getElementById('mbBookingBtn');
    const mbAgodaBtn = document.getElementById('mbAgodaBtn');
    const mbEnquireLink = document.getElementById('mbEnquireLink');

    // Open sheet
    if (mobileBookingBtn && bottomSheet) {
      mobileBookingBtn.addEventListener('click', function() {
        // Sync values from quick book form if they exist
        const qbIn = document.getElementById('qbIn');
        const qbOut = document.getElementById('qbOut');
        const qbGuests = document.getElementById('qbGuests');

        if (qbIn && qbIn.value) mbIn.value = qbIn.value;
        if (qbOut && qbOut.value) mbOut.value = qbOut.value;
        if (qbGuests && qbGuests.value) mbGuests.value = qbGuests.value;

        // Update price message
        updateMobilePriceMessage();

        // Open sheet
        bottomSheet.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    // Close sheet on overlay click
    if (sheetOverlay && bottomSheet) {
      sheetOverlay.addEventListener('click', function() {
        bottomSheet.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Update price message when dates/guests change
    if (mbIn) {
      mbIn.addEventListener('change', updateMobilePriceMessage);
    }
    if (mbOut) {
      mbOut.addEventListener('change', updateMobilePriceMessage);
    }
    if (mbGuests) {
      mbGuests.addEventListener('change', updateMobilePriceMessage);
    }

    // Mobile OTA button handlers
    if (mbAirbnbBtn) {
      mbAirbnbBtn.addEventListener('click', function() {
        const checkIn = mbIn?.value;
        const checkOut = mbOut?.value;
        const guests = mbGuests?.value || '2';

        const url = buildOTAUrl('airbnb', checkIn, checkOut, guests);
        window.open(url, '_blank');
      });
    }

    if (mbBookingBtn) {
      mbBookingBtn.addEventListener('click', function() {
        const checkIn = mbIn?.value;
        const checkOut = mbOut?.value;
        const guests = mbGuests?.value || '2';

        const url = buildOTAUrl('booking', checkIn, checkOut, guests);
        window.open(url, '_blank');
      });
    }

    if (mbAgodaBtn) {
      mbAgodaBtn.addEventListener('click', function() {
        const checkIn = mbIn?.value;
        const checkOut = mbOut?.value;
        const guests = mbGuests?.value || '2';

        const url = buildOTAUrl('agoda', checkIn, checkOut, guests);
        window.open(url, '_blank');
      });
    }

    // Mobile enquire link
    if (mbEnquireLink) {
      mbEnquireLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Close sheet first
        if (bottomSheet) {
          bottomSheet.classList.remove('active');
          document.body.style.overflow = '';
        }
        // Open enquiry modal
        openEnquiryModal('mb');
      });
    }
  }

  /**
   * Update mobile bottom sheet price message
   */
  function updateMobilePriceMessage() {
    const mbIn = document.getElementById('mbIn');
    const mbOut = document.getElementById('mbOut');
    const mbGuests = document.getElementById('mbGuests');
    const mbPriceMessage = document.getElementById('mbPriceMessage');

    if (!mbPriceMessage) return;

    const checkIn = mbIn?.value;
    const checkOut = mbOut?.value;
    const guests = parseInt(mbGuests?.value) || 2;

    if (!checkIn || !checkOut) {
      mbPriceMessage.innerHTML = '<small>Select dates to see pricing</small>';
      return;
    }

    const nights = calculateNights(checkIn, checkOut);
    if (nights < 1) {
      mbPriceMessage.innerHTML = '<small style="color: #c9302c;">Check-out must be after check-in</small>';
      return;
    }

    const pricing = calculatePricing(nights, guests);
    mbPriceMessage.innerHTML = `<small>USD $${pricing.pricePerNight}/night × ${nights} nights = <strong>$${pricing.estimatedTotal}</strong></small>`;
  }

  // =============================================================================
  // CHECK AVAILABILITY BUTTON HANDLERS
  // =============================================================================

  /**
   * Initialize check availability buttons
   */
  function initCheckAvailabilityButtons() {
    // Desktop and Mobile CHECK AVAILABILITY buttons - scroll to top and focus check-in field
    const desktopCheckAvailability = document.getElementById('desktopCheckAvailability');
    const mobileCheckAvailability = document.getElementById('mobileCheckAvailability');

    [desktopCheckAvailability, mobileCheckAvailability].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', function(e) {
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
          }, 300);
        });
      }
    });
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
   * Build WhatsApp URL with booking details
   */
  function buildWhatsAppUrl(checkIn, checkOut, guests) {
    const phoneNumber = '94777889880';
    let message = "Hi! I would like to book TENTWO Private Residence:";

    if (checkIn && checkOut && guests) {
      const nights = calculateNights(checkIn, checkOut);
      const pricing = calculatePricing(nights, parseInt(guests));
      const checkInFormatted = formatDate(checkIn);
      const checkOutFormatted = formatDate(checkOut);

      message = `Hi! I would like to book TENTWO Private Residence:\n\n` +
                `Check-in: ${checkInFormatted}\n` +
                `Check-out: ${checkOutFormatted}\n` +
                `Guests: ${guests}\n` +
                `Nights: ${nights}\n` +
                `Estimated Total: USD ${pricing.estimatedTotal}`;
    }

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Update WhatsApp link with booking details
   */
  function updateWhatsAppLink(linkId, checkIn, checkOut, guests) {
    const link = document.getElementById(linkId);
    if (link) {
      link.href = buildWhatsAppUrl(checkIn, checkOut, guests);
    }
  }

  /**
   * Initialize WhatsApp link tracking and dynamic URLs
   */
  function initWhatsAppTracking() {
    const qbWhatsAppLink = document.getElementById('qbWhatsAppLink');
    const qbWhatsAppLink2 = document.getElementById('qbWhatsAppLink2');
    const mbWhatsAppLink = document.getElementById('mbWhatsAppLink');
    const mobileHeroWhatsAppLink = document.getElementById('mobileHeroWhatsAppLink');

    // Update WhatsApp links when dates/guests change
    const qbIn = document.getElementById('qbIn');
    const qbOut = document.getElementById('qbOut');
    const qbGuests = document.getElementById('qbGuests');

    function updateDesktopWhatsAppLinks() {
      const checkIn = qbIn?.value;
      const checkOut = qbOut?.value;
      const guests = qbGuests?.value || '2';

      updateWhatsAppLink('qbWhatsAppLink', checkIn, checkOut, guests);
      updateWhatsAppLink('qbWhatsAppLink2', checkIn, checkOut, guests);
      updateWhatsAppLink('mobileHeroWhatsAppLink', checkIn, checkOut, guests);
      updateWhatsAppLink('floatingWhatsAppLink', checkIn, checkOut, guests);
    }

    if (qbIn) qbIn.addEventListener('change', updateDesktopWhatsAppLinks);
    if (qbOut) qbOut.addEventListener('change', updateDesktopWhatsAppLinks);
    if (qbGuests) qbGuests.addEventListener('change', updateDesktopWhatsAppLinks);

    // Mobile bottom sheet
    const mbIn = document.getElementById('mbIn');
    const mbOut = document.getElementById('mbOut');
    const mbGuests = document.getElementById('mbGuests');

    function updateMobileWhatsAppLink() {
      const checkIn = mbIn?.value;
      const checkOut = mbOut?.value;
      const guests = mbGuests?.value || '2';

      updateWhatsAppLink('mbWhatsAppLink', checkIn, checkOut, guests);
      updateWhatsAppLink('mobileHeroWhatsAppLink', checkIn, checkOut, guests);
      updateWhatsAppLink('floatingWhatsAppLink', checkIn, checkOut, guests);
    }

    if (mbIn) mbIn.addEventListener('change', updateMobileWhatsAppLink);
    if (mbOut) mbOut.addEventListener('change', updateMobileWhatsAppLink);
    if (mbGuests) mbGuests.addEventListener('change', updateMobileWhatsAppLink);

    // Analytics tracking
    if (qbWhatsAppLink) {
      qbWhatsAppLink.addEventListener('click', function() {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
          event: 'whatsapp_click',
          link_location: 'hero_booking'
        });
      });
    }

    if (qbWhatsAppLink2) {
      qbWhatsAppLink2.addEventListener('click', function() {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
          event: 'whatsapp_click',
          link_location: 'hero_booking'
        });
      });
    }

    // Mobile hero WhatsApp analytics
    if (mobileHeroWhatsAppLink) {
      mobileHeroWhatsAppLink.addEventListener('click', function() {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
          event: 'whatsapp_click',
          link_location: 'mobile_hero'
        });
      });
    }
  }

  // =============================================================================
  // MAIN INITIALIZATION FUNCTION
  // =============================================================================

  /**
   * Make date inputs open picker on any click
   */
  function initDateInputs() {
    // Get all date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');

    dateInputs.forEach(input => {
      // Open date picker when clicking anywhere on the input
      input.addEventListener('click', function(e) {
        try {
          this.showPicker();
        } catch (err) {
          // Fallback for browsers that don't support showPicker()
          this.focus();
        }
      });

      // Also trigger on label click
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) {
        label.addEventListener('click', function(e) {
          e.preventDefault();
          try {
            input.showPicker();
          } catch (err) {
            input.focus();
          }
        });
      }
    });
  }

  /**
   * Setup date validation for check-in and check-out pairs
   * @param {string} checkInId - Check-in input ID
   * @param {string} checkOutId - Check-out input ID
   */
  function setupDateValidation(checkInId, checkOutId) {
    const checkInInput = document.getElementById(checkInId);
    const checkOutInput = document.getElementById(checkOutId);

    if (!checkInInput || !checkOutInput) return;

    // When check-in changes, update check-out min date
    checkInInput.addEventListener('change', function() {
      const checkInValue = this.value;
      if (checkInValue) {
        // Set check-out min to check-in + 1 day
        const checkInDate = new Date(checkInValue);
        checkInDate.setDate(checkInDate.getDate() + 1);
        const minCheckOut = checkInDate.toISOString().split('T')[0];
        checkOutInput.setAttribute('min', minCheckOut);

        // If current check-out is now invalid, clear it
        const checkOutValue = checkOutInput.value;
        if (checkOutValue && checkOutValue <= checkInValue) {
          checkOutInput.value = '';
        }
      }
    });
  }

  /**
   * Initialize all booking UI functionality
   */
  function initBookingUI() {
    // Initialize date inputs to open picker on click
    initDateInputs();

    // Booking UI
    const qbIn = document.getElementById('qbIn');
    const qbOut = document.getElementById('qbOut');
    const qbGuests = document.getElementById('qbGuests');

    if (qbIn && qbOut && qbGuests) {
      const updatePrice = () => updatePriceLine(qbIn.value, qbOut.value, qbGuests.value, 'priceMessage');
      qbIn.addEventListener('change', updatePrice);
      qbOut.addEventListener('change', updatePrice);
      qbGuests.addEventListener('change', updatePrice);
      updatePrice(); // Initial update
    }

    // Initialize OTA buttons
    initOTAButtons('qb');

    // Initialize modal
    initEnquiryModal();

    // Initialize mobile bottom sheet
    initMobileBottomSheet();

    // Update residence rates
    updateResidenceRates();

    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    if (qbIn) qbIn.setAttribute('min', today);
    if (qbOut) qbOut.setAttribute('min', today);

    // Setup date validation for all booking forms
    setupDateValidation('qbIn', 'qbOut'); // Desktop quick book
    setupDateValidation('mbIn', 'mbOut'); // Mobile bottom sheet
    setupDateValidation('enquiryCheckIn', 'enquiryCheckOut'); // Enquiry modal

    // Initialize check availability buttons
    initCheckAvailabilityButtons();

    // Initialize rates check dates link
    initRatesCheckDates();

    // Initialize WhatsApp tracking
    initWhatsAppTracking();
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
    getPriceForGuests: getPriceForGuests,
    calculateNights: calculateNights,
    calculatePricing: calculatePricing,
    buildOTAUrl: buildOTAUrl
  };

})();
