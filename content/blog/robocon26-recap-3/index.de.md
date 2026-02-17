---
draft: false
title: "Robocon 2026 - Recap (Teil 3)"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
commentid: robocon26-recap-3
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

Dies ist **Teil 3** der sechsteiligen Review der Robocon 2026 in Helsinki.

<!--more-->

---

➛ Zurück zu **[Teil 2]({{< ref "/robocon26-recap-2/" >}})**  
➛ Weiter zu **[Teil 4]({{< ref "/robocon26-recap-4/" >}})**

---

### Kann KI uns helfen, Bugs in Robot Framework schneller zu finden?

{{< portrait src="img/fabian.png" alt="Fabian Streitel" >}}

**Fabian Streitel** berät seit über zehn Jahren seine Kunden im Bereich der Testautomatisierung. Er präsentierte einen faszinierenden Ansatz für ein Problem, das viele Teams mit großen Testsuites kennen: Wie kann man **möglichst schnelles Feedback** liefern, wenn die vollständige **Testausführung Stunden oder gar Tage** dauert?

Die Kernidee seiner Präsentation: satt die gesamte Testsuite zu durchlaufen, clustert man Tests und wählt die zur Ausführung aus, die in einem vektorbasierten Raum möglichst weit voneinander entfernt sind - quasi ein "intelligenter Smoke-Test" 😉  

![alt text](img/talk-3d.gif)

Auf diese Weise wird verhindert, dass die Testroutinen wiederholt redundante Pfade im Code durchlaufen, während andere Bereiche noch ungetestet bleiben.

Fabian zeigte, wie er mittels sogenanntem **Mutation Testing** gezielt hunderte von Bugs in den Robot-Framework-Quellcode (als Testkaninchen) eingebracht hatte – ein kontrollierbares Testszenario, um die Effektivität seines Ansatzes zu beweisen.  


---

### Traceable Automation in Space Projects

{{< portrait src="img/bruno.png" alt="Bruno Néstor Calvo Chevillat" >}}

{{< portrait src="img/jose.png" alt="José María Martín Blázquez" >}}

Allein der Titel verfing schon bei mir! 🪝 😅  

In einem hochregulierten Umfeld, wo jeder Fehler katastrophale Folgen haben kann, gelten Anforderungen an Testautomatisierung, die weit über typische Web- oder App-Szenarien hinausgehen.

![alt text](img/talk-gmv.png)

Bruno und José zeigten, wie sie Robot Framework als zentrales Element ihrer Testautomatisierung etabliert haben, eng verzahnt mit Requirements-Management-Tools wie **IBM DOORS**.  

Die Herausforderung bestand darin, eine **bidirektionale Synchronisation** zwischen Anforderungsdefinitionen, Testprozeduren und deren Implementierung zu schaffen. So kann jeder einzelne automatisierte Testfall direkt auf eine spezifische Anforderung zurückverfolgt werden – eine **durchgängige Kette der Nachvollziehbarkeit**, wie sie in derart sicherheitskritischen Systemen wie der Raumfahrt zwingend erforderlich ist.

Die Präsentation beleuchtete dabei nicht nur die technische Integration, sondern auch die organisatorischen Konventionen, die in einem solchen Umfeld natürlich unverzichtbar sind.  
Glücklicherweise erfüllt Robot Framework die regulatorischen Standards und strikten Vorgaben der Luft- und Raumfahrtbranche für Dokumentation, Tagging und Reporting.  

Die Sprecher teilten auch offen ihre **Lessons Learned** – von Fallstricken bis zu konkreten Empfehlungen für andere, die Automatisierung in regulierten oder sicherheitskritischen Industrien einführen möchten. Es war deutlich zu spüren, dass die beiden aus jahrelanger Erfahrung berichteten. 

👉 **Fazit**: Der Vortrag machte klar, dass die Einfachheit und Erweiterbarkeit von Robot Framework keineswegs auf einfache Szenarien beschränkt ist – im Gegenteil.  
Mit der richtigen Disziplin und einem durchdachten Framework lässt sich mit Robot Framework auch in den anspruchsvollsten technischen Umgebungen eine robuste, nachvollziehbare Automatisierung aufbauen. Selten bekommt man Einblick in derart sensible, hochsichere Bereiche. 

---

### Keyword-Driven Performance Testing Without Manual Scripting

{{< portrait src="img/rakan.png" alt="Rakan Alrasheed" >}}

{{< portrait src="img/abdulelah.png" alt="Abdulelah Alharabi" >}}

Die beiden Sprecher präsentierten eine innovative Architektur, die ein häufig übersehenes Problem adressiert: die Trennung zwischen funktionalen Tests und Performance-Tests. Ihr Ansatz eliminiert diese Lücke, indem er Robot Framework als **"Source of Truth"** für beide Testszenarien etabliert.

Die Kernidee: Funktionale Testszenarien, die bereits in Robot Framework definiert sind, werden automatisch in [Locust](https://locust.io)-Skripte übersetzt – ein leistungsstarkes, Python-basiertes Load-Testing-Tool.  
Was normalerweise manuelles Scripting und spezialisiertes Wissen erfordert, wird hier durch ein keyword-basiertes, intent-getriebenes System ersetzt.

Der Vortrag machte deutlich, dass die Wiederverwendbarkeit von Testdefinitionen ein oft unterschätzter Hebel ist.  
Wenn Teams ihre funktionalen Tests als Grundlage für Performance-Tests nutzen können, entsteht nicht nur Effizienz – es entsteht auch eine engere Verzahnung zwischen Qualitätssicherung und Performance-Engineering - in modernen Entwicklungszyklen unverzichtbar.

---

### Automated Accessibility for "Very Busy" Teams


{{< portrait src="img/lalit.png" alt="Lalitkumar Bhamare" >}}

{{< portrait src="img/affaf.png" alt="Affaf Malik" >}}

**Über 90%** (!) der eine Million meistbesuchten Websites weisen **Accessibility-Probleme** auf.  
Das stellt nicht nur ein technisches, sondern auch ein geschäftliches, rechtliches und ethisches Problem dar: Nutzer, die auf assistive Technologien angewiesen sind, stoßen täglich auf Barrieren.   

Das liegt nicht einmal daran, dass Teams das Thema "Accessibility" unbedingt ignorieren wollen. Sondern weil sie schlicht nicht die Kapazität, das Budget oder auch manchmal das spezialisierte Wissen haben, um umfassende manuelle Tests dafür durchzuführen.

Affaf und Lalitkumar zeigten eine **"Shift-Left"-Strategie** auf (wobei "left" = "früher"), die Accessibility-Testing **ganz vorn** im Entwicklungszyklus verankert.  
In ihrem Ansatz gliedert sich das in drei Ebenen:

- Auf **Entwicklungsebene** können Probleme bereits erkannt werden, bevor überhaupt automatisierte Tests geschrieben werden. Verstöße wie etwa fehlende "alt"-Texte oder inkorrekte ARIA-Attribute können die Entwickler direkt beim Coding erkennen und korrigieren. 
- Auf **Testebene** integriert Robot Framework Tools wie [axe-core](https://github.com/dequelabs/axe-core) und  nahtlos in funktionale und Regressionstests. Accessibility-Checks sollen damit Teil des täglichen Testings werden. – ohne zusätzlichen manuellen Aufwand.
- Auf **Prozessebene** werden die Tests in CI/CD-Pipelines eingebunden. Erkannte Issues können automatisch getrackt und mit Development-Tasks verknüpft werden, sodass kontinuierliche Validierung stattfindet und Regressionen vor dem Deployment verhindert werden.

Die zentrale Botschaft der Session war klar: Accessibility-Automatisierung ist nicht nur ein Werkzeug zum Aufspüren von Verstößen – sie verdient ein **nachhaltiges System**, in dem Technologie aktiv Diversität und Nutzbarkeit unterstützt.  

Aber auch die Kehrseite beleuchteten die beiden: "*accessibility can backfire*", wenn sie falsch implementiert wird oder wenn automatisierte Checks ein falsches Sicherheitsgefühl vermitteln, ohne die tatsächliche Nutzererfahrung zu berücksichtigen.  
Allzu leichtfertig wird das Thema nämlich einfach nur abgehakt - und Jahre später kann sich kaum einmal mehr jemand an die Rahmenbedingungen erinnern. 

---

➛ Zurück zu [Teil 2]({{< ref "/robocon26-recap-2/" >}})  
➛ Weiter zu [Teil 4]({{< ref "/robocon26-recap-4/" >}})
