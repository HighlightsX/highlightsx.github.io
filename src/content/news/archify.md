---
title: "Archify draws architecture your agent cannot make up"
description: "A diagram skill built on a typed JSON IR with deterministic checks, so nodes trace to real source and two snapshots diff into added, removed and rerouted."
publishDate: 2026-08-31
category: graphics
tags: ["diagrams", "architecture", "agent skills", "visualization"]
repo:
  owner: tt-a1i
  name: archify
  url: https://github.com/tt-a1i/archify
  stars: 13033
  language: HTML
  license: MIT
  createdAt: 2026-04-15
  pushedAt: 2026-08-14
  latestRelease:
    tag: v2.14.0
    date: 2026-08-11
  homepage: https://tt-a1i.github.io/archify/
  snapshotAt: 2026-08-16
sources:
  - label: "tt-a1i/archify"
    url: "https://github.com/tt-a1i/archify"
    publisher: "GitHub"
    published: 2026-04-15
  - label: "Release v2.14.0"
    url: "https://github.com/tt-a1i/archify/releases/latest"
    publisher: "GitHub"
    published: 2026-08-11
reviewed: false
---

Ask an agent for an architecture diagram and you get something that looks right. Whether the arrows correspond to calls that exist is a separate question, and usually the answer is partly. Archify's design is aimed squarely at that gap.

## What it is

An MIT-licensed agent skill for Claude Code, Codex CLI, Cursor, OpenCode and Raven that turns a repository or a system description into an interactive technical map: five diagram types — architecture, workflow, sequence, data flow and lifecycle — with four visual presets, dark and light themes and optional finite motion.

Output is one self-contained HTML file, plus PNG, SVG, WebM and a 1200×630 share card.

## Why it showed up now

v2.14.0 on August 11, four months after the first commit, 13,000 stars. The project publishes a gallery it calls the Proof Lab, which is the appropriate name for the thing that has to convince you.

## How it actually works

Between the agent and the picture sits a typed JSON intermediate representation with deterministic checks. The model proposes topology; the IR validates it; the renderer draws only what survives. That is the whole trick, and it is why the project can use the word *verifiable* about output that a language model helped produce.

The consequences show up in the interactions. You can search nodes, optionally open revision-verified source for a node, trace upstream and downstream reach along exact routes, compare roles, and play guided stories — all without the diagram inventing topology to fill a gap. A guided tour that cannot introduce an edge that does not exist is a different artefact from a generated picture.

The feature I would use first is the snapshot diff: compare two validated snapshots as Before / Delta / After and get exact added, removed, changed, moved and rerouted facts. Reviewing an architectural change as a diff of validated graphs is strictly better than reading two diagrams side by side and squinting.

## Try it

```bash
npx skills add tt-a1i/archify -g
```

Then ask your agent to map the repository's runtime architecture. The [Proof Lab](https://tt-a1i.github.io/archify/gallery.html) shows generated output before you install anything.

## Where it is weak

Verifiable means the graph is internally consistent and node references check out — not that the abstraction is the right one. Deciding which components matter and which detail to omit is the hard part of architecture drawing, and that judgement still comes from a model.

Self-contained HTML with motion and an interactive graph is a heavy artefact. For a large system, "one file you can share" becomes a file people wait for.

Fifteen open issues, v2.14.0 in four months. The README carries two sponsors, one of them an API reseller with a referral link and a discount code, the other a company whose own agent harness supports Archify as a skill — disclosed, and worth reading with that in mind.
