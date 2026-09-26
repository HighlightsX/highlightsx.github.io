---
title: "AutoHarness writes its own skills from your sessions"
description: "A self-maintaining skill layer for Claude Code that distills skills from real work, merges near-duplicates, and prunes what stops getting used."
publishDate: 2026-08-29
category: devtools
tags: ["agent skills", "Claude Code", "Python", "self-improving"]
repo:
  owner: tigerless-labs
  name: autoharness
  url: https://github.com/tigerless-labs/autoharness
  stars: 1000
  language: Python
  license: MIT
  createdAt: 2026-06-09
  pushedAt: 2026-07-28
  snapshotAt: 2026-08-16
sources:
  - label: "tigerless-labs/autoharness"
    url: "https://github.com/tigerless-labs/autoharness"
    publisher: "GitHub"
    published: 2026-06-09
  - label: "HAL: Holistic Agent Leaderboard"
    url: "https://arxiv.org/abs/2510.11977"
    publisher: "arXiv"
    published: 2026-07-28
reviewed: false
---

Skill libraries have a lifecycle problem nobody wants to own. You write skills, they drift out of date, near-duplicates pile up, and nothing is ever deleted because deleting requires knowing which ones are dead. AutoHarness is an MIT-licensed bet that this particular chore can maintain itself.

## What it is

A self-learning skill layer for Claude Code. It watches your real sessions and distills skills from them, merges same-scenario skills instead of stacking near-duplicates, updates them as you work, and prunes the ones that stop being used.

It touches only the skills it wrote itself, so your hand-written skills are outside its reach.

## Why it showed up now

A thousand stars on a project with one open issue, no tagged release, and last push July 28. It is included for the idea; there is little momentum behind it.

## How it actually works

The framing comes from the observation that the harness, not the model, does much of the work. The README cites HAL's finding that the same model goes from 42% to 78% on CORE-Bench under a different harness. That is evidence that harness quality matters a great deal. It says nothing about AutoHarness itself, and the project is explicit that it ships no benchmark of its own.

The bet follows from the observation. If the harness matters that much and is still rebuilt by hand every model generation, then at least one slice of it, the skill layer, should maintain itself.

Mechanically it runs entirely as Python with zero third-party dependencies, wiring in through Claude Code hooks and an MCP server, landing learned skills into `.claude/skills/` in the background. No daemon. Cadence and lifecycle thresholds are configurable, and the pruning rule uses usage as the signal: a skill that stops being invoked is eventually deleted.

## Try it

From the Claude Code input box:

```
/plugin marketplace add tigerless-labs/autoharness
/plugin install autoharness@autoharness
```

Then `/reload-plugins`. Requires `python3` on your PATH; the hooks and MCP server will not fire without it. Note that third-party marketplaces have auto-update off by default, and the README's update instructions insist on refreshing the catalog before updating, because a stale local catalog will otherwise report you are already current.

## Where it is weak

A system that writes instructions by reading your sessions is a system that can learn the wrong lesson confidently. A one-off workaround, distilled into a skill and re-applied for months, is worse than no skill. The pruning rule cannot help, because a bad skill that keeps getting invoked looks exactly like a good one.

Sessions are the training data, so a generated skill may encode whatever appeared in them: paths, internal names, credentials pasted into a prompt. Read the skills it writes.

No release tags, one contributor's worth of activity, last push nearly three weeks before this snapshot, and no evaluation of whether its generated skills actually help. It is a proof of concept.
