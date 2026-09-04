import React, { useState, useEffect } from 'react';
import { fetchImpactStories } from '../api/impactApi';

export default function ImpactStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImpactStories()
      .then(data => {
        setStories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stories:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Loading field stories...</div>;
  }

  const getIconForTitle = (title) => {
    if (title.toLowerCase().includes('owner')) return '👤';
    if (title.toLowerCase().includes('couple')) return '🚌';
    if (title.toLowerCase().includes('bridge')) return '🏡';
    return '📝';
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      {stories.map(story => (
        <div key={story._id || story.title} className="post-form-card" style={{ padding: '24px' }}>
          <span style={{ fontSize: '20px', display: 'block', marginBottom: '12px' }}>
            {getIconForTitle(story.title)}
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>
            {story.title}
          </h3>
          <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>
            "{story.headline}"
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '16px' }}>
            {story.content}
          </p>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--brand-forest)', paddingTop: '10px', borderTop: '1px solid #EFEBE1' }}>
            By {story.author}
          </div>
        </div>
      ))}
    </div>
  );
}
