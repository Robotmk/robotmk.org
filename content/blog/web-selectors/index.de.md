---
draft: false
title: "Nicht kopieren, sondern verstehen: robuste Selektoren für Web-Tests"
# --- Italic subheading
lead: "Warum kopierte Selektoren Eintagsfliegen sind – und wie der Accessible Name deine Tests stabil macht (und nebenbei Accessibility-Bugs findet)"
# -- giscus id to match comments
commentid: web-selectors
# -- predefined URL
# slug: 
# -- for posts in menubar, use this (shorter) title
# menutitle: 
#description: "Robotmk kann RCC-Environments vollständig offline aufbauen. Dieser Artikel erklärt, warum das wichtig ist und wie es in der Praxis funktioniert."
date: "2026-07-31T10:42:47+02:00"
categories:
  - tutorials
tags:
  - browser-library
  - robotframework
  - web-testing
  - selectors
authorbox: true
sidebar: true
pager: false
#menu: main
#weight: 10
# --- must be in the leaf bundle folder or static
thumbnail: "img/title.png"
vgwort: https://vg04.met.vgwort.de/na/c8c3b305e01c4a52828959d4ea81d492
translationKey: "web-selectors"
---

**Mein Rat vorweg**: Finger weg ✋ von kopierten oder generierten Selektoren für Web-Tests!

In diesem Artikel erkläre ich warum: denn die Bestimmung robuster Selektoren gehört zum absoluten Grundwissen fürs Web-Testing.  
Ob Du das Handwerk für robuste Selektoren verstehst, macht später bei der Wartung der Tests einen enormen Unterschied.

<!--more-->


---

## Das Problem: kopierte Selektoren sind Eintagsfliegen

Schauen wir uns zunächst mal an, wo das Problem liegt:  

Du bist dabei einen Web-Test zu entwickeln und brauchst nun einen Selektor für einen Button.  
Du öffnest die Developer Tools im Browser, kopierst den Selektor...

{{< figure src="img/copy.png" title="Kopieren eines Selektors aus dem Browser" >}} 

...und - voilà: 

```
/html/body/div[3]/div/div[2]/button
```

Das ist ein sogenannter **XPath**-Selektor - eine Art "Wegbeschreibung" durch den DOM-Baum, Abzweigung für Abzweigung.

> **DOM** = Document Object Model. Das Modell, nachdem der Browser den HTML-Quelltext geparst und in eine für ihn verständliche Form gebracht hat.

Übersetzt heißt dieser XPath: 

- Geh ins dritte `div` unter `body`, 
- dann ins erste `div`, 
- dann ins zweite, 
- dort ist der anzuklickende Button. 
  
Dieser Selektor funktioniert - *heute*. Mit genau *dieser* Version der Seite/Applikation.

Problematisch: ein solcher Selektor hängt extrem stark von der **Struktur** der Seite ab.  
Die Struktur ist für den Nutzer aber nicht nur **unsichtbar**. 
Sie ist sogar **unerheblich**, denn für ihn zählt nur die *visuelle* Repräsentation.  

Der Web-Entwickler fügt vielleicht schon morgen aus irgendeinem Grund ein zusätzliches `div` ein (ein Banner, ein Cookie-Hinweis, ein Layout-Wrapper, ...) – und schon verschiebt sich alles darunter:


```
# funktioniert nicht mehr
/html/body/div[3]/div/div[2]/button
# der wäre richtig
/html/body/div[4]/div/div[2]/button
---------------^
```

Dein Test schlägt sofort fehl und produziert einen "*false positive*"-Alarm.


Im Synthetic Monitoring bedeutet das: Alarme werden grundlos verschickt, Tickets erstellt, die Bereitschaft wird nachts rausgeklingelt.  

> Oft höre ich, dass Web-Tests grundsätzlich "keinen Sinn machen", weil sich ja "immer etwas an der Seite ändern kann". Wenn ich dann nachfrage, wie die Selektoren erstellt wurden, sind die Antworten immer die gleichen: kopiert-generiert-weiß-ich-nicht.
> Test-Rekorder und AI-Tools liefern übrigens oft genau solche Selektoren wie am Fließband.


---


## Perspektivenwechsel: von "wo" nach "wie"

In diesem Artikel möchte ich Dir einen **Perspektivenwechsel** näherbringen: 

> **Beschreibe nicht, wo das Element im DOM steht. Beschreibe, wie ein *Mensch* es beschreiben würde.**

Ein Beispiel: 

Du erklärst jemandem, wie er ein **Web-Formular** abschicken soll.  

- ❌ Du sagst dann nicht: "*Klick auf das dritte `div`, dann auf den Button darin*."  
- 💪 Du sagst stattdessen: "*Klick auf **Absenden**.*"  

Warum?

Menschen beschreiben Elemente über ihre **Bedeutung**: 

- was auf einem Button **draufsteht**
- was ein Button **auslöst**
- welche **Rolle** ein Button spielt.

Für genau diese "*menschliche*" Beschreibung wurde im Web ein Begriff geschaffen: der sogenannte **Accessible Name**, der *zugängliche* Name eines Elements.  
Er ist einer der stabilsten Anker, mit denen man arbeiten kann.

---


## Accessible Name: Hintergrund

Der **Accessible Name** ist der Text, mit dem ein Element für Hilfstechnologien "benannt" ist - also das, was ein **Screenreader** einem blinden Menschen vorliest.  
Bei einem Speichern-Button etwa: *„Speichern, Schaltfläche"*.

Was kaum jemand weiß: 

> Der Accessible Name ist **kein einzelnes Attribut**. Er wird vom Browser **berechnet** - aus mehreren möglichen **Quellen** und in einer ganz bestimmten **Reihenfolge**.

Der Browser nimmt immer die erste verfügbare Quelle in folgender Reihenfolge:

`aria-labelledby → aria-label → zugehöriges <label> → sichtbarer Textinhalt → title`

Wichtig: Du musst Dir diese Quellen nicht merken; wenn Du weiterlesen willst, spring zum Punkt [Warum der Accessible Name ein so guter Anker ist](#warum-der-accessible-name-ein-so-guter-anker-ist).

Ich habe Dir nachfolgend Beispiele zusammengestellt, wie diese Quellen im HTML aussehen: 

### 1. aria-labelledby 

**Zweck:** Attribut, verweist auf die ID eines anderen Elements; dessen Text wird zum Namen (schlägt sogar sichtbaren Inhalt):

```html
<button aria-labelledby="lbl">X</button>
<span id="lbl">Suche schließen</span>
```

=> Accessible Name: "Suche schließen"

### 2. aria-label

Zweck: dem Element direkt zugewiesener Text, überschreibt sichtbaren Inhalt. **Ohne** `aria-label` wüsste ein Screenreader z.b. nur "Schaltfläche" zu sagen; **mit** `aria-label` wird daraus das hilfreiche "Suche schließen, Schaltfläche".

```html
<button aria-label="Suche schließen">X</button>
```

=> Accessible Name: "Suche schließen"

### 3. label-Tag

Zweck: Tag, verweist auf die ID eines anderen Elements; dessen Text wird zum Namen (ähnlich wie `aria-labelledby`)

```html
<label for="email">E-Mail-Adresse</label>
<input id="email" type="email">
```
=> Accessible Name des Feldes: "E-Mail-Adresse"

### 4. sichtbarer Text

Der Fallback/Normalfall, um den Name automatisch zu berechnen: 

```html
<button>Speichern</button>
```

=> Accessible Name: "Speichern"

### 5. title

Title-Attribut eines Tags - der Notnagel, wenn sonst nichts da ist:

```html
<button title="Speichern"><svg>. . .</svg></button>
```

=> Accessible Name: "Speichern"

## Warum der Accessible Name ein so guter Anker ist

Er hat **drei Eigenschaften**, die ihn von kopierten Selektoren unterscheiden:

- ☑️ Er ist **semantisch, nicht strukturell.**  
Er beschreibt, *was* das Element ist – und nicht, *wo* es steht.  
Ein Refactoring der DOM-Struktur oder ein Wechsel der CSS-Klassen macht ihm nichts aus. 
- ☑️ Er beschreibt die **Nutzerintention.**  
"*Suche schließen*" ist das, was der Benutzer erreichen will.
- ☑️ Er ist oft der **einzige verlässliche Anker.**  
Dort wo Klassennamen generiert und IDs dynamisch vergeben werden, bleibt zumindest noch der Accessible Name stabil.

---


## Mit der `role`-Strategie auf den Accessible Name zugreifen

Jetzt die praktische Frage: Wie sprichst Du den **Accessible Name** in einem Test überhaupt an?

Hier lohnt sich ein kurzer Blick unter die Haube. Ich bin lange dem Irrtum aufgesessen, die Browser Library hätte nur vier feste Selektor-Strategien (CSS, XPath, ID und Text). Die [Doku der Browser-Library](https://marketsquare.github.io/robotframework-browser/Browser.html#Finding%20elements) stellt das zumindest immer noch so dar... 

Tatsächlich reicht die BrowserLibrary den Selektor *direkt* an **Playwright** durch, und Playwright bringt *eine ganze Palette* an Strategien mit. (Wer es genau wissen will: [hier](https://github.com/microsoft/playwright/blob/368941457a82da112aa8610107e25f4bde94339a/packages/playwright-core/src/server/selectors.ts#L23) gehts zur "Selectors"-Klasse im Playwright-Quelltext)  

Die meisten dieser Strategien davon sind hier nicht der Rede wert - eine aber ist von besonderer Bedeutung: die **`role`**-Strategie.

### Was bedeutet "role"?

Die **Rolle** beschreibt, *um welche Art von Element* es sich handelt: `button`, `link`, `textbox`, `checkbox`, `dialog`, `navigation` ... Ein Screenreader liest das zusammen mit dem Namen vor.

Das Praktische: Die meisten Rollen ergeben sich **automatisch aus dem HTML-Tag**:

- Ein `<button>` hat implizit die Rolle `button`
- ein `<a href>` die Rolle `link`
- ein `<input type="text">` die Rolle `textbox`
- usw. 

### Den Accessible Name bestimmen

Hier musst du umdenken: Im HTML-Quelltext steht natürlich **nirgendwo** `accessible-name="..."`.  
Kein Wunder, denn der Accessible Name ist ja ein *berechneter* Wert.  
Du kannst ihn also nicht ablesen, sondern musst ihn Dir selber holen: 

**Schritt 1 – Element lokalisieren.**
Öffne die DevTools (`F12`) und lokalisiere Dir das gesuchte Element: Klick auf den **Element-Picker** und dann auf das Element in der Seite. (Alternativ: Rechtsklick auf das Element → *Untersuchen*.)  
Das Element ist jetzt im **Inspector**/**Elements**-Baum markiert.

{{< figure src="img/elpicker.png" title="Element Picker" >}} 

**Schritt 2 – Accessibility-Ansicht öffnen.**
Jetzt lässt Du Dir die berechneten Barrierefreiheits-Infos anzeigen:

- **Chrome/Edge:** In der rechten Seitenleiste (neben *Styles*, *Computed* ...) den Tab **Accessibility** anklicken. Ist er nicht sichtbar, versteckt er sich hinter dem `»`-Menü.
- **Firefox:** Über das **Accessibility**-Panel. Dort das **Barrierefreiheits-Icon** (das Zeiger-/Personen-Symbol zum Auswählen) anklicken und das Element in der Seite anpicken.


**Schritt 3 – `Name` und `Role` ablesen.**

Der Browser zeigt Dir nun schwarz auf weiß:

- **`Name`** → der berechnete Accessible Name (exakt das, was der Screenreader vorliest)
- **`Role`** → z.B. `button`
- oft sogar die **Quelle**, aus der der Name stammt (`aria-label`, `<label>`, Textinhalt ...)

{{< figure src="img/accessname.png" title="Anzeigen des berechneten Accessibility Names" >}} 


Und damit hast Du beide Bausteine für Deinen Selektor bereits beisammen: `role` **und** `name`. Statt einen fragilen Pfad zu *kopieren*, liest Du die *semantische* Information ab, die der Browser ohnehin berechnet.

### Rolle + Name = das, was der Screenreader ansagt

Playwrights `role`-Locator kombiniert nun genau diese beiden Dinge - Rolle **und** Accessible Name:

```robotframework
Click    role=button[name="Suche schließen"]
```

`name=` matcht den **berechneten Accessible Name** aus *allen* Quellen - egal ob er aus `aria-label`, aus einem `<label>` oder aus dem sichtbaren Text stammt.  

=> Und damit bist damit völlig unabhängig davon, *wie* die Entwickler den Namen gesetzt haben.

Du *könntest* zwar auch das `aria-label`-Attribut direkt per CSS oder XPath abgreifen:

```robotframework
# geht - greift aber nur eine einzige Quelle heraus:
Fill Text  [aria-label='Name - Vornamen']  Steve      # CSS
Fill Text  //*[@aria-label='Name - Vornamen']  Steve  # XPath
```

Das funktioniert aber nur, solange der Name *tatsächlich* aus `aria-label` kommt - und bricht, sobald ein Entwickler ihn z.B. auf ein `<label>` umstellt, obwohl sich für den Nutzer nichts ändert.  

Der `role`-Locator ist viel robuster. (Sagte ich das bereits? 😊)

---

## Zum Abschluss: Die Selektor-Rangliste

Natürlich ist auch der **Accessible Name** kein Allheilmittel. 

Ich möchte diesen Artikel mit einer klaren Empfehlung (fast) abschließen: nutze Selektor-Typen in dieser Reihenfolge (sortiert von stabil nach fragil):

**1) Automation IDs**: `id`, `data-testid` & Co.  

Vorteile: 

- ...unschlagbar! Speziell für die **Automatisierung** geschaffen
- sprach-unabhängig
- hängen an keiner sichtbaren oder strukturellen Eigenschaft - ändern sich also nie "versehentlich"
- das Standard-Attribut in Playwright/Browser Library ist `data-testid` (bei Bedarf konfigurierbar)  

Einziger Haken: muss von den Entwicklern gesetzt werden.  
Ohne deren Mitarbeit existiert ID schlicht nicht. 

**Beispiel:**

```html
<button data-testid="save-form">Speichern</button>
```

**Browser Library:** 
```robotframework
Click    data-testid=save-form
```

Quelle: [Browser Library: Finding Elements with Automation IDs](https://marketsquare.github.io/robotframework-browser/Browser.html#Finding%20elements)

**2) Rolle + Accessible Name**: `role=...[name="..."]`

- der **Sweet Spot** 😊
- semantisch statt strukturell, er **spiegelt die Nutzerintention**
- funktioniert auch **ohne** Mithilfe der Entwickler - solange die Seite halbwegs barrierefrei ist
- **Bonus**: bricht genau dann, wenn auch ein Screenreader-Nutzer scheitern würde (dazu gleich eine kleine Pointe)

```robotframework
Click    role=button[name="Speichern"]
```

**3) Text-Selektoren**

- exakt das, was der Benutzer **sieht**
- **sprachabhängig**
- ⚠️ **Achtung**: Playwrights Text-Strategie ist per Default **Teilstring-Matching und case-insensitive**. `text=Speichern` matcht damit auch "**Speichern** und schließen" - ein klassischer Stolperstein.  
Mit Anführungszeichen erzwingst Du **exaktes Matching**:

```robotframework
Click    text=Speichern      # Teilstring, case-insensitive - Vorsicht!
Click    text="Speichern"    # exakt
```

Quelle: [Browser Library: Finding Elements](https://marketsquare.github.io/robotframework-browser/Browser.html#Finding%20elements)

**4) CSS/XPath auf sonstige Attribute**

Achtung, auch CSS-Klassen sind ganz normale Attribute, die sich ohne Vorwarnung ändern können, ohne dass sich die Seite ändert.  
Benutze sie nur, wenn wirklich kein anderer stabiler Anker existiert. 

```robotframework
Click    input[name='email']      # CSS: input mit Attribut name="email"
Click    div[data-state='open']   # CSS: div mit Attribut data-state="open"
```

---

## Die Pointe: Fragilität als Feature!

Und jetzt der Gedanke, der den Accessible Name von einer bloßen Technik zu einer **Haltung** macht:

Stell dir vor, dein Test bricht, weil `role=button[name="..."]` keinen Treffer findet – der Button hat **keinen Accessible Name**.  

Auf den ersten Blick ist das **ärgerlich**: schon wieder ein kaputter Test und ein zu flickender Selektor!

**Aber dreh es um**: Ein Button ohne Accessible Name ist für einen blinden Menschen **nicht benutzbar**.  
Dein Test ist also nicht an einer Testschwäche gescheitert – er hat gerade einen **echten Accessibility-Bug** gefunden! ☺️

**Merke:**

> Mit ARIA-Attributen bricht der Selektor genau dann, wenn ein realer Benutzer mit Hilfstechnologie ebenfalls scheitern würde. 
> 👉 Deine Testsuite prüft damit nicht nur, *ob* die Anwendung funktioniert – sondern *ob sie für ALLE funktioniert*.

---

## Bonus: mehrsprachige Tests

Wenn der Artikel jetzt aufgehört hätte, wäre er unehrlich gewesen:

Der Accessible Name ist **übersetzter Text**.  

"*Suche schließen*" heißt auf der englischen Seite natürlich "*Close search*".   
Läuft Dein Test gegen die deutsche *und* die englische Version, matcht ein fest verdrahteter Name "*Suche schließen*" nur auf der deutschen Seite - klar.

**Variablen** sind hier ein möglicher Ausweg. Hier ein sehr **nützlicher Robot Framework-Pattern**: 

Schritt 1️⃣: Auslagern der sprachspezifischen Bezeichner in je eine **Variablen-Ressource**. Lass diese mit dem Suffix `_DE` bzw. `_EN` enden:  

`variables_DE.resource`:
```robotframework
*** Variables ***
${CLOSE_SEARCH}    Suche schließen    
# und weitere...
```

`variables_EN.resource`:
```robotframework
*** Variables ***
${CLOSE_SEARCH}    Close search 
# und weitere...
```

Schritt 2️⃣: Definition einer Variable `${LANGUAGE}` in der `.robot`-Datei: 

```robotframework
*** Variables *** 
${LANGUAGE}  DE  # DE= default, überschreiben beim Aufruf mit `--variable LANGUAGE=EN`
```

Schritt 3️⃣: Laden der Variablen-Ressource über die Sprach-Variable `${LANGUAGE}`: 

`suite.robot`:
```robotframework
*** Settings ***
Resource  variables_${LANGUAGE}.resource  # sprach-abhängiges Laden der Ressourcen
```

Schritt 4️⃣: Verwenden der jetzt sprach-unabhängigen Bezeichner als Variablen - direkt im rollenbasierten Locator: 

```robotframework
*** Keywords ***
Suche schließen
    Click    role=button[name=${CLOSE_SEARCH}]
```

## Zum Schluss

Fassen wir also zusammen: mir geht es hier nicht um Selektor-Judotricks, sondern um einen **Blickwechsel**.  

Wenn Du künftig also vor der Wahl stehst, einen Selektor schnell zu *kopieren* oder ihn kurz in den DevTools *abzulesen*: Der zweite Klick auf den **Accessible Name** kostet Dich keine Sekunde mehr – liefert Dir aber einen Anker, der sicher länger hält.  

Und im besten Fall findest Du damit sogar Bugs, die echten Menschen das Leben schwer machen können. 💪

---

Wie handhabt ihr das in euren Suiten – konsequent `data-testid`, oder selektiert ihr über den Accessible Name? Oder ganz anders? Ich freue mich auf Deinen Kommentar.