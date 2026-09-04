import { useState } from 'react';
import TextField from './TextField';
import PasswordField from './PasswordField';
import { useSignup } from '../hooks/useSignup';
import { validate, MESSAGES } from '../validation';

const EMPTY = { name: '', email: '', phone: '', password: '', confirmPassword: '' };

/**
 * Shared signup form. `role` picks the endpoint + redirect; `schema` and
 * `phoneRequired` differ between traveller and owner.
 */
export default function SignupForm({ role, schema, phoneRequired, eyebrow, title, intro, cta, note }) {
  const { submit, submitting, formError, fieldErrors } = useSignup(role);
  const [values, setValues] = useState(EMPTY);
  const [clientErrors, setClientErrors] = useState({});

  const errors = { ...fieldErrors, ...clientErrors };
  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const { data, errors: errs } = validate(schema, values);
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
        <span className="auth-card__eyebrow">{eyebrow}</span>
        <span className="auth-card__lock">🔒 Encrypted gateway</span>
      </div>
      <h2>{title}</h2>
      <p className="auth-card__intro">{intro}</p>

      {formError && <div className="form-alert" role="alert">{formError}</div>}

      <TextField
        id="name"
        label="Manager / lead host name"
        autoComplete="name"
        value={values.name}
        onChange={onChange}
        error={errors.name}
        placeholder="e.g. Bandara Senanayake"
      />
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
      <TextField
        id="phone"
        label={phoneRequired ? 'Primary mobile (SMS enabled)' : 'Mobile (optional)'}
        inputMode="tel"
        autoComplete="tel"
        value={values.phone}
        onChange={onChange}
        error={errors.phone}
        hint={phoneRequired ? MESSAGES.phoneRequired : 'Sri Lankan mobile — 07X XXX XXXX or +947XXXXXXXX'}
        placeholder="077 123 4567"
      />
      <div className="field-row">
        <PasswordField
          id="password"
          label="Password"
          autoComplete="new-password"
          value={values.password}
          onChange={onChange}
          error={errors.password}
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword}
        />
      </div>
      <p className="field__hint" style={{ marginTop: '-0.4rem', marginBottom: '1rem' }}>
        {MESSAGES.passwordWeak}
      </p>

      {note && <p className="auth-card__intro" style={{ borderBottom: 'none', paddingBottom: 0 }}>{note}</p>}

      <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
        {submitting ? 'Creating…' : cta}
      </button>
    </form>
  );
}
