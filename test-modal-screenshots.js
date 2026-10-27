const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeModalScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new'
  });

  try {
    const page = await browser.newPage();

    // Test configurations
    const configs = [
      { width: 1920, height: 1080, name: 'desktop-1920' },
      { width: 1366, height: 768, name: 'desktop-1366' },
      { width: 393, height: 852, name: 'mobile-393' },
      { width: 360, height: 740, name: 'mobile-360' }
    ];

    for (const config of configs) {
      console.log(`\nTesting at ${config.width}×${config.height} (${config.name})...`);

      await page.setViewport({
        width: config.width,
        height: config.height,
        deviceScaleFactor: 2
      });

      await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
      });

      await page.waitForSelector('.hero', { timeout: 5000 });

      // Scenario 1: Modal WITH pre-selected dates
      console.log(`  Scenario 1: With dates (${config.name})`);

      // Fill in dates on desktop booking form
      if (config.width >= 768) {
        await page.evaluate(() => {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 7);
          const checkOut = new Date();
          checkOut.setDate(checkOut.getDate() + 11);

          document.getElementById('qbIn').value = tomorrow.toISOString().split('T')[0];
          document.getElementById('qbOut').value = checkOut.toISOString().split('T')[0];
          document.getElementById('qbGuests').value = '4';
        });

        // Click enquire link
        await page.click('#qbEnquireLink2');
      } else {
        // Mobile - open bottom sheet first
        await page.click('#mobileBookingBtn');
        await new Promise(resolve => setTimeout(resolve, 500));

        // Fill dates in mobile sheet
        await page.evaluate(() => {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 7);
          const checkOut = new Date();
          checkOut.setDate(checkOut.getDate() + 11);

          document.getElementById('mbIn').value = tomorrow.toISOString().split('T')[0];
          document.getElementById('mbOut').value = checkOut.toISOString().split('T')[0];
          document.getElementById('mbGuests').value = '4';
        });

        // Click enquire in sheet
        await page.click('#mbEnquireLink');
      }

      await new Promise(resolve => setTimeout(resolve, 600));

      await page.screenshot({
        path: `screenshots/modal-with-dates-${config.name}.png`,
        fullPage: false
      });
      console.log(`  ✓ Saved: modal-with-dates-${config.name}.png`);

      // Close modal
      await page.keyboard.press('Escape');
      await new Promise(resolve => setTimeout(resolve, 400));

      // Scenario 2: Modal WITHOUT dates
      console.log(`  Scenario 2: Without dates (${config.name})`);

      // Clear dates if desktop
      if (config.width >= 768) {
        await page.evaluate(() => {
          document.getElementById('qbIn').value = '';
          document.getElementById('qbOut').value = '';
        });

        await page.click('#qbEnquireLink2');
      } else {
        // Close sheet if open
        const sheetOpen = await page.evaluate(() => {
          return document.getElementById('mobileBottomSheet').classList.contains('active');
        });

        if (sheetOpen) {
          await page.click('#sheetOverlay');
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Open modal directly (without dates in mobile scenario is when clicking from elsewhere)
        await page.evaluate(() => {
          // Simulate opening modal without dates by clicking a link that doesn't have the bottom sheet open
          const link = document.getElementById('qbEnquireLink'); // From desktop notes
          if (link) link.click();
        });
      }

      await new Promise(resolve => setTimeout(resolve, 600));

      await page.screenshot({
        path: `screenshots/modal-without-dates-${config.name}.png`,
        fullPage: false
      });
      console.log(`  ✓ Saved: modal-without-dates-${config.name}.png`);

      // Close modal
      await page.keyboard.press('Escape');
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    console.log('\n✅ All modal screenshots saved to screenshots/ directory');

  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
}

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

takeModalScreenshots();
