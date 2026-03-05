const fs = require('fs');
const path = require('path');

// Paths
const distPath = path.join(__dirname, '..', 'dist');
const manifestSource = path.join(__dirname, '..', 'web', 'manifest.json');
const manifestDest = path.join(distPath, 'manifest.json');
const indexPath = path.join(distPath, 'index.html');
const swSource = path.join(__dirname, '..', 'web', 'sw.js');
const swDest = path.join(distPath, 'sw.js');
const assetsSource = path.join(__dirname, '..', 'assets');
const assetsDest = path.join(distPath, 'assets');

// Helper to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);
    if (stat.isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

// Copy manifest.json
if (fs.existsSync(manifestSource)) {
  fs.copyFileSync(manifestSource, manifestDest);
  console.log('✅ Copied manifest.json to dist/');
} else {
  console.log('⚠️ manifest.json not found, creating one...');
  const manifest = {
    name: "Casino Training App",
    short_name: "CasinoTrain",
    description: "A professional casino dealer training application for roulette, PLO poker, and cash conversion exercises.",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#1a472a",
    theme_color: "#1a472a",
    icons: [
      {
        src: "/assets/adaptive-icon.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/assets/icon.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  fs.writeFileSync(manifestDest, JSON.stringify(manifest, null, 2));
  console.log('✅ Created manifest.json in dist/');
}

// Copy service worker with timestamp-based cache busting
if (fs.existsSync(swSource)) {
  let swContent = fs.readFileSync(swSource, 'utf8');

  // Use timestamp to ensure cache busts on every build
  const timestamp = Date.now();
  swContent = swContent.replace(
    /const CACHE_NAME = '[^']+'/,
    `const CACHE_NAME = 'casino-training-${timestamp}'`
  );
  console.log(`✅ Copied sw.js to dist/ (cache: casino-training-${timestamp})`);

  fs.writeFileSync(swDest, swContent);
} else {
  console.log('⚠️ sw.js not found');
}

// Copy assets folder (icons)
if (fs.existsSync(assetsSource)) {
  copyDir(assetsSource, assetsDest);
  console.log('✅ Copied assets folder to dist/');
} else {
  console.log('⚠️ assets folder not found');
}

// Update index.html to include all PWA meta tags and manifest link
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');

  // Add PWA meta tags if not present
  const pwaMetas = `    <meta name="theme-color" content="#1a472a" />
    <meta name="background-color" content="#1a472a" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Casino Training" />
    <meta name="application-name" content="Casino Training App" />
    <meta name="description" content="A professional casino dealer training application for roulette, PLO poker, and cash conversion exercises." />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-TileColor" content="#1a472a" />
    <meta name="msapplication-tap-highlight" content="no" />`;

  if (!html.includes('apple-mobile-web-app-capable')) {
    // Remove any existing theme-color and description tags to avoid duplicates
    html = html.replace(/<meta name="theme-color"[^>]*>/g, '');
    html = html.replace(/<meta name="description"[^>]*>/g, '');
    // Add PWA meta tags before </head>
    html = html.replace('</head>', pwaMetas + '\n  </head>');
  }

  // Add manifest link if not present
  if (!html.includes('rel="manifest"')) {
    html = html.replace('</head>', '\n    <link rel="manifest" href="/manifest.json" />\n  </head>');
  }

  // Add apple touch icons if not present
  if (!html.includes('rel="apple-touch-icon"')) {
    html = html.replace('</head>', '\n    <link rel="apple-touch-icon" href="/assets/adaptive-icon.png" />\n    <link rel="apple-touch-icon" sizes="180x180" href="/assets/adaptive-icon.png" />\n  </head>');
  }

  // Fix viewport meta tag - ensure it has proper PWA configuration
  if (html.includes('name="viewport"')) {
    html = html.replace(
      /name="viewport"\s+content="[^"]*"/,
      'name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"'
    );
  }

  // Lock viewport completely - no scrolling, no panning in any direction
  if (!html.includes('viewport-lock')) {
    html = html.replace('</head>', `\n    <!-- viewport-lock -->
  <style>
    html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; overscroll-behavior: none; }
    body { margin: 0; padding: 0; width: 100%; height: 100%; position: fixed; top: 0; left: 0; overflow: hidden; overscroll-behavior: none; background-color: #0a1628; }
    #root { position: fixed; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden; background-color: #0a1628; }
  </style>\n  </head>`);
  }

  // Add service worker registration if not present
  if (!html.includes('serviceWorker')) {
    const swScript = `
    <!-- Service Worker Registration -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('SW registered:', registration.scope);
            })
            .catch((error) => {
              console.log('SW registration failed:', error);
            });
        });
      }
    </script>`;
    html = html.replace('</body>', swScript + '\n  </body>');
  }

  fs.writeFileSync(indexPath, html);
  console.log('✅ Updated index.html with complete PWA support');
}

console.log('\n🚀 PWA files ready! Serve the dist/ folder to test installation.');
