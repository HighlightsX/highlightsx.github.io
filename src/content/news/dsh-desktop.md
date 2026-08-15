---
title: "A community desktop shell for DeepSeek Harness, in two days"
description: "DSH Desktop wraps the official harness in a native app with a tray, a plugin marketplace, phone remote control and IM channels — and is not a DeepSeek product."
publishDate: 2026-08-26
category: apps
tags: ["desktop", "DeepSeek", "plugins", "Electron"]
repo:
  owner: anywhere-labs
  name: deepseek-harness-desktop
  url: https://github.com/anywhere-labs/deepseek-harness-desktop
  stars: 5380
  starsGained: 131
  language: TypeScript
  license: MIT
  createdAt: 2026-08-13
  pushedAt: 2026-08-15
  latestRelease:
    tag: v0.1.0
    date: 2026-08-13
  homepage: https://dshdesktop.cn
  snapshotAt: 2026-08-15
sources:
  - label: "anywhere-labs/deepseek-harness-desktop"
    url: "https://github.com/anywhere-labs/deepseek-harness-desktop"
    publisher: "GitHub"
    published: 2026-08-13
  - label: "deepseek-ai/deepseek-harness"
    url: "https://github.com/deepseek-ai/deepseek-harness"
    publisher: "GitHub"
    published: 2026-08-13
reviewed: false
---

[DeepSeek Harness](/deepseek-harness) shipped on August 13 with a web UI you start from the command line. By August 15 someone had wrapped it in a native desktop app with a system tray, a plugin marketplace, phone remote control and chat-app channels. That turnaround is the story here.

## What it is

An MIT-licensed desktop experience for the DSH ecosystem, built as a plugin rather than as a rival. It starts and manages the local Harness service itself, so there is no Node install and no command to remember, and it integrates a tray and a desktop window around the official web UI. Installers exist for macOS and Windows.

Beyond the wrapper: remote control from iOS and Android so you can start a task and watch progress from a phone; channels into WeChat, Feishu, Discord and WhatsApp so tasks can be started from the chat app you already have open; and a plugin marketplace for discovering, installing and updating DSH plugins.

## Why it showed up now

It gained 131 stars in the few hours between two discovery runs, the fastest mover in the queue. Two days old, v0.1.0 tagged on day one. When a platform declares that everything is a plugin, the interesting question is whether anyone builds one — this is the first substantial answer.

## How it actually works

The project builds against a pinned submodule of the upstream `deepseek-harness` source, with the outer repository on Yarn and the pinned submodule keeping its own pnpm workspace. The core agent loop, models, tools, sessions, web UI and plugin ecosystem all come from upstream; this repository owns the desktop packaging, the local service lifecycle, tray and window integration, and the macOS and Windows builds.

The stated ambition is not to remain a wrapper. The plan is to reorganise the desktop capabilities as proper plugins under the official mechanism, so service management, system integration and the marketplace compose the same way everything else in the harness does. That is the right instinct for an ecosystem project and also the hardest part to finish.

Development is three commands from the repository root:

```sh
git submodule update --init --recursive
corepack yarn install --immutable
corepack yarn dev
```

## Try it

Installers for macOS and Windows are linked from the README and from the project site. The README also states plainly that the project is free and that anyone selling you this software should be refused.

## Where it is weak

It is a community project, not a DeepSeek product, and the README says so twice. Anything it gets wrong will nonetheless be experienced by users as DeepSeek getting it wrong.

Pinning a submodule to a fixed upstream commit is a sensible way to build against a moving target, and it means you are always running an older harness than the one upstream ships — on a project whose own README promises compatibility-breaking changes.

Seventy-one open issues at two days old. Documentation is mostly Chinese, with an English README available but less complete. And the wrapper inherits the trust surface of the thing it wraps, plus a new one: an app that manages a local service, integrates a tray, and bridges four messaging platforms is a lot of privilege for a two-day-old project to hold.
