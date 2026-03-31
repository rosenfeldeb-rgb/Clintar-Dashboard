export default function Home() {
      return (
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Clintar — National Marketing Dashboard</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                  <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }
                  body { font-family: 'Inter', -apple-system, sans-serif; background: #F0F2F6; color: #111827; }
                  ::-webkit-scrollbar { width: 6px; height: 6px; }
                  ::-webkit-scrollbar-track { background: #F0F2F6; }
                  ::-webkit-scrollbar-thumb { background: #9CA3AF; border-radius: 3px; }
                  #header { background:#1A2744;padding:0 28px;height:62px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,0.25); }
                  .header-left { display:flex;align-items:center;gap:13px; }
                  .brand-name { color:#fff;font-weight:800;font-size:16px;letter-spacing:-0.02em; }
                  .brand-sub { color:#7B8DB0;font-size:11px; }
                  .home-badge { margin-left:14px;padding:3px 12px;border-radius:6px;background:rgba(244,164,39,0.15);border:1px solid rgba(244,164,39,0.25);color:#F4A427;font-size:11px;font-weight:700; }
                  .live-badge { display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;background:#E8F5E9;color:#2E7D32;font-size:11px;font-weight:700; }
                  .live-dot { width:6px;height:6px;border-radius:50%;background:#4CAF50;display:inline-block;animation:pulse 2s infinite; }
                  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
                  .updated-text { color:#5C6F94;font-size:12px; }
                  #tabnav { background:#fff;border-bottom:1px solid #E5E7EB;padding:0 28px;display:flex;overflow-x:auto;position:sticky;top:62px;z-index:99; }
                  .tab-btn { padding:15px 18px;background:none;border:none;cursor:pointer;border-bottom:3px solid transparent;color:#6B7280;font-weight:500;font-size:13px;white-space:nowrap;margin-bottom:-1px;transition:all 0.12s;font-family:inherit; }
                  .tab-btn:hover { color:#2E7D32; }
                  .tab-btn.active { color:#2E7D32;font-weight:700;border-bottom-color:#F4A427; }
                  #content { padding:26px 28px;max-width:1400px;margin:0 auto; }
                  .tab-panel { display:none; }
                  .tab-panel.active { display:block; }
                  .kpi-row { display:flex;gap:14px;margin-bottom:20px;flex-wrap:wrap; }
                  .kpi-card { background:#fff;border-radius:12px;padding:20px 22px;box-shadow:0 1px 3px rgba(0,0,0,0.07);flex:1;min-width:148px;border-top:3px solid #2E7D32; }
                  .kpi-label { font-size:11px;color:#6B7280;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px; }
                  .kpi-value { font-size:30px;font-weight:800;color:#111827;line-height:1;letter-spacing:-0.02em; }
                  .kpi-sub { font-size:12px;color:#9CA3AF;margin-top:5px; }
                  .card { background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.07);margin-bottom:20px;overflow:hidden; }
                  .card-header { display:flex;align-items:center;justify-content:space-between;padding:16px 22px;border-bottom:1px solid #E5E7EB; }
                  .card-title { font-size:14px;font-weight:700;color:#111827; }
                  .card-body { padding:20px 22px; }
                  .grid-2 { display:grid;grid-template-columns:1fr 1fr;gap:20px; }
                  .grid-2-wide { display:grid;grid-template-columns:1.3fr 1fr;gap:20px; }
                  table { width:100%;border-collapse:collapse;font-size:13px; }
                  th { padding:10px 14px;text-align:left;color:#6B7280;font-weight:600;font-size:12px;white-space:nowrap;background:#F9FAFB; }
                  th.right, td.right { text-align:right; }
                  th.center, td.center { text-align:center; }
                  td { padding:10px 14px;color:#111827;border-top:1px solid #F3F4F6; }
                  tr:nth-child(even) td { background:#F9FAFB; }
                  .badge { display:inline-block;padding:2px 9px;border-radius:6px;font-weight:700;font-size:12px; }
                  .badge-green { background:#E8F5E9;color:#2E7D32; }
                  .badge-gold { background:#FFF8E1;color:#D97706; }
                  .badge-gray { background:#F3F4F6;color:#6B7280; }
                  .badge-red { background:#FEF2F2;color:#B91C1C; }
                  .badge-sample { padding:3px 10px;border-radius:4px;background:#FFF8E1;color:#D97706;font-size:11px;font-weight:700; }
                  .info-box { padding:10px 14px;border-radius:8px;font-size:13px;font-weight:500;margin-bottom:14px;line-height:1.5; }
                  .info-gold { background:#FFF8E1;color:#D97706; }
                  .info-green { background:#E8F5E9;color:#2E7D32; }
                  .chart-wrap { position:relative; }
                  .stat-row { display:flex;gap:28px;margin-top:14px;padding-top:14px;border-top:1px solid #F3F4F6;flex-wrap:wrap; }
                  .upload-zone { border:2px dashed #D1D5DB;border-radius:10px;padding:28px;text-align:center;cursor:pointer;transition:border-color 0.15s,background 0.15s;margin-bottom:14px; }
                  .upload-zone:hover, .upload-zone.dragover { border-color:#2E7D32;background:#F0FDF4; }
                  .btn-green { padding:10px 24px;background:#2E7D32;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;font-family:inherit; }
                  .btn-gold { padding:10px 22px;background:#F4A427;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px;font-family:inherit; }
                  .btn-navy { padding:10px 22px;background:#1A2744;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px;font-family:inherit; }
                  .summary-boxes { display:flex;gap:14px; }
                  .summary-box { text-align:center;padding:18px 24px;border-radius:12px;min-width:120px; }
                  .funnel-row { display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap; }
                  .funnel-card { flex:1;min-width:110px;background:#fff;border-radius:10px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.07);text-align:center; }
                  .empty-state { text-align:center;padding:70px 20px;background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.07); }
                  .code-block { margin-top:24px;display:inline-block;background:#F9FAFB;border-radius:10px;padding:16px 24px;text-align:left; }
                  .code-line { display:block;font-size:12px;color:#374151;line-height:2;font-family:monospace; }
                  .step-row { display:flex;gap:16px;padding:16px 0;border-bottom:1px solid #F3F4F6; }
                  .step-row:last-child { border-bottom:none; }
                  .step-num { width:30px;height:30px;border-radius:50%;background:#1A2744;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0;margin-top:2px; }
                  .step-title { font-weight:700;color:#111827;font-size:14px; }
                  .step-desc { color:#6B7280;font-size:13px;margin-top:4px;line-height:1.7; }
                  .loc-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:8px;margin-top:12px; }
                  .loc-chip { padding:8px 12px;background:#F9FAFB;border-radius:8px;font-size:12px;color:#374151;font-weight:500; }
                  .loc-chip-more { background:#E8F5E9;color:#2E7D32;font-weight:700; }
                  .setup-2col { display:grid;grid-template-columns:1fr 1fr;gap:24px; }
                  #footer { background:#1A2744;padding:16px 28px;display:flex;align-items:center;justify-content:space-between;margin-top:20px; }
                  .ga4-blur { opacity:0.2;pointer-events:none;transition:opacity 0.3s; }
                  .ga4-active { opacity:1;pointer-events:auto;transition:opacity 0.3s; }
                  @media (max-width:900px) { .grid-2,.grid-2-wide,.setup-2col { grid-template-columns:1fr; } }`}</style>
    </head>
      <body>
            <div id="header">
              <div className="header-left">
                <svg width="38" height="38" viewBox="0 0 38 38"><ellipse cx="19" cy="19" rx="18" ry="17" fill="#4CAF50"/><ellipse cx="19" cy="19" rx="16" ry="15" fill="#2E7D32"/><text x="19" y="23.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="'Inter',sans-serif" letterSpacing="-0.3">Clintar</text></svg>
                <div><div className="brand-name">Clintar</div><div className="brand-sub">National Marketing Dashboard</div></div>
            <span className="home-badge">HOME OFFICE VIEW</span>
    </div>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <span className="live-badge"><span className="live-dot"></span>LIVE · Ahrefs</span>
                <span className="updated-text">Updated: Mar 31, 2026</span>
    </div>
    </div>
        <div id="tabnav">
              <button className="tab-btn active" onClick={() => showTab('overview')}>📊&nbsp; Overview</button>
          <button className="tab-btn" onClick={() => showTab('seo')}>🔍&nbsp; SEO & Ahrefs</button>
          <button className="tab-btn" onClick={() => showTab('pipeline')}>📋&nbsp; Leads Pipeline</button>
          <button className="tab-btn" onClick={() => showTab('ga4')}>📈&nbsp; GA4 Analytics</button>
          <button className="tab-btn" onClick={() => showTab('setup')}>⚙️&nbsp; API Setup Guide</button>
    </div>
        <div id="content">
              <div id="tab-overview" className="tab-panel active">
                <div className="kpi-row">
                  <div className="kpi-card" style={{borderTopColor:'#2E7D32'}}><div className="kpi-label">🏆 Domain Rating</div><div className="kpi-value">29</div><div className="kpi-sub">Ahrefs DR (0–100)</div></div>
                  <div className="kpi-card" style={{borderTopColor:'#2E7D32'}}><div className="kpi-label">🌿 Organic Traffic</div><div className="kpi-value">969</div><div className="kpi-sub">Est. monthly visits</div></div>
                  <div className="kpi-card" style={{borderTopColor:'#F4A427'}}><div className="kpi-label">🔑 Organic Keywords</div><div className="kpi-value">76</div><div className="kpi-sub">24 ranking in top 3</div></div>
                  <div className="kpi-card" style={{borderTopColor:'#F4A427'}}><div className="kpi-label">💰 Traffic Value</div><div className="kpi-value">$142K</div><div className="kpi-sub">Est. PPC equivalent/mo</div></div>
                  <div className="kpi-card" style={{borderTopColor:'#9CA3AF'}} id="leads-kpi-card"><div className="kpi-label">📋 Leads Loaded</div><div className="kpi-value" id="leads-kpi-value">—</div><div className="kpi-sub" id="leads-kpi-sub">Upload CSV below</div></div>
                  <div className="kpi-card" style={{borderTopColor:'#2E7D32'}}><div className="kpi-label">📍 Top Keyword Rank</div><div className="kpi-value">#1</div><div className="kpi-sub">commercial landscaping</div></div>
    </div>
    </div>
    </div>
        <div id="footer">
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <svg width="32" height="32" viewBox="0 0 38 38"><ellipse cx="19" cy="19" rx="18" ry="17" fill="#4CAF50"/><ellipse cx="19" cy="19" rx="16" ry="15" fill="#2E7D32"/><text x="19" y="23.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="'Inter',sans-serif">Clintar</text></svg>
                <span style={{color:'#7B8DB0',fontSize:'12px'}}>Clintar National Marketing Dashboard · Home Office View</span>
    </div>
          <div style={{fontSize:'12px',color:'#5C6F94'}}>Ahrefs data: Mar 31, 2026 · Project ID: 9630318</div>
    </div>
        <script dangerouslySetInnerHTML={{__html: `const GREEN='#2E7D32',GOLD='#F4A427',NAVY='#1A2744',GRAY='#9CA3AF',GRAY2='#E5E7EB'; function showTab(id){} Chart.defaults.font.family="'Inter',sans-serif";`}} />
    </body>
    </html>
  );
}
