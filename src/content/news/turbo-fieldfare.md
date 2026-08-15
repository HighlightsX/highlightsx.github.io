---
title: "TurboFieldfare runs Gemma 4 26B on an 8 GB MacBook"
description: "A Swift and Metal runtime that keeps a 1.35 GB core resident and streams only the experts each token needs off SSD, built for Apple Silicon rather than on MLX."
publishDate: 2026-08-23
category: ai
tags: ["Apple Silicon", "Swift", "Metal", "local inference"]
repo:
  owner: drumih
  name: turbo-fieldfare
  url: https://github.com/drumih/turbo-fieldfare
  stars: 6007
  language: Swift
  license: Apache-2.0
  createdAt: 2026-07-17
  pushedAt: 2026-08-15
  latestRelease:
    tag: "0.4.3"
    date: 2026-08-13
  snapshotAt: 2026-08-15
sources:
  - label: "drumih/turbo-fieldfare"
    url: "https://github.com/drumih/turbo-fieldfare"
    publisher: "GitHub"
    published: 2026-07-17
  - label: "Gemma 4 model card"
    url: "https://ai.google.dev/gemma/docs/core/model_card_4"
    publisher: "Google"
    published: 2026-08-13
reviewed: false
---

Apple sells laptops with 8 GB of unified memory and a chip fast enough to run models that do not fit in it. TurboFieldfare is one developer's answer to that mismatch: a Swift and Metal runtime that gets Gemma 4 26B-A4B, a 14.3 GB model, running in roughly 2 GB of RAM on any M-series Mac.

## What it is

A model-specific inference runtime — not a wrapper around MLX or llama.cpp — comprising the runtime itself, a streaming installer, a CLI and a native Mac app, all in Swift and Metal. Apache-2.0. The README's opening line is the whole motivation: memory got expensive, so a 26-billion-parameter model was given a 2 GB budget.

## Why it showed up now

Version 0.4.3 two days before the snapshot, on a repository one month old, pushed daily. What stands out in a category full of benchmark claims is the curated experiment record: 103 measured results across kernels, caching, I/O, prefill and decode, kept in the repository as a document rather than a blog post.

## How it actually works

Gemma 4 26B-A4B is a mixture of experts, and the runtime exploits that shape directly. The shared 1.35 GB core stays resident along with an FP16 KV cache, and for each token only the experts that token actually needs are streamed from SSD. Nothing else is loaded. That is what fits the model into a machine whose entire memory is smaller than the checkpoint.

Being model-specific is the deliberate trade. A general runtime has to handle any architecture, which means it cannot assume where the expert boundaries are or how to lay them out on disk for the access pattern that follows. Giving that up buys layout and scheduling decisions tuned to one model — and costs you every other model.

Writing it in Swift and Metal rather than adopting MLX puts the author on the hook for the kernels, which is presumably why the experiment inventory exists at all.

## Try it

```bash
git clone https://github.com/drumih/turbo-fieldfare.git
cd turbo-fieldfare
swift build -c release
.build/release/TurboFieldfareMac
```

On first launch, choose Download and let it fetch and repack the pinned model — about 15 GB. Then Load Model and type a prompt.

## Where it is weak

The name of the project should be read as its scope: this runs Gemma 4 26B-A4B. Not your fine-tune, not the next model Google ships. When that model is superseded, the runtime needs work to follow it, and the design that makes it fast is the design that makes it narrow.

Streaming experts from SSD on every token is sustained read traffic on the machine's internal drive, and on a Mac that drive is not replaceable. The 8 GB configuration is also the one where the streaming never stops, so it is the configuration with the least headroom for anything else you are doing.

Version 0.4.3, 52 open issues, and a single maintainer. The benchmark discipline is genuinely good, but those numbers come from the author's own hardware and methodology — the README invites contributed results precisely because one machine is not a sample.
