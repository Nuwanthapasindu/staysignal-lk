import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { HOME_BY_ROLE } from '../context/authContext';
import { readApiError } from '../types';

export function useLogin() {
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Accepts either login(email, password) or login({ email, password }).
  const login = async (emailOrValues, maybePassword) => {
    const values =
      emailOrValues && typeof emailOrValues === 'object'
        ? emailOrValues
        : { email: emailOrValues, password: maybePassword };
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const user = await doLogin(values);
      const dest = location.state?.from || HOME_BY_ROLE[user.role] || '/';
      navigate(dest, { replace: true });
      return user;
    } catch (err) {
      const { message, fields } = readApiError(err);
      setFieldErrors(fields);
      setError(message || 'Could not sign you in.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, submit: login, loading, submitting: loading, error, formError: error, fieldErrors };
}
