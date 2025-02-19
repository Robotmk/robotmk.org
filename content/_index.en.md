---
# header (hero)
header:
  # title: '**Robotmk** integrates<br>**Robot Framework** into **Checkmk**'
  title: '**Test** like a **Robot**.<br>**Monitor** like a **Pro**.'
  # hero_img: '/images/index/home-hero-bg.jpg'
  hero_img: '/images/index/cmk-hero-bg.jpg'
  content_index: 1

# introduction section
introduction:
  heading: 'What is **Robotmk**?'
  content_index: 2

# LR Animation
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
features_description: 'Why you should decide for Robotmk and Robot Framework, the "lingua franca" of test automation:'
features:
- heading: 'Central control from Checkmk'
  icon : 'fa fa-gears'
  text: 'The **Robot Framework execution** is configured entirely through the **Checkmk rule set**.'  
# - heading: 'Flexible output formatting'
#   icon: 'fa fa-crop'
#   text: '**Robotmk** evaluates intricately interleaved Robot results; the **pattern-based reduction** of the output to the essential ensures an optimum result.'  
- heading: 'Readability'
  icon: 'fa fa-volume-up'
  text: 'The unique **keyword-driven** approach of Robot Framework abstracts the technical implementation from the execution logic. Your test cases remain **readable** and **maintainable**, regardless of their complexity.'  
- heading: '100% Robot compatible'
  icon: 'fa fa-handshake-o'
  text: '**Robotmk** does not require any adaptation to existing Robot tests; every Robot test can be integrated in Checkmk **directly**.'  
- heading: 'Performance monitoring'
  icon: 'fa fa-area-chart'
  text: '**Robotmk can monitor runtimes** at any level, be it whole suites, tests and keywords. (Or how would you detect an insidious login time increase by 0.1s per month?)'  
- heading: 'Monitoring from the user perspective'
  icon: 'fa fa-binoculars'
  text: 'Where **Checkmk** ends, the world of **Robotmk** begins. Robotmk is the ideal addition for a holistic view of the **function** and **performance** of critical applications'
- heading: 'Library Concept'
  icon: 'fa fa-book'
  text: "The **Library concept** makes Robot Framework the **Suisse army knife**: Web, Desktop, REST, SAP, FTP, Kubernetes, Android, iOS, ... - there a libraries for any use case." 
- heading:   'Strong community'
  icon: 'fa fa-comments-o'
  text: 'Join a **community** of almost 40,000 Robot Framework users. Get help. Automate.'  
- heading:   'Platform-independent'
  icon: 'fa fa-arrows-alt'
  text: 'Robot Framework is based on Python and therefore runs on **all operating systems**.'  


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
  title: 'What often gets asked about Robotmk:'
  questions: 
    - question: 'What do I need to get started with Robotmk and Robot Framework?'
      answer: 'Robotmk has formed the technical foundation of Checkmk Synthetic Monitoring since 2022. Therefore, a Checkmk installation is of course a prerequisite. For small installations and to try out Checkmk, the trial version is sufficient, which can be downloaded [here](https://checkmk.com/download/trial).'
    - question: 'Do I need programming skills to use Robotmk?'
      answer: 'Basic knowledge of Robot Framework is helpful, but the easy-to-understand syntax means that even beginners can quickly become productive. The keyword-driven syntax of Robot Framework is used precisely for the purpose of hiding complex Python code.'
    - question: 'How do I prepare a Windows/Linux host for use as a test host?'
      answer: 'Not at all. The installation packages for the test hosts are created by Checkmk, including configuration, scheduler, robot files and also a sophisticated technology to create the Python runtime environments virtually from scratch.'
    - question: 'How can I test applications via Citrix with Robotmk?'
      answer: 'The Citrix session can initially be set up with a web library, for example. As soon as Citrix starts, a library for screen pattern recognition can be used, which can work completely agnostic of the screen content. RDP sessions can also be tested with this.'
    - question: 'What do I have to do to integrate existing Robot Framework tests?'
      answer: 'No customization is required for the integration of existing robot suites.'
    - question: 'Where can I download Robotmk?'
      answer: 'Robotmk is an integral part of Checkmk and can be downloaded [here](https://checkmk.com/download/trial)'
    - question: 'Who is behind Robotmk?'
      answer: 'Robotmk was developed in 2020 by Simon Meggle (ELABIT GmbH) and initially released as an open source extension for Checkmk. Since 2022, Simon has been working as Product Manager "Synthetic Monitoring" for Checkmk, as well as in his own company as a consultant and trainer for Robotmk and Robot Framework.'
    - question: 'What is the difference between Robotmk and Synthetic Monitoring?'
      answer: 'Synthetic Monitoring is an established technical term for the automated, repeated simulation of user interactions with user interfaces and is also the product name in Checkmk. Robotmk is the name of the specific technical implementation for Checkmk.'
    - question: 'Where can I get professional support?'
      answer: 'Support for Robotmk is provided by [Checkmk](https://checkmk.com) GmbH. Consulting and training for Robotmk and Robot Framework is provided by [ELABIT](https://elabit.de) GmbH. ELABIT has also been an accredited training partner for the [RFCP](https://cert.robotframework.org) exam since 2024.' 

quote:
  text: 'A journey of a thousand miles <br> **begins with the first step.**'
  credit: '(Chinese saying)'
prefooter:
  hero_img: '/images/index/prefooter_CheckMK_web_banner.jpg'
  releases: 'https://github.com/simonmeggle/robotmk/releases'
---

---

The official **Robot Framework**<br>
integration for<br>
**Checkmk Synthetic Monitoring**.<br>
<br>
<br>⭐️⭐️⭐️⭐️⭐️<br><br>
✔ 100% Robot Framework. <br>
✔ 100% Checkmk integration. <br>
✔ 100% End User Experience Monitoring. <br>


---

![What is Robotmk](/images/index/home-introduction-banner-what-is-robotmk.png)

**Robotmk** combines the power of the **Robot Framework** with the precision of **Checkmk** – for seamless end-to-end monitoring of your business-critical applications from the end-user perspective.

**Robotmk** transforms the Robot Framework **test tool** into a **powerful, universal monitoring tool**.


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


