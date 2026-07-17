# Use-Cases-Sektion — Design

**Datum:** 2026-07-17
**Branch:** `worktree-usecases` (muss auf `why-robotmk` rebased werden, siehe Voraussetzungen)

## Ziel

Eine neue Hauptmenü-Kategorie „Use Cases" mit sieben Unterseiten. Jede Seite benennt
präzise ein Problem aus dem Betriebsalltag und zeigt, wie Robot Framework es löst.

Die Sektion trägt das **Breiten-Argument**: eine Sprache, jede Technologie. Das ist das
Argument gegen Einzweck-Werkzeuge und es entsteht erst aus der Summe der Seiten.

**Arbeitsteilung mit bestehenden Sektionen:** Die Why-Robotmk-Seite trägt das Checkmk-
und Pricing-Argument. Die Use Cases tragen die technische Breite. Deshalb bekommt keine
Use-Case-Seite einen eigenen Checkmk-Abschnitt; Checkmk erscheint ausschließlich als
linke Hälfte der Kontrast-Sicht im Beweis-Slot (siehe „Verworfene Alternativen").

## Zielgruppen

Unverändert die zwei aus dem Redesign-Projekt:

- **Checkmk-Admins**, die Robot Framework entdecken — suchen nach Technologie
  („Citrix monitoring") und denken in Ausfällen.
- **Robot-Framework-Entwickler**, die Checkmk/Robotmk entdecken — lesen den Code.

Die gewählte Achse bedient beide: Der Admin googelt die Technologie, findet die Seite,
und liest eine Überschrift, die seinen Montagmorgen beschreibt.

## Achse: Use Case, nicht Library

Die Seiten sind nach **Use Cases** geschnitten, nicht nach Libraries. Libraries sind das
Mittel und erscheinen innerhalb der Seite, nie im Titel.

Citrix ist der Beleg, dass das trägt: eine Use Case, zwei Libraries (Browser startet den
Browser, ImageHorizon übernimmt per Bilderkennung), keine davon namensgebend. Eine
Library-Achse hätte diese Seite gar nicht bilden können.

Pattern pro Seite: **Problem → Warum es weh tut → Wie RF es löst → Beweis → Code.**

## Die sieben Use Cases

| Slug | Problem-Satz (H1) | Libraries | Beweis-Slot |
|---|---|---|---|
| `web` | „Der Checkout bricht ab — und keiner merkt es." | Browser | GIF |
| `citrix` | „Die Filiale kommt morgens nicht rein." | Browser + ImageHorizon | GIF |
| `sap-gui` | „Die Transaktion hängt. Alle Server sind grün." | SapGui | GIF |
| `windows-desktop` | „Der Client von 2009, den keiner ablöst." | ImageHorizon + PlatynUI | GIF |
| `rest-api` | „200 OK heißt nicht, dass der Auftrag angelegt wurde." | Requests | Kontrast |
| `saas` | „Die Statuspage sagt grün. Deine Leute sagen was anderes." | Browser | Kontrast |
| `mainframe` | „Der grüne Bildschirm, an dem das Geschäft hängt." | Mainframe3270 | Kontrast |

Die Problem-Sätze sind Startpunkt, nicht Gesetz — Simon passt sie beim Schreiben an.

**Zwei Seiten mit besonderem Winkel:**

- **REST API** muss offensiv abgrenzen, *warum überhaupt* Robot Framework: Checkmk kann
  HTTP-Checks längst selbst. Der Grund ist nicht „URL antwortet mit 200", sondern die
  mehrstufige Transaktion mit Zustand — Token holen, Auftrag anlegen, Status pollen,
  verifizieren, aufräumen. Ohne diese Abgrenzung fragt der Checkmk-Admin zu Recht „wozu?".
- **Windows Desktop** ist die einzige Seite mit zwei konkurrierenden Ansätzen statt einem:
  Bildvergleich (ImageHorizon — sieht, was der Mensch sieht, aber pixelabhängig) gegen
  PlatynUIs API-Zugriff auf den UI-Baum (robust, RF-first). Das ist kein Makel, sondern
  der Inhalt der Seite.

## Beweis-Slot

Vier Seiten bekommen ein Loop-GIF aus einer echten Umgebung (Web, Citrix, SAP, Desktop).
Drei nicht — und bei REST API ist das **keine Ressourcenfrage, sondern inhärent**: Ein
API-Test ist unsichtbar, da bewegt sich kein Cursor.

Deshalb ist das Muster **nicht GIF-zentriert**. Der Beweis-Slot füllt, was vorhanden ist:

1. **Loop-GIF**, wo eins existiert — die Kür.
2. **Kontrast-Sicht** als universeller Rückfall: links die Checkmk-Services, rechts der
   RF-Test dazu. Für alle sieben produzierbar (nachgestellt).

Ergebnis: Alle sieben Seiten sind strukturell identisch, keine sieht dünn aus. Die
Rückfall-Logik sitzt im Layout, nicht in der Disziplin des Autors.

Mainframe erscheint auf Wunsch sofort, notfalls ohne GIF — Screenshot-Material sucht
Simon noch (Nutzungsrechte ungeklärt).

## Seitenmuster

```
┌─────────────────────────────────────┐
│ USE CASE · CITRIX          (eyebrow)│
│ Die Filiale kommt morgens nicht rein│  ← H1 = Problem
│ Session startet, App hängt im Splash│  ← Teaser
│   [isometrisches Gitter im Hintergrund]
├─────────────────────────────────────┤
│  ▶ BEWEIS-SLOT                      │  ← GIF oder Kontrast-Sicht
├─────────────────────────────────────┤
│ WARUM ES WEH TUT │ WIE RF ES LÖST   │
├─────────────────────────────────────┤
│ *** Test Cases ***        [.robot]  │  ← Chroma, robotframework-Lexer
├─────────────────────────────────────┤
│        [ Clarity Call buchen → ]    │
└─────────────────────────────────────┘
```

## Architektur

### Content-Modell: Page Bundles

Wie im Blog, nicht wie `data/*.yaml`:

```
content/use-cases/
  _index.de.md          # _build: { render: never }
  _index.en.md
  citrix/
    index.de.md
    index.en.md
    img/citrix.gif
    img/citrix-contrast.png
```

**Warum Bundles statt data/:** Das GIF liegt neben seinem Text. Use Cases sind
text- und asset-schwer; `data/`-YAML trennt beides über die halbe Repo-Struktur.
(Die Why-Robotmk-Sektion nutzt `data/` zu Recht — sie ist zahlen-, nicht asset-getrieben.)

Front Matter trägt die strukturierten Felder, der Body die Prosa:

```yaml
---
title: "Citrix"
menutitle: "Citrix"
weight: 20
problem: "Die Filiale kommt morgens nicht rein."
teaser: "Session startet, App hängt im Splash. Checkmk sagt: alles grün."
libraries: ["Browser", "ImageHorizon"]
proof:
  gif: "img/citrix.gif"
  contrast: "img/citrix-contrast.png"
menu:
  main:
    parent: usecases
---
```

### Layout

`layouts/use-cases/single.html` rendert Hero, Beweis-Slot, Libraries und CTA aus dem
Front Matter; der Markdown-Body liefert die zwei Prosa-Blöcke und den Code-Fence.

Damit ist „einheitlich" **erzwungen** statt Disziplinsache: Ein Autor kann eine Seite
nicht versehentlich anders aussehen lassen.

### Menü

`hugo.yaml` bekommt pro Sprache einen Elternpunkt ohne URL:

```yaml
- identifier: usecases
  name: "Use Cases"
  weight: 20
```

Die sieben Kinder hängen sich per Front Matter an (`menu.main.parent: usecases`) — der
Menüeintrag steht bei der Seite, die er meint, und wird nicht an zwei Orten gepflegt.

`layouts/partials/menu.html` wird um `.HasChildren` / `.Children` erweitert. Aktuell
rangt es flach über `.Site.Menus.main` und kennt keine Kinder.

**Die Sektions-Übersicht `/use-cases/` entfällt bewusst.** Hugo erzeugt sie sonst
automatisch mit dem Standard-Listenlayout, sobald Seiten darunter liegen — deshalb
`_build: { render: never }` in der `_index.md`. Der Menüpunkt ist reiner Dropdown-Öffner.

### CSS

Neu: `assets/css/sections/use-cases.css`, geladen nur wenn `.Section == "use-cases"`.
Nutzt die Tokens aus `assets/css/tokens.css` — keine eigenen Farb- oder Abstandswerte.

**Hero-Motiv:** Das isometrische Gitter aus `why-hero-motif.html` wird aufgegriffen,
damit beide Sektionen zusammengehören — **ohne die grünen Strahlen**
(`<g class="why-hero__motif-beams">`). Das Gitter nutzt `currentColor` und ist über
`--color-on-surface-variant` theme-aware.

## Voraussetzungen (blockierend)

1. **Simon committet seinen Beams-Stand auf `why-robotmk`.** Die Entfernung der grünen
   Strahlen liegt derzeit nur uncommittet im Haupt-Checkout. Der committete Stand hat
   sie noch (Zeile 19–21). Ein Rebase davor holt die Streifen zurück.
2. **Rebase dieses Worktrees auf `why-robotmk`.** Das Design-System (`tokens.css`,
   `components/`, `sections/`) existiert nur dort. `main` hat einen 1359-zeiligen
   Mainroad-Monolithen **ohne ein einziges Custom Property** — „einheitliches Design"
   ist auf `main` nicht einlösbar, weil es dort nichts gibt, womit es einheitlich wäre.
3. **`git submodule update --init`** — `themes/mainroad` ist in diesem Worktree leer,
   ohne das Theme läuft kein `hugo server`.

**Kopplung, die daraus folgt:** Use Cases können erst live gehen, wenn `why-robotmk`
landet. Bewusst akzeptiert.

## Risiken

**Dropdown auf schmalen Viewports** — das größte Risiko. Das Mobil-Verhalten hängt an
`js/menu.js` aus dem Theme (Submodule leer, daher noch nicht einsehbar). `TODO` führt
„responsive design: schmäler → Menubar crappy" bereits als `@critical`. Ein Dropdown in
eine Menüleiste zu hängen, die auf schmal schon klemmt, verschärft einen bekannten Bug.
Das Submenu muss auf Mobil explizit getestet werden, nicht nur auf dem Desktop.
Auf keinem der beiden Branches ist ein Submenu bislang gelöst.

**Asset-Nachschub** — sieben Seiten × zwei Sprachen = 14 Texte, dazu vier GIFs und
sieben Kontrast-Sichten. Das ist der übliche Punkt, an dem so etwas auf halber Strecke
liegenbleibt. Das Muster ist deshalb so gebaut, dass eine Seite auch ohne GIF vollständig
aussieht.

**Mainframe-Nutzungsrechte** — ungeklärt. Fällt notfalls auf die Kontrast-Sicht zurück.

## Verworfene Alternativen

- **Reine Library-Achse** — hätte Citrix nicht abbilden können und läse sich wie ein
  Library-Katalog, nicht wie ein Kaufgrund.
- **Reine Business-Szenario-Achse** — verfehlt die Tech-Keywords, nach denen die
  Zielgruppe sucht.
- **GIF-Hero** — drei von sieben Seiten können den Slot nicht füllen.
- **Split-Screen** — `.robot`-Code braucht Breite; auf Mobil klappt ohnehin alles
  untereinander.
- **Gestaltete Übersichtsseite mit Karten-Grid** — verworfen. Kostet ein Layout extra;
  das Breiten-Argument trägt vorerst das Dropdown.
- **Checkmk-Screenshots pro Seite** — verworfen. Fünf echte Umgebungen wären nötig; die
  Why-Robotmk-Seite trägt das Checkmk-Argument bereits.
- **Eigenes Mini-Token-Set auf `main`** — verworfen. Zwei Quellen der Wahrheit für Farben
  und Abstände, garantierte Divergenz, Kollision beim späteren Merge.

## Aufräumen (nebenbei)

In `why-hero-motif.html` sind nach Simons Beams-Entfernung zwei Leichen übrig: der
`why-beam`-Gradient in den `<defs>` und die Regel `.why-hero__motif-beams` in
`why-robotmk.css`. Der Kommentar oben behauptet weiterhin „two teal beams echo its light
shafts". Beim Aufgreifen des Motivs mit entfernen.

## Nicht in Runde 1

Zweite Reihe an Use Cases: E-Mail-Roundtrip, Datenbank-/Batch-Jobs (schwächer, weil
Checkmk DBs nativ überwacht), Drucken, Login/SSO mit MFA-Strecke.
