# FreechargeBiz × Axis Bank — Credit Card Recommendation Engine

An AI-powered product prototype built as part of the FreechargeBiz AI Product Manager internship assignment.

**Live Demo → [freecharge-prototype.netlify.app](https://freecharge-prototype.netlify.app)**

---

## What It Does

Most credit card discovery journeys rely on rigid questionnaires that result in high drop-offs and irrelevant recommendations. This prototype reimagines that journey.

The engine reads a user's financial footprint — via SMS transaction analysis, bank statement upload, or manual spend profiling — and surfaces a single personalized Axis Bank / Freecharge card recommendation backed by real rupee-value reasoning specific to that user.

---

## Product Journey (9 Screens)

| Phase | Screens | Objective |
|---|---|---|
| Identity & Trust | Onboarding → OTP | Establish safety before asking for data |
| Consent & Processing | Data Consent → Analysis | Make permission feel safe, not coercive |
| Profile Building | Insights Dashboard → Spend Profiler | Anchor inputs to detected reality |
| Recommendation & Conversion | Card Match → Compare → Apply | Answer 'why this card, for me' with real numbers |

---

## Key Features

- **3 data input paths** — SMS analysis, PDF/CSV bank statement upload, manual lifestyle profiler
- **DPDP Act 2023 compliant** consent screen — bottom sheet, manual checkbox, purpose-limited language
- **Dynamic personalized reasoning** — recommendation copy references user's actual spend figures, not generic text
- **Interactive reward calculator** — projects annual value at any spend level
- **3D flippable credit card** with EMV chip and network badge
- **One-tap application flow** — employment type capture + reference ID generation
- **Full card compare screen** — all 3 cards with matched card pinned

---

## Cards in Catalog

| Card | Best For | Annual Fee | Yield |
|---|---|---|---|
| Axis My Zone | Urban daily spenders | ₹0 | 3.5% |
| Axis Atlas | Frequent travellers | ₹5,000 | 5.0% |
| Axis ACE | Digital shoppers | ₹499 | 5.4% |

---

## Tech Stack

- **React** (Hooks only — useState, useEffect, useRef)
- **Vite** — local dev and build
- **Pure CSS-in-JS** — no external UI libraries
- **Netlify** — deployment

---

## Documents

| File | Description |
|---|---|
| `FreechargeBiz_PRD_Prathmesh_Sakore.pdf` | Full PRD — Problem Statement, User Personas, User Journey, Technical Architecture, User Stories, MoSCoW Prioritization, Success Metrics, Risks |

---

## Local Setup

```bash
git clone https://github.com/YOUR_USERNAME/freechargebiz-credit-card-engine.git
cd freechargebiz-credit-card-engine
npm install
npm run dev
```

Open `localhost:5173`

---

## Author

**Prathmesh Sakore**  
3rd Year Engineering Student  
AI Product Manager Candidate  

[LinkedIn](https://linkedin.com/in/YOUR_LINKEDIN) · [Live Demo](https://freecharge-prototype.netlify.app)

---

*Built for FreechargeBiz AI PM Internship — Round 2 Assignment, May 2026*
