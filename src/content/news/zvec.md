---
title: "Zvec is a vector database that lives inside your process"
description: "Alibaba's embedded C++ engine does dense, sparse, full-text and hybrid search with WAL durability, bringing SQLite's deployment model to retrieval."
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

Most vector databases are servers, and most applications that need one do not need a server. Zvec is Alibaba's Apache-2.0 in-process engine in C++. It embeds directly into the application, with no daemon, port or configuration to manage.

## What it is

An embedded vector database with the deployment model SQLite made normal: the library is the database. It handles dense and sparse embeddings, multi-vector queries, and a range of index types spanning memory to disk: Flat, HNSW, HNSW-RaBitQ and DiskANN. Write-ahead logging provides durability, which many vector stores skip.

Alibaba says it was battle-tested inside Alibaba Group before release.

## Why it showed up now

v0.6.0 in July, pushed continuously since.

## How it actually works

Four things landed in v0.6.0, each aimed at a specific retrieval problem.

**Group-by search** returns top-K per group instead of globally. That fixes a RAG pipeline that retrieves ten chunks and finds all ten came from the same document.

**Random rotation quantization** applies an optional rotation before INT8/INT4 quantization so variance is spread evenly across dimensions, which the release notes credit with a significant recall improvement. Quantization normally trades recall for memory, and spreading the variance recovers some of that recall.

**Full-text search** was upgraded to a Unicode UAX #29 tokenizer with UTF-8 and ASCII folding and a Snowball stemmer covering 34-plus languages. That goes well beyond matching with a `LIKE` clause.

**Block-max skip** speeds up FTS conjunction queries by 22 to 38%, alongside a new DiskANN C API.

Hybrid search fuses vector similarity, full-text and structured filters in one query. Most production retrieval needs that combination; without it, people bolt a vector store next to an existing search engine.

## Try it

Install the library, open a collection and search; there is no server to start. The project site at zvec.org carries the quickstart and the index-type guide, which is worth reading before choosing between HNSW and DiskANN for your data size.

## Where it is weak

Running in-process is also a constraint: the database lives and dies with your application, scales with one machine, and gives you no natural path to sharing an index between services. Outgrowing that means migrating to another system.

v0.6.0 with 63 open issues is pre-1.0 for something holding durable data. WAL is there, but the interface is not frozen.

The benchmarks are the project's own and cover the cases the project chose. "Billions of vectors in milliseconds" is a claim about a configuration; measure it against your embedding dimension, your filter selectivity and your recall target before believing it applies to you.
