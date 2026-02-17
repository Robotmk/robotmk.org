---
draft: false
title: "Robocon 2026 - Recap (Teil 4)"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
commentid: robocon26-recap-4
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

Dies ist **Teil 4** der sechsteiligen Review der Robocon 2026 in Helsinki.

<!--more-->

---

➛ Zurück zu **[Teil 3]({{< ref "/robocon26-recap-3/" >}})**  
➛ Weiter zu **[Teil 5]({{< ref "/robocon26-recap-5/" >}})**

---

### Automation with Image Recognition Libraries

{{< portrait src="img/Helio2.png" alt="Hélio Guilherme" >}}

**Hélio Guilherme** ist eine Koryphäe auf dem Gebiet der bildbasierten Testautomation. Seit 2008 schon arbeitet er mit Robot Framework – zunächst bei Nokia Networks in Lissabon – und ist heute Lead Developer und Maintainer der Robot Framework-IDE [RIDE](https://github.com/robotframework/RIDE/) sowie Maintainer der [SikuliLibrary](https://marketsquare.github.io/robotframework-SikuliLibrary/).  
Mit einem Augenzwinkern beschreibt er sich selbst als jemanden, der nicht weiß, ob er "*ein Software Tester ist, der gerne Software Development macht, oder ein Software Developer, der gerne Software Testing macht*". 😉

Seine Session bot eine fundierte **vergleichende Analyse** zweier prominenter Image-Recognition-Libraries für Robot Framework: **SikuliLibrary** und **ImageHorizonLibrary**.  
Diese Libraries sind bei Desktop-Tests unverzichtbar, wenn API-Basierte Technologien nicht verfügbar sind – etwa bei Legacy-UIs oder RDP/Citrix-Verbindungen.

![alt text](img/talk-helio.png)

#### Sikuli

[SikuliLibrary](https://github.com/MarketSquare/robotframework-SikuliLibrary) basiert auf dem Java-Framework SikuliX und nutzt [Robot Framework Remote](https://github.com/robotframework/RemoteInterface), um Python-Funktionen mit den Java-Libraries zu verbinden.  
Ein wesentlicher Vorteil: Sie bietet **Optical Character Recognition (OCR)** – Texterkennung direkt aus Bildern.  

Der Workflow: Library importieren, *Server starten*, Pfad zu Referenzbildern definieren, Application Under Test (AUT) starten, Interaktionen durchführen (Maus, Tastatur, Bildabgleich, OCR), *Server stoppen*.  
Mit **78 Keywords** ist sie üppig ausgestattet. Der Haken: Man benötigt eine Java Runtime Environment im System. 

#### ImageHorizonLibrary

Die [ImageHorizonLibrary](https://github.com/eficode/robotframework-imagehorizonlibrary) hingegen setzt auf native Python-Module wie `pyautogui` und optional `opencv-python` für präzisere Bilderkennung (erlaubt dann auch einen prozuentalen "Similarity"-Wert).  
Sie ist schlanker – **34 Keywords** – und verzichtet auf OCR-Funktionalität.  
Der große Vorteil: Kein Java-Overhead, direkter Einsatz möglich. Der Workflow ähnelt dem der SikuliLibrary, nur ohne Server-Komponente.

#### Vergleich 

Beide Libraries sind **betriebssystemunabhängig**, erfordern aber konsistente Bildschirmauflösungen für reproduzierbare Tests.  

> *Anmerkung aus meiner Erfahrung: das primäre Problem bei der Bilderkennung ist nicht die **Auflösung**. Ein 80x30 Pixel großer Button hat diese Abmessungen auf einem 800x600px Display wie auf einem 4K-Display - es bleiben 80x30 Pixel.  
Viel mehr Einfluss auf die Teststabilität hat, wie die Anwendung ihr **Layout unter verschiedenen Auflösungen**, oder sagen wir besser, Platzbedingungen, ändert.  
Denn dann kann es sein, dass z.b. bestimmte Navigationselemente aus Platzgründen verborgen werden.*

Hélio betonte, dass die Wahl der Library vom konkreten Use Case abhängt: Braucht man Texterkennung aus Screenshots? Dann SikuliLibrary. Geht es um schlanke, rein Python-basierte Bildvergleiche? Dann ImageHorizonLibrary.

Ein kritischer Punkt, den Hélio ansprach: Die **Zukunft der SikuliLibrary** hängt vom zugrunde liegenden SikuliX-Projekt ab, dessen Maintainer die Entwicklung pausiert hat.  
Auch die vollständig in Python integrierte Version **sikulix4python**, die Autor Raimund Hocke entwickeln wollte, ist leider versandet. 

👉 **Fazit**  
Was mich besonders freute: Am Dienstag durfte ich **Jhoiss Baloi** kennenlernen, der die nicht mehr gewartete ImageHorizonLibrary **geforkt** und inzwischen auch **weiterentwickelt** hat.  
Er hat sogar meinen [Pull Request für Edge Detection](https://www.robotmk.org/en/blog/imagehorizon-edgedetection/) integriert und angekündigt, die Library unter neuem Namen zu veröffentlichen.  
Das ist eine großartige Nachricht für alle, die auf diese schlanke, Python-basierte Lösung setzen!  
Mir persönlich ist der Java-Unterbau der SikuliLibrary zu umfangreich, daher bin ich sehr froh über diese Entwicklung.


---

### Integrating Robot Framework in your business strategy

{{< portrait src="img/markus.png" alt="Markus Stahl" >}}

Markus Stahls Vortrag adressierte Herausforderungen, die viele Unternehmen kennen: 

- Wie lässt sich ein Open-Source-Tool wie Robot Framework in klassische Evaluierungsprozesse in Firmen integrieren?
- Vor allem, wenn es keine Firma dahinter gibt, die Enterprise-Support anbietet? 
- Wie mitigiert man die Risiken der Adoption eines freien Tools, dessen Ökosystem auf einer Vielzahl ebenfalls freier Projekte basiert?

Markus zeigte einen **fünfstufigen Plan**, der Unternehmen zeigt, wie sie Robot Framework nicht nur nutzen, sondern strategisch in ihr Geschäftsmodell integrieren können – und dabei gleichzeitig zum eigenen direkten Vorteil zum Ökosystem beitragen.

**Schritt 1: Das Projekt finanzieren (Fund it)**  

Oft schon sehr fürh stellt sich die Frage: *Wer bezahlt eigentlich für die Wartung und Weiterentwicklung von Robot Framework?*  
Markus erklärte, wie die [Robot Framework Foundation](https://robotframework.org/foundation/) arbeitet und wohin das Geld investiert wird – etwa zwei Drittel der Kosten für die Konferenz werden durch die Foundation getragen, der Rest durch die Tickets.  
Die Herausforderung: Unternehmen von einer Mitgliedschaft zu überzeugen ist nicht trivial. Traditionelle Mehrwerte wie SLAs oder Premium-Support fehlen. Zudem wird die Roadmap von der Community und dem Projektzweck definiert, nicht von zahlenden Mitgliedern. Das verstehen nicht alle "Entscheider".

**Schritt 2: Ein Tool/eine Erweiterung beisteuern (Contribute a Tool/Extension)**  

Irgendwann kommt der Punkt, an dem man selbst eine Erweiterung programmiert.  
Unternehmen können nützliche Tools, die sie für sich entwickelt haben, als Open Source veröffentlichen – prominente Beispiele sind [PlatynUI](https://github.com/imbus/platynui-sut), [RoboSAPiens](https://github.com/imbus/robotframework-robosapiens) oder [KeyTA](https://pypi.org/project/robotframework-keyta/1.0.10/).  
Das Risiko: Wenn mittel- und langfristig keine externen Contributors gefunden werden, muss das Unternehmen dauerhaft Ressourcen für ein Nicht-Kerngeschäft-Projekt binden. Beratungsunternehmen haben hier tendenziell einen größeren Anreiz.

**Schritt 3: Ein Feature beisteuern (Contribute a Feature)**  

Statt ein ganzes Tool zu entwickeln, kann man auch gezielt fehlende Funktionen in den RF-Core implementieren und als Pull Request einreichen.  
Ein Beispiel: Die **Deutsche Flugsicherung** hat das RobotFramework-Feature [custom test metadata](https://github.com/robotframework/robotframework/issues/4409) bezahlt und implementieren lassen.  
Solche Projekte eignen sich auch hervorragend zur Nachwuchsförderung – Junior-Entwickler sammeln wertvolle Erfahrungen mit Open Source.

**Schritt 4: Support anbieten (Offer Support)**  

Unternehmen können professionellen Support für Open-Source-Tools anbieten, von denen sie oder ihre Kunden abhängig sind.  
Die Leistungen können Tool-Mirroring und die Bereitstellung von Notfall-Fixes im Rahmen von SLAs umfassen.  
Diese Fixes sollten anschließend als Beitrag in das ursprüngliche Projekt zurückfließen.  
Markus betonte, dass hier die neuen Verordnungen wie **DORA** und **CRA** berücksichtigt werden sollten.

**Schritt 5: Offen darüber sein (Be open about it)**  

Der letzte, oft unterschätzte Schritt: **Offen kommunizieren**, dass man Open Source nutzt und unterstützt.  
Stolz auf die eigene Beteiligung zu sein, inspiriert andere und stärkt das Ökosystem.

Markus nutzte die Aufmerksamkeit am Ende seines Vortrags, um eine **neue Open-Source-Governance-Arbeitsgruppe** zu promoten, die die Expertise der Community sammeln und Empfehlungen für Robot Framework und Ökosystem-Projekte etablieren soll.

👉 **Fazit**  
Der Vortrag war eine **inspirierende Ermutigung** für alle, die ihren Arbeitgeber überzeugen möchten, mehr in Open Source zu investieren. Mit konkreten, praktikablen Wegen, wie das geschehen kann.  
Die Botschaft war klar: Es gibt mehr Möglichkeiten als nur "Sponsorship" oder "Freizeit opfern".

---

### Medusa: Resource-aware parallel suite execution made easy

**Edin Tarić**

Edins Session adressierte ein Problem, das viele Teams mit umfangreichen Testsuites kennen: **Wie parallelisiert man Tests effektiv, wenn Ressourcen-Konflikte drohen?**

**INSYS** ist Hersteller industrielle Router, deren Software tagtäglich auf den Devices getestet wird – **1500 Tests**, die sequenziell ausgeführt **bis zu 60 Stunden** dauern würden!  
Ein unhaltbarer Zustand bei täglichen Build-Inkrementen.  
Hier denkt man natürlich gleich an Parallelisierung mit [pabot](https://pabot.org/). Doch hier stieß das Team schnell an Grenzen.

![alt text](img/talk-medusa.png)

Das **Problem**: Viele der Testsuites benötigen nämlich exklusiven Zugriff auf spezifische Ressourcen – etwa ein bestimmtes Gerät im Netzwerk, einen bestimmten Port oder physische Ressourcen wie DSL-Verbindungen, die nicht mehrfach parallel genutzt werden können.  
Pabot mit manuell geschriebenen Ordering-Files wurde bei über 1000 Tests schnell unübersichtlich und ineffizient.  
Versuche, die Ordering-Datei zu automatisieren, scheiterten: Dynamisches Vermeiden von Ressourcen-Konflikten ist schlicht nicht das, wofür pabot designed wurde.

**Medusa** wurde explizit um die Idee von **Ressourcen-Abhängigkeiten** herum entwickelt.  

Jede Suite deklariert ihre Ressourcen-Abhängigkeiten als **Metadaten**, und Medusa bestimmt zur Laufzeit automatisch, welche Suites parallel starten können – das maximiert die Zeiteffizienz und vermeidet Konflikte.

Zusätzlich zu den Dependencies wird jede Suite einer **Stage** zugewiesen: Stages sind **sequenziell ausgeführte Gruppen**, innerhalb derer die Suites wie beschrieben parallel laufen.  
So behält man die nötige Kontrolle über die Reihenfolge, wo es darauf ankommt.

Suites können mehrfach auch mit **unterschiedlichen Variablen** ausgeführt werden – sogar mit unterschiedlichen Dependencies oder Stages.  
Das reduziert Code-Duplikation erheblich, wenn man eine Suite für mehrere Targets oder Varianten nutzen möchte.

Technisch funktioniert Medusa also als **Wrapper** um Robot Framework: Nahezu alle Robot-Optionen werden akzeptiert und an die Prozesse weitergereicht, die die einzelnen Suites ausführen.  
Das bedeutet: **Listener, Pre-Run-Modifiers** und andere Erweiterungen allesamt bleiben nutzbar.  
Am Ende nutzt Medusa `rebot`, um die Ergebnisse aller Suites nahtlos zusammenzuführen – selbst bei massiver Parallelisierung.

👉 **Fazit**:  

Perfect Timing, Medusa wurde rechtzeitig vor der RoboCon 2026 als Open Source veröffentlicht.  
Für alle, die mit großen Testsuites und Ressourcen-Konflikten kämpfen, könnte Medusa genau die Lösung sein, auf die sie gewartet haben.  
Ein pragmatischer Ansatz, der ein echtes Problem mit einer durchdachten Lösung gut adressiert. Ich fand das System sofort eingängig. 

---

### From Batter to Better: Pancakes as Testing

{{< portrait src="img/kelby.png" alt="Kelby Stine" >}}

{{< portrait src="img/elout.png" alt="Elout van Leeuwen" >}}

**Kelby Stine** und **Elout van Leeuwen** präsentierten eine der unterhaltsamsten Sessions der RoboCon 2026.  **Pfannkuchenbacken als Metapher für Testautomatisierung** – und machten damit abstrakte Konzepte auf erfrischende Weise greifbar.

Die Bühne war entsprechend vorbereitet: Ein Tisch mit Herdplatte, Pfanne, Zutaten – und beide Sprecher in Kochschürzen.  

Raunen im Publikum. 

*Was wird hier gleich passieren?*

![alt text](img/talk-pancakes.png)

Die Präsentation begann mit einem simplen Bekenntnis: 

Beide lieben **Pfannkuchen**.  

Und dann machten sie sich daran, die Teige dafür mit **zwei verschiedenen Rezepturen** zuzubereiten – jeder auf seine eigene Art.  
Die unterschiedlichen Zubereitungsweisen wurden parallel als **Robot-Framework-Pseudocode** auf der Leinwand dargestellt.  
Ein brillanter visueller Einfall, der die Parallelen deutlich machte.

> *Netherlands 🇳🇱 meets the US 🇺🇸 ... Ich persönlich war ja  mehr Fan von Elouts schlichtem Rezept – bis auf die ganze Hand voller Salz, die er theatralisch im Shceinwerferlicht staubend in den Teig schmiss 😅.  
Aber das war natürlich Teil der Show, denn auf der Bühne durfte aus Sicherheitsgründen ohnehin nicht tatsächlich gekocht werden, der Teig diente rein der Demonstration.*

Die **Kernidee** der Session: Es gibt strukturelle **Analogien** zwischen Kochrezepten und dem Keyword-Driven Ansatz von Robot Framework. Die Keywords beschrieben abstrak, was zu tun ist, und kapseln die ganzen Details, um die man sich als Tester/Pfannkuchenkoch nicht explizit kümmert.  

Sowohl beim Kochen als auch beim Testen sind **Zutaten** (Ingredients), **Umgebung** (Environment), **Setup** und **Arbeitsschritte** (cooking steps) zentral.  

Beide betonten: *"Make sure variables are OK. Otherwise it will break."* – eine Aussage, die natürlich für Teig wie für Code gleichermaßen gilt.  
(Gerade erst heute habe ich wieder selbst Brot gebacken und musste beim Teig kneten daran denken 😉)

Ein weiteres schönes Detail: **Pfannkuchen gibt es überall auf der Welt** – das repräsentiert die internationale Community.  
Es gibt kein Pfannkuchen-Rezept, der besser ist als ein anderes – genau wie es in der Automatisierung keine Lösung gibt, die für alle Szenarien die beste ist.  

Auch das **Toolset** variiert: Manche setzen auf Parallelisierung – visualisiert durch eine große Kochplatte mit vielen Pfannen.  
Andere bevorzugen sequenzielle Abläufe.  
Beides ist legitim, beides hat seinen Platz.

Dann zuletzt die Behandlung des Themas **Reporting**:  
*"HOW WOULD YOU LIKE YOUR TEST RESULTS SERVED?"*  
Auf der Leinwand erschienen verschiedene Anrichtvarianten von Pfannkuchen: mit Puderzucker, mit Sirup, mit Früchten, gestapelt oder einzeln.  
Die Botschaft war klar: Testergebnisse können auf viele verschiedene Arten aufbereitet und präsentiert werden – je nach Zielgruppe und Zweck.

Besonders witzig wurde es am Ende, als Fragen aus dem Publikum kamen - man merkte, wie sich die Fragen gegenseitig überboten:  

*"...When are you taking it to production?"*  
*"...Do you need acceptance testers?"*  

Und dann setzte **René Rohner** noch einen drauf: Er untersuchte kritisch den Tisch und meinte dann trocken:  

*"But it does not seem to be open source – there is no **fork**."*  😅


**Fazit:**  
Das Ganze war kurzweilig, unterhaltsam und gleichzeitig lehrreich.  
Die Session stellte heraus, was der **Mehrwert von Robot Framework ist**: Nämlich, dass es die Komplexität von Python abstrahiert und in eine **menschenlesbare Sprache** übersetzt.  

Eine wunderbare Art, ernste Konzepte mit Leichtigkeit zu vermitteln.


---

➛ Zurück zu [Teil 3]({{< ref "/robocon26-recap-3/" >}})  
➛ Weiter zu [Teil 5]({{< ref "/robocon26-recap-5/" >}})
