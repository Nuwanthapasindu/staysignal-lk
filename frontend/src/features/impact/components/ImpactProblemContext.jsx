import React, { useState, useEffect } from 'react';
import { fetchImpactProblem } from '../api/impactApi';

export default function ImpactProblemContext() {
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    fetchImpactProblem()
      .then(data => setProblem(data))
      .catch(err => console.error('Error fetching problem details:', err));
  }, []);

  if (!problem) return null;

  return (
    <div style={{ marginBottom: '24px' }}>
      <div className="hero-tracker">{problem.context || 'FIELD REALITIES'}</div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--brand-forest)', marginBottom: '8px' }}>
        {problem.title}
      </h2>
      <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', maxWidth: '720px' }}>
        {problem.description}
      </p>
    </div>
  );
}
