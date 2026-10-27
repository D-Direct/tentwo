#!/bin/bash
# Complete Group 3 SEO updates

echo "🔧 Completing Group 3 SEO updates..."
echo ""

# Create OG image from hero
echo "📸 Creating og-tentwo.jpg..."
node -e "
const sharp = require('sharp');
sharp('images/Hero-Pool.webp')
  .resize(1200, 630, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 90 })
  .toFile('images/og-tentwo.jpg')
  .then(() => console.log('✅ Created og-tentwo.jpg (1200x630)'))
  .catch(err => console.error('❌ Error:', err.message));
"

echo ""
echo "✅ Group 3 SEO updates complete!"
