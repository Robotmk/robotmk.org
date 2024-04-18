---
title: "RCC: Your Ultimate Tool for Effortless Python Environment Management in Robotmk"
slug: "rcc-the-ultimate-tool-for-robotmk"
#menutitle: 

lead: Alles was Du über die Ausführung von Robot Framework durch Robotmk wissen musst.
date: "2024-04-16T15:49:17+02:00"
categories:
  - ""
tags:
  - ""
authorbox: true
sidebar: true
pager: false
#menu: main
#weight: 10
author: "Simon Meggle"
thumbnail: "rcc-environments.webp"
---





<!--more-->

## Einführung

In meinen Schulungen pflege ich immer zu sagen: Robotmk ist eigentlich nur ein großer Wrapper um das Robot Framework. Robot Framework und seine Libraries sind allesamt in Python geschrieben (nun ja, nicht alle, mehr dazu gleich) und werden über pip auf dem Testsystem installiert, damit Robotmk sie dort verwenden kann.

Bist du bereits Anwender von Robotmk v1? Dann hast du das Robot Framework und die Libraries sicher bisher im Betriebssystem installiert. Das funktioniert, ist aber schlecht, weil du damit alle diese Pakete auf eine bestimmte Version festnagelst. Sobald du eine Robot-Suite hast, die eine bestimmte Library in einer anderen Version brauchst, hast du ein Problem, denn du kannst ein Python-Package immer nur in einer bestimmten Version auf dem System installieren.

An dieser Stelle denkt man intuitiv schnell an virtualenv. Das ist ein kleines nützliches Python-Tool, mit dem man kleine voneinander sauber getrennte Python-Umgebungen erzeugen und verwenden kann. Allerdings ist das Problem nur für die Python-Welt gelöst. Ein prominentes Beispiel ist die Browserlibrary: Sie ist zwar selbst in Python geschrieben, spricht aber über JavaScript mit dem Playwright-Framework, welches über NodeJS installiert wird. Die Anforderung ist also nicht nur, Python-Umgebungen voneinander zu isolieren, sondern auch NodeJS-Umgebungen.

Ja, ich weiß... hierfür gäbe es dann "nodeenv", womit auch NodeJS-Umgebungen abstrahiert werden können. Aber das alles zu automatisieren, endet in einem Rabbit Hole – und darin, dass man das Rad noch einmal erfindet. Denn genau vor dem beschriebenen Problem stand bereits die Firma Robocorp. In diesem Artikel xxxx kannst Du mehr über Robocopr erfahren. Hier soll es nur um RCC gehen. 

## RCC verstehen

### Analogie zu Docker

Docker-Container sind leichtgewichtige, portable Einheiten, die Software und alle ihre Abhängigkeiten enthalten. Das ermöglicht den Betrieb von Anwendungen konsistent auf verschiedenen Umgebungen/Plattformen.  

> Ein `Dockerfile` beschreibt, wie das einem Container zugrunde liegende "Docker-Image" konkret auszusehen hat: das Betriebssystem, zu installierende Software, Konfigurationsbefehle, bereitgesteltle Dateien usw.

Ein Beispiel (achte nicht auf Details, die sind nicht so wichtig):

```bash
FROM ubuntu:latest
RUN apt-get update && apt-get install -y \
    curl \
    vim \
    git
CMD ["bash"]
```

Mit diesem Dockerfile kann ich eine Blaupause ("Image") namens `my-workplace` bauen und einen ersten Container mit dem Namen `my-container` davon starten.

```bash
docker build -t my-workplace .
docker run -dit --name my-container my-workplace /bin/bash
```

Angenommen, ich hätte weder `vim` noch `curl` auf meinem Host-Betriebssystem, so könnte ich dennoch diese Befehle im Container-Betriebssystem ausführen:

```bash
docker exec mein-container curl http://www.robotmk.org
docker exec mein-container vim my-personal-notes
```

Alles, was Du brauchst, um dieses Beispiel auf Deinem Host nachzustellen, ist das `Dockerfile`. Es spezifiziert, was in dem Image laufen soll. 

Wenn Du das verstanden hast, weißt Du, wie RCC funktioniert. 

### Wie RCC funktioniert 


