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
vgwort: https://vg04.met.vgwort.de/na/d7eed969920344a8bfe3efa404234b71
---



**RCC** is the command line tool used to build Python environments for the Robotmk Framework.
The practical advantage of this is that it can be used both during test development and during execution by Robotmk. This ensures that the scripts always run in a reliable environment.

However, errors can sometimes occur when building or activating the environments.  
This article summarizes the most common sources of errors when working with RCC and shows how to fix them efficiently.

<!--more-->

## General errors

### User Profile with spaces

**Error:** RCC returns an error with every call:

{{< figure src="img/profile_with_space.png" title="General RCC error due to a space in the user profile" >}}

**Description:** For unknown reasons, the user profile must not contain spaces.

**Solution:** Change the path where RCC should store the environments:

- Define a new environment variable `ROBOCORP_HOME` and assign it a directory of your choice (without spaces). Example: `C:\rcc`
- Start a new CMD and try again.

---

## Environment creation

### Environment creation fails (VCRUNTIME140_1.dll)

On some Windows systems, the DLL **VCRUNTIME140_1.dll** is missing (the reason for this is unknown).
The tool **micromamba** used to build the environments aborts the environment creation with a meaningless message:

{{< figure src="img/dllerror.png" title="RCC error message when building environments" >}}

The cause can be verified by manually executing the tool **micromamba.exe** listed in the RCC output on the console.
If the DLL is actually missing, micromamba generates this error message:

{{< figure src="img/vcr.png" title="Micromamba cannot find VCRUNTIME140_1.dll" >}}

**Solution**: Install the [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022) from Microsoft—it contains exactly this DLL.

---

### Long Path Support

**Error:** When activating the required LongPath Support with `rcc config longpaths -e`, this error message appears:

```
WARNING! Long path support failed. Reason: exit status 1. WARNING! Long paths do not work!

Error executing: rcc.exe configure longpaths --enable 
Error code: undefined Error: error Stderr: Failure to modify registry: Access is denied.
```

**Description:** Obviously, the Windows machine is centerally managed via Group Policies, which prevents the LongPath support policy from being changed.  

**Solutions:** Ask your administrator responsible for the GPOs to approve this policy:

`Local Computer Policy > Computer Configuration > Administrative Templates > System > Filesystem > NTFS > Enable Win32 long paths > Enabled`

---

### Restricted Network Access (Proxy)

**Error:** During the environment creation, RCC fails because of network errors.

**Description:** RCC requires **Internet access** to download the installation files and packages.[^1]  
If a proxy server must be used, it must be specified in a "Profile".  

**Solution:**

- First, download the profile template file from <i class="fab fa-github"></i> [here](https://github.com/Robotmk/level1-code/blob/main/conf/rcc_proxy_profile.template.yaml) and save it somewhere on your file system.
- Open the file with an editor of your choice and specify the proxy in `http_proxy` and `https_proxy`. (Protocol and port also must be included)

[^1]: from Checkmk 2.4, also the [import of environments as a ZIP file](https://docs.checkmk.com/latest/de/robotmk.html?lquery=rcc#ziparchive) is supported.

Example:

```yaml  { lineNos="true" wrap="true" title="rcc_proxy_profile.yaml"}
name: MyProxy
description: RCC proxy profile
settings:
  certificates:
    verify-ssl: true
  network:
    no-proxy: 'localhost,127.0.0.1'
    https-proxy: 'http://myproxy.local:3128'
    http-proxy: 'http://myproxy.local:3128'
  meta:
    name: MyProxy
    description: RCC proxy profile
    source: Robotmk
```

- Next, execute the following commands to import and activate the profile.

```cmd  { lineNos="false" wrap="true" title="RCC profile activation"}
> rcc config switch       # show the current profile (default)
> rcc config import -f <file>.yaml     # import the proxy profile
> rcc config switch -p <profile_name>  # switch to the new profile
```

Switching back to the **default profile** (= no proxy) is possible with  
`rcc config switch --noprofile`.

**Note:** The approach described above only works if the proxy used allows **all domains** in principle/as far as possible → this is called a "transparent" or "open" proxy.  
So-called "whitelisting" proxies are more restrictive: they have a **list of permitted domains**; all other data traffic is **blocked by default**.  

If this is the case for you, you must ask the proxy admin to add the following domains to the whitelist:

```
anaconda.org
conda.anaconda.org
files.pythonhosted.org  
pypi.org
registry.npmjs.org  
playwright.azureedge.net  
playwright-akamai.azureedge.net  
playwright-verizon.azureedge.net
github.com
githubusercontent.com
raw.githubusercontent.com
```
