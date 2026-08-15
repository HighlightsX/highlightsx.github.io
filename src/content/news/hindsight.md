---
title: "Hindsight is agent memory that tries to learn, not recall"
description: "A memory system claiming state of the art on LongMemEval, with the rare detail that outside researchers reproduced the score instead of the vendor asserting it."
publishDate: 2026-08-23
category: data
tags: ["agent memory", "benchmarks", "Python", "RAG"]
repo:
  owner: vectorize-io
  name: hindsight
  url: https://github.com/vectorize-io/hindsight
  stars: 19982
  language: Python
  license: MIT
  createdAt: 2025-10-30
  pushedAt: 2026-08-15
  latestRelease:
    tag: v0.9.1
    date: 2026-08-14
  homepage: https://hindsight.vectorize.io/
  snapshotAt: 2026-08-15
sources:
  - label: "vectorize-io/hindsight"
    url: "https://github.com/vectorize-io/hindsight"
    publisher: "GitHub"
    published: 2025-10-30
  - label: "Hindsight paper"
    url: "https://arxiv.org/abs/2512.12818"
    publisher: "arXiv"
    published: 2026-08-14
reviewed: false
---

Agent memory is a crowded category where nearly every project claims the best benchmark number and every number is self-reported. Hindsight is MIT-licensed, has a paper, and comes with the one thing that is actually rare here: an independent reproduction of its headline result.

## What it is

A memory system for agents, positioned against the usual approaches by intent rather than mechanism — the README's distinction is between recalling conversation history and *learning* over time. It claims state of the art on LongMemEval, the benchmark most commonly used for long-term memory in conversational AI.

## Why it showed up now

The oldest repository covered here — created in October 2025 — but v0.9.1 landed the day before the snapshot and it is pushed daily. What makes it newsworthy is the provenance of the claim.

## How it actually works

Two integration paths, and the shallow one is genuinely two lines: an LLM wrapper that swaps your existing client, after which memories are stored and retrieved automatically around your calls. When that is too magical, there is an API with SDKs and plain HTTP for deciding yourself when something is written or recalled.

Running it is a container:

```bash
docker run -it --pull always --name hindsight --restart unless-stopped \
  -p 8888:8888 -p 9999:9999 \
  -e HINDSIGHT_API_LLM_API_KEY=$OPENAI_API_KEY \
  -v hindsight-data:/home/hindsight/.pg0 \
  ghcr.io/vectorize-io/hindsight:latest
```

The benchmark section is where this earns attention. The README states that Hindsight's LongMemEval performance was independently reproduced by research collaborators at Virginia Tech's Sanghani Center and by The Washington Post — and then says, in the same breath, that the competing scores in its comparison chart are self-reported by those vendors. Publishing a comparison while labelling which bars were verified and which were taken on trust is more disclosure than this category usually offers, and it is also a reminder that the chart is not apples to apples.

## Try it

The Docker command above brings up the API on port 8888 and a UI on 9999. There is also a documentation skill for coding agents: `npx skills add https://github.com/vectorize-io/hindsight --skill hindsight-docs`.

## Where it is weak

"Independently reproduced" is doing real work in that sentence, but reproduction of a benchmark score is not the same as validation on your workload. LongMemEval is conversational; if your agent's memory problem is code, tickets or documents, the ranking may not transfer.

There is a Hindsight Cloud with a signup, and the name carries a ™ — this is a commercial product with an open core, and the enterprise-usage claims in the README are unverifiable from outside.

It needs an LLM API key to run, which means memory operations cost tokens on top of your agent's own. At v0.9.1 with 120 open issues, the version number is the honest part: pre-1.0 for something that owns what your agent remembers.
