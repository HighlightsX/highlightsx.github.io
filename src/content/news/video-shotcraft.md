---
title: "video-shotcraft is a shot library your agent animates from"
description: "152 shot recipe cards and 209 motion previews that turn Claude Code or Codex into a Remotion motion-design studio, with a gallery you can check first."
publishDate: 2026-08-21
category: graphics
tags: ["Remotion", "motion design", "agent skills", "video"]
repo:
  owner: Vincentwei1021
  name: video-shotcraft
  url: https://github.com/Vincentwei1021/video-shotcraft
  stars: 5118
  language: TypeScript
  license: Apache-2.0
  createdAt: 2026-07-19
  pushedAt: 2026-08-14
  latestRelease:
    tag: gallery-media
    date: 2026-07-26
  homepage: https://vincentwei1021.github.io/video-shotcraft/
  snapshotAt: 2026-08-15
sources:
  - label: "Vincentwei1021/video-shotcraft"
    url: "https://github.com/Vincentwei1021/video-shotcraft"
    publisher: "GitHub"
    published: 2026-07-19
  - label: "Motion preview gallery"
    url: "https://vincentwei1021.github.io/video-shotcraft/"
    publisher: "video-shotcraft"
    published: 2026-07-26
reviewed: false
---

Ask a coding agent for a product video and you get whatever motion vocabulary it happens to remember. video-shotcraft supplies the vocabulary: 152 shot recipe cards, 209 styles and 209 motion previews, plus a production-ready Remotion template, packaged as a skill for Claude Code or Codex.

## What it is

An Apache-2.0 agent skill that turns an existing coding agent into a motion-design studio. Point it at your product and it storyboards, animates and sound-designs a promo, launch or demo video with [Remotion](https://www.remotion.dev/) — real page captures, 2.5D camera moves, beat-synced cuts and sound effects included.

Each shot is a card with a native Remotion component at `demos/<category>/<name>/<Component>.tsx`, deterministic and driven by a normalised progress value `t`. Components are de-branded: neutral placeholder copy and a single swappable `ACCENT` colour variable.

## Why it showed up now

The August update grew the library from 104 cards to 152, distilled from 209 candidate motions through what the README describes as eight rounds of frame-by-frame review against reference footage. The other recent addition is an export path to JianYing, CapCut's Chinese edition: after delivery, the film can leave as an editable draft with the plate cut per shot, captions rebuilt as native editable text tracks, and effects and music on separate audio tracks. Verified, the README says, on JianYing Pro 11.2 for macOS.

## How it actually works

The interesting idea is not the agent, it is the library. A recipe card fixes a shot's motion as a real component rather than a description, so the agent is composing from pieces that already look right instead of inventing timing curves from a prompt. Determinism matters here for the same reason it matters in tests: a shot driven by normalised progress renders the same way every time, which is what makes review and iteration possible.

The evaluation path is unusually honest for this category. Every one of the 209 previews is browsable in a live gallery — searchable, filterable, switchable between variants — so you can judge the output quality before installing anything. The 38-second gallery intro was itself produced with the toolkit: storyboard, shot implementation and sound design all done by an agent following the method.

Audio ships as a restructured library: background music plus 149 sound effects across 16 scene and material categories, md5-deduplicated with licence URLs restored.

## Try it

Hand the repository link to your agent — in Claude Code or Codex, ask it to install the skill from the repository URL. Or browse the gallery first:

```
https://vincentwei1021.github.io/video-shotcraft/
```

## Where it is weak

The only tagged release is `gallery-media` from July, which is a media bundle rather than a version of the toolkit. There is no semver line to pin, so "the version you have" is whatever the default branch said the day you installed it.

One open issue on five thousand stars usually means people are starring the gallery, not running the pipeline. Treat the low number as absence of evidence.

Output quality is bounded by the host agent and by your source material: the shots assume real page captures of a polished product, and no amount of camera work rescues an ugly screen. The JianYing export is verified against one version of one editor on one platform, and the licences on 149 bundled sound effects are the kind of detail worth checking yourself before a commercial launch video.
