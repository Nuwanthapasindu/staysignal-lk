import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from './TextField';
import PasswordField from './PasswordField';
import { useLogin } from '../hooks/useLogin';
import { validate, loginSchema } from '../validation';

export default function LoginForm() {
  const { submit, submitting, formError, fieldErrors } = useLogin();
  const [values, setValues] = useState({ email: '', password: '' });
  const [clientErrors, setClientErrors] = useState({});

  const errors = { ...fieldErrors, ...clientErrors };
  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const { data, errors: errs } = validate(loginSchema, values);
    if (errs) {
      setClientErrors(errs);
      return;
    }
    setClientErrors({});
    submit(data);
  };

  return (
    <form className="auth-card" onSubmit={onSubmit} noValidate>
      <div className="auth-card__row">
        <span className="auth-card__eyebrow">Terminal clearance</span>
        <span className="auth-card__lock">🔒 Encrypted gateway</span>
      </div>
      <h2>Sign in to your Stay Desk</h2>
      <p className="auth-card__intro">
        Broadcast road closures, water rationing schedules, and generator hours directly to drivers and incoming guests.
      </p>

      {formError && <div className="form-alert" role="alert">{formError}</div>}

      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
        placeholder="you@example.lk"
      />
      <PasswordField
        id="password"
        label="Password"
        autoComplete="current-password"
        value={values.password}
        onChange={onChange}
        error={errors.password}
      />

      <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
        {submitting ? 'Verifying…' : 'Verify & Enter Host Desk →'}
      </button>

      <div className="auth-card__foot">
        <span>New to StaySignal?</span>
        <span>
          <Link to="/signup/traveller">Create traveller account</Link> ·{' '}
          <Link to="/signup/owner">I run a stay — sign up</Link>
        </span>
      </div>
    </form>
  );
}
