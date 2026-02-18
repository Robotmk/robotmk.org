---
draft: false
title: "RoboCon 2026 - Recap (Part 2 - Thursday)"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
commentid: robocon26-recap-2
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
vgwort: https://vg04.met.vgwort.de/na/c01978edca3a4e5b8ef7fa7757eb717e
---

This is **Part 2** of the six-part review of RoboCon 2026 in Helsinki.


<!--more-->

---

➛ Back to **[Part 1 (Tuesday/Wednesday, Workshop & Community Day)]({{< ref "/robocon26-recap-1/" >}})**  
➛ Continue to **[Part 3 (Thursday: Conference Day 1)]({{< ref "/robocon26-recap-3/" >}})**

---

![alt text](img/welcome.png)


## Thursday: Conference Day 1

### Keynote: Community in the age of AI


{{< portrait src="img/miikka.png" alt="Miikka Solmela" >}}

**Miikka Solmela**, Executive Director of the Robot Framework Foundation, opened the conference and his keynote with a question: **What impact does artificial intelligence have on the development of the community?**

The graph Miikka presented was worrying: traffic to the Robot Framework homepage is declining.  
Although no specific data from Slack is available, it seems reasonable to assume that a similar trend is continuing there. 

The reason: before AI existed, we searched for solutions differently – today, the "solution" is just a prompt away. 
There is a danger that people will no longer discuss problems with each other, but will turn directly to AI. 

But working on a challenge is part of the learning process.  
Dialogue with others, the joint struggle to find solutions – this shapes understanding in a way that an immediate AI response cannot.

Miikka made it clear that he did not want to demonise AI.  

But he urged caution. If we do not use AI wisely, we risk the community as we know it today ceasing to exist. 
**The community is our greatest treasure** – and it could suffer greatly from the unthinking use of AI.

His **message** was a call for conscious use:

- Understand AI as a tool, not a substitute for interaction.
- Convenience must not lead us to avoid contact with the community.
- It is the togetherness, mutual learning, challenging and supporting each other that makes the Robot Framework ecosystem strong.

👉 **Conclusion:**  
An opening that gave pause for thought and set the tone for the conference: technology is powerful – but it is up to us to use it in a way that connects rather than isolates.

---

### The RoboCon Effect And The Power Of Contributing

**Gabriela Simion** and **Christoph Singer** (both Imbus AG)

{{< portrait src="img/christoph.png" alt="Christoph Singer" >}}

{{< portrait src="img/gabriela.png" alt="Gabriela Simion" >}}

The presentation told a story that is likely to resonate with the Robot Framework community: **two users become maintainers**.

**Gabriela Simion** and **Christoph Singer** described their personal journey, how attending RoboCon inspired them to not only remain users of Robot Framework, but to become active contributors and ultimately maintainers of the [Appiumlibrary](https://github.com/serhatbolsu/robotframework-appiumlibrary) (see Community Day).  

![alt text](img/talk-robocon-effect.png)

Last year, they took the helm and just released **version 3.0** of the **AppiumLibrary**.


The central message was not new. But it is still urgently needed: RoboCon is more than a series of presentations.  
It is a space where people come together, exchange ideas, discover new perspectives, and **encourage each other to think bigger**.  
That is also my experience: I see RoboCon as a **catalyst** for personal and professional development, which in turn contributes to the Robot Framework ecosystem.

A core idea of the presentation was the **importance of individual participation** – the idea that everyone, regardless of experience or background, can contribute something valuable to the ecosystem.  
This reminded me of Ed Manlove's **"Law of 2 Feet"**: simply move to the places where you can learn and contribute.  
Gabriela and Christoph embody this principle perfectly.

**Gabriela recounted** how she asked a library developer at the beginning: *"How much experience as a Python developer do you need to become a library maintainer?"*  
His answer was concise and encouraging: *"Just start. Start small and learn by doing it."* 

**Christoph's journey** went back further: he started in 2019 when he maintained what is now **WhiteLibrary** – even then, it was a learning experience that left him with a feeling that motivated him. When he was later faced with the task of getting the AppiumLibrary up to speed with its many open issues, he was unsure whether he was the right person for the job.  
But when he turned to Ed Manlove, he received guidance and encouragement. A subtle but important moment: the community supports itself.

Through their story, Gabriela and Christoph demonstrated the **tangible benefits of community engagement**: an expanded network, consolidation of technical understanding, public recognition, and, last but not least, the deep feeling of being part of something bigger than oneself.

In a question from the audience, when asked how it felt to build the first release, they simply replied: 
> *"Nervous, but indescribable... You're proud to see your name here now."*   

This answer hit the nail on the head of what this talk was all about: **Contributing means belonging.**

👉 **My conclusion:** The talk was a powerful reminder: the real strength of the Robot Framework ecosystem does not lie in any company backing or corporate sponsorship – it lies in **collaboration**, mutual **trust** and the collective effort of the community members.

---

### Let's play a game!

{{< portrait src="img/yuri.png" alt="Yuri Verweij" >}}

Yuri's presentation introduced the interactive elements of the conference, which were organised via the **Gridaly Conference Companion App**.  
The aim was to motivate conference participants to actively participate and network via a gamified system with badges, tasks and robot stickers.  
Participants complete various tasks (e.g. visiting sponsor stands) to collect rewards. The main prize: a free ticket to RoboCon 2027.  

As I was able to represent **Checkmk** as a **gold sponsor** this year, I can confirm that gamification really should not be underestimated.  
It brings people together and gets them talking. I had many very good technical discussions at the Checkmk stand.

![alt text](img/booth.png)

---

### RF-MCP: Say It, Test It, Ship It

{{< portrait src="img/many.png" alt="Many Kasiriha" >}}

In his session, **Many Kasiriha** presented his project ([RF-MCP](https://github.com/manykarim/rf-mcp)) – a solution to a fundamental problem in the use of large language models (LLMs) in test automation: their tendency to "hallucinate", i.e. to invent non-existent keywords/libraries or generate logically incorrect test steps.

**RF-MCP** allows users to write a test scenario in prose and receive executable Robot Framework tests in return.  
Something magical happens in between: each generated test step is actually executed and verified by the MCP server using Robot Framework before the final code is created.  
This ensures that the AI only uses **validated keywords** that actually exist in the project's available libraries and resources –  and that the end result is automation code that actually runs.  

RF-MCP now supports keywords from

- Browser Library + SeleniumLibrary
- AppiumLibrary
- RequestsLibrary
- DatabaseLibrary
- Django-based web frontends

👉 **Conclusion:**  
I have not yet encountered anyone who is already using the MCP server productively for test creation.  
But that should not obscure one thing: **Many has done some real pioneering work here**, and this is just the beginning of a major development that cannot be stopped.   

Anyone who believes that AI will "never" be able to write tests as well as a human being may be proven wrong in a few years' time.

Of course, I too wonder where all this will lead.  
But the best answers to such questions can be found by approaching the subject with an open mind.  

In the words of Wayne Dyer:

> *"If you change the way you look at things, the things you look at change."*

**Stay open-minded and curious!** 😉

---

➛ Back to [Part 1 (Tuesday/Wednesday, Workshop & Community Day)]({{< ref "/robocon26-recap-1/" >}})  
➛ Continue to [Part 3 (Thursday: Conference Day 1)]({{< ref "/robocon26-recap-3/" >}})
