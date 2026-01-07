const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

async function generateFavicon() {
  try {
    // Read the logo.png file
    const pngBuffer = fs.readFileSync(path.join(__dirname, '../public/logo.png'));
    
    // Convert to ICO
    const icoBuffer = await toIco([pngBuffer], {
      sizes: [16, 32, 48]
    });
    
    // Write the favicon.ico file
    fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
    
    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();