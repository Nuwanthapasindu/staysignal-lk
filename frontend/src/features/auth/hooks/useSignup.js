import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { readApiError } from '../types';

// Usable as useSignup() then signup(role, data), or useSignup(role) then signup(data).
export function useSignup(boundRole) {
  const { signup: doSignup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const signup = async (roleOrValues, maybeValues) => {
    const role = boundRole || roleOrValues;
    const values = boundRole ? roleOrValues : maybeValues;
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const user = await doSignup(role, values);
      // Account created — go to /login to sign in explicitly.
      navigate('/login', { replace: true, state: { registered: true, email: user.email } });
      return user;
    } catch (err) {
      const { message, fields } = readApiError(err);
      setFieldErrors(fields);
      if (!Object.keys(fields).length) setError(message || 'Could not create your account.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signup, submit: signup, loading, submitting: loading, error, formError: error, fieldErrors };
}
