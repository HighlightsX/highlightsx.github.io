---
title: "GenOffice puts an AI agent inside Word, Excel and PowerPoint files"
description: "Genspark's Apache-licensed office suite edits real .docx, .xlsx and .pptx files, and ships a CLI and skill so coding agents can do the same."
publishDate: 2026-09-24
category: apps
tags: ["TypeScript", "Electron", "agent skills", "Claude Code", "local-first"]
repo:
  owner: genspark-ai
  name: genoffice
  url: https://github.com/genspark-ai/genoffice
  stars: 7762
  starsGained: 1222
  language: TypeScript
  license: Apache-2.0
  createdAt: 2026-07-31
  pushedAt: 2026-09-26
  latestRelease:
    tag: v0.10.1038
    date: 2026-09-22
  homepage: https://genoffice.ai/
  snapshotAt: 2026-09-26
sources:
  - label: "genspark-ai/genoffice"
    url: "https://github.com/genspark-ai/genoffice"
    publisher: "GitHub"
    published: 2026-07-31
  - label: "Genspark Open Sources GenOffice: A Free, Ad-Free AI Office Suite"
    url: "https://www.marktechpost.com/2026/08/03/genspark-open-sources-genoffice-a-free-ad-free-ai-office-suite-for-macos-and-windows-with-docs-sheets-slides-pdf/"
    publisher: "MarkTechPost"
    published: 2026-08-03
reviewed: false
---

Most AI features in office software read a document, write a new one and hope the formatting survives. GenOffice, from the AI company Genspark, is a desktop suite built around the opposite promise: change only the paragraph the model touched and leave the rest of the file alone.

## What it is

Six Electron editors (Docs, Sheets, Slides, PDF, Markdown, HTML) that open and save native `.docx`, `.xlsx` and `.pptx`, with an AI panel in each. It also ships a `genoffice` command line tool and an agent skill, so Claude Code, Codex or Cursor can create and edit Office files without opening a window. Apache-2.0, for macOS, Windows and Linux.

## Why it showed up now

7,762 stars on September 26, 1,222 of them added in the discovery window. The repository dates from July 31 and has shipped five releases between September 13 and September 22, ending at v0.10.1038, which added full-text search across local files. MarkTechPost covered the launch on August 3 and relayed Genspark's claim that the alpha took one engineer one week and about $10,000 in model tokens. At launch the AI features required a Genspark account; bring-your-own-key came later.

## How it actually works

The byte-preserving claim mostly holds, with a caveat the README skips. `saveDocx` in `packages/docx-engine/src/patch.ts` returns the original file bytes untouched when nothing changed, splices unedited paragraphs back in as their original XML, and copies every other part of the package without modifying it. Once anything is edited, though, the whole archive is rebuilt through JSZip at compression level 6. The content of untouched parts survives; the saved file itself is not byte-identical to the original.

The "local by design" claim also checks out, with a gap on Linux. PDF to Word conversion lives in `packages/pdf2docx`, which extracts text through PDFium and rebuilds the layout in-process. Scanned pages go through OCR, and `packages/pdf2docx/src/ocr-vision.ts` provides engines only for macOS Vision and Windows OCR. On Linux the function returns nothing and a scanned page falls back to being embedded as a flat image.

The provider list in `packages/ai-provider/src/providers.ts` matches the README: Genspark sign-in first, then Anthropic, OpenAI, Gemini, DeepSeek and about a dozen more, plus a custom OpenAI-compatible entry whose comments name Ollama, LM Studio and vLLM. Sheets is built on the open-source Univer core, and `apps/sheets/native` holds a Rust sidecar for workbook operations. The CLI's cloud commands (search, image, media) route through Genspark whenever you are signed in.

anydoc, covered here in September, only reads Office files into Markdown. GenOffice writes them back, which is the harder half. Against OnlyOffice or LibreOffice it trades decades of compatibility work for an editing model an agent can drive.

## Try it

Installers for all three platforms are on the releases page. The command line tool installs with the app, and the README's quickstart looks like this:

```bash
genoffice info report.docx --json
genoffice convert report.md --to pdf
genoffice create --type docx --from notes.md --out notes.docx
genoffice render report.docx --out shots/
claude mcp add --transport stdio genoffice -- genoffice mcp
```

## Where it is weak

The open issues read like an audit trail. 58 of roughly 67 open issues come from one outside contributor, filed in bulk: modal dialogs without keyboard focus handling, atomic document writes that never flush temporary files to disk, recents and settings written non-atomically, PDF link annotations dropped during conversion to Word. Issue 1074 reports headless rendering on macOS returning `app_unavailable` when Codex tries to check its own edits visually, which is the exact workflow the skill advertises.

The version is v0.10. A suite written this fast, covering four file formats that each have decades of malformed documents in circulation, will hit compatibility problems that only a large corpus of real files would expose. No published compatibility test results come with it. The Genspark sign-in path is the default, so anyone who wants their prompts to stay off Genspark's servers has to configure a key or a local endpoint deliberately.
