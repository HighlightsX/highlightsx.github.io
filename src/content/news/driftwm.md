---
title: "driftwm drops your Wayland windows onto an infinite canvas"
description: "A trackpad-first compositor on smithay: windows keep their native size on a 2D canvas, snap into clusters, and the screen is a camera that pans and zooms."
publishDate: 2026-08-15
category: apps
tags: ["Wayland", "Rust", "compositor", "Linux desktop"]
repo:
  owner: malbiruk
  name: driftwm
  url: https://github.com/malbiruk/driftwm
  stars: 1605
  language: Rust
  license: GPL-3.0-or-later
  createdAt: 2026-02-22
  pushedAt: 2026-08-14
  latestRelease:
    tag: v0.17.0
    date: 2026-08-14
  homepage: https://malbiruk.github.io/driftwm/
  snapshotAt: 2026-08-15
sources:
  - label: "malbiruk/driftwm"
    url: "https://github.com/malbiruk/driftwm"
    publisher: "GitHub"
    published: 2026-02-22
  - label: "Release v0.17.0"
    url: "https://github.com/malbiruk/driftwm/releases/latest"
    publisher: "GitHub"
    published: 2026-08-14
reviewed: false
---

Stacking compositors pile windows on top of each other. Tiling compositors squeeze them to fit and hand you workspaces to escape the squeeze. driftwm does neither: windows sit at their native size on an infinite 2D canvas, and your display is a camera looking at part of it.

## What it is

A Wayland compositor in Rust, GPL-3.0-or-later, built on [smithay](https://github.com/Smithay/smithay), borrowing implementation details from niri and taking its idea from vxwm. 1,605 stars on a repository opened in late February, v0.17.0 shipped the day before the snapshot, and it is packaged in the AUR with a NixOS module in the flake.

There are no workspaces and no tiling. Windows overlap only when you put them there.

## Why it showed up now

The design target is a laptop: navigation is trackpad-first, and the infinite canvas is what a 13-inch screen gets instead of more pixels. Three-finger swipe pans, two-finger pinch zooms, a flick carries the viewport with momentum until friction stops it. Four-finger swipe jumps to the nearest window in that direction; four-finger pinch is zoom-to-fit across everything open. The same gesture set works on a touchscreen.

## How it actually works

Move a window near another and they snap, and snapped windows become an implicit cluster — no group to create, name or dissolve. Hold `Shift` and any move, resize or fit acts on the whole cluster, so a row of panes resizes proportionally in one drag. Neighbours stay visible at the edge of the view for spatial context.

The canvas keeps its own coordinates, so the rest follows from that one decision. Bookmarks are named canvas positions the camera jumps to, and they are exported over `ext-workspace-v1` so that a bar like waybar can list them — an export for tooling, not real workspaces. The background is part of the canvas and scrolls and zooms with it: a dot grid by default, or a GLSL shader, or a tiled pyramidal TIFF for gigapixel wallpapers, or `none` if you want `swaybg` or `mpvpaper` to own it.

Window rules match on `app_id` and `title` globs and set position, size, blur, opacity and decorations. Two placement modes carry the canvas idea into the rules: `widget = true` nails a window to the canvas below the normal stack and out of Alt-Tab, for clocks and trays; `pinned_to_screen = true` nails it to the screen instead, so it ignores pan and zoom, for picture-in-picture and call toolbars.

Closing a window can leave a compositor-drawn placeholder at the same canvas spot, and `[session].restore_windows` brings the whole canvas back dormant on the next start. Multiple monitors are independent viewports on the same canvas, each drawing an outline of where the others are looking. Layer-shell surfaces, session lock, screencasting to OBS or Firefox, 40+ Wayland protocols, and `driftwm msg` for scripting it over a Unix socket.

## Try it

```sh
yay -S driftwm
```

It auto-detects whether it is nested inside an existing session or running on real hardware from a TTY, so `driftwm` is the whole command either way. Building from source wants Rust 1.88 and the usual `libseat`/`libinput`/`libdisplay-info`/`libxkbcommon` development packages — note that Ubuntu 24.04's `rustc` is 1.75 and too old, so rustup instead of apt. Every release also carries a vendored dependency tarball for building with no network.

## Where it is weak

The README's own warning is the first thing to weigh: this is experimental software, and it says it was primarily built with AI. On a compositor — the process that owns your input devices and your session — that is a different risk than on a CLI tool, and it is the reason to run it nested before you put it in your display manager.

Twenty open issues on a six-month-old project at v0.17.0 is a pre-1.0 pace, and GitHub reports the licence as unrecognised because the `LICENSE` file opens with a project header before the GPL text, so tooling that reads the API field will not see GPL-3.0-or-later.

The deeper cost is conceptual. Everything that assumes workspaces — bars, scripts, muscle memory from ten years of i3 and sway — meets a canvas that only pretends to have them for `ext-workspace-v1` consumers. That is the trade, and no amount of gesture polish makes it smaller.
