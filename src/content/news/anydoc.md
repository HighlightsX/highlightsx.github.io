---
title: "anydoc turns Office files into Markdown in milliseconds"
description: "Firecrawl's Rust converter takes Word, PowerPoint, Excel, PDF and EPUB to one consistent GitHub-Flavored Markdown, with Node, Python and WebAssembly bindings."
publishDate: 2026-09-12
category: devtools
tags: ["Rust", "agent skills", "markdown", "document parsing"]
repo:
  owner: firecrawl
  name: anydoc
  url: https://github.com/firecrawl/anydoc
  stars: 21206
  starsGained: 4957
  language: Rust
  license: MIT
  createdAt: 2026-08-03
  pushedAt: 2026-08-28
  latestRelease:
    tag: v0.2.4
    date: 2026-08-27
  homepage: https://firecrawl.github.io/anydoc/
  snapshotAt: 2026-09-12
sources:
  - label: "firecrawl/anydoc"
    url: "https://github.com/firecrawl/anydoc"
    publisher: "GitHub"
    published: 2026-08-03
reviewed: false
---

Feeding a `.docx` to a model is a solved problem roughly eight times over, and every solution produces different Markdown. anydoc's pitch is the boring one that matters: one output shape, whatever goes in.

## What it is

A Rust library that converts Word, PowerPoint, Excel, OpenDocument, RTF, EPUB, CSV and PDF into GitHub-Flavored Markdown, with bindings for Node.js, Python and the browser through WebAssembly. Firecrawl built it to feed its own parsing product, and the claim is single-digit milliseconds per document.

## Why it showed up now

21,206 stars with 4,957 added in the discovery window, on a repository created August 3. v0.2.4 landed August 27. That is a month-old project with a five-figure star count, which usually means a company audience rather than an organic one.

## How it actually works

Three entry points, same engine. `toMarkdown` takes a path, `toMarkdownBytes` sniffs the format from the content, and `toDocument` stops at the intermediate document model, which also carries embedded assets. Formats without a signature, CSV being the obvious one, have to be named explicitly.

The WebAssembly build is the detail worth noticing. The demo page runs the library in the browser, so files never leave the machine. For anyone parsing documents they are not allowed to upload, that is the whole product.

It also ships as an agent skill, so an agent can convert a file it stumbles into:

```bash
npx skills add firecrawl/anydoc
```

[Skill Seekers](/skill-seekers) turns documentation into skills. This is the other half: giving the agent the ability to read whatever document it was handed in the first place.

## Try it

```bash
npx @firecrawl/anydoc report.docx               # Markdown to stdout
npx @firecrawl/anydoc slides.pptx -o slides.md
```

`pip install firecrawl-anydoc` and `npm install @firecrawl/anydoc` for the library.

## Where it is weak

Scanned pages are the hard case in document conversion, and anydoc does not solve them. `--ocr hosted` sends the page to Firecrawl Parse, the company's paid API. The local story stops exactly where documents get difficult, and the README is upfront that the hosted API exists because of it.

89 open issues on a repository that is one month old. Some of that is the price of claiming nine input formats at once: every one of them has a long tail of malformed files in the wild, and Excel and PDF have two long tails each.

v0.2.4 means the output shape is not promised to be stable, and "one consistent output" is a design goal you cannot verify without running your own corpus through it. No published benchmark numbers accompany the milliseconds claim.
