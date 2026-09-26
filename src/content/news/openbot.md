---
title: "OpenBot gives every AI coworker its own browser and an audit trail"
description: "CopilotKit's self-hosted template runs each agent in its own container behind a policy gateway. Out of the box, that policy allows everything."
publishDate: 2026-09-28
category: ai
tags: ["agents", "self-hosted", "TypeScript", "MCP"]
repo:
  owner: CopilotKit
  name: OpenBot
  url: https://github.com/CopilotKit/OpenBot
  stars: 5579
  starsGained: 833
  language: TypeScript
  license: MIT
  createdAt: 2026-08-17
  pushedAt: 2026-09-23
  latestRelease:
    tag: v0.0.15
    date: 2026-09-22
  homepage: https://www.copilotkit.ai/openbot
  snapshotAt: 2026-09-26
sources:
  - label: "CopilotKit/OpenBot"
    url: "https://github.com/CopilotKit/OpenBot"
    publisher: "GitHub"
    published: 2026-08-17
  - label: "CopilotKit OpenBot Gives Each Agent a Computer"
    url: "https://zentor.ai/blog/copilotkit-openbot"
    publisher: "Zentor"
    published: 2026-08-20
  - label: "Show HN: Open Bot, an open-source Grok Bot that works with any agent harness"
    url: "https://news.ycombinator.com/item?id=49365575"
    publisher: "Hacker News"
    published: 2026-08-19
reviewed: false
---

Letting an agent loose in a logged-in browser is easy. Being able to say afterwards what it clicked, and why it was allowed to, is the part companies ask about. OpenBot is CopilotKit's attempt at that second part, shipped as a repository you clone and rebuild as your own.

## What it is

A self-hosted agent workspace in TypeScript, run with Docker Compose and PostgreSQL. Each "coworker" gets a container with its own Chromium profile, a `/workspace` volume and a shell. The agent itself is any endpoint speaking AG-UI, CopilotKit's protocol for agent-to-interface traffic, so a LangGraph, Mastra or hand-written agent plugs in the same way. Thirteen example coworkers ship under `examples/`, defined as configuration files.

The README calls it "a template, not a product": no hosted version, every workspace in the monorepo marked private.

## Why it showed up now

5,579 stars on September 26, 833 of them in the discovery window, on a repository created August 17. Releases arrive every few days; v0.0.15 landed September 22 and lets a Google or xAI OAuth grant stand in for a model API key. The Show HN post on August 19 drew 12 points and one comment, so the attention came from CopilotKit's own audience more than from that thread.

## How it actually works

The central claim is that every Bot action passes one gateway that decides, records, then acts. `server/src/computer/gateway.ts` does this in that order: it calls `evaluateActionPolicy`, awaits the audit write, and only then forwards the action to the container. If the action throws afterwards, a second row records the failure, so an "allowed" row does not get read as "it happened."

The second claim is that the policy fails closed. `server/src/computer/policy.ts` checks deny rules first, treats a deny expression that throws as a match, and returns a refusal when no allow rule matches. That holds. But in `server/src/computer/policy-store.ts`, `DEFAULT_ACTION_POLICY` is `allow: ["true"]`. A fresh deployment permits every action and records it; restriction starts when an administrator writes the first deny rule. The code comment says this is deliberate. The README's "fail closed" line is accurate only for a missing or broken policy.

There is also a `dry-run` mode in which denied actions are logged and still carried out, and the gateway itself notes that input from a person taking over the screen is the one acting path with no audit row.

Routine limits are in the code as stated: `server/src/routines/schedule.ts` sets a 15-minute minimum interval.

## Try it

```sh
cp .env.example .env
npx --yes copilotkit@latest login
npx --yes copilotkit@latest project select
bun install
bash scripts/start.sh
```

Then open `http://localhost:3010`. You need Docker, Bun 1.3 or later, an OpenAI key and a CopilotKit Intelligence project key. A single Docker image, `ghcr.io/copilotkit/openbot`, is also published.

## Where it is weak

Thread storage and memory go through CopilotKit Intelligence, which needs a CopilotKit account and license. A free plan exists and it can be self-hosted, but a vendor sits inside the MIT-licensed stack. Zentor, a company selling a managed alternative, makes the same point in its August 20 write-up, along with the operating cost of one Chromium per active coworker.

The gateway has no check on what goes into a tool call's arguments. Open issue #86 asks for prompt injection defense, PII detection and cost budgets on tool arguments; none exist yet. Issue #350 notes the rule evaluator cannot be swapped out. Twenty items were open on September 26, mostly pull requests.

Compared with Ego Lite, covered here earlier, which lets agents reuse your real browser sessions, OpenBot isolates each agent and pays for it in containers. Open Connector puts its gateway on authentication for external APIs; OpenBot's sits on the browser, shell and MCP calls. At v0.0.x and labeled alpha, it is a starting point for a team willing to own it, as the README says.
