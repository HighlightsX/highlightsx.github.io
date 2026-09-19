---
title: "turbovec fits 10M vectors in 4 GB and outruns FAISS"
description: "A Rust index built on Google Research's TurboQuant: no training step, hand-written NEON and AVX-512 kernels, crash-safe incremental saves and filtered search."
publishDate: 2026-09-13
category: data
tags: ["vector database", "Rust", "RAG", "benchmarks"]
repo:
  owner: RyanCodrai
  name: turbovec
  url: https://github.com/RyanCodrai/turbovec
  stars: 16947
  starsGained: 2162
  language: Rust
  license: MIT
  createdAt: 2026-03-26
  pushedAt: 2026-08-21
  homepage: https://pypi.org/project/turbovec/
  snapshotAt: 2026-09-12
sources:
  - label: "RyanCodrai/turbovec"
    url: "https://github.com/RyanCodrai/turbovec"
    publisher: "GitHub"
    published: 2026-03-26
reviewed: false
---

Ten million 1536-dimension embeddings are 31 GB as float32, which is why most RAG stacks end up renting a vector service. turbovec's opening line is that the same corpus fits in 4 GB, and that search is faster than FAISS while it is in there.

## What it is

A Rust vector index with Python bindings, built on Google Research's TurboQuant, a data-oblivious quantizer with near-optimal distortion and no separate training phase. Data-oblivious is the load-bearing word: the quantizer does not learn from your corpus, so there is nothing to train and nothing to retrain as the corpus drifts.

## Why it showed up now

16,947 stars, 2,162 added in the discovery window, on a repository created March 26 and last pushed August 21. There are no release tags at all, so version pinning happens through PyPI rather than Git.

## How it actually works

Four design decisions, each aimed at a specific operational annoyance.

Ingest is online. You add vectors and they are indexed, with no train step, no parameter tuning and no rebuild as the corpus grows. Anyone who has re-fit an IVF index after a data refresh knows what that is worth.

Search is hand-written SIMD: NEON SDOT and SMMLA on ARM, AVX-512 VNNI and `vpermb` on x86, with AVX2 and scalar fallbacks. The claim is that it beats FAISS IndexPQFastScan in every measured configuration, averaging 3.4x at 4-bit and 23% at 2-bit across eight cells per width, on both architectures.

Saves are incremental. `sync(path)` persists only what changed since the last call, one fsync per call, crash-safe at any byte, so a small append costs milliseconds no matter how large the index has grown. `write` and `load` remain for whole-file snapshots.

Filters are honoured inside the kernel. Pass an id allowlist or a slot bitmask to `search()` and you get up to `k` results from the allowed set, with no over-fetching and no recall collapse on selective filters. That is the usual failure mode of bolt-on filtering, and fixing it in the kernel is the right place.

[Zvec](/zvec) puts a vector database inside your process. turbovec is the layer below that: the index itself, with stable external ids through `IdMapIndex` and O(1) removal by id.

## Try it

```python
from turbovec import TurboQuantIndex

index = TurboQuantIndex(dim=1536, bit_width=4)
index.add(vectors)
scores, indices = index.search(query, k=10)
index.sync("my_index.tv")
```

`pip install turbovec`. Inputs must be 2-D float32 arrays; other dtypes are rejected rather than quietly converted, which is the correct choice and rarer than it should be.

## Where it is weak

The benchmark compares against IndexPQFastScan, the FAISS index that also scans quantized codes. It is a claim about scanning faster, not about searching sublinearly, and a graph index like HNSW answers a different question at a different recall and memory point. Nothing in the README addresses that comparison.

The numbers come from the author's own harness, with the configuration described in prose rather than in a runnable script the README names. Distortion guarantees inherited from a paper are not the same as recall measured on your corpus, and quantization down to 2-bit costs recall somewhere.

No releases, no tags, last push August 21, 16 open issues. The README is written as marketing before it is written as documentation, which for storage software means reading the `sync` code path yourself before trusting the crash-safety claim.
