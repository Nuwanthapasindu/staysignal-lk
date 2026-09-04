import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Landmark, 
  Trees, 
  Mountain, 
  Droplets, 
  Waves, 
  CloudSun,
  ShieldCheck, 
  AlertTriangle, 
  FileEdit, 
  Plus, 
  Search, 
  RotateCcw, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  History, 
  Radio, 
  FileSpreadsheet, 
  DollarSign, 
  CheckSquare, 
  ChevronLeft, 
  ChevronRight,
  Send,
  BookOpen
} from 'lucide-react';
import {
  fetchTourismDestinations,
  updateTourismDestinationStatus,
  deleteTourismDestination,
  resolveMediaUrl,
} from '../api/tourismApi';

export default function TourismDirectoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedProvince, setSelectedProvince] = useState('All Provinces');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [destinations, setDestinations] = useState([]);
  const [stats, setStats] = useState({
    totalDestinations: 0,
    totalDestinationsSub: '',
    activeOpen: 0,
    activeOpenSub: '',
    weatherAdvisory: 0,
    weatherAdvisorySub: '',
    draftRevisions: 0,
    draftRevisionsSub: '',
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load from backend API
  const loadData = async () => {
    const result = await fetchTourismDestinations({
      search,
      category: selectedCategory,
      province: selectedProvince,
      status: selectedStatus
    });
    if (result && result.destinations) {
      setDestinations(result.destinations);
      if (result.stats) setStats(result.stats);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, selectedCategory, selectedProvince, selectedStatus]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Heritage & Archaeological':
        return <Landmark size={15} color="var(--brand-green-deep)" />;
      case 'Nature & Hiking':
        return <Trees size={15} color="var(--brand-green-deep)" />;
      case 'Viewpoints & Walking':
        return <Mountain size={15} color="var(--brand-green-deep)" />;
      case 'National Park & Cloud Forest':
        return <CloudSun size={15} color="var(--brand-green-deep)" />;
      case 'Waterfalls & Gorges':
        return <Droplets size={15} color="#0284c7" />;
      case 'Coastal & Marine':
        return <Waves size={15} color="#0369a1" />;
      default:
        return <Landmark size={15} color="var(--brand-green-deep)" />;
    }
  };

  const STATUS_LABEL_TO_VALUE = {
    'Published / Open': 'open',
    'Caution / Warning': 'caution',
    Suspended: 'danger',
    'Draft Review': 'draft',
  };

  const filteredDestinations = destinations.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (item.name || '').toLowerCase().includes(q) ||
      (item.nodeId || '').toLowerCase().includes(q) ||
      (item.district || '').toLowerCase().includes(q);
    const matchesCat = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesProv =
      selectedProvince === 'All Provinces' || (item.province || '').includes(selectedProvince);
    const wantStatus = STATUS_LABEL_TO_VALUE[selectedStatus] || selectedStatus.toLowerCase();
    const matchesStat = selectedStatus === 'All Statuses' || item.status === wantStatus;
    return matchesSearch && matchesCat && matchesProv && matchesStat;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredDestinations.map(d => d._id || d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Backend accepts either a Mongo _id or the slug for :id routes.
  const apiId = (item) => item?._id || item?.slug || item?.id;

  const patchStatus = async (id, updateData) => {
    const item = destinations.find((d) => (d._id || d.id) === id);
    if (!item) return;
    // optimistic
    setDestinations((prev) =>
      prev.map((d) => ((d._id || d.id) === id ? { ...d, ...updateData } : d))
    );
    try {
      await updateTourismDestinationStatus(apiId(item), updateData);
    } catch (err) {
      console.warn('[Tourism] status update failed:', err.message);
    }
    loadData();
  };

  const handleToggleHide = (id) => {
    const item = destinations.find((d) => (d._id || d.id) === id);
    if (!item) return;
    const isHidden = item.status === 'danger';
    patchStatus(id, {
      status: isHidden ? 'open' : 'danger',
      statusText: isHidden ? 'PUBLISHED / OPEN' : 'HIDDEN FROM DESKS',
    });
  };

  const handleReinstate = (id) =>
    patchStatus(id, { status: 'open', statusText: 'PUBLISHED / OPEN', statusSub: 'Reinstated by Harbour Master' });

  const handlePublishDraft = (id) =>
    patchStatus(id, { status: 'open', statusText: 'PUBLISHED / OPEN', statusSub: 'Approved by Field Ranger' });

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to remove ${name} from registry?`)) return;
    const item = destinations.find((d) => (d._id || d.id) === id);
    setDestinations((prev) => prev.filter((d) => (d._id || d.id) !== id));
    try {
      await deleteTourismDestination(apiId(item));
    } catch (err) {
      console.warn('[Tourism] delete failed:', err.message);
    }
    loadData();
  };

  const handleSyncFeeds = async () => {
    setIsSyncing(true);
    await loadData();
    setTimeout(() => {
      setIsSyncing(false);
      alert('SLTDA Feeds Synced with Central Highlands Gateway (Pundaluoya Node)!');
    }, 600);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All Categories');
    setSelectedProvince('All Provinces');
    setSelectedStatus('All Statuses');
  };

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-links">
          <Link to="/" className="breadcrumb-link">Admin Portal</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Tourism Directory Management</span>
        </div>
        <div className="badge-tag" style={{ color: '#166534', backgroundColor: '#e5f5ed' }}>
          SLTDA Regional Gateway Active
        </div>
      </div>

      {/* Editorial Header */}
      <div className="editorial-header">
        <div className="editorial-header-left">
          <h1 className="editorial-title">Tourism Destinations & Heritage Registry</h1>
          <p className="editorial-subtitle">
            Manage public visibility, foreign visitor admission tariffs, seasonal accessibility, and safety regulations across Sri Lanka's cultural, nature, and coastal attractions.
          </p>
        </div>
        <div className="editorial-actions">
          <button className="btn btn-secondary" onClick={handleSyncFeeds} disabled={isSyncing}>
            <RefreshCw size={14} className={isSyncing ? 'pulse' : ''} /> {isSyncing ? 'Syncing Feeds...' : 'Sync SLTDA Feeds'}
          </button>
          <Link to="/admin/tourism/new" className="btn btn-primary">
            <Plus size={14} /> Add Tourism Place
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div>
            <div className="stat-title">TOTAL DESTINATIONS</div>
            <div className="stat-value">{stats.totalDestinations}</div>
            <div className="stat-sub">{stats.totalDestinationsSub}</div>
          </div>
          <div className="stat-icon">
            <BookOpen size={18} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">ACTIVE / OPEN</div>
            <div className="stat-value">{stats.activeOpen}</div>
            <div className="stat-sub">{stats.activeOpenSub}</div>
          </div>
          <div className="stat-icon">
            <ShieldCheck size={18} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">WEATHER ADVISORY</div>
            <div className="stat-value" style={{ color: '#b91c1c' }}>{stats.weatherAdvisory}</div>
            <div className="stat-sub">{stats.weatherAdvisorySub}</div>
          </div>
          <div className="stat-icon alert">
            <AlertTriangle size={18} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">DRAFT REVISIONS</div>
            <div className="stat-value">{stats.draftRevisions}</div>
            <div className="stat-sub">{stats.draftRevisionsSub}</div>
          </div>
          <div className="stat-icon">
            <FileEdit size={18} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={15} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search places, landmarks, districts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select 
            className="select-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            <option value="Heritage & Archaeological">Heritage & Archaeological</option>
            <option value="Nature & Hiking">Nature & Hiking</option>
            <option value="Viewpoints & Walking">Viewpoints & Walking</option>
            <option value="National Park & Cloud Forest">National Park & Cloud Forest</option>
            <option value="Waterfalls & Gorges">Waterfalls & Gorges</option>
            <option value="Coastal & Marine">Coastal & Marine</option>
          </select>

          <select 
            className="select-control"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="All Provinces">All Provinces</option>
            <option value="Central">Central Province</option>
            <option value="Uva">Uva Province</option>
            <option value="Eastern">Eastern Province</option>
            <option value="Southern">Southern Province</option>
            <option value="Western">Western Province</option>
          </select>

          <select 
            className="select-control"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Published / Open">Published / Open</option>
            <option value="Caution / Warning">Caution / Warning</option>
            <option value="Suspended">Suspended</option>
            <option value="Draft Review">Draft Review</option>
          </select>

          <button 
            className="btn btn-secondary btn-sm" 
            title="Reset Filters"
            onClick={resetFilters}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* Registered Tourism Destinations Table Card */}
      <div className="data-table-card">
        <div className="table-header-bar">
          <div className="table-header-title">
            <span style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--text-primary)' }}>
              Registered Tourism Destinations
            </span>
            <span className="badge-tag" style={{ backgroundColor: 'var(--brand-green-deep)', color: '#ffffff', fontSize: '11px', fontWeight: 600 }}>
              {filteredDestinations.length} entries shown
            </span>
          </div>
          <div className="table-sync-note">
            <span className="ticker-dot pulse"></span>
            Field telemetry synced via Central Highlands Gateway (Pundaluoya Node)
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '4%' }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedIds.length > 0 && selectedIds.length === filteredDestinations.length}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th style={{ width: '26%' }}>ATTRACTION & REGISTRY NODE</th>
                <th style={{ width: '16%' }}>CATEGORY</th>
                <th style={{ width: '16%' }}>REGION / CORRIDOR</th>
                <th style={{ width: '13%' }}>OPERATIONAL STATUS</th>
                <th style={{ width: '12%' }}>FOREIGN / LOCAL TARIFF</th>
                <th style={{ width: '10%' }}>VERIFICATION DESK</th>
                <th style={{ width: '13%', textAlign: 'right' }}>DESK ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredDestinations.map((item) => {
                const rowId = item._id || item.id;
                return (
                  <tr key={rowId} style={{ backgroundColor: selectedIds.includes(rowId) ? 'var(--bg-surface-subtle)' : 'transparent' }}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(rowId)}
                        onChange={() => handleSelectRow(rowId)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {(item.images?.[0]?.url || item.heroImage) && (
                          <img
                            src={resolveMediaUrl(item.images?.[0]?.url || item.heroImage)}
                            alt=""
                            style={{ width: '34px', height: '34px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border-subtle)' }}
                          />
                        )}
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13.5px' }}>
                          {item.name}
                        </span>
                        {item.ecoRestricted && (
                          <span className="badge-tag eco" style={{ fontSize: '9.5px', fontWeight: 700 }}>
                            ECO-RESTRICTED
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                        {item.nodeId}
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {getCategoryIcon(item.category)}
                        <span>{item.category}</span>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12.5px' }}>
                        {item.province}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {item.district}
                      </div>
                    </td>

                    <td>
                      <span className={`status-pill ${item.status}`}>
                        <span className="dot"></span>
                        {item.statusText}
                      </span>
                      {item.statusSub && (
                        <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                          {item.statusSub}
                        </div>
                      )}
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12px' }}>
                        {item.foreignTariff}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>
                        {item.localTariff}
                      </div>
                    </td>

                    <td>
                      <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.verifiedAgo}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                        {item.verifiedDesk}
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Link
                          to={`/tourism/${item.slug}`}
                          className="btn-icon"
                          title="View Public Dossier"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <Eye size={14} />
                        </Link>

                        <Link
                          to={`/admin/tourism/new?edit=${encodeURIComponent(item.slug || rowId)}`}
                          className="btn-icon"
                          title="Edit Entry"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <Edit size={14} />
                        </Link>

                        <button
                          className="btn-icon"
                          title="Delete Destination"
                          onClick={() => handleDelete(rowId, item.name)}
                        >
                          <Trash2 size={14} color="var(--text-tertiary)" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Batch Operations and Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
              BATCH OPERATIONS:
            </span>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ fontSize: '11px', padding: '4px 8px' }}
              onClick={() => alert(`Exporting ${selectedIds.length > 0 ? selectedIds.length : 'all'} destinations to GeoJSON/CSV...`)}
            >
              <FileSpreadsheet size={12} /> Export GeoJSON / CSV Registry
            </button>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ fontSize: '11px', padding: '4px 8px' }}
              onClick={() => alert('Batch updating tariffs for selected destinations...')}
            >
              <DollarSign size={12} /> Batch Update Tariffs
            </button>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ fontSize: '11px', padding: '4px 8px' }}
              onClick={() => alert('Running regulatory compliance audit across all records...')}
            >
              <CheckSquare size={12} /> Audit Regulations Compliance
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              Showing {filteredDestinations.length} of {stats.totalDestinations} places
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button className="btn btn-secondary btn-sm" style={{ padding: '3px 6px' }} disabled>
                <ChevronLeft size={12} />
              </button>
              <button className="btn btn-primary btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }}>1</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }}>2</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }}>3</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '3px 6px' }}>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Central Secretariat Dispatch Relay Banner */}
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #bbf7d0', flexShrink: 0 }}>
            <Radio size={20} color="var(--brand-green-deep)" />
          </div>
          <div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>
              Direct Central Secretariat Dispatch Relay
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '650px' }}>
              Changes saved here reflect instantaneously across regional hotel lobby displays in Kandy, Ella, Galle, and Colombo Fort Tourist Information Desks.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--brand-green-deep)', fontWeight: 600 }}>
            <span className="ticker-dot pulse"></span>
            Mesh 3G Relay: Active
          </span>
          <button 
            className="btn btn-primary btn-sm" 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--brand-green-deep)' }}
            onClick={() => alert('Emergency bulletin dispatch broadcasted to 28 hotel kiosks!')}
          >
            <Send size={12} /> Push Emergency Bulletin
          </button>
        </div>
      </div>
    </div>
  );
}
