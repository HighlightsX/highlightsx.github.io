---
title: "Hivemind mines your team's traces into shared skills"
description: "Sessions become searchable traces, repeated patterns become SKILL.md files, and every agent on the team inherits them. Benchmarked 25% cheaper on LoCoMo."
publishDate: 2026-08-30
category: data
tags: ["agent memory", "traces", "benchmarks", "teams"]
repo:
  owner: activeloopai
  name: hivemind
  url: https://github.com/activeloopai/hivemind
  stars: 1558
  language: TypeScript
  license: Apache-2.0
  createdAt: 2026-04-03
  pushedAt: 2026-08-14
  latestRelease:
    tag: v0.7.146
    date: 2026-08-14
  homepage: https://deeplake.ai/hivemind
  snapshotAt: 2026-08-16
sources:
  - label: "activeloopai/hivemind"
    url: "https://github.com/activeloopai/hivemind"
    publisher: "GitHub"
    published: 2026-04-03
  - label: "LoCoMo benchmark"
    url: "https://arxiv.org/abs/2402.17753"
    publisher: "arXiv"
    published: 2026-08-14
reviewed: false
---

[AutoHarness](/autoharness) distills skills from one developer's sessions. Hivemind does the same thing across a team, and adds the number that AutoHarness declines to claim: a benchmark.

## What it is

An Apache-2.0 memory and skill layer that captures every session's prompts, tool calls and responses as structured traces, mines them for repeated patterns, and codifies those patterns into `SKILL.md` files that propagate to every agent on the team. The pitch is that the agent your junior engineer uses on Tuesday is sharper because of what a senior engineer's agent worked out last week.

## Why it showed up now

v0.7.146 on August 14 — a version number that tells you the release cadence is continuous — four months after the first commit.

## How it actually works

Six moving parts, and two are unusual. Traces land in Deeplake. Search is hybrid lexical and semantic, with a BM25 fallback when embeddings are switched off, which means the thing still works without an embedding bill. Sessions get summarised into AI-generated wiki pages by a background worker at session end.

The unusual one: file operations on `~/.deeplake/memory/` are intercepted through a virtual filesystem backed by SQL. That is how an agent gets to treat memory as ordinary files while the storage underneath is queryable — a neat way to avoid teaching every agent a new API.

The benchmark is stated with its configuration, which is the minimum bar and one most projects miss. On LoCoMo — 100 QA pairs, Claude Haiku driven through `claude -p`, hybrid retrieval — against a no-memory baseline:

| Metric | Baseline | Hivemind |
|---|---|---|
| Cost per 100 QA | $8.94 | $6.65 |
| Tokens per question | 1,700 | 1,008 |
| Turns per question | 8.9 | 6.2 |

25% cheaper, 1.7× fewer tokens, 31% fewer turns. The explanation given is the honest one: the agent reaches the answer in fewer turns because prior work is already in scope at recall time instead of being re-derived.

Storage can be your own bucket — GCS, Azure, S3 or on-prem.

## Try it

```bash
npm i -g @deeplake/hivemind && hivemind install
```

The installer detects supported assistants, wires the hooks, and shows a consent prompt before opening a browser for sign-in. For CI, pass `HIVEMIND_TOKEN` instead; with no token in a non-interactive shell it installs hooks and skips sign-in.

## Where it is weak

The baseline is *no memory at all*, which is the easiest comparison available. It shows memory beats no memory on a memory benchmark — it does not show Hivemind beats the other memory systems, and LoCoMo is conversational rather than code-shaped.

Capturing every prompt, tool call and response from every engineer is a serious data decision. BYOC storage answers where it lives; it does not answer who on the team can read a trace containing something pasted in haste. The install flow wants a sign-in to a hosted service, so the open-source component and the product are entangled by default.

Skills mined from team traces propagate team habits, good and bad. 46 open issues, v0.7.x, and the same caveat as every trace-mining tool: read what it writes before it teaches everyone.
