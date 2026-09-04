import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { NoticeCard, EmptyNotices, NoticeSkeleton } from '../../notices';
import { fetchNotices } from '../../notices/api/noticesApi';
import { fetchTowns } from '../api/geographyApi';

const CORRIDOR_DETAILS = {
  ella: {
    name: 'Ella & Badulla Valley',
    corridors: ['A23 Wellawaya-Ella Passage', 'B360 Passara Ridge', 'Bandarawela-Poonagala Bypass'],
    district: 'Badulla District',
    elevation: '1,041 m',
    activeMonitors: 5,
    weather: 'Intermittent Mists · Wet Asphalt',
    contacts: {
      police: '057 222 8222',
      rda: '057 222 2450',
      dmc: '077 395 7890',
    },
  },
  haputale: {
    name: 'Haputale & Beragala Pass',
    corridors: ['A4 Beragala-Haputale Incline', 'Dambatenna Tea Road', 'Lemastota Valley'],
    district: 'Badulla District',
    elevation: '1,430 m',
    activeMonitors: 3,
    weather: 'Heavy Cloud Cover · Visibility < 10m',
    contacts: {
      police: '057 226 8222',
      rda: '057 226 8100',
      dmc: '077 395 7890',
    },
  },
  'nuwara-eliya': {
    name: 'Nuwara Eliya & Ramboda Pass',
    corridors: ['A5 Gampola-Ramboda Pass', 'Hakgala-Welimada Route', 'Radella Shortcut'],
    district: 'Nuwara Eliya District',
    elevation: '1,868 m',
    activeMonitors: 4,
    weather: 'Persistent Drizzle · Fog Hazard',
    contacts: {
      police: '052 222 2222',
      rda: '052 222 2444',
      dmc: '077 395 7891',
    },
  },
  hatton: {
    name: "Hatton & Adam's Peak Base",
    corridors: ["B149 Ginigathena-Hatton", "Nallathanniya Pilgrim Route", "Maskeliya Dam Road"],
    district: 'Nuwara Eliya District',
    elevation: '1,271 m',
    activeMonitors: 2,
    weather: 'Light Rain · Clear Main Roads',
    contacts: {
      police: '051 222 2222',
      rda: '051 222 2400',
      dmc: '077 395 7891',
    },
  },
  meemure: {
    name: 'Knuckles & Heen Ganga Basin',
    corridors: ['Hunnasgiriya-Meemure Track', 'Corbet’s Gap Pass', 'Heen Ganga Ford'],
    district: 'Kandy District',
    elevation: '400 - 1,200 m',
    activeMonitors: 2,
    weather: 'High River Level · 4x4 Only',
    contacts: {
      police: '081 237 4222',
      rda: '081 237 4100',
      dmc: '077 395 7892',
    },
  },
  'arugam-bay': {
    name: 'Arugam Bay & Panama Corridor',
    corridors: ['A4 Pottuvil-Panama Coastal Road', 'Kudumbigala Sanctuary Track', 'Okanda Link'],
    district: 'Ampara District',
    elevation: '15 m',
    activeMonitors: 2,
    weather: 'Monsoon Swell · Lagoon High Tide',
    contacts: {
      police: '063 224 8222',
      rda: '063 224 8100',
      dmc: '077 395 7893',
    },
  },
  galle: {
    name: 'Southern Coastal Belt & Expressway',
    corridors: ['E01 Southern Expressway Interchange', 'A2 Coastal Highway', 'Galle Fort Circuit'],
    district: 'Galle District',
    elevation: '12 m',
    activeMonitors: 1,
    weather: 'Sunny · Open Coastal Flow',
    contacts: {
      police: '091 222 2222',
      rda: '091 222 2400',
      dmc: '077 395 7894',
    },
  },
  mirissa: {
    name: 'Mirissa Bay & Weligama Pass',
    corridors: ['A2 Weligama-Mirissa Coastal Link', 'Bandaramulla Pass', 'Matara Link'],
    district: 'Matara District',
    elevation: '10 m',
    activeMonitors: 0,
    weather: 'Calm · Standard Access',
    contacts: {
      police: '041 225 0222',
      rda: '041 225 0100',
      dmc: '077 395 7895',
    },
  },
};

export default function TownPage() {
  const { slug = 'ella' } = useParams();
  const navigate = useNavigate();

  const [towns, setTowns] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const cleanSlug = slug.toLowerCase();
  const corridorMeta = CORRIDOR_DETAILS[cleanSlug] || {
    name: `${slug.toUpperCase()} Corridor`,
    corridors: ['Main Valley Pass'],
    district: 'Central Highlands',
    elevation: '1,000 m',
    activeMonitors: 1,
    weather: 'Standard Operational State',
    contacts: { police: '119', rda: '1968', dmc: '117' },
  };

  useEffect(() => {
    fetchTowns()
      .then((data) => {
        if (Array.isArray(data)) setTowns(data);
      })
      .catch((err) => console.warn('Could not fetch towns:', err));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchNotices({ town: cleanSlug })
      .then((res) => {
        if (res && Array.isArray(res.notices)) {
          setNotices(res.notices);
        } else if (Array.isArray(res)) {
          setNotices(res);
        }
      })
      .catch((err) => console.warn('Error fetching town notices:', err))
      .finally(() => setLoading(false));
  }, [cleanSlug]);

  return (
    <div className="page-wrapper">
      {/* Top Corridor Switcher */}
      <div style={{ paddingTop: '24px', marginBottom: '20px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
          SELECT MONITORED CORRIDOR:
        </div>
        <div className="pill-group">
          {(towns.length > 0
            ? towns
            : [
                { id: 'ella', name: 'Ella' },
                { id: 'haputale', name: 'Haputale' },
                { id: 'nuwara-eliya', name: 'Nuwara Eliya' },
                { id: 'hatton', name: 'Hatton' },
                { id: 'meemure', name: 'Meemure' },
                { id: 'arugam-bay', name: 'Arugam Bay' },
                { id: 'galle', name: 'Galle' },
                { id: 'mirissa', name: 'Mirissa' },
              ]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              className={`filter-pill ${cleanSlug === t.id.toLowerCase() ? 'active' : ''}`}
              onClick={() => navigate(`/towns/${t.id.toLowerCase()}`)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Corridor Hero Header */}
      <section className="ledger-hero" style={{ padding: '16px 0 24px 0' }}>
        <div className="hero-text-block">
          <div className="hero-tracker">
            <span aria-hidden="true">📍</span>
            <span>{corridorMeta.district} · {corridorMeta.elevation} Elevation</span>
          </div>
          <h1 className="hero-title">{corridorMeta.name}</h1>
          <p className="hero-description">
            Monitored passage conditions, bypass detours, and live operational signals logged directly by local accommodation hosts and transport dispatchers.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
            {corridorMeta.corridors.map((c, i) => (
              <span key={i} className="corridor-tag" style={{ backgroundColor: '#FAF8F2', padding: '4px 10px', borderRadius: '4px', border: '1px solid #EFEBE1' }}>
                🛣️ {c}
              </span>
            ))}
          </div>
        </div>

        {/* Emergency & Weather Box */}
        <div className="metrics-summary-card" style={{ minWidth: '280px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Corridor Conditions
          </div>
          <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--brand-forest)' }}>
            ☁️ {corridorMeta.weather}
          </div>

          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #EFEBE1', fontSize: '12px' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Local Hotlines:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: 'var(--text-secondary)' }}>
              <div>👮 Police Dispatch: <strong>{corridorMeta.contacts.police}</strong></div>
              <div>🚜 RDA Maintenance: <strong>{corridorMeta.contacts.rda}</strong></div>
              <div>🚨 DMC Coordinator: <strong>{corridorMeta.contacts.dmc}</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Live Notices for this Town */}
      <section style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--brand-forest)' }}>
              Active Corridor Notices ({notices.length})
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Real-time dispatches from properties and checkpoints in this sector.
            </p>
          </div>

          <Link to="/post" className="btn-report-disruption">
            ✍️ Post Update for {corridorMeta.name}
          </Link>
        </div>

        {loading ? (
          <NoticeSkeleton count={3} />
        ) : notices.length === 0 ? (
          <EmptyNotices
            isTownEmpty={true}
            townName={corridorMeta.name}
            onResetFilters={() => navigate('/notices')}
          />
        ) : (
          <div className="notices-grid">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
