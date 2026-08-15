---
title: "Recordly does Screen Studio's zooms and polish for free"
description: "A cross-platform screen recorder that auto-suggests zooms, smooths the cursor and frames the result — native capture on macOS and Windows, Electron on Linux."
publishDate: 2026-08-24
category: apps
tags: ["screen recording", "Electron", "video", "cross-platform"]
repo:
  owner: webadderallorg
  name: Recordly
  url: https://github.com/webadderallorg/Recordly
  stars: 21210
  language: TypeScript
  license: Other (NOASSERTION)
  createdAt: 2026-03-12
  pushedAt: 2026-08-15
  latestRelease:
    tag: v1.3.3
    date: 2026-05-28
  homepage: https://recordly.dev
  snapshotAt: 2026-08-15
sources:
  - label: "webadderallorg/Recordly"
    url: "https://github.com/webadderallorg/Recordly"
    publisher: "GitHub"
    published: 2026-03-12
  - label: "Release v1.3.3"
    url: "https://github.com/webadderallorg/Recordly/releases/latest"
    publisher: "GitHub"
    published: 2026-05-28
reviewed: false
---

The polished product demo — smooth cursor, automatic zoom into the thing being clicked, the whole recording sitting in a tasteful gradient frame — became a house style, and the tools that produce it are paid Mac apps. Recordly is the open-source version, and it runs on Windows and Linux too.

## What it is

A desktop recorder and editor with motion-driven presentation tools built in. It suggests zooms by detecting where the activity is, smooths cursor movement, adds motion effects, and composites the result inside a styled frame with wallpapers, colours, gradients, blur, padding and shadows. The pitch is doing in one app what otherwise means sending raw footage to a motion designer.

## Why it showed up now

21,000 stars, pushed the day of the snapshot, and explicitly accepting pull requests. Five months old, on macOS 14+, Windows 10 build 19041+ and modern Linux.

## How it actually works

The platform notes are the part worth reading, because "cross-platform Electron app" usually means one capture path and three sets of compromises. Recordly instead uses native capture helpers per platform: ScreenCaptureKit on macOS, Windows Graphics Capture on supported builds with native WASAPI audio, and Electron's own capture APIs on Linux.

That ordering tells you where the quality is. ScreenCaptureKit and WGC are the modern, hardware-accelerated paths their platforms want you to use; the Electron path on Linux is the fallback, and the README says outright that cursor hiding is not supported there.

Auto-zoom is the feature that defines the category. Getting it right is a question of choosing the moment and the easing, not of cropping — which is why this is a hard thing to clone well and why the results are worth judging on your own recordings before switching.

## Try it

Downloads for all three platforms are on the project site and the releases page.

## Where it is weak

Start with the licence: GitHub reports it as "Other" and cannot identify it, which for a tool you might use to produce commercial marketing videos is the first thing to resolve. Read the licence file before shipping client work made with it.

The release cadence and the issue count point the same way. v1.3.3 dates from late May — two and a half months before the snapshot — while the repository is pushed daily, which means users are running either an old release or a build from `main`. There are 250 open issues, the highest of anything covered here.

Linux is the weakest target by the project's own admission, and screen recording is exactly the domain where "works on my distro" is a real caveat: capture backends, compositors and permissions all differ. Test a full recording-to-export cycle before relying on it for anything with a deadline.
