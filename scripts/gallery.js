const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '..', 'assets', 'gallery');
const outputFile = path.join(galleryDir, 'gallery.json');

const extensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

const files = fs.readdirSync(galleryDir)
    .filter((f) => extensions.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
console.log(`gallery.json: ${files.length} images found.`);
