import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { HOME_BY_ROLE } from '../context/authContext';
import { readApiError } from '../types';

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const submit = async (values) => {
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});
    try {
      const user = await login(values);
      const dest = location.state?.from || HOME_BY_ROLE[user.role] || '/';
      navigate(dest, { replace: true });
    } catch (err) {
      const { message, fields } = readApiError(err);
      setFieldErrors(fields);
      setFormError(message || 'Could not sign you in.');
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting, formError, fieldErrors };
}
