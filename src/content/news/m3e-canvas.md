---
title: "M3E Canvas turns a Material 3 mockup into a prompt for your agent"
description: "A browser editor for Material 3 Expressive screens that writes a long, specific build prompt for Claude Code or Codex. No backend, and one static page."
publishDate: 2026-09-23
category: devtools
tags: ["TypeScript", "local-first", "Claude Code", "Material Design", "prototyping"]
repo:
  owner: lnkiai
  name: m3e-canvas
  url: https://github.com/lnkiai/m3e-canvas
  stars: 8252
  starsGained: 2056
  language: TypeScript
  license: MIT
  createdAt: 2026-09-02
  pushedAt: 2026-09-24
  homepage: https://lnkiai.github.io/m3e-canvas/
  snapshotAt: 2026-09-26
sources:
  - label: "lnkiai/m3e-canvas"
    url: "https://github.com/lnkiai/m3e-canvas"
    publisher: "GitHub"
    published: 2026-09-02
  - label: "M3E Canvas: a Material 3 mockup tool that writes the coding prompt for you when you're done"
    url: "https://githubawesome.com/m3e-canvas-a-material-3-mockup-tool-that-writes-the-coding-prompt-for-you-when-youre-done/"
    publisher: "GithubAwesome"
    published: 2026-09-08
reviewed: false
---

Describing a screen to a coding agent in words is slow and lossy: "a card under the search bar, with a chip row" leaves the agent to guess spacing, colors and which component to use. M3E Canvas lets you draw the screen instead and copy a prompt that spells all of it out.

## What it is

A Next.js app, exported as a static site, where you drag Material 3 Expressive parts onto phone (412 by 892) or desktop (1280 by 800) screens, link them with tap and swipe transitions, set a theme, and copy a text prompt. The README names Claude Code, Codex, Gemini CLI and Cursor as targets. There is no server: the design lives in your browser's local storage.

## Why it showed up now

8,252 stars on September 26, 2,056 of them in the discovery window, on a repository created September 2. GithubAwesome wrote it up on September 8, less than a week in, and forks started appearing within days. The issue tracker shows the usual early pattern: a Russian translation, an Electron desktop shell and a tablet mirror offered as pull requests, all closed unmerged, with the maintainer asking for one focused change at a time.

## How it actually works

Most of the work is in the prompt: `lib/prompt.ts` is 1,864 lines. Rather than handing the agent bare coordinates, it writes platform instructions ("use the standard components from Jetpack Compose material3", or Material Web for a web screen, and do not custom-draw what the library provides), then describes each screen part by part, with explicit rules for rows ("never stack or wrap them") and grids ("keep 3 columns rather than one long row"). It is written in four languages, so the prompt comes out in English, Japanese, Chinese or Korean.

The claim of no backend holds up. `lib/share.ts` puts the whole design, compressed, into the part of the link after `#`, which browsers never send to the server. It also strips images you picked from disk before sharing, so a shared link keeps only images hosted at a web address. The optional AI helper in `lib/ai.ts` calls OpenAI, Anthropic, Gemini or DeepSeek straight from the browser with your own key, and refuses to send the key over plain `http` unless the address is your own machine.

Two README claims need a footnote. The seed color that "becomes a full Material 3 scheme" is an approximation: the header of `lib/color.ts` says it follows Material's tonal palettes "without the full CAM16 model", the color math Google's own generator uses, so colors can drift slightly from what Material Theme Builder gives for the same seed. The loading indicator really is ported: `lib/shapes.ts` embeds the official shape paths and mirrors the animation logic of material-components-android, with the Apache license credited in `NOTICE`.

Compared with Google's Stitch, which generates screens from a text description, this runs the other way: you draw, it writes the text. Auteur, covered here in August, also puts design decisions before code, but as a skill inside the agent rather than a canvas outside it.

## Try it

The hosted app at lnkiai.github.io/m3e-canvas needs nothing installed. To run it locally, per the README:

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Where it is weak

It only speaks Material 3. If your app is iOS-first or uses another design system, the prompt will push the agent toward Compose or Material Web components you do not want.

Local storage is the whole persistence story. Clear site data or switch browsers and the design is gone unless you exported it or kept a share link, and the AI key sits in the same storage as plain text.

Export is thin. Open issue #447 asks for SVG export for design tools; the pull request before it said the current `html-to-image` export shows only empty frames there. Charts are another open request (#432). Pull requests adding an OpenRouter option and a single retry on malformed JSON were closed unmerged, so `lib/ai.ts` still offers four providers and gives up on the first reply it cannot parse.

The result also depends on the agent reading the prompt. The demo shows a recipes app built and running on Android, but no one has published how often the result matches the sketch.
