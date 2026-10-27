const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// List of 5 largest images to compress
const imagesToCompress = [
  { input: 'images/outdoor/outdoor-12.png', output: 'images/outdoor/outdoor-12.webp' },
  { input: 'images/KANDY-1.jpg', output: 'images/KANDY-1.webp' },
  { input: 'images/Hero-Pool.png', output: 'images/Hero-Pool.webp' },
  { input: 'images/outdoor/outdoor-9.webp', output: 'images/outdoor/outdoor-9-compressed.webp' },
  { input: 'images/rooftop/rooftop-3.webp', output: 'images/rooftop/rooftop-3-compressed.webp' }
];

async function compressImages() {
  console.log('🖼️  Starting image compression...\n');

  for (const { input, output } of imagesToCompress) {
    try {
      const inputPath = path.join(__dirname, input);
      const outputPath = path.join(__dirname, output);

      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);

      // Compress and convert to WebP
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      // Get compressed file size
      const compressedStats = fs.statSync(outputPath);
      const compressedSize = (compressedStats.size / 1024 / 1024).toFixed(2);
      const savings = ((1 - compressedStats.size / originalStats.size) * 100).toFixed(1);

      console.log(`✅ ${path.basename(input)}`);
      console.log(`   Original:   ${originalSize} MB`);
      console.log(`   Compressed: ${compressedSize} MB`);
      console.log(`   Savings:    ${savings}%`);
      console.log(`   Output:     ${output}\n`);

    } catch (error) {
      console.error(`❌ Error compressing ${input}:`, error.message);
    }
  }

  console.log('✨ Image compression complete!');
}

compressImages();
