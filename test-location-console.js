const puppeteer = require('puppeteer');

async function checkConsoleErrors() {
  console.log('🔍 Checking for console errors...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      consoleMessages.push({ type, text: msg.text() });
    }
  });

  // Collect page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  try {
    await page.goto('http://localhost:3000/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for location section
    await page.waitForSelector('.location-section', { timeout: 10000 });

    // Scroll to location
    await page.evaluate(() => {
      const locationSection = document.querySelector('.location-section');
      if (locationSection) {
        locationSection.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    console.log('📊 Test Results:');
    console.log('================');
    console.log(`Console Errors: ${consoleMessages.filter(m => m.type === 'error').length}`);
    console.log(`Console Warnings: ${consoleMessages.filter(m => m.type === 'warning').length}`);
    console.log(`Page Errors: ${pageErrors.length}`);
    console.log(`Horizontal Scroll: ${hasHorizontalScroll ? '❌ YES' : '✅ NO'}`);

    if (consoleMessages.length > 0) {
      console.log('\n📝 Console Messages:');
      consoleMessages.forEach(msg => {
        console.log(`  [${msg.type.toUpperCase()}] ${msg.text}`);
      });
    }

    if (pageErrors.length > 0) {
      console.log('\n❌ Page Errors:');
      pageErrors.forEach(err => {
        console.log(`  ${err}`);
      });
    }

    if (consoleMessages.length === 0 && pageErrors.length === 0 && !hasHorizontalScroll) {
      console.log('\n✅ All tests passed! No errors found.');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  await browser.close();
}

checkConsoleErrors().catch(console.error);
