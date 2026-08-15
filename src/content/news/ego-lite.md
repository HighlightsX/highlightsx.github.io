---
title: "ego lite is a browser you and your agent share"
description: "Instead of driving a separate browser, agents get their own Spaces inside yours — reaching your real logins without stealing the tab you are reading."
publishDate: 2026-08-24
category: devtools
tags: ["browser automation", "agents", "macOS", "skills"]
repo:
  owner: citrolabs
  name: ego-lite
  url: https://github.com/citrolabs/ego-lite
  stars: 10772
  language: JavaScript
  license: MIT
  createdAt: 2026-04-16
  pushedAt: 2026-08-15
  latestRelease:
    tag: v1.2.3
    date: 2026-08-11
  homepage: https://lite.ego.app
  snapshotAt: 2026-08-15
sources:
  - label: "citrolabs/ego-lite"
    url: "https://github.com/citrolabs/ego-lite"
    publisher: "GitHub"
    published: 2026-04-16
  - label: "ego lite roadmap"
    url: "https://lite.ego.app/roadmap"
    publisher: "Citro Labs"
    published: 2026-08-11
reviewed: false
---

Anyone who has handed a browser-automation tool to a coding agent knows the two failures: the agent drives a fresh browser where you are logged into nothing, and if you point it at your real profile, you spend the session fighting over the same tabs. ego lite is an MIT-licensed browser built for the case where a person and an agent use one browser at once.

## What it is

A browser where agents run their tasks in their own Spaces while your tabs stay yours. The framing against the incumbents is precise: browser-use and agent-browser are automation frameworks that need a separate browser to drive, logins never carry cleanly, and you and the agent contend for the same window. ego lite is one browser designed for both parties from the start, and the agent reaches your real logins and tabs through a skill called `ego-browser`.

## Why it showed up now

v1.2.3 on August 11, pushed the day of the snapshot, four months old. Installing the app also drops the `ego-browser` skill into every agent's skills directory on the machine, which is a distribution choice as much as a technical one — it makes the browser available to Claude Code, Codex and anything else that reads that directory.

## How it actually works

Spaces are the whole idea. Each agent task gets an isolated context inside the same browser process, so parallel tasks do not collide with each other or with you, while shared session state means the agent is not stuck at a login wall. The claimed benefit is speed and fewer tokens per task, which follows from not having to log in, re-navigate and re-screenshot from a cold profile every time.

Installation is either the macOS app or just the skill:

```bash
npx skills add citrolabs/ego-lite
```

The first time an agent runs a browser task, it walks you through installing the rest.

## Try it

Download the macOS app, or add the skill and let your agent prompt you when it needs the browser.

## Where it is weak

The security model is the story here, and it deserves more than a shrug. The selling point is that an agent can reach your logged-in state — mail, cloud console, bank, whatever the browser holds — without you doing anything. That is precisely the capability a prompt injection on a hostile page is trying to obtain, and a page an agent visits is untrusted input by definition. Spaces isolate tasks from each other; they do not make your session cookies safe to hand to a model that just read an attacker's HTML.

macOS only today, with Windows and Linux on the roadmap. 107 open issues on a four-month-old project.

And the name says the rest: this is the lite edition of a commercial product. The open-source part is genuinely MIT, but the roadmap belongs to a company whose full product is the thing being funded.
