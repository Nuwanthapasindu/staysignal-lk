import React from 'react';

export default function NoticeSkeleton({ count = 6 }) {
  return (
    <div className="notices-grid" aria-busy="true" aria-label="Loading corridor ledger notices">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="skeleton-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="skeleton" style={{ width: '45%', height: '12px' }} />
            <div className="skeleton" style={{ width: '25%', height: '18px', borderRadius: '12px' }} />
          </div>

          <div className="skeleton" style={{ width: '65%', height: '22px', margin: '6px 0' }} />

          <div className="skeleton" style={{ width: '80%', height: '16px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '8px 0' }}>
            <div className="skeleton" style={{ width: '100%', height: '14px' }} />
            <div className="skeleton" style={{ width: '90%', height: '14px' }} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto',
              paddingTop: '10px',
              borderTop: '1px solid #EFEBE1',
            }}
          >
            <div className="skeleton" style={{ width: '35%', height: '14px' }} />
            <div className="skeleton" style={{ width: '20%', height: '14px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
