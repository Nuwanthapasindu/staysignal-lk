import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NoticeCard } from '../../notices';

export default function OwnerDeskPage() {
  const [currentStatus, setCurrentStatus] = useState('disrupted');
  const [generatorState, setGeneratorState] = useState('6:00 PM - 10:00 PM Active');
  const [waterState, setWaterState] = useState('Gravity Feed 3000L Reserve');
  const [connectivityState, setConnectivityState] = useState('Dialog 4G + Starlink Relay Active');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const mockOwnerNotice = {
    id: 'notice-zion-view',
    title: 'Zion View',
    town: 'ella',
    townName: 'Ella',
    corridor: 'Ella Valley · A23 Corridor',
    issue: 'road_closed',
    status: currentStatus,
    headline: currentStatus === 'disrupted' 
      ? 'Road closed at 14th Mile Post culvert' 
      : currentStatus === 'caution'
      ? 'Single lane traffic · 4x4 pickup shuttle operating'
      : 'Access clear · Wellawaya-Ella route fully passable',
    description: currentStatus === 'disrupted'
      ? 'Culvert repair at 14th Mile Post due to heavy runoff. Light 4x4 pickup shuttle active from rail station.'
      : 'Road passage inspected and safe for arriving guests.',
    bypassAdvice: '4x4 pickup shuttle active from Bandarawela rail depot for verified guests.',
    utilities: {
      generatorStatus: generatorState,
      waterStatus: waterState,
      connectivityStatus: connectivityState,
    },
    contactNumber: '077 412 8901',
    verifiedBy: 'Estate Dispatch',
    verifiedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleQuickStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="page-wrapper">
      {/* Top Header */}
      <section className="ledger-hero" style={{ paddingBottom: '20px' }}>
        <div className="hero-text-block">
          <div className="hero-tracker">
            <span aria-hidden="true">🔑</span>
            <span>ACCOMMODATION &amp; TRANSPORT DESK</span>
          </div>
          <h1 className="hero-title">Host Operations Desk</h1>
          <p className="hero-description">
            Manage your property's real-time corridor signal, update generator hours, and broadcast direct bypass instructions to incoming guests and transfer vans.
          </p>
        </div>

        {/* Host Verified SIM Badge */}
        <div className="metrics-summary-card" style={{ minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot" />
            <strong style={{ fontSize: '13px', color: 'var(--brand-forest)' }}>077 412 8901</strong>
            <span style={{ fontSize: '11px', backgroundColor: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
              VERIFIED SIM
            </span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Property: <strong>Zion View (Ella)</strong> · Desk #4402
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Last broadcast synchronized 4 min ago
          </div>
        </div>
      </section>

      {savedSuccess && (
        <div style={{ backgroundColor: '#DCFCE7', border: '1px solid #BBF7D0', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13.5px', fontWeight: 600 }}>
          ✓ Signal broadcast updated! Synchronized across highland mesh nodes.
        </div>
      )}

      {/* Main Grid: Left Controls, Right Active Card Preview */}
      <div className="post-notice-layout">
        <div className="post-form-card">
          {/* Quick Status Tier Buttons */}
          <div style={{ marginBottom: '28px' }}>
            <h3 className="form-section-title">
              <span>🚦</span>
              <span>1-Click Live Status Switcher</span>
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Instantly toggle your public corridor status. Incoming guests will see this immediately on the live ledger.
            </p>

            <div className="status-radios-grid">
              <div
                className={`status-radio-card ${currentStatus === 'open' ? 'selected open' : ''}`}
                onClick={() => handleQuickStatusChange('open')}
              >
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Open &amp; Clear</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Normal Passage</div>
                </div>
              </div>

              <div
                className={`status-radio-card ${currentStatus === 'caution' ? 'selected caution' : ''}`}
                onClick={() => handleQuickStatusChange('caution')}
              >
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D97706' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Caution</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mist / Restricted</div>
                </div>
              </div>

              <div
                className={`status-radio-card ${currentStatus === 'disrupted' ? 'selected disrupted' : ''}`}
                onClick={() => handleQuickStatusChange('disrupted')}
              >
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D93829' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Disrupted</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Culvert / Slip</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Utility Toggles */}
          <div style={{ marginBottom: '28px' }}>
            <h3 className="form-section-title">
              <span>⚡</span>
              <span>Quick Utility Schedules</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '12.5px' }}>Generator Availability Window</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    '6:00 PM - 10:00 PM Active',
                    '24/7 Solar Grid Stable',
                    'Standby Backup Only',
                  ].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`filter-pill ${generatorState === val ? 'active' : ''}`}
                      onClick={() => {
                        setGeneratorState(val);
                        setSavedSuccess(true);
                        setTimeout(() => setSavedSuccess(false), 2500);
                      }}
                      style={{ fontSize: '12px' }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '12.5px' }}>Drinking &amp; Storage Water Status</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    'Gravity Feed 3000L Reserve',
                    'Normal Municipal Flow',
                    'Backup Bowser En Route',
                  ].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`filter-pill ${waterState === val ? 'active' : ''}`}
                      onClick={() => {
                        setWaterState(val);
                        setSavedSuccess(true);
                        setTimeout(() => setSavedSuccess(false), 2500);
                      }}
                      style={{ fontSize: '12px' }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '12.5px' }}>Connectivity Relay</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    'Dialog 4G + Starlink Relay Active',
                    'SLT Fibre Operational',
                    '2G GSM Only',
                  ].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`filter-pill ${connectivityState === val ? 'active' : ''}`}
                      onClick={() => {
                        setConnectivityState(val);
                        setSavedSuccess(true);
                        setTimeout(() => setSavedSuccess(false), 2500);
                      }}
                      style={{ fontSize: '12px' }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <Link to="/post" className="btn-report-disruption">
              ✍️ Post New Detailed Notice
            </Link>
            <Link to="/notices" className="btn-emergency">
              📋 View Public Ledger Feed
            </Link>
          </div>
        </div>

        {/* Right Preview Box */}
        <div className="preview-sticky-box">
          <div className="preview-box-header">
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Active Public Broadcast
            </span>
            <span style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 700 }}>
              LIVE
            </span>
          </div>

          <NoticeCard notice={mockOwnerNotice} />

          {/* Host Telemetry Metrics */}
          <div className="post-form-card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Today's Field Impact
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
              <div style={{ backgroundColor: '#FAF8F2', padding: '10px', borderRadius: '6px' }}>
                <strong style={{ fontSize: '18px', color: 'var(--brand-forest)' }}>142</strong>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Ledger Views</div>
              </div>
              <div style={{ backgroundColor: '#FAF8F2', padding: '10px', borderRadius: '6px' }}>
                <strong style={{ fontSize: '18px', color: '#166534' }}>3</strong>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Vans Rerouted</div>
              </div>
              <div style={{ backgroundColor: '#FAF8F2', padding: '10px', borderRadius: '6px' }}>
                <strong style={{ fontSize: '18px', color: 'var(--brand-forest)' }}>0</strong>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Cancellations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
