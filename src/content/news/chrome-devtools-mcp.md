---
title: "Chrome DevTools is now an MCP server for your agent"
description: "Google's own server hands a coding agent performance traces, network inspection, console messages with source-mapped stacks, and Puppeteer automation."
publishDate: 2026-08-27
category: devtools
tags: ["MCP", "Chrome", "debugging", "performance"]
repo:
  owner: ChromeDevTools
  name: chrome-devtools-mcp
  url: https://github.com/ChromeDevTools/chrome-devtools-mcp
  stars: 49233
  language: TypeScript
  license: Apache-2.0
  createdAt: 2025-09-11
  pushedAt: 2026-08-16
  latestRelease:
    tag: chrome-devtools-mcp-v1.7.0
    date: 2026-08-10
  homepage: https://npmjs.org/package/chrome-devtools-mcp
  snapshotAt: 2026-08-16
sources:
  - label: "ChromeDevTools/chrome-devtools-mcp"
    url: "https://github.com/ChromeDevTools/chrome-devtools-mcp"
    publisher: "GitHub"
    published: 2025-09-11
  - label: "Release chrome-devtools-mcp-v1.7.0"
    url: "https://github.com/ChromeDevTools/chrome-devtools-mcp/releases/latest"
    publisher: "GitHub"
    published: 2026-08-10
reviewed: false
---

An agent asked to fix a slow page has historically had to work from your description of the problem. `chrome-devtools-mcp` closes that loop: it is an Apache-2.0 MCP server, from the Chrome DevTools team itself, that gives a coding agent a live browser to inspect.

## What it is

An MCP server exposing the DevTools surface to Antigravity, Claude, Cursor, Copilot or anything else that speaks the protocol. Three capability groups: performance traces with extracted insights, browser debugging — network requests, screenshots, console messages carrying source-mapped stack traces — and Puppeteer-driven automation that waits for actions to actually complete. A CLI is included for use without MCP at all.

## Why it showed up now

v1.7.0 on August 10 and pushed the day of this snapshot. It has been around since September 2025, which by the standards of this ecosystem makes it ancient and, more usefully, maintained.

## How it actually works

The design decision that matters is that this is not a screenshot tool with a protocol wrapper. Performance work runs through the real DevTools trace pipeline and returns *insights* rather than raw traces, which is the difference between handing a model a 40 MB JSON blob and handing it "layout shift caused by this image without dimensions".

Source-mapped stack traces are the other quiet win. An agent reading a minified console error is guessing; an agent reading the mapped frame is looking at your source. Puppeteer underneath means action results are awaited rather than slept on, which is where most homegrown browser automation becomes flaky.

Support is scoped honestly: Google Chrome and Chrome for Testing officially, other Chromium browsers may work, with committed support for the latest Extended Stable Chrome.

## Try it

Add it to your agent's MCP configuration as the npm package `chrome-devtools-mcp`, or use the bundled CLI directly. Point it at a page you already know is slow and compare the insight list against your own read of the trace.

## Where it is weak

Read the disclaimers, because they are unusually direct. The server exposes the content of the browser instance to MCP clients, allowing them to inspect, debug and modify any data in the browser or DevTools. If that Chrome profile is logged into anything, the agent — and whatever it just read on a hostile page — is inside your session. The README's advice is to avoid sharing sensitive information with MCP clients, which in practice means running it against a clean profile.

There is a telemetry path worth knowing about: performance tooling may send trace URLs to Google's CrUX API to fetch real-user data alongside your lab measurements. It is disableable by flag, and it is on by default.

114 open issues, and the fundamental constraint is Chrome-shaped. This makes your agent excellent at debugging one browser engine, which is not the same as debugging the web.
