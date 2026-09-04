import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { readApiError } from '../types';

export function useSignup(role) {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const submit = async (values) => {
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});
    try {
      const user = await signup(role, values);
      // Account created — send them to /login to sign in explicitly.
      navigate('/login', { replace: true, state: { registered: true, email: user.email } });
    } catch (err) {
      const { message, fields } = readApiError(err);
      setFieldErrors(fields);
      if (!Object.keys(fields).length) setFormError(message || 'Could not create your account.');
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting, formError, fieldErrors };
}
