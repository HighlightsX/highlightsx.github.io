---
title: "PixelRAG retrieves over screenshots instead of parsed text"
description: "A Berkeley project that renders pages as images and searches them visually, keeping the tables, charts and layout that HTML parsing throws away."
publishDate: 2026-08-18
category: data
tags: ["RAG", "retrieval", "multimodal", "research"]
repo:
  owner: StarTrail-org
  name: PixelRAG
  url: https://github.com/StarTrail-org/PixelRAG
  stars: 9537
  language: Python
  license: Apache-2.0
  createdAt: 2026-05-29
  pushedAt: 2026-07-31
  latestRelease:
    tag: v0.4.0
    date: 2026-07-16
  homepage: https://arxiv.org/pdf/2606.28344
  snapshotAt: 2026-08-15
sources:
  - label: "StarTrail-org/PixelRAG"
    url: "https://github.com/StarTrail-org/PixelRAG"
    publisher: "GitHub"
    published: 2026-05-29
  - label: "PixelRAG: Web Screenshots Beat Text for Retrieval-Augmented Generation"
    url: "https://arxiv.org/pdf/2606.28344"
    publisher: "arXiv"
    published: 2026-07-16
reviewed: false
---

Every retrieval pipeline starts by destroying information. HTML gets parsed to text, and the table structure, the chart, the infographic and the layout that told you what related to what are gone before the first embedding is computed. PixelRAG's proposal is to skip that step: render the document as screenshots and retrieve over the images.

## What it is

The official codebase for a Berkeley paper — SkyLab, BAIR and Berkeley NLP, with Matei Zaharia, Joseph Gonzalez and Sewon Min advising — released Apache-2.0 with two core operations. `pixelshot` renders any page, PDF or image to screenshot tiles. The search side queries a visual index, and the queries can themselves be images.

## Why it showed up now

The paper landed with a working hosted endpoint rather than a promise of one: `api.pixelrag.ai` serves a pre-built index of 8.28 million Wikipedia pages, no key, no setup. Research code you can curl is rare enough to explain the attention.

## How it actually works

The claim in the title of the paper is that screenshots beat text for RAG, and the mechanism is subtractive rather than clever: nothing is thrown away before retrieval, so visual structure survives into the part of the pipeline that needs it. A reader model looking at an image of a table can answer a question about the table. A reader model looking at that table after HTML-to-text conversion is often looking at a column of numbers with no headers.

The renderer also ships as a Claude Code plugin called `pixelbrowse`, which changes what an agent does when it opens a page: instead of fetching raw HTML, it screenshots with `pixelshot` and reads the image, seeing charts, diagrams and layout the way a person does.

```bash
pip install pixelrag
pixelshot https://en.wikipedia.org/wiki/Python --output ./tiles
```

For the plugin, install the CLI with `uv tool` or `pipx` so `pixelshot` lands on `PATH` — a plain `pip install` into a project venv may leave it invisible to the agent — then add the marketplace and install `pixelbrowse@pixelrag-plugins`.

## Try it

Query the hosted index without installing anything:

```bash
curl -X POST https://api.pixelrag.ai/search -H "Content-Type: application/json" \
  -d '{"queries": [{"text": "What is the capital of France?"}], "n_docs": 5}'
```

## Where it is weak

Images are expensive where text is cheap. Rendering a page costs a browser, storing tiles costs disk, and embedding and reading images costs far more tokens than the equivalent text — the paper's win has to be weighed against a per-document cost that is not close to parity.

Last push was July 31, more than two weeks before the snapshot, with the release at v0.4.0. That is normal for research code and worth naming anyway: paper repositories tend to freeze after publication, and the hosted endpoint is a service somebody has to keep paying for.

Twenty-four issues are open. And the general pipeline is only as good as its renderer: pages behind logins, cookie walls and lazy-loading behave differently through a screenshotter than through a fetch, which is exactly where a real corpus differs from Wikipedia.
