import mongoose from 'mongoose';
import env from '../config/env.js';
import app from '../app.js';

if (!env.MONGO_URI_TEST) {
  throw new Error('MONGO_URI_TEST is required to run tests (it drops collections between tests).');
}

let server;
let baseUrl;

export const startServer = async () => {
  await mongoose.connect(env.MONGO_URI_TEST);
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  return baseUrl;
};

export const stopServer = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await new Promise((resolve) => server.close(resolve));
};

export const resetDb = async () => {
  const { collections } = mongoose.connection;
  await Promise.all(Object.values(collections).map((c) => c.deleteMany({})));
};

/** Minimal fetch wrapper that tracks the refresh cookie like a browser would. */
export const makeClient = () => {
  const request = async (path, { method = 'GET', body, token, cookie } = {}) => {
    const headers = {};
    if (body !== undefined) headers['content-type'] = 'application/json';
    if (token) headers.authorization = `Bearer ${token}`;
    const sent = cookie !== undefined ? cookie : request.cookie;
    if (sent) headers.cookie = sent;

    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    for (const c of res.headers.getSetCookie?.() ?? []) {
      const [pair] = c.split(';');
      if (pair.startsWith('refresh_token=')) {
        request.cookie = pair === 'refresh_token=' ? null : pair;
      }
    }

    const text = await res.text();
    let json;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = text;
    }
    return { status: res.status, body: json, rawCookie: request.cookie };
  };
  request.cookie = null;
  return request;
};

export const decodeJwt = (token) => JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
