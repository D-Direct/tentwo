const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new'
  });

  try {
    const page = await browser.newPage();

    // Test configurations
    const configs = [
      { width: 393, height: 852, name: 'iphone-16' },
      { width: 360, height: 740, name: 'small-android' }
    ];

    for (const config of configs) {
      console.log(`\nTaking screenshots at ${config.width}×${config.height} (${config.name})...`);

      await page.setViewport({
        width: config.width,
        height: config.height,
        deviceScaleFactor: 2
      });

      await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
      });

      // Wait for hero to load
      await page.waitForSelector('.hero', { timeout: 5000 });

      // Screenshot 1: Mobile hero with CTA button
      await page.screenshot({
        path: `screenshots/mobile-hero-${config.name}.png`,
        fullPage: false
      });
      console.log(`✓ Saved: screenshots/mobile-hero-${config.name}.png`);

      // Click the CHECK AVAILABILITY button
      const ctaButton = await page.$('#mobileBookingBtn');
      if (ctaButton) {
        await ctaButton.click();

        // Wait for bottom sheet to open
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation

        // Screenshot 2: Open bottom sheet
        await page.screenshot({
          path: `screenshots/mobile-sheet-open-${config.name}.png`,
          fullPage: false
        });
        console.log(`✓ Saved: screenshots/mobile-sheet-open-${config.name}.png`);

        // Close the sheet
        const overlay = await page.$('#sheetOverlay');
        if (overlay) {
          await overlay.click();
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } else {
        console.warn(`⚠ CTA button not found at ${config.width}×${config.height}`);
      }
    }

    // Desktop screenshot for comparison (1920x1080)
    console.log(`\nTaking desktop screenshot at 1920×1080...`);
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    });

    await page.goto('http://localhost:3000/', {
      waitUntil: 'networkidle0'
    });

    await page.waitForSelector('.hero', { timeout: 5000 });

    await page.screenshot({
      path: `screenshots/desktop-hero.png`,
      fullPage: false
    });
    console.log(`✓ Saved: screenshots/desktop-hero.png`);

    console.log('\n✅ All screenshots saved to screenshots/ directory');

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

takeScreenshots();
