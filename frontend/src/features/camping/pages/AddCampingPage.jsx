import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Tent, 
  ShieldCheck, 
  MapPin, 
  Compass, 
  Calendar, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  Radio, 
  Phone, 
  Hospital, 
  Check, 
  AlertCircle,
  Crosshair,
  FileCheck
} from 'lucide-react';
import { createCampsite } from '../api/campingApi';

export default function AddCampingPage() {
  const navigate = useNavigate();

  // Form State initialized matching Image 4
  const [name, setName] = useState('Knuckles Cloud Forest Camp – Ridge Plot 02');
  const [classification, setClassification] = useState('Official DWC National Park Camp');
  const [smsSummary, setSmsSummary] = useState('Plot 02 open. Knuckles ridge cleared. Water spring running. Ranger check-in at Deanston');
  const [overview, setOverview] = useState('High-elevation saddle camp perched on the windward escarpment of Knuckles Range. Dense cloud-canopy overhead provides natural rain protection, but exposed ridge lines experience gusts up to 45 km/h during southwest monsoon shifts. Hard-packed rocky laterite soil requires heavy-duty steel pegs. Trail access involves sustained switchbacks over damp granite root paths.');
  
  const [province, setProvince] = useState('Central Province');
  const [district, setDistrict] = useState('Matale (Laggala Secretariat)');
  const [elevation, setElevation] = useState('1,480m ASL');
  const [gps, setGps] = useState('7.4628° N, 80.7915° E');
  const [rangerStation, setRangerStation] = useState('Hunnasgiriya Range Office / 14km foot trail via Deanston');
  const [difficulty, setDifficulty] = useState('extreme');

  const [tentPads, setTentPads] = useState('4');
  const [capacity, setCapacity] = useState('16');
  const [tariffLkr, setTariffLkr] = useState('Rs. 4,500');
  const [tariffUsd, setTariffUsd] = useState('$25.00');
  const [rangerTariff, setRangerTariff] = useState('Rs. 3,500 / day (DWC Field Guide)');
  const [season, setSeason] = useState('Jan – Apr & Jul – Sep');
  const [duration, setDuration] = useState('Max 2 consecutive nights');

  const [facilities, setFacilities] = useState({
    spring: true,
    latrine: true,
    ring: true,
    foodCache: true,
    solar: false,
    noGenerators: true
  });

  const [rules, setRules] = useState({
    general: 'Check-in and arrival daylight hours strictly before 17:30. Quiet hours enforced strictly from 20:00 to 06:00. Maximum group size: 16 persons per booking allocation.',
    environmental: 'STRICT Leave-No-Trace protocol. Zero polyethylene bags and zero single-use plastic water bottles permitted past Deanston checkpoint. All tins and foil wraps must be evacuated; synthetic soaps strictly forbidden in streams.',
    fire: 'Campfires permitted ONLY inside the designated stone hearth using deadwood twigs collected under guide supervision. Open terrain fires trigger immediate arrest under Wildlife Protection Act. Total fire ban automatically in relative atmosphere for humidity < 50%.',
    wildlife: 'High leeches density during dawn and dusk; gaiters mandatory. Hump-nosed pit viper and green pit viper native to scrub; keep tent zipped continuously. Wild elephant migratory pathway crosses 300m below; heave heavy food packs.'
  });

  const [hotline, setHotline] = useState('+94 66 222 4110');
  const [vhfChannel, setVhfChannel] = useState('Channel 88 (146.520 MHz)');
  const [medicalCenter, setMedicalCenter] = useState('Teldeniya Base (38km)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await createCampsite({
      name,
      classification,
      smsSummary,
      overview,
      province,
      district,
      location: `${district}, ${province}`,
      elevation,
      gps,
      rangerStation,
      difficulty,
      pitchesCount: parseInt(tentPads, 10) || 4,
      pitchesLabel: `${tentPads} Pitches`,
      maxCampers: parseInt(capacity, 10) || 16,
      campersLabel: `Max ${capacity} Campers`,
      tariffLkr,
      tariffUsd,
      rangerTariff,
      season,
      duration,
      facilities,
      rules,
      contacts: {
        hotline,
        vhfChannel,
        medicalCenter
      }
    });

    setIsSubmitting(false);
    alert('Campsite successfully registered and synced with DWC Field Ledger!');
    navigate('/admin/camping');
  };

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-links">
          <Link to="/" className="breadcrumb-link">Admin</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <Link to="/admin/camping" className="breadcrumb-link">Camping</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>New Wilderness Site</span>
          <span className="badge-tag" style={{ marginLeft: '8px', fontSize: '10.5px' }}>DWC Protocol v3.2</span>
        </div>
        <div className="badge-tag" style={{ color: '#166534', backgroundColor: '#e5f5ed' }}>
          Central Highlands Conservation Ledger
        </div>
      </div>

      {/* Editorial Header */}
      <div className="editorial-header">
        <div className="editorial-header-left">
          <h1 className="editorial-title">Register Wilderness Campsite & Pitch</h1>
          <p className="editorial-subtitle">
            Enter environmental camping capacity, mandatory ranger permit protocols, fee hazards, and emergency radio channels.
          </p>
        </div>
      </div>

      {/* Layout Grid */}
      <form onSubmit={handleSubmit} className="admin-form-layout">
        {/* Left Form Sections */}
        <div className="form-sections">
          {/* Section 1: Campsite Identity & Wilderness Classification */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <Tent size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 1: Campsite Identity & Wilderness Classification</h2>
                <p className="section-subtitle">Administrative categorization and registry identifiers</p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Camping Ground Name <span className="required">*</span>
              </label>
              <input 
                type="text" 
                className="form-input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="form-helper">Official nomenclature registered with the Department of Wildlife Conservation</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Wilderness Classification Type <span className="required">*</span>
                </label>
                <select 
                  className="form-select"
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                >
                  <option value="Official DWC National Park Camp">Official DWC National Park Camp</option>
                  <option value="Forest Department Eco-Reserve">Forest Department Eco-Reserve</option>
                  <option value="Community Managed Wilderness">Community Managed Wilderness</option>
                  <option value="Private Agro-Forest Buffer">Private Agro-Forest Buffer</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Terrain Belt Classification</label>
                <select 
                  className="form-select"
                  value={province === 'Central Province' ? 'Central Highlands' : 'Knuckles Foothills'}
                  disabled
                >
                  <option value="Central Highlands">Central Highlands</option>
                  <option value="Knuckles Foothills">Knuckles Foothills</option>
                  <option value="Uva Passages">Uva Passages</option>
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
              <span className="form-helper">Broadcast format optimized for offline 2G mesh text-relays on ranger radios</span>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Long Comprehensive Overview & Terrain Description</label>
              <textarea 
                className="form-textarea"
                rows={5}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Section 2: Terrain, Elevation & GPS Coordinates */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <Compass size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 2: Terrain, Elevation & GPS Coordinates</h2>
                <p className="section-subtitle">Topographic mapping & trail access specifications</p>
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
                  <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
                  <option value="Southern Province">Southern Province</option>
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
                <label className="form-label">Elevation Above Sea Level (ASL)</label>
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
              <label className="form-label">Nearest Ranger Dispatch Station</label>
              <input 
                type="text" 
                className="form-input" 
                value={rangerStation}
                onChange={(e) => setRangerStation(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Access Trail Difficulty Classification</label>
              <div className="option-cards-grid">
                <div 
                  className={`option-card ${difficulty === 'easy' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('easy')}
                >
                  <div className="option-card-title">Easy Walk-in</div>
                  <div className="option-card-sub">Under 2km flat forest</div>
                </div>

                <div 
                  className={`option-card ${difficulty === 'moderate' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('moderate')}
                >
                  <div className="option-card-title">Moderate Trail</div>
                  <div className="option-card-sub">High-clearance 4WD required</div>
                </div>

                <div 
                  className={`option-card ${difficulty === 'extreme' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('extreme')}
                >
                  <div className="option-card-title" style={{ color: difficulty === 'extreme' ? 'var(--brand-green-deep)' : 'inherit' }}>
                    Extreme Ridge Hike
                  </div>
                  <div className="option-card-sub">Sheer drop, rope assist lines</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Capacity, Tariff & Seasonal Operating Windows */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <Calendar size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 3: Capacity, Tariff & Seasonal Operating Windows</h2>
                <p className="section-subtitle">Ecological saturation limit and ranger pricing caps</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Number of Cleared Tent Pads</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={tentPads}
                  onChange={(e) => setTentPads(e.target.value)}
                />
                <span className="form-helper">Fixed footprint platforms (3m x 3m)</span>
              </div>
              <div className="form-group">
                <label className="form-label">Maximum Campers Carrying Capacity</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
                <span className="form-helper">Strict DWC cap per 24-hour cycle</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Pitch Fee per Night (LKR / USD)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={tariffLkr}
                    onChange={(e) => setTariffLkr(e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="form-input" 
                    value={tariffUsd}
                    onChange={(e) => setTariffUsd(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Mandatory Ranger Daily Tariff</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={rangerTariff}
                  onChange={(e) => setRangerTariff(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row" style={{ marginBottom: 0 }}>
              <div className="form-group">
                <label className="form-label">Optimal Operating Season</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                />
                <span className="form-helper">Closures: Oct - Dec (Southwest Monsoon flash-floods/rock hazards)</span>
              </div>
              <div className="form-group">
                <label className="form-label">Maximum Permitted Stay Duration</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                <span className="form-helper">Mandated to minimise turf soil compaction</span>
              </div>
            </div>
          </div>

          {/* Section 4: Facilities, Water & Waste Infrastructure */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <Droplets size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 4: Facilities, Water & Waste Infrastructure</h2>
                <p className="section-subtitle">Confirm availability of key highland survival amenities</p>
              </div>
            </div>

            <div className="checklist-grid">
              <div 
                className={`checklist-card ${facilities.spring ? 'checked' : ''}`}
                onClick={() => setFacilities({ ...facilities, spring: !facilities.spring })}
              >
                <div className="check-box-icon">
                  {facilities.spring && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">Perennial Natural Spring / Gravity Feed</div>
                  <div className="checklist-desc">Water sourced potable highland stream within 80m of campsite</div>
                </div>
              </div>

              <div 
                className={`checklist-card ${facilities.latrine ? 'checked' : ''}`}
                onClick={() => setFacilities({ ...facilities, latrine: !facilities.latrine })}
              >
                <div className="check-box-icon">
                  {facilities.latrine && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">Bio-degradable Deep Pit Latrine</div>
                  <div className="checklist-desc">Timber-sheltered earthen pit; lime dispenser located at base</div>
                </div>
              </div>

              <div 
                className={`checklist-card ${facilities.ring ? 'checked' : ''}`}
                onClick={() => setFacilities({ ...facilities, ring: !facilities.ring })}
              >
                <div className="check-box-icon">
                  {facilities.ring && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">Designated Raised Stone Fire Ring</div>
                  <div className="checklist-desc">Heavy river boulders lined with earthen gravel barrier</div>
                </div>
              </div>

              <div 
                className={`checklist-card ${facilities.foodCache ? 'checked' : ''}`}
                onClick={() => setFacilities({ ...facilities, foodCache: !facilities.foodCache })}
              >
                <div className="check-box-icon">
                  {facilities.foodCache && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">Wild Boar & Macaque Food Cache</div>
                  <div className="checklist-desc">Suspension box pulleys 3m above ground for night tuckbox</div>
                </div>
              </div>

              <div 
                className={`checklist-card ${facilities.solar ? 'checked' : ''}`}
                onClick={() => setFacilities({ ...facilities, solar: !facilities.solar })}
              >
                <div className="check-box-icon">
                  {facilities.solar && <Check size={14} color="#ffffff" />}
                </div>
                <div className="checklist-content">
                  <div className="checklist-title">Solar Charging Terminal (110V / USB)</div>
                  <div className="checklist-desc">Emergency guide comms and battery recharging</div>
                </div>
              </div>

              <div 
                className={`checklist-card prohibited`}
                onClick={() => setFacilities({ ...facilities, noGenerators: !facilities.noGenerators })}
              >
                <div className="check-box-icon" style={{ backgroundColor: '#dc2626' }}>
                  <XCircle size={14} color="#ffffff" />
                </div>
                <div className="checklist-content">
                  <div className="checklist-title" style={{ color: '#b91c1c' }}>No Motorized Generators Permitted</div>
                  <div className="checklist-desc">Mandatory zero-emission sound/carbon ordinance active</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Camping Rules, Environmental & Fire Regulations */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <Flame size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 5: Camping Rules, Environmental & Fire Regulations</h2>
                <p className="section-subtitle">Standard field guidelines printed on guest vouchers</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px', backgroundColor: 'var(--bg-surface)' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} color="var(--brand-green-deep)" />
                  1. General Campsite Rules
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={2}
                  value={rules.general}
                  onChange={(e) => setRules({ ...rules, general: e.target.value })}
                />
              </div>

              <div style={{ border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '14px', backgroundColor: '#f0fdf4' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#166534', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={15} color="#166534" />
                  2. Strict Environmental Demarcation (Leave-No-Trace)
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  value={rules.environmental}
                  onChange={(e) => setRules({ ...rules, environmental: e.target.value })}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              <div style={{ border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '14px', backgroundColor: '#fef2f2' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#991b1b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Flame size={15} color="#991b1b" />
                  3. Fire Hazards & Open Ember Bans
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  value={rules.fire}
                  onChange={(e) => setRules({ ...rules, fire: e.target.value })}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              <div style={{ border: '1px solid #fed7aa', borderRadius: 'var(--radius-md)', padding: '14px', backgroundColor: '#fff7ed' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#c2410c', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={15} color="#c2410c" />
                  4. Wildlife Advisory & Serpent Protocols
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  value={rules.wildlife}
                  onChange={(e) => setRules({ ...rules, wildlife: e.target.value })}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
            </div>
          </div>

          {/* Section 6: Emergency Response & Ranger Hotlines */}
          <div className="form-section-card">
            <div className="form-section-header">
              <div className="section-icon-box">
                <Hospital size={16} />
              </div>
              <div>
                <h2 className="section-title">Section 6: Emergency Response & Ranger Hotlines</h2>
                <p className="section-subtitle">Direct highland dispatch frequency and medical arrays</p>
              </div>
            </div>

            <div className="form-row-3">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Range Officer Direct Line</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={hotline}
                    onChange={(e) => setHotline(e.target.value)}
                  />
                  <Phone size={13} style={{ position: 'absolute', right: '10px', top: '12px', color: 'var(--text-tertiary)' }} />
                </div>
                <span className="form-helper">Hunnasgiriya DWC Office</span>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">VHF Emergency Radio Channel</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={vhfChannel}
                    onChange={(e) => setVhfChannel(e.target.value)}
                  />
                  <Radio size={13} style={{ position: 'absolute', right: '10px', top: '12px', color: 'var(--text-tertiary)' }} />
                </div>
                <span className="form-helper">Highland Repeater Grid 4</span>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Search & Medical Center</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={medicalCenter}
                    onChange={(e) => setMedicalCenter(e.target.value)}
                  />
                  <Hospital size={13} style={{ position: 'absolute', right: '10px', top: '12px', color: 'var(--text-tertiary)' }} />
                </div>
                <span className="form-helper">Equipped with polyvalent anti-venom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="preview-sidebar">
          {/* Card 1: LIVE DESK DISPATCH PREVIEW */}
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-title">
                <ShieldCheck size={16} color="var(--brand-green-deep)" />
                <span>LIVE DESK DISPATCH PREVIEW</span>
              </div>
              <span className="badge-tag" style={{ fontSize: '10px' }}>In Guest Facing</span>
            </div>

            <div style={{ position: 'relative', width: '100%', height: '170px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '14px' }}>
              <img 
                src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80" 
                alt="Camp preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '6px' }}>
                <span className="badge-tag" style={{ backgroundColor: 'rgba(0,0,0,0.65)', color: '#ffffff', fontSize: '10px' }}>
                  {elevation}
                </span>
                <span className="badge-tag" style={{ backgroundColor: '#166534', color: '#ffffff', fontSize: '10px' }}>
                  DWC Official
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
                <span className="badge-tag" style={{ backgroundColor: '#dc2626', color: '#ffffff', fontSize: '10px' }}>
                  2-Day Only
                </span>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              {district}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.2 }}>
              {name}
            </h3>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '16px' }}>
              {overview.length > 130 ? overview.slice(0, 130) + '...' : overview}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', border: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Capacity</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{capacity} Campers / {tentPads} Pads</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Tariff / Night</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-green-deep)' }}>{tariffLkr} ({tariffUsd})</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Potable Water</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Gravity Spring 80m</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Trail Guide</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--terracotta)' }}>Extreme Ridge</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a', padding: '10px 12px', borderRadius: 'var(--radius-md)', fontSize: '11.5px', color: '#854d0e', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Requires licensed DWC guide accompaniment; permit issued at Deanston Range Center.</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Publish Campsite to Live Registry'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => alert('Draft saved to Local Field Registry.')}
              >
                Save Draft
              </button>
              <button 
                type="button" 
                className="btn-icon" 
                style={{ width: '100%', justifyContent: 'center', color: 'var(--text-secondary)' }}
                onClick={() => navigate('/admin/camping')}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Card 2: Pre-Publish Environmental Compliance */}
          <div className="preview-card" style={{ marginTop: '20px' }}>
            <div className="preview-header">
              <div className="preview-title" style={{ fontSize: '12px' }}>
                <FileCheck size={15} color="var(--brand-green-deep)" />
                <span>Pre-Publish Environmental Compliance</span>
              </div>
            </div>

            <div className="compliance-list">
              <div className="compliance-item">
                <CheckCircle2 size={16} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">DWC Biometric Guide assigned</div>
                </div>
              </div>

              <div className="compliance-item">
                <CheckCircle2 size={16} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">Carrying capacity strictly under 20 persons</div>
                </div>
              </div>

              <div className="compliance-item">
                <CheckCircle2 size={16} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">Perennial water flow documented</div>
                </div>
              </div>

              <div className="compliance-item">
                <CheckCircle2 size={16} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div className="item-title">VHF Repeater relay operational (CH 88)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
