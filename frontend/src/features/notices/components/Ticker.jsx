import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Ticker({ tickerData }) {
  const items = tickerData?.items || [
    {
      id: 'default-alert',
      type: 'URGENT',
      tag: 'DISPATCH',
      town: 'Ella Passage',
      message: 'Ella Passage: Wellawaya road closed · 3 stays disrupted · updated 14 min ago',
    },
  ];

  const counts = tickerData?.counts || {
    monitoredDesks: 18,
    meshLatency: '99.4%',
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[currentIndex] || items[0];
  const isUrgent = currentItem?.type === 'URGENT';

  return (
    <aside className="ticker-banner" aria-label="Live corridor dispatch ticker">
      <div className="ticker-inner">
        <div className="ticker-content">
          <span className={`ticker-badge ${isUrgent ? 'urgent' : 'dispatch'}`}>
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isUrgent ? '#B91C1C' : '#92400E',
              }}
            />
            {currentItem?.tag || (isUrgent ? 'URGENT' : 'DISPATCH')}
          </span>

          <Link
            to={currentItem?.id ? `/notices/${currentItem.id}` : '/notices'}
            className="ticker-text"
            title={currentItem?.message}
          >
            {currentItem?.message}
          </Link>
        </div>

        <div className="ticker-telemetry">
          <span className="ticker-telemetry-item">
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#16A34A',
              }}
            />
            {counts.monitoredDesks || 18} Monitored Desks Online
          </span>
          <span className="ticker-telemetry-item" style={{ opacity: 0.8 }}>
            Field Mesh {counts.meshLatency || '99.4%'} Latency-Safe
          </span>
        </div>
      </div>
    </aside>
  );
}
