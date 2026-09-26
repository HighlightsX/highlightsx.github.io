---
title: "opencodex puts any model behind Codex and Claude Code"
description: "A local proxy that translates the Codex Responses API into whatever your provider speaks: streaming, tool calls, reasoning tokens and images, both ways."
publishDate: 2026-08-16
category: devtools
tags: ["proxy", "LLM", "Codex", "TypeScript"]
repo:
  owner: lidge-jun
  name: opencodex
  url: https://github.com/lidge-jun/opencodex
  stars: 10133
  language: TypeScript
  license: MIT
  createdAt: 2026-06-18
  pushedAt: 2026-08-15
  latestRelease:
    tag: v2.20.0
    date: 2026-08-15
  homepage: https://opencodex.me/
  snapshotAt: 2026-08-15
sources:
  - label: "lidge-jun/opencodex"
    url: "https://github.com/lidge-jun/opencodex"
    publisher: "GitHub"
    published: 2026-06-18
  - label: "Release v2.20.0"
    url: "https://github.com/lidge-jun/opencodex/releases/latest"
    publisher: "GitHub"
    published: 2026-08-15
reviewed: false
---

Coding agents ship tied to their vendor's models. opencodex is a small local proxy that unties them: keep the Codex CLI, the Codex app, Claude Code, Claude Desktop or Grok Build exactly as they are, and swap the model behind them for Gemini, DeepSeek, GLM, Kimi, Qwen, an Ollama model on your own machine, or anything else with an OpenAI-compatible endpoint.

## What it is

A translator. It converts Codex's Responses API into whatever the target provider speaks, in both directions, and the README is specific about what survives the round trip: streaming, tool calls, reasoning tokens and images. That list matters because tool calls and streaming are where format translation usually breaks in a real agent session.

Two commands, a dashboard on `localhost:10100`, over 40 built-in providers, MIT licence.

## Why it showed up now

v2.20.0 shipped the day of the snapshot; the repository is two months old and already on a second major version. It sits on top of other people's shipping products, so it has to release often: every upstream change in Codex or Claude Code can break it.

## How it actually works

The proxy runs locally and the agent is pointed at it instead of at the vendor endpoint. Configuration happens in a web dashboard rather than a config file: add providers, pick models, manage accounts, reopen it later with `ocx gui`.

The most prominent feature is the ChatGPT account pool for Codex auth. You add multiple accounts, the dashboard tracks their 5-hour, weekly and 30-day quotas, and new sessions route to the lowest-usage healthy account under quota routing, with round-robin and fill-first as alternative policies. Existing threads stay pinned to the account that started them, which is correct, since switching accounts mid-conversation loses the session's context.

Installing from source runs the `dev` branch on Bun canary and gets memory-ownership patches, GC improvements and unreleased fixes before the npm package does.

## Try it

```bash
npm install -g @bitkyc08/opencodex
ocx start
```

Node 18+; the Bun runtime is bundled automatically. Then open the dashboard on port 10100 and add a provider.

## Where it is weak

The account pool is the part to think about before you deploy it. Rotating several ChatGPT accounts to spread quota is the kind of use that a provider's terms of service tend to have an opinion about, and any penalty falls on your accounts. Read your plan's terms before switching that on.

Everything here also depends on interfaces nobody promised to keep stable. Codex's Responses API, Claude Code's internals and each provider's dialect can change without warning; 106 open issues on a two-month-old repository is what that maintenance load looks like from the outside.

The proxy also sees every prompt, every file the agent reads and every token in both directions. It runs locally, which is the right design, but running locally does not mean anyone has audited it, so read the source before trusting it.
