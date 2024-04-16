---
title: "RCC - Virtualenv on Steroids!"
#menutitle: 
description: 
lead: Alles was Du über die Ausführung von Robot Framework durch Robotmk wissen musst.
thumbnail: ""
date: "2024-04-16T15:49:17+02:00"
categories:
  - ""
tags:
  - ""
authorbox: false
sidebar: true
pager: false
#menu: main
#weight: 10
---




## Einführung

In meinen Schulungen pflege ich immer zu sagen: Robotmk ist eigentlich nur ein großer Wrapper um das Robot Framework. Robot Framework und seine Libraries sind allesamt in Python geschrieben (nun ja, nicht alle, mehr dazu gleich) und werden über pip auf dem Testsystem installiert, damit Robotmk sie dort verwenden kann.

Bist du bereits Anwender von Robotmk v1? Dann hast du das Robot Framework und die Libraries sicher bisher im Betriebssystem installiert. Das funktioniert, ist aber schlecht, weil du damit alle diese Pakete auf eine bestimmte Version festnagelst. Sobald du eine Robot-Suite hast, die eine bestimmte Library in einer anderen Version brauchst, hast du ein Problem, denn du kannst ein Python-Package immer nur in einer bestimmten Version auf dem System installieren.

An dieser Stelle denkt man intuitiv schnell an virtualenv. Das ist ein kleines nützliches Python-Tool, mit dem man kleine voneinander sauber getrennte Python-Umgebungen erzeugen und verwenden kann. Allerdings ist das Problem nur für die Python-Welt gelöst. Ein prominentes Beispiel ist die Browserlibrary: Sie ist zwar selbst in Python geschrieben, spricht aber über JavaScript mit dem Playwright-Framework, welches über NodeJS installiert wird. Die Anforderung ist also nicht nur, Python-Umgebungen voneinander zu isolieren, sondern auch NodeJS-Umgebungen.

Ja, ich weiß... hierfür gäbe es dann "nodeenv", womit auch NodeJS-Umgebungen abstrahiert werden können. Aber das alles zu automatisieren, endet in einem Rabbit Hole – und darin, dass man das Rad noch einmal erfindet. Denn genau vor dem beschriebenen Problem stand bereits die Firma Robocorp. In diesem Artikel xxxx kannst Du mehr über Robocopr erfahren. Hier soll es nur um RCC gehen. 

## RCC verstehen

### Analogie zu Docker

Wenn Du Dich mit Docker auskennst, dann weißt Du, dass Docker-Container leichtgewichtige, portable Einheiten sind, die Software und alle ihre Abhängigkeiten enthalten. Das ermöglicht den Betrieb von Anwendungen konsistent auf verschiedenen Umgebungen/Plattformen. 
Das Dockerfile beschreibt, wie ein Docker-Image konkret auszusehen hat (also das zugrunde liegende Betriebssystem, zu insrtallierende Software, Konfigurationsbefehle, bereitgesteltle Dateien usw. ). 

So könnte ein Dockerfile für eine minimale Ubuntu-Umgebung aussehen, die curl, vim und git enthält: 

```
# Verwenden des offiziellen Ubuntu-Images als Basis
FROM ubuntu:latest

# Aktualisieren der Paketlisten und Installieren von Paketen
RUN apt-get update && apt-get install -y \
    curl \
    vim \
    git

# Setzen des Arbeitsverzeichnisses
WORKDIR /app

# Optional: Hinzufügen von Dateien oder Verzeichnissen vom Build-Kontext in den Container
COPY . /app

# Optional: Befehl, der beim Start des Containers ausgeführt wird
CMD ["bash"]
```

Mit diesem Dockerfile kann ich das Image (die "Umgebung") bauen und anschließend starten: 

```
docker build -t my-workplace .
docker run -dit --name my-container my-workplace /bin/bash
```

Nun kann ich beliebige Befehle in diesem Container ausführen, z.b. `curl` oder `vim` (die Sinnhaftigkeit dieses Projekts lassen wir mal beiseite...)

```
docker exec mein-container curl http://www.robotmk.org
docker exec mein-container vim my-personal-notes
```

Selbstredend bietet mir der Container nur das, was gemäß Dockerfile installiert wurde - alle anderen Aufrufe scheitern: 

```
docker exec mein-container node meine_app.js
node: command not found
```

Lokal ist das ganze nur halb so spannend. Stell Dir vor, ich hätte im Dockerfile eine komplexe Applikaiton insrtalliert/jkonfiguriert. 
Du, lieber Leser, könntest damit auf Deiner Maschine das Image nachbauen und einen binär identischen Container hochfahren. 
Sehr cool! 

### Wie RCC funktioniert 
