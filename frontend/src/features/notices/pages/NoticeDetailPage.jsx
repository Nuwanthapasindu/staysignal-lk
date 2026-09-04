import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchNoticeById, fetchNoticeAlternatives, deleteNotice } from '../api/noticesApi';
import { useAuth } from '../../auth';
import { getStatusConfig, getIssueIcon, formatTimeAgo } from '../components/NoticeCard';
import AlternativesList from '../components/AlternativesList';
import CallStayModal from '../components/CallStayModal';

export default function NoticeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCallNotice, setSelectedCallNotice] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const { user } = useAuth();
  const isOwner = user?.role === 'owner';

  const handleDelete = async () => {
    if (!confirm('Remove this notice from the Corridor Ledger? This cannot be undone.')) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteNotice(id);
      navigate('/notices');
    } catch (err) {
      setDeleteError(
        err.response?.data?.error?.message || err.response?.data?.error || err.message || 'Failed to delete notice.'
      );
      setDeleting(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      fetchNoticeById(id),
      fetchNoticeAlternatives(id).catch(() => []),
    ])
      .then(([noticeData, altsData]) => {
        if (isMounted) {
          if (!noticeData || noticeData.error) {
            setError(noticeData?.error || 'Notice not found');
          } else {
            setNotice(noticeData);
            setAlternatives(altsData || []);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error loading notice detail:', err);
          setError(err.message || 'Failed to load notice details');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page-container">
        <div style={{ marginBottom: '24px' }}>
          <div className="skeleton" style={{ width: '180px', height: '36px', borderRadius: '8px' }} />
        </div>
        <div className="skeleton-card" style={{ minHeight: '380px' }}>
          <div className="skeleton" style={{ width: '40%', height: '32px', marginBottom: '16px' }} />
          <div className="skeleton" style={{ width: '70%', height: '24px', marginBottom: '20px' }} />
          <div className="skeleton" style={{ width: '100%', height: '80px', marginBottom: '20px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="skeleton" style={{ height: '60px' }} />
            <div className="skeleton" style={{ height: '60px' }} />
            <div className="skeleton" style={{ height: '60px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="detail-page-container">
        <Link to="/notices" className="back-link">
          ← Back to Corridor Ledger
        </Link>
        <div className="empty-state-card" role="alert">
          <div className="empty-state-icon" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}>
            ⚠️
          </div>
          <h3 className="empty-state-title">Notice Not Found</h3>
          <p className="empty-state-description">
            {error || "The requested corridor notice could not be found or has expired."}
          </p>
          <Link to="/notices" className="btn-reset-filters">
            ← Return to Live Corridor Feed
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    townName,
    town,
    corridor,
    issue,
    status = 'open',
    headline,
    description,
    bypassAdvice,
    utilities = {},
    contactNumber,
    verifiedBy,
    verifiedAt,
    updatedAt,
  } = notice;

  const statusConfig = getStatusConfig(status);
  const issueIcon = getIssueIcon(issue);
  const timeAgo = formatTimeAgo(verifiedAt || updatedAt);
  // Any owner may manage an unclaimed/legacy notice; a claimed one only by
  // the owner who published it (mirrors the backend ownership check).
  const canManage = isOwner && (!notice.createdBy || String(notice.createdBy) === String(user?.id));

  return (
    <div className="detail-page-container">
      {/* Navigation Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/notices" className="back-link">
          ← Back to Corridor Ledger
        </Link>

        {canManage && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to={`/notices/${encodeURIComponent(id)}/edit`}
              className="filter-pill"
              style={{ fontSize: '12.5px', textDecoration: 'none' }}
            >
              ✏️ Edit Notice
            </Link>
            <button
              type="button"
              className="filter-pill"
              style={{ fontSize: '12.5px', color: '#991B1B', borderColor: '#FECACA' }}
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? '🗑️ Removing…' : '🗑️ Delete Notice'}
            </button>
          </div>
        )}
      </nav>

      {deleteError && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', margin: '10px 0', fontSize: '13px' }}>
          ⚠️ {deleteError}
        </div>
      )}

      {/* Main Notice Detail Card */}
      <article className={`detail-hero-card status-${status.toLowerCase()}`}>
        <div className="detail-header-row">
          <div>
            <h1 className="detail-title">{title}</h1>
            <div className="detail-corridor-badge">
              📍 {townName} Corridor · {corridor}
            </div>
          </div>

          <div className={`status-badge ${statusConfig.pillClass}`} style={{ fontSize: '13px', padding: '6px 14px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: statusConfig.dotColor,
              }}
            />
            {statusConfig.label}
          </div>
        </div>

        {/* Highlight Alert Box */}
        {headline && (
          <div className={`detail-alert-box ${status.toLowerCase()}`}>
            <span style={{ fontSize: '20px', lineHeight: 1 }} aria-hidden="true">
              {issueIcon}
            </span>
            <div>
              <div className="detail-headline">{headline}</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>
                Reported for {townName} Highland Corridor
              </div>
            </div>
          </div>
        )}

        {/* Detailed Advisory Description */}
        <div className="detail-description">
          <p>{description}</p>
        </div>

        {/* Operational Status Grid */}
        <div className="operational-grid" aria-label="Stay operational utilities">
          <div className="operational-cell">
            <div className="operational-cell-label">
              <span aria-hidden="true">⚡</span>
              <span>Generator & Power</span>
            </div>
            <div className="operational-cell-value">
              {utilities?.generatorStatus || 'Grid Power Standard'}
            </div>
          </div>

          <div className="operational-cell">
            <div className="operational-cell-label">
              <span aria-hidden="true">💧</span>
              <span>Water Supply</span>
            </div>
            <div className="operational-cell-value">
              {utilities?.waterStatus || 'Normal Municipal Supply'}
            </div>
          </div>

          <div className="operational-cell">
            <div className="operational-cell-label">
              <span aria-hidden="true">📡</span>
              <span>Connectivity</span>
            </div>
            <div className="operational-cell-value">
              {utilities?.connectivityStatus || 'Active 4G / Fibre'}
            </div>
          </div>
        </div>

        {/* Bypass & Travel Advice */}
        {bypassAdvice && (
          <div className="bypass-box">
            <div className="bypass-box-title">
              <span aria-hidden="true">🚗</span>
              <span>Bypass & Vehicle Guidance</span>
            </div>
            <p className="bypass-box-text">{bypassAdvice}</p>
          </div>
        )}

        {/* Verified Authority Contact Bar */}
        <div className="detail-contact-bar">
          <div className="contact-meta">
            <div className="verified-stamp">
              <span aria-hidden="true">🛡️</span>
              <span>Verified by {verifiedBy || 'Local Transport Dispatch'}</span>
            </div>
            <div className="verified-timestamp">
              Updated {timeAgo} ({new Date(verifiedAt || updatedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
            </div>
          </div>

          {contactNumber && (
            <button
              type="button"
              className="btn-direct-call"
              onClick={() => setSelectedCallNotice(notice)}
            >
              <span aria-hidden="true">📞</span>
              <span>Call Host ({contactNumber})</span>
            </button>
          )}
        </div>
      </article>

      {/* Alternatives List (Open Stays Nearby in Same Town) */}
      <AlternativesList
        alternatives={alternatives}
        townName={townName}
        onCallClick={(stay) => setSelectedCallNotice(stay)}
      />

      {/* Call Stay Dialog */}
      <CallStayModal
        isOpen={Boolean(selectedCallNotice)}
        notice={selectedCallNotice}
        onClose={() => setSelectedCallNotice(null)}
      />
    </div>
  );
}
