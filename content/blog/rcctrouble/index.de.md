---
draft: false
title: "RCC Troubleshooting"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
# commentid: 
# -- predefined URL
# slug: 
# -- for posts in menubar, use this (shorter) title
# menutitle: 
description: Tipps zur schnellen Fehlerbehebung bei der Erstellung von RCC-Environments
date: "2025-05-06T16:02:59+02:00"
categories:
  - tutorials
tags:
  - "rcc"
authorbox: true
sidebar: true
pager: false
#menu: main
#weight: 10
# --- must be in the leaf bundle folder or static
#thumbnail: ""
---

**RCC** ist das Kommandozeilenwerkzeug, um mit dem die Python-Environments für Robotmk Framework gebaut werden können.  
Das praktische dabei: es kommt sowohl bei der Testentwicklung, als auch während der Ausführung durch Robotmk zum Einsatz. Das garantiert, dass die Scripte immer in einer verlässlichen Umgebung laufen.  

Doch manchmal kann es beim Bauen oder Aktivieren der Environments zu Fehlern kommen.  
Dieser Artikel fasst die häufigsten Fehlerquellen bei der Arbeit mit RCC zusammen und zeigt, wie man sie effizient behebt.

<!--more-->

## Environment-Erstellung

### Erstellung der Umgebung schlägt fehl (VCRUNTIME140_1.dll)

Auf einigen Windows-Systemen fehlt die DLL **VCRUNTIME140_1.dll** (der Grund dafür ist unbekannt).
Das beim bau der Environments verwendete Tool **micromamba** bricht die Erstellung der Umgebung mit einer nichtssagenden Meldung ab:

{{< figure src="img/dllerror.png" title="RCC-Fehlermeldung beim Bau von Environments" >}}

Die Ursache kann verifiziert werden, wenn man das in der RCC-Ausgabe aufgeführte Tool **micromamba.exe** manuell auf der Konsole ausführt.  
Fehlt die DLL tatsächlich, erzeugt micromamba diese Fehlermeldung:

{{< figure src="img/vcr.png" title="Micromamba findet VCRUNTIME140_1.dll nicht" >}}

**Lösung:** Installiere das [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022) von Microsoft - es enthält exakt diese DLL.
