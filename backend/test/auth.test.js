import test, { before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { startServer, stopServer, resetDb, makeClient, decodeJwt } from '../testkit/helpers.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';
import { HttpError } from '../utils/httpError.js';
import {
  signupTravellerSchema,
  signupOwnerSchema,
  SL_PHONE_RE,
} from '../validators/auth.validation.js';

let baseUrl;

before(async () => {
  baseUrl = await startServer();
});
after(stopServer);
beforeEach(resetDb);

const TRAVELLER = {
  name: 'Kasun Silva',
  email: 'kasun@gmail.com',
  password: 'Travel123!',
  confirmPassword: 'Travel123!',
};
const OWNER = {
  name: 'Amali Perera',
  email: 'amali@zionview.lk',
  password: 'Owner123!',
  confirmPassword: 'Owner123!',
  phone: '0771234567',
};

test('traveller signup → 201, role traveller, no password_hash', async () => {
  const c = makeClient();
  const res = await c('/api/auth/signup/traveller', { method: 'POST', body: TRAVELLER });
  assert.equal(res.status, 201);
  assert.equal(res.body.user.role, 'traveller');
  assert.equal('password_hash' in res.body.user, false);
  assert.ok(res.body.accessToken);
  assert.ok(res.rawCookie?.startsWith('refresh_token='));
});

test('owner signup without phone → 400 with fields.phone', async () => {
  const c = makeClient();
  const { phone, ...noPhone } = OWNER;
  const res = await c('/api/auth/signup/owner', { method: 'POST', body: noPhone });
  assert.equal(res.status, 400);
  assert.ok(res.body.error.fields.phone);
});

test('duplicate email → 409 with fields.email', async () => {
  const c = makeClient();
  await c('/api/auth/signup/traveller', { method: 'POST', body: TRAVELLER });
  const res = await c('/api/auth/signup/traveller', { method: 'POST', body: TRAVELLER });
  assert.equal(res.status, 409);
  assert.ok(res.body.error.fields.email);
});

test('single /login works for both roles and the JWT role matches the DB', async () => {
  await makeClient()('/api/auth/signup/traveller', { method: 'POST', body: TRAVELLER });
  await makeClient()('/api/auth/signup/owner', { method: 'POST', body: OWNER });

  const t = await makeClient()('/api/auth/login', {
    method: 'POST',
    body: { email: TRAVELLER.email, password: TRAVELLER.password },
  });
  assert.equal(t.status, 200);
  assert.equal(decodeJwt(t.body.accessToken).role, 'traveller');

  const o = await makeClient()('/api/auth/login', {
    method: 'POST',
    body: { email: OWNER.email, password: OWNER.password },
  });
  assert.equal(o.status, 200);
  assert.equal(decodeJwt(o.body.accessToken).role, 'owner');
});

test('wrong password → 401 with the generic message', async () => {
  const c = makeClient();
  await c('/api/auth/signup/traveller', { method: 'POST', body: TRAVELLER });
  const res = await c('/api/auth/login', {
    method: 'POST',
    body: { email: TRAVELLER.email, password: 'wrong-password-1' },
  });
  assert.equal(res.status, 401);
  assert.equal(res.body.error.message, 'Email or password is incorrect.');
});

test('unknown email → 401 with the same generic message', async () => {
  const res = await makeClient()('/api/auth/login', {
    method: 'POST',
    body: { email: 'nobody@example.com', password: 'whatever12' },
  });
  assert.equal(res.status, 401);
  assert.equal(res.body.error.message, 'Email or password is incorrect.');
});

test('GET /api/auth/me — 200 with token, 401 without', async () => {
  const c = makeClient();
  const signup = await c('/api/auth/signup/traveller', { method: 'POST', body: TRAVELLER });
  const ok = await c('/api/auth/me', { token: signup.body.accessToken });
  assert.equal(ok.status, 200);
  assert.equal(ok.body.user.email, TRAVELLER.email);

  const anon = await c('/api/auth/me');
  assert.equal(anon.status, 401);
});

test('tampered / invalid access token → 401', async () => {
  const res = await makeClient()('/api/auth/me', { token: 'not.a.jwt' });
  assert.equal(res.status, 401);
});

test('refresh rotates: old refresh cookie stops working, new one works', async () => {
  const c = makeClient();
  const signup = await c('/api/auth/signup/traveller', { method: 'POST', body: TRAVELLER });
  const originalCookie = signup.rawCookie;

  const r1 = await c('/api/auth/refresh', { method: 'POST' });
  assert.equal(r1.status, 200);
  assert.notEqual(r1.rawCookie, originalCookie);

  // Replay the pre-rotation cookie explicitly → must be rejected.
  const stale = await c('/api/auth/refresh', { method: 'POST', cookie: originalCookie });
  assert.equal(stale.status, 401);

  // The rotated cookie (restored on the client by the failed call? no — set it back) still works.
  c.cookie = r1.rawCookie;
  const r2 = await c('/api/auth/refresh', { method: 'POST' });
  assert.equal(r2.status, 200);
});

test("requireRole('owner') — traveller 403, owner passes", async () => {
  // throwaway app that mounts only the middleware under test
  const probe = express();
  probe.get('/owner-only', requireAuth, requireRole('owner'), (_req, res) => res.json({ ok: true }));
  // eslint-disable-next-line no-unused-vars
  probe.use((err, _req, res, _next) => {
    if (err instanceof HttpError) return res.status(err.status).json({ error: { code: err.code, message: err.message } });
    res.status(500).json({ error: { code: 'INTERNAL' } });
  });
  const server = probe.listen(0);
  const url = `http://127.0.0.1:${server.address().port}`;

  const c = makeClient();
  const t = await c('/api/auth/signup/traveller', { method: 'POST', body: TRAVELLER });
  const o = await c('/api/auth/signup/owner', { method: 'POST', body: OWNER });

  const asTraveller = await fetch(`${url}/owner-only`, {
    headers: { authorization: `Bearer ${t.body.accessToken}` },
  });
  assert.equal(asTraveller.status, 403);
  assert.equal((await asTraveller.json()).error.code, 'FORBIDDEN');

  const asOwner = await fetch(`${url}/owner-only`, {
    headers: { authorization: `Bearer ${o.body.accessToken}` },
  });
  assert.equal(asOwner.status, 200);

  await new Promise((resolve) => server.close(resolve));
});

test('unit: signup schema rejects password mismatch on confirmPassword', () => {
  const res = signupTravellerSchema.safeParse({ ...TRAVELLER, confirmPassword: 'different1' });
  assert.equal(res.success, false);
  assert.equal(res.error.issues.find((i) => i.path[0] === 'confirmPassword')?.message, 'Passwords do not match.');
});

test('unit: SL owner-phone regex', () => {
  for (const ok of ['0771234567', '+94771234567', '0112345678']) assert.ok(SL_PHONE_RE.test(ok));
  for (const bad of ['123', '07712345', '771234567', '+9477123456', '0771234567 ']) {
    assert.equal(SL_PHONE_RE.test(bad), false);
  }
  assert.equal(signupOwnerSchema.safeParse({ ...OWNER, phone: '123' }).success, false);
  assert.equal(signupOwnerSchema.safeParse({ ...OWNER, phone: '+94771234567' }).success, true);
});
