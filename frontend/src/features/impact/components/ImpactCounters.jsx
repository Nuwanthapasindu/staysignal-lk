import React, { useState, useEffect } from 'react';
import { fetchImpactStats } from '../api/impactApi';

export default function ImpactCounters() {
  const [stats, setStats] = useState({ staysReporting: 0, townsAffected: 0, guestsWarned: 0, resolvedToday: 0 });

  useEffect(() => {
    fetchImpactStats()
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  return (
    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ color: 'var(--brand-danger, #d9381e)' }}>●</span> {stats.staysReporting} stays reporting
      </span>
      <span>•</span>
      <span>{stats.townsAffected} towns affected</span>
      <span>•</span>
      <span>{stats.guestsWarned} guests warned today</span>
      {stats.resolvedToday > 0 && (
        <>
          <span>•</span>
          <span style={{ color: 'var(--brand-forest, #2b4522)', fontWeight: 500 }}>
            {stats.resolvedToday} notices resolved
          </span>
        </>
      )}
    </div>
  );
}
