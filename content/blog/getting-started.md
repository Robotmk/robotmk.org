---
title: Getting started with Robotmk v2
menutitle: Getting started
description: This article helps you get started with Robotmk, including installation and minimal
  configuration.
lead: This article helps you get started with Robotmk, including installation and minimal configuration.
date: 2022-01-24T14:00:00.000Z
tags:
  - "Installation"
authorbox: false
sidebar: true
pager: false
menu: main
weight: 10
---

Welcome to the Robotmk Documentation. This quick start guide is designed to get you up and running with Robotmk, focusing on installation and basic configuration. It's aimed at users who have an intermediate to advanced understanding of monitoring with Checkmk, as Robotmk is an extension for this platform.

<!--more-->

## Installation

Before installing the **Mainroad** theme, make sure that you've
[installed **Hugo** (version 0.48 or later)](https://gohugo.io/getting-started/quick-start/#step-1-install-hugo) and
[created a new site](https://gohugo.io/getting-started/quick-start/#step-2-create-a-new-site). To learn how to install
Hugo, visit [Hugo Documentation](https://gohugo.io/getting-started/installing/).

There are a few ways to install a theme in Hugo. This can be done via git submodule, git clone, Hugo modules, or
by downloading the archive and manually copying the files. Three installation options are described below.

### Option A: `git submodule`

*Additional requirements: git*

If you don't plan to make significant changes to the theme but still want to track and update it, you can add it as a
[git submodule](https://git-scm.com/docs/git-submodule) by running the following command from the root directory of
your Hugo site:

```sh
git submodule add https://github.com/vimux/mainroad.git themes/mainroad
```

**Note:**
[Netlify expects git submodule](https://docs.netlify.com/configure-builds/common-configurations/hugo/#hugo-themes)
instead of git clone.

### Option B: `git clone`

*Additional requirements: git*

Run this [git clone](https://git-scm.com/docs/git-clone) command from the root of your Hugo site:

```sh
git clone https://github.com/vimux/mainroad.git themes/mainroad
```

### Option C: Manual install

If you do not want to use git, you can manually
**[download ZIP](https://github.com/vimux/mainroad/archive/master.zip)** and extract it into the `themes/mainroad`
within your Hugo site.

---

### Activate theme

Whichever installation option you choose, don't forget to edit `theme` param of the site configuration `config.toml`:

```toml
theme = "mainroad"
```

To check it out, build the site via `hugo` command or make it available on a local server via `hugo server`.

## Minimal configuration

**Do not copy the [example config](https://github.com/vimux/mainroad#configtoml-example) as-is.**
Use only the parameters that you need. The Mainroad theme contains required defaults, so you don't need to add all of
the configuration parameters to run the theme for the first time. Before adding any theme-specific parameters, make
sure to edit the `theme` param inside the config file and check that the theme works.

To view our example configuration, visit [demo config](https://github.com/vimux/mainroad/blob/master/exampleSite/config.toml).

[Edit this page on GitHub](https://github.com/vimux/mainroad/blob/master/exampleSite/content/docs/getting-started.md)
