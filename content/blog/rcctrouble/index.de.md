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
vgwort: 1360506dbdd3408db23ff8cf26aa26e4
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

---

### LongPath Support

**Fehler:** Beim Aktivieren der erforderlichen LongPath-Unterstützung mit `rcc config longpaths -e` erscheint diese Fehlermeldung:

```
WARNING! Long path support failed. Reason: exit status 1. WARNING! Long paths do not work!

Error executing: rcc.exe configure longpaths --enable 
Error code: undefined Error: error Stderr: Failure to modify registry: Access is denied.
```

**Beschreibung:** Offensichtlich wird der Windows-Rechner zentral über Gruppenrichtlinien verwaltet, wodurch die LongPath-Richtlinie nicht geändert werden kann.  

**Lösung:** Bitte den für die GPOs zuständigen Administrator, diese Richtlinie zu setzen:
`Local Computer Policy > Computer Configuration > Administrative Templates > System > Filesystem > NTFS > Enable Win32 long paths > Enabled`

---

### Netzwerkzugriff per Proxy

**Fehler:** Während der Erstellung der Umgebung schlägt RCC aufgrund von Netzwerkfehlern fehl.

**Beschreibung:** RCC benötigt **Internetzugang**, um die Installationsdateien und -pakete herunterzuladen.[^1]
Wenn ein Proxy-Server im Netzwerk verwendet wird, musst Du diesen in einem "Profil" angeben.

**So geht's:**

- Lade zunächst die Datei (Vorlage) von <i class="fab fa-github"></i> [hier](https://github.com/Robotmk/level1-code/blob/main/conf/rcc_proxy_profile.template.yaml) herunter und speichere sie irgendwo im Dateisystem.
- Öffne die Datei mit einem Editor und gib die Adresse des Proxys in `http_proxy` und `https_proxy` an. (Protokoll und Port müssen ebenfalls angegeben werden!)

[^1]: ab Checkmk 2.4 wird auch der [Import von Umgebungen als ZIP-Datei] (<https://docs.checkmk.com/latest/de/robotmk.html?lquery=rcc#ziparchive>) unterstützt.

Beispiel:

```yaml  { lineNos="true" wrap="true" title="rcc_proxy_profile.yaml"}
name: MyProxy
description: RCC proxy profile
settings:
  certificates:
    verify-ssl: true
  network:
    no-proxy: 'localhost,127.0.0.1'
    https-proxy: 'http://myproxy.local:3128'
    http-proxy: 'http://myproxy.local:3128'
  meta:
    name: MyProxy
    description: RCC proxy profile
    source: Robotmk
```

- Führe anschließend die folgenden Befehle aus, um das Profil zu importieren und zu aktivieren.

```cmd { lineNos="false" wrap="true" title="RCC profile activation"}
> rcc config switch # zeigt das aktuelle Profil an (Standard)
> rcc config import -f <Datei>.yaml # importiert das Proxy-Profil
> rcc config switch -p <Profilname> # zum neuen Profil wechseln
```

Reset auf das **Standardprofil** (= kein Proxy) ist möglich mit  

`rcc config switch --noprofile`.

**Hinweis:** Der oben beschriebene Ansatz funktioniert nur, wenn der verwendete Proxy **alle Domains** prinzipiell/weitestgehend zulässt (→ man spricht dann von einem "transparenten" oder "offenen" Proxy).
Sogenannte "*Whitelisting*"-Proxys sind da schon restriktiver: Sie verwenden eine **Liste erlaubter Domains**; jeglicher sonstiger Datenverkehr wird **standardmäßig** blockiert.  

Wenn dies bei Dir der Fall ist, musst Du den Proxy-Administrator bitten, die folgenden Domains in die Whitelist aufzunehmen:

```
anaconda.org
conda.anaconda.org
files.pythonhosted.org  
pypi.org
registry.npmjs.org  
playwright.azureedge.net  
playwright-akamai.azureedge.net  
playwright-verizon.azureedge.net
github.com
githubusercontent.com
raw.githubusercontent.com
```
