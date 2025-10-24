const fs = require('fs');
const path = require('path');

function extractHeadContent(html) {
  const m = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return m ? m[1] : '';
}
function extractBodyContent(html) {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1] : html;
}

function inlineAssets(headHtml, baseDir) {
  // find link rel=stylesheet href and inline CSS
  let inlined = headHtml;
  const linkRe = /<link[^>]+href=["']([^"']+)["'][^>]*>/g;
  inlined = inlined.replace(linkRe, (m, href) => {
    try {
      const relPath = href.replace(/^\.\/|^\//, '');
      const filePath = path.join(baseDir, relPath);
      if (fs.existsSync(filePath)) {
        const css = fs.readFileSync(filePath, 'utf8');
        return `<style>/* inlined ${path.basename(filePath)} */\n${css}\n</style>`;
      }
    } catch (e) {}
    return '';
  });

  const scriptRe = /<script[^>]+src=["']([^"']+)["'][^>]*>\s*<\/script>/g;
  inlined = inlined.replace(scriptRe, (m, src) => {
    try {
      const relPath = src.replace(/^\.\.\/|^\.\/|^\//, '');
      const filePath = path.join(baseDir, relPath);
      if (fs.existsSync(filePath)) {
        const js = fs.readFileSync(filePath, 'utf8');
        return `<script>/* inlined ${path.basename(filePath)} */\n${js}\n</script>`;
      }
    } catch (e) {}
    return '';
  });

  return inlined;
}

function main() {
  const root = path.join(__dirname, '..', 'reports');
  const webFile = path.join(root, 'web', 'mochawesome.html');
  const apiFile = path.join(root, 'api', 'mochawesome.html');
  const outDir = path.join(root, 'combined');
  const outFile = path.join(outDir, 'standalone-report.html');

  if (!fs.existsSync(webFile) || !fs.existsSync(apiFile)) {
    console.error('Both web and api mochawesome.html files must exist under reports/web and reports/api');
    process.exit(1);
  }

  const webHtml = fs.readFileSync(webFile, 'utf8');
  const apiHtml = fs.readFileSync(apiFile, 'utf8');

  const webHead = extractHeadContent(webHtml);
  const apiHead = extractHeadContent(apiHtml);
  const webBody = extractBodyContent(webHtml);
  const apiBody = extractBodyContent(apiHtml);

  // inline assets referenced in heads. The assets are stored in reports/web/assets and reports/api/assets
  const webAssetsDir = path.join(root, 'web', 'assets');
  const apiAssetsDir = path.join(root, 'api', 'assets');

  const inlinedWebHead = inlineAssets(webHead, webAssetsDir);
  const inlinedApiHead = inlineAssets(apiHead, apiAssetsDir);

  const combinedHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Standalone Combined Report</title>
${inlinedWebHead}
${inlinedApiHead}
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial;margin:0;padding:0} .combined-header{padding:20px;background:#f6f6f6;border-bottom:1px solid #ddd}</style>
</head>
<body>
  <div class="combined-header">
    <h1>Standalone Combined Report</h1>
    <p>Generated: ${new Date().toISOString()}</p>
  </div>
  <div class="report-section">
    <h2>Web report</h2>
    <div class="report-frame">
      ${webBody}
    </div>
    <h2>API report</h2>
    <div class="report-frame">
      ${apiBody}
    </div>
  </div>
</body>
</html>`;

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, combinedHtml, 'utf8');
  console.log(`Standalone combined HTML written to ${outFile}`);
}

main();
