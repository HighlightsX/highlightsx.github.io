---
title: "canvas-ui turns your live DOM into a shader texture"
description: "Fluid, glass and shatter effects running over a real page — text still selectable, links still clickable — using the experimental HTML-in-canvas API."
publishDate: 2026-08-19
category: web
tags: ["WebGL", "shaders", "components", "shadcn"]
repo:
  owner: DavidHDev
  name: canvas-ui
  url: https://github.com/DavidHDev/canvas-ui
  stars: 3971
  language: TypeScript
  license: Other (LICENSE.md)
  createdAt: 2026-07-16
  pushedAt: 2026-08-15
  homepage: https://canvasui.dev/
  snapshotAt: 2026-08-15
sources:
  - label: "DavidHDev/canvas-ui"
    url: "https://github.com/DavidHDev/canvas-ui"
    publisher: "GitHub"
    published: 2026-07-16
  - label: "HTML-in-canvas, Chrome Platform Status"
    url: "https://chromestatus.com/feature/5172548013916160"
    publisher: "Chrome"
    published: 2026-08-15
reviewed: false
---

Shader effects on the web have always come with a bargain: the beautiful layer is a canvas, and a canvas is not your interface. Text inside it is not selectable, links inside it are not clickable, and screen readers see nothing. canvas-ui takes a different route by using an experimental browser API to read and redraw the live DOM.

## What it is

A library of 33 creative components — Liquid, Glass, Shatter, Force Field, Decrypt Reveal and more — that run fluid simulations, shader effects and 3D scenes *over* an interactive page. Every component ships for React, Solid, Preact, Vue, Svelte and vanilla. Distribution is copy-not-install through a shadcn-compatible registry, so the source lands in your repository and stays yours to edit.

## Why it showed up now

One month old, pushed daily, no tagged release yet. The reason to look is not the component count but the mechanism, which only became possible recently.

## How it actually works

Most of the components use the experimental [HTML-in-canvas](https://chromestatus.com/feature/5172548013916160) API to read your live DOM and redraw it inside a canvas. Your page becomes a texture that fire, fluid and glass distort in real time — while the underlying elements remain the real ones. Text stays selectable, links stay clickable.

That is the trick that has been missing. Previously you either faked the effect in CSS or accepted that the pretty layer was inert. Where the API is unsupported, components fall back to WebGL overlays, so nobody gets a broken page — a degraded effect, but a working one.

Usage is a wrapper:

```tsx
import { Liquid } from "@/components/canvasui/Liquid";

export default function Page() {
  return <Liquid><YourEntirePage /></Liquid>;
}
```

There is also an MCP server, so an assistant can find and install components on your behalf.

## Try it

```bash
npx shadcn@latest add @canvas-ui/liquid-react
```

Swap `liquid` for any component and `react` for `solid`, `preact`, `vue`, `svelte` or `vanilla`. Source lands in `components/canvasui/`.

## Where it is weak

The licence is the first thing to check, and it does not resolve cleanly: GitHub reports it as "Other" from a `LICENSE.md` it cannot identify. Everything else here is a technical judgement; this one is a legal one, and you should read that file before shipping any of it commercially.

The core API is experimental and Chromium-specific. The fallback keeps the page working, but it means your users see two different products depending on their browser, and an experimental API can change or be withdrawn — this is a dependency on a feature nobody has committed to yet.

Then there is the cost of the effect itself. Continuously reading the DOM into a texture and running shaders over it is real GPU and battery work on a page that could have been static, and the README makes no performance or accessibility claims to lean on. Five open issues on a month-old repository means very little of this has been stress-tested by anyone else yet.
