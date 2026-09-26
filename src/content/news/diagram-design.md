---
title: "Diagram Design gives agent diagrams one house style"
description: "An agent skill that draws editorial HTML and SVG diagrams in your brand's colors. The prompts are strict; the export and contrast promises have open bugs."
publishDate: 2026-09-15
category: graphics
tags: ["agent skills", "Claude Code", "diagrams", "visualization"]
repo:
  owner: cathrynlavery
  name: diagram-design
  url: https://github.com/cathrynlavery/diagram-design
  stars: 42445
  starsGained: 3862
  language: HTML
  license: MIT
  createdAt: 2026-04-16
  pushedAt: 2026-09-19
  homepage: https://cathrynlavery.github.io/diagram-design/
  snapshotAt: 2026-09-26
sources:
  - label: "cathrynlavery/diagram-design"
    url: "https://github.com/cathrynlavery/diagram-design"
    publisher: "GitHub"
    published: 2026-04-16
  - label: "Diagram Design Skill: 27 Editorial Types (Claude Code)"
    url: "https://explainx.ai/blog/diagram-design-claude-code-skill-cathryn-lavery-august-2026"
    publisher: "explainx.ai"
    published: 2026-08-13
  - label: "Issue #202: SVG export drops class-based styling"
    url: "https://github.com/cathrynlavery/diagram-design/issues/202"
    publisher: "GitHub"
    published: 2026-09-09
reviewed: false
---

Ask a coding agent for a diagram and you usually get Mermaid, or rounded grey boxes that look like every other agent's rounded grey boxes. Diagram Design is a skill that tells the agent exactly how to draw instead, down to which color it may use and how many nodes it should keep.

## What it is

An MIT-licensed agent skill for Claude Code, Codex, Factory Droid, Pi, Copilot and other hosts that read the Agent Skills format. The agent picks one of 41 diagram types, from architecture and sequence to Sankey and Wardley maps, and writes a single HTML file with inline SVG in three variants: light, dark and a fuller editorial layout. It can also redraw existing draw.io, Mermaid and Excalidraw sources, and restyle itself from your website's colors and fonts.

## Why it showed up now

42,445 stars on September 26, 3,862 of them in the discovery window, on a repository created April 16. The author's own post on X put it at 2.8k stars when it had 27 types. There are no GitHub releases; the plugin manifest reads version 2.6.33, and versions are bumped on main after each merge.

## How it actually works

Almost all of it is instructions for the model. `skills/diagram-design/SKILL.md` runs to roughly 5,700 words, with one reference file per diagram type under `references/`, a `style-guide.md` holding the color and type tokens, and about 150 finished example files the agent copies from. Accuracy is enforced after the fact by Python scripts: `self_check.py` in the skill, and dozens of `verify-*.py` and `lint-*.py` files in `scripts/` that CI runs against the examples.

The "matched to your brand in 60 seconds by reading your website" line describes a procedure for the agent, with no code behind it. `references/onboarding.md` tells the agent to fetch two or three pages with a browser tool or plain fetch, pick dominant colors and fonts, map them to roles like `paper`, `ink` and `accent`, and propose a diff to `style-guide.md`. How good the match is depends on the model doing that reading. The file does tell the agent to treat fetched pages as untrusted data, which is more care than most skills take.

The import claim is real but narrower than the README suggests. `scripts/mermaid_extract.py` is a genuine parser with size limits and no code execution, but it supports four Mermaid grammars: flowchart, sequence, state and ER. Gantt, class, pie, mindmap, timeline, Sankey and journey diagrams are listed as unsupported and rejected, even though the skill can draw several of those types itself.

"Self-contained" also needs a footnote. `example-architecture.html` loads Instrument Serif, Geist and Geist Mono from Google Fonts. The README admits this much further down: no network requests "beyond Google Fonts".

Archify, covered here in August, is the useful contrast. Archify checks that each box traces back to real source code. Diagram Design checks spacing, contrast and layout, and leaves whether the diagram is true to the model.

## Try it

```bash
/plugin marketplace add cathrynlavery/diagram-design
/plugin install diagram-design@diagram-design
```

For Pi, `pi install https://github.com/cathrynlavery/diagram-design`. PNG export needs `pip install playwright && playwright install chromium`.

## Where it is weak

Export is the soft spot. Issue #202 reports that SVG export copies the `<svg>` node without the page's CSS, so 25 of 156 shipped examples, including the loop, process and data-flow types, export as black boxes. Issue #176 describes PNG export hanging behind a proxy while it waits on the Google Fonts request.

The contrast promise is partial. The README says the skill checks WCAG AA contrast, and the explainx.ai write-up of August 13 repeats that. The check covers `ink` on `paper`. Issue #161, still open, measures the default orange accent at 2.86:1 against the background, under the 3:1 minimum for arrowheads and borders.

Issue #244 reports that four of the five templates break on a phone while the render linter calls them clean. 43 issues and pull requests were open on September 26, most of them feature requests for yet more diagram types.
