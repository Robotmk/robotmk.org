---
draft: false
title: "RoboCon 2026 - Recap (Part 3 - Thursday)"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
commentid: robocon26-recap-3
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
vgwort: https://vg04.met.vgwort.de/na/499f914e85244b9ab21dd3236d19db72
---

This is **Part 3** of the six-part review of RoboCon 2026 in Helsinki.

<!--more-->

---

➛ Back to **[Part 2 (Thursday: Conference Day 1)]({{< ref "/robocon26-recap-2/" >}})**  
➛ Continue to **[Part 4 (Thursday: Conference Day 1)]({{< ref "/robocon26-recap-4/" >}})**

---

## Thursday: Conference Day 1

### Can AI help us find bugs in Robot Framework faster?

{{< portrait src="img/fabian.png" alt="Fabian Streitel" >}}

**Fabian Streitel** has been advising his clients on test automation for over ten years. He presented a fascinating approach to a problem familiar to many teams with large test suites: How can you provide **feedback as quickly as possible** when the complete **test execution takes hours or even days**?

The core idea of his presentation: instead of running through the entire test suite, tests are clustered and those that are furthest apart in a vector-based space are selected for execution – a kind of "intelligent smoke test" 😉  

![alt text](img/talk-3d.gif)

This prevents the test routines from repeatedly running through redundant paths in the code while other areas remain untested.

Fabian showed how he had used **mutation testing** to deliberately introduce hundreds of bugs into the Robot Framework source code (as a test rabbit) – a controllable test scenario to prove the effectiveness of his approach.  


---

### Traceable Automation in Space Projects

{{< portrait src="img/bruno.png" alt="Bruno Néstor Calvo Chevillat" >}}

{{< portrait src="img/jose.png" alt="José María Martín Blázquez" >}}

The title alone caught my attention! 🪝 😅  

In a highly regulated environment where every mistake can have catastrophic consequences, test automation requirements go far beyond typical web or app scenarios.

![alt text](img/talk-gmv.png)

Bruno and José showed how they established Robot Framework as a central element of their test automation, closely integrated with requirements management tools such as **IBM DOORS**.  

The challenge was to create **bidirectional synchronisation** between requirement definitions, test procedures and their implementation. This allows each individual automated test case to be traced back directly to a specific requirement – a **consistent chain of traceability** that is absolutely essential in safety-critical systems such as space travel.

The presentation highlighted not only the technical integration, but also the organisational conventions that are naturally indispensable in such an environment.  
Fortunately, Robot Framework meets the regulatory standards and strict requirements of the aerospace industry for documentation, tagging and reporting.  

The speakers also openly shared their **lessons learned** – from pitfalls to specific recommendations for others who want to introduce automation in regulated or safety-critical industries. It was clear that both speakers were drawing on years of experience. 

👉 **Conclusion**: The presentation made it clear that the simplicity and extensibility of Robot Framework is by no means limited to simple scenarios – quite the contrary.  
With the right discipline and a well-thought-out framework, Robot Framework can be used to build robust, traceable automation even in the most demanding technical environments. It is rare to gain insight into such sensitive, highly secure areas. 

---

### Keyword-Driven Performance Testing Without Manual Scripting

{{< portrait src="img/rakan.png" alt="Rakan Alrasheed" >}}

{{< portrait src="img/abdulelah.png" alt="Abdulelah Alharabi" >}}

The two speakers presented an innovative architecture that addresses an often overlooked problem: the separation between functional tests and performance tests. Their approach eliminates this gap by establishing Robot Framework as the **"source of truth"** for both test scenarios.

The core idea: functional test scenarios that are already defined in Robot Framework are automatically translated into [Locust](https://locust.io) scripts – a powerful, Python-based load testing tool.  
What normally requires manual scripting and specialised knowledge is replaced here by a keyword-based, intent-driven system.

The presentation made it clear that the reusability of test definitions is an often underestimated lever.  
When teams can use their functional tests as the basis for performance tests, it not only creates efficiency – it also creates a closer integration between quality assurance and performance engineering, which is indispensable in modern development cycles.

---

### Automated Accessibility for "Very Busy" Teams


{{< portrait src="img/lalit.png" alt="Lalitkumar Bhamare" >}}

{{< portrait src="img/affaf.png" alt="Affaf Malik" >}}

**Over 90%** (!) of the million most visited websites have **accessibility issues**.  
This is not only a technical problem, but also a business, legal and ethical one: users who rely on assistive technologies encounter barriers on a daily basis.   

This is not because teams necessarily want to ignore the issue of accessibility. Rather, it is because they simply do not have the capacity, budget or, in some cases, the specialised knowledge to carry out comprehensive manual testing.

Affaf and Lalitkumar presented a **"shift left" strategy** (where "left" = "earlier") that anchors accessibility testing **at the very beginning** of the development cycle.  
In their approach, this is divided into three levels:

- At the **development level**, problems can be identified before automated tests are even written. Developers can identify and correct violations such as missing "alt" texts or incorrect ARIA attributes directly during coding. 
- At the **testing level**, Robot Framework seamlessly integrates tools such as [axe-core](https://github.com/dequelabs/axe-core) and  into functional and regression tests. Accessibility checks should thus become part of daily testing – without additional manual effort.
- At the **process level**, the tests are integrated into CI/CD pipelines. Detected issues can be automatically tracked and linked to development tasks, enabling continuous validation and preventing regressions before deployment.

The central message of the session was clear: accessibility automation is not just a tool for detecting violations – it deserves a **sustainable system** in which technology actively supports diversity and usability.  

But the two also highlighted the downside: "*accessibility can backfire*" if it is implemented incorrectly or if automated checks convey a false sense of security without taking the actual user experience into account.  
All too easily, the issue is simply ticked off the list – and years later, hardly anyone can remember the framework conditions. 

---

➛ Back to [Part 2 (Thursday: Conference Day 1)]({{< ref "/robocon26-recap-2/" >}})  
➛ Continue to [Part 4 (Thursday: Conference Day 1)]({{< ref "/robocon26-recap-4/" >}})
