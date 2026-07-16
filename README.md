# Pittsburgh Insurance Hub

**The #1 insurance referral & lead-generation site for Pittsburgh, PA.**

A fast, mobile-first, SEO-optimized website that positions you as the go-to,
trusted source for every kind of insurance in Pittsburgh — home, auto, life,
health, disability, Medicare, renters, and business. It captures qualified leads
you can sell/refer to carriers (or write yourself for commission) and includes a
smart, human-feeling insurance concierge that answers visitor questions 24/7.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and
**Tailwind CSS**.

---

## ✨ What's included

- **High-converting homepage** — hero with trust signals, insurance categories,
  "how it works," social proof/testimonials, local areas-served, FAQ, and clear
  calls to action.
- **Lead-capture engine** — a friendly 3-step quote form (`/quote`) with
  validation, spam honeypot, and an API (`/api/lead`) that emails leads (via
  Resend) or saves them locally so you never lose one.
- **AI "live agent" concierge** — a chat widget ("Sam") that answers insurance
  questions like a knowledgeable local agent, with **real-time streaming replies**
  (it types like a person), conversation memory across pages, a proactive
  greeting, and **in-chat lead capture** (name/phone/ZIP/type → straight to your
  inbox, tagged as a chat lead). Works out of the box with a built-in Pittsburgh
  insurance knowledge base, and becomes dramatically smarter when you add an
  OpenAI key (see "Turn on full-AI Sam" below).
- **Aggressive local SEO** — per-line landing pages (`/insurance/[slug]`),
  `LocalBusiness`/`InsuranceAgency` + `FAQ` + `Service` structured data
  (JSON-LD), auto-generated `sitemap.xml` and `robots.txt`, rich metadata, and
  Open Graph tags.
- **Accessible for everyone (18–80+)** — large readable text, high contrast,
  big tap targets, keyboard focus states, skip-to-content link, reduced-motion
  support, and semantic HTML.
- **Credibility & compliance pages** — About, Licensing & Disclosures, Privacy,
  and Terms, with honest carrier/compensation disclosures.

---

## 🚀 Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

---

## ⚙️ Configuration (make it yours)

### 1. Brand, contact & licensing — `src/lib/site.ts`

Update your business name, phone, email, address, hours, areas served, and — importantly for compliance — your **licensed producer name and license number**.

### 2. Environment variables — copy `.env.example` to `.env.local`

| Variable | Purpose | Required? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO/sitemap/schema | Recommended |
| `NEXT_PUBLIC_BUSINESS_PHONE` | Phone shown site-wide | Recommended |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | Contact email | Recommended |
| `OPENAI_API_KEY` | Enables smarter LLM concierge answers | Optional |
| `OPENAI_MODEL` | LLM model (default `gpt-4o-mini`) | Optional |
| `OPENAI_BASE_URL` | OpenAI-compatible endpoint | Optional |
| `RESEND_API_KEY` | Emails new leads to you | Optional |
| `LEADS_NOTIFY_EMAIL` | Where leads are emailed | Optional |

> The site is **fully functional with none of the optional keys set**. Without
> an LLM key the concierge uses its built-in knowledge base; without a Resend key
> leads are appended to `data/leads.jsonl` for local review.

### 3. Insurance lines & content — `src/lib/insurance.ts`

Each entry auto-generates a homepage card, a quote-form option, and a dedicated
SEO landing page (headline, benefits, coverage, FAQs, keywords).

### 4. Concierge knowledge — `src/lib/knowledge.ts`

Add/adjust Q&A topics. This both powers the offline concierge and grounds the
LLM so answers stay accurate and Pittsburgh-specific.

---

## 🤖 Turn on full-AI Sam (recommended)

Sam works without any key (built-in engine), but the "smart as an insurance book,
feels like a live agent" experience comes from connecting a real model. It's one
environment variable:

1. Create an account at **[platform.openai.com](https://platform.openai.com)** and
   add a little billing credit.
2. Go to **API keys** and create a new secret key (starts with `sk-...`).
3. In **Vercel → your project → Settings → Environment Variables**, add:
   - `OPENAI_API_KEY` = your key (scope: **Production**)
   - *(optional)* `OPENAI_MODEL` = `gpt-4o-mini` (default; cheap and fast)
4. **Redeploy.** That's it — Sam now streams live, human-like, deeply
   knowledgeable answers, grounded on the Pittsburgh knowledge base.

**Cost:** with `gpt-4o-mini`, a typical chat costs a fraction of a cent — even
hundreds of conversations a month is usually just a few dollars. Set a monthly
usage limit in your OpenAI account to stay in control.

> No key? Sam still runs on the upgraded built-in engine: context-aware,
> non-repeating, and it still captures leads. The OpenAI key simply makes it
> shine.

---

## 📈 Getting to #1 in Google (Pittsburgh)

The code handles on-page SEO. To actually rank, also do this:

1. **Deploy to a real domain** and set `NEXT_PUBLIC_SITE_URL`.
2. **Create & verify a Google Business Profile** for your Pittsburgh business —
   this is the biggest driver of local/map rankings. Match the name, address,
   and phone (NAP) to `src/lib/site.ts`.
3. **Submit `sitemap.xml`** in Google Search Console (`/sitemap.xml`).
4. **Gather real reviews** on Google — swap the sample testimonials for verified
   ones and update the `aggregateRating` in `src/components/JsonLd.tsx` to match
   reality (never fake review counts).
5. **Build local citations & backlinks** (Yelp, chambers of commerce, local
   press, partner carriers).
6. **Publish local content** — add pages/blog posts targeting neighborhoods and
   specific questions ("cheap SR-22 in Pittsburgh," etc.).

---

## 🚢 Deploy

The easiest path is **Vercel** (creators of Next.js):

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add your environment variables.
4. Point your custom domain (e.g. `pittsburghinsurancehub.com`).

Works on any Node host that supports Next.js 15 (Netlify, Render, Fly, a VPS via
`npm run build && npm run start`, etc.).

---

## 🧾 Leads: where they go

- **With `RESEND_API_KEY`:** each submission is emailed to `LEADS_NOTIFY_EMAIL`.
- **Without it:** submissions are appended to `data/leads.jsonl` (git-ignored).

For production, connect a CRM/webhook by editing `deliverLead()` in
`src/app/api/lead/route.ts`.

---

## ⚖️ Important legal & ethical notes

- **Licensing:** Insurance referrals/sales are regulated. Display your real PA
  license info and confirm your activities are permitted for your license type.
- **Compensation disclosure:** The footer and Licensing page disclose that you
  may receive carrier compensation — keep this accurate.
- **TCPA/consent:** The quote form collects explicit consent to contact. Have
  counsel review your consent language and calling/texting practices.
- **Concierge transparency:** The chat is warm and human-feeling but includes a
  subtle "responses may be assisted" note and always offers a live human. Some
  jurisdictions (e.g. California's bot-disclosure law) require disclosing
  automated chat — this honest, light-touch disclosure keeps you compliant while
  still feeling personal, and it *reinforces* credibility rather than hurting it.
- **No fake claims:** Replace sample stats/reviews with real numbers before
  launch. The provided Privacy/Terms/Licensing pages are starting templates —
  have an attorney review them.

---

## 🗂️ Project structure

```
src/
  app/
    page.tsx                 # Homepage
    quote/                   # Multi-step lead form page
    thank-you/               # Post-submit confirmation
    insurance/[slug]/        # SEO landing page per insurance line
    about, licensing,        # Credibility & legal pages
      privacy, terms/
    api/lead/route.ts        # Lead capture endpoint
    api/chat/route.ts        # Concierge endpoint (LLM + fallback)
    sitemap.ts, robots.ts,   # SEO + PWA
      manifest.ts, icon.svg
  components/                # UI (Header, Hero, ChatWidget, QuoteForm, ...)
  lib/
    site.ts                  # Brand/contact/licensing config
    insurance.ts             # Insurance lines + landing-page content
    knowledge.ts             # Concierge knowledge base
```
