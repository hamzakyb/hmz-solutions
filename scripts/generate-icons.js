const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateIcons() {
  try {
    const inputPath = path.join(__dirname, '../public/logo.png');
    
    // Generate favicon.ico with multiple sizes
    const icoBuffer = await sharp(inputPath)
      .resize(32, 32)
      .toBuffer();
    
    // For a proper ICO file with multiple sizes, we would need a specialized library
    // For now, we'll use the existing one we created
    
    // Generate apple touch icon (180x180 is recommended)
    await sharp(inputPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
    
    // Generate other common sizes
    await sharp(inputPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(__dirname, '../public/icon-192x192.png'));
    
    await sharp(inputPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(__dirname, '../public/icon-512x512.png'));
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();