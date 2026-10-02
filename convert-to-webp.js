const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const inputDir = './images';
const quality = 80; // Adjust quality (1-100, recommended: 75-85)
const recursive = true; // Process subdirectories

let converted = 0;
let skipped = 0;
let errors = 0;

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`✓ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`  Size: ${(inputSize / 1024).toFixed(1)}KB → ${(outputSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    converted++;
  } catch (err) {
    console.error(`✗ Error converting ${inputPath}:`, err.message);
    errors++;
  }
}

// Function to process directory
async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && recursive) {
      await processDirectory(filePath);
    } else if (stat.isFile() && file.match(/\.(jpg|jpeg|png)$/i)) {
      const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

      // Skip if WebP already exists
      if (fs.existsSync(outputPath)) {
        console.log(`⊘ Skipped (already exists): ${path.basename(filePath)}`);
        skipped++;
        continue;
      }

      await convertToWebP(filePath, outputPath);
    }
  }
}

// Main function
async function main() {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║     TenTwo Image to WebP Batch Converter          ║');
  console.log('╚════════════════════════════════════════════════════╝\n');
  console.log(`Quality: ${quality}%`);
  console.log(`Processing: ${inputDir}`);
  console.log(`Recursive: ${recursive}\n`);

  const startTime = Date.now();

  try {
    await processDirectory(inputDir);
  } catch (err) {
    console.error('Fatal error:', err);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║                   Summary                          ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log(`✓ Converted: ${converted}`);
  console.log(`⊘ Skipped: ${skipped}`);
  console.log(`✗ Errors: ${errors}`);
  console.log(`⏱  Duration: ${duration}s\n`);

  if (converted > 0) {
    console.log('Next steps:');
    console.log('1. Test the WebP images in your browser');
    console.log('2. Update HTML to use WebP with fallbacks');
    console.log('3. Delete original JPG/PNG files if satisfied\n');
  }
}

main();
