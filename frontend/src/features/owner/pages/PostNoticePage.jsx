import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NoticeCard } from '../../notices';
import { fetchTowns } from '../../geography/api/geographyApi';
import { postNotice } from '../../notices/api/noticesApi';

const TEMPLATES = [
  {
    name: '🚫 Culvert Washout',
    data: {
      issue: 'road_closed',
      status: 'disrupted',
      headline: 'Road closed at 14th Mile Post culvert',
      description: 'Culvert washout due to heavy overnight rainfall. Light 4x4 vehicles can divert via upper estate track.',
      bypassAdvice: '4x4 pickup shuttle available from local rail depot. Avoid low-clearance vehicles.',
      generatorStatus: '6:00 PM - 10:00 PM Active',
      waterStatus: '2000L Backup Tank Operating',
      connectivityStatus: 'Dialog 4G Stable',
    },
  },
  {
    name: '🪨 Earth Slip Delay',
    data: {
      issue: 'landslide',
      status: 'disrupted',
      headline: 'Passara road earth slip blocking both lanes',
      description: 'Minor earth slip near bridge 4. Local RDA JCB crew on site clearing boulders. Expect 2-3 hour delay.',
      bypassAdvice: 'Pedestrian bypass active for luggage transfer. Porter team assisting guests.',
      generatorStatus: 'Full Inverter Active',
      waterStatus: 'Normal Gravity Feed',
      connectivityStatus: 'Mobitel 4G Active',
    },
  },
  {
    name: '💧 Water Bowser Delay',
    data: {
      issue: 'no_water',
      status: 'caution',
      headline: 'Municipal water supply cut until 4pm',
      description: 'Municipal pipeline rupture under repair. Backup water bowser en route, delayed by mist.',
      bypassAdvice: 'Roads fully open and clear. No travel restrictions.',
      generatorStatus: 'Grid Power Stable',
      waterStatus: '2000L Backup Tank + Bottled Water Distributed',
      connectivityStatus: 'SLT Fibre Active',
    },
  },
  {
    name: '✅ Normal Open Passage',
    data: {
      issue: 'road_closed',
      status: 'open',
      headline: 'Access clear · Mountain pass fully open',
      description: 'Main highway clear of obstructions. Grid power and solar backup running normally without interruption.',
      bypassAdvice: 'Standard vehicular route open to all vehicles without delays.',
      generatorStatus: 'Full Solar & Grid Stable',
      waterStatus: 'Continuous Spring Reserve',
      connectivityStatus: 'High-Speed Fibre 100Mbps Active',
    },
  },
];

export default function PostNoticePage() {
  const navigate = useNavigate();
  const [towns, setTowns] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [publishedNotice, setPublishedNotice] = useState(null);
  const [error, setError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: 'Ella Gap Chalets',
    town: 'ella',
    corridor: 'Ella Valley · A23 Corridor',
    issue: 'road_closed',
    status: 'disrupted',
    headline: 'Road closed at 14th Mile Post culvert',
    description: 'Culvert repair at 14th Mile Post due to heavy runoff. Light 4x4 pickup shuttle active from rail station.',
    bypassAdvice: 'Light 4x4 and three-wheelers can divert via Bandarawela-Poonagala road.',
    generatorStatus: '6:00 PM - 10:00 PM Active',
    waterStatus: 'Gravity Feed 3000L Reserve',
    connectivityStatus: 'Dialog 4G + Starlink Active',
    contactNumber: '077 412 8901',
    verifiedBy: 'Estate Dispatch',
  });

  useEffect(() => {
    fetchTowns()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTowns(data);
        }
      })
      .catch((err) => console.warn('Could not load towns', err));
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-update corridor hint when town changes if not customized
      if (field === 'town') {
        const found = towns.find((t) => t.id === value);
        if (found) {
          updated.corridor = `${found.name} · ${found.corridor}`;
        }
      }
      return updated;
    });
  };

  const applyTemplate = (template) => {
    setFormData((prev) => ({
      ...prev,
      ...template.data,
    }));
  };

  const currentTownObj = towns.find((t) => t.id === formData.town);
  const currentTownName = currentTownObj?.name || 'Ella';

  // Construct live notice preview object matching Notice model
  const previewNotice = {
    id: 'preview-notice',
    title: formData.title || 'Your Accommodation Name',
    town: formData.town,
    townName: currentTownName,
    corridor: formData.corridor || `${currentTownName} Corridor`,
    issue: formData.issue,
    status: formData.status,
    headline: formData.headline || 'Notice Headline Summary',
    description: formData.description || 'Detailed operational guidance and situation report will appear here...',
    bypassAdvice: formData.bypassAdvice,
    utilities: {
      generatorStatus: formData.generatorStatus,
      waterStatus: formData.waterStatus,
      connectivityStatus: formData.connectivityStatus,
    },
    contactNumber: formData.contactNumber || '077 000 0000',
    verifiedBy: formData.verifiedBy || 'Host Dispatch',
    verifiedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please enter your property / stay name.');
      return;
    }
    if (!formData.headline.trim()) {
      setError('Please enter a short headline for the notice.');
      return;
    }
    if (!formData.contactNumber.trim()) {
      setError('Please provide a contact phone number for verification.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        title: formData.title.trim(),
        town: formData.town,
        townName: currentTownName,
        corridor: formData.corridor.trim() || `${currentTownName} Corridor`,
        issue: formData.issue,
        status: formData.status,
        headline: formData.headline.trim(),
        description: formData.description.trim(),
        bypassAdvice: formData.bypassAdvice.trim(),
        utilities: {
          generatorStatus: formData.generatorStatus,
          waterStatus: formData.waterStatus,
          connectivityStatus: formData.connectivityStatus,
        },
        contactNumber: formData.contactNumber.trim(),
        verifiedBy: formData.verifiedBy.trim() || 'Verified Host',
      };

      const result = await postNotice(payload);
      setPublishedNotice(result);
    } catch (err) {
      console.error('Error posting notice:', err);
      setError(err.message || 'Failed to publish notice. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (publishedNotice) {
    return (
      <div className="page-wrapper" style={{ maxWidth: '800px', paddingTop: '32px' }}>
        <div className="empty-state-card" style={{ maxWidth: '100%', padding: '40px 32px' }}>
          <div className="empty-state-icon" style={{ backgroundColor: '#DCFCE7', color: '#166534', fontSize: '32px' }}>
            ✓
          </div>
          <h2 className="empty-state-title" style={{ fontSize: '28px' }}>
            Operational Notice Published!
          </h2>
          <p className="empty-state-description" style={{ maxWidth: '600px', fontSize: '15px' }}>
            Your notice is now live on the public Corridor Ledger and synchronized across highland mesh nodes. Travellers and dispatchers can access your real-time status.
          </p>

          <div style={{ width: '100%', maxWidth: '440px', margin: '24px 0', textAlign: 'left' }}>
            <NoticeCard notice={publishedNotice} />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to={`/notices/${publishedNotice.id}`} className="btn-publish-submit" style={{ width: 'auto', padding: '12px 24px' }}>
              🔍 View Live Notice Detail
            </Link>
            <Link to="/notices" className="btn-emergency" style={{ padding: '12px 20px', fontSize: '14px' }}>
              📋 Return to Corridor Ledger
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <section className="ledger-hero" style={{ paddingBottom: '16px' }}>
        <div className="hero-text-block">
          <div className="hero-tracker">
            <span aria-hidden="true">✍️</span>
            <span>Host & Dispatcher Gateway · 30-Second Form</span>
          </div>
          <h1 className="hero-title">
            Post an Operational Notice
          </h1>
          <p className="hero-description">
            Broadcast road access, generator availability, and drinking water status directly to the Corridor Ledger. Verified against local host SIM gateways.
          </p>
        </div>
      </section>

      {/* Quick Incident Templates */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
          ⚡ 1-Click Common Scenarios:
        </span>
        <div className="template-pills-row">
          {TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              type="button"
              className="template-pill"
              onClick={() => applyTemplate(tmpl)}
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Split Layout: Form on Left, Live Notice Preview on Right */}
      <div className="post-notice-layout">
        <form className="post-form-card" onSubmit={handleSubmit}>
          {/* Section 1: Property & Corridor */}
          <h3 className="form-section-title">
            <span>🏠</span>
            <span>1. Property & Highland Location</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Stay / Property Name *</label>
              <input
                id="title"
                type="text"
                className="form-input"
                required
                placeholder="e.g. Zion View, Mandira Cottage"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="town">Town / Corridor Hub *</label>
              <select
                id="town"
                className="form-select"
                value={formData.town}
                onChange={(e) => handleChange('town', e.target.value)}
              >
                {towns.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.district} District)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="corridor">Specific Road Passage / Corridor</label>
            <input
              id="corridor"
              type="text"
              className="form-input"
              placeholder="e.g. Ella Valley · A23 Corridor, Dambatenne Road"
              value={formData.corridor}
              onChange={(e) => handleChange('corridor', e.target.value)}
            />
            <p className="form-hint">Helps drivers pinpoint the exact section of road.</p>
          </div>

          {/* Section 2: Operational Status Tier */}
          <h3 className="form-section-title" style={{ marginTop: '24px' }}>
            <span>🚦</span>
            <span>2. Operational Status Tier</span>
          </h3>

          <div className="form-group">
            <div className="status-radios-grid">
              {[
                { id: 'disrupted', label: 'Disrupted', desc: 'Passage Blocked / Divert', color: '#D93829' },
                { id: 'caution', label: 'Caution', desc: 'Restricted / Weather Mist', color: '#D97706' },
                { id: 'open', label: 'Open & Clear', desc: 'Normal Mountain Passage', color: '#16A34A' },
              ].map((tier) => (
                <div
                  key={tier.id}
                  className={`status-radio-card ${formData.status === tier.id ? `selected ${tier.id}` : ''}`}
                  onClick={() => handleChange('status', tier.id)}
                  role="radio"
                  aria-checked={formData.status === tier.id}
                  tabIndex={0}
                >
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: tier.color,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>{tier.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tier.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="issue">Disruption Category</label>
              <select
                id="issue"
                className="form-select"
                value={formData.issue}
                onChange={(e) => handleChange('issue', e.target.value)}
              >
                <option value="road_closed">🚫 Road Closed / Culvert Washout</option>
                <option value="landslide">🪨 Landslide / Earth Slip</option>
                <option value="flooded_access">🌊 Flooded Access / High Water</option>
                <option value="no_water">💧 No Water / Pipeline Rupture</option>
                <option value="power_cut">⚡ Power Cut / Grid Down</option>
                <option value="bridge_unsafe">⚠️ Bridge Unsafe</option>
                <option value="network_down">📡 Telecom / Network Down</option>
                <option value="relocation">🔄 Relocation Notice</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="headline">Short Headline *</label>
              <input
                id="headline"
                type="text"
                className="form-input"
                required
                placeholder="e.g. Road closed · Wellawaya-Ella passage"
                value={formData.headline}
                onChange={(e) => handleChange('headline', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Advisory Details & Situation Report</label>
            <textarea
              id="description"
              className="form-textarea"
              placeholder="Describe current road conditions, clearance progress, or water bowser arrival time..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="bypassAdvice">Bypass Guidance / Vehicle Advice</label>
            <input
              id="bypassAdvice"
              type="text"
              className="form-input"
              placeholder="e.g. 4x4 pickup shuttle active from rail station. Avoid heavy vans on Poonagala bypass."
              value={formData.bypassAdvice}
              onChange={(e) => handleChange('bypassAdvice', e.target.value)}
            />
          </div>

          {/* Section 3: Operational Utilities */}
          <h3 className="form-section-title" style={{ marginTop: '24px' }}>
            <span>⚡</span>
            <span>3. Utilities & Amenities Status</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '12px' }} htmlFor="generator">Generator Hours</label>
              <input
                id="generator"
                type="text"
                className="form-input"
                placeholder="e.g. 6pm - 10pm Active"
                value={formData.generatorStatus}
                onChange={(e) => handleChange('generatorStatus', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '12px' }} htmlFor="water">Water Supply</label>
              <input
                id="water"
                type="text"
                className="form-input"
                placeholder="e.g. 2000L Reserve Tank"
                value={formData.waterStatus}
                onChange={(e) => handleChange('waterStatus', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '12px' }} htmlFor="connectivity">Connectivity</label>
              <input
                id="connectivity"
                type="text"
                className="form-input"
                placeholder="e.g. Dialog 4G + Starlink"
                value={formData.connectivityStatus}
                onChange={(e) => handleChange('connectivityStatus', e.target.value)}
              />
            </div>
          </div>

          {/* Section 4: Contact & Verification */}
          <h3 className="form-section-title" style={{ marginTop: '24px' }}>
            <span>🛡️</span>
            <span>4. Verification & Host Phone</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Host Phone Number *</label>
              <input
                id="phone"
                type="tel"
                className="form-input"
                required
                placeholder="e.g. 077 412 8901"
                value={formData.contactNumber}
                onChange={(e) => handleChange('contactNumber', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="verifiedBy">Verification Source</label>
              <input
                id="verifiedBy"
                type="text"
                className="form-input"
                placeholder="e.g. Estate Dispatch, Verified Host"
                value={formData.verifiedBy}
                onChange={(e) => handleChange('verifiedBy', e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-publish-submit"
            disabled={submitting}
          >
            {submitting ? '📡 Broadcasting to Corridor Ledger...' : '📢 Publish Operational Notice'}
          </button>
        </form>

        {/* Live Preview Sidebar */}
        <aside className="preview-sticky-box" aria-label="Live notice preview">
          <div className="preview-box-header">
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Live Ledger Card Preview
            </span>
            <span className="preview-badge-pill">Real-time</span>
          </div>

          <NoticeCard notice={previewNotice} />

          <div style={{ backgroundColor: '#FAF8F2', border: '1px solid #EFEBE1', borderRadius: '8px', padding: '12px 14px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            💡 <strong>Card Preview:</strong> This is how your notice will appear on the Corridor Ledger, search feeds, and partner emergency channels.
          </div>
        </aside>
      </div>
    </div>
  );
}
