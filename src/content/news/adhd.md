---
title: "ADHD fixes premature convergence by splitting the context"
description: "A skill that spawns parallel reasoning processes under distorted cognitive frames with no shared context, then scores, prunes traps and deepens survivors."
publishDate: 2026-08-25
category: ai
tags: ["reasoning", "tree of thought", "agent skills", "TypeScript"]
repo:
  owner: UditAkhourii
  name: adhd
  url: https://github.com/UditAkhourii/adhd
  stars: 3587
  language: TypeScript
  license: MIT
  createdAt: 2026-05-25
  pushedAt: 2026-08-05
  latestRelease:
    tag: v0.1.4
    date: 2026-05-30
  homepage: https://divergent.sh
  snapshotAt: 2026-08-15
sources:
  - label: "UditAkhourii/adhd"
    url: "https://github.com/UditAkhourii/adhd"
    publisher: "GitHub"
    published: 2026-05-25
  - label: "ADHD: Parallel Divergent Ideation for Coding Agents"
    url: "https://adhdstack.github.io/"
    publisher: "Udit Akhouri"
    published: 2026-08-05
reviewed: false
---

Ask a model for options and it commits to the first frame it lands in, then generates variations inside it. Chain-of-thought anchors on whatever it says first; tree-of-thought widens the search but walks a single shared context, so the anchoring survives the branching. ADHD's claim is that this is an architectural problem, not a prompting one.

## What it is

An MIT-licensed skill for coding agents, built on the Claude and Codex agent SDKs, that spawns N isolated reasoning processes under deliberately distorted cognitive frames, with zero shared context during the divergent phase. A separate critic pass then scores the output, clusters it, prunes traps and deepens the survivors.

It is aimed at a specific shape of question: design decisions, fuzzy debugging, naming, API surface design, strategy — anything phrased as "give me a few ways to…".

## Why it showed up now

A preprint, a public eval set and committed transcripts, which is more apparatus than a prompt-engineering repository usually carries. v0.1.4 dates from May and the last push was August 5.

## How it actually works

Isolation is the mechanism. If branches share a context window, they share the anchor — the first framing contaminates every subsequent one, which is why tree-of-thought often produces four variants of the same idea. Running each frame as its own process with no shared state makes the divergence real, and the frames themselves are deliberately skewed rather than neutral, with names like `economic-incentive`, `async-control-surface`, `gamification`, `perceptual-distortion` and `collective-intelligence`.

The README's side-by-side is honest enough to be useful. Given "our CLI sometimes hangs for 90 seconds, design the retry/timeout/UX strategy", the baseline produces four textbook patterns and a sensible hybrid — 15s first-token timeout, 30s between tokens, 90s absolute, one auto-retry. The critique of that answer is not that it is wrong; it is that no traps are named, the possibility that the *user* wants to bail out is never raised, and the "wait, then retry the same model" frame is never questioned. ADHD's six frames surface 30-plus ideas across those blind spots, then prune.

That is the honest version of what this buys: not better answers to well-posed questions, but a wider set of framings before you commit to one.

## Try it

Install it as a skill in Claude Code or Codex, then use it only where divergence is the point — a question with one right answer will just cost more.

## Where it is weak

Six isolated reasoning processes cost roughly six times the tokens of one, plus the critic pass. The value is real on genuinely open questions and negative on everything else, and nothing in the tool decides which one you have.

The evidence is a self-published preprint with the author's own eval problems and transcripts. Committed transcripts are better than a claim, but this has not been evaluated by anyone else.

v0.1.4 from late May, last push August 5, 12 open issues. That is a small, quiet project — the Discord and community forms in the README are recruiting for the contributors it does not have yet.
