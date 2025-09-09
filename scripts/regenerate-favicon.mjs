import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pngToIco from 'png-to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicon() {
  try {
    // Convert logo.png to favicon.ico
    const buffer = await pngToIco(path.join(__dirname, '../public/logo.png'));
    fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), buffer);
    
    console.log('Favicon regenerated successfully from logo.png!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();