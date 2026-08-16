---
title: "Planning with Files keeps the plan when the context dies"
description: "Three markdown files on disk, re-injected every turn, so an agent survives /clear, compaction and crashes without asking you to restate the goal."
publishDate: 2026-08-28
category: devtools
tags: ["agent skills", "context engineering", "planning", "context rot"]
repo:
  owner: OthmanAdi
  name: planning-with-files
  url: https://github.com/OthmanAdi/planning-with-files
  stars: 26187
  language: Shell
  license: MIT
  createdAt: 2026-01-03
  pushedAt: 2026-08-14
  latestRelease:
    tag: v3.10.1
    date: 2026-08-14
  homepage: https://www.skills.sh/othmanadi/planning-with-files/planning-with-files
  snapshotAt: 2026-08-16
sources:
  - label: "OthmanAdi/planning-with-files"
    url: "https://github.com/OthmanAdi/planning-with-files"
    publisher: "GitHub"
    published: 2026-01-03
  - label: "Release v3.10.1"
    url: "https://github.com/OthmanAdi/planning-with-files/releases/latest"
    publisher: "GitHub"
    published: 2026-08-14
reviewed: false
---

Every coding agent loses its working memory when the context window resets, and every user knows the sequence that follows: the agent re-reads the repository, asks you to restate the goal, and cheerfully redoes work it finished an hour ago. This MIT-licensed skill's premise is that the plan should not live in the context window at all.

## What it is

Three files on disk — `task_plan.md`, `findings.md` and `progress.md` — maintained by the agent and re-injected into context every turn. The README's one-line version is hard to improve on: your agent's context window dies, the plan does not.

It installs across 60-plus agents through the Agent Skills standard, from npm, the Claude Code plugin marketplace or `npx skills`.

## Why it showed up now

v3.10.1 on August 14, seven months and three major versions after the first commit, with only 7 open issues against 26,000 stars. That combination — heavy use, quiet tracker — usually means the thing does one job and does it.

## How it actually works

The mechanism is the separation of *plan* from *context*. An agent that keeps its plan in conversation loses it to `/clear`, to compaction, or to a crash. An agent that keeps it in a file loses nothing, provided something puts the file back in front of the model each turn — which is the part the skill automates, and the part people hand-rolling this usually forget.

The three-file split is doing real work. `task_plan.md` is intent, `findings.md` is what was learned along the way, and `progress.md` is what is actually done. Collapsing those into one file is how you get a plan that quietly rewrites its own history to match what happened.

Per-turn re-injection is also a direct answer to context rot: the plan is re-stated at full strength each turn rather than decaying into the middle of a long transcript where models attend to it least.

There is an opt-in deterministic completion gate — the agent cannot declare itself done until the gate's conditions are met, which converts "looks finished" into a checkable condition.

## Try it

```bash
npx skills add OthmanAdi/planning-with-files
```

Then give it a task long enough to hit a context reset, and watch what survives.

## Where it is weak

Every turn spent re-injecting three files is context spent on the plan rather than on your code, and on a short task that is pure overhead. The technique earns its cost on long-horizon work and loses on quick edits.

The files are only as honest as the agent writing them. A model that misreports progress produces a `progress.md` that is confidently wrong and now persists across sessions — durable memory keeps mistakes as faithfully as it keeps facts.

Distribution across 60-plus agents through a shared standard is the strength and the exposure: the skill is a set of instructions, and enforcement depends on each host actually honouring them. The completion gate is the only part that is mechanical.
