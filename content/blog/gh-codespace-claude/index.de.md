---
draft: false
title: "Claude Code im Codespace für Robot Framework einrichten"
# --- Italic subheading
lead: "Wie du Claude Code fit für den RF-MCP-Server machst"
# -- giscus id to match comments
commentid: gh-codespace-claude
# -- predefined URL
# slug: 
# -- for posts in menubar, use this (shorter) title
# menutitle: 
#description: "Claude Code im Codespace: Anleitung, Workarounds und Beispiele für Robot Framework" 
date: "2026-05-20T10:00:00+02:00"
categories:
  - tutorials
tags:
  - codespaces
  - claude
  - rmk-starter
  - robotframework
  - mcp
authorbox: true
sidebar: true
pager: false
#menu: main
#weight: 10
# --- must be in the leaf bundle folder or static
thumbnail: img/vsc-gh-cl.png
vgwort: https://vg04.met.vgwort.de/na/37d2e70759c24e29895305147a51765c
translationKey: "gh-codespace-claude"
---

Robot Framework Code von ChatGPT schreiben lassen? Das funktioniert nicht wirklich gut.  
Der **MCP-Server** für Robot Framework hilft hier weiter, weil er die zu testende Seite "versteht" und jeden Schritt validieren kann.  
Im [Robotmk-Starter Repo](https://www.robotmk.org/en/blog/rmk-starter/) kannst Du ihn mit Copilot direkt ausprobieren; für die Nutzung mit **Claude Code** im Codespace sind ein paar Kniffe notwendig -  in diesem Tutorial zeige ich dir, wie es geht.

<!--more-->

---

## Das Robotmk-Starter Repo

Das [Robotmk-Starter Repo](https://www.robotmk.org/en/blog/rmk-starter/) ist eine Sammlung von sofort lauffähigen Robot Framework Beispielen, Templates und Labs.  

Ich habe das Starter-Repo in einem eigenen Artikel ausführlich vorgestellt, hier findest du die wichtigsten Informationen: [Robotmk-Starter: Sofort loslegen mit Synthetic Monitoring](content/blog/rmk-starter/index.de.md).

---

## ChatGPT vs. MCP-Server

### Warum ChatGPT nicht ideal ist

ChatGPT ist ein großartiges Tool, aber es ist gänzlich ungeeignet, um dmait ganze Robot-Tests/Suites generieren zu lassen.  
Es kennt nicht die Applikation, die Du testen willst, und wird teilweise auch sehr "kreativ" beim Erfinden von Keywords und gar ganzen Libraries.

> **Das Ergebnis**: Frust, vertane Zeit, und im schlimmsten Fall sogar fehlerhafte Tests, die in Produktion gehen.

### MCP: Der "USB-Bus"

Ein MCP-Server (*Model Context Protocol*) kapselt bestimmte Fähigkeiten (z.b. Keywords finden, Szenario analysieren, Testfall generieren, Keyword ausführen etc.) und stellt sie beliebigen KI-Agenten über eine einheitliche API zur Verfügung.  

Nicht umsonst nennt man MCP Server auch den "USB-Standard" für KIs.

---

## RF-MCP

**Many Kasiriha** hat einen solchen für [Robot Framework](https://github.com/manykarim/rf-mcp) gebaut, den **RF-MCP**.

### Nutzung von RF-MCP mit Copilot und Claude Code

Im [RF-MCP-Lab](https://github.com/robotmk/lab-rf-mcp) kannst Du sowohl **Github Copilot** als auch **Claude Code** den Einsatz von KI mit Robot Framework ausprobieren.  
Für beide Agenten habe ich die Konfigurationsdateien vorbereitet. Im wesentlichen sind es nur zwei Dateien, mit denen man den Agenten den MCP-Server bekannt macht (achte auf die Verzeichniss): 

Copilot: `.vscode/mcp.json`


```json
{
  "servers": {
    "robotmcp-vsc": {
      "type": "stdio",
      "command": "/root/.rcc-env/bin/python",
      "args": ["-m", "robotmcp.server"],
      "env": {
        "PATH": "/root/.rcc-env/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
      }
    }
  }
}
```

Claude Code: `.mcp.json`

```json
{
    "mcpServers": {
        "robotmcp-claude": {
            "type": "stdio",
            "command": "/root/.rcc-env/bin/python",
            "args": [
                "-m",
                "robotmcp.server"
            ],
            "env": {
                "PATH": "/root/.rcc-env/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            }
        }
    }
}
```

(Ich habe den MCP-Servern zur Sicherheit sprechende Namen gegeben, damit sie unterscheidbar sind.)

Da **Copilot** direkt in VS Code integriert ist, registriert es dank der JSON-Datei den MCP-Server sofort.  

**Claude Code** hingegen muss erst als Extension installiert werden - und die Anmeldung im Codespace gestaltet sich ein wenig, sagen wir: hakelig. Aber mit diesem Tutorial bekommst Du es hin. 

**Voraussetzungen:**

- GitHub‑Account
- Eine Claude-Subscription (Pro Plan bzw. API)

--- 

### Schritt 1: Authentifizierung einleiten

Gehe auf das [Robotmk-MCP-Lab](https://github.com/robotmk/lab-rf-mcp) und starte den Codespace.  
Warte, bis die Umgebung vollständig aufgebaut ist.

{{< figure src="img/finished.png" title="Fertige Umgebung" >}} 

Sobald der Codespace bereit ist, sollte rechts unten ein Hinweis erscheinen, der Dir die Installation der Claude Code Extension für VS Code empfiehlt.  

Klicke darauf und installiere die Extension.

{{< figure src="img/recommendation.png" title="Empfehlung zur Installation von Claude nach dem Start des Codespaces" >}} 

Klicke nun im rechten Seitenpanel auf den Tab "**CLAUDE CODE**" (nicht auf den "CHAT"-Tab, der ist für Copilot):

{{< figure src="img/claude-tab.png" title="" >}} 

Klicke auf **"Login with Claude.ai Subscription"** und wähle **"Copy"**, um den Auth-Link zu kopieren.

{{< figure src="img/msg-auth-link.png" title="" >}} 

--- 

### Schritt 2: VNC-Session starten

Öffne das `Ports`‑Panel im Codespace und starte den noVNC‑Port (Globus‑Icon):

{{< figure src="img/vnclink.png" title="Öffnen des VNC-Ports" >}} 

Per Rechtsklick auf den Desktop kannst Du den Browser (Firefox) starten:  

{{< figure src="img/desktop.png" title="Starten des Browsers im noVNC-Desktop" >}}

--- 

### Schritt 3: Anmelden

Füge jetzt den kopierten **Auth‑Link** in den Clipboard-Manager von NoVNC (linker Bildschirmrand) ein; danach kannst Du ihn in die die Adresszeile des Browsers einfügen.

{{< figure src="img/clipboard-paste.png" title="NoVNC: Kommunikation mit der Zischenablage über Zwischenschritt. Einfügen des Auth-links" >}} 

Jetzt meldest Du Dich auf der Claude.ai-Seite mit Deiner E‑Mail-Adresse an.  
Du erhältst danach per E‑Mail einen Link, mit dem Du einen **6‑stelligen Code** generieren kannst.  
Gib diesen Code nun im VNC-Browser ein.  

Nach einem Click auf "Authorize" solltest Du sehen, dass das Chat-Widget in VS Code (Codespace) nun **aktiviert** ist - die Anmeldung hat geklappt: 

{{< figure src="img/chatwindow.png" >}} 

---

### Schritt 4: Test 

Hat Claude nun Zugriff auf den MCP-Server? Das kannst Du ganz einfach testen, indem Du im Chat-Fenster `/mcp-servers` eingibst.  
Du kannst damit auch alle registrierten Tools und Fähigkeiten abfragen:

{{< figure src="img/mcp-running.gif" title="Der Befehl '/mcp-servers' listet alle registrierten MCP-Server auf" >}} 

---

### Wie geht es jetzt weiter?

Stay tuned, hier im Blog wird es in den nächsten Wochen weitere Artikel geben, in denen ich zeige, wie man mit Claude Code und dem RF-MCP-Server Robot Framework Tests generieren und ausführen kann.

---

## Fazit

**VS Code, Github und Copilot** sind aus dem gleichen Hause - und das merkt man in Szenarien wie diesen besonders: Die Integration von Copilot in VS Code ist quasi "*Batteries included*".

Nichtsdestotrotz lässt sich mit der hier beschriebenen Methode auch **Claude Code** anbinden.  

Das ist unter anderem deswegen toll, weil Microsoft aktuell (mitte Mai) ziemlich übel am Copilot-Pricing schraubt - und Nutzer mit aufgebrauchtem Kontingent auf Anfang Juni vertröstet werden.  
Das dürfte ziemlich viele Entwickler in Richtung Gemini oder Claude treiben... 


👉 Hat die Einrichtung geklappt? Schreib mir gern einen Kommentar: