---
draft: false
title: "RoboCon 2025 Helsinki Recap"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
commentid: robocon25-recap
# -- predefined URL
# slug: 
# -- for posts in menubar, use this (shorter) title
# menutitle: 
description: null
date: "2025-02-15T11:00:23+02:00"
categories:
  - news
tags:
  - "robocon"
authorbox: true
sidebar: true
pager: false
thumbnail: "img/robocon.png"
---

Die **RoboCon 2025** liegt hinter mir – vier Tage voller **spannender Vorträge, inspirierender Gespräche und neuer Impulse**.  
Jetzt, zurück zu Hause, sortiere ich meine Eindrücke – und davon gibt es reichlich!  

Diese Konferenz ist für mich jedes Jahr etwas Besonderes: Nirgendwo sonst erlebe ich eine Community, die so offen **teilt**, gemeinsam **diskutiert** und neue **Ideen vorantreibt**.  

In diesem Artikel möchte ich meine persönlichen **Highlights** mit euch teilen – die Vorträge, die bei mir besonders nachgewirkt haben, und die Themen, die ich definitiv weiterverfolgen werde. 

<!--more-->


(Möge mir daher bitte niemand übel nehmen, wenn ich einige Sessions auslasse oder unterschiedlich ausführlich behandle. Es sind einfach zu viele Eindrücke für einen Artikel!)  

Und jetzt: Bühne frei für meine **RoboCon-Highlights**!  

---


## Make Automation Green Again - Experiments with AI supported self-healing

*(Many Kasihira)*

Many zeigte anhand einer simplen To-do-App einen Web-Test, den er nach dem ersten erfolgreichen Durchlauf „sabotierte“, indem er Selektoren veränderte – der Test schlug fehl.  
Damit war der **Bogen** für den Vortrag gespannt: 

**Wie kann Robot Framework mithilfe von AI selbstständig zu einer Lösung finden?**  

Dem voraus geht natürlich die Frage, warum man diesen Aufwand überhaupt betreiben sollte.  
Many hat das gut herausgearbeitet: Bereits das Lösen „einfacher“ Probleme kann viel Zeit kosten:  

- Den Test lokal ausführen und debuggen  
- Herausfinden, warum ein Selektor nicht mehr matched  
- Einen neuen Selektor ermitteln  
- Änderungen committen und pushen  
- Den Test neu deployen  

Solche repetitive Arbeit ist lästig. **Warum also nicht Hilfe von einer AI holen?**


{{< figure src="img/many.jpeg" title="Many Kasihira: 'Make Automation Green Again - Experiments with AI supported self-healing'" >}}



Er knüpfte dabei an einen Talk von Pekka Klärck aus dem Jahr 2024 im Open Space an, in dem dieser die Änderungen im Robot Framework Listener vorstellte.  

**Info**: Ein **Listener** ist vereinfacht gesagt ein Stück Python-Code, das die Ausführung von Robot-Framework-Tests „begleitet“ und an bestimmten „Hooks“ angesetzt werden kann. Immer wenn ein solcher „Hook“ passiert (z. B. `start_test`, `end_keyword`, `end_suite`), darf sich der Listener „dazwischenschalten“ und den für diesen Hook geschriebenen Python-Code ausführen.  

**Manys Idee**: Den `end_keyword`-Hook für fehlschlagende Keywords zu nutzen, um:  

- den Quellcode der aktuellen Seite auszulesen,  
- eine AI zu verwenden, um den defekten Selektor reparieren zu lassen,  
- das Keyword mit dem reparierten Selektor erneut auszuführen.  

Klingt erst mal simpel – und Many hatte nach eigener Schilderung auch schnell einen ersten Prototypen. 

Doch bald traten weitere Herausforderungen auf:  

- ⚡️ **Shadow-DOM-Elemente:** Diese sind im ursprünglichen Seitenquelltext nicht enthalten.  
Many schrieb einen JavaScript-Handler, der diese Elemente nachlädt und das vollständige DOM rekonstruiert.  
- ⚡️ **Relevanter Kontext für die AI:** Die AI gerät ins Schleudern, wenn der als Kontext übergebene Seitenquelltext zu umfangreich ist.  
Many entwickelte eine Filterfunktion, um irrelevante Bestandteile wie Grafiken, JavaScript-Code, Header/Footer etc. herauszufiltern. (Seine Anekdote zu „Edgar mit den Scherenhänden“ brachte mich zum Lachen!)  
- ⚡️ **Qualität der generierten Selektoren:** Anfangs erzeugte die AI zwar funktionierende, aber extrem komplexe und fragile Selektoren. Der Mehrwert der Selbstheilung wäre verloren, wenn stabile Selektoren wie `div.summary > a#contact` durch lange, fehleranfällige Konstrukte ersetzt würden.  

Im überarbeiteten Ansatz ergänzte Many die von der AI ermittelten Selektoren um zusätzliche Vorschläge, die er lokal mit `BeautifulSoup` (einem Python-Paket zum Parsen von HTML) erzeugt.  
Diese alternativen Selektoren reichert er mit hilfreichen Kontextinformationen wie Parent-Tags oder dem Text des nächsten Sibling-Elements an.  

Der an die AI übergebene **Kontext ist dadurch präziser auf das Problem zugeschnitten**:  

- Name des fehlgeschlagenen Keywords  
- Fehlermeldung des Keywords  
- Fehlerhafter Selektor  
- Liste der per AI und BeautifulSoup ermittelten alternativen Selektoren  

Die Aufgabe der AI ist es dann "nur noch", diese Vorschläge gegeneinander abzuwägen und den besten Selektor zurückzuliefern, mit dem das Keyword erneut ausgeführt wird.  

Manys Library `robotframework-heal` befindet sich zwar noch in einem frühen Stadium, wirkt aber bereits vielversprechend.  

Wichtig zu erwähnen: Die Selbstheilung ist derzeit **nicht persistent**.  
Das bedeutet, dass der fehlerhafte Selektor zwar zur Laufzeit korrigiert wird, aber nicht im Testfall gespeichert wird. 
Bei jedem Testlauf würde das Keyword also erneut fehlschlagen und von der AI repariert werden.  

Trotzdem bin ich sicher, dass Many mit diesem Proof of Concept einen Funken gezündet hat, der weitere Innovationen im Bereich „Selbstheilung mit AI“ auslösen wird.  

Manys Vorträge sind praxisnah und extrem lehrreich. Am Ende des Artikels findet sich eine Liste mit Links zu weiteren seiner Vorträge.  

**Links:**

- [robotframework-heal](https://github.com/manykarim/robotframework-heal)
- Master Thesis: [Enabling Self-healing Locators for Robot Framework with Large Language Models](https://helda.helsinki.fi/server/api/core/bitstreams/631b961a-8642-42ed-9826-3e196eac9cf7/content)


---


## Appium Self-healing for RobotFramework AppiumLibrary

*Eslam Elmishtawy/Mohamed Sedky*

Direkt im Anschluss an Manys Vortrag präsentierten **Eslam Elmishtawy und Mohamed Sedky** einen ähnlichen Ansatz, um AI-gestützte Selbstheilung im Bereich des mobilen Testens zu implementieren.  

Im Gegensatz zu Manys Lösung handelt es sich hierbei nicht um eine separate Library, sondern um eine Erweiterung der **AppiumLibrary**.  
(Unklar blieb mir die Rolle der Datenbank, in der die von der AI reparierten Selektoren gespeichert werden. Falls jemand hierzu mehr Informationen hat, freue ich mich über Hinweise in den Kommentaren.)

{{< figure src="img/appium.jpeg" title="Eslam Elmishtawy/Mohamed Sedky: 'Appium Self-healing for RobotFramework AppiumLibrary'" >}}

Am Ende ihres Vortrages betonten die beiden, dass ihre Implementierung derzeit noch nicht offiziell verfügbar ist. 
Sie existiert momentan als **Pull Request (PR)** für die **AppiumLibrary**.  

Ich wünsche den beiden, dass ihr PR in die **AppiumLibrary** integriert werden kann.  

---


## Optimizing Mobile Testing using AppiumLibrary

*Gabriela Simion / Felix Doppel*

Felix Doppel und Gabriela Simion präsentierten ihren Weg zur erfolgreichen Implementierung einer Testpipeline für die **„Telematik App“ der HUK-Coburg**.  
Sie gaben einen spannenden Einblick in die **Herausforderungen und Lösungsansätze** aus ihrer Praxis.  

Dazu zählten:  

- Die stetig steigende Anzahl unterschiedlicher Mobile-Devices:  
  - ❓ Wie bleibt die Testinfrastruktur skalierbar, um Android- und iOS-Geräte gleichermaßen abzudecken?  
  - ❓ Wie verhindert man, dass Regressionstests unkontrolliert anwachsen?  
- Die Kombination fachlicher und technischer Tests in einer einheitlichen Pipeline.  
- Die Integration komplexer Testanforderungen in einen agilen Entwicklungsprozess.  


{{< figure src="img/appium.jpeg" title="Gabriela Simion / Felix Doppel: 'Optimizing Mobile Testing using AppiumLibrary'" >}}

Zunächst setzten die beiden auf **Cucumber und Gherkin**, da diese Tools bei der HUK bereits im Einsatz waren. 
Doch schnell zeigte sich, dass dieser Ansatz ihre speziellen Anforderungen nicht erfüllte.  

Durch ihr „*erfolgreiches Scheitern*“ lernten sie, ihre eigenen Erwartungen klarer zu definieren und zu priorisieren.  
Diese Erfahrungen führten schließlich zur Entscheidung für **Robot Framework**, das sich deutlich gegen die anderen geprüften Tools durchsetzte.  

**Die HUK entschied sich für Robot Framework**, weil:  

- Der **Keyword-Driven-Ansatz** eine saubere Trennung zwischen plattformspezifischen Funktionen und Testlogik ermöglicht.  
- Die **flexible API** eine einfache Integration in andere Tools erlaubt. Konkret werden die Testergebnisse bei der HUK-Coburg an das cloudbasierte Testreporting-Tool **Sauce Labs** übermittelt.  

Besonders wertvoll waren die folgenden Erkenntnisse der beiden aus dem Projekt:  

- **Stakeholder frühzeitig einbinden:** Eine breite Abstimmung von Anfang an erleichtert die reibungslose Einführung.  
- **Grenzen der Testautomatisierung kennen:** Manuelle Tests bleiben wichtig, wenn der Aufwand für eine Automatisierung unverhältnismäßig hoch wäre.  
- **Testautomatisierung ist ein Marathon, kein Sprint:** Erfolgreiche Testautomatisierung erfordert langfristige Pflege und kontinuierliche Weiterentwicklung.  
- **Wartung ist entscheidend:** Der Erfolg von Testautomatisierung steht und fällt mit der konsequenten Pflege und Anpassung der Testfälle über die gesamte Laufzeit hinweg.  


---


## Dear AI, Which Tests should Robot Framework Execute Now?

(*Elmar Jürgens*)

**Elmar Jürgens** stellte in seinem Vortrag einen spannenden Ansatz vor, um Testzeiten zu verkürzen und schneller neue Bugs zu finden. 

**Das Problem**: Zu viele redundante Tests führen zu langen Laufzeiten, ohne die Fehlersuche effizienter zu machen.  
Gerade in großen Test-Suites wächst die Zahl der Testfälle oft schneller als ihr tatsächlicher Mehrwert für die Qualitätssicherung.  

{{< figure src="img/elmar.jpeg" title="Elmar Jürgens: 'Dear AI, Which Tests should Robot Framework Execute Now?'" >}}

Sein Ansatz basiert auf dem **Dissimilarity-Prinzip**, einer Methode zur gezielten Auswahl von Tests, die möglichst viele unterschiedliche Bereiche des Codes abdecken.  
Anstatt immer *alle* Tests auszuführen, werden nur diejenigen ausgeführt, die den **größten potenziellen Erkenntnisgewinn** bringen.  

Konkret werden die Tests in einem **Vektorraum** angeordnet, der ihre Testabdeckung repräsentiert.  
Jeder Test wird durch einen Vektor dargestellt, der beschreibt, welche Codebereiche er abdeckt.   
Nach jedem ausgeführten Test wird der nächste Test anhand der **maximalen Distanz** zum bisher getesteten Vektor ausgewählt. So entsteht ein **breites Abdeckungsmuster**, das sich von Durchlauf zu Durchlauf systematisch ausdehnt – und das, ohne alle Tests ausführen zu müssen.  

Das Verfahren bringt gleich mehrere Vorteile:  

- **Reduzierte Laufzeiten:** Die Gesamtzahl der ausgeführten Tests sinkt, ohne die Fehlersuche zu beeinträchtigen.  
- **Effizienzgewinn:** Die Testabdeckung steigt, da Tests gezielt auf unterschiedliche Bereiche des Codes abzielen.  
- **Schnellere Rückmeldungen:** Gerade in Continuous-Integration-Pipelines liefert das Verfahren schnellere Ergebnisse.  

Elmar betonte, dass dieser Ansatz vor allem dann seine Stärken ausspielt, wenn Test-Suites sehr groß werden und lange Laufzeiten die Entwicklungszyklen ausbremsen.  
Sein Fazit: Durch die clevere Auswahl von Tests nach dem Dissimilarity-Prinzip lassen sich **Testzeiten spürbar verkürzen**, ohne an **Qualität in der Fehlersuche** zu verlieren.  



---

## Utilizing RF Swarm to Execute Performance Testing on PostgreSQL Database Upgrade

*(Omoghomion Oredia)*

Im Vortrag von Omoghomion ging es darum, wie eine reibungslose Datenbankmigration auf **PostgreSQL 15.4** gelingen kann, ohne Performance-Einbußen oder unerwartete Probleme.  

Die **zentrale Frage** lautete: Wie stellt man sicher, dass sich eine PostgreSQL-Datenbank nach dem Update von Version 11 auf 14 mindestens so performant verhält wie zuvor?  

Diese Herausforderung musste Omoghomion angehen, als Amazon ankündigte, die Unterstützung für PostgreSQL 11 ab dem 29. Februar 2024 einzustellen.  
Ein Weiterbetrieb hätte hohe Sicherheitsrisiken und mögliche Compliance-Probleme bedeutet.  

{{< figure src="img/omo.jpeg" title="Omoghomion Oredia: 'Utilizing RF Swarm to Execute Performance Testing on PostgreSQL Database Upgrade'" >}}

Zur Durchführung der Performance-Tests kam **RFSwarm** zum Einsatz.  
Dieses Tool dient der **parallelen Ausführung von Robot-Framework-Suites** und eignet sich daher hervorragend, um eine definierte Last – die im Suite-File festgelegten Aktionen – **x-fach gleichzeitig** auf das System zu bringen.  

Zunächst wurden unter Version 11 mit realistischer Last die Basiswerte (Baseline) ermittelt:  

- CPU-Auslastung  
- Lese-Latenz  
- Freier Arbeitsspeicher  

Nach dem Upgrade auf Version 14 wurden die Tests erneut ausgeführt – mit einem **erfreulichen Ergebnis**:  

- Verbesserte Abfrageeffizienz bei komplexen Abfragen  
- Leichter Rückgang der CPU-Auslastung  
- Stabile Lese-Latenz („Konsistenz ist entscheidend“)  
- Keine nennenswerten Speicherprobleme  

Trotz des „Happy Ends“ zeigt diese Erfolgsgeschichte, wie wichtig dieses Vorgehen war: Ohne das vorab durchgeführte **Baselining** wäre es unmöglich gewesen, die Performance nach dem Update zu bewerten.  

Zur Rolle von **Robot Framework**: Dank RFSwarm konnte das gesamte Anwendungsspektrum von Robot Framework genutzt werden, um durch parallele Testausführung eine realitätsnahe Lastsimulation zu erreichen. Genau diese Kombination aus **Lasttests** und **Baseline-Analyse** machte die Migration messbar – und damit bewertbar.  



---

## Robot Framework to the Rescue: Replacing EggPlant with a Custom UI-Test Library

*(Rico Feist / Lisa Böttinger)*

In diesem Vortrag stellten Rico Feist (Testautomation Team Lead bei der Deutschen Bahn) und Lisa Böttinger (imbus AG) die brandneue – noch nicht offiziell veröffentlichte – **PlatynUI-Library** zur **Automatisierung von Desktop-Anwendungen** vor.  

Bisher setzte das Team für Desktop-Tests auf eine Library, die das kommerzielle (und extrem teure!) Tool **EggPlant** über eine Wrapper-Lösung in Robot Framework integrierte.  

{{< figure src="img/platyn.jpeg" title="Lisa Böttinger, Rico Feist: PlatynUI Library" >}}

### Vorteile und Nachteile des bildpattern-basierten Testens  

Rico hob zunächst die **Vorteile** des bildpattern-basierten Testens hervor. Hierbei werden die zu klickenden Bereiche durch einen Bildvergleich zuvor aufgenommener Screenshots mit dem Desktop ermittelt:  

- Non-invasive: Die Anwendung muss nicht modifiziert werden.  
- Technologieunabhängig: Funktioniert auch mit Legacy-Software (laut Rico hatte er noch keinen Fall, bei dem dieser Ansatz nicht möglich gewesen wäre).  
- Plattformübergreifend: Windows, Mac, Linux – alles möglich.  

Allerdings gibt es auch gravierende **Nachteile**:  

- Agnostisches Verhalten: Da die Library den Anwendungszustand nicht kennt, entstehen "Zombie-Klicks" auf inaktive Komponenten.  
- Fokusprobleme: Fenster werden inaktiv, Eingaben gehen ins Nirvana, überlagerte Fenster bleiben unerkannt.  
- Schwierigkeiten bei RDP- und Citrix-Verbindungen: Bildartefakte können die Erkennung massiv stören.  
- Aufwendiges Fehler-Handling: Lange Wartezeiten erfordern Sleeps, Schleifen und manuelle Assertions.  

### Features: Robot Framework First  

Dank **Daniel Biehl** (imbus AG) konnte das Team eine komplett neue Library entwickeln: **PlatynUI**.  
Im Gegensatz zu Lösungen wie **Sikuli, EggPlant oder Ranorex** wurde PlatynUI von Anfang an mit einem "*Robot Framework First*"-Ansatz geschrieben.  
Ein großartiger Schritt!  

Die wichtigsten Ziele und Funktionen von PlatynUI zusammengefasst:  

- **Cross-Platform**: Unterstützung für Windows, Mac und Linux.  
- Keine „Zombie-Klicks“: Klicks erfolgen nur, wenn das Element tatsächlich anklickbar ist – ähnlich den Precondition-Checks der BrowserLibrary.  
- **State Awareness**: PlatynUI prüft mit internen Assertions, ob z. B. eine Klick-Aktion auf einer Komponente überhaupt möglich ist.  
- **Universell**: Möglichst universell einsetzbare Keywords, ohne Bindung an bestimmte Komponententypen.  
- **Gezielte Komponentenansprache**: Nutzung der Windows UI Automation API – unabhängig vom visuellen Erscheinungsbild der Anwendung.  
- **Spy-Tool**: PlatynUI bringt ein eigenes Tool mit, um XPath-Selektoren schnell und einfach zu erstellen.  
- **Open Source**: Die Library wird frei verfügbar sein.  

### Objektorientierung First  

Ein besonderes Feature möchte ich hervorheben: PlatynUI ermöglicht es, Applikationsfenster und deren Inhalte mit Python-Klassen zu beschreiben.  
Das bietet gleich zwei Vorteile:  

- Bessere **Lesbarkeit**: Der Zugriff wird intuitiver ("Ciao, XPath!").  
- Bessere **Performance**: Windows muss nur noch einen Teilbaum der Fensterhandles durchsuchen. Das beschleunigt besonders den Fensterwechsel.  

### Erweiterbarkeit  

Die Architektur von PlatynUI ist so aufgebaut, dass sie zukünftig um weitere Erkennungsmechanismen ergänzt werden kann – beispielsweise:  

- Bilderkennung (ähnlich Sikuli oder ImageHorizonLibrary) als Fallback, wenn die UI Automation API versagt.  
- (Vielleicht?) Edge-Detection: Eine Technik, die ich 2023 selbst auf der RoboCon im Zusammenhang mit ImageHorizonLibrary vorgestellt habe.  

**Warum ist das wichtig?** Weil reine API-basierte Ansätze ihre Grenzen haben:  

- Ältere Applikationen bieten oft keine vollständige Abdeckung mit Automation-IDs.  
- Manche Legacy-Systeme unterstützen *überhaupt keine Erkennung über UIA.  
- Citrix- oder RDP-Sitzungen: Hier bleibt Bildmustererkennung die einzige zuverlässige Lösung.  

### Mein Fazit: PlatynUI hat enormes Potenzial 🧨

PlatynUI verfolgt genau den richtigen Ansatz: "**Robot Framework First**", erweiterbar und offen für verschiedene Testmethoden.  
Besonders gefällt mir die **offene Architektur**, die Raum für zukünftige Erweiterungen wie Bilderkennung lässt – ein echtes Alleinstellungsmerkmal gegenüber bestehenden Lösungen.  

Ich werde die Entwicklung von PlatynUI genau verfolgen und meine Erfahrungen und Testergebnisse hier mit euch teilen.  

{{< figure src="img/platyn.gif" title="Live-Demo: PlatynUI bei der Steuerung von KeePass" >}}

---

## Deep Dive into Robot Framework Core: Updates and Future Directions

*(Pekka Klärck)*

**Pekka Klärck** (Erfinder und Hauptentwickler von Robot Framework) stellte in seinem Vortrag die neuesten Entwicklungen in Version 7.2 vor und gab einen Ausblick auf die zukünftigen Pläne.  

Ein wichtiger Meilenstein ist die Einführung des **JSON-Outputs**, der ab Version 7.2 zusätzlich zum bisherigen XML-Format zur Verfügung steht.  
(Entgegen seiner Erwartung ist JSON in der Regel nicht wirklich kompakter. Aber es kann Vorteile bieten für Integrationen, die dieses Format bevorzugen bzw. voraussetzen.)  

Ebenfalls neu ist die `GROUP`-Syntax, mit der sich Keywords – nun ja – zu Gruppen zusammenfassen lassen.  
Gruppen verhalten sich ähnlich wie User Keywords und sind vor allem für die programmgesteuerte Erstellung von Testfällen interessant.  
Gruppen können benannt werden und lassen sich somit mit semantischen Bedeutungen versehen, was sie für spezielle Anwendungsfälle nützlich macht.  

{{< figure src="img/pekka.jpeg" title="Pekka Klärck: 'Robot Framework Core: Updates and Future Directions'" >}}

Für die kommende **Version 7.3** befindet sich Pekka bereits in der Planungsphase. Einige Punkte wurden bereits im Rahmen des **Community Days** am Dienstag besprochen.  

Ein zentrales Projekt ist die vollständige Überarbeitung des **User Guides**.  
Dieser wird künftig in einer neu strukturierten Form als **"Robot Framework Manual"** veröffentlicht. Ein Glossar sowie die Integration der API-Dokumentation sollen das Manual abrunden.  


Pekka schließt seinen Talk traditionell immer mit der Vorstellung von Entwicklungen rund um das Robot-Framework-Ökosystem – hier nur einige davon:  

- **RobotCode** hat nun den Ritterschlag als offizielle Robot-Framework-Extension für **VS Code** erhalten – und ist seit neuestem auch für **PyCharm** verfügbar.  
- **Construct**, eine Entwicklung von Franz Haas, erleichtert das Arbeiten mit Binärdaten.  
- **RobotDashboard**, geschrieben von Tim de Groot, ermöglicht es, Testergebnisse übersichtlich in Dashboards darzustellen.  
- und viele mehr. 

**Mein Takeaway:** Hier zeigt sich einmal mehr, wie stark die Community zusammenarbeitet, welche kreativen Ideen entstehen und wie Projekte durch die Unterstützung der **Foundation** gefördert werden.  

Auch wenn mein Beitrag als Mitglied der Foundation nur ein kleiner Baustein ist, freue ich mich zu sehen, dass durch die Mitgliedsbeiträge Projekte wie diese eine **Anschubfinanzierung** erhalten und so Innovationen im **Robot-Framework-Ökosystem** vorangetrieben werden.  


---

## Redefining Automation with Robot F/W: Harnessing AI, LLMs, and Custom Libraries for Next-Gen Testing

*(Siddhant Sunil Wadhwani)*

**Siddhant Sunil Wadhwani** feierte mit seinem Vortrag sein **100. Bühnen- und Vortragsjubiläum**. Er ist auf **AI-Themen** spezialisiert und widmete sich in seinem Vortrag den vielfältigen **Möglichkeiten und Ansätzen zur Anwendung von AI in Robot Framework**.  

{{< figure src="img/siddhant.jpeg" title="Siddhant Sunil Wadhwani: 'Harnessing AI, LLMs, and Custom Libraries for Next-Gen Testing'" >}}

In seiner **Live-Demo** zeigte Siddhant eine Auswahl wichtiger Tools und Technologien, die den Einsatz von AI in Robot Framework konkret machen:  

- **Healenium:** Ein Projekt zur Implementierung selbstheilender Testfälle  
- **GitHub Copilot:** Unterstützung bei der Skripterstellung durch KI-gestützte Vorschläge  
- **Gemini Code Assist:** Optimierung und Verbesserung bestehender Tests  
- **OpenAI API / LLMs:** Dynamische Generierung von Testfällen und Testdaten  
- **Eigene AI-Bibliotheken:** Erweiterung von Robot Framework um AI-Funktionalitäten  

Zum Abschluss ging Siddhant auf die Herausforderungen ein, die bei der Integration von AI in Testautomatisierungsprozesse entstehen – von der Komplexität der Implementierung bis hin zur Qualität und Stabilität der generierten Tests.  

Sein Vortrag bot einen umfassenden Einblick in die Potenziale von AI für die Testautomatisierung mit Robot Framework und zeigte praxisnah, wie diese Technologien die Effizienz und Qualität automatisierter Tests steigern können.  



---

## Infrastructure as code - Yet another super power for your test automation

*(Nils Balkow-Tychsen)*

Nils Balkow-Tychsen stellte in seinem Vortrag vor, wie sich mit **Infrastructure as Code** (IaC) Testumgebungen direkt aus Testautomatisierungsskripten verwalten lassen. 

Im Fokus stand seine neue **Robot Framework Terraform Library** (Lnk siehe unten), die sowohl **Terraform** als auch dessen **Open-Source-Fork OpenTofu** in Robot Framework integriert.  

Hintergrund: Terraform ist seit der Übernahme durch IBM **nicht mehr Open Source**. Dies führte zur Entstehung des Open-Source-Forks **OpenTofu**. 

**Wozu ist das gut?**  

Seine Library eröffnet **neue Möglichkeiten** für das Testmanagement: Ein häufiges Problem bei Testinfrastrukturen ist, dass sie **einmalig eingerichtet** werden und sich dann allmählich vom Sollzustand entfernen.  
Mit einem Infrastructure-as-Code-Ansatz kann die gleiche Testumgebung **immer wieder identisch aufgebaut** werden – und das ohne manuellen Aufwand.  

Dies erhöht die Verlässlichkeit der Testergebnisse enorm, gleichzeitig werden erhebliche Kosten gespart, da keine langlaufenden, ungenutzten Umgebungen bestehen bleiben.  

(Einschränkend muss man natürlich erwähnen, dass das Erstellen einer komplexen Infrastruktur, wie etwa eines Kubernetes-Clusters, nicht in einer Minute erledigt ist – eher in 10 bis 15 Minuten. Doch wenn die resultierenden Testergebnisse aussagekräftiger, reproduzierbarer und belastbarer sind, ist dieser Aufwand mehr als gerechtfertigt.)

Link: [robotframework-terraformlibrary](https://github.com/Nilsty/robotframework-terraformlibrary)

--- 

## Perfbot - Integrated performance analysis of robot tests

*(Lennart Potthoff)*

Lennart Potthoff stellte in seinem Vortrag die Ergebnisse seiner Bachelor-Arbeit vor, in der er sich mit der Vergleichbarkeit vergangener Testläufe im Hinblick auf Laufzeiten und Performance-Regressionen beschäftigte.   
Während im Testumfeld meist das Testergebnis im Vordergrund steht, können auch schleichende Veränderungen der Testlaufzeiten oder Ausreißer wichtige Hinweise auf Probleme liefern.  

Seine Lösung, **Perfbot**, erweitert Robot Framework um die Möglichkeit, Testlaufzeiten zu archivieren und statistisch auszuwerten.  
Perfbot arbeitet als sogenannter `prerebotmodifier` und speichert die Ausführungszeiten von Tests und Keywords in einer lokalen **SQLite-Datenbank**.   

Info: IM Publikum kam auch die Frage auf, warum Lennart nicht einen Listener verwendet hatte: Listener arbeiten parallel zur Testausführung und können theoretisch auch einen negativen Einfluss auf die Performance des Tests haben. **Prerebotmodifier** hingegen haben den Charnme, dass sie erst nach der Tetsausführung arbeiten (wenn output.xml geschrieben ist), aber immer noch, bevor die Logs/Reports erzeugt werden. 

{{< figure src="img/lennart.jpeg" title="Lennart Pothoff: 'Perfbot - Integrated performance analysis of robot tests'" >}}

Für die Visualisierung der Ergebnisse nutzt Perfbot die **Boxplot-Library** und integriert die erstellten Diagramme direkt in die log.html und report.html. Die gezeigten Diagramme fand ich sehr ansprechend!  

{{< figure src="img/boxplot.png" title="log.html /boxplot (Source: https://github.com/perfroboter/robotframework-perfbot)" >}}

Besonders interessant ist das Feature "**Testbreaker**": Es setzt einen Testfall auf "**FAIL**", wenn die Abweichung der aktuellen Laufzeit vom Median vergangener Testläufe einen definierten Schwellenwert überschreitet. So werden potenzielle Performance-Probleme unmittelbar sichtbar. Tolle Idee!  

In Zukunft wird Perfbot nicht nur die Laufzeiten von Testfällen, sondern auch die **Laufzeiten einzelner Keywords** auswerten, was tiefere Analysen ermöglicht.  
Hierfür hat Lennart ein ergänzendes Tool namens **Perfmetrics** entwickelt. (Dieses befindet sich derzeit noch im Prototyp-Stadium und wurde bisher nicht veröffentlicht.)

Mein Fazit: Mit Perfbot bietet Lennart eine praxisnahe Lösung, um Performance-Regressionen in bestehenden UI-Tests systematisch zu erkennen und direkt in die Robot Framework Reports zu integrieren.  

Link: [robotframework-perfbot](https://github.com/perfroboter/robotframework-perfbot)

---

## Behavior-Tree-Based Test-Case Specification

*(Noubar Akopian)*

Noubar Akopian stellte in seinem Vortrag **RobotBT** vor, eine Behavior-Tree-Library für Robot Framework.  

**Info**: Behavior Trees sind eine strukturierte Methode zur Darstellung komplexer Abläufe und Entscheidungen.  
Sie zerlegen Automatisierungslogik in kleine, wiederverwendbare Aufgaben (Nodes), die in einer baumartigen Struktur organisiert sind.  
Jede Node beschreibt dabei eine Aktion, Bedingung oder Entscheidung – und der Baum steuert, welche Schritte in welcher Reihenfolge ausgeführt werden.  

Noubars Ziel war es, die Machbarkeit und den Nutzen solcher Behavior Trees für die Spezifikation von Testfällen zu demonstrieren.  
Der Vortrag basierte auf seiner Arbeit "*RobotBT: Behavior-Tree-Based Test-Case Specification for the Robot Framework*", die 2023 auf der ISSTA-Konferenz veröffentlicht wurde (Link siehe unten).

{{< figure src="img/noubar.jpeg" title="Noubar Akopian: 'Behavior-Tree-Based Test-Case Specification'" >}}

**Warum ist das für Robot Framework relevant?**  

Testfall-Spezifikationen in Robot Framework können mit zunehmender Größe und Komplexität schnell **unübersichtlich** werden.  
Hier setzt die von Noubar entwickelte **BehaviorTreeLibrary** an, die Behavior-Tree-Knoten als Robot-Keywords zur Verfügung stellt.  

In einer Fallstudie mit einer Test-Suite der **G DATA CyberDefense AG** untersuchte Noubar die praktische Anwendbarkeit von Behavior Trees.  
Die Entwickler, die mit RobotBT arbeiteten, bestätigten eine verbesserte Lesbarkeit und Wartbarkeit der Testfälle.  

Mein Fazit: Behavior Trees waren bisher noch gar nicht in meinem Scope. Die Präsentation war nachvollziehbar und sehr praxisnah.  
Besonders gut gefallen haben mir die **Vorher-Nachher-Vergleiche**!  

Links: 

- [RobotBT: Behavior-Tree-Based Test-Case Specification for the Robot Framework](https://dl.acm.org/doi/pdf/10.1145/3597926.3604924)
- [BehaviorTreeLibrary](https://github.com/noubar/RobotFramework-BehaviorTreeLibrary)
  
---

## Fazit

**Die RoboCon-Woche in Helsinki vergeht jedes Jahr wie im Flug!**

Ich hatte viele interessante Gespräche, lernte neue Leute und Use Cases kennen und konnte wertvolle Impulse mitnehmen.  

Was diese Veranstaltung so besonders macht: die **einzigartige Community**. Hier treffen **Leidenschaft, Fachwissen und Hilfsbereitschaft** 🤝 aufeinander – eine Atmosphäre, die einfach inspiriert.  

Die abwechslungsreiche Mischung aus Community Day, Workshop-Tag und zwei Konferenztagen sorgt dafür, dass es nie langweilig wird – jede Menge Input, Austausch und neue Perspektiven sind garantiert.


**Jetzt bin ich neugierig**: Warst Du auch auf der RoboCon? Was waren Deine persönlichen Highlights? Schreib es gerne in die Kommentare! 👇