---
draft: false
title: "Robocon 2026 - Recap (Teil 6)"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
commentid: robocon26-recap-6
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

Dies ist **Teil 6** der sechsteiligen Review der Robocon 2026 in Helsinki.

<!--more-->

---

➛ Zurück zu **[Teil 5]({{< ref "/robocon26-recap-5/" >}})**

---

### How AI tools affect learning and the implications on open source tools

{{< portrait src="img/arttu.png" alt="Arttu Taipale" >}}

**Arttu Taipale** ist Automation Developer bei Knowit Solutions und nutzt Robot Framework täglich sowohl in RPA- als auch in Testautomatisierungsprojekten. Er ist leidenschaftlicher Open-Source-Enthusiast mit ausgeprägtem Problemlösungsinstinkt. Seit vier Jahren bietet er Robot-Framework-Trainings an – eine Erfahrung, die ihm einen direkten Einblick verschaffte, wie sich **Lernen in der GenAI-Ära** verändert.

Seine Session stellte eine fundamentale Frage:  
**Wie lernen wir Software-Entwicklung, wenn GenAI-Tools zunehmend den Code für uns schreiben?**

Die **Herausforderung** ist real: ChatGPT besteht problemlos Physik-Prüfungen an britischen Universitäten (wie eine Studie an der University of Hull zeigte), und Unternehmen berichten, dass mehr Code durch GenAI generiert wird als manuell geschrieben.

Der Kern seiner Argumentation basierte auf **Lerntheorie** – illustriert durch Star-Wars-Metaphern, die überraschend gut funktionierten: **Receiving** (neue Informationen aufnehmen) versus **Retrieval** (Wissen abrufen und anwenden).  
Luke Skywalker, der zum ersten Mal ein Lichtschwert in die Hand nimmt, repräsentierte den Novizen.  
Erst durch Übung gegen den Droiden im Millennium Falcon – durch aktives **Retrieval** – wird Wissen verankert.

Das Problem mit AI-Tools: Sie erleichtern das Receiving enorm, **untergraben aber das Retrieval**.  
Wenn wir Code-Generierung outsourcen, hören wir auf, Verbindungen im Gehirn zu festigen.  

Schlimmer noch: Wir machen **die falschen Fehler**.  
Arttu zeigte (absichtlich etwas überzogene) Beispiele aus seinen Trainings, wo Teilnehmer versuchten, mit AI Probleme zu lösen. Das Ergebnis: veraltete Syntax, überkomplizierte Lösungen oder Keywords aus falschen Libraries.  
Für Anfänger – die noch keine mentalen Modelle haben – bieten diese Fehler keine Lernbasis.

Die zentrale Warnung: Eine **Divergenz zwischen Lernen und Tun** entsteht.  
Junior-Entwickler könnten mit GenAI die einfachen Aufgaben meistern, die eigentlich ihre Trainingsgrund sein sollten – nur um dann bei komplexen Problemen, wo AI nicht hilft, in eine Wissenslücke zu fallen. "*Imagine Luke Skywalker telling C3PO to fight all his fights until the final movie*" – gegen Darth Vader hätte er keine Chance gehabt. 

Seine Empfehlung war klar, aber unbequem: **Wir müssen dasselbe lernen wie zuvor** – mit derselben Tiefe.  
AI-Tools sind Produktivitätsmultiplikatoren für jene, die bereits verstehen, was sie da bauen.  

Die beste Methode, AI-Nutzung zu meistern? Seine Empfehlung: **Bücher lesen**. Denn Prompting erfordert Verständnis dessen, was man fragt – und kritisches Denken beim Analysieren der Antworten.

Zum Abschluss richtete Arttu den Blick auf **Robot Framework selbst**: Wird es ein Tool bleiben, das effizient mit GenAI nutzbar ist? Oder werden andere Tools die Oberhand gewinnen?  
Die Open-Source-Natur von Robot Framework ist ein Vorteil, doch die verzerrten Trainingsdaten der LLMs (oft mit veralteter Syntax) stellen eine echte Herausforderung dar.

👉 **Fazit**  
Eine der **nachdenklichsten Sessions der Konferenz**.  
Arttu navigierte geschickt zwischen Pragmatismus und kritischer Reflexion.  
Seine Botschaft: AI ist **kein Ersatz für fundiertes Wissen** – sie ist ein Werkzeug für jene, die bereits wissen, wie man den Hammer schwingt.  
Die Community muss aktiv daran arbeiten, dass Robot Framework in der AI-Ära relevant bleibt – nicht durch Widerstand gegen AI, sondern durch bessere Integration und aktualisierte Lernressourcen.

---


### PlatynUI: Cross-platform Desktop UI Automation für Robot Framework


{{< portrait src="img/daniel.png" alt="Daniel Biehl" >}}

**Daniel Biehl** stellte mit [PlatynUI](https://github.com/imbus/platynui-sut) eine Library vor, die **Desktop-UI-Automatisierung** plattformübergreifend unter Windows, Linux und macOS konsistent macht.  

PlatynUI adressiert ein Problem, das jeder kennt, der je Desktop-Tests geschrieben hat: Es ist gerade für Anfänger nicht einfach, damit robuste Tests zu schreiben.  
**Timing**-Issues, **Fokus**-Probleme, **asynchrone UIs** – Desktop-Automatisierung ist von Haus aus eine kleine "Zicke".  

Und so kommt es dann, dass aus reiner Verzweiflung mit `Sleep`s gearbeitet wird, Buttons in `FOR`-Schleifen im Dauerfeuer angeklickt werden usw. Alles Workarounds um ein tiefer liegendes Problem herum. 

Daniel erkärte das anhand des Keywords `Click`:  

- Was wir **erwarten**? Dass die Anwendung reagiert, als hätte ein Benutzer geklickt.  
- Was das Keyword **ausführt**? Lediglich ein einzelnes Maus-Event an einer Koordinate abfeuern – ohne zu prüfen, ob das Element sichtbar, aktiviert oder fokussiert ist. Ein Click ist damit nur ein *Vorschlag*, keine Garantie.

Statt Keywords für Mechanismen wie "Click" bietet die PlatynUI **semantische Aktionen**: Keywords wie `Activate`, `Focus`, `Check` oder `Select` beschreiben die *Intent* – das gewünschte Ergebnis.  
Jede dieser Aktionen folgt einem klaren Muster:  

- **Preconditions**: Fenster aktiv, Element im Viewport, Element enabled? 
- **Perform**: führe die Aktion aus. 
- **Postcondition**: Warte bis die Anwendung bereit ist.  

Manch einem wird das bekannt vorkommen: ähnlich verfährt nämlich auch das in der [BrowserLibrary](https://marketsquare.github.io/robotframework-browser/Browser.html) arbeitende Playwright mit den sog. [Actionability-Checks](https://playwright.dev/docs/actionability). Auch hier ist z.b. ein Button nur dann anklickbar, wenn die Actionability-Checks ergeben haben, dass das Element sichtbar/aktiv ist und nicht etwa von einem anderen Element verdeckt wird.

**PlatynUI befindet sich noch in Entwicklung** – Tooling, Keywords und Plattformabdeckung sind noch nicht final abgeschlossen.  
Doch das Projekt zeigt bereits jetzt einen soliden, prinzipiengetriebenen Ansatz für ein chronisches Problem der Desktop-Automatisierung.  
Und wie ich im Review des **PlatynUI-Workshops** oben schon schrieb: wenn schon Unternehmen wie die **Deutsche Flugsicherung** PlatynUI produktiv nutzen, deutet auf einen hinreichend reifen Stand hin. 

👉 **Fazit**  
PlatynUI ist nicht die Lösung aller Probleme: gerade beim Synthetic Monitoring wird es immer Use Cases geben, wo bildvergleichende Libraries die einzige Lösung sind (z.b. RDP/Citrix).  
Aber in allen anderen Fällen wird PLatynUI mit seinem "*Robot Framework First*" Ansatz ein echter Gamechanger werden.  
(Wenn Du interessiert bist an einem Training, kontaktiere mich; ich arbeite aktuell schon am Material.)


---

### Nach der RoboCon ist vor der RoboCon

Die Woche war wieder erstaunlich schnell vergangen.  
Vier Tage voller Vorträge, Gespräche und neuer Impulse – und schon saß ich wieder im Flieger nach Hause, mit einem Kopf voller Ideen und einer Notizsammlung (die mit diesem Blogartikel jetzt endlich verarbeitet worden ist 🤗 ).

![alt text](img/airport.png)

Was die RoboCon für mich besonders macht: wie viele Themen da ineinander greifen – von AI über Testarchitektur bis hin zu Infrastruktur – und zeichnen ein immer klareres Bild davon, wohin sich das Ökosystem entwickelt.

![alt text](img/stage.png)

Einige der Ansätze werde ich in den kommenden Monaten sicher weiterverfolgen. Andere wirken vielleicht erst mit etwas Abstand.  
Genau das ist der Wert solcher Veranstaltungen: Sie setzen **Impulse, die bleiben**.

Vielleicht überzeugt diese Rückschau ja den ein oder anderen, 2027 selbst dabei zu sein.

Schreib gern unten in die Kommentare, wie es Dir gefallen hat. 

**Nach der RoboCon ist vor der RoboCon!**




---

➛ Zurück zu [Teil 1 (Dienstag/Mittwoch, Workshop & Community Day)]({{< ref "/robocon26-recap-1/" >}})  
➛ Zurück zu [Teil 5]({{< ref "/robocon26-recap-5/" >}})  
