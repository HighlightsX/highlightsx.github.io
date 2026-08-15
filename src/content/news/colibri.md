---
title: "Colibrì runs 744B to 2.8T models off your SSD, in C"
description: "An engine treating VRAM, RAM and disk as one hierarchy, with a hard rule: run out of fast memory and it slows down, it never silently changes the model."
publishDate: 2026-08-22
category: ai
tags: ["inference", "C", "mixture of experts", "systems"]
repo:
  owner: JustVugg
  name: colibri
  url: https://github.com/JustVugg/colibri
  stars: 24947
  language: C
  license: Apache-2.0
  createdAt: 2026-07-01
  pushedAt: 2026-08-15
  latestRelease:
    tag: v1.6.2
    date: 2026-08-14
  homepage: https://justvugg.github.io/colibri
  snapshotAt: 2026-08-15
sources:
  - label: "JustVugg/colibri"
    url: "https://github.com/JustVugg/colibri"
    publisher: "GitHub"
    published: 2026-07-01
  - label: "Release v1.6.2"
    url: "https://github.com/JustVugg/colibri/releases/latest"
    publisher: "GitHub"
    published: 2026-08-14
reviewed: false
---

We covered [a 2.78-trillion-parameter model running in C99 on one CPU](/kimi-k3-in-c) — a single-model demonstration. Colibrì is the general version of that idea: five model families, 744B to 2.8T parameters, one C file each, the same front end, and a research programme attached.

## What it is

An inference engine in pure C with no engine dependencies, Apache-2.0, that treats VRAM, RAM and storage as a single tiered memory hierarchy — the README calls it AI memory multitiering. GLM-5.2 at 744B, Inkling at 975B, Kimi K3 at 2.8T, DeepSeek V4 Flash at 284B and OLMoE at 7B all run today behind `coli chat`, `coli serve` and `coli web`.

## Why it showed up now

v1.6.2 the day before the snapshot, 25,000 stars in six weeks. The engine is also openly a research platform: the stated goal is to push inference-side performance across the whole software/hardware boundary — model formats, memory hierarchy, storage I/O, placement, scheduling, kernels, speculation, CPU/GPU overlap — so that large models depend less on scarce hardware.

## How it actually works

Experts stream from disk, and where they live at any moment is a placement decision across three tiers rather than a fixed load. The sample session shows GLM-5.2 at 744B parameters in int4 ready in 32 seconds with 9.9 GB resident; the dashboard screenshot shows the same class of model at 4 tokens/second with 1.6 s to first token and zero disk traffic when six RTX 5090s hold full expert residency.

The engineering commitment worth quoting is the one about honesty under pressure: **no SLA on speed, a hard guarantee on semantics**. Insufficient fast memory may reduce speed; it must not quietly redefine the model. The default policy never silently changes precision or router semantics. That rule is the difference between a system that degrades and one that lies — quiet precision downgrades under memory pressure are exactly how an engine produces worse output while reporting success.

The instrumentation is unusual too. A Brain page renders all 19,456 experts as a cortex, coloured by storage tier and brightened by routing heat, and an Atlas page places 13,260 characterised experts in 3-D by measured routing affinity — position from measurement, not a learned embedding — with 1,041 replicated specialists clustering into topics like poetry, law, Chinese and SQL.

## Try it

```sh
./coli chat
```

The web dashboard is `./coli web`, and `coli serve` exposes it as an endpoint.

## Where it is weak

"No SLA on speed" is honest and it is also the headline caveat: on hardware without the fast memory, throughput can land anywhere, and the project explicitly declines to promise otherwise. Read the measurements as what one configuration achieved, not as what yours will.

Five model families means five hand-written C implementations to keep current as each upstream model moves, and 127 open issues on a six-week-old project is what that pace costs.

It is also, by its own description, a place to test aggressive systems ideas. The semantics guarantee makes that safer than it sounds, but a research platform and a production inference server are different commitments, and this one has chosen the former.
