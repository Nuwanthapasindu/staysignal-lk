import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTourismDestination } from '../api/tourismApi';
import { 
  Landmark, 
  ShieldCheck, 
  MapPin, 
  Download, 
  Headphones, 
  Phone, 
  Compass, 
  Flame, 
  AlertTriangle, 
  AlertCircle, 
  PhoneCall, 
  Route, 
  Waves, 
  Check, 
  Calendar, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { sigiriyaDetail } from '../data/tourismData';

const EMPTY = {
  specs: [],
  dossier: { title: '', badge: '', ref: '', paragraphs: [], highlights: [], gallery: [] },
  siteRules: [],
  corridorRadar: [],
  campAndStay: [],
  hotlines: [],
};

export default function TourismDetailPage() {
  const { id } = useParams();
  const [fetched, setFetched] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTourismDestination(id)
      .then((d) => !cancelled && setFetched(d || null))
      .catch(() => !cancelled && setFetched(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Merge the fetched record over a template so every section has data to render.
  const base = fetched || sigiriyaDetail;
  const place = {
    ...EMPTY,
    ...sigiriyaDetail,
    ...base,
    dossier: { ...EMPTY.dossier, ...(sigiriyaDetail.dossier || {}), ...(base.dossier || {}) },
  };

  if (loading) {
    return <div className="page-container" style={{ padding: '48px 16px' }}>Loading destination…</div>;
  }

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-links">
          <Link to="/" className="breadcrumb-link">Admin Portal</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <Link to="/admin/tourism" className="breadcrumb-link">Central Cultural Triangle</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{place.name}</span>
        </div>
        <div className="badge-tag" style={{ color: '#166534', backgroundColor: '#e5f5ed', fontFamily: 'var(--font-mono)' }}>
          {place.nodeId ? `NODE: ${place.nodeId}` : 'NODE'}
        </div>
      </div>

      {/* Header */}
      <div className="content-card" style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span className="badge-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Landmark size={13} /> UNESCO WORLD HERITAGE SITE #184
          </span>
          <span className="badge-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span className="ticker-dot pulse" style={{ backgroundColor: '#4ade80' }}></span>
            OPERATIONAL STATUS: OPEN &amp; UNOBSTRUCTED
          </span>
          <span className="badge-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Compass size={13} /> ELEVATION: 349M ASL
          </span>
        </div>
        <div className="hero-category-label">{place.subHeading}</div>
        <h1 className="hero-title" style={{ color: 'var(--brand-green-deep)' }}>{place.name}</h1>
      </div>

      {/* Quick Action Bar */}
      <div className="quick-action-bar">
        <Link to="/problem" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Route size={14} /> Check A6 Corridor Status
        </Link>

        <button 
          className="btn btn-primary" 
          onClick={() => alert('Downloading 2G Offline Ledger (6.2 MB)...')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={14} /> Download 2G Offline Ledger (6.2 MB)
        </button>

        <button 
          className="btn btn-secondary" 
          onClick={() => alert('Launching Sigiriya Audio Guide (English 42 min)...')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Headphones size={14} /> Audio Guide (English 42 min)
        </button>

        <a 
          href="tel:+94662286241" 
          className="btn btn-terracotta" 
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <PhoneCall size={14} /> Direct Ticket Desk: +94 66 228 6241
        </a>
      </div>

      {/* 4 Column Specification Strip */}
      <div className="spec-strip">
        <div className="spec-strip-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--brand-green-deep)', fontSize: '12.5px' }}>
            <Calendar size={15} />
            <span>Archaeological Registry Master Specifications</span>
          </div>
          <span className="badge-tag" style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
            Telemetry Node: LK-DWC-7702 • Real-time Sync
          </span>
        </div>

        <div className="spec-grid cols-4">
          {place.specs.map((item, index) => (
            <div key={index} className="spec-item">
              <div className="spec-label">{item.label}</div>
              <div className="spec-value">{item.value}</div>
              <div className="spec-sub">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="public-content-layout">
        {/* Left Main Column */}
        <div className="public-main-column">
          {/* Card 1: Dossier */}
          <div className="content-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge-tag" style={{ fontSize: '10.5px', color: 'var(--brand-green-deep)', backgroundColor: '#e5f5ed' }}>
                {place.dossier.badge}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {place.dossier.ref}
              </span>
            </div>

            <h2 className="content-card-title" style={{ marginBottom: '14px' }}>
              {place.dossier.title}
            </h2>

            <div className="content-card-prose">
              {place.dossier.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              {place.dossier.highlights.map((hl, i) => (
                <div key={i} style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--brand-green-deep)', marginBottom: '4px' }}>
                    {hl.title}
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Card 2: Site Rules & Regulations */}
          <div className="content-card">
            <h2 className="content-card-title" style={{ marginBottom: '16px' }}>
              Statutory Archaeological Regulations & Visitor Etiquette
            </h2>

            <div className="rules-quadrants-grid">
              {place.siteRules.map((rule, idx) => (
                <div key={idx} className={`rule-quadrant ${rule.variant || ''}`}>
                  <div className="quadrant-header">
                    <span className="quadrant-title" style={{ fontSize: '12px' }}>{rule.title}</span>
                    {rule.badge && (
                      <span className="badge-tag" style={{ fontSize: '9px' }}>
                        {rule.badge}
                      </span>
                    )}
                  </div>

                  {rule.desc ? (
                    <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {rule.desc}
                    </p>
                  ) : (
                    <ul className="rule-list">
                      {rule.rules?.map((item, i) => (
                        <li key={i} className="rule-item" style={{ fontSize: '11.5px' }}>
                          <strong>{item.label}</strong> {item.desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="public-side-column">
          {/* Card 1: Corridor Radar */}
          <div className="content-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--brand-green-deep)' }}>
                <Route size={16} /> Corridor Radar
              </div>
              <span className="badge-tag" style={{ backgroundColor: '#e5f5ed', color: '#166534' }}>
                All Clear
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {place.corridorRadar.map((corridor, i) => (
                <div key={i} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--text-primary)' }}>{corridor.route}</span>
                    <span className="badge-tag" style={{ fontSize: '9.5px', backgroundColor: '#e5f5ed', color: '#166534' }}>{corridor.status}</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {corridor.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Camp & Stay Nearby */}
          <div className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '14px' }}>
              <Compass size={16} color="var(--brand-green-deep)" /> Camp & Staging Nearby
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {place.campAndStay.map((camp, i) => (
                <div key={i} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--text-primary)' }}>{camp.name}</span>
                    <span className="badge-tag" style={{ fontSize: '9.5px', backgroundColor: camp.variant === 'caution' ? '#fef3c7' : '#e5f5ed', color: camp.variant === 'caution' ? '#92400e' : '#166534' }}>
                      {camp.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {camp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Hotlines */}
          <div className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--brand-green-deep)', marginBottom: '14px' }}>
              <PhoneCall size={16} /> Regional Dispatch Hotlines
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {place.hotlines.map((hl, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', backgroundColor: hl.isEmergency ? '#fee2e2' : 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', border: hl.isEmergency ? '1px solid #fecaca' : '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: hl.isEmergency ? '#991b1b' : 'var(--text-primary)' }}>
                    {hl.label}
                  </span>
                  <a href={`tel:${hl.number}`} style={{ fontSize: '12.5px', fontWeight: 700, color: hl.isEmergency ? '#dc2626' : 'var(--brand-green-deep)', textDecoration: 'none' }}>
                    {hl.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
