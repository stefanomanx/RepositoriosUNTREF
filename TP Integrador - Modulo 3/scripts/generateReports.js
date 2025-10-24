const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function main() {
  const folder = process.argv[2] || 'web';
  const reportsDir = path.join(__dirname, '..', 'reports', folder);
  const mochHtml = path.join(reportsDir, 'mochawesome.html');
  const outputHtml = path.join(reportsDir, 'report.html');
  const outputJson = path.join(__dirname, '..', 'reports', `${folder}_output.json`);

  if (fs.existsSync(mochHtml)) {
    // copy existing HTML to a stable name
    try {
      fs.copyFileSync(mochHtml, outputHtml);
      console.log(`Found reporter HTML ${mochHtml} -> copied to ${outputHtml}`);
      process.exit(0);
    } catch (err) {
      console.error('Failed to copy existing mochawesome.html:', err);
      process.exit(2);
    }
  }

  // If no HTML, try using marge on the merged JSON
  if (!fs.existsSync(outputJson)) {
    console.error(`Merged JSON not found: ${outputJson}. Cannot generate HTML.`);
    process.exit(1);
  }

  try {
    // quote paths to handle spaces on Windows
    const cmd = `npx marge "${outputJson}" -f report -o "${reportsDir}"`;
    // ensure output directory exists
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
    execSync(cmd, { stdio: 'inherit' });
    process.exit(0);
  } catch (err) {
    console.error('marge failed:', err && err.message ? err.message : err);
    process.exit(3);
  }
}

main();
