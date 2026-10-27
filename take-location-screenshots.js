const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

const viewports = [
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'desktop-1366', width: 1366, height: 768 },
  { name: 'mobile-393', width: 393, height: 852 },
  { name: 'mobile-360', width: 360, height: 740 }
];

async function takeScreenshots() {
  console.log('🖼️  Taking screenshots of location section...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const viewport of viewports) {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: viewport.width, height: viewport.height });

      console.log(`📸 ${viewport.name} (${viewport.width}×${viewport.height})`);

      // Navigate to the page
      await page.goto('http://localhost:3000/#location', {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for location section to be visible
      await page.waitForSelector('.location-section', { timeout: 10000 });

      // Scroll to location section
      await page.evaluate(() => {
        const locationSection = document.querySelector('.location-section');
        if (locationSection) {
          locationSection.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      });

      // Wait a moment for any animations
      await new Promise(resolve => setTimeout(resolve, 500));

      // Take screenshot of the location section
      const element = await page.$('.location-section');
      if (element) {
        const filename = `location-${viewport.name}.png`;
        const filepath = path.join(screenshotsDir, filename);

        await element.screenshot({
          path: filepath,
          type: 'png'
        });

        console.log(`   ✅ Saved: ${filename}`);
      }

      await page.close();

    } catch (error) {
      console.error(`   ❌ Error for ${viewport.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('\n✨ Screenshots complete! Check the screenshots/ folder.');
}

takeScreenshots().catch(console.error);
