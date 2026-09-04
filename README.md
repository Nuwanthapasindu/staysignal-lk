# staysignal-lk

MINI hackathon — a corridor-status / stay-disruption board for Sri Lankan
guest-house operators and travellers.

- `backend/` — Express 5 + Mongoose 9 (MongoDB), plain-JS ESM
- `frontend/` — React 19 + Vite 8 + React Router 7, feature-sliced

## Running locally

```bash
# backend
cd backend
cp .env.example .env        # fill in MONGO_URI + the two JWT secrets
npm install
npm run seed                # creates the two demo users below
npm run dev                 # http://localhost:5000

# frontend (separate terminal)
cd frontend
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173 (proxies /api -> :5000)
```

`npm test` (in `backend/`) runs the auth test suite. It needs `MONGO_URI_TEST`
pointing at a **throwaway** database — it drops collections between tests.

## Authentication

JWT auth with two roles, stored as an enum (`traveller`, `owner`).

### Accounts

| Screen | Route | Who |
| --- | --- | --- |
| Log in | `/login` | both roles, email + password |
| Sign up as traveller | `/signup/traveller` | name, email, password, phone *(optional)* |
| Sign up as owner | `/signup/owner` | name, email, password, phone *(required, SL mobile)* |

The role is fixed by the signup route — the API ignores any `role` sent in the body.
**Signup creates the account only** (no session); the user is redirected to `/login`
to sign in. After login you land on `/notices` (traveller) or `/owner` (owner).

Demo users (seeded by `npm run seed`, **demo only**):

- `amali@zionview.lk` / `Owner123!` — owner
- `kasun@gmail.com` / `Travel123!` — traveller

### Tokens

- **Access token** — 15 min, HS256, carries `{ sub, email, role, typ:"access" }`.
  Returned as JSON `{ accessToken }` and kept in React memory only (never
  `localStorage`). Sent as `Authorization: Bearer <token>`.
- **Refresh token** — 7 days, in an httpOnly `SameSite=Lax` cookie scoped to
  `/api/auth`. Hashed (SHA-256) in `refresh_tokens`, rotated on every
  `/api/auth/refresh`, revoked on logout. The axios client silently refreshes
  once on a 401 and retries, otherwise logs the user out.

### API — all under `/api/auth`

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| POST | `/signup/traveller` | public | 201 `{ user }`, no session |
| POST | `/signup/owner` | public | phone required, no session |
| POST | `/login` | public | 401 `Email or password is incorrect.` for bad email *or* password |
| POST | `/refresh` | refresh cookie | rotates the refresh token |
| POST | `/logout` | cookie | revokes + clears the cookie |
| GET | `/me` | access token | current user, no `password_hash` |

Errors use `{ error: { code, message, fields? } }`. Duplicate email → 409 with
`fields.email`.

### Protecting routes

Backend middleware (`backend/middleware/auth.middleware.js`):

```js
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

router.post('/notices', requireAuth, requireRole('owner'), createNotice);
```

`requireAuth` verifies the Bearer access token and sets
`req.user = { id, email, role }`. `requireRole('owner')` returns 403
`{ code: "FORBIDDEN" }` for anyone else. *(Notice endpoints are not built yet —
the middleware is ready for whoever adds them.)*

Frontend guards (`frontend/src/features/auth`):

- `<RequireAuth>` — redirects anonymous users to `/login`
- `<RequireRole role="owner">` — sends the wrong role to `/unauthorized`
- `<GuestOnly>` — bounces logged-in users off `/login` and `/signup/*`

`/owner`, `/post`, `/notices/:id/edit` are owner-only. Everything else
(landing, problem, how-it-works, impact, town boards, notice browse + detail)
stays public.

### Validation

Same rules and messages on both sides (Zod — `backend/validators/auth.validation.js`
and `frontend/src/features/auth/validation.js`):

- email — valid, stored lowercase
- password — min 8, at least one letter and one number
- confirm password must match
- name — 2–80 chars
- owner phone — `07XXXXXXXX` or `+947XXXXXXXX`
