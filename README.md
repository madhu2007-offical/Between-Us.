# Between Us • by Natchkin

> **A private, judgment-free digital companion designed for teenage girls (12–17 years old) to understand puberty, menstrual cycles, and early hormonal/PCOS patterns.**  
> Delivered as a mobile-first PWA accessible directly via a QR code printed inside Natchkin period products.

---

## 🌸 Emotional & Human Context

Between Us was designed through the lens of a 14-year-old girl in India using her phone in a school bathroom stall between classes:
- **Anxious & Rushed**: She needs answers in seconds, with zero typing and zero sound.
- **Privacy Anxiety**: Siblings or parents might check her phone. The app features **zero-account local encryption** and a **1-tap "Quick Disguise" (Camouflage Mode)** that immediately swaps the screen to an innocent science revision notes / math calculator interface.
- **Tone**: An understanding, warm older sister — never an intimidating medical clinical form, and never babyish.
- **Color Direction**: Warm cream (`#FDFBF7`), soft dusty rose (`#D98880`), and deep plum accents (`#4A2040`). Absolutely no stereotypical bright red blood drops or alarmist graphics.

---

## 🚀 Core Features (5 Modules)

### 1. Entry / Onboarding
- **Zero Mandatory Sign-Up**: No phone number, name, or email required.
- **PWA Instant Access**: Scanned from the QR code inside Natchkin pads (`/?source=qr_pack`), loads instantly in browser with offline service worker support.
- **Immediate Privacy Promise**: Bold, prominent reassurance on first open: *"Your data stays strictly on this device and never leaves unless you choose to show someone."*
- **Optional Anonymous Profile**: Simple 2-question setup (age bracket and period stage) stored strictly in `localStorage`.

### 2. "Ask" — Grounded Sister Q&A Chat
- **WhatsApp-Style Bubbles**: Familiar, low-cognitive-load conversational UI.
- **Hard-Coded Safety Shield (`server/rag/safetyFilter.ts`)**:
  - Intercepts crisis keywords before any model invocation (self-harm, sexual abuse, assault, severe hemorrhage, toxic shock syndrome).
  - Bypasses LLM generation entirely and returns an immediate, compassionate **Emergency Safety Card** with active, verified Indian helplines:
    - **1098**: Childline India (24/7 free youth emergency)
    - **181**: Women & Girls Helpline (24/7 crisis support)
    - **14416**: Tele-MANAS (Govt of India 24/7 mental health counseling)
    - **112**: National Emergency Dispatch
- **Constrained RAG Pipeline (`server/rag/retrieval.ts` & `generator.ts`)**:
  - TF-IDF and token-frequency semantic retrieval over a vetted 46+ Q&A adolescent health repository.
  - Gemini Flash prompt strictly bounded to retrieve context: **never speculates, never diagnoses, and never concludes "PCOS"** (only "pattern worth discussing with a doctor").
  - **Deterministic Curated Fallback**: Seamlessly answers with top vetted clinical advice if offline or without an API key.
  - **Honest Fallback**: When out-of-domain questions are asked, admits uncertainty kindly and advises asking an adult/nurse.

### 3. "Log" — 10-Second 3-Tap Tracker
- **Strictly Silent & Tap-Only**: No typing, no voice (engineered for bathroom stalls).
- **3-Tap Sequence**:
  1. **Flow**: Spotting 💧 • Light 🩸 • Medium 🩸🩸 • Heavy 🩸🩸🩸
  2. **Comfort & Pain**: 0 (None) • 1 (Mild) • 2 (Moderate) • 3 (Severe)
  3. **Mood & Quick Signs**: Calm • Sensitive • Tired • Energetic • Anxious (+ 1-tap tags for Acne, Cramps, Bloating, Backache)
- **Rule-Based Pattern Engine (`src/utils/patternEngine.ts`)**:
  - Analyzes inter-cycle intervals across logged cycles.
  - Flags if cycles fall outside 21–45 days across 3+ cycles, or if 2+ hormonal flags co-occur (e.g. 48-day intervals + persistent cystic acne).
  - Non-diagnostic guardrail: framed as *"A pattern worth mentioning to a doctor"* with reassurance that adolescent bodies often take 2–3 years to stabilize.

### 4. "Show Someone" — Teen-Initiated Summary Card
- **Differentiating Feature**: Solves the awkwardness teens face when trying to talk to adults.
- **Explicit Consent**: Never auto-shares or sends background alerts. Triggered only when the teen taps *"Create My Summary Card"*.
- **Features**:
  - **Audience Mode**: Tailored for *"Mom / Older Sister"* or *"Doctor / Clinic"*.
  - **Visual Preview**: Clean metrics (average cycle length, dates, frequent symptoms, non-clinical pattern note).
  - **Word-for-Word Conversation Scripts**: E.g., *"Hey Mom, my tracker showed some longer cycle gaps over the last few months. Can we visit a doctor to make sure my hormones are happy and learn how to manage cramps?"*
  - **HTML5 Canvas PNG Export**: 1-tap download of a high-resolution share card for WhatsApp.
  - **Hand-Over Mode**: Full-screen view designed to physically hand the phone to a parent or clinician.

### 5. Home, Navigation & Quick Disguise
- **3-Tab Navigation**: Home, Log Today, Ask Sister.
- **Quick Disguise Button (Header)**: Instantly switches to an innocent Class 10 Science Revision Notes & Working Calculator screen if someone approaches the bathroom stall.
- **Rhythm Wheel**: Calm progress arc tracking days since the last period and supportive daily self-care advice.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript + Vite | Blazing fast client-rendered PWA |
| **Styling** | Tailwind CSS v3 | Warm cream, dusty rose, and plum palette |
| **Icons** | Lucide React | High-contrast, friendly iconography |
| **Canvas** | Native HTML5 Canvas API | High-resolution visual card image generator |
| **Storage** | LocalStorage / IndexedDB | 100% on-device local encryption; zero tracking |
| **Backend** | Express 5 + TypeScript (`tsx`) | API routing, safety shield, RAG pipeline |
| **AI / RAG** | Gemini 2.5 Flash (`@google/genai`) | Constrained grounded generation |
| **Vector / Retrieval** | Token TF-IDF + Cosine Overlap | Fast, deterministic matching over knowledge base |

---

## 📖 How to Run Locally

### 1. Installation
```bash
npm install
```

### 2. Development Mode
Run both frontend (port 5173) and backend (port 3001) concurrently:
```bash
npm run dev
```

### 3. Production Build & Run
```bash
npm run build
npm run start
```
The server will be live at `http://localhost:3001`.

### 4. Running Automated Verification Tests
```bash
npx tsx server/test-suite.ts
```
Runs 15 automated unit tests verifying the safety shield, retrieval engine, fallback generator, and pattern engine.

---

## 🛡️ RAG Pipeline & Safety Details

```
[User Question]
       │
       ▼
┌───────────────────────────────────────────────┐
│ 1. HARD-CODED SAFETY FILTER (safetyFilter.ts) │
│ - Self-Harm / Suicide                         │
│ - Abuse / Assault / Molestation               │
│ - Acute Hemorrhage (soaking pad <1h, faint)   │
│ - Toxic Shock Syndrome (tampon + high fever)  │
└───────────────────────┬───────────────────────┘
            │           │
       [Matched]   [Clean / Safe]
            │           │
            ▼           ▼
┌──────────────────┐ ┌───────────────────────────────────────────────┐
│ Emergency Safety │ │ 2. HYBRID RETRIEVAL (retrieval.ts)            │
│ Card (Bypasses   │ │ - Matches query against 46+ curated items     │
│ LLM completely)  │ │ - BM25 / TF-IDF scoring + keyword boost       │
└──────────────────┘ └───────────────────────┬───────────────────────┘
                                             │
                        ┌────────────────────┴────────────────────┐
                        ▼                                         ▼
            [Score < Threshold]                     [Confident Match Found]
                        ▼                                         ▼
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│ 3. HONEST FALLBACK                   │     │ 4. CONSTRAINED GENERATION            │
│ "I don't have verified notes on this │     │ - Strictly bounded to context        │
│ topic yet. Here is how to ask a      │     │ - Tone: Empathetic Big Sister        │
│ nurse or doctor..."                  │     │ - Guardrail: Never diagnose PCOS     │
└──────────────────────────────────────┘     │ - Live Gemini Flash or Vetted Curated│
                                             └──────────────────────────────────────┘
```

---

## 📚 Extending the Knowledge Base

To add new adolescent health questions or regional adaptations (e.g. Hindi/Tamil/Bengali terms):
1. Open `server/rag/knowledgeBase.ts`.
2. Add a new `KnowledgeItem` object to the `KNOWLEDGE_BASE` array:
```typescript
{
  id: 'unique-slug',
  category: 'cramps_and_comfort', // or puberty_basics, hygiene_and_products, etc.
  question: 'Primary question phrasing?',
  aliases: ['alternative question phrasing', 'common typos'],
  answer: 'Medically vetted answer in warm, older-sister language (1-2 short paragraphs).',
  keyTakeaway: 'Single sentence core summary.',
  doctorNote: 'Optional note on when to seek in-person clinical care.',
  tags: ['keyword1', 'keyword2']
}
```
3. Run `npx tsx server/test-suite.ts` to verify your new additions.
