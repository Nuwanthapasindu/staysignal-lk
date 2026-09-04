# StaySignal LK 
### Real-Time Highland Corridor Disruption Ledger & Stay Continuity Network

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-8.2.2-646CFF.svg)](https://vitejs.dev/)
[![Express.js](https://img.shields.io/badge/express-4.18.2-lightgrey.svg)](https://expressjs.com/)

---

## 📌 1. Project Title
**StaySignal LK** — A hyper-resilient, 2G/EDGE-optimized highland corridor disruption ledger and stay continuity network designed specifically for Sri Lanka's central highlands and mountainous transit routes.

---

## 🏔️ 2. The Selected Problem
Sri Lanka's central highlands (such as **Ella, Haputale, Nuwara Eliya, Hatton, Meemure, and the Ramboda pass**) frequently suffer from sudden severe weather, monsoonal flash floods, earth slips, culvert washouts, fallen trees, and utility blackouts. 

During these frequent disruption events:
1. **Critical Information Latency & Rumours**: Travellers, bus commuters, and dispatchers rely on unverified social media rumours and chaotic WhatsApp groups. Outdated advice often sends drivers down impassable passes.
2. **Economic Damage & Cancelled Bookings**: Accommodation providers (homestays, guest houses, and hotels) face massive cancellation waves when an entire valley is falsely assumed to be unreachable, even if bypass tracks exist.
3. **Severe Network Degradation (2G / EDGE Reality)**: In mountainous passes and deep valleys, 4G/5G connections degrade into intermittent 2G EDGE connectivity. Heavy travel apps and script-heavy booking websites fail to load or consume massive bandwidth when travellers need ground truth the most.
4. **Lack of Alternative Stay Coordination**: When a particular road or culvert is washed out, travellers have no unified interface to locate immediately accessible, open alternative stays situated before the road blockage.

---

## 💡 3. The Proposed Solution
**StaySignal LK** bridges the critical gap between field realities and traveller navigation through an ultra-lightweight, high-contrast digital corridor ledger:

- **SIM Gateway-Verified Field Dispatches**: Property owners and local transit dispatchers broadcast ground conditions directly using 30-second forms verified via local Sri Lankan SIM gateways.
- **3-Tier Standardized Operational Status**: Dispatches are organized into clear operational tiers: `Open & Clear` (Green), `Caution / Restricted` (Amber), and `Disrupted / Blocked` (Red).
- **Utility Telemetry & Bypass Guidance**: Notices provide concrete operational details: generator schedules, backup water storage levels, cellular network coverage, and specific vehicle bypass routes (e.g. 4x4 pickup shuttle routes or pedestrian portage).
- **Automated Stay Alternatives**: When a stay is marked as disrupted or closed, the system automatically suggests open stays nearby within the same town corridor.
- **Ultra-Low Bandwidth Architecture**: Optimized for 2G networks with a sub-15kb payload footprint, zero third-party tracking scripts, fast static rendering, and instant responsiveness.

---

## ✨ 4. Main Features

### 1. 📋 Public Corridor Disruption Ledger (`/notices`)
- Real-time searchable and filterable ledger of all active highland notices.
- Multi-dimensional filtering: by **Town** (*Ella, Haputale, Nuwara Eliya, Hatton, Meemure, Arugam Bay, Galle, Mirissa*), **Disruption Category** (*Landslide, Road Closed, Flooded Access, No Water, Power Cut, Bridge Unsafe, Network Down, Relocation*), and **Operational Status Tier**.
- Real-time search query matching against property names, road names, and advisory descriptions.
- Dynamic sorting: *Newest dispatches first* vs *Severity (Disrupted → Caution → Open)*.
- Shimmer loading skeletons, empty state fallback screens, and responsive filter drawer for mobile viewports.

### 2. 🔍 Notice Detail & Stay Alternatives (`/notices/:id`)
- 5 distinct status visual treatments: `Disrupted`, `Caution`, `Open & Clear`, `Closed`, and `Resolved`.
- **Operational Status Grid**: Real-time status for **Power/Generator** (e.g. *6:00 PM – 10:00 PM Active*), **Water Supply** (e.g. *3000L Reserve Tank Operating*), and **Connectivity** (e.g. *Dialog 4G + Starlink Mesh*).
- **Vehicle & Bypass Advice Callout**: Pinpoints exact vehicle clearance requirements and shuttle diversion paths.
- **Emergency Call Modal**: One-click host phone trigger (`tel:`) with number copying and safety briefing.
- **Nearby Open Stay Alternatives**: Automated recommendations of accessible stays in the same town corridor.

### 3. ✍️ Post Operational Notice with Form Validations (`/post`)
- **30-Second Fast Form**: Rapid dispatch submission with 1-click preset templates (*Culvert Washout, Earth Slip Delay, Water Bowser Delay, Normal Open Passage*).
- **Comprehensive Real-Time Validation**:
  - Property Title (3–80 characters).
  - Corridor Location (3–100 characters).
  - Headline (5–120 characters) & Description (10–1000 characters) with live character counters.
  - Sri Lankan Phone Validation supporting `07X XXX XXXX`, `+94 7X XXX XXXX`, and regional landlines (`052`, `057`, `081`, `091`).
  - Touched field tracking with smooth `.input-error` and `.input-success` styling.
- **Live NoticeCard Preview**: Split-screen desktop / stacked mobile card preview showing how the notice looks in real-time before broadcasting.

### 4. 🧭 Corridor Status Hub (`/towns/:slug`)
- Highland corridor selector with live mist/weather indicators, road clearance stats, and direct hotlines (Disaster Management Centre `117`, Suwa Seriya `1990`, Police Emergency `119`, RDA `1968`).

### 5. 📖 Guest Protocol & 2G System Architecture (`/how-it-works`)
- 3-step operational lifecycle: **Field Ground-Truth → 2G Mesh Sync → Corridor Ledger Broadcast**.
- Explanation of the 3 operational tiers and low-bandwidth payload metrics.

### 6. 📊 The Problem & Empirical Case Record (`/problem`)
- Empirical dividend metrics: **4.5 Hours Saved**, **92% Booking Retention**, **18 Monitored Corridors**, **14kb Mesh Size**.
- Comparative analysis (*Rumour Cycle vs Field Ledger*) and archived field report on the Ramboda Hairpin Monsoon.

### 7. 🛡️ Owner Operations Desk (`/owner`)
- Host management hub with verified SIM badge, 1-click status switcher, utility toggles, and broadcast metrics.

### 8. 📱 Responsive Mobile-First UX (360px – 1280px+)
- Responsive layouts tested on desktop, tablet, and 390px mobile viewports.
- Touch-friendly horizontal pill scrolling, animated mobile hamburger menu, slide-up filter sheet, and fixed bottom action bar (`Emergency Desk 117` / `Report Disruption`).

### 9. ⚡ Live Ticker Banner
- Sticky top ticker broadcasting urgent dispatch alerts, active verified desks, and highland telemetry across the application.

---

## 🛠️ 5. Technologies Used

### Frontend
- **React 18.3.1**: Modern component-based single page application architecture.
- **Vite 8.2.2**: Next-generation lightning-fast frontend tooling and build pipeline.
- **React Router DOM v6.30.3**: Client-side URL routing and corridor parameter navigation.
- **Axios**: HTTP client with base URL interceptors for robust REST API communication.
- **Vanilla CSS (Design System)**: Bespoke CSS design system with CSS custom properties (`--brand-forest`, `--status-disrupted`, etc.), fluid typography (`Fraunces` serif & `Inter` sans), glassmorphism, responsive grid/flexbox layouts, and zero heavy UI dependencies.

### Backend
- **Node.js**: Asynchronous JavaScript runtime environment.
- **Express.js 4.18.2**: High-performance RESTful API microservice.
- **Mongoose 8.1.1 & MongoDB**: Document-based data modeling with automatic indexing and connection timeouts.
- **Resilient In-Memory Fallback Layer**: Built-in seed data layer that operates smoothly if MongoDB is offline or in disconnected environments.
- **CORS & Dotenv**: Cross-Origin Resource Sharing and environment configuration management.

---

## 🤖 6. AI Tools Used
- **Google DeepMind Antigravity IDE**: Autonomous agentic software engineering environment used for:
  - System architecture design and project structuring.
  - Complete full-stack implementation of features, REST APIs, and UI components.
  - Custom responsive styling and CSS design token system creation.
  - Edge-case form validation logic (Sri Lankan phone regex, character limits, touched state management).
  - Realistic Sri Lankan highland seed dataset generation across 8 major corridors.
- **Google Gemini 2.0 Models**: Underlying large language model providing contextual reasoning, component synthesis, and automated code reviews.

---

## 👥 7. Team Member Details and Contributions

| # | Team Member Name | Student / Reg ID | Role | Key Contributions |
|---|------------------|------------------|------|-------------------|
| 1 | **Dias H.N.P.K.** | *IT24101003* | Full-Stack Developer & Lead | Backend REST API (`/api/notices`, `/api/ticker`, `/api/towns`), Public Corridor Ledger UI, Post Notice validation engine, Mobile responsive design system, and documentation. |
| 2 | **Nethmi Balasooriya** | *IT24102631* | *[Frontend for Notice and impact Pages]* | *[Corridor Status Page, Guest Protocol Page, and Notice Detail View implementations]* |
| 3 | **Rathnaweera O.V.** | *IT24101757* | *[Backend / QA Engineer]* | *[Database models, seed data curation, edge case validation testing, and API integration]* |
| 4 | **Bandara D.B.A.H.W.** | *IT24102009* | *[UX Designer / Researcher]* | *[Highland corridor problem research, user journey mapping, and visual aesthetic styling]* |

---

## 🚀 8. Installation and Execution Instructions

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)
- **MongoDB** (Optional: local instance or MongoDB Atlas connection string; application automatically falls back to in-memory seed store if offline)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Nuwanthapasindu/staysignal-lk.git
cd staysignal-lk
```

---

### Step 2: Backend Setup & Execution
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. *(Optional)* Create a `.env` file in `backend/` with:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/staysignal-lk
   ```
4. Start the backend API server:
   ```bash
   npm start
   # or for development mode:
   npm run dev
   ```
   *The server will start on `http://localhost:5000`.*

---

### Step 3: Frontend Setup & Execution
1. Open a new terminal and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run at `http://localhost:5173`.*

4. To build the production bundle:
   ```bash
   npm run build
   ```

---

### 📡 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Service health status and database connectivity mode |
| `GET` | `/api/notices` | Fetch all notices (supports `town`, `issue`, `status`, `q`, `from`, `to`, `sort`) |
| `GET` | `/api/notices/:id` | Fetch specific operational notice details |
| `GET` | `/api/notices/:id/alternatives` | Fetch open stay alternatives in the same town |
| `POST` | `/api/notices` | Publish a new operational notice (with input validation middleware) |
| `GET` | `/api/ticker` | Real-time urgent alerts and corridor telemetry |
| `GET` | `/api/towns` | List of all monitored highland corridor hubs |

---

## 🌐 9. Deployed Application Link
- **Live Web Application**: [https://staysignal-lk.vercel.app](https://staysignal-lk.vercel.app) *(or your deployed production URL)*
- **API Server Endpoint**: [https://staysignal-lk-api.onrender.com](https://staysignal-lk-api.onrender.com) *(or your deployed backend URL)*
- **Local Development URL**: `http://localhost:5173`

---

## 🎥 10. Demonstration Video Link
- **Video Walkthrough**: [https://youtube.com/watch?v=staysignal-lk-demo](https://youtube.com/watch?v=staysignal-lk-demo) *(or Loom / Google Drive link)*
- **Live Demo Highlights**:
  - `00:00` — Highland corridor problem background in Sri Lanka.
  - `00:45` — Public Disruption Ledger (`/notices`) search, filtering, and sorting.
  - `01:30` — Notice detail view, utility telemetry, and nearby alternative stays.
  - `02:15` — 30-Second Post Notice form with real-time Sri Lankan phone & character validations.
  - `03:00` — Mobile-first responsive layout (390px viewport, touch navigation, call modals).
  - `03:45` — Owner operations desk & emergency hub.

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

*Built with ❤️ for Sri Lanka's highland communities and travellers.*
