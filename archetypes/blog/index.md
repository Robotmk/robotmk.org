---
draft: true
title: "{{ replace .TranslationBaseName '-' ' ' | title }}"
# --- Italic subheading
# lead: 
# -- giscus id to match comments
# commentid: 
# -- predefined URL
# slug: 
# -- for posts in menubar, use this (shorter) title
# menutitle: 
description: 
date: "{{ .Date }}"
# --- TAXONOMY -------------------------------------------------------------
# categories: EXACTLY ONE. What kind of text is this?
#   tutorial   ... guided, zero to first success (no prior knowledge needed)
#   how-to     ... one concrete problem, solved in an existing setup
#   background ... explains a concept: why something works the way it does
#   news       ... release, announcement, media appearance
#   event      ... conference / meetup: announcement or recap
categories:
  - background
# tags: 2-5, lowercase, kebab-case. A tag needs >= 2 articles to earn its page.
#   scope   (exactly one, required): robotmk | robot-framework
#   tool    (0-2): rcc, browser-library, checkmk, vs-code, mcp, rmk-starter,
#                  crypto-library, image-horizon-library
#   topic   (1-2): web-testing, desktop-testing, selectors, accessibility,
#                  security, environments, installation, troubleshooting,
#                  air-gapped, ai, release
#   event        : robocon, wrobocon
tags:
  -
# --------------------------------------------------------------------------
authorbox: true
sidebar: true
pager: false
#menu: main
#weight: 10
# --- must be in the leaf bundle folder or static
#thumbnail: ""
---



<!--more-->