# FAQ Page — Design

**Date:** 2026-07-20
**Source material:** `FAQ.md` (unstructured Q&A dump at repo root)
**Languages:** DE + EN

## Goal

A public FAQ subpage that collects the questions Simon receives repeatedly (mail,
Slack, after talks). It must stay scannable as the question count grows, and every
answer must offer a low-friction next step: booking a free Clarity Call.

## Information architecture

Five categories, 22 questions total.

### 1. Robotmk & Checkmk (5)

| # | DE | EN |
|---|---|---|
| 1 | Warum Robotmk, wenn ich schon Checkmk habe? | Why Robotmk when I already have Checkmk? |
| 2 | Wie hängen robotmk.org und checkmk.com zusammen? | How are robotmk.org and checkmk.com related? |
| 3 | Kann ich Robotmk hier auf der Seite kaufen? | Can I buy Robotmk on this site? |
| 4 | Ist Robotmk Open Source? | Is Robotmk open source? |
| 5 | Schade, dass Robotmk nicht mehr Open Source ist. | It's a shame Robotmk is no longer open source. |

Q1 core message: Checkmk monitors existing systems; Robotmk tests the user
experience. Different jobs, same platform.

Q2 core message: two separate projects that cooperate. robotmk.org is independent,
run by ELABIT. Checkmk is built by Checkmk GmbH. Simon invented Robotmk and feeds
insights back as part-time product manager and practitioner.

Q5 is deliberately kept as its own entry — it is an objection, not a question, and
answering it openly (the decision secured continued development and support;
several of today's features would not have been buildable as an OSS side project)
is more credible than folding it into Q4.

### 2. Grundbegriffe / Concepts & Terminology (4)

Suite · Test · Keywords · Test-Services.

The "test" answer keeps the 1-test-5-scenarios vs. 5-tests-1-scenario trade-off:
fewer tests saves licence cost but encapsulates unrelated things in one service;
only the granular approach allows per-scenario NagVis states and per-team
notifications.

### 3. Lizenzierung & Kosten / Licensing & Cost (6)

| # | DE | EN |
|---|---|---|
| 1 | Kann ich Synthetic Monitoring ausprobieren? | Can I try Synthetic Monitoring? |
| 2 | Was passiert, wenn ich das Ausführungsintervall verkürze? | What if I shorten the execution interval? |
| 3 | Ich will eine bestehende SM-Lösung ablösen — wie schätze ich die Kosten? | I want to replace an existing SM solution — how do I estimate cost? |
| 4 | Wie wirken sich mehrere Standorte auf den Preis aus? | How do more locations affect the price? |
| 5 | Beeinflusst das Check-Intervall des Checkmk-Agenten den Preis? | Does the Checkmk agent check interval affect pricing? |
| 6 | Sind die Robot-Framework-Libraries vor dem Lizenzkauf zugänglich? | Are the framework libraries accessible before buying a licence? |

Recurring theme across 2/4/5: what counts is the total number of test services in
a subscription — not runs, not locations, not intervals. This is the pricing
argument that differentiates Checkmk from action-based competitors.

### 4. Technik & Voraussetzungen / Requirements & Technical (4)

Hardware/OS requirements (Windows + Debian/Ubuntu, min. 4 CPU / 8 GB RAM,
monitorable by Checkmk, internet access for Python environment creation) ·
which tests need an unlocked Windows desktop session (GUI apps yes; headless
including web browsers no) · v1 → v2 migration · difference between v1 (MKP) and
v2 (Synthetic Monitoring).

### 5. Einstieg & Lernen / Getting Started & Learning (3)

How many ready-made tests ship with SM (answer: zero — Robotmk is the integration
layer, test implementation stays with the customer) · how to learn Robot
Framework / Robotmk · whether test recording ("click and point") exists.

The recording answer keeps the layered-keyword argument and the stereo-system
analogy: separable components that can be repaired and modernised, versus an
all-in-one device that cannot.

## Content corrections against `FAQ.md`

Three items in the source are stale or not publishable and are rewritten:

1. **Robotmk Academy** — `FAQ.md` says "in spring 2025 the course will be
   available". Today is July 2026. Rewrite timelessly (the course exists, prepares
   for the RFCP exam) and link to `/services/` instead of naming a date.
2. **v1/v2 comparison** — `FAQ.md` links a `docs.google.com` slide deck. That is an
   internal document. Replace the link with a written short comparison in the
   answer itself.
3. **Free test services** — the source claim ("up to three test services can be
   used without a subscription") is incomplete and misleading. Corrected answer:

   > Ja. Bis zu drei Test-Services lassen sich in Checkmk ohne Subscription
   > betreiben — genug, um Synthetic Monitoring mit echten Tests in der eigenen
   > Umgebung zu evaluieren.
   >
   > Wichtig zu wissen: Dieses Kontingent ist ein **Testangebot, kein
   > Dauerrabatt**. Sobald Sie eine Synthetic-Monitoring-Subscription abschließen,
   > entfallen die drei freien Test-Services. Ab diesem Punkt gilt der Einsatz als
   > produktiv — und jedem produktiv überwachten Test-Service steht ein Gegenwert
   > gegenüber, deshalb zählt dann jeder einzelne in den Umfang Ihrer Subscription.

   Pricing and licence statements additionally point to checkmk.com rather than
   being stated as absolute and permanent.

## Page structure

```
hero (hero-motif partial) — title + friendly intro
  ↓
search field
  ↓
category filter pills:  [Alle] [Robotmk & Checkmk] [Grundbegriffe] …
  ↓
question list, grouped by category heading
    <details> per question
      answer prose
      micro-CTA line
  ↓
cta-clarity partial (existing closing block)
```

Intro copy establishes that these are real, recurring questions rather than
marketing filler: "Viele dieser Fragen erreichen mich per Mail, im Slack oder nach
Vorträgen — hier sammle ich sie."

## Micro-CTA

One muted line after every answer, rendered from a single string in the data file
so the wording stays identical across all 22 answers:

- DE: `Immer noch nicht klar? → Kostenlosen Clarity Call buchen`
- EN: `Still unclear? → Book a free clarity call`

Target: `Site.Params.booking_url`, `target="_blank" rel="noopener"`. Styled small
and low-contrast — helpful, not pushy. It sits inside the `<details>` body, so it
only appears once an answer is actually open.

## Technical approach

**Accordion:** native `<details>` / `<summary>`. Keyboard operation, screen-reader
semantics and no-JS usability come for free. No ARIA plumbing, no open/close state
management.

**Filtering:** `assets/js/faq.js` toggles the `hidden` attribute on `<details>`
elements and on category headings that end up empty. Pills set an active class;
the search field filters on question *and* answer text, case- and
diacritic-insensitive (`String.normalize('NFD')` with combining marks stripped, so
"Ausfuhrung" matches "Ausführung"). Search and pills combine: an active pill
narrows the set the search runs over.

**Progressive enhancement:** without JS, search field and pills are hidden via a
`no-js`/`js` class on the container, and the page renders as plain grouped
sections with working accordions. Nothing is lost.

**Empty state:** when a search yields nothing, show a short line plus the booking
link — the one case where a slightly more prominent CTA is warranted, because the
visitor has explicitly failed to find their answer.

## Files

| File | Action |
|---|---|
| `data/de/faq.yaml` | new — all German content |
| `data/en/faq.yaml` | new — all English content |
| `content/faq/_index.de.md` | new — front matter only |
| `content/faq/_index.en.md` | new — front matter only |
| `layouts/faq/list.html` | new |
| `assets/css/sections/faq.css` | new |
| `assets/js/faq.js` | new |
| `layouts/partials/head/css.html` | edit — register `faq.css` |
| `hugo.yaml` | edit — menu entry `/de/faq/` and `/en/faq/`, `weight: 4` |

## Data file shape

```yaml
meta:
  title: "Häufige Fragen"
  intro: "…"
  search_placeholder: "Frage suchen …"
  filter_all: "Alle"
  cta_text: "Immer noch nicht klar?"
  cta_link: "Kostenlosen Clarity Call buchen"
  no_results: "…"
categories:
  - id: checkmk
    name: "Robotmk & Checkmk"
    questions:
      - q: "…"
        a: |
          …
```

`a` is rendered with `| markdownify` so answers can use lists, bold and links.
Category `id` becomes the pill's `data-category` and the section anchor, so
`/faq/#checkmk` deep-links to a category.

## Out of scope

- Structured data (`FAQPage` JSON-LD) — worth adding later, not part of this pass.
- Per-question permalinks / auto-opening a question from a URL fragment.
- Moving the source `FAQ.md` — it stays as the working scratch file.
