import { PetState, SpeciesStageInfo, SpeciesInfo, renderPetSvg } from 'sitepet';

/**
 * Generates and downloads a standalone self-contained HTML page containing the configured Pet
 */
export function exportStandaloneHtml(state: PetState, speciesInfo: SpeciesInfo, stageInfo: SpeciesStageInfo) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${state.customName || stageInfo.name} — Interactive Website Companion</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sitepet/dist/style.css" />
  <style>
    body {
      margin: 0;
      padding: 40px 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f1017;
      color: #f0f0f5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 24px;
      padding: 32px;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    h1 { font-size: 28px; margin-bottom: 8px; color: #fff; }
    p { color: #a0a0b0; font-size: 14px; line-height: 1.6; }
    .test-btn {
      margin: 8px;
      padding: 12px 20px;
      border-radius: 12px;
      border: none;
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      background: ${speciesInfo.themeColor};
      color: #000;
      transition: transform 0.1s;
    }
    .test-btn:active { transform: scale(0.96); }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      background: ${speciesInfo.themeColor}33;
      color: ${speciesInfo.themeColor};
      font-size: 12px;
      font-weight: 800;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">🐾 SitePet Standalone Test Environment</div>
    <h1>Meet ${state.customName || stageInfo.name}!</h1>
    <p>This is your standalone test page with your companion active and ready. Click buttons or submit forms to see your pet grow!</p>
    
    <div style="margin: 24px 0;">
      <button class="test-btn" data-pet-exp="15" data-pet-msg="Great click! +15 XP!">Click Me (+15 XP)</button>
      <button class="test-btn" data-pet-action="feed">Feed Berry 🍓</button>
      <button class="test-btn" data-pet-action="pet">Pet Me 🫳</button>
    </div>

    <form onsubmit="event.preventDefault(); alert('Form submitted! Companion gained +50 EXP!');" style="margin-top: 20px;">
      <input type="text" placeholder="Type something and press Enter..." style="padding: 10px 14px; border-radius: 10px; border: 1px solid #444; background: #222; color: #fff; width: 70%;" />
      <button type="submit" class="test-btn" style="background: #00E676; margin-left: 6px;">Submit (+50 XP)</button>
    </form>
  </div>

  <!-- Embed Widget -->
  <script src="https://cdn.jsdelivr.net/npm/sitepet/dist/sitepet.min.js"></script>
  <script>
    SitePet.init({
      species: '${state.species}',
      position: 'bottom-right',
      sound: true,
      autoTrack: true
    });
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sitepet-${state.species}-companion.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads or prints a full-color official Pet Passport & Analytics Certificate PDF
 */
export function exportPetPassportPdf(state: PetState, speciesInfo: SpeciesInfo, stageInfo: SpeciesStageInfo) {
  const petSvg = renderPetSvg(state.species, state.stage, 'happy', state.accessory);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Open printable window formatted for A4/Letter PDF export
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to generate your Pet Passport PDF certificate.');
    return;
  }

  const pdfHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Pet Passport & Certificate — ${state.customName || stageInfo.name}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      margin: 0;
      padding: 24px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .passport-container {
      max-width: 760px;
      margin: 0 auto;
      background: #ffffff;
      border: 3px solid ${speciesInfo.themeColor};
      border-radius: 20px;
      padding: 36px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      position: relative;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 20px;
      margin-bottom: 28px;
    }
    .title-area h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
    }
    .title-area p {
      margin: 4px 0 0 0;
      font-size: 13px;
      color: #64748b;
      font-weight: 600;
    }
    .seal {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: ${speciesInfo.themeColor};
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      box-shadow: 0 4px 12px ${speciesInfo.themeColor}55;
    }
    .grid {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 28px;
    }
    .avatar-box {
      background: #f1f5f9;
      border: 2px dashed ${speciesInfo.themeColor};
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .avatar-box svg {
      width: 150px;
      height: 150px;
    }
    .stats-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .stats-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #f1f5f9;
    }
    .stats-table td.label {
      color: #64748b;
      font-weight: 600;
      width: 40%;
    }
    .stats-table td.val {
      font-weight: 800;
      color: #0f172a;
    }
    .badge-pill {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 12px;
      background: ${speciesInfo.themeColor}22;
      color: ${speciesInfo.themeColor};
      font-weight: 800;
      font-size: 11px;
    }
    .footer {
      margin-top: 36px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #94a3b8;
    }
    .btn-print {
      display: block;
      margin: 20px auto;
      padding: 12px 28px;
      background: ${speciesInfo.themeColor};
      color: #000;
      font-weight: 800;
      font-size: 14px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }
    @media print {
      .btn-print { display: none; }
      body { padding: 0; background: #fff; }
      .passport-container { border-width: 2px; box-shadow: none; }
    }
  </style>
</head>
<body>
  <button class="btn-print" onclick="window.print()">🖨️ Save as PDF / Print Certificate</button>

  <div class="passport-container">
    <div class="header">
      <div class="title-area">
        <h1>🐾 OFFICIAL PET COMPANION PASSPORT</h1>
        <p>SitePet Web Engagement Certificate & Identity Record</p>
      </div>
      <div class="seal">
        <span>AUTHENTIC</span>
        <span style="font-size: 14px;">🐾</span>
      </div>
    </div>

    <div class="grid">
      <div class="avatar-box">
        ${petSvg}
        <div style="margin-top: 12px; font-weight: 800; font-size: 16px; color: #0f172a;">
          ${state.customName || stageInfo.name}
        </div>
        <div style="font-size: 11px; color: ${speciesInfo.themeColor}; font-weight: 700;">
          ${stageInfo.title}
        </div>
      </div>

      <div>
        <table class="stats-table">
          <tr>
            <td class="label">Companion Species:</td>
            <td class="val">${speciesInfo.name} (${speciesInfo.element} ${speciesInfo.elementIcon})</td>
          </tr>
          <tr>
            <td class="label">Evolution Stage:</td>
            <td class="val"><span class="badge-pill">Stage ${state.stage} of 3</span></td>
          </tr>
          <tr>
            <td class="label">Current Level:</td>
            <td class="val" style="color: ${speciesInfo.themeColor}; font-size: 15px;">Level ${state.level}</td>
          </tr>
          <tr>
            <td class="label">Total Experience (EXP):</td>
            <td class="val">${state.stats.totalExpGained} XP</td>
          </tr>
          <tr>
            <td class="label">Signature Move:</td>
            <td class="val">${stageInfo.signatureMove}</td>
          </tr>
          <tr>
            <td class="label">Website Clicks Logged:</td>
            <td class="val">${state.stats.totalClicks} Interactions</td>
          </tr>
          <tr>
            <td class="label">Forms Completed:</td>
            <td class="val">${state.stats.totalForms} Submissions</td>
          </tr>
          <tr>
            <td class="label">Equipped Accessory:</td>
            <td class="val" style="text-transform: capitalize;">${state.accessory !== 'none' ? state.accessory : 'Natural Form'}</td>
          </tr>
          <tr>
            <td class="label">Affection & Energy:</td>
            <td class="val">❤️ ${state.happiness}% Happiness • ⚡ ${state.energy}% Energy</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="footer">
      <div>Issued: ${dateStr} • Unlimited Test License (Open PDF & HTML Access)</div>
      <div style="font-weight: 700; color: #0f172a;">SitePet Verification Core v1.0</div>
    </div>
  </div>

  <script>
    // Auto-trigger print dialog for instant PDF download
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(pdfHtml);
  printWindow.document.close();
}
