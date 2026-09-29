const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace text colors
    content = content.replace(/\btext-white\b/g, 'text-content');
    content = content.replace(/\btext-gray-300\b/g, 'text-content-muted');
    content = content.replace(/\btext-gray-400\b/g, 'text-content-muted');
    content = content.replace(/\btext-gray-500\b/g, 'text-content-muted');
    
    // Replace glass backgrounds
    content = content.replace(/\bbg-white\/5\b/g, 'bg-glass');
    content = content.replace(/\bbg-white\/10\b/g, 'bg-glass-hover');
    content = content.replace(/\bbg-white\/20\b/g, 'bg-glass-hover');
    
    // Replace glass borders
    content = content.replace(/\bborder-white\/5\b/g, 'border-glass-border');
    content = content.replace(/\bborder-white\/10\b/g, 'border-glass-border');
    content = content.replace(/\bborder-white\/15\b/g, 'border-glass-border');
    content = content.replace(/\bborder-white\/20\b/g, 'border-glass-border');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log("Replacements complete.");
