import React, { useState } from 'react';

export default function CallStayModal({ notice, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !notice) return null;

  const { title, townName, corridor, contactNumber, verifiedBy } = notice;

  const handleCopy = () => {
    if (contactNumber) {
      navigator.clipboard.writeText(contactNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="modal-backdrop bottom-sheet-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Call stay host for ${title}`}
    >
      <div className="modal-dialog bottom-sheet-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{title}</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {townName} · {corridor}
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close call dialog"
          >
            ✕
          </button>
        </div>

        <div className="modal-body call-confirm-box">
          <div className="call-stay-highlight">
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Direct Verified Host Line
            </span>
            <div className="call-stay-number">{contactNumber}</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              🛡️ Verified by {verifiedBy || 'Estate Dispatch'}
            </div>
          </div>

          <div className="call-safety-tip">
            <strong>⚠️ Mountain Road Advisory:</strong> Signal can drop in gorges. Confirm current culvert access, 4x4 pickup availability, and generator hours directly with the host before starting your ascent.
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={`tel:${contactNumber}`}
              className="btn-direct-call"
              style={{ flex: 2, justifyContent: 'center', textAlign: 'center' }}
            >
              📞 Call Host Now
            </a>

            <button
              type="button"
              className="btn-emergency"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={handleCopy}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
