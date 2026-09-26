---
title: "OpenLogi replaces Logitech Options+ with a Rust agent"
description: "Remap buttons, DPI and SmartShift over HID++ from a plain TOML file, with no account and no telemetry, including on Linux, which Options+ never supported."
publishDate: 2026-08-17
category: apps
tags: ["Rust", "Logitech", "HID", "local-first"]
repo:
  owner: AprilNEA
  name: OpenLogi
  url: https://github.com/AprilNEA/OpenLogi
  stars: 8451
  language: Rust
  license: Apache-2.0
  createdAt: 2026-05-24
  pushedAt: 2026-08-15
  latestRelease:
    tag: v0.6.27
    date: 2026-08-13
  homepage: https://openlogi.org
  snapshotAt: 2026-08-15
sources:
  - label: "AprilNEA/OpenLogi"
    url: "https://github.com/AprilNEA/OpenLogi"
    publisher: "GitHub"
    published: 2026-05-24
  - label: "Release v0.6.27"
    url: "https://github.com/AprilNEA/OpenLogi/releases/latest"
    publisher: "GitHub"
    published: 2026-08-13
reviewed: false
---

Logitech's Options+ is the software you install to make an expensive peripheral do the thing you bought it for. OpenLogi is an Apache-2.0 Rust replacement that needs no account: same devices, same HID++ protocol, no cloud, no telemetry, plain TOML config.

## What it is

Three components. A GPUI desktop app with an interactive mouse diagram of clickable hotspots, a per-button action picker, DPI presets, SmartShift, per-device scroll inversion, RGB keyboard lighting, per-application profiles and a settings window localised into 20 languages. A background agent that owns the input hook and all device I/O, with the GUI as a pure IPC client that starts it when needed. And a CLI for headless inventory, asset sync and on-device diagnostics.

It talks to Logitech HID++ peripherals over Logi Bolt and Unifying receivers, Bluetooth-direct connections or USB cables, on macOS, Linux and Windows.

## Why it showed up now

v0.6.27 landed two days before the snapshot, on a repository not yet three months old, with a Windows port that the README says has been validated end to end on Windows 11 but is newer and rougher than the macOS and Linux builds.

## How it actually works

Bindings live in a plain TOML file. The agent remaps button presses through the operating system's input hook and writes DPI, SmartShift, scroll and lighting changes straight to the device over HID++. As a result, your mouse configuration is a text file you can keep in a dotfiles repository, which Options+ has never allowed.

The split between agent and GUI allows headless use: the CLI can list devices and run diagnostics on a machine with no desktop session, and the same agent serves both.

What it does that Options+ will not: run on Linux as a first-class platform, with an evdev/uinput hook, udev rules, a systemd user unit and `.deb`, `.rpm` and `.pkg.tar.zst` packages. It can also move the gesture role to any physical button: the dedicated gesture button, middle, back or forward, with per-direction swipe bindings, or gestures off entirely. Options+ pins that role in place.

Network behaviour is stated plainly: device-image fetches are the only automatic calls, and update checks and downloads run only when requested or opted into.

## Try it

Packages for all three platforms are on the releases page, with distro packages for Linux. The CLI's `list` subcommand is the fastest way to confirm your device is actually reachable before configuring anything.

## Where it is weak

The README opens with a warning that the project is under active development and not yet stable, with features and config still liable to change. At v0.6.x with 147 open issues, take that at face value. A config format that moves means a dotfiles entry that breaks.

Windows is the newest port and the most likely to bite. Device coverage is the other unknown: HID++ is a family of protocols and Logitech's range is large, so whether *your* model exposes the features you want is a per-device question the star count cannot answer.

An input hook plus a background agent is also a privileged position by construction. The mitigation is that the code is Apache-2.0 with no telemetry, so you can read what the agent does.
