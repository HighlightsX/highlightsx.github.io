---
title: "Zvec is a vector database that lives inside your process"
description: "Alibaba's embedded C++ engine does dense, sparse, full-text and hybrid search with WAL durability — SQLite's deployment story, applied to retrieval."
publishDate: 2026-08-28
category: data
tags: ["vector database", "C++", "RAG", "embedded"]
repo:
  owner: alibaba
  name: zvec
  url: https://github.com/alibaba/zvec
  stars: 15446
  language: C++
  license: Apache-2.0
  createdAt: 2025-12-05
  pushedAt: 2026-08-14
  latestRelease:
    tag: v0.6.0
    date: 2026-07-20
  homepage: https://zvec.org
  snapshotAt: 2026-08-16
sources:
  - label: "alibaba/zvec"
    url: "https://github.com/alibaba/zvec"
    publisher: "GitHub"
    published: 2025-12-05
  - label: "Release v0.6.0"
    url: "https://github.com/alibaba/zvec/releases/tag/v0.6.0"
    publisher: "GitHub"
    published: 2026-07-20
reviewed: false
---

Most vector databases are servers, and most applications that need one do not need a server. Zvec is Alibaba's Apache-2.0 answer: an in-process engine in C++ that embeds directly into the application, with no daemon, no port and no configuration.

## What it is

An embedded vector database with the deployment model SQLite made normal — the library is the database. It handles dense and sparse embeddings, multi-vector queries, and a range of index types spanning memory to disk: Flat, HNSW, HNSW-RaBitQ and DiskANN. Write-ahead logging provides durability, which is the feature that separates a database from a cache and that a surprising number of vector stores skip.

The claim of provenance is that it was battle-tested inside Alibaba Group before release.

## Why it showed up now

v0.6.0 in July, pushed continuously since. That release is a good illustration of where this project puts its effort, and it is not on the marketing surface.

## How it actually works

Four things landed in v0.6.0, and each one is a specific retrieval problem rather than a feature-list entry.

**Group-by search** returns top-K per group instead of globally — the fix for a RAG pipeline that retrieves ten chunks and finds all ten came from the same document.

**Random rotation quantization** applies an optional rotation before INT8/INT4 quantization so variance is spread evenly across dimensions, which the release notes credit with a significant recall improvement. Quantization normally trades recall for memory; distributing variance is how you get some of it back.

**Full-text search** was upgraded to a Unicode UAX #29 tokenizer with UTF-8 and ASCII folding and a Snowball stemmer covering 34-plus languages. That is a real FTS implementation, not a `LIKE` clause.

**Block-max skip** speeds up FTS conjunction queries by 22–38%, alongside a new DiskANN C API.

Hybrid search fuses vector similarity, full-text and structured filters in one query — the combination most production retrieval actually needs, and the reason people otherwise bolt a vector store next to an existing search engine.

## Try it

Install the library, open a collection and search — no server to start. The project site at [zvec.org](https://zvec.org) carries the quickstart and the index-type guide, which is worth reading before choosing between HNSW and DiskANN for your data size.

## Where it is weak

In-process is a constraint as much as a feature: the database lives and dies with your application, scales with one machine, and gives you no natural path to sharing an index between services. When you outgrow that, you are migrating, not configuring.

v0.6.0 with 63 open issues is pre-1.0 for something holding durable data. WAL is there, but the interface is not frozen.

The benchmarks are the project's own and cover the cases the project chose. "Billions of vectors in milliseconds" is a claim about a configuration; measure it against your embedding dimension, your filter selectivity and your recall target before believing it applies to you.
