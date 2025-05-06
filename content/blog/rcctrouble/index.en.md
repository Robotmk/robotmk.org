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
description: Tips for quick troubleshooting when creating RCC environments
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
---



**RCC** is the command line tool used to build Python environments for the Robotmk Framework.
The practical advantage of this is that it can be used both during test development and during execution by Robotmk. This ensures that the scripts always run in a reliable environment.

However, errors can sometimes occur when building or activating the environments.  
This article summarizes the most common sources of errors when working with RCC and shows how to fix them efficiently.

<!--more-->

## Environment creation

### Environment creation fails (VCRUNTIME140_1.dll)

On some Windows systems, the DLL **VCRUNTIME140_1.dll** is missing (the reason for this is unknown).
The tool **micromamba** used to build the environments aborts the environment creation with a meaningless message:

{{< figure src="img/dllerror.png" title="RCC error message when building environments" >}}

The cause can be verified by manually executing the tool **micromamba.exe** listed in the RCC output on the console.
If the DLL is actually missing, micromamba generates this error message:

{{< figure src="img/vcr.png" title="Micromamba cannot find VCRUNTIME140_1.dll" >}}

**Solution**: Install the [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022) from Microsoft—it contains exactly this DLL.
