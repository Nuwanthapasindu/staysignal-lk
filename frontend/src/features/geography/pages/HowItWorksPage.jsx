import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  return (
    <div className="page-wrapper">
      {/* Top Breadcrumb Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
          <Link to="/notices" style={{ color: 'var(--brand-forest)' }}>Field Ledger</Link> &gt; Protocol Architecture &amp; Lifecycle
        </div>
        <div className="mesh-status-badge">
          <span className="status-dot" />
          <span>2G Optimized (14kb Payload)</span>
        </div>
      </div>

      {/* Main Hero Header */}
      <section className="ledger-hero" style={{ padding: '24px 0 32px 0' }}>
        <div className="hero-text-block" style={{ maxWidth: '880px' }}>
          <div className="hero-tracker">
            <span aria-hidden="true">⚙️</span>
            <span>OPERATIONAL ARCHITECTURE · 30-SECOND REPORTING</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: '38px', marginBottom: '16px' }}>
            How StaySignal LK works from ridge to road.
          </h1>
          <p className="hero-description" style={{ fontSize: '16px', maxWidth: '780px' }}>
            Zero apps to install. No accounts or passwords to remember during a monsoon blackout. Direct, verified status signals dispatched via phone authentication in under 30 seconds.
          </p>

          <div style={{ display: 'flex', gap: '20px', marginTop: '16px', fontSize: '12.5px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span><strong>Standard:</strong> Field Ledger Spec 2.4</span>
            <span>•</span>
            <span><strong>Latency:</strong> &lt; 4.2s to corridor feed</span>
            <span>•</span>
            <span><strong>Target:</strong> Tea Desks, Guest Vans &amp; Estate Superintendents</span>
          </div>
        </div>
      </section>

      {/* Section 1: The 3-Step Operational Lifecycle */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div className="hero-tracker">FIELD PROTOCOL</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--brand-forest)', marginBottom: '6px' }}>
            The 3-Step Operational Lifecycle
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Structured for rapid completion by estate staff, homestay owners, and transport drivers on weak mobile coverage.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Step 01 */}
          <div className="post-form-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-forest)', backgroundColor: 'var(--brand-sage-light)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                STEP 01
              </span>
              <span style={{ fontSize: '18px' }} aria-hidden="true">👁️</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 600 }}>
              Host Observation on the Ground
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
              Local staykeeper notes road blockage, CEB power cut, water delivery delay, or river surge. They open StaySignal LK on 2G mobile or send a single SMS/Gateway dispatch.
            </p>

            <div style={{ backgroundColor: '#FAF8F2', border: '1px solid #EAE5D9', borderRadius: '8px', padding: '12px', fontSize: '12px', fontFamily: 'monospace', color: '#4A5568' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11px', color: '#718096' }}>
                <span>SMS Gateway Relay</span>
                <span>2G GSM · #1101 T-Nav</span>
              </div>
              <div style={{ color: '#163A29', fontWeight: 600, wordBreak: 'break-all' }}>
                DISRUPT · A5-KM44-RAMBODA · CUT · LLAVE · CEB_OFF · MATER_OK
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10.5px', color: '#166534' }}>
                <span>Direct SIM Origin #verified</span>
                <span>Auto-Parsed</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--text-muted)', paddingTop: '10px', borderTop: '1px solid #EFEBE1' }}>
              ⏱️ Elapsed time: 0 to 10 seconds
            </div>
          </div>

          {/* Step 02 */}
          <div className="post-form-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#92400E', backgroundColor: '#FEF3C7', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                STEP 02
              </span>
              <span style={{ fontSize: '18px' }} aria-hidden="true">✍️</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 600 }}>
              30-Second Form &amp; Verified Desk Pin
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
              Host enters town, corridor passage, status tier (Open / Caution / Disrupted), specific bypass advice, generator availability hours, and emergency phone number.
            </p>

            <div style={{ backgroundColor: '#FAF8F2', border: '1px solid #EAE5D9', borderRadius: '8px', padding: '12px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600 }}>Field Entry Check:</span>
                <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>CAUTION</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                <div>Corridor:</div>
                <div style={{ fontWeight: 600 }}>Ramboda Pass (A5)</div>
                <div>Gen Window:</div>
                <div style={{ fontWeight: 600 }}>18:00 - 22:30 (Quiet Run)</div>
                <div>Bypass Advice:</div>
                <div style={{ fontWeight: 600 }}>Light 4x4 or via Hatton</div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--text-muted)', paddingTop: '10px', borderTop: '1px solid #EFEBE1' }}>
              ⏱️ SIM Gateway Verified · 20 seconds
            </div>
          </div>

          {/* Step 03 */}
          <div className="post-form-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#166534', backgroundColor: '#DCFCE7', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                STEP 03
              </span>
              <span style={{ fontSize: '18px' }} aria-hidden="true">📡</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 600 }}>
              Live Corridor Broadcast
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
              Signal immediately appears on the Corridor Ledger with timestamp. Van drivers in Kandy, night-bus travellers, and Colombo transport coordinators see the notice hours in advance.
            </p>

            <div style={{ backgroundColor: '#FAF8F2', border: '1px solid #EAE5D9', borderRadius: '8px', padding: '12px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11px' }}>
                <span style={{ color: '#B91C1C', fontWeight: 700 }}>● DISPATCH CONFIRMED</span>
                <span style={{ color: '#718096' }}>Logged 08:14</span>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: '4px 0' }}>
                "Tour van dispatchers alerted at Peradeniya junction. Avoiding A5 Ramboda bottleneck."
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#166534', marginTop: '6px' }}>
                <span>Relayed to 42 dispatchers</span>
                <span>Sync Complete</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--text-muted)', paddingTop: '10px', borderTop: '1px solid #EFEBE1' }}>
              ⏱️ Total elapsed: &lt; 30 seconds
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The 3 Operational Tiers Explained */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div className="hero-tracker">STANDARD CLASSIFICATION</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--brand-forest)', marginBottom: '6px' }}>
            The 3 Operational Tiers Explained
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            StaySignal LK enforces a rigorous, three-tier classification to prevent panic while ensuring unambiguous ground guidance for drivers, homestays, and tour desks.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Tier 1: Open */}
          <div className="post-form-card" style={{ padding: '24px', borderTop: '4px solid var(--status-open-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="status-badge open">OPEN &amp; CLEAR</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Tier 01</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Normal Mountain Passage
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Road clear, grid or backup generator active, municipal water or storage tanks full.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              <li>✔️ Corridors pass all two-wheel-drive sedans, heavy buses, and light vans.</li>
              <li>✔️ CEB grid line uninterrupted or on regular schedule.</li>
              <li>✔️ Storage reservoirs filled; local water supply running nominal.</li>
            </ul>
            <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #EFEBE1', fontSize: '11.5px', color: '#166534', fontWeight: 600 }}>
              Operational Form: Safe Passage Validated
            </div>
          </div>

          {/* Tier 2: Caution */}
          <div className="post-form-card" style={{ padding: '24px', borderTop: '4px solid var(--status-caution-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="status-badge caution">CAUTION</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Tier 02</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Restricted or Weather-Constrained
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Narrow pass, fog/mist &lt;5m visibility, 4x4 or high-clearance vehicle required, water rationing until bowser arrival.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              <li>⚠️ Single-lane flow due to roadside earth slip or repair workers.</li>
              <li>⚠️ Severe mist pockets on passes like Ramboda, Radella, or Haputale.</li>
              <li>⚠️ Intermittent generator schedules; diesel rationing announced.</li>
            </ul>
            <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #EFEBE1', fontSize: '11.5px', color: '#B45309', fontWeight: 600 }}>
              Operational Form: Active Driver Briefing Required
            </div>
          </div>

          {/* Tier 3: Disrupted */}
          <div className="post-form-card" style={{ padding: '24px', borderTop: '4px solid var(--status-disrupted-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="status-badge disrupted">DISRUPTED</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Tier 03</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Passage Blocked / Divert Traffic
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Passage impassable, culvert washed out, active rockfall, bridge flooded. Clear bypass detour stated.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              <li>🚫 Route completely sealed; RDA or Police clearing crew deployed.</li>
              <li>🚫 Designated bypass route specified with realistic extra transit hours.</li>
              <li>🚫 Complete grid collapse without emergency backup in specified precinct.</li>
            </ul>
            <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #EFEBE1', fontSize: '11.5px', color: '#B91C1C', fontWeight: 600 }}>
              Operational Form: Mandatory Rerouting Active
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Built for 2G EDGE speeds */}
      <section className="post-form-card" style={{ padding: '32px', marginBottom: '56px', backgroundColor: '#FAF8F2' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <div className="hero-tracker">RUGGEDIZED TELECOM ARCHITECTURE</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--brand-forest)', marginBottom: '12px' }}>
              Built for 2G EDGE speeds in the tea hills.
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
              During heavy monsoon rainfall, hill towers drop from 4G down to basic EDGE connectivity. StaySignal LK is engineered with a strict 14kb total payload per request, zero tracking scripts, and pure static rendering that loads even when mobile networks drop to a single bar in the tea plantations.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div className="metric-pill total" style={{ padding: '8px 14px', fontSize: '13px' }}>
                <strong>14 kb</strong> &nbsp;Total Transfer Budget
              </div>
              <div className="metric-pill total" style={{ padding: '8px 14px', fontSize: '13px' }}>
                <strong>0</strong> &nbsp;Tracking / Ad Scripts
              </div>
              <div className="metric-pill total" style={{ padding: '8px 14px', fontSize: '13px' }}>
                <strong>1-Bar</strong> &nbsp;Guaranteed Render
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>
              <span>Network Audit Benchmark</span>
              <span style={{ color: '#166534' }}>Nuwara Eliya Tower 04</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>DNS Resolution:</span>
                <strong>18 ms</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>GZIP Compressed HTML:</span>
                <strong>9.8 KB</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Inline SVG Icons:</span>
                <strong>2.4 KB</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>External Font Preload:</span>
                <strong style={{ color: '#166534' }}>Cached</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #EFEBE1' }}>
                <span style={{ fontWeight: 600 }}>Full Interactive Ready:</span>
                <strong style={{ color: 'var(--brand-forest)' }}>280 ms on 2G</strong>
              </div>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: '1.4' }}>
              🛡️ Local IndexedDB caching maintains the full corridor ledger offline once fetched.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="owner-cta-banner" style={{ marginTop: '0' }}>
        <div className="cta-text-group">
          <div className="cta-icon-box" aria-hidden="true">
            🏔️
          </div>
          <div>
            <h3 className="cta-heading">
              Clear intelligence saves journeys across the hill country.
            </h3>
            <p className="cta-subtext">
              Access the real-time disruption stream or explore how StaySignal LK bridges the gap between fragmented government notices and live travel realities.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/notices" className="btn-cta-post">
            📋 Browse Live Notices
          </Link>
          <Link to="/problem" className="btn-emergency" style={{ fontSize: '14px' }}>
            📖 Read The Problem
          </Link>
        </div>
      </section>
    </div>
  );
}
