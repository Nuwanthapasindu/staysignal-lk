import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Radio, 
  Phone, 
  Download, 
  Compass, 
  Calendar, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  FileText, 
  Route, 
  Check, 
  PhoneCall, 
  Clock, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { knucklesCampDetail } from '../data/campingData';
import { submitPermitBooking } from '../api/campingApi';

export default function CampingDetailPage() {
  const { id } = useParams();
  const camp = knucklesCampDetail;
  const [showPermitModal, setShowPermitModal] = useState(false);
  const [applicantName, setApplicantName] = useState('Julian Meyer (Alpine Expedition)');
  const [phone, setPhone] = useState('+49 171 9845210');
  const [numCampers, setNumCampers] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePermitSubmit = async () => {
    setIsSubmitting(true);
    const booking = await submitPermitBooking(camp.slug || 'knuckles-01', {
      applicantName,
      phone,
      numCampers,
      numPitches: 1,
      totalFee: 'USD $25'
    });
    setIsSubmitting(false);
    alert(`Permit Request Submitted to Deanston Range Office! Booking ID: ${booking.bookingId || 'DWC-KNK-8921'}`);
    setShowPermitModal(false);
  };

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-links">
          <Link to="/" className="breadcrumb-link">Central Highlands</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <Link to="/admin/camping" className="breadcrumb-link">Matale Biosphere</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Knuckles Cloud Forest Camp (Pitch 02)</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="public-hero-container">
        <img 
          src={camp.image} 
          alt={camp.name} 
          className="public-hero-image"
        />
        <div className="hero-overlay"></div>

        <div className="hero-content-top">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge-tag" style={{ backgroundColor: 'rgba(22, 71, 52, 0.9)', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ShieldCheck size={13} /> DWC Official Wilderness Campsite
            </span>
            <span className="badge-tag" style={{ backgroundColor: 'rgba(22, 101, 52, 0.9)', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span className="ticker-dot pulse" style={{ backgroundColor: '#4ade80' }}></span>
              Current Status: Open - Spring Flowing
            </span>
          </div>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.9)', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Compass size={13} /> Trail Grade: Extreme Ridge Hike (4.5 hrs)
          </span>
        </div>

        <div className="hero-content-bottom">
          <div className="hero-category-label">
            {camp.subtitle}
          </div>
          <h1 className="hero-title">
            {camp.name}
          </h1>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="quick-action-bar">
        <button 
          className="btn btn-primary" 
          onClick={() => setShowPermitModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <FileText size={14} /> Register DWC Permit Online
        </button>

        <Link 
          to="/problem" 
          className="btn btn-secondary" 
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Route size={14} /> Check Hasalaka-Meemure Tractor Pass Status
        </Link>

        <button 
          className="btn btn-secondary" 
          onClick={() => alert('Downloading Offline Trail Guide & GPX for Knuckles Ridge Plot 02...')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={14} /> Offline Trail Guide & GPS (.GPX)
        </button>

        <a 
          href="tel:+94662224110" 
          className="btn btn-terracotta" 
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <PhoneCall size={14} /> Call Hunnasgiriya Range Post
        </a>
      </div>

      {/* Campground Ledger Specifications Strip */}
      <div className="spec-strip">
        <div className="spec-strip-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--brand-green-deep)', fontSize: '12.5px' }}>
            <Calendar size={15} />
            <span>Campground Ledger Specifications</span>
          </div>
          <span className="badge-tag" style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
            Verified by Beat Ranger Senanayake (Today 06:00 IST)
          </span>
        </div>

        <div className="spec-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {camp.specs.map((item, index) => (
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
          {/* Card 1: The Wilderness Experience & Trail Approach */}
          <div className="content-card">
            <h2 className="content-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="var(--brand-green-deep)" />
              The Wilderness Experience & Trail Approach
            </h2>

            <div className="content-card-prose">
              <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: '14px' }}>
                {camp.tagline}
              </p>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {camp.trailApproach}
              </p>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="var(--brand-green-deep)" />
                Mandatory Gear Checklist for Foreign Backpackers
              </h3>

              <div className="checklist-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {camp.gearChecklist.map((gear, idx) => (
                  <div key={idx} className="checklist-card checked">
                    <div className="check-box-icon">
                      <Check size={14} color="#ffffff" />
                    </div>
                    <div className="checklist-content">
                      <div className="checklist-title">{gear.title}</div>
                      <div className="checklist-desc">{gear.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Statutory Wilderness Ordinance: Camping Rules & Regulations */}
          <div className="content-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                STATUTORY WILDERNESS ORDINANCE
              </div>
              <span className="badge-tag" style={{ color: '#b91c1c', backgroundColor: '#fee2e2', border: '1px solid #fecaca', fontSize: '10.5px' }}>
                DWC Section 32 Enforced
              </span>
            </div>

            <h2 className="content-card-title" style={{ marginBottom: '18px' }}>
              Camping Rules & Regulations
            </h2>

            <div className="rules-quadrants-grid">
              {camp.rulesQuadrants.map((quad) => (
                <div key={quad.id} className={`rule-quadrant ${quad.variant || ''}`}>
                  <div className="quadrant-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {quad.variant === 'danger' ? (
                        <Flame size={16} color="#dc2626" />
                      ) : quad.variant === 'caution' ? (
                        <AlertTriangle size={16} color="#c2410c" />
                      ) : (
                        <Clock size={16} color="var(--brand-green-deep)" />
                      )}
                      <span className="quadrant-title">{quad.title}</span>
                    </div>
                    <span className="badge-tag" style={{ fontSize: '9.5px' }}>
                      {quad.badge}
                    </span>
                  </div>

                  <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-primary)', marginBottom: '10px' }}>
                    {quad.subtitle}
                  </div>

                  <ul className="rule-list">
                    {quad.items.map((item, i) => (
                      <li key={i} className="rule-item">
                        <strong>{item.label}:</strong> {item.desc}
                      </li>
                    ))}
                  </ul>

                  {quad.footnote && (
                    <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px dashed var(--border-medium)', fontSize: '10.5px', color: 'var(--text-tertiary)' }}>
                      {quad.footnote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="public-side-column">
          {/* Card 1: Range Office & Rescue */}
          <div className="content-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--brand-green-deep)' }}>
                <ShieldCheck size={16} /> Range Office & Rescue
              </div>
              <span className="badge-tag" style={{ backgroundColor: '#e5f5ed', color: '#166534' }}>
                Rangers on Duty
              </span>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '12px' }}>
              <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                FOREST RANGER DIRECT HOTLINE
              </div>
              <a href={`tel:${camp.rangerOffice.hotline}`} style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-green-deep)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', textDecoration: 'none' }}>
                <Phone size={15} /> {camp.rangerOffice.hotline}
              </a>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {camp.rangerOffice.hotlineSub}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '12px' }}>
              <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                VHF EMERGENCY RELAY
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                {camp.rangerOffice.channel}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {camp.rangerOffice.channelCallsign}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
              <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                NEAREST RESCUE SIDING
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                {camp.rangerOffice.rescueSiding}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {camp.rangerOffice.rescueSub}
              </div>
            </div>
          </div>

          {/* Card 2: Live Corridor Access */}
          <div className="content-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                <Route size={16} color="var(--terracotta)" /> Live Corridor Access
              </div>
              <span className="badge-tag" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                Caution / Restricted
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {camp.corridorAccess.map((corridor, i) => (
                <div key={i} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px', backgroundColor: corridor.status === 'caution' ? '#fffbeb' : 'var(--bg-surface)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>{corridor.route}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{corridor.timeAgo}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: corridor.status === 'caution' ? '#b45309' : 'var(--brand-green-deep)', marginBottom: '4px' }}>
                    {corridor.title}
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {corridor.desc}
                  </p>
                  {corridor.activeFrom && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed var(--border-medium)' }}>
                      <span>{corridor.activeFrom}</span>
                      <span>{corridor.source}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Nearby Wilderness Spots */}
          <div className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '14px' }}>
              <Compass size={16} color="var(--brand-green-deep)" /> Nearby Wilderness Spots
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {camp.nearbySpots.map((spot, i) => (
                <div key={i} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{spot.name}</span>
                    <span className="badge-tag" style={{ fontSize: '9.5px', backgroundColor: spot.badgeType === 'caution' ? '#fef3c7' : spot.badgeType === 'open' ? '#e5f5ed' : '#f1f3f2', color: spot.badgeType === 'caution' ? '#92400e' : spot.badgeType === 'open' ? '#166534' : 'var(--text-primary)' }}>
                      {spot.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--brand-green-deep)', marginBottom: '4px', fontWeight: 600 }}>
                    {spot.distance}
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {spot.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Permit Registration Modal */}
      {showPermitModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', maxWidth: '500px', width: '100%', padding: '24px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="var(--brand-green-deep)" />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>DWC Wilderness Permit Application</h3>
              </div>
              <button className="btn-icon" onClick={() => setShowPermitModal(false)} style={{ fontSize: '18px', cursor: 'pointer' }}>×</button>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              You are applying for a nocturnal staging permit at <strong>Knuckles Cloud Forest Camp (Pitch 02)</strong>. Permits are issued subject to Deanston Ranger validation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '11.5px' }}>Applicant / Leader Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '11.5px' }}>Emergency Contact Phone</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '11.5px' }}>Number of Campers (Max 16)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  min={1} 
                  max={16}
                  value={numCampers}
                  onChange={(e) => setNumCampers(parseInt(e.target.value, 10) || 1)}
                />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '12px' }}>
              <div><strong>Dates:</strong> 1 or 2 consecutive nights max</div>
              <div><strong>Mandatory Fee:</strong> USD $25 / night + Guide LKR 3,500</div>
              <div><strong>Requirement:</strong> Biodegradable waste bags + Leech socks</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowPermitModal(false)}>Cancel</button>
              <button 
                className="btn btn-primary" 
                onClick={handlePermitSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Permit Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
