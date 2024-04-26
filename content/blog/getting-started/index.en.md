---
draft: false
title: Robotmk v2 quick start
lead: Integrate the first RobotFramework test with Robotmk v2 in Checkmk step by step.
commentid: rmkv2-quickstart
menutitle: Getting started
date: 2024-04-17T21:37:42+02:00
categories:
  - tutorials
tags:
  - Installation
authorbox: true
sidebar: true
pager: false
menu: main
weight: 10
thumbnail: img/start-title.png
slug: robotmk-v2-quickstart
---

  
This step-by-step guide will help you get started with synthetic monitoring with the new version of Robotmk, which is integrated in Checkmk 2.3.

<!--more-->

## Prerequisites 

- Windows-VM 
  - Internet access (needed by `rcc` to download the installation packages)
  - 8 GB RAM
  - 4, better 8 CPUs (don't even try with only 2 CPUs; it won't work)
  - basic monitoring by checkmk ("Vanilla"-Agent)
- Checkmk 2.3 on a Linux server

## Windows test client

### Download the RCC binary

> The Checkmk agent, which we will install soon, will include the `rcc.exe` binary. You can therefore skip this step here if you want to integrate the robot into Checkmk immediately (i.e. without prior testing).  
> I have got into the habit of creating a `bin` directory in the user profile and putting the binary there like this: `c:\Users\simonmeggle\bin\rcc.exe`

For a prior test or to set up a development host, you will need to obtain the RCC binary yourself. Download it [here](https://downloads.robocorp.com/rcc/releases/index.html) (version [v17.18](https://downloads.robocorp.com/rcc/releases/v17.18.0/windows64/rcc.exe) is the current one at the time of writing) and save it to a location of your choice. 

Now add this folder to the user environment variable `%PATH%`: 

{{< figure src="img/bin-path.png" title="Adding the RCC path to the user variable `%PATH%`" >}}

Open a new CMD and test whether you can now execute `rcc` from any location: 

{{< figure src="img/cmd_where_rcc.png" title="First call of RCC" >}}

### Download of the minimal example

Now it's time to download the [repo](https://github.com/elabit/robotmk-examples/archive/refs/heads/main.zip) with the robot suite that we want to integrate into Checkmk. 

> I have created the repository https://github.com/elabit/robotmk-examples especially for example suites. It is best to save it in your bookmarks. 

> Creating the environment for the web test `web/cmk_synthetic_web` takes a few minutes (Python packages, NodeJS, ...).  
If you want to start an absolute minimal example, you can alternatively use the robot `minimal` from the demo repo.  
In this case, nothing else is installed apart from Robot Framework.

Unzip the file `master.zip` and save the subfolder `web/cmk_synthetic_web` in the folder `C:\robots\`. This folder serves as the so-called **base directory** for all robot suites. 

{{< figure src="img/robot-basedir.png" title="Location of the new robot" >}}

### Manual execution of the robot with RCC

> Please note that we have not yet installed *any software*. The hour of RCC is about to strike! 

Open a CMD and change to the folder `C:\robots\cmk_synthetic_web` you just copied. 
I will now explain a few commands in more detail, as they are important to understand: 

- `where python`: Do we have Python available?  
   The `where` command is the equivalent of the Linux command `which` and attempts to find the command passed as an argument via the `%PATH%` variable.  
   The `%PATH%` variable usually consists of a whole series of search paths separated by semicolons. Windows searches for the specified programme in exactly this sequence of paths. 
   With this test, I would like to find out whether Python is already installed on the system - and if so, where.  
   There will probably be no output at all on your system. On the Windows shown in the video, only "pyenv" is displayed. (We don't need to go into this any further - there is no Python interpreter, period).
-  `rcc task shell`: The fastest way into an RCC environment.  
   This command starts `rcc` with the instruction to search for the file `robot.yaml` in the current directory. From this, rcc is only interested in a single line: the one that refers to the file `conda.yaml` (usually in the same directory).  
   If `rcc` finds it, the tool now starts to build a completely isolated environment; it contains everything our web test needs: Python (+packages), NodeJS (+packages), and three web browsers (Firefox, Chromium, Webkit).  
- `where python`: This time the command returns the path to the Python interpreter in the newly created environment. 
- `where robot`: NodeJS is also installed and is found via `%PATH%`. (Isn't that cool? 😎)
- `robot tests.robot`: Robot Framework also comes with a command line tool called `robot`, and this is also found in the search path.  
To start the web test from this environment, it is sufficient to enter the name of the .robot file in the command. This starts the web browser in the foreground and Robot Framework performs a short Google search. 




{{< figure src="img/rcc-task-shell-run.gif" title="Starting the robot with RCC" >}}

> The execution of this test including the browser is completely based on an RCC environment! We have not installed any software beforehand!

This section has provided the proof: the robot can be started via RCC.  ✓

In the next section we will now turn to the integration in Checkmk.  

---

## Checkmk server

Not much has happened on the Checkmk server (v2.3) so far: the Windows host is currently only monitored with a vanilla CMK agent: 

{{< figure src="img/cmk-win1.png" title="Windows-Host in Checkmk" >}}

### Configuring the bakery

The Robotmk scheduler, which will later execute the robot tests on the Windows client, can be completely configured via the bakery rule "*Robotmk Scheduler (Windows)*": 

{{< figure src="img/bakery-search.png" title="All Robotmk rules are most easily found using the search term 'robot'." >}}


{{< figure src="img/bakery-rule.png" title="The bakery rule for the Robotmk scheduler." >}}

Explanations / values of the individual fields: 


| No | Description | Value |
| --- | ---------- | ------------------------------- |
| 1. | The base directory where we had placed the sample suite.  | `C:\robots` |
| 2. | The first (and only) parallel execution group.                                                               | |
| 3. | Sequential executions of Robot Framework suites are possible per execution group.                            | |
| 4. | Execution interval of the group | `3` |
| 5. | The name of the application to be tested | `GoogleSearch` |
| 6. | The path to the Robot Framework suite is specified *relative to the base directory*.                                  | `cmk_synthetic_web\tests.robot` |
| 7. | This timeout determines how much time the suite receives from the scheduler for execution. It is then terminated. | `1` |
| 8. | Relative path (like 6.) to `robot.yaml` (central config file for RCC, contains reference to `conda.yaml`) | `cmk_synthetic_web\robot.yaml` |
| 9. | Timeout for building the environment.                                                                                | `10` |

At the bottom, the rule is restricted to the host `windows`: 

{{< figure src="img/bakery-condition.png" title="The condition restricts the rule to only one host." >}}

Then save the rule. 

### Bake agents

Now switch to the Agent Bakery...

{{< figure src="img/bakery-related.png" title="The 'related' menu offers a practical shortcut to the Bakery." >}}

...and bake a new installation agent: 

{{< figure src="img/agent-bake.png" title="Baking a new agent." >}}

As soon as the creation of the agent installer is finished, you will see a new line with the host to which you have restricted the rule (`windows`) on the far right. Download the MSI package from here. 

{{< figure src="img/agent-baked.png" title="Download MSI installer" >}}

### Discovery of the services

The first service that can be discovered immediately after deployment is the "Scheduler Status" service: 

{{< figure src="img/discovery-schedulerstatus.png" title="Scheduler Status Service" >}}

It monitors the Robotmk scheduler, which runs permanently alongside the agent as an "Extension" agent. 

The scheduler runs through two phases after the agent is started: 

- **Phase 1**: Sequential building of all RCC environments
- **Phase 2**: Scheduling of the plans (=configured Robot Framework suites) at the configured interval. 

It may take a few minutes for the environment to be built in the background by the scheduler.  
You can see when it is finished by the fact that the output of the scheduler service changes: 

{{< figure src="img/plan-scheduling.png" title="The scheduler has built the environment." >}}

After the first execution of the suite took has been done in the background (="headless"), two further services can be discovered: 

{{< figure src="img/discovery-plan-test.png" title="Plan- u. TestService" >}}

- **Plan Service**: Similar to the "Scheduler Status" service, this is also a service aimed at administrators that alarms, for example, when results are too old (=the suite is no longer executed)
- **Test Service**: Aimed at application managers. Represents the status (PASS/FAIL) of the test from the point of view of Robot Framework. 

---

## Checklist 

This checklist summarises all the steps in a nutshell: 

- ✓ Download and unpack the [example repo](https://github.com/elabit/robotmk-examples/archive/refs/heads/main.zip)
- ✓ Save the robot suite in the base directory `C:\robots\`
- ✓ The **Bakery rule** in Checkmk requires at least these settings:
  - ✓ Base directory (e.g. `C:\robots\`)
  - ✓ Execution interval of the group
  - ✓ Application name 
  - ✓ (relative) path to the suite file/directory
  - ✓ (relative) path to the `robot.yaml`
- ✓ Baking / Deploying / Installing the agent
- ✓ Discovery

(If everything worked out, this would be a great time to star :star: the project on Github, right? :smile: )  
{{< github_button button="star" user="elabit" repo="robotmk" count="true" large="true" dark="false" >}}

---

## Summary

With these few steps you have integrated **your first Robot Framework-based web test** (based on Playwright, by the way) into Checkmk.  
**Here are a few tips for your next steps:**

- Explore the monitoring rule "*Robotmk tests*", with which you can monitor the discovered test runtime and also the keywords contained in the test for their runtime.
- Install and open Visual Studio Code. Start an RCC shell in the suite folder and run `code .`. This opens the IDE directly in the RCC environment. Here you can view the robot suite and experiment a little.

Have fun with Robotmk!