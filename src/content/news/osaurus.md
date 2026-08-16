---
title: "Osaurus keeps the agent layer on your Mac, not a server"
description: "A native Swift harness on Apple Silicon: agents with their own memory, RAG-selected tools, self-scheduling, and an argument that the harness is what compounds."
publishDate: 2026-08-29
category: apps
tags: ["macOS", "Swift", "local-first", "agents"]
repo:
  owner: osaurus-ai
  name: osaurus
  url: https://github.com/osaurus-ai/osaurus
  stars: 7626
  language: Swift
  license: MIT
  createdAt: 2025-08-17
  pushedAt: 2026-08-15
  latestRelease:
    tag: "0.22.22"
    date: 2026-08-14
  homepage: https://osaurus.ai
  snapshotAt: 2026-08-16
sources:
  - label: "osaurus-ai/osaurus"
    url: "https://github.com/osaurus-ai/osaurus"
    publisher: "GitHub"
    published: 2025-08-17
  - label: "Release 0.22.22"
    url: "https://github.com/osaurus-ai/osaurus/releases/latest"
    publisher: "GitHub"
    published: 2026-08-14
reviewed: false
---

The argument Osaurus opens with is the most interesting thing about it: inference is becoming a commodity, and what is irreplaceable is the layer around it — your context, memory, tools and identity. Most products keep that layer on their servers. This MIT-licensed Swift app keeps it on your Mac.

## What it is

A native macOS harness that sits between you and any model, local or cloud. Agents are the primary object: each gets its own prompts, memory and visual theme — a research assistant, a coding partner, a file organiser. Fully offline with local models; connect a cloud provider when you want more power.

Pure Swift on Apple Silicon, no Electron. macOS 15.5 or later.

## Why it showed up now

Release 0.22.22 on August 14, pushed daily, a year after the first commit. It is one of the few projects in this space betting on the Apple stack directly — MLX, the Neural Engine and Apple Foundation Models appear in its topic list alongside MCP.

## How it actually works

Two design choices stand out from the usual local-agent app.

Tools and skills are selected by RAG search against the task rather than configured by hand. That inverts the normal arrangement, where you decide up front which tools an agent may use and then maintain that list forever. It also means the tool surface an agent sees is a retrieval result, with the accuracy implications that carries.

Agents can opt into a private local database and **a single self-scheduled next run** — one deliberately, not a cron. That is a restrained answer to autonomy: an agent that can wake itself once is useful for follow-ups and hard to turn into a runaway loop.

Storage is documented rather than glossed: local data is plaintext by default, protected by FileVault, with opt-in SQLCipher encryption. Saying "plaintext by default" out loud is the right call, and it tells you what to turn on before putting anything sensitive in an agent's memory.

## Try it

```bash
brew install --cask osaurus
```

Then `osaurus ui` for the chat interface, `osaurus serve` for the server, `osaurus status` to check it. Requires Apple Silicon.

## Where it is weak

162 open issues is the number to sit with. This is an ambitious surface — agents, memory, tools, identity, a server, a plugin registry — maintained against a fast-moving platform, and version 0.22.x says the interfaces are still moving.

macOS and Apple Silicon only, by design. That is a coherent bet and it excludes most of the world.

"Cryptographic identity" is a strong phrase for something a README asserts and a reader cannot easily verify; if that property is why you are adopting it, read the implementation rather than the tagline. And the harness-compounds thesis cuts both ways — the more your memory, tools and agent definitions live here, the more this project's maintenance becomes your dependency.
