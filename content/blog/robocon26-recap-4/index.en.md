---
draft: false
title: "Robocon 2026 - Recap (Part 4)"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
commentid: robocon26-recap-4
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

This is **Part 4** of the six-part review of Robocon 2026 in Helsinki.

<!--more-->

---

➛ Back to **[Part 3]({{< ref "/robocon26-recap-3/" >}})**  
➛ Continue to **[Part 5]({{< ref "/robocon26-recap-5/" >}})**

---

### Automation with Image Recognition Libraries

{{< portrait src="img/Helio2.png" alt="Hélio Guilherme" >}}

**Hélio Guilherme** is an expert in the field of image-based test automation. He has been working with Robot Framework since 2008 – initially at Nokia Networks in Lisbon – and is now Lead Developer and Maintainer of the Robot Framework IDE [RIDE](https://github.com/robotframework/RIDE/) as well as Maintainer of the [SikuliLibrary](https://marketsquare.github.io/robotframework-SikuliLibrary/).  
With a wink, he describes himself as someone who doesn't know whether he is "*a software tester who likes to do software development, or a software developer who likes to do software testing*". 😉

His session offered an in-depth **comparative analysis** of two prominent image recognition libraries for Robot Framework: **SikuliLibrary** and **ImageHorizonLibrary**.  
These libraries are indispensable for desktop testing when API-based technologies are not available – for example, with legacy UIs or RDP/Citrix connections.

![alt text](img/talk-helio.png)

#### Sikuli

[SikuliLibrary](https://github.com/MarketSquare/robotframework-SikuliLibrary) is based on the Java framework SikuliX and uses [Robot Framework Remote](https://github.com/robotframework/RemoteInterface) to connect Python functions with the Java libraries.  
A key advantage: it offers **Optical Character Recognition (OCR)** – text recognition directly from images.  

The workflow: import library, *start server*, define path to reference images, start Application Under Test (AUT), perform interactions (mouse, keyboard, image comparison, OCR), *stop server*.  
It is generously equipped with **78 keywords**. The catch: you need a Java Runtime Environment in your system. 

#### ImageHorizonLibrary

The [ImageHorizonLibrary](https://github.com/eficode/robotframework-imagehorizonlibrary), on the other hand, relies on native Python modules such as `pyautogui` and optionally `opencv-python` for more precise image recognition (which also allows a percentage "similarity" value).  
It is leaner – **34 keywords** – and does not include OCR functionality.  
The big advantage: no Java overhead, direct use possible. The workflow is similar to that of the SikuliLibrary, only without the server component.

#### Comparison

Both libraries are **operating system independent**, but require consistent screen resolutions for reproducible tests.

> *Note from my experience: the primary problem with image recognition is not **resolution**. An 80x30 pixel button has these dimensions on an 800x600px display as well as on a 4K display – it remains 80x30 pixels.  
What has a much greater influence on test stability is how the application changes its **layout under different resolutions**, or rather, space conditions.  
This is because certain navigation elements may be hidden for space reasons, for example.*

Hélio emphasised that the choice of library depends on the specific use case: Do you need text recognition from screenshots? Then SikuliLibrary. Are you looking for lean, purely Python-based image comparisons? Then ImageHorizonLibrary.

One critical point Hélio addressed: The **future of SikuliLibrary** depends on the underlying SikuliX project, whose maintainer has paused development.  
Unfortunately, the fully Python-integrated version **sikulix4python**, which author Raimund Hocke wanted to develop, has also come to nothing. 

👉 **Conclusion**  
What made me particularly happy: On Tuesday, I had the pleasure of meeting **Jhoiss Baloi**, who **forked** the no longer maintained ImageHorizonLibrary and has since **further developed** it.  
He even integrated my [pull request for edge detection](https://www.robotmk.org/en/blog/imagehorizon-edgedetection/) and announced that he would release the library under a new name.  
This is great news for everyone who relies on this lean, Python-based solution!  
Personally, I find the Java foundation of the SikuliLibrary too extensive, so I am very happy about this development.


---

### Integrating Robot Framework into your business strategy

{{< portrait src="img/markus.png" alt="Markus Stahl" >}}

Markus Stahl's presentation addressed challenges that many companies are familiar with:

- How can an open-source tool like Robot Framework be integrated into traditional evaluation processes in companies?
- Especially when there is no company behind it that offers enterprise support?
- How can you mitigate the risks of adopting a free tool whose ecosystem is based on a multitude of other free projects?

Markus presented a **five-step plan** that shows companies how they can not only use Robot Framework, but also strategically integrate it into their business model – while contributing to the ecosystem for their own direct benefit.

**Step 1: Fund the project (Fund it)**  

The question often arises very early on: *Who actually pays for the maintenance and further development of Robot Framework?*  
Markus explained how the [Robot Framework Foundation](https://robotframework.org/foundation/) works and where the money is invested – about two-thirds of the conference costs are covered by the Foundation, with the rest coming from ticket sales.  
The challenge: convincing companies to become members is no easy task. Traditional added value such as SLAs or premium support is lacking. In addition, the roadmap is defined by the community and the project's purpose, not by paying members. Not all "decision-makers" understand this.

**Step 2: Contribute a tool/extension (Contribute a Tool/Extension)**  

At some point, you will find yourself programming an extension.  
Companies can publish useful tools they have developed for themselves as open source – prominent examples are [PlatynUI](https://github.com/imbus/platynui-sut), [RoboSAPiens](https://github.com/imbus/robotframework-robosapiens) and [KeyTA](https://pypi.org/project/robotframework-keyta/1.0.10/).  
The risk: if no external contributors are found in the medium to long term, the company will have to permanently commit resources to a non-core business project. Consulting firms tend to have a greater incentive here.

**Step 3: Contribute a feature**  

Instead of developing an entire tool, you can also implement specific missing functions in the RF core and submit them as a pull request.  
An example: **German Air Traffic Control** paid for and had the RobotFramework feature [custom test metadata](https://github.com/robotframework/robotframework/issues/4409) implemented.  
Such projects are also ideal for promoting young talent – junior developers gain valuable experience with open source.

**Step 4: Offer support**  

Companies can offer professional support for open source tools that they or their customers depend on.  
Services can include tool mirroring and the provision of emergency fixes within the framework of SLAs.  
These fixes should then be fed back into the original project as a contribution.  
Markus emphasised that new regulations such as **DORA** and **CRA** should be taken into account here.

**Step 5: Be open about it**  

The final, often underestimated step: **communicate openly** that you use and support open source.  
Being proud of your own involvement inspires others and strengthens the ecosystem.

Markus used the attention at the end of his presentation to promote a **new open source governance working group**, which aims to gather the expertise of the community and establish recommendations for Robot Framework and ecosystem projects.

👉 **Conclusion**  
The presentation was an **inspiring encouragement** for anyone who wants to convince their employer to invest more in open source. It offered concrete, practical ways to do so.  
The message was clear: there are more options than just "sponsorship" or "sacrificing free time".

---

### Medusa: Resource-aware parallel suite execution made easy

**Edin Tarić**

Edin's session addressed a problem familiar to many teams with extensive test suites: **How can tests be parallelised effectively when there is a risk of resource conflicts?**

**INSYS** is a manufacturer of industrial routers whose software is tested on the devices every day – **1500 tests** that would take **up to 60 hours** to run sequentially!  
This is an untenable situation with daily build increments.  
Of course, parallelisation with [pabot](https://pabot.org/) immediately comes to mind. But the team quickly reached its limits here.

![alt text](img/talk-medusa.png)

The **problem**: Many of the test suites require exclusive access to specific resources – such as a particular device in the network, a specific port or physical resources such as DSL connections, which cannot be used multiple times in parallel.  
Pabot with manually written ordering files quickly became confusing and inefficient with over 1,000 tests.  
Attempts to automate the ordering file failed: dynamically avoiding resource conflicts is simply not what pabot was designed for.

**Medusa** was explicitly developed around the idea of **resource dependencies**.  

Each suite declares its resource dependencies as **metadata**, and Medusa automatically determines at runtime which suites can start in parallel – this maximises time efficiency and avoids conflicts.

In addition to the dependencies, each suite is assigned to a **stage**: Stages are **sequentially executed groups** within which the suites run in parallel as described.  
This allows you to maintain the necessary control over the order where it matters.

Suites can also be executed multiple times with **different variables** – even with different dependencies or stages.  
This significantly reduces code duplication when you want to use a suite for multiple targets or variants.

Technically, Medusa functions as a **wrapper** around Robot Framework: Almost all Robot options are accepted and passed on to the processes that execute the individual suites.  
This means that **listeners, pre-run modifiers** and other extensions all remain usable.  
In the end, Medusa uses `rebot` to seamlessly merge the results of all suites – even with massive parallelisation.

👉 **Conclusion**:  

Perfect timing, Medusa was released as open source just in time for RoboCon 2026.  
For anyone struggling with large test suites and resource conflicts, Medusa could be just the solution they've been waiting for.  
A pragmatic approach that addresses a real problem with a well-thought-out solution. I found the system immediately intuitive. 

---

### From Batter to Better: Pancakes as Testing

{{< portrait src="img/kelby.png" alt="Kelby Stine" >}}

{{< portrait src="img/elout.png" alt="Elout van Leeuwen" >}}

**Kelby Stine** and **Elout van Leeuwen** presented one of the most entertaining sessions at RoboCon 2026.  **Pancake baking as a metaphor for test automation** – making abstract concepts tangible in a refreshing way.

The stage was set accordingly: a table with a hotplate, frying pan, ingredients – and both speakers wearing aprons.  

Murmurs from the audience. 

*What's about to happen here?*

![alt text](img/talk-pancakes.png)

The presentation began with a simple confession: 

Both of them love **pancakes**.  

And then they set about preparing the batter using **two different recipes** – each in their own way.  
The different preparation methods were displayed in parallel as **Robot Framework pseudocode** on the screen.  
A brilliant visual idea that clearly highlighted the parallels.

> *Netherlands 🇳🇱 meets the US 🇺🇸 ... Personally, I was more of a fan of Elout's simple recipe – except for the handful of salt he theatrically threw into the dough under the spotlight 😅.  
But that was part of the show, of course, because for safety reasons, no actual cooking was allowed on stage; the dough was purely for demonstration purposes.*

The **core idea** of the session: there are structural **analogies** between cooking recipes and the keyword-driven approach of Robot Framework. The keywords describe abstractly what needs to be done and encapsulate all the details that a tester/pancake cook does not explicitly care about.  

In both cooking and testing, **ingredients**, **environment**, **setup** and **cooking steps** are central.  

Both emphasised: *"Make sure variables are OK. Otherwise it will break."* – a statement that naturally applies equally to dough and code.  
(Just today, I baked bread myself again and had to think about this while kneading the dough 😉).

Another nice detail: **pancakes are available all over the world** – representing the international community.  
There is no pancake recipe that is better than another – just as there is no automation solution that is best for all scenarios.  

The **toolset** also varies: some rely on parallelisation – visualised by a large hotplate with many pans.  
Others prefer sequential processes.  
Both are legitimate, both have their place.

Finally, the topic of **reporting** was addressed:  
*"HOW WOULD YOU LIKE YOUR TEST RESULTS SERVED?"*  
Various ways of serving pancakes appeared on the screen: with icing sugar, with syrup, with fruit, stacked or individually.  
The message was clear: test results can be prepared and presented in many different ways – depending on the target group and purpose.

It got particularly funny at the end when questions came from the audience – you could tell how the questions were trying to outdo each other:  

*"...When are you taking it to production?"*  
*"...Do you need acceptance testers?"*  

And then **René Rohner** went one better: he critically examined the table and then said dryly:  

*"But it does not seem to be open source – there is no **fork**."*  😅


**Conclusion:**  
The whole thing was entertaining, enjoyable and educational at the same time.  
The session highlighted the **added value of Robot Framework**: namely, that it abstracts the complexity of Python and translates it into a **human-readable language**.  

A wonderful way to convey serious concepts with ease.


---

➛ Back to [Part 3]({{< ref "/robocon26-recap-3/" >}})  
➛ Continue to [Part 5]({{< ref "/robocon26-recap-5/" >}})
