import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNotices, deleteNotice, updateNotice, getStatusConfig, formatTimeAgo } from '../../notices';
import { useAuth } from '../../auth';

const QUICK_STATUSES = [
  { id: 'open', label: 'Open & Clear', color: '#16A34A' },
  { id: 'caution', label: 'Caution', color: '#D97706' },
  { id: 'disrupted', label: 'Disrupted', color: '#D93829' },
  { id: 'resolved', label: 'Resolved', color: '#0F766E' },
];

export default function OwnerDeskPage() {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [flash, setFlash] = useState(null);

  // Any owner may manage an unclaimed/legacy notice; a claimed one only by
  // the owner who published it (mirrors the backend ownership check).
  const canManage = (notice) => !notice.createdBy || String(notice.createdBy) === String(user?.id);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchNotices({ sort: 'newest' });
      setNotices((res?.notices || []).filter(canManage));
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load notices');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const showFlash = (msg) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 3000);
  };

  const handleQuickStatus = async (notice, status) => {
    if (notice.status === status) return;
    setBusyId(notice.id);
    setNotices((prev) => prev.map((n) => (n.id === notice.id ? { ...n, status } : n)));
    try {
      await updateNotice(notice.id, { status });
      showFlash(`"${notice.title}" set to ${status.toUpperCase()}.`);
      load();
    } catch (err) {
      setError(err.response?.data?.error?.message || err.response?.data?.error || 'Status update failed');
      load();
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (notice) => {
    if (!confirm(`Remove "${notice.title}" from the Corridor Ledger? This cannot be undone.`)) return;
    setBusyId(notice.id);
    setNotices((prev) => prev.filter((n) => n.id !== notice.id));
    try {
      await deleteNotice(notice.id);
      showFlash(`"${notice.title}" removed from the ledger.`);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.response?.data?.error || 'Delete failed');
      load();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="page-wrapper">
      <section className="ledger-hero" style={{ paddingBottom: '20px' }}>
        <div className="hero-text-block">
          <div className="hero-tracker">
            <span aria-hidden="true">🔑</span>
            <span>ACCOMMODATION &amp; TRANSPORT DESK</span>
          </div>
          <h1 className="hero-title">Host Operations Desk</h1>
          <p className="hero-description">
            Publish, edit, retire, and switch the live status of every operational notice you have broadcast to the Corridor Ledger.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Link to="/post" className="btn-report-disruption">✍️ Post New Notice</Link>
          <Link to="/notices" className="btn-emergency">📋 Public Ledger Feed</Link>
        </div>
      </section>

      {flash && (
        <div style={{ backgroundColor: '#DCFCE7', border: '1px solid #BBF7D0', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '13.5px', fontWeight: 600 }}>
          ✓ {flash}
        </div>
      )}
      {error && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '13.5px' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="post-form-card">
        <h3 className="form-section-title" style={{ marginBottom: '4px' }}>
          <span>📡</span>
          <span>Your Broadcast Notices ({notices.length})</span>
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Switch status inline, open the full editor, or retire a notice once the corridor is clear.
        </p>

        {loading ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading notices…</p>
        ) : notices.length === 0 ? (
          <div className="empty-state-card" style={{ padding: '28px' }}>
            <h2 className="empty-state-title" style={{ fontSize: '20px' }}>No notices published yet</h2>
            <p className="empty-state-description">Post your first operational notice to appear on the public ledger.</p>
            <Link to="/post" className="btn-publish-submit" style={{ width: 'auto', padding: '10px 20px' }}>
              ✍️ Post New Notice
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {notices.map((notice) => {
              const cfg = getStatusConfig?.(notice.status) || {};
              return (
                <div
                  key={notice.id}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    opacity: busyId === notice.id ? 0.6 : 1,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--brand-forest)' }}>
                        {notice.title}
                        <span
                          style={{
                            marginLeft: '8px',
                            fontSize: '10.5px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            backgroundColor: '#F4EFE6',
                            color: cfg.dotColor || '#333',
                          }}
                        >
                          {cfg.label || notice.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {notice.townName} · {notice.corridor}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {notice.headline} · updated {formatTimeAgo?.(notice.updatedAt || notice.verifiedAt) || ''}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <Link
                        to={`/notices/${encodeURIComponent(notice.id)}/edit`}
                        className="filter-pill"
                        style={{ fontSize: '12px', textDecoration: 'none' }}
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        type="button"
                        className="filter-pill"
                        style={{ fontSize: '12px', color: '#991B1B', borderColor: '#FECACA' }}
                        onClick={() => handleDelete(notice)}
                        disabled={busyId === notice.id}
                      >
                        🗑️ Retire
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {QUICK_STATUSES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`filter-pill ${notice.status === s.id ? 'active' : ''}`}
                        style={{ fontSize: '11.5px' }}
                        onClick={() => handleQuickStatus(notice, s.id)}
                        disabled={busyId === notice.id}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: s.color,
                            marginRight: '6px',
                          }}
                        />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
