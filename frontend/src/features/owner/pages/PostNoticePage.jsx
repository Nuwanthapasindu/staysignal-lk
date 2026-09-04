import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NoticeCard, postNotice } from '../../notices';
import { fetchTowns } from '../../geography/api/geographyApi';
import NoticeForm, { EMPTY_NOTICE } from '../components/NoticeForm';

export default function PostNoticePage() {
  const [towns, setTowns] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [publishedNotice, setPublishedNotice] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [serverFieldErrors, setServerFieldErrors] = useState(null);

  useEffect(() => {
    fetchTowns()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTowns(data);
      })
      .catch((err) => console.warn('Could not load towns', err));
  }, []);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setSubmitError(null);
    setServerFieldErrors(null);
    try {
      const result = await postNotice(payload);
      setPublishedNotice(result);
    } catch (err) {
      console.error('Error posting notice:', err);
      const details = err.response?.data?.details;
      if (details && typeof details === 'object') {
        setServerFieldErrors(details);
        setSubmitError(err.response?.data?.error || 'Validation failed on server. Please check the fields below.');
      } else {
        setSubmitError(
          err.response?.data?.error?.message ||
            err.response?.data?.error ||
            err.message ||
            'Failed to publish notice. Please check your network connection.'
        );
      }
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
          <h2 className="empty-state-title" style={{ fontSize: '28px' }}>Operational Notice Published!</h2>
          <p className="empty-state-description" style={{ maxWidth: '600px', fontSize: '15px' }}>
            Your notice is now live on the public Corridor Ledger and synchronized across highland mesh nodes.
          </p>
          <div style={{ width: '100%', maxWidth: '440px', margin: '24px 0', textAlign: 'left' }}>
            <NoticeCard notice={publishedNotice} />
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to={`/notices/${publishedNotice.id}`} className="btn-publish-submit" style={{ width: 'auto', padding: '12px 24px' }}>
              🔍 View Live Notice Detail
            </Link>
            <Link to="/owner" className="btn-emergency" style={{ padding: '12px 20px', fontSize: '14px' }}>
              🔑 Back to Host Desk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="ledger-hero" style={{ paddingBottom: '16px' }}>
        <div className="hero-text-block">
          <div className="hero-tracker">
            <span aria-hidden="true">✍️</span>
            <span>Host &amp; Dispatcher Gateway · Form Validation Active</span>
          </div>
          <h1 className="hero-title">Post an Operational Notice</h1>
          <p className="hero-description">
            Broadcast road access, generator availability, and drinking water status directly to the Corridor Ledger.
          </p>
        </div>
      </section>

      <NoticeForm
        initialValues={EMPTY_NOTICE}
        towns={towns}
        showTemplates
        submitting={submitting}
        submitError={submitError}
        serverFieldErrors={serverFieldErrors}
        onSubmit={handleSubmit}
        submitLabel="📢 Publish Operational Notice"
      />
    </div>
  );
}
