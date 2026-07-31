---
draft: false
title: "Nicht kopieren, sondern verstehen: robuste Selektoren für Web-Tests"
# --- Italic subheading
lead: "Warum kopierte XPaths Eintagsfliegen sind – und wie der Accessible Name deine Tests stabil macht (und nebenbei Accessibility-Bugs findet)"
# -- giscus id to match comments
commentid: web-selectors
# -- predefined URL
# slug: 
# -- for posts in menubar, use this (shorter) title
# menutitle: 
#description: "Robotmk kann RCC-Environments vollständig offline aufbauen. Dieser Artikel erklärt, warum das wichtig ist und wie es in der Praxis funktioniert."
date: "2026-07-23T10:42:47+02:00"
categories:
  - tutorials
tags:
  - browser-library
  - robotframework
  - web-testing
authorbox: true
sidebar: true
pager: false
#menu: main
#weight: 10
# --- must be in the leaf bundle folder or static
thumbnail: 
# vgwort: https://vg04.met.vgwort.de/na/2d95d237c15f446bb564e78199f946fe
translationKey: "web-selectors"
---

**Mein Rat vorweg**: Finger weg ✋ von kopierten oder generierten Selektoren für Web-Tests!

In diesem Artikel erkläre ich warum: denn die Bestimmung robuster Selektoren gehört zum absoluten Grundwissen fürs Web-Testing.  
Ob Du das Handwerk für robuste Selektoren verstehst, macht später bei der Wartung der Tetss einen enormen Unterschied.

<!--more-->

---

## Das Problem: kopierte Selektoren sind Eintagsfliegen

Schauen wir uns zunächst mal an, wo das was Problem liegt:  

Du bist dabei einen Web-Test zu entwickeln und brauchst nun einen Selektor für einen Button.  
Du öffnest Die Developer Tools im Browser, kopierst den Selektor...

{{< figure src="img/copy.png" title="Kopieren eines Selektors aus dem Browser" >}} 

...und - voilá: 

```
/html/body/div[3]/div/div[2]/button
```

Das ist ein sogenannter **XPath**-Selektor – eine Art "Wegbeschreibung" durch den DOM-Baum, Abzweigung für Abzweigung.

> **DOM** = Document Object Model. Das Modell, nachdem der Browser den HTML-Quelltext geparst und in eine für ihn verständliche Form gebracht hat.

Übersetzt heißt dieser XPath: 

- Geh ins dritte `div` unter `body`, 
- dann ins erste `div`, 
- dann ins zweite, 
- dort ist der anzuklickende Button. 
  
Dieser Selektor funktioniert - *heute*. Mit genau *dieser* Version der Seite/Applikation.

Das Problem ist gar nicht der XPath-Selektor an sich.  
Das Problem ist eher, ein solcher Selektor extrem stark von der **Struktur** der Seite abhängt. 
Die Struktur ist für den Nutzer aber nicht nur **unsichtbar**, sondern auch **unerheblich**, denn für ihn zählt nur die visuelle Repräsentation.  

Vielleicht schon morgen packt der Web-Entwickler aus irgend einem Grund ein Wrapper-`div` um den ganzen Abschnitt mit dem Button – und schon haben wir das Problem:

Dein Test schlägt sofort fehl und produziert einen "*false positive*"-Alarm:  
Nicht die Anwendung kaputt, sondern Dein Test, genauer gesagt, *dein Selektor*:

```
# funktioniert nicht mehr
/html/body/div[3]/div/div[2]/button
# reparierter Selektor
/html/body/div[4]/div/div[2]/button
---------------^
```

Im Synthetic Monitoring bedeutet das: Alarme werden grundlos verschickt, Tickets erstellt, die Bereitschaft wird nachts rausgeklingelt.  

*Oft höre ich, dass Web-Tests grundsätzlich "keinen Sinn machen", weil sich ja "immer etwas an der Seite ändern kann". Wenn ich dann nachfrage, wie die Selektoren erstellt wurden, sind die Antworten immer die gleichen: kopiert-generiert-weiß-ich-nicht.*


---


## Perspektivenwechsel von "wo" nach "wie"

In diesem Artikel möchte ich Dir einen **Perspektivenwechsel** näherbringen: 

> **Beschreibe nicht, wo das Element im DOM steht. Beschreibe, wie ein *Mensch* es beschreiben würde.**

Ein Beispiel: 

Du erklärst jemandem, wie er ein **Web-Formular** abschicken soll.  

- ❌ Du sagst dann nicht: "*Klick auf das dritte `div`, dann auf den Button darin*."  
- 💪 Du sagst stattdessen: "*Klick auf **Absenden**.*"  

Menschen beschreiben Elemente über ihre **Bedeutung**: 

- was auf einem Button draufsteht
- was ein Button auslöst
- welche Rolle ein Button spielt.

Für solche "*menschlichen*" Beschreibungen gibt es im Web ein *technisches* Pendant: es heißt **Accessible Name** - der *zugängliche* Name eines Elements.  
Und der ist einer der stabilsten Anker, die du überhaupt bekommen kannst.  

Um zu verstehen, warum, müssen wir kurz bei `aria-label` vorbeischauen - Du hast dieses Attirbut vielleicht schon einmal im Quelltext einer Webseite gesehen. 

---


## `aria-label` - was ist das? 

ARIA steht für *Accessible Rich Internet Applications* - eine vordefinierte Sammlung von HTML-Attributen, die Elementen zusätzliche Bedeutung für sog. "**Hilfstechnologien**" geben.  

"Hilfstechnologien" sind in den meisten Fällen **Screenreader**, die von sehbehinderten Menschen benutzt werden, um sich den Inhalt einer Webseite nicht nur **vorlesen**, sondern ihre Bedienung auch **erklären** zu lassen. 

Das Attribut `aria-label` gibt einem HTML-Element einen **Accessible Name**: einen Text, der beschreibt, worum es sich handelt - auch dann, wenn auf dem Element gar kein sichtbarer Text steht.  

**Beispiel**: 

Ein Icon-Button zum Schließen eines Dialogs, der ohne jegliche Beschriftung auskommt:

```html
<button aria-label="Suche schließen">
  <svg>. . .</svg>
</button>
```

Sichtbar ist hier nur ein kleines X-Icon, der vom `<svg>` gezeichnet wird.  

- **Ohne** `aria-label` liest ein Screenreader vor: **"Schaltfläche"**.
- **Mit** `aria-label` wird daraus: **"Suche schließen, Schaltfläche"** - eine wertvolle Info für einen blinden Menschen! 

---


## ARIA - perfekt für Selektoren

**Warum eignen sich ARIA-Werte gut für Selektoren?** 

Der Accessible Name hat **drei Eigenschaften**, die ihn von kopierten Selektoren unterscheiden:

- ☑️ Er ist **semantisch, nicht strukturell.**  
Er beschreibt, *was* das Element ist – und nicht, *wo* es steht.  
Ein Refactoring der DOM-Struktur oder ein Wechsel der CSS-Klassen macht ihm nichts aus. 
- ☑️ Er beschreibt die **Nutzerintention.**  
"*Suche schließen*" ist das, was der Benutzer erreichen will.
- ☑️ Er ist oft der **einzige verlässliche Anker.**  
Dort wo Klassennamen generiert und IDs dynamisch vergeben werden, bleibt zumindest noch der Accessible Name stabil.

Das `aria-label` ist ein HTML-Attribut wie jedes andere - das bedeutet, dass Du es sowohl mit **CSS**- als auch mit **XPath** ansprechen kannst. Hier je ein Beispiel: 

```robotframework
# CSS 
Fill Text  [aria-label='Name - Vornamen']  Steve
# XPath
Fill Text  //*[@aria-label='Name - Vornamen']  Steve
```

--- 

### Fallstrick: Wenn die Webseite mehrsprachig ist

Wenn der Artikel hier aufhörte, wäre er unehrlich ...

Der Accessible Name ist **übersetzter Text**.  
"*Suche schließen*" heißt auf der englischen Seite natürlich "*Close search*".   
Läuft Dein Test gegen die deutsche *und* die englische Version, matcht ein fest verdrahtetes aria-label "*Suche schließen*" nur auf der deutschen Seite - klar.

Variablen sind hier ein möglicher Ausweg. Hier ein **nützlicher Pattern**: 

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

Schritt 4️⃣: Verwenden der jetzt sprach-unabhängigen ARIA-Bezeichner als Variablen: 

```robotframework
*** Keywords ***
Suche schließen
    Click    button[aria-label='${CLOSE_SEARCH}']
```

---


## Die Selektor-Rangliste

Natürlich sind auch `aria-labels` kein Allheilmittel. 

Ich möchte diesen Artikel mit einer klaren Empfehlung abschließen: nutze Selektor-Typen in diese Reihenfolge (sortiert von stabil nach fragil):

1) Automation IDs: `id`, `data-testid`, `data-test-id`, `data-test`.  

Vorteile: 

- speziell für die **Automatisierung** geschaffen
- Dies sind die vier standardisierten und von der Browser Library unterstützten Attribute  
- ändern sich nie "versehentlich", weil sie an keiner sichtbaren oder strukturellen Eigenschaft hängen.  

Einziger Haken: muss von den Entwicklern gesetzt werden.  
Ohne deren Mitarbeit existiert es schlicht nicht. 

**Beispiel:**

```html
<button data-testid="save-form">Speichern</button>
```

**Browser Library:** 
```robotframework
Click    data-testid=save-form
```

Quelle: [Browser Library: Finding Elements with Automation IDs](https://marketsquare.github.io/robotframework-browser/Browser.html#Finding%20elements)

2) **Text-Selektoren** 

- exakt das, was Benutzer sieht
- **sprachabhängig**

```robotframework
Click    text=Speichern    # Playwright Text-Strategie: substring matching, case-insensitive
Click    text="Speichern"  # Playwright Text-Strategie: explicit
```

Quelle: [Browser Library: Finding Elements with Automation IDs](https://marketsquare.github.io/robotframework-browser/Browser.html#Finding%20elements)

1) **CSS/XPath auf sonstige Attribute**

Achtung, auch CSS-Klassen sind ganz normale Attribute, die sich ohne Vorwarnung ändern können, ohne dass sich die Seite ändert.  
Benutzer sie nur, wenn wirklich kein anderer stabiler Anker existiert. 

```robotframework
Click    div.submit         # CSS: div mit Klasse "submit"
Click    div[role='clear']  # CSS: div mit Attribut 'clear'
```

---

## Die Pointe: Fragilität als Feature

Und jetzt der Gedanke, der `aria-label` von einer bloßen Technik zu einer **Haltung** macht:

Stell dir vor, dein Test bricht, weil `aria-label="..."]` keinen Treffer findet – der Button hat **keinen Accessible Name**.  

Auf den ersten Blick ist das **ärgerlich**: schon wieder ein kaputter Test und ein zu flickender Selektor!

**Aber dreh es um**: Ein Button ohne Accessible Name ist für einen blinden Menschen **nicht benutzbar**.  
Dein Test ist also nicht an einer Testschwäche gescheitert – er hat gerade einen **echten Accessibility-Bug** gefunden! ☺️

**Merke:**

> Mit ARIA-Attributen bricht der Selektor genau dann, wenn ein realer Benutzer mit Hilfstechnologie ebenfalls scheitern würde. 
> 👉 Deine Testsuite prüft damit nicht nur, *ob* die Anwendung funktioniert – sondern *ob sie für ALLE funktioniert*.

---

Wie handhabt ihr das in euren Suiten – konsequent `data-testid`, oder selektiert ihr über den Accessible Name? Oder ganz anders? Ich freue mich auf Deinen Kommentar.
