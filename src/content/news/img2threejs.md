---
title: "img2threejs turns one photo into Three.js source, not a mesh"
description: "An agent pipeline that rebuilds the object in a reference image as procedural Three.js code, gated on a checklist of details it must account for."
publishDate: 2026-08-05
category: graphics
tags: ["Three.js", "3D", "agents", "procedural generation"]
repo:
  owner: img2threejs
  name: img2threejs
  url: https://github.com/img2threejs/img2threejs
  stars: 11826
  language: Python
  license: Apache-2.0
  createdAt: 2026-07-15
  pushedAt: 2026-08-13
  latestRelease:
    tag: v1.5-beta
    date: 2026-08-06
  homepage: https://img2threejs.github.io/img2threejs-showcase/
  snapshotAt: 2026-08-15
sources:
  - label: "img2threejs/img2threejs"
    url: "https://github.com/img2threejs/img2threejs"
    publisher: "GitHub"
    published: 2026-07-15
  - label: "Live demo gallery"
    url: "https://img2threejs.github.io/img2threejs-showcase/"
    publisher: "img2threejs"
    published: 2026-08-06
reviewed: false
---

Image-to-3D usually means photogrammetry or a generative model that hands you a mesh. img2threejs does something else: it gives you a TypeScript function that builds the object out of primitives, procedural shaders and generated geometry. The output is source code you can read, diff and edit, and the repository's own phrase for it is reconstruction-by-code.

## What it is

You supply one reference image of an object. The pipeline returns a `THREE.Group` factory with a real runtime hierarchy — pivots, sockets, colliders — so the result can be animated rather than admired. Nothing is downloaded at runtime: the gallery of examples is generated code executing in the browser, with no mesh files behind it.

The tooling is Python (standard library, 3.10+), the artefact is TypeScript, and the whole thing runs under an existing coding agent — Claude Code, Codex or OpenCode. It is deliberately agent-agnostic: wherever the process needs to look at something, it uses whatever vision or browser capability the host provides.

## Why it showed up now

The project is a month old, tagged `v1.5-beta` at the start of August, and the showcase gallery is doing the work a README screenshot cannot — every model in it is live, orbitable, and its generated source is readable next to the reference photo it came from. That is an unusually falsifiable claim for this genre, and it is why the repository is worth a look rather than a bookmark.

## How it actually works

The part worth stealing is the quality gate. Before any code is generated, the pipeline enumerates a `detailInventory`: the identity-defining small things in the image — gloss, bevels, rivets, engraved linework, contours, stains and wear. Every entry has to map to a real component or material in the plan, and generation is blocked until the inventory is complete.

That inverts the usual failure of an agent doing visual work. Left alone, a model produces something that reads as the right category of object and quietly drops the specifics that make it that particular object. A checklist the generator cannot skip converts "looks about right" into a pass/fail condition.

Subjects are classified as object, character or hybrid, and characters route through a separate anatomy-aware track with head-unit proportions and facial landmarks. There is also an opt-in path for maximum likeness that fits a parametric template to image landmarks, de-lights the photograph, camera-matches the render and projects the reference onto the mesh.

## Try it

The showcase is the fastest evaluation — open a model, orbit it, read its source:

```
https://img2threejs.github.io/img2threejs-showcase/
```

Then clone the repository into a project your coding agent can see; the pipeline lives in the repo's own documentation tree and is driven by the agent rather than by a binary you install.

## Where it is weak

It is beta, and the version badge in the README does not match the tag on the latest release — a small thing that tells you the release process is not yet automated.

The output quality is bounded by the host agent's vision, which means your results depend on a model this repository does not control and cannot version. The README is candid on the hardest case: a single image cannot guarantee likeness for a specific person or character, which is exactly the demo everyone will try first.

Sixty-two issues are open, the project is one month into its life, and the funding visible from the README is a sponsor badge and a coffee link. Judge the bus factor accordingly before you put it in a pipeline you have to ship from.
