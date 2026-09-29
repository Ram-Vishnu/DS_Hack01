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
    
    // Fix hardcoded Recharts grid lines
    content = content.replace(/stroke="rgba\(255,255,255,0\.05\)"/g, 'stroke="var(--theme-glass-border)"');
    content = content.replace(/stroke="rgba\(255,255,255,0\.1\)"/g, 'stroke="var(--theme-glass-border)"');
    content = content.replace(/stroke="#fff"/g, 'stroke="currentColor"');
    
    // Fix hardcoded Recharts text fills
    content = content.replace(/fill="#9ca3af"/g, 'fill="var(--theme-text-muted)"');
    content = content.replace(/fill="white"/g, 'fill="var(--theme-text)"');
    content = content.replace(/fill="#fff"/g, 'fill="var(--theme-text)"');

    // Make Tooltip background adaptive
    content = content.replace(/contentStyle=\{\{([^}]+)\}\}/g, (match, p1) => {
      // Very naive replacement for tooltip contentStyle
      if (p1.includes('backgroundColor')) {
        return `contentStyle={{ backgroundColor: 'var(--theme-glass-modal)', backdropFilter: 'blur(16px)', border: '1px solid var(--theme-glass-border)', borderRadius: '12px', color: 'var(--theme-text)' }}`;
      }
      return match;
    });
    
    fs.writeFileSync(filePath, content);
  }
});
console.log("Chart replacements complete.");
