---
title: "OpenConnector keeps SaaS credentials out of the agent"
description: "An open-source auth gateway fronting 1,000+ providers for AI agents, with inspectable action contracts and a self-host path off the hosted runtime."
publishDate: 2026-08-18
category: infra
tags: ["OAuth", "MCP", "integrations", "self-hosted"]
repo:
  owner: oomol-lab
  name: open-connector
  url: https://github.com/oomol-lab/open-connector
  stars: 4690
  language: TypeScript
  license: Apache-2.0
  createdAt: 2026-06-29
  pushedAt: 2026-08-15
  latestRelease:
    tag: v1.3.5
    date: 2026-08-07
  homepage: https://oomol.com
  snapshotAt: 2026-08-15
sources:
  - label: "oomol-lab/open-connector"
    url: "https://github.com/oomol-lab/open-connector"
    publisher: "GitHub"
    published: 2026-06-29
  - label: "Release v1.3.5"
    url: "https://github.com/oomol-lab/open-connector/releases/latest"
    publisher: "GitHub"
    published: 2026-08-07
reviewed: false
---

Every agent product hits the same wall: the useful work is in the user's SaaS accounts, and getting there means holding OAuth tokens for a long tail of providers. OpenConnector is an Apache-2.0 gateway for that problem, and its stated position is as an open alternative to Pipedream and Composio.

## What it is

Users connect their app accounts once. The gateway then exposes a catalogue of over 1,000 providers and more than 10,000 prebuilt actions to your agents and applications — GitHub, Gmail, Notion, BigQuery, Google Analytics, Supabase, Airtable, Slack and the rest. Five ways in: an SDK from app code, the `oo` CLI as a local-agent relay, MCP from agent hosts, HTTP/OpenAPI from custom clients, and a web console for administration and debugging.

The framing that matters is in the "where it fits" section: durable access to the tools users already use, *without handing provider credentials to the agent process*. Credentials, scopes, schemas, policies and run logs stay inside a runtime you can inspect.

## Why it showed up now

Six weeks old, v1.3.5 in August, pushed daily, and only 8 open issues — an unusually quiet tracker for a project moving this fast, which usually means either good triage or few people running it in anger yet.

## How it actually works

The three deployment modes are the reason to look. Hosted, run by OOMOL with managed OAuth and no app setup. Cloudflare, deployed into your own account on Workers, D1, R2 and Static Assets, where you own the OAuth apps. Or fully self-hosted with Docker or Node.js on your own infrastructure, with Fly.io plus persistent SQLite documented as a supported shape.

Crucially, provider ids, action ids, schemas and contracts are the same across all of them. That is the part that makes the escape hatch real rather than theoretical: moving from hosted to self-hosted is a deployment change, not a rewrite of every integration call.

Action contracts are inspectable — request and response schemas, required scopes, and lazily loaded executor source, so you can read what an action will actually do before an agent calls it. Runtime controls cover connection identity, scopes, runtime tokens, action allow and block policies, temporary file transit, and redacted run logs. Credential types include API keys, OAuth2, custom credentials and no-auth providers.

## Try it

Self-host with Docker or Node, or start from the local dashboard for browsing providers and debugging actions. Endpoint details, response envelopes, auth headers and MCP tool definitions are documented in `docs/runtime-api.md` in the repository.

## Where it is weak

A catalogue of 1,000+ providers and 10,000+ actions is a maintenance surface, not a feature list. Upstream APIs change, and the honest question for any gateway of this kind is who fixes a broken connector and how fast — the repository does not publish a freshness or coverage report, so treat the providers you depend on as things to verify individually.

The gravity of the hosted runtime is worth naming: managed OAuth is the fastest path and the one that keeps the vendor in the loop. The self-host route means you register and maintain OAuth apps for every provider yourself, which is exactly the work the hosted mode is selling.

And the security posture cuts both ways. A gateway that holds credentials for every SaaS account in your company is a very attractive single target, self-hosted or not.
