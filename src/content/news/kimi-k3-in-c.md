---
title: "A 2.78-trillion-parameter model in 8 GB of RAM, in C99"
description: "kimi-k3-in-c streams a 1.56 TB checkpoint off disk to run Kimi K3 on an ordinary laptop CPU. No BLAS, no framework, no GPU, 176 KB of engine."
publishDate: 2026-08-17
category: ai
tags: ["inference", "C", "quantization", "mixture of experts"]
repo:
  owner: FareedKhan-dev
  name: kimi-k3-in-c
  url: https://github.com/FareedKhan-dev/kimi-k3-in-c
  stars: 5719
  language: C
  license: Apache-2.0
  createdAt: 2026-08-01
  pushedAt: 2026-08-07
  latestRelease:
    tag: v1.0.0
    date: 2026-08-07
  snapshotAt: 2026-08-15
sources:
  - label: "FareedKhan-dev/kimi-k3-in-c"
    url: "https://github.com/FareedKhan-dev/kimi-k3-in-c"
    publisher: "GitHub"
    published: 2026-08-01
  - label: "Building Kimi K3 in C to run a 2.8T model on consumer hardware"
    url: "https://medium.com/@fareedkhandev/building-kimi-k3-in-c-to-run-a-2-8t-model-on-consumer-hardware-a5792cbf3b59"
    publisher: "Medium"
    published: 2026-08-07
reviewed: false
---

The headline is absurd enough to check twice: a 2.78-trillion-parameter model producing tokens on a laptop with 8 GB of RAM. The checkpoint on disk is 1.56 TB. The engine that reads it is 176 KB of portable C99 with no BLAS, no framework and no GPU.

## What it is

An inference engine for Kimi K3, Apache-2.0, written from scratch in C99 with AVX2 SIMD and zero dependencies. The model is a mixture of experts, and MoE is the reason the trick works at all: only a small fraction of those trillions of parameters participate in any given token.

## Why it showed up now

Two weeks old, v1.0.0 tagged on August 7, and the numbers table did the rest. The author is explicit in the README that they are looking for research roles and PhD positions, which is worth knowing about the project's motivation and its likely maintenance horizon.

## How it actually works

The design inverts the usual constraint. Instead of asking how much model fits in memory, it asks how little memory a full model needs if you are willing to stream the rest from disk on every step. The published measurements on one machine — 124 cores, fast NVMe — show what that buys:

| RAM | Time per token | What is happening |
|---|---|---|
| 8 GB | 26.5 s | the whole model streams off disk every step |
| 32 GB | 24.2 s | some of it now sits in memory |
| 64 GB | 19.8 s | more of it sits in memory |
| 128 GB+ | 5.6 s | it fits; the disk wait is gone |

The important claim is not the speed, it is that the output is byte-identical from the smallest machine to the largest. Only the clock changes. More RAM buys latency, not quality — which makes memory a performance knob rather than a gate on whether you can run the model at all.

Peak RSS is measured at 8.24 GB. v1.0.0 made the per-token maths roughly 8× lighter, a chat follow-up 3.9× faster, and long prompts about half as expensive. Quantisation is MXFP4, attention is linear, and the whole thing is a single C99 target you compile yourself.

## Try it

```console
$ ./bin/k3 ~/k3model --trunk ~/k3trunk --preset laptop --tok ~/k3model --prompt "..."
```

Budget for the download before anything else: 1.56 TB of checkpoint has to land on a disk you own.

## Where it is weak

Twenty-six seconds per token on the 8 GB configuration is the honest cost of the headline. This is a demonstration that the model *runs*, not a claim that you would use it that way — a paragraph of output is a coffee break.

Everything depends on disk. The first three rows of that table read the model on every step, so a slower drive than the author's NVMe changes the numbers, and consumer SSDs have write-endurance and thermal behaviour that a 1.56 TB streaming workload will find.

Eighteen issues are open on a two-week-old repository written by one person, and the from-scratch, zero-dependency property that makes it impressive also means every bug is theirs to fix alone. Treat this as a superb piece of systems writing to read, and a research artefact to run — not as an inference stack to deploy.
