const http = require("http");
const os = require("os");

const PORT = process.env.PORT || 3000;

const html = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Docker Practice 🐳</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 560px;
      width: 100%;
    }
    .whale { font-size: 3rem; margin-bottom: 1rem; }
    h1 { font-size: 1.6rem; font-weight: 600; margin-bottom: 0.5rem; }
    .subtitle { color: #94a3b8; margin-bottom: 2rem; font-size: 0.95rem; }
    .info-grid {
      display: grid;
      gap: 0.75rem;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }
    .label { color: #64748b; }
    .value { color: #38bdf8; font-family: monospace; font-size: 0.85rem; }
    .badge {
      display: inline-block;
      background: #064e3b;
      color: #34d399;
      border: 1px solid #065f46;
      border-radius: 999px;
      padding: 0.25rem 0.75rem;
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 2rem;
    }
    .footer {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #334155;
      color: #475569;
      font-size: 0.8rem;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="whale">🐳</div>
    <h1>Hej! Docker działa!</h1>
    <p class="subtitle">Ten serwer Node.js działa wewnątrz kontenera Dockera.</p>
    <span class="badge">✓ kontener aktywny</span>
    <div class="info-grid">
      <div class="info-row">
        <span class="label">Hostname kontenera</span>
        <span class="value">HOSTNAME</span>
      </div>
      <div class="info-row">
        <span class="label">Platforma</span>
        <span class="value">PLATFORM</span>
      </div>
      <div class="info-row">
        <span class="label">Architektura</span>
        <span class="value">ARCH</span>
      </div>
      <div class="info-row">
        <span class="label">Port wewnętrzny</span>
        <span class="value">PORTVAL</span>
      </div>
      <div class="info-row">
        <span class="label">Wersja Node.js</span>
        <span class="value">NODEVERSION</span>
      </div>
    </div>
    <div class="footer">
      Zmień kod w src/index.js → odbuduj image → zobacz zmiany 🚀
    </div>
  </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const page = html
    .replace("HOSTNAME", os.hostname())
    .replace("PLATFORM", os.platform())
    .replace("ARCH", os.arch())
    .replace("PORTVAL", PORT)
    .replace("NODEVERSION", process.version);

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(page);
});

server.listen(PORT, () => {
  console.log(`✅ Serwer działa na porcie ${PORT}`);
  console.log(`   Hostname: ${os.hostname()}`);
  console.log(`   Node: ${process.version}`);
});
