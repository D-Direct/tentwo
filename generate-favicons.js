const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  console.log('🎨 Generating favicon files from TENTWO-icon.webp...\n');

  const input = path.join(__dirname, 'images/TENTWO-icon.webp');

  try {
    // Generate favicon.ico (32x32)
    await sharp(input)
      .resize(32, 32)
      .toFile(path.join(__dirname, 'favicon.ico'));
    console.log('✅ Generated: favicon.ico (32x32)');

    // Generate favicon-32.png
    await sharp(input)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'images/favicon-32.png'));
    console.log('✅ Generated: images/favicon-32.png (32x32)');

    // Generate apple-touch-icon.png (180x180)
    await sharp(input)
      .resize(180, 180)
      .png()
      .toFile(path.join(__dirname, 'images/apple-touch-icon.png'));
    console.log('✅ Generated: images/apple-touch-icon.png (180x180)');

    console.log('\n✨ Favicon generation complete!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
  }
}

generateFavicons();
