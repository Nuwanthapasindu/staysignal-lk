import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="narrow-page">
      <span className="badge">● Restricted area</span>
      <h1>This area is for guest-house owners.</h1>
      <p>
        Your account is a traveller account. Owner desks can post and resolve corridor notices — travellers can browse
        every notice without signing in.
      </p>
      <div className="narrow-page__actions">
        <Link className="btn btn-primary" to="/notices">
          Browse notices
        </Link>
        <Link className="btn btn-ghost" to="/signup/owner">
          Register a stay
        </Link>
      </div>
    </div>
  );
}
