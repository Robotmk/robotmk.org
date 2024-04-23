---
draft: false
title: Robotmk v2 Schnellstart
lead: Step by Step den ersten RobotFramework-Test mit Robotmk in Checkmk integrieren.
commentid: rmkv2-quickstart
menutitle: Getting Started
date: 2024-04-17T21:37:42+02:00
categories:
  - tutorials
tags:
  - Installation
authorbox: true
sidebar: true
pager: false
menu: main
weight: 10
thumbnail: img/start-title.png
slug: robotmk-v2-schnellstart
---

**Du weißt nicht, wie Du anfangen sollst?**  
Mit dieser Schritt-für-Schritt-Anleitung gelingt Dir der Einstieg in Synthetic Monitoring mit Robotmk.  


<!--more-->

## Voraussetzungen 

- Windows-VM 
  - mit Internet-Zugriff
  - 8 GB RAM
  - 4, besser 8 CPUs
  - Basis-Monitoring durch Checkmk eingerichtet ("Vanilla"-Agent)
- Checkmk 2.3 auf einem Linux-Host

> Das Tool "RCC" wird später vom Checkmk-Agenten zwar automatisch mit installiert (`ProgramData/checkmk/agent/bin`). Ich finde es aber trotzdem praktisch, eine "eigene" Kopie des Binaries für lokale Tests zur Hand zu haben. 

## Windows-Testclient 

### Download von RCC

> Der Checkmk-Agent, den wir gleich zusammen mit dem Scheduler installieren, wird das `rcc.exe`-Binary mitbringen. Du kannst diesen Schritt hier also überspringen, wenn Du den Robot sofort (d.h. ohne vorherigen Test) in Checkmk integrieren willst.  
> Ich habe mir angewöhnt, dafür ein `bin`-Verzeichnis im User-Profil anzulegen und das Binary dort abzulegen (z.B. `c:\Users\simonmeggle\bin\rcc.exe`).

Für einen vorherigen Test oder aber die Einrichtung eines Entwicklungs-Hosts musst Du Dir das RCC-Binary selbst besorgen. Lade es [hier](https://downloads.robocorp.com/rcc/releases/index.html) herunter ([v17.18](https://downloads.robocorp.com/rcc/releases/v17.18.0/windows64/rcc.exe)) und speichere es an einem Ort Deiner Wahl. Ich habe mir angewöhnt, ein Verzeichnis `bin` im User-Profil anzulegen: `c:\Users\simonmeggle\bin\rcc.exe`

Füge diesen Ordner nun der User-Umgebungsvariable `%PATH%` hinzu: 

{{< figure src="img/bin-path.png" title="Hinzufügen des RCC-Pfades zur User-Variable `%PATH%`" >}}

Öffne eine neue CMD und teste, ob Du `rcc` nun von einem beliebigen Ort ausführen kannst: 

{{< figure src="img/cmd_where_rcc.png" title="Erster Aufruf von RCC" >}}

### Download des Minimal-Tests

Nun ist es an der Zeit, das [Repo](https://github.com/elabit/robotmk-examples/archive/refs/heads/main.zip) mit der Robot-Suite herunterzuladen, die wir in Checkmk integrieren wollen. 

> Das Repository https://github.com/elabit/robotmk-examples habe ich extra für Beispiel-Suites angelegt. Speichere es am Besten in Deinen Bookmarks. 

Entzippe die Datei `master.zip` und speichere den Unterordner `web/cmk_synthetic_web` im Ordner `C:\robots\` ab. Dieser Ordner dient als sog. **Basisverzeichnis** für alle Robot-Suites. 

{{< figure src="img/robot-basedir.png" title="Speicherort des neuen Robots" >}}

### Ausführen des Robots mit RCC

> Hier noch der Hinweis, dass wir bisher *keinerlei Software* installiert haben. Gleich schlägt die Stunde von RCC! 

Öffne eine CMD und wechsle in den eben kopierten Ordner `C:\robots\cmk_synthetic_web`. 
Nun folgen ein paar Kommandos, die ich genauer erkläre, denn sie sind wichtig zum Verständnis: 

- `where python`: Haben wir Python zur Verfügung?  
  Das Kommando `where` ist das Äquivalent zum Linux-Befehl `which` und versucht, das als Argument übergebene Befehl über die `%PATH%`-Variable zu finden.  
  Die `%PATH-Variable%` besteht in der Regel aus einer ganzen Reihe von Suchpfaden, die mit Semikolon voneinander getrennt sind. In genau dieser Reihenfolge der Pfade sucht Windows nach dem angegebenen Programm. 
  Mit diesem Test möchte ich herausfinden, ob auf dem System zufällig schon Python installiert ist - und wenn ja, wo.  
  Auf Deinem System wird vermutlich überhaupt keine Ausgabe kommen. Auf dem im Video gezeigten Windows wird lediglich "pyenv" angezeigt. (Das müssen wir nicht weiter vertiefen - es ist kein Python-Interpreter vorhanden, basta.)
- `rcc task shell`: Der schnellste Weg in ein RCC-Environment.  
  Dieser Befehl startet `rcc` mit der Anweisung, im aktuellen Verzeichnis nach der Datei `robot.yaml` zu suchen. Hiervon interessiert rcc nur eine einzige Zeile: nämlich die, welche auf die Datei `conda.yaml` (gewöhnlich im gleichen Verzeichnis) verweist.  
  Wenn `rcc` sie findet, beginnt das Tool nun, ein komplett isoliertes Environment aufzubauen; darin ist alles, was unser Web-Test benötigt: Python (+Packages), NodeJS (+Packages), sowie dreierlei Webbrowser (Firefox, Chromium, Webkit).  
- `where python`: Diesmal erhalten wir von dem Kommando den Pfad zum Python-Interpreter im neu erstellten Environment zurück. 
- `where robot`: Auch NodeJS ist installiert und wird über `%PATH%` gefunden. (Ist das nicht cool...? 😎)
- `robot tests.robot`: Auch Robot Framework bringt ein Kommandozeilentool namens `robot` mit, und auch dieses wird im Suchpfad gefunden. Um den Webtest von diesem Environment aus zu starten, reicht es, dem Befehl den Namen der .robot-Datei anzugeben. Damit startet der Webbrowser im Vordergrund und Robot Framework führt eine kurze Google-Suche aus. 
  

{{< figure src="img/rcc-task-shell-run.gif" title="Start des Robots mit RCC" >}}

> Die Ausführung dieses Tests incl. des Browser erfolgt komplett auf Basis eines RCC-Environments! Wir haben keinerlei Software vorher installiert!

Dieser Abschnitt hat den Beweis erbracht: der Robot kann über RCC gestartet werden. ✓

Im nächsten Abschnitt wenden wir uns nun der Integration in Checkmk zu. 

---

## Checkmk-Server

Auf dem Checkmk-Server (v2.3) ist bisher nicht viel passiert: der Windows-Host wird aktuell nur mit einem Vanilla-CMK-Agent überwacht: 

{{< figure src="img/cmk-win1.png" title="Windows-Host in Checkmk" >}}

### Konfigurieren der Bakery

Der Robotmk-Scheduler, der auf dem Windows-Client später die Robot-Tests ausführen wird, kann komplett über die Bakery-Regel "*Robotmk Scheduler (Windows)*" konfiguriert werden: 

{{< figure src="img/bakery-search.png" title="Alle Robotmk-Regeln werden am leichtesten über das Suchwort 'robot' gefunden." >}}


{{< figure src="img/bakery-rule.png" title="Die Bakery-Rule für den Robotmk Scheduler." >}}

Erklärungen / Werte der einzelnen Felder: 

| No  | Beschreibung                                                                                                       | Wert                            |
| --- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| 1.  | Das Basisverzeichnis, in dem wir die Beispielsuite abgelegt hatten.                                                | `C:\robots`                     |
| 2.  | Die erste (und einzige) parallele Ausführungsgruppe.                                                               |                                 |
| 3.  | Je Ausführungsgruppe sind sequenzielle Ausführungen von Robot Framework-Suites möglich.                            |                                 |
| 4.  | Ausführungsintervall der Gruppe                                                                                    | `3`                             |
| 5.  | Name der zu testenden Applikation                                                                                  | `GoogleSearch`                  |
| 6.  | Der Pfad zur Robot Framework-Suite wird *relativ zum Basisverzeichnis* angegeben.                                  | `cmk_synthetic_web\tests.robot` |
| 7.  | Dieser Timeout bestimmt, wie viel Zeit die Suite vom Scheduler zur Ausführung bekommt. Danach wird sie terminiert. | `1`                             |
| 8.  | Relative Pfadangabe (wie 6.) zur `robot.yaml` (zentrale Config-Datei für RCC, enthält Verweis zur `conda.|yaml`)   | `cmk_synthetic_web\robot.yaml`  |
| 9.  | Timeout zum Bauen des Environments.                                                                                | `10`                            |

Ganz unten wird die Regel auf den Host `windows` beschränkt: 


{{< figure src="img/bakery-condition.png" title="Die Condition schränkt die Regel auf nur einen Host ein." >}}

Danach die Regel speichern. 

### Agenten backen

Nun in die Agent Bakery wechseln...

{{< figure src="img/bakery-related.png" title="Das 'related'-Menü bietet eine praktische Abkürzung zur Bakery." >}}

...und einen neuen Installationsagenten backen: 

{{< figure src="img/agent-bake.png" title="Backen eines neuen Agenten." >}}

Sobald die Erzeugung des Agenten-Installers fertig ist, siehst Du eine neue Zeile, in welcher ganz rechts der Host steht, auf den Du die Regel beschränkt hast (`windows`). Lade von hier das MSI-Paket herunter. 

{{< figure src="img/agent-baked.png" title="Download MSI-Installer" >}}

### Discovery der Services

Der erste Service, der unmittelbar nach dem Deployment discovert werden kann ist der "Scheduler Status" service: 

{{< figure src="img/discovery-schedulerstatus.png" title="Scheduler Status Service" >}}

Er überwacht den Robotmk Scheduler, der als Agent "Extension" dauerhaft neben dem Agenten herläuft. 

Der Scheduler durchläuft nach dem Start des Agenten zwei Phasen: 

- **Phase 1**: Sequenzielles Bauen aller RCC Environments
- **Phase 2**: Scheduling der Plans (=Konfigurierte Robot Framework-Suites) im konfigurierten Intervall. 

Bis das Environment im Hintergrund vom Scheduler gebaut wurde, können ein paar Minuten vergehen.  
Wann es beendet ist, siehst Du daran, dass sich der Output des Scheduler Services ändert: 


{{< figure src="img/plan-scheduling.png" title="Der Scheduler hat das Environment gebaut." >}}

Nachdem die erste Ausführung der Suite im Hintergrund (="headless") erfolgt ist, lassen sich zwei weitere Services discovern: 

{{< figure src="img/discovery-plan-test.png" title="Plan- u. TestService" >}}

- **Plan Service**: Genau wieder Scheduler Status ein an Administratoren gerichteter Service, der z.B. anschlägt, wenn Ergebnisse zu alt sind (=die Suite nicht mehr ausgeführt wird)
- **Test Service**: Gerichtet an Applikationsverantwortliche. Repräsentiert den Zustand (PASS/FAIL) des Tests aus Sicht von Robot Framework. 

---

## Checkliste 

Diese Checkliste fasst noch einmal alle Schritte in Kürze zusammen: 

- ✓ Herunterladen und Entpacken des [Beispiel-Repos](https://github.com/elabit/robotmk-examples/archive/refs/heads/main.zip)
- ✓ Speichern der Robot-Suite im Basisverzeichnis  `C:\robots\`
- ✓ Die **Bakery-Regel** in Checkmk benötigt mindestens diese Einstellungen:
  - ✓ Basisverzeichnis (z.B. `C:\robots\`)
  - ✓ Ausführungsintervall der Gruppe
  - ✓ Application Name 
  - ✓ (relativer) Pfad zum Suite-File/Verzeichnis
  - ✓ (relativer) Pfad zur `robot.yaml`
- ✓ Backen / Deployen / Installieren des Agenten
- ✓ Discovery

---

## Zusammenfassung

Mit diesen paar Schritten hast Du Deinen ersten Robot Framework-basierten Web-Test in Checkmk integriert.  
**Hier ein paar Tips für Deine nächsten Schritte:**

- Erkunde die Monitoring-Regel "*Robotmk tests*", mit der Du den discoverten Test und auch die im Test enthaltenen Keywords auf ihre Laufzeit überwachen kannst. 
- Installiere und öffne Visual Studio Code. Starte eine RCC-Shell im Suite-Verzeichnis und führe `code .` aus. Das bringt öffnet die IDE direkt im RCC-Environment. Hier kannst Du die Robot-Suite ansehen und ein bisschen experimentieren. 