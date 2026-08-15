---
title: "Epic open-sourced Lore, a version control system for artists"
description: "A Rust VCS from Epic Games built for repositories where the code is the small part: large binary assets, huge teams, free branching, tamper-evident history."
publishDate: 2026-08-15
category: devtools
tags: ["version control", "Rust", "game development", "Epic Games"]
repo:
  owner: EpicGames
  name: lore
  url: https://github.com/EpicGames/lore
  stars: 8395
  language: Rust
  license: MIT
  createdAt: 2026-05-21
  pushedAt: 2026-08-15
  latestRelease:
    tag: v0.8.6
    date: 2026-07-31
  homepage: https://lore.org
  snapshotAt: 2026-08-15
sources:
  - label: "EpicGames/lore"
    url: "https://github.com/EpicGames/lore"
    publisher: "GitHub"
    published: 2026-05-21
  - label: "Lore documentation"
    url: "https://epicgames.github.io/lore/"
    publisher: "Epic Games"
    published: 2026-07-31
reviewed: false
---

Git solved version control for text and has been apologised for ever since by anyone whose repository contains a 400 MB texture. Lore is Epic Games' answer, MIT-licensed, written in Rust: a version control system built from the start for projects that mix code with large binary assets, and for teams big enough that the tooling is a bottleneck.

## What it is

An open-source VCS designed for scale in two directions at once — data and people. The framing in the README is that it caters to developers and artists alike, which is the actual problem in games and film: the two groups have incompatible expectations of what a checkout should do, and Git only ever served one of them.

It runs in local mode on one machine or scales up to a server, and the pitch is shared, reusable data with as-needed downloads rather than cloning everything.

## Why it showed up now

Three months old as a public repository, v0.8.6 in July, pushed the day of the snapshot. Epic has been running large-asset version control internally for a long time — Unreal's ecosystem has lived on Perforce for years — so the interesting part is not that this exists but that it is MIT and public, with the roadmap and FAQ published alongside it.

## How it actually works

The four claims worth testing, in the project's own order: local-to-scaled setup, so you start in minutes and grow; shared, reusable data with on-demand downloads instead of full clones; free branching, cheap enough to create and sync without ceremony; and a verifiable, tamper-evident history.

That last one is the least common in this category and the most interesting. Asset pipelines have a specific failure mode Git users rarely think about — a binary that changed without a trustworthy record of who changed it or when — and building tamper-evidence into the source of truth is a direct answer to it.

The docs cover the architecture and the ethos separately, and the roadmap is organised by time horizon, with scalable locking and an open-source desktop client named as future work. Locking is not a detail in this world: two artists cannot merge the same binary, so the lock *is* the collaboration model, and its absence today tells you how far along this is.

## Try it

Install and run a local server in demo mode:

```bash
curl -fsSL https://raw.githubusercontent.com/EpicGames/lore/main/scripts/install.sh | bash -s -- --demo
```

Windows gets a PowerShell equivalent with `LORE_DEMO=1`.

## Where it is weak

The README says it plainly: pre-1.0 and under active development, with interfaces, on-disk formats and APIs subject to change between releases. On-disk format changes are the sharp edge for a VCS, because the thing at risk is the history itself.

Scalable locking is still on the roadmap, which is the feature the target audience will ask about first. There are 103 open issues, and the desktop client — the part artists would actually use — is also future work, so today this is a tool for the engineers on the team, not the people it is ultimately for.

The strategic question the FAQ addresses but cannot settle: adopting a VCS is the single stickiest decision a studio makes, and doing it on a pre-1.0 system from a company whose main business is something else is a bet on Epic's continued interest.
