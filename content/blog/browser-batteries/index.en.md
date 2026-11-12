---
draft: false
title: "Browser Batteries: NodeJS Included"
# --- Italic subheading
lead: "A closer look at the Browser Library's 'batteries-included' package"
# -- giscus id to match comments
commentid: browser-batteries
# -- predefined URL
# slug:
# -- for posts in menubar, use this (shorter) title
# menutitle:
#description:
date: "2026-11-12T09:00:00+01:00"
categories:
  - background
tags:
  - robotmk
  - robot-framework
  - rcc
  - browser-library
  - environments
  - nodejs
  - installation
authorbox: true
sidebar: true
pager: false
#menu: main
#weight: 10
# --- must be in the leaf bundle folder or static
thumbnail: "img/title.jpg"
# vgwort:
translationKey: "browser-batteries"
---

While researching [RCC Environments and their Supply Chain]({{< ref "/rcc-env-supplychain/" >}}), one of the things I got stuck on was the package **robotframework-browser-batteries**.

Until then it had stayed under my radar: *why should I install NodeJS through a Python package when RCC lets me install it in the environment anyway?*  

If you have the same question in mind, or have never heard of "Batteries", read on.  

In this article I have put together what the Batteries package is and when you should use it.

<!--more-->

## Background: why NodeJS in the first place?

Unlike many other libraries for Robot Framework, the [Browser Library](https://robotframework-browser.org) is not a pure Python package.

The library's keywords (`Fill Text` or `Click`, for example) are written in Python; the actual control of the browser, however, is handled by [Playwright](https://playwright.dev) — a NodeJS library.  

Between the two worlds runs a NodeJS process that the library addresses via **gRPC**:

```mermaid
flowchart LR
    RF["Robot Framework"] --> BL["Browser Library<br/>(Python)"]
    BL -- "gRPC" --> NODE["NodeJS + Playwright"]
    NODE --> BROWSER["Browser"]
```

That has consequences for the environment: to use the Browser Library, you need a NodeJS runtime and the packages that go with it.  
Together with the browser binaries, this easily adds up to more than 700 MB.

> **Info:** gRPC (Google Remote Procedure Call) is a protocol for calls between processes. As a user, it stays in the background for you. This is the channel through which a `Click` on the Python side is, so to speak, "translated" into a Playwright call on the NodeJS side.

So two things have to be present on a test host:

1. a NodeJS runtime
2. Playwright's NodeJS packages

Until now we provided both of them explicitly via the `conda.yaml` file. The following example shows this:


```yaml
dependencies:
  - python=3.12
  - pip=23.2.1
  - nodejs>=26.13
  - pip:
      - robotframework>=7.5
      - robotframework-browser>=21.0
rccPostInstall:
  - rfbrowser init chromium
```

## The new variant: Browser Batteries

Since version 19.9, every major version of the Browser Library has a matching "wheel" package that brings along the NodeJS runtime and the Playwright packages.

> **Info:** A "wheel" is a Python package format that simplifies the installation of packages. It already contains compiled files and dependencies, so that no additional installation steps are necessary.

```yaml
dependencies:
  - python=3.12
  - pip=23.2.1
  - pip:
      - robotframework>=7.5  
      - robotframework-browser[bb]>=21.0
rccPostInstall:
  - rfbrowser install chromium
```

Three things have changed compared to the previous variant:

- `robotframework-browser[bb]`: the `[bb]` extra installs the Python part as before, but pulls in the matching Batteries wheel as well.
- `rfbrowser install`: the "PostInstall" command is no longer called `init`, but `install`. The reason: `init` used to install the NodeJS dependencies *and* the browser binaries; `install` only has to download the browsers, since the NodeJS side is already in place.
- `nodejs=`: this **has to go**. If you leave it in, you end up with two NodeJS runtimes in the environment, getting in each other's way. Batteries brings along the version that fits.


```mermaid
flowchart LR
    subgraph BEFORE["Previously: nodejs + rfbrowser init"]
        direction TB
        CF["conda-forge: nodejs"] --> E1["RCC environment"]
        PY1["PyPI: robotframework-browser"] --> E1
        NPM["npm registry: ~85 packages"] -- "rfbrowser init" --> E1
        CDN1["CDN: browser binaries"] -- "rfbrowser init" --> E1
    end
    subgraph AFTER["With Batteries: [bb]"]
        direction TB
        PY2["PyPI: robotframework-browser[bb]<br/>one wheel incl. NodeJS + node_modules"] --> E2["RCC environment"]
        CDN2["CDN: browser binaries"] -- "rfbrowser install" --> E2
    end
```

## The comparison

I compared both variants in terms of installation and disk space.

### Disk space


|                    | conda-forge `nodejs` + `rfbrowser init` | `[bb]` wheel              |
| ------------------ | --------------------------------------- | ------------------------- |
| NodeJS runtime     | 99.9 MB                                 | 95.5 MB                   |
| npm + corepack     | 12.0 MB (1,926 files)                   | not included              |
| `node_modules`     | ~33.9 MB (~2,844 files)                 | 33.9 MB (2,844 files)     |
| **on disk**        | **~146 MB, ~4,780 files**               | **130.7 MB, 2,853 files** |
| Download           | 34.5 MB + ~85 npm tarballs              | 45.4 MB, one wheel        |

The saving is exactly the npm footprint: **a mere 15 MB.**  
➡️ Disk space is not an argument, in either direction.

### Installation

The last row of the table holds several advantages at once:

#### Fewer files, fewer downloads

- Without Batteries, the host downloads one conda package **and** around 85 packages from the npm registry.  
- With Batteries, it downloads one (1) file.

➡️ That is not only faster, it is also one target on the internet less that may have to be whitelisted.

#### Proxy settings and TLS inspection

In the article [Understanding and Applying Proxy Settings]({{< ref "/proxies-test/" >}}) I have already described how much fun one can have with proxies ...

`npm` is a discipline of its own in this respect: `.npmrc`, `strict-ssl`, `cafile`, `NODE_EXTRA_CA_CERTS` – and it shares none of this with pip or conda.

In the Batteries wheel, by contrast, `npm` is not included at all, simply because it is not needed: the browser download runs via the bundled Node, not via `npx`.

➡️ Simpler setup, fewer pitfalls.

#### Guaranteed NodeJS version

I have been asked by customers more than once which NodeJS version is the right one.  
My honest answer is: "I don't know", because I believe it does not matter.  

Even so, with "Batteries" you have the certainty that the correct NodeJS version is being used.

➡️ An entire category of errors disappears


## What you should keep in mind

None of this comes for free. Three points you should check beforehand:

- **Older platforms drop out:** the wheels are built for **glibc 2.28** (found on Debian 10, RHEL 8, Ubuntu 20.04), Windows 10 / Server 2016 and macOS 13.5. Below that, you will not get the package to run.
- **Version lockstep:** the Batteries package ties `robotframework-browser` in *exactly* one version to one NodeJS version. Upgrading one of them on its own is not possible. (Not that you really need to – I just want to have mentioned it.)
- **Responsibility shifts from conda-forge to PyPI**, or rather to the package maintainer of the Browser Library.


## What this means for the supply chain

The following points are only relevant if you consider the article [RCC Environments and their Supply Chain]({{< ref "/rcc-env-supplychain/" >}}) to be of significance.

**Before:** by way of the `package-lock.json` file, with exact versions and checksums, the supply chain could be checked down to the individual package at any time.

**With Batteries**, the situation shifts:

- **The upside:** the NodeJS side becomes a single pip-versioned package and therefore lands in the **freeze file** and in the [grace period check]({{< ref "/rcc-env-supplychain/" >}}) – where the npm tree never showed up before.
- **Worth noting:** instead of 84 checksums that npm verifies individually against the lockfile, you now only verify a single wheel hash against PyPI. (The evidence does remain available, though, because the lockfile travels inside the wheel.)

For the **browser binaries**, Batteries changes nothing – they still come from a CDN without any checksum comparison.

## Conclusion

So we can conclude: Browser Batteries is not a disk-space optimisation, but rather an **installation optimisation**. It removes npm as the third package manager from the chain, and with it the most fragile step in building an RCC environment.

On a development machine with open internet access you will hardly notice anything beyond a shorter build time.

In a corporate network with a proxy, TLS inspection and a virus scanner, things certainly look different again.

If you have experience or an opinion on this, I would be glad to see a comment below the article.
