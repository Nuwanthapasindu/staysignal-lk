import React from 'react';
import { Link } from 'react-router-dom';

export default function AlternativesList({
  alternatives = [],
  townName,
  onCallClick,
}) {
  if (!alternatives || alternatives.length === 0) {
    return (
      <section className="alternatives-section" aria-label="Open stays nearby">
        <div className="alternatives-header">
          <h3 className="alternatives-title">
            Open Stays Nearby in {townName || 'this corridor'}
          </h3>
          <span className="alternatives-badge" style={{ backgroundColor: '#FEF2F2', color: '#991B1B', borderColor: '#FECACA' }}>
            0 Open Stays
          </span>
        </div>
        <div className="empty-alternatives-box">
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            No verified open stays currently reporting in {townName || 'this town'}.
          </p>
          <p style={{ fontSize: '13px' }}>
            Check adjacent corridors or contact the Divisional Secretariat Emergency Desk for temporary relocation shelters.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="alternatives-section" aria-label="Open stays nearby">
      <div className="alternatives-header">
        <h3 className="alternatives-title">
          Open Stays Nearby in {townName || 'this corridor'}
        </h3>
        <span className="alternatives-badge">
          ● {alternatives.length} Available Option{alternatives.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="alternatives-grid">
        {alternatives.map((stay) => (
          <div key={stay.id} className="alternative-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <span className="corridor-tag">{stay.corridor}</span>
              <span className="status-badge open">
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#16A34A',
                  }}
                />
                OPEN & CLEAR
              </span>
            </div>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 600, marginBottom: '6px' }}>
              <Link to={`/notices/${stay.id}`} style={{ color: 'inherit' }}>
                {stay.title}
              </Link>
            </h4>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', flexGrow: 1 }}>
              {stay.headline || stay.description}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid #EFEBE1',
                fontSize: '12px',
                marginTop: 'auto',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>
                🛡️ {stay.verifiedBy || 'Verified Host'}
              </span>

              {stay.contactNumber && (
                <button
                  type="button"
                  className="call-stay-btn"
                  onClick={() => {
                    if (onCallClick) {
                      onCallClick(stay);
                    } else {
                      window.location.href = `tel:${stay.contactNumber}`;
                    }
                  }}
                >
                  📞 {stay.contactNumber}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
