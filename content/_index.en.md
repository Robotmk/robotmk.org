---
# header (hero)
header:
  title: '**Robotmk** integrates<br>**Robot Framework** into **Checkmk**'
  hero_img: '/images/index/home-hero-bg.jpg'
  content_index: 1

# introduction section
introduction:
  heading: 'What is **RobotMK**?'
  content_index: 2

# LR Animation
lr_animation:
 - title: 'Create Runtime metrics.'
   subtitle: "Graph what you're interested in"
   text: 'Which elements of a Robot test (suites, tests, keywords) are to be recorded in CheckMK-graphs, can be determined via a sophisticated, pattern-based rule system. <br> After all, the whole is expected to remain clearly structured.'
   img: '/images/index/robotmk_runtime_animated_1.gif'
   img_alt: 'animated gif' 
 - title: 'Monitor runtimes.'
   subtitle: 'As much as you want, at any level'
   text: "In RobotMK the runtimes of all test elements are available for evaluation. <br> Here too, pattern based WATO rules allow to set runtime thresholds of Robot suites, tests and keywords."
   img: '/images/index/robot_wato_runtime.png'
   img_alt: ""
 - title: 'Detect functional disruptions.'
   subtitle: 'Murphy is always waiting around the corner'
   text: "With Robotmk, functional faults in applications can be detected safely and proactively - far before users notice anything. <br> (Wouldn't it be nice to be in a position where you can say on the phone, &quot;We're already on it.&quot; ...?)"
   img: '/images/index/broken_image.jpg'
   img_alt: "You don't see anything here, this is correct :-)"
# features section
features_title: 'Features' 
features_description: 'Why you should decide for the "lingua franca" of test automation.'
features:
- heading: 'Central control via WATO'
  icon : 'fa fa-gears'
  text: '**RobotMK** is configured via a powerful **rule system** in the web administration interface of CheckMK (WATO).'  
- heading: 'Flexible output formatting'
  icon: 'fa fa-crop'
  text: '**RobotMK** evaluates intricately interleaved Robot results; the **pattern-based reduction** of the output to the essential ensures an optimum result.'  
- heading: 'Readability'
  icon: 'fa fa-volume-up'
  text: 'The "**keyword-driven**" approach abstracts complex Python code and can be encapsulated at will – with free name choice. **The result**: traceable results and meaningful messages in the monitoring system.'  
- heading: '100% Robot compatible'
  icon: 'fa fa-handshake-o'
  text: '**RobotMK** does not require any adaptation to existing Robot tests; every Robot test can be integrated in CheckMK **without any intervention**.'  
- heading: 'Performance monitoring'
  icon: 'fa fa-area-chart'
  text: '**RobotMK can monitor runtimes** at any level, be it whole suites, tests and keywords. (Or how would you detect an insidious login time increase by 0.1s per month?)'  
- heading: 'Worthwhile addition to CheckMK'
  icon: 'fa fa-binoculars'
  text: '**Checkmk** can only monitor up to **OSI layer 7**. Robotmk completes your monitoring with a detailled view inside applications to get a holistic view of services and their quality.'
- heading: 'Swiss army knife'
  icon: 'fa fa-book'
  text: "The **Library concept** makes Robot Framework the **Suisse pocket knife**. You'll find a library for nearly any use case. And you are free to use them combined in a test." 
- heading:   'Strong community'
  icon: 'fa fa-comments-o'
  text: 'Great if you have backed the right horse, in case help is required: CheckMK and Robot have a worldwide, English speaking community at their disposal.'  
- heading:   'Platform-independent'
  icon: 'fa fa-arrows-alt'
  text: 'One for all: Robot Framework works for all common platforms: Windows, Linux, MacOS, Android, iOS, ... including the appropriate test libraries in each case (e.g. Auto-IT for Windows automation).'  
- heading: '100% Open Source'
  icon: 'fa fa-unlock'
  text: 'RobotMK - like Robot Framework and CheckMK Raw – is published as an Open Source project. No hidden costs, no vendor-lock-in.'
# intro MK program certification - section 2
intro_mk_program:
  heading: 'Introducing the <br> **Robotmk Academy Certification Program.**'
  subheading: 'Supercharge Your Monitoring Skills.'
  text: '**Do you want to...**  <br> 
...write robust web tests?  <br>
...finally understand and use CSS selectors?  <br>
...monitor any kind of Windows application?  <br>
...want to learn which are the most useful Robot Framework libraries?  <br>
...reuse robot code with the help of Git?  <br>
...see how easy Robot Framework tests can be debugged?  <br>
...learn how to program robots which are stable and maintainable?  <br>
...get worthful bonus material, checklists and exercises?  <br>
<br>
✅ **...learn from an industry expert?**'
  lower_title: "**Then don't miss out!** <br> Be among the first to experience the upcoming"

# faq
faq:
  - question: 'What do I need to get started with Robotmk?'
    answer: 'Checkmk v2 is needed in the Enterprise version. If you want to test Checkmk first: you can download a free version from [checkmk.com](https://www.robotmk.org/www.checkmk.com) which is only limited in the number of services.'
  - question: 'For me as programmer, the keywords of Robot look rather strange. How flexible can one be with them?'
    answer: 'Writing automates tests in Python can be a mess. The keyword-driven syntax in Robot Framework facilitates readability, allowing test cases to be expressed in natural language, making them comprehensible even to non-technical stakeholders.
This approach eases reusability, as custom keywords can be defined once and utilized across multiple tests. Furthermore, it is possible to separate test data and test logic which simplifies test maintenance and modification.'
  - question: 'Is there a recording function for End2End tests?'
    answer: 'Recorder functionalities as readily advertised for commercial End2End tools should be treated with caution. A test recording is only as intelligent as the purpose behind it. This means: anybody recording click-click-click will receive click-click-click. A login, for example, should always be verified too, website elements should be localized in such a way that they also withstand changes in the UX design, etc. The implementation of End2End tests means actually addressing the behaviour of the SUT (System under test).'
  - question: 'What has become of Sakuli v1?'
    answer: 'The open source test tool ”Sakuli“, developed by Consol in 2014, has been officially phased out, as in particular the underlying web test tool “Sahi” did no longer meet modern requirements. The successor of Sakuli has appeared as a complete rewrite in version 2 (only the chargeable version allows the monitoring integration).'
  - question: 'Can I also employ RobotMK in other monitoring systems (Nagios, Naemon, Icinga, Zabbix, Groundworks, Centreon, ...)?'
    answer: 'RobotMK was especially developed for CheckMK; the wide range of parameterization as offered by the WATO surface of RobotMK cannot be reproduced via a traditional, Nagios-compatible check-in plug (possibly one more reason to take on Checkmk….)'
  - question: 'So far I have written Selenium tests in Python. What reason should I have to change over to the Robot Framework?'
    answer: 'If the tests remain exactly the same and are not to be integrated into a monitoring system, in effect no added value is generated by Robot. <br>
The expense of integrating pure Python tests into a monitoring system should, however, not be underestimated, especially if the requirements become more complex in the course of time. <br>
Sooner or later one would rather not program and maintain oneself the complete “framework“ for integrating various test methods (Web, GUI), troubleshooting etc.Exactly here lies the strength of the Robot Framework. And hence there is RobotMK.'
  - question: 'My web application requires some interaction with the desktop. Is this possible with Robotmk?'
    answer: 'Yes, in Robot Framework several libraries (=testing methods) can be used in mixed mode, e.g. robust modern web testing together with flexible image recognition methods.'
  - question: 'Does the test client have to remain unlocked to be able to carry out End2End tests?'
    answer: ' In the vast majority of cases, web tests can be executed headless, i.e. without a logged-in user.<br> For tests of native Windows UIs, a user must currently still be logged in on the desktop.<br>
(Version 2 of Robotmk will soon provide a solution for this, which will also enable desktop sessions headless).'
  - question: 'Where can I get professional support?'
    answer: 'Important: if the future version 2 (spring 2024) of Robotmk is purchased as part of a "Checkmk Synthetic Monitoring" subscription, support can be obtained directly from Checkmk. <br> However, this support is limited to the functionality of Robotmk. <br> For consulting around Robot Framework, libraries, test development we and our partners are there for you. <br> You are welcome to use the form below to set up a non-binding call. In this we will clarify your initial situation and how we can support you in the best possible way. Feel free to use this offer.'
quote:
  text: 'A journey of a thousand miles <br> **begins with the first step.**'
  credit: '(Chinese saying)'
prefooter:
  hero_img: '/images/index/prefooter_CheckMK_web_banner.jpg'
  releases: 'https://github.com/simonmeggle/robotmk/releases'
---

---

**100% Robot Framework compatible** <br>
**100% web based configuration** <br>
**100% Raw data access** <br>
<br>⭐️⭐️⭐️⭐️⭐️<br>
**The most downloaded MKP extension for Checkmk.** <br>
**From spring 2024 integrated in Checkmk with the name "Synthetic Monitoring".** <br> 

---

![What is RobotMK](/images/index/home-introduction-banner-what-is-robotmk.png)

**RobotMK**  contains the names of the two tools  **Robot Framework**  and  **CheckMK**  (for further details see below).

With  **Robot Framework**  you can automatically test programs, web sites (and much more...) from the perspective of the user.

Software developers appreciate this type of tests, as an application can thus for instance be tested swiftly in all its facets and variations before being released in a new version.

It is a great advantage to also have such tests in the monitoring system CheckMK and be able to check continuously...

-   ...whether the login into the CRM system functions – and how long it takes
-   ....whether the search function in the SAP/merchandise management system for randomly selected article numbers works
-   ...how efficiently the ordering process functions in the web shop

...etc...

**So far this possibility has not existed**.

**Now RobotMK creates a bridge and permits the integration of the results of Robot-tests into the monitoring system CheckMK.**

---

It consists of three courses that build on each other, including a Windows/Linux lab environment:  
  

- Course Level 1️⃣ - **Robotmk Synthetic Monitoring Foundation 🧾**:  
  The fastest and safest way to get into synthetic monitoring with Robotmk and Checkmk
- Course Level 2️⃣ - **Robotmk Synthetic Monitoring Advanced 🧾**:  
  Probably the most comprehensive course available on that subject - and probably the only one. Learn directly from the founder of Robotmk!
- Course Level 3️⃣ - **Robotmk Synthetic Monitoring Expert 🧾🏅**:  
  Technical preparation is not everything you need for a successful implementation of End2End monitoring (I had to learn that too...). In this course you will learn the proper planning, documentation and implementation of synthetic monitoring.  
  This is a feature-rich course based on 9 years of experience.

  
At the end of each course you will receive a certificate of attendance. 🧾  
**Level 3** concludes with the certificate **_"Certified Robotmk Synthetic Monitoring Expert"_**. 🏅  
Apply now and be notified as soon as the program launches!  
  
**Preregistration Benefits:**  
✅ **Priority access** to course materials.  
✅ Exclusive preregistration discount.  
✅ **Early bird webinar sessions** with the instructor.  
✅ Stay updated with course developments and schedules.  
  
**Anyone** can learn to keep their business applications **available, working and performing** by following this certification system, because it takes you **straight to your goal** without making any detours.  
  
PS: If you take part in this learning program, it will not only serve your company, because it can keep its applications available with a powerful tool.  
The certification is also a valuable addition to your own education portfolio that will help you stand out in the job market. 🤫

---


