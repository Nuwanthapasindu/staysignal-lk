import { Link } from 'react-router-dom';

/**
 * The split-panel auth shell from the StaySignal mockups: an editorial aside on
 * the left, the form card on the right. App Header/Footer are supplied by the
 * router's <Layout>, so this only renders the page body.
 */
export default function AuthLayout({ eyebrow, title, intro, aside, children }) {
  return (
    <>
      <div className="auth-status-strip">
        <div className="auth-status-strip__inner">
          <strong>Owner &amp; Desk Access</strong>
          <span>· Corridor status relay for Sri Lankan hospitality operators</span>
        </div>
      </div>
      <div className="auth-shell">
        <div className="auth-shell__head">
          <span className="badge">● {eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className="auth-grid">
          <aside className="auth-aside">{aside}</aside>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}

export function AuthAside({ spec, heading, body, points = [], stat }) {
  return (
    <>
      <div className="auth-aside__row">
        <span className="badge">◇ Direct account auth</span>
        {spec && <span className="auth-aside__spec">{spec}</span>}
      </div>
      <h2>{heading}</h2>
      <p>{body}</p>
      {points.length > 0 && (
        <ul className="auth-aside__list">
          {points.map((p) => (
            <li key={p.title}>
              <strong>{p.title}</strong>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      )}
      {stat && (
        <div className="auth-aside__stat">
          <b>{stat.value}</b>
          <span>{stat.label}</span>
        </div>
      )}
    </>
  );
}

export function AuthCardFoot({ prompt, linkTo, linkText }) {
  return (
    <div className="auth-card__foot">
      <span>{prompt}</span>
      <Link className="btn btn-ghost" to={linkTo}>
        {linkText}
      </Link>
    </div>
  );
}
