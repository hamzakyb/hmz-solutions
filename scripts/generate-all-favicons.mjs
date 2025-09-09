import favicons from 'favicons';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.resolve(__dirname, '../public/logo.png'); // Source image(s). `string`, `buffer` or array of `string`
const configuration = {
  path: '/', // Path for overriding default icons path. `string`
  appName: 'HMZ Solutions', // Your application's name. `string`
  appShortName: 'HMZ', // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: 'Nevşehir Yazılım Şirketi - Dijital Çözümler', // Your application's description. `string`
  developerName: 'HMZ Solutions', // Your (or your developer's) name. `string`
  developerURL: 'https://hmzsolutions.com', // Your (or your developer's) URL. `string`
  dir: 'auto', // Primary text direction for name, short_name, and description
  lang: 'tr-TR', // Primary language for name and short_name
  background: '#fff', // Background colour for flattened icons. `string`
  theme_color: '#007aff', // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: 'any', // Default orientation: "any", "natural", "landscape", "landscape-primary", "landscape-secondary", "portrait", "portrait-primary", or "portrait-secondary". `string`
  scope: '/', // set of URLs that the browser considers within your app
  start_url: '/?homescreen=1', // Start URL when launching the application from a device. `string`
  version: '1.0', // Your application's version string. `string`
  logging: false, // Print logs to console? `boolean`
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }`
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }`
    appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background }`
    favicons: true, // Create regular favicons. `boolean`
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }`
    yandex: false // Create Yandex browser icon. `boolean` or `{ offset, background }`
  }
};

const dest = path.resolve(__dirname, '../public'); // Destination directory

try {
  const response = await favicons(source, configuration);
  
  // Write the files
  await Promise.all(
    response.images.map(async image => {
      await fs.writeFile(path.join(dest, image.name), image.contents);
    })
  );
  
  // Write the manifest files
  await Promise.all(
    response.files.map(async file => {
      await fs.writeFile(path.join(dest, file.name), file.contents);
    })
  );
  
  console.log('All favicon assets generated successfully!');
} catch (error) {
  console.error('Error generating favicon assets:', error);
}