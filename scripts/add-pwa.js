const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Copy service worker with git commit hash in cache name
if (fs.existsSync(swSource)) {
  let swContent = fs.readFileSync(swSource, 'utf8');

  // Get git commit hash (short version)
  try {
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    // Replace CACHE_NAME with version including commit hash
    swContent = swContent.replace(
      /const CACHE_NAME = '[^']+'/,
      `const CACHE_NAME = 'casino-training-${commitHash}'`
    );
    console.log(`✅ Copied sw.js to dist/ (cache: casino-training-${commitHash})`);
  } catch (error) {
    // If git command fails, just copy as-is
    console.log('⚠️ Could not get git hash, using default cache name');
  }

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

// Update index.html to include manifest link and fix scrolling
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Add manifest link if not present
  if (!html.includes('rel="manifest"')) {
    html = html.replace('</head>', '  <link rel="manifest" href="/manifest.json" />\n</head>');
  }
  
  // Add overflow fix and root height fix for scrolling
  if (!html.includes('overflow: auto')) {
    html = html.replace('</head>', `  <style>
    html, body { height: 100%; margin: 0; padding: 0; }
    #root { min-height: 100%; height: auto; }
    body { overflow: auto !important; }
  </style>
</head>`);
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
  console.log('✅ Updated index.html with PWA support');
}

console.log('\n🚀 PWA files ready! Serve the dist/ folder to test installation.');
