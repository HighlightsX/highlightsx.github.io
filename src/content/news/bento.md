---
title: "Bento is a slide deck that carries its own editor"
description: "A PowerPoint alternative shipped as one 560 KB HTML file: the viewer, presenter and editor live inside the document, and it rewrites itself on save."
publishDate: 2026-08-15
category: web
tags: ["slides", "single file", "self-hosted", "local-first"]
repo:
  owner: nyblnet
  name: bento
  url: https://github.com/nyblnet/bento
  stars: 4053
  language: TypeScript
  license: MIT
  createdAt: 2026-07-17
  pushedAt: 2026-08-15
  latestRelease:
    tag: v1.0.17
    date: 2026-08-10
  homepage: https://bento.page
  snapshotAt: 2026-08-15
sources:
  - label: "nyblnet/bento"
    url: "https://github.com/nyblnet/bento"
    publisher: "GitHub"
    published: 2026-07-17
  - label: "Bento Slides, the app"
    url: "https://bento.page/slides"
    publisher: "bento.page"
    published: 2026-08-10
reviewed: false
---

A Bento deck is a single HTML file that contains the slides, the fonts, the images, the charts, the animations — and the editor. You open it in a browser and you are editing it. You send it to someone and they need nothing, because the file is the software.

## What it is

An MIT-licensed office suite in the shape of a document. The download is one `Bento_Slides.bento.html` of roughly 560 KB with no account and no installer. Your data sits in a plain JSON block near the top of the file, readable in any text editor, and saving rewrites that block in place through the File System Access API, with a download fallback where that is unavailable.

The framing in the README is a complaint about the category: office documents used to be things you had, and are now things you rent. The counter-proposal is a file that opens in 2036 because nothing about it depends on a server staying up.

## Why it showed up now

One month old, v1.0.17 on August 10, and a live demo that is also the product — [bento.page/slides](https://bento.page/slides) is the whole app running on a starter deck that doubles as the feature tour. Evaluating it costs one click, which is unusual enough in this category to explain the attention.

## How it actually works

The self-containment is the whole design, and the interesting consequence is what it does to AI editing. Because the document is plain JSON in one plaintext block, any assistant with filesystem access can edit a deck with no plugin and no API: Claude Code, Cursor, Aider, or anything else that can open a file. There is a packaged `bento-slides` skill installable from the repository's own plugin marketplace, and a chat round-trip path for assistants without file access — copy the JSON out, have it rewritten, paste it back.

That also means it works with local models. Point Ollama, llama.cpp or LM Studio at the deck and nothing leaves the machine. The agent guide is one page, published at `bento.page/agents.md`, designed to be dropped into any model's context.

Offline mode is enforced rather than promised: switch it on and updates and collaboration are hard-blocked, and the app says so.

## Try it

```
https://bento.page/releases/slides/Bento_Slides.bento.html
```

Save it, open it in a browser, start editing. That is the install.

## Where it is weak

Everything lives in one file, which is the feature and the constraint. Embedded images and fonts are carried in the document, so a media-heavy deck grows a file that has to be loaded, parsed and saved as a unit — and the save path depends on a browser API that Safari and Firefox support less completely than Chromium does, where you fall back to downloading a new copy each time.

Collaboration is the obvious gap. A file that rewrites itself locally has no merge story, and "send it to someone" means someone now has a fork.

Thirty-seven issues are open on a project that reached v1.0 within a month of its first commit. The format is honest and inspectable, which is the real insurance here: if the project stops, your decks are still readable JSON.
