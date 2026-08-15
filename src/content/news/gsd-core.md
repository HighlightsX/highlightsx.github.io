---
title: "GSD Core fights context rot with fresh-context subagents"
description: "A five-step phase loop for coding agents that runs research, planning and execution in clean 200k-token contexts so the main session never fills up."
publishDate: 2026-08-20
category: devtools
tags: ["context engineering", "agents", "spec-driven development", "workflow"]
repo:
  owner: open-gsd
  name: gsd-core
  url: https://github.com/open-gsd/gsd-core
  stars: 8273
  language: JavaScript
  license: MIT
  createdAt: 2026-05-22
  pushedAt: 2026-08-15
  latestRelease:
    tag: v1.10.0
    date: 2026-08-08
  homepage: https://opengsd.net
  snapshotAt: 2026-08-15
sources:
  - label: "open-gsd/gsd-core"
    url: "https://github.com/open-gsd/gsd-core"
    publisher: "GitHub"
    published: 2026-05-22
  - label: "Release v1.10.0"
    url: "https://github.com/open-gsd/gsd-core/releases/latest"
    publisher: "GitHub"
    published: 2026-08-08
reviewed: false
---

Git. Ship. Done. GSD Core is an MIT-licensed framework that drives coding agents through a fixed phase loop, and it exists to solve one specific failure: the quality decay that sets in as an agent's context window fills with the debris of its own work.

## What it is

A context-engineering and spec-driven development system that installs into whichever agent you use — Claude Code, OpenCode, Antigravity CLI, Kimi CLI, Kilo, Codex, Copilot, Cursor, Windsurf and more. Each milestone repeats the same five steps: Discuss, Plan, Execute, Verify, Ship.

The names are unremarkable; the enforcement is the product. Discuss captures implementation decisions *before* planning starts. Verify walks through what was built and fixes it before anything is declared done.

## Why it showed up now

v1.10.0 on August 8, pushed daily, three months after the first commit, with documentation organised into tutorials, how-to guides and explanation — the Diátaxis structure, which is a signal about how seriously the project takes being used by strangers.

## How it actually works

The mechanism worth taking away is where the work happens. All heavy research, planning and execution runs in fresh-context subagents, while the main session stays lean. Each executor in the Execute phase starts with a clean 200k-token context, and plans are run in parallel waves.

That is a direct structural answer to context rot, and it is the same reason a plan is verified against a fresh context window during the Plan step: if the plan does not fit, it gets decomposed further before anyone starts building. Most agent workflows discover that limit halfway through execution, when the context is already full of half-relevant file contents.

The installer is mandatory rather than optional — the README is explicit that copying files from `agents/` or `commands/` directly will not work, because cross-runtime compatibility is what the installer produces.

## Try it

```bash
npx @opengsd/gsd-core@latest
```

It prompts for your runtime and whether to install globally or locally. Then `/gsd-new-project` for greenfield work, or `/gsd-onboard` to bring an existing repository under the loop.

## Where it is weak

This is process, and process has a floor cost. Five phases with discussion, planning, verification and archiving is heavy for a one-file fix, and the discipline that pays for itself on a milestone is friction on a typo.

Parallel execution waves with clean 200k contexts each is also not free: fresh context means re-reading, and re-reading means tokens. The README does not publish a cost comparison against running the same work in one session, which is the number a team evaluating this would want.

Eighty-nine issues are open, and supporting nine-plus agent runtimes means every one of them can break the installer independently. As with every prompt-level framework, what you are adopting is a set of instructions whose enforcement depends entirely on the model choosing to follow them.
