---
title: "OpenAI ships a security scanner you point at any model"
description: "Codex Security is a CLI and SDK that finds, validates and fixes vulnerabilities — and it will run the scan through OpenRouter, Bedrock or Fireworks instead."
publishDate: 2026-08-17
category: security
tags: ["security", "vulnerability scanning", "CLI", "OpenAI"]
repo:
  owner: openai
  name: codex-security
  url: https://github.com/openai/codex-security
  stars: 9851
  language: TypeScript
  license: Apache-2.0
  createdAt: 2026-07-13
  pushedAt: 2026-08-15
  latestRelease:
    tag: npm-v0.1.12
    date: 2026-08-15
  homepage: https://developers.openai.com/codex/security
  snapshotAt: 2026-08-15
sources:
  - label: "openai/codex-security"
    url: "https://github.com/openai/codex-security"
    publisher: "GitHub"
    published: 2026-07-13
  - label: "Codex Security documentation"
    url: "https://developers.openai.com/codex/security"
    publisher: "OpenAI"
    published: 2026-08-15
reviewed: false
---

`@openai/codex-security` is OpenAI's vulnerability scanner as a CLI and a TypeScript SDK, Apache-2.0 licensed, one month old and shipping releases the day this was written. The part worth noticing is buried in the middle of the README: it is not locked to OpenAI models.

## What it is

Point it at a directory and it looks for security defects, validates them, and can propose fixes. Three commands get you from nothing to a scan:

```bash
npm install @openai/codex-security
npx @openai/codex-security login
npx @openai/codex-security scan .
```

There is a shallow default and a deep mode with knobs that read like a batch job rather than a linter: `--workers`, `--subagents`, `--max-discovery-runs`, `--stop-after-no-new`, `--max-time-hours`. Deep discovery runs up to 96 hours by default. That is the tell — this is not a pattern matcher, it is an agent searching a codebase until it stops finding new things.

## Why it showed up now

Releases are landing continuously — `npm-v0.1.12` on the day of the snapshot — and the repository has grown to five figures of stars in a month. The `0.1.x` version line says the interface is still moving.

## How it actually works

The scan is model-driven, and the model is a flag: `--model gpt-5.6-terra --effort high` picks the effort level, and `--provider` redirects the whole thing elsewhere. The README documents OpenRouter with an Anthropic model, Fireworks with Qwen, and Amazon Bedrock — including the standard AWS credential chain, profiles and web identity. A vendor shipping first-class support for running its security product on a competitor's model is not the usual arrangement.

Credential handling is documented with more care than most tools bother with, and the details matter for CI: environment API keys are passed to the current scan and never written to Codex's credential home or the system keyring; local sign-in honours the configured credential backend, including a managed device's keyring; and when both a ChatGPT sign-in and an API key exist, interactive scans ask which to use while non-interactive scans keep API-key precedence.

## Try it

```bash
npx @openai/codex-security scan . --mode deep --max-time-hours 1.5
```

Node 22.13+, 24.x or 26.x, plus Python 3.10 or later. In CI, set `OPENAI_API_KEY` or `CODEX_API_KEY` and skip the login.

## Where it is weak

Access is gated. The README states that some cybersecurity requests and protected findings require approval through Trusted Access for Cyber, applied for separately. A scanner you cannot fully run until an application clears is a different proposition from one you install.

The cost model is the deep mode's real cost: workers, subagents and discovery runs multiply tokens, and a scan permitted to run for hours is a bill that scales with patience. There is no published benchmark in the README — no precision or recall figures against a labelled corpus — so the only way to know how it compares to the scanners you already run is to run it on a repository whose bugs you already know.

There are 125 open issues on a one-month-old repository, and the version line is `0.1.x`. Treat findings as leads to verify, not as a gate to hand a release process.
