---
title: "TrueForge is TrueFoundry's open agent harness, priced against Claude"
description: "An MIT-licensed TypeScript runtime for agents: model calls, MCP tools, skills, sandbox and approvals. Its cost benchmark is 14 tasks, run by the vendor."
publishDate: 2026-09-22
category: ai
tags: ["agents", "TypeScript", "MCP", "self-hosted", "benchmarks"]
repo:
  owner: truefoundry
  name: trueforge
  url: https://github.com/truefoundry/trueforge
  stars: 5971
  starsGained: 569
  language: TypeScript
  license: MIT
  createdAt: 2026-07-23
  pushedAt: 2026-09-25
  latestRelease:
    tag: "charts/trueforge@0.2.3-rc.0"
    date: 2026-09-22
  homepage: https://trueforge.dev
  snapshotAt: 2026-09-26
sources:
  - label: "truefoundry/trueforge"
    url: "https://github.com/truefoundry/trueforge"
    publisher: "GitHub"
    published: 2026-07-23
  - label: "TrueFoundry debuts open-source AI agent harness, claiming up to 75% lower costs"
    url: "https://www.infoworld.com/article/4211969/truefoundry-debuts-open-source-ai-agent-harness-claiming-up-to-75-lower-costs.html"
    publisher: "InfoWorld"
    published: 2026-08-20
reviewed: false
---

TrueFoundry sells infrastructure for running AI in companies. TrueForge is the piece it gave away: the loop that sits between a model and its tools, published under MIT and pitched directly against Anthropic's Claude Managed Agents.

## What it is

A harness is everything in an agent product except the model: calling the model, running tools, keeping session history, asking a human before something risky happens, trimming the conversation when it gets too long. TrueForge does all of that in TypeScript and exposes it three ways: a bundled chat UI, an HTTP API with a TypeScript SDK, and an embeddable UI package. Models come from OpenAI, Anthropic, Gemini or any OpenAI-compatible endpoint. Tools come from remote MCP servers, skills are `SKILL.md` packs pulled from git, and code runs in a sandbox. It runs as one process on SQLite for local use, or on Postgres and Redis with Docker Compose, Helm or Railway.

## Why it showed up now

5,971 stars on September 26, 569 of them in the discovery window, on a repository created July 23. InfoWorld covered the launch on August 20, and every npm package got a new release candidate on September 22. The growth tracks a company launch with press coverage.

## How it actually works

The README says secrets stay in the harness while code runs in the sandbox. The code supports that. In Code Mode the model writes a script that calls tools, and inside the sandbox those calls go through `sandbox/scripts/mcp_client.py`. That script receives only a list of server names and allowed tool names, checks each call against it, and sends the request over a NATS message channel back to the harness. There, `CodeModeDispatcher.ts` routes it to the real MCP connection, which holds the credentials. A script that asks for a tool outside its list gets "Access denied" before anything leaves the box.

`ContextCompaction.ts` summarises the conversation once it reaches 80 percent of the model's context window, or 50,000 tokens when the window size is unknown, using a long fixed summary prompt that asks for file names, errors and every user message.

The sandbox is narrower than it sounds. The README says "Daytona today", and the shipped `sandbox-catalog.yaml` offers only Daytona, a hosted sandbox company. The code also contains `TFYSandboxProvider.ts`, a second provider typed `truefoundry`, which is not in the catalog. That is presumably the route into TrueFoundry's paid platform.

## Try it

```bash
npx @truefoundry/trueforge@latest
```

The README warns that local mode has no login and should stay on localhost. Anything shared needs hosted mode.

## Where it is weak

The headline numbers come from TrueFoundry's own `benchmark/` folder: 14 tasks from DevRev's Enterprise-Bench, three trials each, graded by an LLM judge. TrueForge on Opus 4.8 solved 10.7 of 14 at $8.6 per run against $11.8 for Claude Managed Agents at the same 10.7. The same table shows deepagents on GLM-5.2 solving 12.0, the best score listed, at $9.1. The "75 percent cheaper" figure also depends on changing the model as well as the harness. InfoWorld notes the results have not been independently checked on larger production workloads, and that running it yourself adds infrastructure costs a managed service absorbs.

Running code needs a Daytona account until another provider ships. An open issue from September 18 asks for Kubernetes Agent Sandbox support, and two from September 23 add Tavily and Exa search providers. Only five of the 96 open items are issues; the rest are pull requests, so the backlog is mostly work in flight.

Compared with DeepSeek Harness, covered here in August, TrueForge is built as a server a team deploys, with approvals, multi-tenant checks and a Helm chart. Against deepagents, the LangGraph option, it trades a Python library you build into your own code for a service you call over HTTP. Every package is still at version 0.x or a release candidate.
