import React from 'react';
import { Link } from 'react-router-dom';

export default function ProblemPage() {
  return (
    <div className="page-wrapper">
      {/* Top Header */}
      <section className="ledger-hero" style={{ padding: '24px 0 32px 0' }}>
        <div className="hero-text-block" style={{ maxWidth: '900px' }}>
          <div className="hero-tracker">
            <span aria-hidden="true">📊</span>
            <span>FIELD METRICS &amp; COMMUNITY VALUE</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: '38px', marginBottom: '16px' }}>
            The human and economic cost of timely corridor intelligence.
          </h1>
          <p className="hero-description" style={{ fontSize: '16px', maxWidth: '820px' }}>
            When a single culvert fails on the Ella-Wellawaya passage, hundreds of small family homestays, driver cooperatives, and independent travellers bear the cost of misinformation. Here is what happens when signals are clear.
          </p>

          <div style={{ display: 'flex', gap: '20px', marginTop: '16px', fontSize: '12.5px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span><strong>Audit Period:</strong> SW Monsoon &amp; Highland Inter-Monsoon 2023–2024</span>
            <span>•</span>
            <span><strong>Verification Method:</strong> Divisional Dispatch Ledger Relocation</span>
            <span>•</span>
            <span><strong>Independent Field Stays:</strong> 340+ Registered Desks</span>
          </div>
        </div>
      </section>

      {/* 4 Performance Metric Cards */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
            VERIFIED EMPIRICAL DIVIDEND · Highland Transit &amp; Hospitality Performance
          </span>
          <span style={{ fontSize: '11.5px', color: '#166534', fontWeight: 600 }}>● Live Ground Telemetry</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {/* Metric 1 */}
          <div className="post-form-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                CORRIDOR RELAY
              </span>
              <span aria-hidden="true">⏱️</span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, color: 'var(--brand-forest)', lineHeight: 1.1 }}>
              4.5 Hours
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '4px' }}>
              SAVED PER TRANSIT
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
              Average delay prevented per transfer van by taking the Bandarawela-Poonagala bypass before descending into blocked gorges.
            </p>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #EFEBE1' }}>
              📍 A23 / Poonagala Valley Pass
            </div>
          </div>

          {/* Metric 2 */}
          <div className="post-form-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                HOMESTAY RETENTION
              </span>
              <span aria-hidden="true">🏡</span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, color: 'var(--brand-forest)', lineHeight: 1.1 }}>
              92%
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '4px' }}>
              HOST RETENTION
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
              Homestays avoid panic cancellations and automated OTA penalties by providing proactive, human-verified guest pickup plans.
            </p>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #EFEBE1' }}>
              🛡️ Zero No-Show Penalties
            </div>
          </div>

          {/* Metric 3 */}
          <div className="post-form-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                GEOGRAPHIC EXPEDITION
              </span>
              <span aria-hidden="true">🗺️</span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, color: 'var(--brand-forest)', lineHeight: 1.1 }}>
              18
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '4px' }}>
              MONITORED PASSES
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
              Active coverage from Ramboda Pass, Passara Road, Heen Ganga ford, to Panama coastal lagoon roads and river spillways.
            </p>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #EFEBE1' }}>
              🏔️ 4 Highland Provinces Covered
            </div>
          </div>

          {/* Metric 4 */}
          <div className="post-form-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                HILL-COUNTRY INFRASTRUCTURE
              </span>
              <span aria-hidden="true">📶</span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, color: 'var(--brand-forest)', lineHeight: 1.1 }}>
              14kb
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginTop: '4px' }}>
              LIGHTWEIGHT MESH
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
              Ultra-low packet delivery functioning reliably across 100% of tea estate 2G cell tower drop zones and intermittent generator lines.
            </p>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #EFEBE1' }}>
              ⚡ Zero Heavy Scripts or Trackers
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Situational Analysis */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 32px auto' }}>
          <div className="hero-tracker" style={{ justifyContent: 'center' }}>COMPARATIVE SITUATIONAL ANALYSIS</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--brand-forest)', marginBottom: '8px' }}>
            The Reality of Highland Transit
          </h2>
          <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>
            How verified local corridor logs transform chaotic mountain travel into calm, coordinated operations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {/* Without StaySignal LK */}
          <div className="post-form-card" style={{ padding: '28px', backgroundColor: '#FFFDFD', border: '1px solid #FCDAD7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '11.5px', fontWeight: 700 }}>
                THE RUMOUR CYCLE
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#B91C1C' }}>Without StaySignal LK</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#991B1B', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span>❌</span>
                  <span>False social media panic shuts down intact towns</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '22px', lineHeight: '1.5' }}>
                  Unverified viral TikTok clips of old 2021 landslides cause blanket cancellations in Ella, even when bypasses and town centers remain entirely dry and open.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#991B1B', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span>❌</span>
                  <span>Tourists stranded at unlit junctions at 3:00 AM</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '22px', lineHeight: '1.5' }}>
                  Travellers disembark from late night night-mail trains at Nanu Oya only to discover roads up to Horton Plains are blocked; leaving families stranded in cold drizzle with zero transport options.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#991B1B', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span>❌</span>
                  <span>Predatory tuk-tuk price gouging on unverified rumors</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '22px', lineHeight: '1.5' }}>
                  Unscrupulous middlemen charge 400% inflated fares claiming "the entire A5 is under mud," forcing travellers onto exorbitant detours that were never required.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#991B1B', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span>❌</span>
                  <span>Stays lose entire weekly bookings due to vague headlines</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '22px', lineHeight: '1.5' }}>
                  Colombo newspapers print broad "Badulla District Alert", causing travellers to cancel bookings kilometres away in unaffected valleys, strangling modest family homestays.
                </p>
              </div>
            </div>
          </div>

          {/* With StaySignal LK */}
          <div className="post-form-card" style={{ padding: '28px', backgroundColor: '#F9FDFB', border: '1px solid #C8E6D3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '11.5px', fontWeight: 700 }}>
                THE FIELD LEDGER
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#166534' }}>With StaySignal LK</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#166534', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span>✔️</span>
                  <span>Pinpoint precision: "14th Mile Post blocked, walking transfer with host tractor available"</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '22px', lineHeight: '1.5' }}>
                  Exact GPS markers and estate ledger entries describe the real physical state. Foot luggage carried across a 20-meter culvert slip safely and predictably.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#166534', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span>✔️</span>
                  <span>Travellers adjust bus departures from Colombo before leaving</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '22px', lineHeight: '1.5' }}>
                  Clear 6:00 AM dispatch updates notify travellers before boarding at Bastian Mawatha station, shifting transit seamlessly to the scenic Kandy-Badulla mainline train.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#166534', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span>✔️</span>
                  <span>Verified local phone numbers provide instant host reassurance</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '22px', lineHeight: '1.5' }}>
                  Direct phone access to the tea factory superintendent and nearby divisional emergency coordinator eliminates middleman extortion and confirms actual road passability.
                </p>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#166534', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span>✔️</span>
                  <span>Local tourism livelihoods protected with truth</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '22px', lineHeight: '1.5' }}>
                  By providing granular corridor data, 14 guesthouses remain occupied while travellers safely circumvent localized slips using confirmed taxi escorts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Record #402 */}
      <section className="post-form-card" style={{ padding: '32px', marginBottom: '56px', backgroundColor: '#FAF8F2' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <div className="hero-tracker">FIELD CASE RECORD #402 · Nuwara Eliya District</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--brand-forest)', marginBottom: '12px' }}>
              "The Great November Monsoon at Ramboda Hairpins"
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              When 220mm of rainfall dropped over the Kotmale catchment in under six hours, two critical culverts collapsed below Ramboda Falls on the A5 highway. Within 30 minutes, false social media reports claimed the entirety of Nuwara Eliya was cut off with no provisions.
            </p>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
              Through StaySignal LK's lightweight mesh log, 14 independent guesthouses in the upper valley established an operational clearinghouse. Instead of canceling 180 international guests, hosts activated a coordinated generator rotation, shared fresh highland vegetable supply runs via the intact Gampola rail link, and organized 4x4 estate jeep shuttles.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div>
                <strong style={{ fontSize: '22px', color: 'var(--brand-forest)' }}>48 Hours</strong>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Clearance Duration</div>
              </div>
              <div>
                <strong style={{ fontSize: '22px', color: 'var(--brand-forest)' }}>180 Guests</strong>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Sheltered &amp; Fed</div>
              </div>
              <div>
                <strong style={{ fontSize: '22px', color: '#166534' }}>0 Injuries</strong>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Verified Safety</div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
              <span>Dispatch Transcript Excerpt</span>
              <span style={{ color: '#92400E' }}>24-NOV · 14:15</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ backgroundColor: '#FAF8F2', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontWeight: 700, color: '#163A29' }}>RAMBODA DESK · DISPATCH 09:</span>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
                  "Passage blocked at hairpins 4 &amp; 5. Road Development Authority heavy excavator en route from Gampolawela. Foot trail stable above waterfall."
                </p>
              </div>

              <div style={{ backgroundColor: '#FAF8F2', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontWeight: 700, color: '#163A29' }}>VALLEY GUESTHOUSE CO-OP:</span>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
                  "15 guests from Kandy transferred to Tea Estate Bungalow 3. Dinner shared with Glenloch kitchen. Diesel stocks adequate for 72 hrs."
                </p>
              </div>

              <div style={{ backgroundColor: '#FAF8F2', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontWeight: 700, color: '#163A29' }}>RDA SUB-INSPECTOR FEED:</span>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
                  "Single-track clearance projected 10:30 tomorrow. Essential supply vehicles granted priority passage."
                </p>
              </div>
            </div>

            <p style={{ fontSize: '11px', color: '#166534', marginTop: '12px', fontWeight: 600 }}>
              🛡️ All 180 guest itineraries safely concluded without hospitalizations or loss of belongings.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="owner-cta-banner" style={{ backgroundColor: 'var(--brand-forest)', color: '#FFFFFF', marginTop: '0' }}>
        <div className="cta-text-group">
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>
              CIVIC INFRASTRUCTURE FOR CEYLON ROADS
            </span>
            <h3 className="cta-heading" style={{ color: '#FFFFFF', fontSize: '24px', margin: '6px 0 8px 0' }}>
              Keep the mountain passages clear, accurate, and human.
            </h3>
            <p className="cta-subtext" style={{ color: '#E2ECE5', maxWidth: '640px' }}>
              StaySignal LK operates as an open-access field ledger built with tea-country hospitality operators, local driver associations, and transport desks. Help keep corridor intelligence accessible without subscription walls.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/notices" className="btn-emergency" style={{ backgroundColor: '#FFFFFF', color: 'var(--brand-forest)' }}>
            📋 View All Active Notices
          </Link>
          <Link to="/post" className="btn-report-disruption" style={{ backgroundColor: '#1E4D37', border: '1px solid #386B52' }}>
            ✍️ Post Field Dispatch
          </Link>
        </div>
      </section>
    </div>
  );
}
