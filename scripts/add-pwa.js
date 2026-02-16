const fs = require('fs');
const path = require('path');

// Paths
const distPath = path.join(__dirname, '..', 'dist');
const manifestSource = path.join(__dirname, '..', 'web', 'manifest.json');
const manifestDest = path.join(distPath, 'manifest.json');
const indexPath = path.join(distPath, 'index.html');

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
  
  fs.writeFileSync(indexPath, html);
  console.log('✅ Updated index.html with PWA support');
}

console.log('\n🚀 PWA files ready! Serve the dist/ folder to test installation.');
