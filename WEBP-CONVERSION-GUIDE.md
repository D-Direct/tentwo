# WebP Image Conversion Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Conversion
```bash
npm run convert
```

This will convert all JPG, JPEG, and PNG files to WebP format in the `images/` folder and all subdirectories.

## What It Does

- ✓ Converts all `.jpg`, `.jpeg`, `.png` files to `.webp`
- ✓ Processes subdirectories recursively
- ✓ Skips files if WebP version already exists
- ✓ Shows file size savings for each conversion
- ✓ Provides summary statistics

## Configuration

Edit `convert-to-webp.js` to customize:

```javascript
const quality = 80; // Quality (1-100, default: 80)
const recursive = true; // Process subdirectories
```

### Recommended Quality Settings:
- **85-90**: High-quality photos with fine details
- **75-85**: General website images (recommended)
- **60-75**: Background images
- **50-60**: Thumbnails

## After Conversion

### 1. Test WebP Images
Open a few WebP images in your browser to verify quality.

### 2. Update HTML (Optional - for better browser support)
Use `<picture>` tags with WebP and fallback:

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
```

### 3. Delete Original Files (Once satisfied)
```bash
# Delete all original JPG/PNG files (BE CAREFUL!)
# Only do this after verifying WebP quality
find images/ -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -delete
```

## File Size Savings

WebP typically provides:
- **25-35% smaller** than JPEG (same quality)
- **25-50% smaller** than PNG (lossy)
- **40-80% smaller** than PNG (lossless)

## Troubleshooting

### Error: "Cannot find module 'sharp'"
Run: `npm install`

### Error: "sharp installation failed"
- Windows: Install Visual Studio Build Tools
- Mac: Install Xcode Command Line Tools: `xcode-select --install`
- Linux: Install build dependencies: `sudo apt-get install build-essential`

### Low quality output
Increase the `quality` value in `convert-to-webp.js`

## Browser Support

WebP is supported by:
- ✓ Chrome 23+
- ✓ Firefox 65+
- ✓ Edge 18+
- ✓ Safari 14+ (macOS Big Sur)
- ✓ Opera 12.1+

For older browsers, keep original files or use `<picture>` tags with fallbacks.
