---
draft: false
title: "Robocon 2026 - Recap (Teil 5 - Freitag)"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
commentid: robocon26-recap-5
# slug: 
# -- for posts in menubar, use this (shorter) title
# menutitle: 
description: null
date: "2026-02-14T10:04:33+02:00"
categories:
  - news
tags:
  - "robocon"
authorbox: true
sidebar: true
pager: false
thumbnail: "img/robocon.png"
---

Dies ist **Teil 5** der sechsteiligen Review der Robocon 2026 in Helsinki.

<!--more-->

---

➛ Zurück zu **[Teil 4 (Donnerstag: Konferenz Tag 1)]({{< ref "/robocon26-recap-4/" >}})**  
➛ Weiter zu **[Teil 6 (Freitag: Konferenz Tag 2)]({{< ref "/robocon26-recap-6/" >}})**

---

![alt text](img/biorex.png)

## Freitag: Konferenz Tag 2

### Robot Framework Core Updates


{{< portrait src="img/pekka.png" alt="Pekka Klärck" >}}

**Pekka Klärck** ist bekanntermaßen der **Erfinder** und Lead Developer von Robot Framework.  
Er startete das Projekt 2005 als Teil seiner Masterarbeit an der Helsinki University of Technology (heute Aalto University) und steuert seitdem die Entwicklung.  
Pekka bietet traditoinell am zweiten Konferenztag einen **Überblick** über alle Entwicklungen und Aktivitäten rund um Robot Framework: welche neuen Libraries entstanden sind, welche großen Updates es gab, wer sich besonders hervorgetan hat – all das findet hier seinen Platz.

Zwei Features im Core der Versionem **7.3** und **7.4** stechen besonders hervor:  

- **Variable Types**: Die Möglichkeit, Variablen-Typen explizit zu deklarieren, verbessert die Code-Qualität und reduziert potenzielle Fehlerquellen. Gerade in größeren Projekten ist das ein echter Gewinn an Klarheit.
- **Secret Variables**: Ein längst überfälliges Feature, das die Handhabung sensibler Daten wie Passwörter oder API-Keys erheblich sicherer macht. Keine Klartext-Credentials mehr in Logs – ein wichtiger Schritt in Richtung Production-Ready-Automation. (Siehe auch mein [Artikel](secretvars/) dazu)

Ein weiteres Thema: Ein neues **Manual** ist in Arbeit, wird aber noch etwas dauern. Pekka rief die Community zur Mitarbeit auf.  
Wer sich beteiligen möchte, kann sich im Slack-Channel [#manual-editing](https://robotframework.slack.com/archives/C063Y9GEMUP) melden.  

Dann kam ein Thema, das sicher vielen aus der Seele sprach: **Namespace-Handling**. Aktuell existiert bei Library- und Resource-Imports nur der **Suite-Scope** – und das ist, ehrlich gesagt, problematisch.

Wenn beispielsweise ein Keyword in einem Resource-File definiert wird und dort auch nur genutzt werden soll, ist es dennoch von überall aus zugreifbar.  
Es fehlt in Robot Framework schlicht die Möglichkeit, Keywords als **privat** zu markieren.  
Das führt zu unübersichtlichem Code und ungewollten Abhängigkeiten – gerade in großen Projekten ein echtes Ärgernis.

In **Version 8** will Pekka dieses Problem angehen. Die geplanten Änderungen werden mehr Kontrolle über die Sichtbarkeit von Keywords und Variablen ermöglichen – ein lange erwarteter Schritt hin zu saubererem, modulareren Code.

Wie jedes Jahr bot Pekka auch einen Überblick über die **aktuellen Beiträge aus der Community**. 

Bei der Gelegenheit ein Tipp meinerseits: Die Seite [awesome-robotframework](https://github.com/MarketSquare/awesome-robotframework) bietet einen großartigen Überblick über **alle Robot-Framework-Projekte** – sei es Libraries, Listener oder Third-Party-Projekte.  

Wer etwas Bestimmtes sucht oder einfach nur stöbern möchte, sollte dort unbedingt vorbeischauen.

---

### Bringing Robot Framework into n8n Visual Workflows



{{< portrait src="img/namik.png" alt="Namik Delilovic" >}}

Automatisierungen entfalten ihren größten Wert, wenn sie mit anderen Tools und Services interagieren.  
Genau hier setzt Namiks Projekt an: **n8n-nodes-robotframework** ermöglicht es, Robot-Framework-Tasks direkt in n8n's visuelle Workflows zu integrieren – und damit Zugriff auf das ganze Ökosystem der Integraitonen zu erhalten. 

Das bedeutet: Robot Framework Tests lassen sich nahtlos mit den Nodes für APIs, Datenbanken, Messaging-Systemen und KI-Services verbinden – alles visuell konfiguriert, ohne zusätzlichen Code schreiben zu müssen.

Natürlich könnte man einwenden: *"Das lässt sich doch alles auch mit Robot Framework direkt lösen."*  
Klar – aber die Nodes in n8n kapseln die Funktionalität von APIs bereits auf einem **höheren Abstraktionslevel**.  
Das spart Zeit und reduziert Komplexität erheblich.

Namik zeigte in seinem Vortrag einige anschauliche Beispiele.  
Zwar nicht beruflicher Natur, sondern rein privat – bisher ist das ein **reines Privatprojekt** (doppelter Respekt dafür! 👏)  – aber die Use Cases waren trotzdem hochspannend:

Namik automatisierte das **Aufladen seiner Handy-Prepaid-Karte** 📱 mit 8n.  
**Problem**: der Provider stellt hierfür keine API bereit.  
**Lösung**: Per n8n-cron startet er ein Robot-Framework-Script, das sich headless mit Playwright ([BrowserLibrary](https://marketsquare.github.io/robotframework-browser/Browser.html)) beim Provider einloggt und das Guthaben auflädt.

![alt text](img/talk-n8n.png)

Im zweiten Beispiel wollte Namik wissen, ob bei **Autoscout interessante Autos zum Verkauf** 🚘 stehen, die er vielleicht mit Gewinn weiterverkaufen könnte.  
Das **Problem**: Die Benachrichtigungen von Autoscout kommen oft viel zu spät (manchmal erst einen Tag später) – dann ist das Auto längst weg.  
**Lösung**: Per n8n hat er das automatisiert. Das System prüft regelmäßig (natürlich mit einem **randomisierten Intervall** wegen der Bot-Erkennung) auf neue Autos.  
Falls ein interessantes Angebot erscheint, bekommt er eine Mail mit Screenshot.  
Dank n8n kann er auch gleich eine **KI-Bewertung** durch OpenAI reinhängen, die ihre Einschätzung zum Wiederverkaufswert gibt.

> *Nebenbei, ein toller Tipp von ihm für alle, die damit kämpfen, von der Gegenstelle als Bot erkannt zu werden: es ist einen Versuch wert, die Permission **"geolocation"** im [New Context](https://marketsquare.github.io/robotframework-browser/Browser.html#New%20Context)-Keyword auf `true` zu setzen.  
Bots haben die Geolocation gewöhnlich nicht aktiviert.  
Auch das manuelle Setzen des **User-Agents** ist eine wirkungsvolle Strategie, um an Bot-Sperren vorbeizukommen.  
(Naütrlich gleich alles in mein [Trainingsmaterial](https://lp.robotmk.org/robotmk-masterclass-4d-de) aufgenommen ☺️)*

Besonders clever: Mit dem Keyword [Save Storage State](https://marketsquare.github.io/robotframework-browser/Browser.html#Save%20Storage%20State) speicherte Namik die aktuelle Browser-Session (z.B. alle gesetzten Cookies), und übergab sie an den nächsten Node.  
Damit kann der folgende Node direkt im **eingeloggten Zustand** weitermachen – ein eleganter Weg, der Teilschritte an separate Nodes delegiert.

👉 **Fazit**  
Namiks Vortrag war für mich persönlich ein Highlight. Ich nutze [n8n](https://n8n.io) schon seit Langem und kenne mich entsprechend gut damit aus – es ist ein fantastisches Tool für Workflow-Automatisierung.  
Der Vortrag war inspirierend, technisch fundiert und zeigte eindrucksvoll, wie **visuelle Workflow-Automatisierung** und **Robot Framework** sich gegenseitig ergänzen können.  
Ich habe im Flieger heimwärts über die Zukunft von RPA nachgedacht und muss sagen: wer Businessprozesse automatisieren will, sollte sich insgesamt statt Robot Framework n8n ansehen. 

---

### Climbing the Mountain: Our Journey We Couldn't Make Alone

{{< portrait src="img/jerzy.png" alt="Jerzy Głowacki" >}}

{{< portrait src="img/igor.png" alt="Igor Czyrski" >}}

Die Session von Igor Czyrski und Jerzy Głowacki vom NiceProject QA-Team erzählte eine Geschichte, die manche in der Robot-Framework-Community nachvollziehen können:  
den Weg von der **initialen Tool-Adoption** bis hin zum **aktiven Community-Building**.  

Die beiden nutzten die Metapher einer **Bergbesteigung**, um ihre vierjährige Reise zu illustrieren – eine Analogie, die sich durch die gesamte Präsentation zog.

2020 startete NiceProject mit Robot Framework. Die Entscheidung fiel aufgrund der Vielseitigkeit, doch die zunehmende Projektkomplexität – insbesondere bei der Desktop-Automation – offenbarte schnell die **Grenzen isolierten Arbeitens**.  

Eigene Custom Libraries stießen an ihre Kapazitätsgrenzen.  
Die "steilen Hänge" technischer Roadblocks erforderten letztlich die Suche nach breiterer Expertise.

![alt text](img/talk-nicep.png)

Igor und Jerzy beschrieben dann die Phase der **kritischen Transition**: von lokalen Anwendern zu aktiven Teilnehmern im globalen Ökosystem.  

Ihre Reise führte über mehrere Schlüsselphasen = "Camps": Die **Discovery Phase**, in der das Team erkannte, dass die bisherigen Methoden nicht mehr ausreichten.  

Dann die **Community Integration** – internationale Treffen wie die RoboCon wurden zur "Berghütte" für das Team. Ein Ort der Sicherheit, des Wissensaustauschs und der Regeneration.

Der entscheidende Wendepunkt für sie war dann der **Shift von Climbers zu Guides**: NiceProject trat der Robot Framework Foundation bei und etablierte die [WRobocon](https://wrobocon.eu) – eine zweite große Robot-Framework-Konferenz.  

Inzwischen zieht diese "*kleine Schwester der Robocon*" ebenso Speaker aus der ganzen Welt an und erfreut sich großer Beliebtheit.  
Dieser strategische Schritt hin zur aktiven Contribution zeigt exemplarisch, wie aus Konsumenten von Open Source echte **Enabler** und Multiplikatoren werden können.

Natürlich ist nicht gleich jeder der geborene Community-Gründer und wir brauchen auch keine 100 Robocons auf dieser Welt. 😉  
Die zentrale Botschaft der Session war eine andere: **Technisches Wachstum ist selten ein Solo-Projekt**.  
Die beiden betonten, wie kollaborative Umgebungen die Resilienz ganzer Teams stärken.  
Ihr Weg – dokumentiert über die verschiedenen "Höhenstufen" der Bergbesteigung 🏔️ – machte deutlich, dass echter Fortschritt dann entsteht, wenn Organisationen ihre isolierte Implementierung hinter sich lassen und zum aktiven Teil der Community werden.

👉 **Fazit**: Ein wirklich inspirierender Einblick in eine Reise, die zeigt, **wie aus Anwendern Gestalter** werden – und wie wertvoll es ist, die Community nicht nur zu nutzen, sondern ihr etwas zurückzugeben, indem man sie aktiv mitgestaltet.  

Ich muss sagen, **Hut ab vor NiceProject**, wie die Jungs in den letzten Jahren Gas gegeben haben. Allesamt RFCP-zertifiziert, aktive Contibutoren, WRobocon-Organisation, ... das sind wirklich bedeutsame Beiträge zu Robot Framework.

Ach ja, übrigens: 

- Hier im Blog findest Du auch ein Review der [Wrobocon 2025](http://localhost:1314/de/blog/wrobocon25-recap/).
- Die [WRobocon 2026](https://wrobocon.eu) findet statt am 8. Oktober. Wenn Du Lust hast, ein Thema beizusteuern, dann reich es doch einfach ein - der [Call for Papers](https://tally.so/r/3lPJlk) ist offen.

---

➛ Zurück zu [Teil 4 (Donnerstag: Konferenz Tag 1)]({{< ref "/robocon26-recap-4/" >}})  
➛ Weiter zu [Teil 6 (Freitag: Konferenz Tag 2)]({{< ref "/robocon26-recap-6/" >}})
