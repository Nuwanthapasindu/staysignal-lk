import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchNoticeById, updateNotice } from '../../notices';
import { fetchTowns } from '../../geography/api/geographyApi';
import NoticeForm, { noticeToForm } from '../components/NoticeForm';

export default function EditNoticePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [towns, setTowns] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [serverFieldErrors, setServerFieldErrors] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setLoadError(null);
    Promise.all([
      fetchNoticeById(id),
      fetchTowns().catch(() => []),
    ])
      .then(([notice, townList]) => {
        if (!alive) return;
        if (!notice || notice.error) {
          setLoadError(notice?.error || 'Notice not found');
        } else {
          setInitialValues(noticeToForm(notice));
        }
        if (Array.isArray(townList)) setTowns(townList);
      })
      .catch((err) => alive && setLoadError(err.message || 'Failed to load notice'))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setSubmitError(null);
    setServerFieldErrors(null);
    setSaved(false);
    try {
      await updateNotice(id, payload);
      setSaved(true);
      setTimeout(() => navigate(`/notices/${encodeURIComponent(id)}`), 900);
    } catch (err) {
      console.error('Error updating notice:', err);
      const details = err.response?.data?.details;
      if (details && typeof details === 'object') {
        setServerFieldErrors(details);
        setSubmitError(err.response?.data?.error || 'Validation failed on server. Please check the fields below.');
      } else {
        setSubmitError(
          err.response?.data?.error?.message ||
            err.response?.data?.error ||
            err.message ||
            'Failed to update notice.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="page-wrapper" style={{ paddingTop: '32px' }}>Loading notice…</div>;
  }

  if (loadError) {
    return (
      <div className="page-wrapper" style={{ paddingTop: '32px' }}>
        <div className="empty-state-card" style={{ padding: '32px' }}>
          <h2 className="empty-state-title">Could not load this notice</h2>
          <p className="empty-state-description">{loadError}</p>
          <Link to="/owner" className="btn-emergency" style={{ padding: '10px 18px' }}>Back to Host Desk</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="ledger-hero" style={{ paddingBottom: '16px' }}>
        <div className="hero-text-block">
          <div className="hero-tracker">
            <span aria-hidden="true">✏️</span>
            <span>Editing Corridor Ledger Entry · {id}</span>
          </div>
          <h1 className="hero-title">Edit Operational Notice</h1>
          <p className="hero-description">
            Update the live status, advisory details, or utility schedules. Changes broadcast to the public ledger immediately.
          </p>
        </div>
      </section>

      {saved && (
        <div style={{ backgroundColor: '#DCFCE7', border: '1px solid #BBF7D0', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13.5px', fontWeight: 600 }}>
          ✓ Notice updated. Redirecting to the live ledger card…
        </div>
      )}

      <NoticeForm
        initialValues={initialValues}
        towns={towns}
        submitting={submitting}
        submitError={submitError}
        serverFieldErrors={serverFieldErrors}
        onSubmit={handleSubmit}
        submitLabel="💾 Save Notice Changes"
        submittingLabel="💾 Saving changes..."
      />
    </div>
  );
}
