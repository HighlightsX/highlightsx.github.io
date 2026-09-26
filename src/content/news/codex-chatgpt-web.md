---
title: "codex-chatgpt-web runs Codex on your ChatGPT subscription"
description: "A launcher that drives the ChatGPT website from a hidden browser, presents it to Codex as a model, so coding turns draw on chat limits instead of Codex quota."
publishDate: 2026-09-21
category: devtools
tags: ["Codex", "TypeScript", "MCP", "Electron", "browser automation"]
repo:
  owner: miuuyy
  name: codex-chatgpt-web
  url: https://github.com/miuuyy/codex-chatgpt-web
  stars: 11702
  starsGained: 5165
  language: TypeScript
  license: MIT
  createdAt: 2026-07-26
  pushedAt: 2026-09-26
  latestRelease:
    tag: v6.1.1
    date: 2026-09-26
  snapshotAt: 2026-09-26
sources:
  - label: "miuuyy/codex-chatgpt-web"
    url: "https://github.com/miuuyy/codex-chatgpt-web"
    publisher: "GitHub"
    published: 2026-07-26
  - label: "Issue #622: ChatGPT safety blocks and model-reported tool/token failures"
    url: "https://github.com/miuuyy/codex-chatgpt-web/issues/622"
    publisher: "GitHub (user report)"
    published: 2026-09-21
reviewed: false
---

A ChatGPT subscription comes with two separate allowances: messages in the chat website, and Codex usage. This project spends the first one on the work of the second, by having a program type your coding turns into the ChatGPT website and hand the answers back to Codex as if an API had produced them.

## What it is

A desktop launcher, built on Electron, with its own embedded browser and runtime. You sign in to ChatGPT inside it, press a button to install models, and after a Codex restart new entries ending in "(Web)" appear in Codex's model picker. Free accounts get Luna and Think; paid accounts get Instant through High, plus Extra High and Pro where the account exposes them. The README is direct about the nature of it: unofficial browser automation, not an OpenAI API.

## Why it showed up now

11,702 stars on September 26, 5,165 of them added during the discovery window, on a repository created July 26. The release pace is fast: v6.0.0 on September 23, v6.1.0 on September 25, v6.1.1 on September 26. The appeal is plain arithmetic for Pro subscribers who hit Codex limits while their chat allowance sits unused.

## How it actually works

The core is a local HTTP server in `src/server.ts` that answers the same routes Codex calls on OpenAI: `/v1/models`, `/v1/responses`, `/v1/responses/compact`, plus image generation and search. `src/codex-integration.ts` then points Codex's `openai_base_url` setting at that local server. That means every Codex request passes through the bridge, including ones for Codex's own models. Those are forwarded to OpenAI's Codex backend by `src/native-passthrough.ts`; only the "(Web)" models go to the browser.

The browser side lives in `src/adapters/chatgpt-web/browser-worker.ts`, a 249 KB file of Playwright page automation with over a hundred selector and test-id references. Prompt size is counted with the real `o200k_base` tokenizer in `src/lib/token-estimate.ts`, not a character ratio, which matters because the README gives Plus accounts a measured window of 90,000 tokens at Medium and High effort.

"Full harness" mode lets ChatGPT call back into your machine: files, terminal, approvals, through an MCP connector reached over OpenAI's tunnel client. The README says unexpected approval prompts fail closed. The code agrees. `resolveChatGptToolConfirmation` waits for you to answer the "Allow ChatGPT to use" dialog and presses Deny when the timeout runs out. With `--auto-approve-tool-calls` it clicks a button matched by `/^Allow(?: once)?$/`, which cannot match "Always allow".

The installers claim to verify published checksums, and `scripts/install-launcher.sh` does compare SHA-256 hashes. The `checksums.txt` it trusts comes from the same GitHub release as the binary, so it catches a broken download, not a tampered release. The builds are also unsigned, as the README admits.

## Try it

```bash
curl -fsSL https://github.com/miuuyy/codex-chatgpt-web/releases/latest/download/install-launcher.sh | sh
```

```powershell
irm https://github.com/miuuyy/codex-chatgpt-web/releases/latest/download/install-launcher.ps1 | iex
```

Full harness mode additionally needs ChatGPT Developer Mode and a Tunnel connector named exactly `Codex Native2`, with authentication set to None and all actions allowed.

## Where it is weak

Everything depends on the ChatGPT page staying the way it looks today. The README says changes to the page produce an explicit error rather than silent misbehaviour.

21 open issues and pull requests on September 26, and nine new bug reports opened that day, most against v6.1.1. They include a stream that aborts after a tool round, long Full Harness turns retired after about 90 seconds, and a startup cleanup that deletes another process's socket. Issue #546, "Selected model is at capacity", has been open since September 17 with users on several platforms reporting the same metadata conflict.

The most useful outside evidence is issue #622, filed September 21 by a Pro user on Ubuntu with measured data: harmless tool calls such as `pwd` and `cargo fmt --all` are blocked by OpenAI's safety checks at a rate that doubles between two projects on the same account, and the launcher logs nothing when it happens. Earlier reports were closed as an upstream decision. That is the structural limit: the tool routes coding traffic through a consumer chat product whose filters and limits it cannot see or control.

Compared with opencodex, covered here in August, which translates Codex's API for other paid providers, this project swaps in no new provider at all. It reroutes the same company's models through a channel built for people typing, and OpenAI's terms of use are left to the user to read.
