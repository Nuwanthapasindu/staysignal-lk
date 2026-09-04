import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTourismDestination, resolveMediaUrl } from '../api/tourismApi';
import {
  Landmark,
  ShieldCheck,
  MapPin,
  Compass,
  Clock,
  PhoneCall,
  DollarSign,
  Check,
} from 'lucide-react';

const STATUS_STYLE = {
  open: { bg: '#e5f5ed', fg: '#166534', dot: '#4ade80', label: 'Published / Open' },
  caution: { bg: '#fef3c7', fg: '#92400e', dot: '#f59e0b', label: 'Caution / Advisory' },
  danger: { bg: '#fee2e2', fg: '#991b1b', dot: '#ef4444', label: 'Suspended' },
  draft: { bg: '#f1f5f9', fg: '#475569', dot: '#94a3b8', label: 'Draft' },
};

const REGULATION_LABELS = {
  plastics: 'Zero single-use plastics',
  drones: 'No drones — UAV ban enforced',
  frescoes: 'No photography in fresco galleries',
  hornets: 'Hornet quiet zones enforced',
  attire: 'Modest attire required at shrines',
  macaques: 'Do not feed wild macaques',
};

const hasText = (v) => typeof v === 'string' && v.trim().length > 0;

// A label / value line — renders nothing when the value is blank.
const Fact = ({ label, value }) =>
  hasText(value) ? (
    <div className="spec-item">
      <div className="spec-label">{label}</div>
      <div className="spec-value">{value}</div>
    </div>
  ) : null;

export default function TourismDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTourismDestination(id)
      .then((d) => !cancelled && setPlace(d || null))
      .catch(() => !cancelled && setPlace(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div className="page-container" style={{ padding: '48px 16px' }}>Loading destination…</div>;
  }
  if (!place) {
    return <div className="page-container" style={{ padding: '48px 16px' }}>Destination not found.</div>;
  }

  const status = STATUS_STYLE[place.status] || STATUS_STYLE.open;
  const images = Array.isArray(place.images) ? place.images : [];
  const regulations = place.regulations || {};
  const activeRegulations = Object.entries(REGULATION_LABELS).filter(([key]) => regulations[key]);
  const contacts = place.contacts || {};
  const contactRows = [
    { label: 'Tourist Police', value: contacts.touristPolice },
    { label: 'Regional Hospital', value: contacts.hospital },
    { label: 'Ambulance', value: contacts.ambulance },
  ].filter((c) => hasText(c.value));

  const facts = [
    { label: 'Category', value: place.category },
    { label: 'Province', value: place.province },
    { label: 'District', value: place.district },
    { label: 'Elevation', value: place.elevation },
    { label: 'GPS Coordinates', value: place.gps },
    { label: 'Access Corridor', value: place.corridor },
    {
      label: 'Trail Difficulty',
      value: place.difficulty ? place.difficulty[0].toUpperCase() + place.difficulty.slice(1) : '',
    },
    { label: 'Operating Hours', value: place.operatingHours },
    { label: 'Guide Requirement', value: place.guideRequirement },
  ].filter((f) => hasText(f.value));

  const tariffs = [
    { label: 'Foreign Visitor', value: place.foreignTariff },
    { label: 'Local Citizen', value: place.localTariff },
    { label: 'SAARC Regional', value: place.saarcTariff },
  ].filter((t) => hasText(t.value));

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-links">
          <Link to="/tourism" className="breadcrumb-link">Tourism Directory</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{place.name}</span>
        </div>
        {hasText(place.nodeId) && (
          <div className="badge-tag" style={{ color: '#166534', backgroundColor: '#e5f5ed', fontFamily: 'var(--font-mono)' }}>
            NODE: {place.nodeId}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="content-card" style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span className="badge-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: status.bg, color: status.fg }}>
            <span className="ticker-dot" style={{ backgroundColor: status.dot }}></span>
            {hasText(place.statusText) ? place.statusText : status.label}
          </span>
          {hasText(place.category) && (
            <span className="badge-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Landmark size={13} /> {place.category}
            </span>
          )}
          {hasText(place.province) && (
            <span className="badge-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={13} /> {place.district ? `${place.district}, ` : ''}{place.province}
            </span>
          )}
        </div>
        <h1 className="hero-title" style={{ color: 'var(--brand-green-deep)' }}>{place.name}</h1>
        {hasText(place.statusSub) && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{place.statusSub}</p>
        )}
        {hasText(place.smsSummary) && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', fontStyle: 'italic' }}>
            “{place.smsSummary}”
          </p>
        )}
      </div>

      {/* Site Photography */}
      {images.length > 0 && (
        <div className="content-card" style={{ marginTop: '16px' }}>
          <h2 className="content-card-title" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Landmark size={15} color="var(--brand-green-deep)" /> Site Photography
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {images.map((img, i) => (
              <a
                key={img._id || i}
                href={resolveMediaUrl(img.url)}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'block', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}
              >
                <img
                  src={resolveMediaUrl(img.url)}
                  alt={img.originalName || `${place.name} photo ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }}
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Quick Facts strip */}
      {facts.length > 0 && (
        <div className="spec-strip" style={{ marginTop: '16px' }}>
          <div className="spec-strip-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--brand-green-deep)', fontSize: '12.5px' }}>
              <Compass size={15} />
              <span>Registry Details</span>
            </div>
          </div>
          <div className="spec-grid cols-4">
            {facts.map((f) => (
              <Fact key={f.label} label={f.label} value={f.value} />
            ))}
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="public-content-layout">
        <div className="public-main-column">
          {/* Overview */}
          {hasText(place.overview) && (
            <div className="content-card">
              <h2 className="content-card-title" style={{ marginBottom: '12px' }}>Overview</h2>
              <div className="content-card-prose">
                {place.overview.split(/\n{2,}/).map((para, i) => (
                  <p key={i} style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Regulations */}
          {activeRegulations.length > 0 && (
            <div className="content-card">
              <h2 className="content-card-title" style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={15} color="var(--brand-green-deep)" /> Site Regulations &amp; Visitor Etiquette
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {activeRegulations.map(([key, label]) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      backgroundColor: 'var(--bg-surface-subtle)',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Check size={14} color="var(--brand-green-deep)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(hasText(place.overview) || activeRegulations.length > 0) ? null : (
            <div className="content-card">
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                No additional narrative recorded for this destination yet.
              </p>
            </div>
          )}
        </div>

        <div className="public-side-column">
          {/* Tariffs */}
          {tariffs.length > 0 && (
            <div className="content-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--brand-green-deep)', marginBottom: '12px' }}>
                <DollarSign size={16} /> Admission Tariffs
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tariffs.map((t) => (
                  <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t.label}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operating hours quick card */}
          {(hasText(place.operatingHours) || hasText(place.guideRequirement)) && (
            <div className="content-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--brand-green-deep)', marginBottom: '12px' }}>
                <Clock size={16} /> Visiting Information
              </div>
              {hasText(place.operatingHours) && (
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Hours:</strong> {place.operatingHours}
                </p>
              )}
              {hasText(place.guideRequirement) && (
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Guide:</strong> {place.guideRequirement}
                </p>
              )}
            </div>
          )}

          {/* Emergency contacts */}
          {contactRows.length > 0 && (
            <div className="content-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--brand-green-deep)', marginBottom: '12px' }}>
                <PhoneCall size={16} /> Emergency Contacts
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {contactRows.map((c) => (
                  <div
                    key={c.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      backgroundColor: 'var(--bg-surface-subtle)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.label}</span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', textAlign: 'right' }}>{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
