---
draft: false
title: "Matche wenig, triff sicher"
# --- Italic subheading
lead: "Worauf Du achten solltest, wenn Du Accessible Names als Selektoren verwendest. Erkenntnisse aus der Praxis - Teil 2"
# -- giscus id to match comments
commentid: web-selectors-2
# -- predefined URL
# slug: 
# -- for posts in menubar, use this (shorter) title
# menutitle: 
#description: 
date: "2026-08-25T09:00:00+02:00"
categories:
  - background
tags:
  - robot-framework
  - browser-library
  - web-testing
  - selectors
  - accessibility
authorbox: true
sidebar: true
pager: false
#menu: main
#weight: 10
# --- must be in the leaf bundle folder or static
thumbnail: "img/title.png"
vgwort: https://vg04.met.vgwort.de/na/2f494d1588e14947a7e1f587f3647246
translationKey: "web-selectors-2"
---

Im [ersten Teil dieses Artikels]({{< ref "/web-selectors/" >}}) habe ich Dir den **Accessible Name** als besten Anker für Web-Selektoren empfohlen.

Diese Empfehlung ist an eine wichtige **Bedingung** geknüpft - statt den ersten Artikel nur zu ergänzen, will ich sie in einem eigenen Artikel noch einmal klarstellen:

`role=` ist kein Allheilmittel. Denn im "Accessible Name" können ganze Romane stehen.  
Ein kleiner Bericht aus meiner Praxis. 

<!--more-->

---

## Der erste Artikel holt mich ein...

Kurz nach der Veröffentlichung des ersten Teils saß ich an einem Web-Test für eine Bürger-Anwendung einer **Behörde**.  

Die Ausgangslage war genau die, für die ich den **Accessible Name** empfohlen hatte:

- *IDs?* Fehlanzeige - und wo sie vorhanden waren, **dynamisch** vergeben. Komplett unbrauchbar.
- *CSS-Klassen?* Zu ungenau.
- *Accessible Names?* **Auf fast jedem Element vorhanden.**  ✅

Nach meiner eigenen Rangliste (siehe Artikel) hätte das ja eigentlich ein Heimspiel werden müssen (oder wie man bei uns daheim sagt: "*a gmahde Wiesn*").

Wurde es aber nicht...  

Denn die Accessible Names waren für meinen Zweck schlicht "*über-optimiert*".  
Um "None" in diesem Abschnitt anzukreuzen... 

{{< figure src="img/question.png" title="Frage im Webformular" >}} 

... musste ich im Accessible Name den ganzen Satz nehmen:

```robotframework
Click    role=group[name="What emissions from the plant's operations can be expected in the surrounding area?"] >> role=checkbox[name="None"]
```

Natürlich funktioniert der Selektor. Er ist sogar super-präzise.  
Und trotzdem war mir beim Schreiben unwohl.

---

## Des Screenreaders Freud, des Testers Leid...

Aus Sicht des (sehbehinderten) Nutzers ist so ein langer Satz ja **ein echter Gewinn**.

Denn würde der Screenreader nur die Checkbox erklären, wäre das für sich genommen Quatsch - was soll die Option "None" bedeuten?

Nur mit dem ganzen Satz weiß die Person, worauf sich "None" bezieht.

Für den Test ist derselbe Satz aber eine Zeitbombe.  💣  
Denn irgendwann setzt sich jemand hin und redigiert die Formulierung:

```robotframework
# vorher
role=group[name="What emissions from the plant's operations can be expected in the surrounding area?"]

# nachher
role=group[name="What kind of emissions from the plant's operation can be expected in the surrounding area?"]
#                ^^^^^^^^^^                            ^
```

- Bedeutung: **identisch**.
- Selektor: **kaputt** ❌

Und hier liegt der Unterschied, auf den es ankommt:

> Hieße der Accessible Name schlicht **"Emissions"**, würde ich darauf wetten, dass sich daran nie wieder etwas ändert - warum auch?  
> Ein ganzer Satz dagegen ist **redigierbarer Fließtext** ohne Garantie: Er gehört der *Redaktion*, nicht der Entwicklung.

- Ein Entwickler denkt zweimal nach, bevor er einen Bezeichner (z. B. Automation-IDs) umbenennt. 
- Wer aber einen Fragebogen sprachlich glättet, denkt gar nicht daran, dass irgendwo eine Testsuite darauf aufbaut.

---

## Der Denkfehler: alles oder nichts

Wie löst man das Dilemma? 

Ganz einfach: **nicht den ganzen Satz matchen, sondern nur die Teile, die zwei Bedingungen erfüllen**:

1. Sie sind **wahrscheinlich eindeutig** für dieses Element.
2. Sie sind **wahrscheinlich dauerhaft** vorhanden.

Das ist der ganze Trick - aber vorher noch eine kleine Warnung:

---

## `name`-Attribut ≠ Accessible Name

Hier lauert eine Falle, in die man leicht tappt – weil zwei völlig verschiedene Dinge zufällig gleich heißen.

> Ein HTML-Attribut `name` (etwa bei `<input name="email">`) ist ein ganz **normales Attribut** im Quelltext.  
> Der **Accessible Name** dagegen ist ein vom Browser **berechneter Wert**, der aus mehreren Quellen entstehen kann – ich habe das im [ersten Teil]({{< ref "web-selectors/index.de.md#den-accessible-name-bestimmen" >}}) ausführlich beschrieben.

Was heißt das für die Selektoren?

| Ausdruck | matcht … |
|---|---|
| `//*[@name="…"]` (XPath) | das **HTML-Attribut** `name` |
| `[name*="…"]` (CSS) | das **HTML-Attribut** `name` |
| `role=…[name="…"]` | den **berechneten Accessible Name** |

In meinem Behörden-Formular existierte das Attribut überhaupt nicht.  

Der Name entstand per `aria-labelledby` aus einem *anderen* Element.

Der naheliegende Ausweg wäre nun, eben die `aria-labelledby`-Verweise direkt zu matchen:

```
//*[@aria-labelledby="..."]
```

Das *funktioniert* – aber es ist ein **Rückschritt**: Denn damit hängst Du Deinen Test wieder an eine **einzelne Quelle** der Namensberechnung - und obendrein an eine ID, die generiert sein kann.  
Es ist exakt der Fehler, den ich im ersten Teil schon für den direkten Zugriff auf `aria-label` beschrieben habe: Sobald ein Entwickler die Quelle wechselt, bricht der Test – obwohl sich für den Nutzer **nichts** geändert hat.

Die gute Nachricht: Du brauchst diesen Ausweg gar nicht.

---

## Teil-Matching in der `role`-Strategie

Für Teil-Matching brauchst Du **weder XPath noch CSS**.  

Der `role`-Locator kann das von Haus aus – und zwar auf dem *berechneten* Namen, nicht auf einem Attribut.

Ich war bisher davon ausgegangen, dass `name=` nur exakt matcht.  
Aber dank René Rohners Hilfe weiß ich inzwischen: Das stimmt nicht.  

Hier ist die vollständige Übersicht über das, was man mit `name=` machen kann – nehmen wir dafür einen Button mit dem Accessible Name "Save As":

```robotframework
role=button[name="Save As"]    exact match (default, even without quotes)
role=button[name*="ave"]       *=  contains
role=button[name^="Sa"]        ^=  starts-with
role=button[name$="As"]        $=  ends-with
role=button[name~="Save"]      ~=  whitespace-separated word match
role=button[name|="Save"]      |=  dash match ("Save" or "Save-As", not "Save As")
role=button[name="save as"i]   case-insensitive flag
role=button[name=/^Save.*/]    regex (with flags, e.g. /save/i)
```

Diese acht Zeilen sind der Grund, warum dieser Artikel existiert. 😊

Wenn Du diese Möglichkeiten kennst, stellt sich die Frage "*ist dieser Accessible Name brauchbar?*" gar nicht mehr in dieser Form.  

Ab jetzt fragst Du nur noch: 

> **Welcher *Teil* dieses Namens ist unveränderlich?**

Und dann schreibst Du zum Beispiel solche Selektoren:

```robotframework
Click    role=group[name=/.*emissions.*expected.*surrounding area.*/i] >> role=checkbox[name="None"]
```

---

## Das Rezept

Das Rezept lautet also: **Zerlege einen überlangen Accessible Name in zwei Sorten von Wörtern.**

Nehmen wir nochmal diesen Satz aus dem Behörden-Formular:

> "What emissions from the plant's operations can be expected in the surrounding area?"

Und sortieren, was **überlebt** und was **nicht**:

| Überlebt eine Umformulierung | Überlebt sie nicht |
| --- | --- |
| `emissions` | `What kind of` |
| `expected` | `from the plant's operations` |
| `surrounding area` | Satzbau, Artikel, Singular/Plural |

Die Logik dahinter ist einfach:

- **Fachbegriffe** sind der Grund, warum dieses Feld überhaupt existiert. Sie ändern sich nur, wenn sich die *Fachlichkeit* ändert – und dann **soll** Dein Test brechen.
- Alles andere ist Formulierung. Und Formulierungen werden nun mal gern überarbeitet.

Der optimierte Selektor matcht also die Fachbegriffe **in ihrer Reihenfolge**, nicht den Satz:

```robotframework
# ❌ bricht bei der nächsten Textüberarbeitung
role=group[name="What emissions from the plant's operations can be expected in the surrounding area?"]

# ✅ überlebt sie
role=group[name=/.*emissions.*expected.*surrounding area.*/i]
```

> **Info:** Das `i` am Ende des Regex ist das Flag für *case-insensitive*. Praktisch, wenn irgendwer aus "Emissions" ein "emissions" macht.

> Praktischer Nebeneffekt (man kann darüber streiten, ich finde es gut): Der zweite Selektor ist auch **erheblich besser lesbar**. Wer ihn liest, sieht sofort, worum es fachlich geht – der lange Satz musste dagegen erst gelesen werden.

---

## Die Kehrseite: zu unscharf ist auch keine Lösung

Hey, ich will hier kein Wundermittel verkaufen... Je weicher Deine Selektoren werden, desto wahrscheinlicher treffen sie **mehrere** Elemente – und dann bricht der Test aus dem umgekehrten Grund.

Eine sehr wirksame Gegenmaßnahme steckt im Beispiel oben schon drin: die **Verkettung** mit `>>`, die ich im [ersten Teil]({{< ref "web-selectors/index.de.md#kurz-am-rande-selektoren-verketten" >}}) beschrieben habe.

```robotframework
Click    role=group[name=/.*emissions.*expected.*/i] >> role=checkbox[name="None"]
#        └─ unscharfer Container ──────────────────┘    └─ präzises Zielelement ─┘
```

Hieraus ergibt sich ein **Muster**, das sich weit über diesen Fall hinaus lohnt:

- Der **Container** wird "unscharf" getroffen (er trägt den langen, redigierbaren Text).
- Das **Zielelement** darin wird exakt getroffen (es trägt meist ein knappes, stabiles Label wie "*None*", "*Ja*", "*Speichern*").

Der lange Satz dient also nur noch dazu, den *richtigen Bereich* der Seite zu finden.  
Die eigentliche Interaktion hängt an einem kurzen Namen – genau der Sorte, die ich Dir im ersten Teil empfohlen habe.

---

## Meine Learnings aus diesem Fall

Ich habe mit mir gerungen, ob ich den ersten Artikel ändern sollte.  
Aber ich habe mich dagegen entschieden. Denn die Empfehlung, den **Accessible Name** zu verwenden, ist nach wie vor richtig.

Fassen wir stattdessen hier zusammen, was nachzutragen ist:

**1. Platz 1 der Rangliste bekommt eine Bedingung.**

`role=…[name="..."]` ist nicht *automatisch* robust. Bevor Du einen Accessible Name verwendest, prüfe ihn:

- Ist er **kurz**?
- Ist er ein **Begriff** – oder eine Formulierung?
- Ist er an den **sichtbaren Text gekoppelt**?
- Ist er **übersetzter Text**? (Dann brauchst Du eh Variablen – siehe [Bonus-Abschnitt im ersten Teil]({{< ref "/web-selectors/" >}}).)

Fällt die Prüfung negativ aus, ist das kein Grund, die Strategie zu wechseln – sondern der Anlass, den invarianten Kern herauszuschneiden.

**2. Der wichtigste Satz**

Wenn Du Dir eines von diesem Artikel merken willst, dann diesen Satz:

> `role=` ist eine **Strategie**, kein Gütesiegel.  
> Die Robustheit steckt nicht im `role=`. Sie steckt im `name`.

---

## Und noch eine Pointe

Der erste Teil endete mit dem Gedanken "**Fragilität als Feature**": Wenn Dein Test bricht, weil ein Element gar keinen Accessible Name hat, hast Du gerade einen echten Accessibility-Bug gefunden.

Dieser Fall hier ist die Fortsetzung – und vielleicht auch noch die interessantere Hälfte:

> Die Seite ist **vorbildlich barrierefrei**. Der ausführliche Satz ist für Screenreader-Nutzer ein echter Gewinn.  
> Und **trotzdem** ist der Selektor fragil.

**Gute Accessibility und gute Selektoren verfolgen nicht dasselbe Ziel.**  
Sie überlappen meistens – aber eben nicht immer.

Ein Text, der für Menschen optimiert wurde, ist nicht automatisch ein guter Bezeichner für Maschinen.  
Wo beides auseinanderläuft, ist es Dein Job, aus diesem Text den Teil herauszuschneiden, der **Bedeutung trägt**.

---

Mein großer Dank geht an **René Rohner** und **S.K.**, die so fleißig mitdiskutiert haben.  

➛ Zurück zu **[Teil 1: Nicht kopieren, sondern verstehen]({{< ref "/web-selectors/" >}})**
