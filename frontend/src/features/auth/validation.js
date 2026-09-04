// Mirrors backend/validators/auth.validation.js — same rules, same messages.
import { z } from 'zod';

export const MESSAGES = {
  nameRequired: 'Name is required.',
  nameLength: 'Name must be between 2 and 80 characters.',
  emailRequired: 'Email is required.',
  emailInvalid: 'Enter a valid email address.',
  passwordWeak: 'Password must be at least 8 characters and include a letter and a number.',
  passwordMismatch: 'Passwords do not match.',
  phoneRequired: 'Use a Sri Lankan mobile so we can reach you — 07X XXX XXXX',
  phoneInvalid: 'Use a Sri Lankan mobile so we can reach you — 07X XXX XXXX',
  credentials: 'Email or password is incorrect.',
  emailTaken: 'An account with this email already exists.',
};

export const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
export const SL_PHONE_RE = /^(?:0\d{9}|\+94\d{9})$/;

const name = z
  .string({ error: MESSAGES.nameRequired })
  .trim()
  .min(2, MESSAGES.nameLength)
  .max(80, MESSAGES.nameLength);

const email = z
  .string({ error: MESSAGES.emailRequired })
  .trim()
  .toLowerCase()
  .pipe(z.email(MESSAGES.emailInvalid));

const password = z.string({ error: MESSAGES.passwordWeak }).regex(PASSWORD_RE, MESSAGES.passwordWeak);

const ownerPhone = z.string({ error: MESSAGES.phoneRequired }).trim().regex(SL_PHONE_RE, MESSAGES.phoneInvalid);

const optionalPhone = z.preprocess(
  (v) => (v === '' || v == null ? undefined : v),
  z.string().trim().regex(SL_PHONE_RE, MESSAGES.phoneInvalid).optional()
);

const withConfirm = (schema) =>
  schema.refine((d) => d.password === d.confirmPassword, {
    message: MESSAGES.passwordMismatch,
    path: ['confirmPassword'],
  });

export const signupTravellerSchema = withConfirm(
  z.object({ name, email, password, confirmPassword: z.string(), phone: optionalPhone })
);

export const signupOwnerSchema = withConfirm(
  z.object({ name, email, password, confirmPassword: z.string(), phone: ownerPhone })
);

export const loginSchema = z.object({
  email: z.string().trim().min(1, MESSAGES.emailRequired),
  password: z.string().min(1, 'Password is required.'),
});

/** ZodError -> { field: firstMessage } */
export const toFieldErrors = (zodError) => {
  const fields = {};
  for (const issue of zodError.issues) {
    const key = issue.path[0] ?? '_';
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
};

/** Validate `values` against `schema`; returns { data } or { errors }. */
export const validate = (schema, values) => {
  const result = schema.safeParse(values);
  return result.success ? { data: result.data } : { errors: toFieldErrors(result.error) };
};
