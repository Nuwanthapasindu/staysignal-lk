import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Tent, 
  ShieldCheck, 
  AlertTriangle, 
  Ticket, 
  Download, 
  Plus, 
  Search, 
  Users, 
  Droplets, 
  Compass, 
  RotateCcw,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Radio,
  FileCheck,
  CloudRain,
  PhoneCall,
  Clock,
  ArrowRight
} from 'lucide-react';
import { campingStats, campsitesList } from '../data/campingData';

export default function CampingDirectoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedBelt, setSelectedBelt] = useState('All Belts');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [filterWater, setFilterWater] = useState(false);
  const [filterRanger, setFilterRanger] = useState(false);
  const [filterGroup12, setFilterGroup12] = useState(false);
  const [directivesOpen, setDirectivesOpen] = useState(false);
  const [campsites, setCampsites] = useState(campsitesList);

  const filteredCampsites = campsites.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.location.toLowerCase().includes(search.toLowerCase());
    const matchesBelt = selectedBelt === 'All Belts' || c.terrainBelt === selectedBelt;
    const matchesStatus = selectedStatus === 'All Statuses' || 
                          (selectedStatus === 'Open' && c.status === 'open') ||
                          (selectedStatus === 'Caution' && c.status === 'caution') ||
                          (selectedStatus === 'Closed' && c.status === 'danger') ||
                          (selectedStatus === 'Draft' && c.status === 'draft');
    const matchesWater = !filterWater || c.hasWaterSpring;
    const matchesRanger = !filterRanger || c.requiresRanger;
    const matchesGroup = !filterGroup12 || c.maxGroup12;
    return matchesSearch && matchesBelt && matchesStatus && matchesWater && matchesRanger && matchesGroup;
  });

  const resetFilters = () => {
    setSearch('');
    setSelectedBelt('All Belts');
    setSelectedStatus('All Statuses');
    setFilterWater(false);
    setFilterRanger(false);
    setFilterGroup12(false);
  };

  const handleToggleStatus = (id, currentStatus) => {
    setCampsites(prev => prev.map(item => {
      if (item.id === id) {
        if (currentStatus === 'open') {
          return { ...item, status: 'danger', statusText: 'SEASON CLOSED' };
        } else if (currentStatus === 'danger') {
          return { ...item, status: 'open', statusText: 'OPEN • SPRING RUNNING' };
        } else if (currentStatus === 'caution') {
          return { ...item, status: 'danger', statusText: 'SUSPENDED' };
        } else if (currentStatus === 'draft') {
          return { ...item, status: 'open', statusText: 'OPEN • VERIFIED' };
        }
      }
      return item;
    }));
  };

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-links">
          <Link to="/" className="breadcrumb-link">Admin Portal</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Camping & High-Altitude Campsite Registry</span>
        </div>
        <div className="badge-tag" style={{ color: '#166534', backgroundColor: '#e5f5ed' }}>
          DWC Monitored Network
        </div>
      </div>

      {/* Editorial Header */}
      <div className="editorial-header">
        <div className="editorial-header-left">
          <h1 className="editorial-title">Wilderness Campsites & High-Altitude Staging Management</h1>
          <p className="editorial-subtitle">
            Department of Wildlife Conservation (DWC) & Forest Department registered campsites, capacity limits, seasonal flood/monsoon clearance, and fire restriction telemetry.
          </p>
        </div>
        <div className="editorial-actions">
          <button className="btn btn-secondary" onClick={() => alert('Exporting DWC Field Ledger GeoJSON/CSV...')}>
            <Download size={14} /> Export Field Ledger
          </button>
          <Link to="/admin/camping/new" className="btn btn-primary">
            <Plus size={14} /> Add Camping Place
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div>
            <div className="stat-title">Registered Sites</div>
            <div className="stat-value">{campingStats.registeredSites}</div>
            <div className="stat-sub">{campingStats.registeredSitesSub}</div>
          </div>
          <div className="stat-icon">
            <Tent size={18} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">Operational Status</div>
            <div className="stat-value">{campingStats.operationalStatus}</div>
            <div className="stat-sub">{campingStats.operationalStatusSub}</div>
          </div>
          <div className="stat-icon">
            <ShieldCheck size={18} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">Weather Suspensions</div>
            <div className="stat-value" style={{ color: '#b91c1c' }}>{campingStats.weatherSuspensions}</div>
            <div className="stat-sub">{campingStats.weatherSuspensionsSub}</div>
          </div>
          <div className="stat-icon alert">
            <AlertTriangle size={18} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">Permits Cleared</div>
            <div className="stat-value">{campingStats.permitsCleared}</div>
            <div className="stat-sub">{campingStats.permitsClearedSub}</div>
          </div>
          <div className="stat-icon">
            <Ticket size={18} />
          </div>
        </div>
      </div>

      {/* DWC Directives Collapsible Banner */}
      <div className="info-banner" style={{ marginBottom: '20px' }}>
        <div className="info-banner-left">
          <span className="ticker-dot pulse"></span>
          <span style={{ fontWeight: 600, color: 'var(--brand-green-deep)' }}>
            DWC Operational Desk & Field Emergency Range Links
          </span>
          <span className="badge-tag" style={{ marginLeft: '6px' }}>Highlands Radio Mesh Active</span>
        </div>
        <button 
          className="btn-icon" 
          onClick={() => setDirectivesOpen(!directivesOpen)}
          style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <span>{directivesOpen ? 'Hide Directives' : 'Expand Directives'}</span>
          <ChevronDown size={14} style={{ transform: directivesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </div>

      {directivesOpen && (
        <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--brand-green-deep)', marginBottom: '4px' }}>
              VHF MONITORING FREQUENCY
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Range Office repeats continuous weather advisory on 146.520 MHz (CH 88). Call-in twice daily at 06:00 and 18:00 IST.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--terracotta)', marginBottom: '4px' }}>
              LEAVE-NO-TRACE POLICING
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Non-compliance fines under DWC Gazette 2102/33 are active. All plastic bag items checked at Deanston and Pattipola trailheads.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--brand-green-deep)', marginBottom: '4px' }}>
              EMERGENCY RANGE HOTLINE
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Hunnasgiriya Range Control: <strong>+94 66 222 4110</strong> (24/7 Satellite Uplink active).
            </p>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={15} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search campsite, forest reserve, mountain range..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select 
            className="select-control"
            value={selectedBelt}
            onChange={(e) => setSelectedBelt(e.target.value)}
          >
            <option value="All Belts">Terrain & Region: All Belts</option>
            <option value="Central Highlands">Central Highlands</option>
            <option value="Knuckles Foothills">Knuckles Foothills</option>
            <option value="Uva Passages">Uva Passages</option>
          </select>

          <select 
            className="select-control"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All Statuses">Status: All Statuses</option>
            <option value="Open">Open & Spring Running</option>
            <option value="Caution">Caution / Escort Mandatory</option>
            <option value="Closed">Temporarily Closed</option>
            <option value="Draft">Draft Revisions</option>
          </select>
        </div>

        <div className="filter-pointers">
          <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-tertiary)' }}>POINTERS:</span>
          
          <button 
            className={`filter-chip ${filterGroup12 ? 'active' : ''}`}
            onClick={() => setFilterGroup12(!filterGroup12)}
          >
            <Users size={12} /> Max Group 12+
          </button>

          <button 
            className={`filter-chip ${filterWater ? 'active' : ''}`}
            onClick={() => setFilterWater(!filterWater)}
          >
            <Droplets size={12} /> Fresh Water Spring Available
          </button>

          <button 
            className={`filter-chip ${filterRanger ? 'active' : ''}`}
            onClick={() => setFilterRanger(!filterRanger)}
          >
            <Compass size={12} /> Ranger Accompaniment Required
          </button>

          <button 
            className="btn-icon" 
            title="Reset Filters"
            onClick={resetFilters}
            style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <RotateCcw size={12} /> Reset Filters
          </button>

          <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            Showing {filteredCampsites.length} of 18 staging grounds
          </span>
        </div>
      </div>

      {/* Verified Campsite Dispatches & Pitch Status Table */}
      <div className="data-table-card">
        <div className="table-header-bar">
          <div className="table-header-title">
            <ShieldCheck size={16} color="#164734" />
            <span>Verified Campsite Dispatches & Pitch Status</span>
          </div>
          <div className="table-sync-note">
            <span className="ticker-dot pulse"></span>
            Real-time Sync Active
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>CAMPSITE & RESERVE</th>
                <th style={{ width: '13%' }}>CAPACITY / PITCHES</th>
                <th style={{ width: '14%' }}>TARIFF / FEE STRUCTURE</th>
                <th style={{ width: '18%' }}>OPERATIONAL STATUS</th>
                <th style={{ width: '15%' }}>PERMIT CLEARANCE OFFICE</th>
                <th style={{ width: '10%' }}>LAST SYNCED</th>
                <th style={{ width: '15%', textAlign: 'right' }}>MANAGEMENT ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampsites.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13.5px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {item.location}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <span className="badge-tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                        ELEV: {item.elevation}
                      </span>
                      {item.featureBadge && (
                        <span className={`badge-tag ${item.featureBadgeType === 'green' ? 'eco' : ''}`} style={{ fontSize: '10px' }}>
                          {item.featureBadge}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.pitchesLabel}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.campersLabel}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{item.footprint}</div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.tariffLkr} {item.tariffUnit ? `/ ${item.tariffUnit}` : ''}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.tariffExtra}</div>
                  </td>

                  <td>
                    <span className={`status-pill ${item.status}`}>
                      <span className="dot"></span>
                      {item.statusText}
                    </span>
                    {item.statusSub && (
                      <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {item.statusSub}
                      </div>
                    )}
                  </td>

                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12px' }}>
                      {item.clearanceOffice}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {item.clearanceSub}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.lastSynced}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                      {item.lastSyncedChannel}
                    </div>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {item.status === 'draft' ? (
                        <button 
                          className="btn btn-primary btn-sm" 
                          style={{ padding: '3px 8px', fontSize: '11px' }}
                          onClick={() => handleToggleStatus(item.id, item.status)}
                        >
                          Review Draft
                        </button>
                      ) : (
                        <Link 
                          to={`/camping/${item.slug}`} 
                          className="btn btn-secondary btn-sm" 
                          style={{ padding: '3px 8px', fontSize: '11px' }}
                        >
                          {item.id === 'corbets-gap' ? 'View Log' : 'View Public'}
                        </Link>
                      )}

                      <Link 
                        to={`/admin/camping/new`} 
                        className="btn btn-secondary btn-sm" 
                        style={{ padding: '3px 8px', fontSize: '11px' }}
                      >
                        Edit
                      </Link>

                      {item.id === 'knuckles-03' && (
                        <button 
                          className="btn btn-secondary btn-sm" 
                          style={{ padding: '3px 8px', fontSize: '11px', color: '#bf5338' }}
                          onClick={() => handleToggleStatus(item.id, item.status)}
                        >
                          Close Season
                        </button>
                      )}
                      {item.id === 'horton-01' && (
                        <button 
                          className="btn btn-secondary btn-sm" 
                          style={{ padding: '3px 8px', fontSize: '11px', color: '#bf5338' }}
                          onClick={() => handleToggleStatus(item.id, item.status)}
                        >
                          Suspend
                        </button>
                      )}
                      {item.id === 'corbets-gap' && (
                        <button 
                          className="btn btn-secondary btn-sm" 
                          style={{ padding: '3px 8px', fontSize: '11px', color: '#166534' }}
                          onClick={() => handleToggleStatus(item.id, item.status)}
                        >
                          Reopen
                        </button>
                      )}
                      {item.id === 'gala-muduna' && (
                        <button 
                          className="btn btn-secondary btn-sm" 
                          style={{ padding: '3px 8px', fontSize: '11px' }}
                          onClick={() => alert('Editing DWC Guidelines for Gala Muduna...')}
                        >
                          Edit Rules
                        </button>
                      )}
                      {item.id === 'ella-peak' && (
                        <button 
                          className="btn btn-primary btn-sm" 
                          style={{ padding: '3px 8px', fontSize: '11px' }}
                          onClick={() => handleToggleStatus(item.id, item.status)}
                        >
                          Publish
                        </button>
                      )}

                      <button 
                        className="btn-icon" 
                        title="Delete Staging"
                        onClick={() => {
                          if (confirm(`Remove ${item.name} from monitoring list?`)) {
                            setCampsites(prev => prev.filter(c => c.id !== item.id));
                          }
                        }}
                      >
                        <Trash2 size={13} color="var(--text-tertiary)" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination & Registry Subtext */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
            Displaying Registry Page 1 of 4 • Official Wildlife Conservation Reference Registry v4.8
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }} disabled>
              Previous
            </button>
            <button className="btn btn-primary btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }}>
              1
            </button>
            <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }}>
              2
            </button>
            <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }}>
              3
            </button>
            <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Informational Feature Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <FileCheck size={16} color="var(--brand-green-deep)" />
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-green-deep)' }}>
                DWC PERMIT VALIDATION
              </span>
            </div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              QR Code & Paper Permit Verification
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Station wardens must verify paper receipt copies stamped at Nuwara Eliya, Matale, or Badulla Forest Ranges before authorizing nocturnal pitch occupancy.
            </p>
          </div>
          <Link to="/how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--brand-green-deep)', marginTop: '16px' }}>
            Open Registry Validation Tool <ArrowRight size={13} />
          </Link>
        </div>

        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <CloudRain size={16} color="#0369a1" />
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#0369a1' }}>
                MONSOON ELEVATION THRESHOLDS
              </span>
            </div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              48-Hour Precipitation Directives
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              When rainfall exceeds 100mm over 24 hours in the Mahaweli watershed, hill-slope pitches above 1,200m must automatically flip to "Suspended (Landslip Risk)".
            </p>
          </div>
          <Link to="/problem" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: '#0369a1', marginTop: '16px' }}>
            View Weather Station Sensors <ArrowRight size={13} />
          </Link>
        </div>

        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <PhoneCall size={16} color="var(--terracotta)" />
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--terracotta)' }}>
                INCIDENT REPORTING HOTLINE
              </span>
            </div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Wildlife & Trekker SOS Logging
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Report leopard encounters, flash-flooded trailheads, or lost parties immediately to the Range Forest Office centralized night dispatch via sat-link.
            </p>
          </div>
          <a href="tel:+94662224110" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--terracotta)', marginTop: '16px' }}>
            Connect to Emergency Field Dispatch <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
