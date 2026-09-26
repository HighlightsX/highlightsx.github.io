---
title: "Ponytail makes your coding agent stop over-building"
description: "An agent skill that enforces YAGNI and reaches for native platform features first. Its own benchmark walked back its earlier, more flattering numbers."
publishDate: 2026-08-11
category: devtools
tags: ["agent skills", "YAGNI", "benchmarks", "Claude Code"]
repo:
  owner: DietrichGebert
  name: ponytail
  url: https://github.com/DietrichGebert/ponytail
  stars: 103169
  language: JavaScript
  license: MIT
  createdAt: 2026-06-12
  pushedAt: 2026-08-07
  latestRelease:
    tag: v4.9.0
    date: 2026-08-07
  homepage: https://ponytail.dev
  snapshotAt: 2026-08-15
sources:
  - label: "DietrichGebert/ponytail"
    url: "https://github.com/DietrichGebert/ponytail"
    publisher: "GitHub"
    published: 2026-06-12
  - label: "Agentic benchmark results, 2026-06-18"
    url: "https://github.com/DietrichGebert/ponytail/blob/main/benchmarks/results/2026-06-18-agentic.md"
    publisher: "GitHub"
    published: 2026-08-07
reviewed: false
---

Ask an agent for a date picker and you get a dependency, a wrapper component, a stylesheet and a conversation about timezones. Ponytail is an MIT-licensed skill whose entire job is to make the agent answer with `<input type="date">` instead.

## What it is

A prompt-level persona (the laziest senior developer in the room) and rule set, installed into Claude Code, Cursor or a similar agent. The ladder it enforces is the one experienced engineers use without naming it: does this need to exist, is it already in the codebase, does the standard library do it, does a native platform feature cover it, can it be one line, and only then write something.

At 103,169 stars it is the most-starred project covered on this site so far.

## Why it showed up now

v4.9.0 in early August, and a set of benchmark numbers that got revised downward in public. This post covers it for the revision.

## How it actually works

The skill is a set of instructions with no code; the engineering went into the measurement. The current headline figures (roughly 54% less code, up to 94%, about 20% cheaper and 27% faster) come from a headless Claude Code session editing a real repository, tiangolo's full-stack FastAPI template, scored on the `git diff` it leaves behind. Twelve feature tickets, the same agent with and without the skill, n=4, on Haiku 4.5.

The cut is largest where there is a clear over-build trap: a date picker going from 404 lines to 23, a colour picker from 287 to 23, because the agent reaches for a native input instead of building a component. On code that was already minimal, the difference is near zero.

Earlier versions of the README advertised 80 to 94% less code as a flat figure, from a single-shot benchmark comparing bare model completions. An issue on the repository pointed out that a chatty baseline pads its answer with prose and alternatives, so much of that gap was an artefact of the comparison. The project kept the old numbers visible, marked them as superseded, and published the corrected agentic measurement as the defensible one.

The safety claim is measured too: the README states the skill keeps every safety guard, where a bare "write one-liners" prompt drops one.

## Try it

Install it as a skill in your agent from the repository, then give it a task with an obvious over-build trap, such as a date input, a colour picker or a modal, and read the diff.

## Where it is weak

The measurement is still the author's own, on one repository, one model and four runs per task. n=4 on Haiku 4.5 is too small to count as a finding, and lines of diff is a proxy that rewards terseness even where terseness is not the goal.

136 issues are open, and the last push was August 7, a week before the snapshot. For a project at this level of attention, that is a noticeable pause.

A laziness bias also costs something on some tasks. Input validation, error handling and abstractions you will actually need in two weeks are the cases where "the shortest diff that works" is the wrong instinct, and no prompt reliably knows which case it is in.
