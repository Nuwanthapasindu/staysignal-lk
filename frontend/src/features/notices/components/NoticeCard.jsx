import React from 'react';
import { useNavigate } from 'react-router-dom';

export const getStatusConfig = (status) => {
  switch (status?.toLowerCase()) {
    case 'disrupted':
      return {
        label: 'DISRUPTED',
        pillClass: 'disrupted',
        dotColor: '#D93829',
        borderAccent: 'var(--status-disrupted-color)',
      };
    case 'caution':
      return {
        label: 'CAUTION',
        pillClass: 'caution',
        dotColor: '#D97706',
        borderAccent: 'var(--status-caution-color)',
      };
    case 'open':
      return {
        label: 'OPEN & CLEAR',
        shortLabel: 'OPEN',
        pillClass: 'open',
        dotColor: '#16A34A',
        borderAccent: 'var(--status-open-color)',
      };
    case 'resolved':
      return {
        label: 'RESOLVED',
        pillClass: 'resolved',
        dotColor: '#2563EB',
        borderAccent: 'var(--status-resolved-color)',
      };
    case 'closed':
      return {
        label: 'CLOSED',
        pillClass: 'closed',
        dotColor: '#64748B',
        borderAccent: 'var(--status-closed-color)',
      };
    default:
      return {
        label: (status || 'UNKNOWN').toUpperCase(),
        pillClass: 'open',
        dotColor: '#16A34A',
        borderAccent: 'var(--status-open-color)',
      };
  }
};

export const getIssueIcon = (issue) => {
  switch (issue) {
    case 'road_closed':
      return '🚫';
    case 'landslide':
      return '🪨';
    case 'flooded_access':
      return '🌊';
    case 'no_water':
      return '💧';
    case 'power_cut':
      return '⚡';
    case 'bridge_unsafe':
      return '⚠️';
    case 'network_down':
      return '📡';
    case 'relocation':
      return '🔄';
    default:
      return 'ℹ️';
  }
};

export const formatTimeAgo = (dateInput) => {
  if (!dateInput) return 'just now';
  const now = new Date();
  const date = new Date(dateInput);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

export default function NoticeCard({
  notice,
  onCallClick,
  className = '',
  compact = false,
  showFullDetails = false,
}) {
  const navigate = useNavigate();

  if (!notice) return null;

  const {
    id,
    title,
    townName,
    town,
    corridor,
    issue,
    status = 'open',
    headline,
    description,
    contactNumber,
    verifiedBy = 'Verified Host',
    verifiedAt,
    updatedAt,
  } = notice;

  const statusConfig = getStatusConfig(status);
  const issueIcon = getIssueIcon(issue);
  const timeAgoText = formatTimeAgo(verifiedAt || updatedAt);

  const handleCardClick = (e) => {
    // If the click happened on the call button, do not navigate
    if (e.target.closest('.call-stay-btn') || e.target.closest('a[href^="tel:"]')) {
      return;
    }
    navigate(`/notices/${id}`);
  };

  const handleCall = (e) => {
    e.stopPropagation();
    if (onCallClick) {
      onCallClick(notice);
    } else {
      window.location.href = `tel:${contactNumber}`;
    }
  };

  return (
    <article
      className={`notice-card status-${status.toLowerCase()} ${compact ? 'compact-card' : ''} ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick(e);
        }
      }}
      aria-label={`Notice for ${title} in ${townName}, status: ${status}`}
    >
      {/* Top Header Row: Corridor & Status Badge */}
      <div className="card-header-row">
        <span className="corridor-tag" title={corridor}>
          {corridor || `${townName} Passage`}
        </span>
        <span className={`status-badge ${statusConfig.pillClass}`}>
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: statusConfig.dotColor,
            }}
          />
          {statusConfig.label}
        </span>
      </div>

      {/* Stay Name & Town */}
      <div className="card-title-group">
        <h3 className="stay-name">
          {title}{' '}
          <span className="stay-town">· {townName || town}</span>
        </h3>
      </div>

      {/* Disruption / Status Headline */}
      {headline && (
        <div className={`headline-box ${status.toLowerCase()}`}>
          <span className="headline-icon" aria-hidden="true">
            {issueIcon}
          </span>
          <span className="headline-text">{headline}</span>
        </div>
      )}

      {/* Description */}
      <p className="card-description">
        {description}
      </p>

      {/* Footer: Verified Source + Contact Button + Timestamp */}
      <div className="card-footer">
        <div className="verified-host-info">
          <span aria-hidden="true">🛡️</span>
          <span>{verifiedBy}</span>
        </div>

        {contactNumber && (
          <button
            type="button"
            className="call-stay-btn"
            onClick={handleCall}
            aria-label={`Call host for ${title} at ${contactNumber}`}
          >
            <span aria-hidden="true">📞</span>
            <span>{contactNumber}</span>
          </button>
        )}

        <time className="relative-time" dateTime={verifiedAt || updatedAt}>
          {timeAgoText}
        </time>
      </div>
    </article>
  );
}
