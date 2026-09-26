---
title: "FreeToken streams MoE experts to a gaming GPU on demand"
description: "A Python and CUDA engine that keeps hot experts on the GPU, the rest in RAM, and splits misses between PCIe and the CPU. One outside test: 2.25x Ollama."
publishDate: 2026-09-16
category: ai
tags: ["inference", "mixture of experts", "Python", "local-first", "benchmarks"]
repo:
  owner: FlashML-org
  name: FreeToken
  url: https://github.com/FlashML-org/FreeToken
  stars: 13820
  starsGained: 1308
  language: Python
  license: Apache-2.0
  createdAt: 2026-07-20
  pushedAt: 2026-09-26
  latestRelease:
    tag: v0.1.3
    date: 2026-09-16
  homepage: https://www.flashml.ai/
  snapshotAt: 2026-09-26
sources:
  - label: "FlashML-org/FreeToken"
    url: "https://github.com/FlashML-org/FreeToken"
    publisher: "GitHub"
    published: 2026-07-20
  - label: "FreeToken: Running Massive MoE Models Locally at 2-4x Ollama's Speed"
    url: "https://betterstack.com/community/guides/ai/freetoken-moe-inference/"
    publisher: "Better Stack Community"
    published: 2026-08-31
reviewed: false
---

A mixture-of-experts model only uses a few of its experts for each token, so most of its weights sit idle at any moment. FreeToken is built on that fact: keep the experts that keep getting picked on the graphics card, park the rest in system memory, and fetch or compute the missing ones as cheaply as the machine allows.

## What it is

A serving engine in Python with Triton and CUDA kernels, from a team that published the design as an arXiv paper in August. It loads Hugging Face checkpoints of DeepSeek-V4-Flash, GLM-5.2, Qwen3.6, gpt-oss, Gemma-4, MiniMax and others, and exposes OpenAI and Anthropic style APIs so Claude Code, Codex or OpenCode can point at it. The command-line install is Linux with an NVIDIA card and CUDA 13; a separate desktop app covers Windows. AMD support is a guide marked work in progress.

## Why it showed up now

13,820 stars on September 26, 1,308 of them in the discovery window, on a repository created July 20. v0.1.3 shipped September 16 with image input and a rebuilt quantization layer. The commit history is busy: the last push was the day of the snapshot.

## How it actually works

The README's central claim is "global LRU expert caching", and the code matches it. `python/freetoken/moe/offload_cache.py` keeps a fixed number of expert slots on the GPU with `cache_policy: str = "lru"`, and LRU is the only policy the class accepts. A miss is copied over PCIe from host memory.

The "bandwidth-adaptive CPU-GPU co-execution" claim is narrower in code than on the page. `moe/benchbw.py`, run as `ft bench bw`, measures the CPU's expert kernel against the PCIe copy on your machine, recommends the hybrid mode when the CPU side is more than twice as fast, and writes a per-GPU profile. Hybrid then fetches a fixed fraction of misses and computes the rest on the CPU. It is a one-time calibration per machine, not a policy that reacts while serving, and the name used in the README appears nowhere in the source.

"Runtime VRAM re-allocation without restarts" is real but conditional. The resize method in `engine/engine.py` says it runs "idle-only" and that the scheduler must guarantee nothing is in flight. It validates the new sizes before freeing anything, which is careful, but open issue 526 shows an out-of-memory error during a rebuild whose rollback crashed, leaving the server answering every request with "restart required".

The agent-friendly cache is also there: `scheduler/cache.py` snapshots the recurrent state at a tool-call point, so a client that rewrites a tool call can resume from there instead of re-reading the whole context.

Better Stack's test, updated August 31, ran Qwen3.6 35B on an RTX 5090 with 64 GB of RAM. When the model did not fit in video memory, FreeToken decoded a median 132.5 tokens a second against Ollama's 58.8. When it did fit, Ollama was slightly faster, 239.6 to 225.3.

## Try it

```bash
uv pip install "freetoken[accel]"
ft bench bw
ft serve --model ~/path/to/Qwen3.6-35B-A3B
```

Kernels compile on first use and need `nvcc` from a CUDA 13 toolkit on the path.

## Where it is weak

344 open issues in ten weeks. Many are "weights failed to load" reports from the Windows desktop app for specific NVFP4 checkpoints. Issue 544 reports decode speed on Windows falling from 60 to 120 tokens a second to 11 to 25 after a few dozen requests, recovering only on restart. An RTX 3090 user reports the GPU dropping off the bus at an 8,192-token prefill in offload mode.

The format churn is visible too: the repository ships a repair script for its own weight files converted before the quantization refactor.

Compared with Colibrì, which streams even larger models off an SSD in C, FreeToken stops at system memory and aims for interactive speed instead of maximum size. Against Ollama, the gain only applies once the model spills out of video memory.
