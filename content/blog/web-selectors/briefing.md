# Briefing: Blogartikel „So schreibst du Selektoren für stabile Web-Tests"

## 1. Auftrag

Schreibe einen deutschsprachigen Blogartikel, der Einsteigern im Web-Testing beibringt, wie sie selbst Selektoren schreiben – statt sie aus den DevTools zu kopieren.

**Titel (H1 / Slug):** So schreibst du Selektoren für stabile Web-Tests
**Alternativtitel für Social Posts:** So schreibst du Selektoren, die den nächsten Release überleben

## 2. Zielgruppe

Einsteiger in die Testautomatisierung. Konkret:

- Sie sitzen vor dem DevTools-Fenster und kommen nicht weiter.
- Ihr einziger bekannter Weg ist Rechtsklick → „Copy selector" / „Copy XPath".
- Sie wissen nicht, wonach sie entscheiden sollen: ID, Klasse, XPath, Text – alles wirkt gleich gültig.
- `aria-label` haben sie schon mal gesehen und als „irgendwas mit Barrierefreiheit" abgehakt.

Sie haben Grundkenntnisse in HTML und in einem Testframework. Sie sind **keine** Frontend-Entwickler und kennen den Begriff „Accessible Name" nicht.

## 3. Ton und Haltung

- **Problemorientiert, nicht vorwurfsvoll.** Der Leser hat kopierte Selektoren im Repo. Das ist kein Versagen, sondern der einzige Weg, den ihm bisher jemand gezeigt hat.
- Du-Ansprache, informell, aber fachlich präzise.
- Keine Marketing-Sprache, keine Superlative.
- Kernbotschaft in einem Satz: **Frag nicht, wo das Element im DOM steht. Frag, wie ein Mensch es beschreiben würde.**

## 4. Inhaltliche Substanz

Der folgende Abschnitt ist der fachliche Kern des Artikels. Er ist vollständig zu verwenden und darf ausgebaut, aber nicht verkürzt werden.

### 4.1 Was `aria-label` ist

`aria-label` ist ein ARIA-Attribut, das einem Element einen **zugänglichen Namen** (accessible name) gibt – ursprünglich für Screenreader gedacht.

Wenn ein Element keinen sichtbaren Text hat, weiß ein Screenreader nicht, worum es sich handelt. Klassiker ist der Icon-Button:

```html
<button aria-label="Suche schließen">
  <svg>…</svg>
</button>
```

Ohne `aria-label` sagt der Screenreader nur „Schaltfläche". Mit: „Suche schließen, Schaltfläche".

### 4.2 Warum das fürs Testing relevant ist

Der Accessible Name ist eine der stabilsten Handhaben überhaupt:

- Er ist **semantisch**, nicht strukturell – überlebt Refactorings von DOM-Struktur und CSS-Klassen.
- Er beschreibt die **Nutzerintention**, nicht die Implementierung.
- Bei generierten Klassennamen (Tailwind, CSS-Modules, styled-components) ist er oft der einzige verlässliche Anker.

Playwright bzw. die Browser Library setzen genau darauf auf:

```robotframework
Click    role=button[name="Suche schließen"]
Click    aria-label="Suche schließen"    # geht auch als reiner Attribut-Selektor
```

Wichtiger Punkt, den der Artikel klar herausarbeiten muss: `role=…[name=…]` matcht **nicht** stur auf `aria-label`, sondern auf den *berechneten* Accessible Name. Dazu zählen auch sichtbarer Textinhalt, `aria-labelledby`, `alt` bei Bildern oder ein zugehöriges `<label>`. Genau das macht den Selektor robust – ob der Entwickler den Namen per Attribut oder per Textinhalt liefert, ist dem Test egal.

### 4.3 Die Fallstricke

Alle drei müssen vorkommen:

**Lokalisierung.** Der Accessible Name ist übersetzter Text. Läuft die Suite gegen DE und EN, braucht es Variablen – oder man weicht auf `data-testid` aus.

**Der Name kann sich ändern.** Ein Toggle heißt mal „Menü öffnen", mal „Menü schließen". Abhilfe: `data-testid` oder ein Regex-Match.

```robotframework
Click    role=button[name=/Menü (öffnen|schließen)/]
```

**`aria-label` überschreibt sichtbaren Text.** Steht auf einem Button „Speichern", aber `aria-label="Formular absenden"`, gewinnt das Attribut. Für den Tester heißt das: Was im Browser zu lesen ist, ist nicht zwingend das, wonach selektiert werden muss. Ein Blick ins DOM oder in den Accessibility-Tab der DevTools klärt das.

### 4.4 Die Rangliste (Herzstück des Artikels)

Selektoren, grob nach Robustheit sortiert:

1. **`data-testid`** – explizit fürs Testing, ändert sich nie versehentlich. Setzt aber Mitarbeit der Entwickler voraus.
2. **`role=…[name=…]`** – semantisch, testet nebenbei die Accessibility mit.
3. **Text-Selektoren** – ok, aber sprachabhängig und bruchanfällig bei Copy-Änderungen.
4. **CSS/XPath auf Struktur oder Klassen** – letzter Ausweg.

### 4.5 Die Pointe

Ein netter Nebeneffekt von Variante 2: Wenn der Test bricht, weil kein Accessible Name vorhanden ist, hat man gerade einen echten Accessibility-Bug gefunden. Deshalb argumentieren manche, dass die vermeintliche Fragilität hier ein Feature ist.

Das ist der stärkste Gedanke des Artikels und gehört prominent platziert – als Abschluss oder als hervorgehobener Kasten.

## 5. Struktur

1. **Einstieg über den Schmerz.** Der Leser kennt nur „Copy selector". Ergebnis: ein XPath wie `/html/body/div[3]/div/div[2]/button`. Beim nächsten Deployment ist es `div[4]`. Kurz, konkret, ohne Belehrung.
2. **Die Denkweise.** Frag nicht, wo das Element steht – frag, wie ein Mensch es beschreiben würde. Überleitung zum Accessible Name.
3. **Was `aria-label` ist** (Abschnitt 4.1).
4. **Warum das ein guter Selektor ist** (Abschnitt 4.2), inklusive der Erklärung, dass `role=…[name=…]` auf dem berechneten Namen arbeitet.
5. **Die Fallstricke** (Abschnitt 4.3) – wichtig für Glaubwürdigkeit. Der Artikel darf kein Silver-Bullet-Versprechen sein.
6. **Die Rangliste** (Abschnitt 4.4) als Referenz zum Wiederkommen.
7. **Die Pointe** (Abschnitt 4.5).



## 7. Was der Artikel nicht tun soll

- Keine vollständige ARIA-Referenz. `aria-label` ist Mittel zum Zweck, nicht das Thema.
- Kein Framework-Vergleich (Playwright vs. Selenium vs. Cypress).
- Den Leser nicht für kopierte Selektoren tadeln. Die Rangliste liefert die Korrektur, der Text muss sie nicht zusätzlich aussprechen.
- Keine erfundenen Statistiken oder Studien.