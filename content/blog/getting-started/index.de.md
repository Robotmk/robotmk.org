---
draft: true
title: "Robotmk Schnellstart"
# -- predefined URL
# slug: 
# -- for posts in menubar, use this (shorter) title
menutitle: Guide
lead: Eine Schnellstart-Anleitung zur Inbetriebnahme von Robotmk.
# --- Italic subheading
# lead: 
date: "2024-04-17T21:37:42+02:00"
categories:
  - "tutorials"
tags:
  - "Installation"
authorbox: true
sidebar: true
pager: false
menu: main
weight: 10
# --- must be in the leaf bundle folder or static
thumbnail: "img/start-title.webp"
---

Wie Du einen minimalen Web-Test mit Robotmk in Checkmk integrierst. 

<!--more-->

Mit diesem Tutorial gelingt Dir der Einstig in Synthetic Monitoring mit Robotmk. Gleichzeitig erhältst Du eine Schritt-für-Schritt-Anleitung, anhand der Du Deine eigene Installation überprüfen kannst. 


## Voraussetzungen 

- Windows-VM 
  - mit Internet-Zugriff
  - 8 GB RAM
  - 4, besser 8 CPUs
  - Basis-Monitoring durch Checkmk ("Vanilla"-Agent)
- Checkmk 2.3

> Das Tool "RCC" wird später vom Checkmk-Agenten zwar automatisch mit installiert (`ProgramData/checkmk/agent/bin`). Ich finde es aber trotzdem praktisch, eine "eigene" Kopie des Binaries für lokale Tests zur Hand zu haben. 

## Windows-Testclient 

### Download von RCC

**Wichtig:** Der Checkmk-Agent, den wir gleich zusammen mit dem Scheduler installieren, wird das RCC-Binary mitbringen. Du kannst diesen Schritt hier also überspringen, wenn Du den Robot sofort (d.h. ohne vorherigen Test) in Checkmk integrieren willst. Fahre in diesem Fall mit Schritt xxx fort. 

Für einen vorherigen Test oder aber die Einrichtung eines Entwicklungs-Hosts musst Du Dir das RCC-Binary selbst besorgen. Lade es [hier](https://downloads.robocorp.com/rcc/releases/index.html) herunter ([v17.18](https://downloads.robocorp.com/rcc/releases/v17.18.0/windows64/rcc.exe)) und speichere es an einem Ort Deiner Wahl. Ich habe mir angewöhnt, ein Verzeichnis `bin` im User-Profil anzulegen: `c:\Users\simonmeggle\bin\rcc.exe`

Füge diesen Ordner nun der User-Umgebungsvariable `%PATH%` hinzu: 

{{< figure src="img/bin-path.png" title="Hinzufügen des RCC-Pfades zur User-Variable `%PATH%`" >}}

Öffne eine neue CMD und teste, ob Du `rcc` nun von einem beliebigen Ort ausführen kannst: 

{{< figure src="img/cmd_where_rcc.png" title="Erster Aufruf von RCC" >}}

### Download des Minimal-Tests

Nun ist es an der Zeit, das [Repo](https://github.com/elabit/robotmk-examples/archive/refs/heads/main.zip) mit der Robot-Suite herunterzuladen, die wir in Checkmk integrieren wollen. 

> Das Repository https://github.com/elabit/robotmk-examples habe ich extra für Beispiel-Suites angelegt. Speichere es am Besten in Deinen Bookmarks. 

Entzippe die Datei `master.zip` und speichere den Unterordner `web/cmk_synthetic_web` im Ordner `C:\robots\` ab. Dieser Ordner dient als sog. Basisverzeichnis für alle Robot-Suites. 

{{< figure src="img/robot-basedir.png" title="Speicherort des neuen Robots" >}}

### Ausführen des Robots mit RCC

> Bedenke, dass wir bisher *keinerlei Software* installiert haben. Gleich schlägt die Stunde von RCC! 

Öffne eine CMD und wechsle in den eben kopierten Ordner `C:\robots\cmk_synthetic_web`. 

Das folgende Kommando erzeugt ein virtuelles Environment für alles, was unser Web-Test benötigt: Python (+Packages), NodeJS (+Packages), Webbrowser.  

{{< figure src="img/rcc-task-shell-run.gif" title="Start des Robots mit RCC" >}}

> Die Ausführung dieses Tests incl. des Browser erfolgt komplett auf Basis eines RCC-Environments! Wir haben keinerlei Software vorher installiert!

Nun, da wir wissen, dass der Robot funktioniert, wenden wir uns nun der Integration in Checkmk zu. 

---

## Checkmk-Server

Auf dem Checkmk-Server (v2.3) ist bisher nicht viel passiert: der Windows-Host wird aktuell nur mit einem Vanilla-CMK-Agent überwacht: 

{{< figure src="img/cmk-win1.png" title="Windows-Host in Checkmk" >}}

### Konfigurieren der Bakery

Der Robotmk-Scheduler, der auf dem Windows-Client später die Robot-Tests ausführen wird, kann komplett über die Bakery-Regel "*Robotmk Scheduler (Windows)*" konfiguriert werden: 

{{< figure src="img/bakery-search.png" title="Alle Robotmk-Regeln werden am leichtesten über das Suchwort 'robot' gefunden." >}}


{{< figure src="img/bakery-rule.png" title="Die ausgefüllte Bakery-Rule für den Robotmk Scheduler." >}}

Die Felder im einzelnen: 

1. Das Basisverzeichnis, in dem wir die Beispielsuite abgelegt hatten.
2. Die erste (und einzige) parallele Ausführungsgruppe.
3. Je Ausführungsgruppe sind sequenzielle Ausführungen von Robot Framework-Suites möglich. 
4. Ausführungsintervall der Gruppe
5. Name der zu testenden Applikation (Beispiel: "SAP")
6. Der Pfad zur Robot Framework-Suite wird *relativ zum Basisverzeichnis* angegeben. 
7. Dieser Timeout bestimmt, wie viel Zeit die Suite vom Scheduler zur Ausführung bekommt. Danach wird sie terminiert. 
8. Relative Pfadangabe (wie 6.) zur `robot.yaml` (zentrale Config-Datei für RCC, enthält Verweis zur `conda.yaml`)
9. Timeout zum Bauen des Environments. 

Danach die Regel speichern. 

### Agenten backen

Nun in die Agent Bakery wechseln...

{{< figure src="img/bakery-related.png" title="Das 'related'-Menü bietet eine praktische Abkürzung zur Bakery." >}}

...und einen neuen Installationsagenten backen: 

{{< figure src="img/agent-bake.png" title="Backen eines neuen Agenten." >}}

{{< figure src="img/agent-baked.png" title="Download MSI-Installer" >}}

### Discovery der Services

Der erste Service, der unmittelbar nach dem Deployment discovert werden kann ist der "Scheduler Status" service: 

{{< figure src="img/discovery-schedulerstatus.png" title="Scheduler Status Service" >}}

Er überwacht den Robotmk Scheduler, der als Agent "Extension" dauerhaft neben dem Agenten herläuft. 

Der Scheduler durchläuft nach dem Start des Agenten zwei Phasen: 

- **Phase 1**: Sequenzielles Bauen aller RCC Environments
- **Phase 2**: Scheduling der Plans (=Konfigurierte Robot Framework-Suites) im konfigurierten Intervall. 

Sobald das Environment gebaut wurde und die erste Ausführung der Suite im Hintergrund (="headless") erfolgte, lassen sich zwei weitere Services discovern: 

{{< figure src="img/discovery-plan-test.png" title="Plan- u. TestService" >}}

- **Plan Service**: Genau wieder Scheduler Status ein an Administratoren gerichteter Service, der z.B. anschlägt, wenn Ergebnisse zu alt sind (=die Suite nicht mehr ausgeführt wird)
- **Test Service**: Gerichtet an Applikationsverantwortliche. Repräsentiert den Zustand (PASS/FAIL) des Tests aus Sicht von Robot Framework. 

---

## Checkliste 

TODO: sdfsdfs



Diese Checkliste fasst noch einmal alle Schritte in Kürze zusammen: 

- ✓ Herunterladen und Entpacken des [Beispiel-Repos](https://github.com/elabit/robotmk-examples/archive/refs/heads/main.zip)
- ✓ Speichern der Robot-Suite im Basisverzeichnis  `C:\robots\`
- ✓ Die **Bakery-Regel** in Checkmk benötigt mindestens
  - ✓ Basisverzeichnis (z.B. `C:\robots\`)
  - ✓ Ausführungsintervall der Gruppe
  - ✓ Application Name 
  - ✓ Pfad zum Suite-File/Verzeichnis
  - ✓ Pfad zur `robot.yaml`
- ✓ Backen / Deployen / Installieren des Agenten
- ✓ Discovery
