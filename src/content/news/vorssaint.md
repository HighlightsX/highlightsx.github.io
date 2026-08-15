---
title: "Vorssaint puts a dozen paid Mac utilities in one menu bar"
description: "Per-app volume, system monitor, window switcher, clipboard history and more, in a Swift app where each feature installs and uninstalls separately."
publishDate: 2026-08-19
category: apps
tags: ["macOS", "Swift", "menu bar", "utilities"]
repo:
  owner: vorssaint
  name: vorssaint-utils
  url: https://github.com/vorssaint/vorssaint-utils
  stars: 5347
  language: Swift
  license: GPL-3.0
  createdAt: 2026-06-12
  pushedAt: 2026-08-15
  latestRelease:
    tag: v3.3.1
    date: 2026-08-09
  homepage: https://vorssaint.com
  snapshotAt: 2026-08-15
sources:
  - label: "vorssaint/vorssaint-utils"
    url: "https://github.com/vorssaint/vorssaint-utils"
    publisher: "GitHub"
    published: 2026-06-12
  - label: "Release v3.3.1"
    url: "https://github.com/vorssaint/vorssaint-utils/releases/latest"
    publisher: "GitHub"
    published: 2026-08-09
reviewed: false
---

The Mac utility market is a dozen small paid apps that each do one thing: per-app volume, a system monitor, a better app switcher, window snapping, clipboard history, an uninstaller. Vorssaint is one GPL-3.0 menu bar app that does all of them, with no account, no telemetry and no subscription.

## What it is

A Swift and SwiftUI toolkit living behind a single menu bar icon. Sound gets a full mixer: overall volume, per-app sliders, boosting a too-quiet app past 100 percent, routing system sounds to a different output, per-app output so music goes to speakers while a call goes to a headset, an output switcher on a shortcut that drops volume when headphones disconnect, microphone pinning and a global mute, and a blocker for the Music app launching itself when headphones connect.

Beyond sound there is a system monitor with CPU, GPU, memory and temperature history, battery health, cycle count and power draw, an optional fan control beta, menu bar readouts, window snapping, Dock previews, clipboard history, text snippets, a file shelf and an app uninstaller.

## Why it showed up now

v3.3.1 in August, pushed the day of the snapshot, three months after the first commit and already at a third major version. The interface is localised into thirteen languages, which is not what a weekend project looks like.

## How it actually works

The design decision worth stealing is that features are installable units, not settings. The Features page installs and uninstalls whole features: what you uninstall disappears from the app entirely and stops loading, so it spends no CPU, memory or energy. Nothing is deleted — reinstalling brings your old settings back.

That solves the real problem with utility bundles, which is that you are made to pay in background processes for the eleven features you did not want. First setup offers three one-click bundles — Essentials, Windows, Battery and quiet — plus a visual picker, and only the permissions those choices need are requested. On a Mac, that last part matters: an app that asks for accessibility, screen recording and input monitoring up front is asking you to trust all of it at once.

Every feature also carries what the README calls an honest energy badge, stating what it keeps alive while switched on. Settings export to a file and import on a new Mac.

## Try it

Download from [vorssaint.com](https://vorssaint.com), or build from source. GPL-3.0, so a fork stays open.

## Where it is weak

157 open issues is the highest count of anything covered here so far, and it is what a broad surface costs: every feature touches a different private-ish corner of macOS, and each new OS release can break any of them.

Fan control is explicitly a beta that forces maximum cooling with an automatic return, and that is the one feature in the list where a bug has physical consequences. Treat it accordingly.

The permissions story is unavoidable rather than a criticism of this app in particular: per-app volume, a window switcher and clipboard history need deep system access by definition. GPL-3.0 and no telemetry is a good answer to that, but it is still an app you are giving the keys to.
