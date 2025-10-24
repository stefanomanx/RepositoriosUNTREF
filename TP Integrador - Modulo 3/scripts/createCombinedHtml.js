const fs = require('fs');
const path = require('path');

function extractBetween(html, startRegex, endRegex) {
  const start = html.match(startRegex);
  if (!start) return null;
  const si = html.indexOf(start[0]);
  const end = html.match(endRegex);
  if (!end) return null;
  const ei = html.lastIndexOf(end[0]);
  return html.substring(si + start[0].length, ei);
}

function extractHead(html) {
  const m = html.match(/<head[^>]*>[\s\S]*?<\/head>/i);
  return m ? m[0] : '';
}

function extractBody(html) {
  const m = html.match(/<body[^>]*>[\s\S]*?<\/body>/i);
  return m ? m[0] : html;
}

function main() {
  const root = path.join(__dirname, '..', 'reports');
  const webFile = path.join(root, 'web', 'mochawesome.html');
  const apiFile = path.join(root, 'api', 'mochawesome.html');
  const outDir = path.join(root, 'combined');
  const outFile = path.join(outDir, 'report.html');

  if (!fs.existsSync(webFile) || !fs.existsSync(apiFile)) {
    console.error('Both web and api mochawesome.html files must exist under reports/web and reports/api');
    process.exit(1);
  }

  const webHtml = fs.readFileSync(webFile, 'utf8');
  const apiHtml = fs.readFileSync(apiFile, 'utf8');

  // Use the head from the web report (styles/scripts) and include both bodies
  const head = extractHead(webHtml) || '';
  const webBody = extractBody(webHtml);
  const apiBody = extractBody(apiHtml);

  // adjust head so that CSS/JS references point into ./web/assets and ./api/assets
  // We'll take link/script tags from web head and rewrite their href/src to point to ./web/assets/... when possible
  function rewriteAssetTags(htmlHead, prefixDir) {
    return htmlHead
      // rewrite stylesheet hrefs
      .replace(/href="([^"]*assets\/([^"]+\.css))"/g, (m, p1, p2) => `href=".${path.sep}${prefixDir}${path.sep}assets/${p2}"`)
      // rewrite script src
      .replace(/src="([^"]*assets\/([^"]+\.js))"/g, (m, p1, p2) => `src=".${path.sep}${prefixDir}${path.sep}assets/${p2}"`);
  }

  // create a combined head that includes the web head (rewritten) and also a small style for layout
  const combinedHead = (function() {
    const rewrittenWebHead = rewriteAssetTags(head, 'web');
    const layoutStyle = `<style>body{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial; margin:0;padding:0;} .combined-header{padding:20px;background:#f6f6f6;border-bottom:1px solid #ddd;} .report-section{padding:20px} .report-frame{border:1px solid #e6e6e6;padding:10px;background:white;margin-bottom:30px}</style>`;
    return rewrittenWebHead + '\n' + layoutStyle;
  })();

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Copy per-suite HTMLs and their assets into the combined folder so links work from a file:// view
  const webOutDir = path.join(outDir, 'web');
  const apiOutDir = path.join(outDir, 'api');
  if (!fs.existsSync(webOutDir)) fs.mkdirSync(webOutDir, { recursive: true });
  if (!fs.existsSync(apiOutDir)) fs.mkdirSync(apiOutDir, { recursive: true });

  // copy mochawesome.html files
  fs.copyFileSync(webFile, path.join(webOutDir, 'mochawesome.html'));
  fs.copyFileSync(apiFile, path.join(apiOutDir, 'mochawesome.html'));

  // copy assets directories if present
  const webAssetsSrc = path.join(path.dirname(webFile), 'assets');
  const apiAssetsSrc = path.join(path.dirname(apiFile), 'assets');
  const webAssetsDest = path.join(webOutDir, 'assets');
  const apiAssetsDest = path.join(apiOutDir, 'assets');
  try {
    if (fs.existsSync(webAssetsSrc)) {
      // fs.cpSync available in Node 16+; fallback copy if missing
      if (fs.cpSync) fs.cpSync(webAssetsSrc, webAssetsDest, { recursive: true });
    }
  } catch (e) {
    // ignore copy errors
  }
  try {
    if (fs.existsSync(apiAssetsSrc)) {
      if (fs.cpSync) fs.cpSync(apiAssetsSrc, apiAssetsDest, { recursive: true });
    }
  } catch (e) {
    // ignore copy errors
  }

  // Create a combined page that embeds the full per-suite mochawesome HTMLs inside iframes.
  // This preserves their original styling and JS without attempting to merge DOMs.
  const combinedHeadSafe = combinedHead || '<meta charset="utf-8">';
  const combined = `<!doctype html>
<html lang="en">
<head>
${combinedHeadSafe}
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial;margin:0;padding:0}
  .combined-header{padding:20px;background:#f6f6f6;border-bottom:1px solid #ddd}
  .frames{display:flex;flex-direction:column;gap:20px;padding:20px}
  .report-iframe{width:100%;height:900px;border:1px solid #ddd}
  .iframe-actions{margin-top:8px}
</style>
</head>
<body>
  <div class="combined-header">
    <h1>Combined Report</h1>
    <p>Generated: ${new Date().toISOString()}</p>
    <p>Contains: Web (Saucedemo) and API (PokeAPI) reports</p>
    <p><a href="./web/mochawesome.html" target="_blank">Open Web report (separate)</a> | <a href="./api/mochawesome.html" target="_blank">Open API report (separate)</a></p>
  </div>
  <div class="frames">
    <section>
      <h2>Web report</h2>
      <div class="iframe-actions"><button onclick="document.getElementById('frame-web').style.height='auto';document.getElementById('frame-web').style.height=document.getElementById('frame-web').contentWindow.document.body.scrollHeight + 'px'">Resize iframe to content</button></div>
      <iframe id="frame-web" class="report-iframe" src="./web/mochawesome.html"></iframe>
    </section>
    <section>
      <h2>API report</h2>
      <div class="iframe-actions"><button onclick="document.getElementById('frame-api').style.height='auto';document.getElementById('frame-api').style.height=document.getElementById('frame-api').contentWindow.document.body.scrollHeight + 'px'">Resize iframe to content</button></div>
      <iframe id="frame-api" class="report-iframe" src="./api/mochawesome.html"></iframe>
    </section>
  </div>
</body>
</html>`;

  fs.writeFileSync(outFile, combined, 'utf8');
  console.log(`Combined HTML written to ${outFile}`);
}

main();
