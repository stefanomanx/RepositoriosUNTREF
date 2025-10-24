const fs = require('fs');
const path = require('path');

async function main() {
  const folder = process.argv[2] || 'web';
  const reportsDir = path.join(__dirname, '..', 'reports', folder);
  const output = path.join(__dirname, '..', 'reports', `${folder}_output.json`);

  if (!fs.existsSync(reportsDir)) {
    console.error(`Reports directory does not exist: ${reportsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.json')).map(f => path.join(reportsDir, f));

  if (files.length === 0) {
    console.error(`No JSON report files found in ${reportsDir}`);
    process.exit(1);
  }

  if (files.length === 1) {
    // just copy the single file to the expected output
    try {
      fs.copyFileSync(files[0], output);
      console.log(`Copied single report ${files[0]} -> ${output}`);
      process.exit(0);
    } catch (err) {
      console.error('Failed to copy report file:', err);
      process.exit(2);
    }
  }

  // multiple files: try to use mochawesome-merge programmatically; if it fails, fallback to copying the first
  try {
    const merge = require('mochawesome-merge');
    const merged = await merge.merge({ files });
    fs.writeFileSync(output, merged, 'utf8');
    console.log(`Merged ${files.length} reports -> ${output}`);
    process.exit(0);
  } catch (err) {
    console.warn('mochawesome-merge failed:', err && err.message ? err.message : err);
    console.warn('Falling back to first JSON report (copying).');
    try {
      fs.copyFileSync(files[0], output);
      console.log(`Copied ${files[0]} -> ${output}`);
      process.exit(0);
    } catch (err2) {
      console.error('Fallback copy failed:', err2);
      process.exit(3);
    }
  }
}

main();
