import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Landmark, 
  Compass, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  DollarSign, 
  Phone, 
  Hospital, 
  Check, 
  XCircle, 
  CheckCircle2, 
  Download, 
  Bookmark, 
  History, 
  FileText, 
  Crosshair, 
  AlertCircle,
  Clock,
  PhoneCall,
  CameraOff
} from 'lucide-react';
import {
  createTourismDestination,
  updateTourismDestination,
  fetchTourismDestination,
} from '../api/tourismApi';

export default function AddTourismPlacePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editSlug = searchParams.get('edit');
  const isEditing = !!editSlug;

  const [name, setName] = useState('');
  const [nodeId, setNodeId] = useState('');
  const [category, setCategory] = useState('Heritage & Archaeological');
  const [smsSummary, setSmsSummary] = useState('');
  const [overview, setOverview] = useState('');

  const [province, setProvince] = useState('Central Province');
  const [district, setDistrict] = useState('');
  const [elevation, setElevation] = useState('349m ASL');
  const [gps, setGps] = useState('');
  const [corridor, setCorridor] = useState('');
  const [difficulty, setDifficulty] = useState('moderate');

  const [foreignTariff, setForeignTariff] = useState('USD $36');
  const [localTariff, setLocalTariff] = useState('LKR 150');
  const [saarcTariff, setSaarcTariff] = useState('USD $18');
  const [operatingHours, setOperatingHours] = useState('06:30 – 17:30 Daily (Ticket counter closes 17:00)');
  const [guideRequirement, setGuideRequirement] = useState('SLTDA Certified Guide Optional / West Gate Post');

  const [regulations, setRegulations] = useState({
    plastics: true,
    drones: true,
    frescoes: true,
    hornets: true,
    attire: true,
    macaques: true
  });

  const [touristPolice, setTouristPolice] = useState('+94 66 228 6520');
  const [hospital, setHospital] = useState('Dambulla Base Hospital (14km)');
  const [ambulance, setAmbulance] = useState('1990 Suwa Seriya (Free Dispatch)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // When ?edit=<slug> is present, load that destination into the form.
  useEffect(() => {
    if (!editSlug) return;
    let cancelled = false;
    (async () => {
      try {
        const d = await fetchTourismDestination(editSlug);
        if (cancelled || !d) return;
        if (d.name != null) setName(d.name);
        if (d.nodeId != null) setNodeId(d.nodeId);
        if (d.category != null) setCategory(d.category);
        if (d.smsSummary != null) setSmsSummary(d.smsSummary);
        if (d.overview != null) setOverview(d.overview);
        if (d.province != null) setProvince(d.province);
        if (d.district != null) setDistrict(d.district);
        if (d.elevation != null) setElevation(d.elevation);
        if (d.gps != null) setGps(d.gps);
        if (d.corridor != null) setCorridor(d.corridor);
        if (d.difficulty != null) setDifficulty(d.difficulty);
        if (d.foreignTariff != null) setForeignTariff(d.foreignTariff);
        if (d.localTariff != null) setLocalTariff(d.localTariff);
        if (d.saarcTariff != null) setSaarcTariff(d.saarcTariff);
        if (d.operatingHours != null) setOperatingHours(d.operatingHours);
        if (d.guideRequirement != null) setGuideRequirement(d.guideRequirement);
        if (d.regulations) setRegulations((r) => ({ ...r, ...d.regulations }));
        if (d.contacts?.touristPolice != null) setTouristPolice(d.contacts.touristPolice);
        if (d.contacts?.hospital != null) setHospital(d.contacts.hospital);
        if (d.contacts?.ambulance != null) setAmbulance(d.contacts.ambulance);
      } catch (err) {
        if (!cancelled) setError(`Could not load "${editSlug}" for editing: ${err.message}`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [editSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Attraction name is required.');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      name,
      nodeId,
      category,
      province,
      district,
      elevation,
      gps,
      corridor,
      difficulty,
      foreignTariff,
      localTariff,
      saarcTariff,
      operatingHours,
      guideRequirement,
      smsSummary,
      overview,
      regulations,
      contacts: { touristPolice, hospital, ambulance },
    };
    try {
      if (isEditing) {
        await updateTourismDestination(editSlug, payload);
      } else {
        await createTourismDestination(payload);
      }
      navigate('/admin/tourism');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Could not register the destination.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-links">
          <Link to="/" className="breadcrumb-link">Admin Portal</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <Link to="/admin/tourism" className="breadcrumb-link">Tourism Places</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{isEditing ? 'Edit Destination' : 'Register New Destination'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge-tag" style={{ color: '#166534', backgroundColor: '#e5f5ed', fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>
            <span className="ticker-dot pulse"></span>
            Verified Station ID: LK-DWC-7702
          </span>
          <span className="badge-tag" style={{ fontSize: '10.5px' }}>
            Session Active (Mesh Synced)
          </span>
        </div>
      </div>

      {/* Editorial Header */}
      <div className="editorial-header">
        <div className="editorial-header-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-tag" style={{ backgroundColor: 'var(--brand-green-deep)', color: '#ffffff', fontSize: '10.5px', fontWeight: 600 }}>
              SLTDA REGISTRY PROTOCOL (ENTRY STAGE)
            </span>
          </div>
          <h1 className="editorial-title">{isEditing ? 'Edit Tourism Destination' : 'Add New Tourism Destination & Heritage Place'}</h1>
          <p className="editorial-subtitle">
            Standardized registry entry for Department of Wildlife Conservation (DWC) and Sri Lanka Tourism Development Authority (SLTDA). Information directly populates foreign tourist offline guides and travel advisories.
          </p>
        </div>
        <div className="editorial-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => alert('Viewing route update history...')}>
            <History size={13} /> Route History
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => alert('Accessing SLTDA Operational Desk Guidelines...')}>
            <FileText size={13} /> Desk Guidelines
          </button>
        </div>
      </div>

      {/* Form and Preview Layout Grid */}
      <form onSubmit={handleSubmit} className="admin-form-layout">
        {/* Left Form Sections */}
        <div className="form-sections">
          {/* Section 1: Destination Identity & Administrative Designation */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <Landmark size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 1: Destination Identity & Administrative Designation</h2>
                <p className="section-subtitle">Official nomenclature, UNESCO identification, and core visitor overview</p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Attraction / Destination Name <span className="required">*</span>
              </label>
              <input 
                type="text" 
                className="form-input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="form-helper">Official nomenclature registered with the Department of Archaeology / SLTDA</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Official Node / SLTDA ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={nodeId}
                  onChange={(e) => setNodeId(e.target.value)}
                  placeholder="Auto-generated if left blank"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Heritage / Tourism Category <span className="required">*</span></label>
                <select 
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Heritage & Archaeological">Heritage & Archaeological</option>
                  <option value="Nature & Hiking">Nature & Hiking</option>
                  <option value="Viewpoints & Walking">Viewpoints & Walking</option>
                  <option value="National Park & Cloud Forest">National Park & Cloud Forest</option>
                  <option value="Waterfalls & Gorges">Waterfalls & Gorges</option>
                  <option value="Coastal & Marine">Coastal & Marine</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Short Field Dispatch Summary (120 SMS Relay)</label>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  {smsSummary.length}/120 chars
                </span>
              </div>
              <input 
                type="text" 
                className="form-input" 
                maxLength={120}
                value={smsSummary}
                onChange={(e) => setSmsSummary(e.target.value)}
              />
              <span className="form-helper">Concise telemetry summary for low-bandwidth 2G tourism dispatch nodes</span>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Comprehensive Overview & Historical Dossier</label>
              <textarea 
                className="form-textarea"
                rows={5}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Section 2: Regional Corridor & GPS Coordinates */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <Compass size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 2: Regional Corridor & GPS Coordinates</h2>
                <p className="section-subtitle">Precise location telemetry, elevation, and terrain accessibility rating</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Province</label>
                <select 
                  className="form-select"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="Central Province">Central Province</option>
                  <option value="Uva Province">Uva Province</option>
                  <option value="Eastern Province">Eastern Province</option>
                  <option value="Southern Province">Southern Province</option>
                  <option value="Western Province">Western Province</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">District / Administrative Secretariat</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Elevation Above Sea Level</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={elevation}
                  onChange={(e) => setElevation(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Precise GPS Coordinates</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={gps}
                    onChange={(e) => setGps(e.target.value)}
                  />
                  <Crosshair size={14} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-tertiary)' }} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Access Corridor / Route Proximity</label>
              <input 
                type="text" 
                className="form-input" 
                value={corridor}
                onChange={(e) => setCorridor(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Trail & Ascent Difficulty Classification</label>
              <div className="option-cards-grid">
                <div 
                  className={`option-card ${difficulty === 'easy' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('easy')}
                >
                  <div className="option-card-title">Easy Walk-in</div>
                  <div className="option-card-sub">Flat perimeter gardens</div>
                </div>

                <div 
                  className={`option-card ${difficulty === 'moderate' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('moderate')}
                >
                  <div className="option-card-title">Moderate Trail</div>
                  <div className="option-card-sub">Partial terraced climb</div>
                </div>

                <div 
                  className={`option-card ${difficulty === 'steep' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('steep')}
                >
                  <div className="option-card-title" style={{ color: difficulty === 'steep' ? 'var(--brand-green-deep)' : 'inherit' }}>
                    Steep Vertical Ascent
                  </div>
                  <div className="option-card-sub">1,200 cliff stairs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Foreign & Local Tariff Structure */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <DollarSign size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 3: Foreign & Local Tariff Structure</h2>
                <p className="section-subtitle">Official ticketing fees, SAARC discounts, and permitted visiting hours</p>
              </div>
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label">Foreign Adult Tariff</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={foreignTariff}
                  onChange={(e) => setForeignTariff(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Local Citizen Tariff</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={localTariff}
                  onChange={(e) => setLocalTariff(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">SAARC Regional Tariff</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={saarcTariff}
                  onChange={(e) => setSaarcTariff(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row" style={{ marginBottom: 0 }}>
              <div className="form-group">
                <label className="form-label">Operating Hours / Ascent Windows</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Authorized Tour Guide Requirements</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={guideRequirement}
                  onChange={(e) => setGuideRequirement(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Site Regulations, Wildlife & Safety Directives */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 4: Site Regulations, Wildlife & Safety Directives</h2>
                <p className="section-subtitle">Enforceable visitor rules printed on offline field cards</p>
              </div>
            </div>

            <div className="checklist-grid">
              <div 
                className={`checklist-card ${regulations.plastics ? 'checked' : ''}`}
                onClick={() => setRegulations({ ...regulations, plastics: !regulations.plastics })}
              >
                <div className="check-box-icon">
                  {regulations.plastics && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">Zero Single-Use Plastics</div>
                  <div className="checklist-desc">Stripped at West Moat security checkpoint</div>
                </div>
              </div>

              <div 
                className={`checklist-card prohibited`}
                onClick={() => setRegulations({ ...regulations, drones: !regulations.drones })}
              >
                <div className="check-box-icon" style={{ backgroundColor: '#dc2626' }}>
                  <XCircle size={14} color="#ffffff" />
                </div>
                <div className="checklist-content">
                  <div className="checklist-title" style={{ color: '#b91c1c' }}>NO DRONES (UAV Ban)</div>
                  <div className="checklist-desc">Strict LKR 250,000 judicial fine enforced</div>
                </div>
              </div>

              <div 
                className={`checklist-card ${regulations.frescoes ? 'checked' : ''}`}
                onClick={() => setRegulations({ ...regulations, frescoes: !regulations.frescoes })}
              >
                <div className="check-box-icon">
                  {regulations.frescoes && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">Fresco Gallery No Photography</div>
                  <div className="checklist-desc">Total photo/flash prohibition to preserve plant pigments</div>
                </div>
              </div>

              <div 
                className={`checklist-card ${regulations.hornets ? 'checked' : ''}`}
                style={{ borderColor: regulations.hornets ? '#f59e0b' : 'var(--border-subtle)' }}
                onClick={() => setRegulations({ ...regulations, hornets: !regulations.hornets })}
              >
                <div className="check-box-icon" style={{ backgroundColor: regulations.hornets ? '#d97706' : '#ffffff', borderColor: '#d97706' }}>
                  {regulations.hornets && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title" style={{ color: '#b45309' }}>Hornet Quiet Zones</div>
                  <div className="checklist-desc">Giant Asian hornet colonies nesting beneath cliff overhangs</div>
                </div>
              </div>

              <div 
                className={`checklist-card ${regulations.attire ? 'checked' : ''}`}
                onClick={() => setRegulations({ ...regulations, attire: !regulations.attire })}
              >
                <div className="check-box-icon">
                  {regulations.attire && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">Modest Attire Required</div>
                  <div className="checklist-desc">Shoulders and knees covered in monastery and shrine grounds</div>
                </div>
              </div>

              <div 
                className={`checklist-card ${regulations.macaques ? 'checked' : ''}`}
                onClick={() => setRegulations({ ...regulations, macaques: !regulations.macaques })}
              >
                <div className="check-box-icon">
                  {regulations.macaques && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">No Feeding Wild Macaques</div>
                  <div className="checklist-desc">Primates habituated to food grabbing; keep packs sealed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Emergency Response & Field Ranger Contacts */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <Hospital size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 5: Emergency Response & Field Ranger Contacts</h2>
                <p className="section-subtitle">Direct tourist police line and regional hospital routing</p>
              </div>
            </div>

            <div className="form-row-3" style={{ marginBottom: 0 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Tourist Police Hotline</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={touristPolice}
                    onChange={(e) => setTouristPolice(e.target.value)}
                  />
                  <Phone size={13} style={{ position: 'absolute', right: '10px', top: '12px', color: 'var(--text-tertiary)' }} />
                </div>
                <span className="form-helper">Sigiriya Police Sub-Post</span>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Regional Base Hospital</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                  />
                  <Hospital size={13} style={{ position: 'absolute', right: '10px', top: '12px', color: 'var(--text-tertiary)' }} />
                </div>
                <span className="form-helper">Equipped with 24/7 Trauma Unit</span>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Emergency Ambulance Service</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={ambulance}
                    onChange={(e) => setAmbulance(e.target.value)}
                  />
                  <PhoneCall size={13} style={{ position: 'absolute', right: '10px', top: '12px', color: 'var(--text-tertiary)' }} />
                </div>
                <span className="form-helper">Islandwide toll-free service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Sidebar */}
        <div className="preview-sidebar">
          {/* Card 1: Tourist Card Live Preview */}
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-title">
                <Landmark size={15} color="var(--brand-green-deep)" />
                <span>Tourist Card Live Preview</span>
              </div>
              <span className="badge-tag" style={{ backgroundColor: '#e5f5ed', color: '#166534', fontSize: '10px' }}>
                ACTIVE STATE
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span className="badge-tag" style={{ backgroundColor: '#e5f5ed', color: '#166534', fontSize: '10px' }}>
                AVAILABLE 06:30
              </span>
              <span className="badge-tag" style={{ fontSize: '10px' }}>UNESCO 1982</span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.25 }}>
              {name}
            </h3>

            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              {district} • {corridor}
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '14px' }}>
              {overview.length > 140 ? overview.slice(0, 140) + '...' : overview}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', backgroundColor: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '14px', border: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '9.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Foreign Adult Tariff</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-green-deep)' }}>{foreignTariff} / LKR ~11,500</div>
              </div>
              <div>
                <div style={{ fontSize: '9.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Ascent Hours</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>06:30 – 17:30 IST</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <span className="badge-tag" style={{ fontSize: '10px' }}>English Audio</span>
              <span className="badge-tag" style={{ fontSize: '10px' }}>Guided Entry</span>
              <span className="badge-tag" style={{ fontSize: '10px' }}>Aquatic</span>
              <span className="badge-tag" style={{ fontSize: '10px', color: '#b91c1c', backgroundColor: '#fee2e2' }}>No Drones</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ flex: 1, justifyContent: 'center', fontSize: '12px' }}
                onClick={() => alert('Generating PDF Foreign Tourist Demand Dossier...')}
              >
                <Download size={13} /> PDF Desk Dossier
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ padding: '8px 10px' }}
                title="Bookmark Desk Card"
                onClick={() => alert('Card saved to Offline Bookmarks.')}
              >
                <Bookmark size={14} />
              </button>
            </div>

            <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '6px' }}>
              Simulates Offline Foreign Tourist Demand Card
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              {error && <div className="form-alert" role="alert">{error}</div>}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (isEditing ? 'Saving...' : 'Publishing...') : (isEditing ? 'Save Changes' : 'Publish Destination to Live Registry')}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => alert('Draft revision stored.')}
              >
                Save Draft Revisions
              </button>
              <button 
                type="button" 
                className="btn-icon" 
                style={{ width: '100%', justifyContent: 'center', color: 'var(--text-secondary)' }}
                onClick={() => navigate('/admin/tourism')}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Card 2: Compliance & Registry Check */}
          <div className="preview-card" style={{ marginTop: '20px' }}>
            <div className="preview-header">
              <div className="preview-title" style={{ fontSize: '12px' }}>
                <CheckCircle2 size={15} color="var(--brand-green-deep)" />
                <span>Compliance & Registry Check</span>
              </div>
              <span className="badge-tag" style={{ backgroundColor: '#e5f5ed', color: '#166534', fontSize: '10px', fontWeight: 700 }}>
                6 / 6 Ready
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden', marginBottom: '14px' }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: '#22c55e' }}></div>
            </div>

            <div className="compliance-list">
              <div className="compliance-item">
                <CheckCircle2 size={15} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">GPS LAT/LONG BOUNDARY</div>
                  <div className="item-sub">7.9570° N, 80.7603° E established via SL Survey Dept</div>
                </div>
              </div>

              <div className="compliance-item">
                <CheckCircle2 size={15} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">Foreign Admission Pricing Configured</div>
                  <div className="item-sub">USD $36 + SAARC $18 / Local LKR 150 confirmed</div>
                </div>
              </div>

              <div className="compliance-item">
                <CheckCircle2 size={15} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">Verified Field Emergency Hotline</div>
                  <div className="item-sub">Tourist Police and 1990 Med-Evac response nodes</div>
                </div>
              </div>

              <div className="compliance-item">
                <CheckCircle2 size={15} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">Regulations & Etiquette Established</div>
                  <div className="item-sub">Plastics ban and drone safety ordinance active</div>
                </div>
              </div>

              <div className="compliance-item">
                <CheckCircle2 size={15} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">High-Res Visual Asset (1600x900)</div>
                  <div className="item-sub">Compressed under 250KB for offline distribution</div>
                </div>
              </div>

              <div className="compliance-item">
                <CheckCircle2 size={15} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">Divisional Secretariat Sign-Off</div>
                  <div className="item-sub">Pending DWC Regional Warden counter-signature token</div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a', padding: '10px 12px', borderRadius: 'var(--radius-md)', fontSize: '11px', color: '#854d0e', marginTop: '14px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Publishing initiates immediate replication across foreign hotel lobby kiosks and dispatch smartphones within 30 seconds.</span>
            </div>
          </div>

          {/* Card 3: Registry Dispatch Hotline */}
          <div className="preview-card" style={{ marginTop: '20px', backgroundColor: '#f7f4ed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <PhoneCall size={15} color="var(--brand-green-deep)" />
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-green-deep)' }}>
                REGISTRY DISPATCH HOTLINE
              </div>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Having border overlaps, conflicting boundary coordinates or DWC/FD permit disputes?
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href="tel:+94112426900" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-green-deep)', textDecoration: 'none' }}>
                +94 11 242 6900
              </a>
              <span className="badge-tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                Ext 44 / DWC-UVA
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
