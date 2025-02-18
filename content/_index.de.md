---
# header (hero)
header:
  title: '**Test** like a **Robot**.<br>**Monitor** like a **Pro**.'
  hero_img: '/images/index/cmk-hero-bg.jpg'
  content_index: 1

# introduction section
introduction:
  heading: 'Was ist **Robotmk**?'
  content_index: 2

# # LR Animation
# lr_animation:
#  - title: 'Create Runtime metrics.'
#    subtitle: "Graph what you're interested in"
#    text: 'Which elements of a Robot test (suites, tests, keywords) are to be recorded in Checkmk-graphs, can be determined via a sophisticated, pattern-based rule system. <br> After all, the whole is expected to remain clearly structured.'
#    img: '/images/index/robotmk_runtime_animated_1.gif'
#    img_alt: 'animated gif' 
#  - title: 'Monitor runtimes.'
#    subtitle: 'As much as you want, at any level'
#    text: "In Robotmk the runtimes of all test elements are available for evaluation. <br> Here too, pattern based WATO rules allow to set runtime thresholds of Robot suites, tests and keywords."
#    img: '/images/index/robot_wato_runtime.png'
#    img_alt: ""
#  - title: 'Detect functional disruptions.'
#    subtitle: 'Murphy is always waiting around the corner'
#    text: "With Robotmk, functional faults in applications can be detected safely and proactively - far before users notice anything. <br> (Wouldn't it be nice to be in a position where you can say on the phone, &quot;We're already on it.&quot; ...?)"
#    img: '/images/index/broken_image.jpg'
#    img_alt: "You don't see anything here, this is correct :-)"
# features section
features_title: 'Features' 
features_description: 'Warum Sie sich für Robotmk und Robot Framework, die „Lingua franca“ der Testautomatisierung entscheiden sollten:'
features:
- heading: 'Zentrale webbasierte Konfiguration via Checkmk'
  icon : 'fa fa-gears'
  text: 'Die Ausführung von Robot Framework Suites wird komplett über das **Checkmk-Regelwerk** konfiguriert.'  
# - heading: 'Flexible output formatting'
#   icon: 'fa fa-crop'
#   text: '**Robotmk** evaluates intricately interleaved Robot results; the **pattern-based reduction** of the output to the essential ensures an optimum result.'  
- heading: 'Wartungsfreundlich'
  icon: 'fa fa-volume-up'
  text: 'Der einzigartige **Keyword-Driven-Ansatz** von Robot Framework abstrahiert die technische Implementierung von der Ausführungslogik. Ihre Testfälle bleiben **lesbar** und **wartbar**, unabhängig von ihrer Komplexität.'  
- heading: '100% Robot compatible'
  icon: 'fa fa-handshake-o'
  text: 'Der Einsatz von **Robotmk** erfordert keine Anpassung an bestehende RobotFramework-Tests; jeder Robot-Test kann **direkt** in Checkmk integriert werden.'  
- heading: 'Performance monitoring'
  icon: 'fa fa-area-chart'
  text: '**Robotmk** macht aus Robot Framework ein Werkzeug zur kontinuierlichen Überwachung der Applikationsperformance. Die grafische Aufzeichung von Laufzeiten erlaubt proaktives Handeln, noch lang bevor sich User beschweren. '  
- heading: 'Monitoring aus der Benutzersicht'
  icon: 'fa fa-binoculars'
  text: 'Dort wo **Checkmk** aufhört, beginnt die Welt von **Robotmk**. Robotmk ist die ideale Ergänzung für eine holistische Sicht auf **Funktion** und **Performance** kritischer Applikationen.'
- heading: 'Library-Konzept'
  icon: 'fa fa-book'
  text: "Das **Library concept** macht Robot Framework zu einem **Universalwerkzeug**: Web, Desktop, REST, SAP, FTP, Kubernetes, Android, iOS, ... - Libraries für jeden Use Case." 
- heading:   'Strong community'
  icon: 'fa fa-comments-o'
  text: 'Schließ Dich einer **Community** von knapp 40.000 Robot Framework-Usern an. Erhalte Hilfe. Automatisiere.'  
- heading:   'Platform-independent'
  icon: 'fa fa-arrows-alt'
  text: 'Robot Framework basiert auf Python und läuft deshalb auf **allen gängigen Betriebssystemen**.'  



# # intro MK program certification - section 2
# intro_mk_program:
#   heading: 'Introducing the <br> **Robotmk Academy Certification Program.**'
#   subheading: 'Supercharge Your Monitoring Skills.'
#   text: '**Do you want to...**  <br> 
# ...write robust web tests?  <br>
# ...finally understand and use CSS selectors?  <br>
# ...monitor any kind of Windows application?  <br>
# ...want to learn which are the most useful Robot Framework libraries?  <br>
# ...reuse robot code with the help of Git?  <br>
# ...see how easy Robot Framework tests can be debugged?  <br>
# ...learn how to program robots which are stable and maintainable?  <br>
# ...get worthful bonus material, checklists and exercises?  <br>
# <br>
# ✅ **...learn from an industry expert?**'
#   lower_title: "**Then don't miss out!** <br> Be among the first to experience the upcoming"

# faq
faq:
  - question: 'Was benötige ich, um mit Robotmk und Robot Framework starten zu können?'
    answer: 'Robotmk bildet seit 2022 den technischen Unterbau von Checkmk Synthetic Monitoring. Deshalb ist eine Checkmk-Installation natürlich Voraussetzung. Für kleine Installationen und zum Ausprobieren von Checkmk reicht die Trial-Version, die man [hier](https://checkmk.com/download/trial) herunterladen kann. '
  - question: 'Benötige ich Programmierkenntnisse, um Robotmk zu nutzen?'
    answer: 'Grundkenntnisse im Umgang mit Robot Framework sind hilfreich, aber durch die verständliche Syntax sind auch Einsteiger schnell produktiv. Die Keyword-Driven-Syntax von Robot Framework dient genau für den Zweck, komplexen Python-Code zu verbergen.'
  - question: 'Wie muss ich einen Windows/Linux-Host für den Einsatz als Test-Host vorbereiten?'
    answer: 'Gar nicht. Die Installationspakete für die Test-Hosts werden von Checkmk erstellt, inclusive Konfiguration, Scheduler, Robot-Files und auch einer ausgefuchsten Technologie, um die Python-Laufzeitumgebungen quasi aus dem Nichts zu erstellen.'
  - question: 'Wie kann ich Applikationen über Citrix mit Robotmk testen?'
    answer: 'Die Citrix-Sitzung kann zunächst z.B. mit einer Web-Library aufgebaut werden. Sobald Citrix startet, kann eine Library zur Bildmustererkennung eingesetzt werden, die komplett agnostisch vom Bidlschirminhalt arbeiten kann. Auch RDP-Sitzungen können damit getestet werden.'
  - question: 'Was muss ich tun, um bestehende Robot Framework-Tests integrieren zu können?'
    answer: 'Für die Integration bestehender Robot-Suites ist keinerlei Anpassung erforderlich.'
  - question: 'Wo kann ich Robotmk herunterladen?'
    answer: 'Robotmk ist fester Bestandteil von Checkmk und kann [hier](https://checkmk.com/download/trial) heruntergeladen werden.'
  - question: 'Wer steht hinter Robotmk?'
    answer: 'Robotmk wurde 2020 von Simon Meggle (ELABIT GmbH) entwickelt und zunächst als Open-Source-Erweiterung für Checkmk veröffentlicht. Seit 2022 arbeitet Simon als Produktmanager "Synthetic Monitoring" für Checkmk, sowie in seiner eigenen Firma als Consultant und Trainer für Robotmk und Robot Framework.'
  - question: 'Welcher Unterschied besteht zwischen Robotmk und Synthetic Monitoring?'
    answer: 'Synthetic Monitoring ist ein feststehender Fachbegriff für das automatisierte, wiederholte Simulieren von Benutzerinteraktionen mit Benutzeroberflächen und zugleich der Produktname in Checkmk. Robotmk ist der Name der konkreten technischen Umsetzung für Checkmk.'
  - question: 'Woher bekomme ich professionellen Support?'
    answer: 'Support für Robotmk leistet die [Checkmk](https://checkmk.com) GmbH. Für Consulting und Training zu Robotmk und Robot Framework zeichnet die [ELABIT](https://elabit.de) GmbH verantwortlich. ELABIT ist seit 2024 außerdem akkreditierter Trainingspartner für das [RFCP](https://cert.robotframework.org)-Examen.' 
quote:
  text: 'A journey of a thousand miles <br> **begins with the first step.**'
  credit: '(Chinese saying)'
prefooter:
  hero_img: '/images/index/prefooter_CheckMK_web_banner.jpg'
  releases: 'https://github.com/simonmeggle/robotmk/releases'
---

---

Die offizielle Integration von<br>
**Robot Framework** in<br>
**Checkmk Synthetic Monitoring**.<br>
<br>
<br>⭐️⭐️⭐️⭐️⭐️<br><br>
✔ 100% Robot Framework. <br>
✔ 100% Checkmk integration. <br>
✔ 100% End User Experience Monitoring. <br>


---

![What is Robotmk](/images/index/home-introduction-banner-what-is-robotmk.png)

**Robotmk** verbindet die Leistungsfähigkeit des **Robot Frameworks** mit der Präzision von **Checkmk** – für eine nahtlose End-to-End-Überwachung Ihrer businesskritischen Anwendungen aus der Perspektive der Endbenutzer.

Mit **Robotmk** verwandeln Sie das **Test-Tool** Robot-Framework in ein **mächtiges Universal-Monitoringwerkzeug**.


