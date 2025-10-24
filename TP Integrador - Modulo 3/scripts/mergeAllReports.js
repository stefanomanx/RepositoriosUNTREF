const fs = require('fs');
const path = require('path');

async function main() {
  // Expect web_output.json and api_output.json to exist (created by mergeReports.js when suites run).
  const root = path.join(__dirname, '..', 'reports');
  const webJson = path.join(root, 'web_output.json');
  const apiJson = path.join(root, 'api_output.json');
  const combined = path.join(root, 'combined_output.json');

  const files = [];
  if (fs.existsSync(webJson)) files.push(webJson);
  if (fs.existsSync(apiJson)) files.push(apiJson);

  if (files.length === 0) {
    console.error('No per-suite output JSONs found (web_output.json or api_output.json). Run the per-suite report scripts first.');
    process.exit(1);
  }

  if (files.length === 1) {
    // only one suite present, copy it to combined
    fs.copyFileSync(files[0], combined);
    console.log(`Only one suite present. Copied ${files[0]} -> ${combined}`);
    process.exit(0);
  }

  // Try to use mochawesome-merge programmatically
  try {
    const merge = require('mochawesome-merge');
    const merged = await merge.merge({ files });
    fs.writeFileSync(combined, merged, 'utf8');
    console.log(`Merged ${files.length} reports -> ${combined}`);
    process.exit(0);
  } catch (err) {
    console.warn('mochawesome-merge failed for combined reports:', err && err.message ? err.message : err);
    // fallback: produce a simple combined JSON object
    try {
      const parsed = files.map(f => JSON.parse(fs.readFileSync(f, 'utf8')));
      // basic aggregation
      const stats = parsed.reduce((acc, cur) => {
        acc.suites += (cur.stats && cur.stats.suites) ? cur.stats.suites : 0;
        acc.tests += (cur.stats && cur.stats.tests) ? cur.stats.tests : 0;
        acc.passes += (cur.stats && cur.stats.passes) ? cur.stats.passes : 0;
        acc.failures += (cur.stats && cur.stats.failures) ? cur.stats.failures : 0;
        acc.pending += (cur.stats && cur.stats.pending) ? cur.stats.pending : 0;
        acc.duration += (cur.stats && cur.stats.duration) ? cur.stats.duration : 0;
        return acc;
      }, { suites:0, tests:0, passes:0, failures:0, pending:0, duration:0 });

      // compute passPercent safely
      const passPercent = stats.tests > 0 ? Math.round((stats.passes / stats.tests) * 100) : 0;

      const combinedObj = {
        stats: {
          suites: stats.suites,
          tests: stats.tests,
          passes: stats.passes,
          pending: stats.pending,
          failures: stats.failures,
          start: parsed[0].stats && parsed[0].stats.start ? parsed[0].stats.start : undefined,
          end: parsed[parsed.length-1].stats && parsed[parsed.length-1].stats.end ? parsed[parsed.length-1].stats.end : undefined,
          duration: stats.duration,
          testsRegistered: stats.tests,
          passPercent: passPercent,
          pendingPercent: 0
        },
        results: parsed.map(p => p.suites).flat ? parsed.map(p => p.suites) : parsed.map(p => p.suites),
        // preserve original raw reports under an array for debugging
        _reports: parsed
      };

      fs.writeFileSync(combined, JSON.stringify(combinedObj, null, 2), 'utf8');
      console.log(`Fallback combined JSON written -> ${combined}`);
      process.exit(0);
    } catch (err2) {
      console.error('Fallback combining failed:', err2);
      process.exit(2);
    }
  }
}

main();
