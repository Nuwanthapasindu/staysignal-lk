import env from '../config/env.js';
import { httpError } from '../utils/httpError.js';
import * as authService from '../services/auth.service.js';
import {
  signupTravellerSchema,
  signupOwnerSchema,
  loginSchema,
  toFieldErrors,
} from '../validators/auth.validation.js';

const REFRESH_COOKIE = 'refresh_token';
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: env.IS_PROD,
  sameSite: 'lax',
  path: '/api/auth',
};

const setRefreshCookie = (res, token) =>
  res.cookie(REFRESH_COOKIE, token, { ...cookieOptions, maxAge: REFRESH_TTL_MS });

const clearRefreshCookie = (res) => res.clearCookie(REFRESH_COOKIE, cookieOptions);

const parseOr400 = (schema, body) => {
  const result = schema.safeParse(body);
  if (!result.success) {
    throw httpError(400, 'VALIDATION', 'Please fix the highlighted fields.', toFieldErrors(result.error));
  }
  return result.data;
};

const sendSession = (res, status, { user, accessToken, refreshToken }) => {
  setRefreshCookie(res, refreshToken);
  res.status(status).json({ user, accessToken });
};

const signupHandler = (schema, role) => async (req, res) => {
  const data = parseOr400(schema, req.body);
  const result = await authService.signup({ ...data, role });
  sendSession(res, 201, result);
};

export const signupTraveller = signupHandler(signupTravellerSchema, 'traveller');
export const signupOwner = signupHandler(signupOwnerSchema, 'owner');

export const login = async (req, res) => {
  const data = parseOr400(loginSchema, req.body);
  const result = await authService.login(data);
  sendSession(res, 200, result);
};

export const refresh = async (req, res) => {
  const result = await authService.refresh(req.cookies?.[REFRESH_COOKIE]);
  sendSession(res, 200, result);
};

export const logout = async (req, res) => {
  await authService.logout(req.cookies?.[REFRESH_COOKIE]);
  clearRefreshCookie(res);
  res.status(200).json({ ok: true });
};

export const me = async (req, res) => {
  const user = await authService.getUserById(req.user.id);
  res.json({ user });
};
