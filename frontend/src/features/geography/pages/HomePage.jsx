import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NoticeCard } from '../../notices';
import { fetchNotices } from '../../notices/api/noticesApi';
import { ImpactCounters, ImpactStories, ImpactProblemContext } from '../../impact';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchTown, setSearchTown] = useState('');
  const [featuredNotices, setFeaturedNotices] = useState([]);
  const [liveNotices, setLiveNotices] = useState([]);
  const [filterTown, setFilterTown] = useState('all');

  useEffect(() => {
    fetchNotices({ sort: 'newest' })
      .then((res) => {
        const list = res?.notices || res || [];
        setFeaturedNotices(list.slice(0, 3));
        setLiveNotices(list.slice(0, 6));
      })
      .catch((err) => console.warn('Error fetching homepage notices:', err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTown.trim()) {
      navigate(`/notices?q=${encodeURIComponent(searchTown.trim())}`);
    } else {
      navigate('/notices');
    }
  };

  const filteredLive = filterTown === 'all' 
    ? liveNotices 
    : liveNotices.filter((n) => n.town.toLowerCase() === filterTown.toLowerCase() || n.status === filterTown);

  return (
    <div className="page-wrapper">
      {/* Hero Section: Split on Desktop, Stacked on Mobile */}
      <section className="ledger-hero" style={{ padding: '32px 0 40px 0', alignItems: 'center' }}>
        <div className="hero-text-block" style={{ maxWidth: '600px' }}>
          <div className="hero-tracker">
            <span>SRI LANKA · HILL COUNTRY &amp; COAST · LIVE STAY STATUS</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5.5vw, 46px)', lineHeight: '1.12' }}>
            Is the road to Ella still open?
          </h1>
          <p className="hero-description" style={{ fontSize: '16px', margin: '14px 0 20px 0' }}>
            Guest-houses post road closures, landslides, water and power cuts. Travellers see it before they leave Kandy — not after the van turns back at Wellawaya.
          </p>

          {/* Quick Town Search Box */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '480px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="search-input"
              style={{ flex: 1, minWidth: '220px', height: '46px' }}
              placeholder="Search a town — Ella, Haputale, Arugam Bay..."
              value={searchTown}
              onChange={(e) => setSearchTown(e.target.value)}
            />
            <button type="submit" className="btn-report-disruption" style={{ height: '46px', padding: '0 20px' }}>
              Check notices
            </button>
          </form>

          <div style={{ display: 'flex', gap: '16px', fontSize: '13.5px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <Link to="/problem" style={{ color: 'var(--brand-forest)', fontWeight: 600, textDecoration: 'underline' }}>
              Read the problem we are solving
            </Link>
            <Link to="/owner" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              I run a stay →
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span>● 12 stays reporting</span>
            <span>•</span>
            <span>4 towns affected</span>
            <span>•</span>
            <span>86 guests warned today</span>
            <ImpactCounters />
          </div>
        </div>

        {/* Featured Live Notice Cards on Hero Right */}
        <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {featuredNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} compact={true} />
          ))}
        </div>
      </section>

      {/* Section: Why this exists */}
      <section style={{ margin: '48px 0 56px 0' }}>
        <div style={{ marginBottom: '24px' }}>
          <div className="hero-tracker">FIELD REALITIES</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--brand-forest)', marginBottom: '8px' }}>
            Why this exists
          </h2>
          <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Chat groups collapse into panic, social platforms hide crucial time-sensitive local notices beneath algorithms, and international booking engines have zero fields for a washed-out tea-estate culvert.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="post-form-card" style={{ padding: '24px' }}>
            <span style={{ fontSize: '20px', display: 'block', marginBottom: '12px' }}>👤</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>
              Owner in Ella after a slide
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '16px' }}>
              WhatsApp group chats flood with 400 conflicting messages within thirty minutes: rumours of military diversions, old photos from 2021, and tourists asking about vegan rotis. The host can't reach their 6 incoming arrivals directly because cell towers drop to 2G.
            </p>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--brand-forest)', paddingTop: '10px', borderTop: '1px solid #EFEBE1' }}>
              The fix: Single verified ledger state
            </div>
          </div>

          <div className="post-form-card" style={{ padding: '24px' }}>
            <span style={{ fontSize: '20px', display: 'block', marginBottom: '12px' }}>🚌</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>
              Couple on the night bus from Colombo
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '16px' }}>
              Arriving at 4:30 AM at Bandarawela junction in pitch darkness with heavy rain. Instead of negotiating with predatory tuk-tuk drivers claiming all valleys are blocked, they open this link and see the homestay flagged the bypass route clear 3 hours earlier.
            </p>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--brand-forest)', paddingTop: '10px', borderTop: '1px solid #EFEBE1' }}>
              The fix: Clear arrival coordinates before departure
            </div>
          </div>

          <div className="post-form-card" style={{ padding: '24px' }}>
            <span style={{ fontSize: '20px', display: 'block', marginBottom: '12px' }}>🏡</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>
              Homestay in Meemure with unsafe bridge
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '16px' }}>
              When the Heen Ganga swells across the wooden suspension bridge, regular OTAs will penalize the host for cancellations or let guests attempt dangerous unpaved jungle tracks. A simple operational ledger protects both human safety and small family livelihoods.
            </p>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--brand-forest)', paddingTop: '10px', borderTop: '1px solid #EFEBE1' }}>
              The fix: Direct phone dispatch, no automated penalties
            </div>
          </div>
        </div>
        <ImpactProblemContext />
        <ImpactStories />
      </section>

      {/* Section: Live right now */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div className="hero-tracker">CORRIDOR STATUS FEED</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--brand-forest)', marginBottom: '4px' }}>
              Live right now
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              Updated continuously by verified staykeepers &amp; local transport coordinators.
            </p>
          </div>

          <div className="pill-group">
            {[
              { id: 'all', label: 'All (18)' },
              { id: 'ella', label: 'Ella' },
              { id: 'haputale', label: 'Haputale' },
              { id: 'nuwara-eliya', label: 'Nuwara Eliya' },
              { id: 'arugam-bay', label: 'Arugam Bay' },
              { id: 'open', label: 'Open only' },
              { id: 'disrupted', label: 'Disrupted only' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                className={`filter-pill ${filterTown === p.id ? 'active' : ''}`}
                onClick={() => setFilterTown(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="notices-grid">
          {filteredLive.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      </section>

      {/* Bottom CTA for Accommodation Managers */}
      <section className="owner-cta-banner">
        <div className="cta-text-group">
          <div className="cta-icon-box" aria-hidden="true">
            🏨
          </div>
          <div>
            <h3 className="cta-heading">
              Are you an accommodation manager in Sri Lanka?
            </h3>
            <p className="cta-subtext">
              Add your property to the ledger. Updates take less than 30 seconds and require no login password.
            </p>
          </div>
        </div>
        <Link to="/owner" className="btn-cta-post">
          Verify your desk number
        </Link>
      </section>

      <p style={{ textAlign: 'center', fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '24px' }}>
        <strong>Field Note:</strong> StaySignal LK is a community board, not an official DMC or police feed. Always call the stay directly prior to starting hill-country ascents.
      </p>
    </div>
  );
}
