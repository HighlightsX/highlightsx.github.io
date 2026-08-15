---
title: "QM is an agent with a per-employee sandbox, in Slack"
description: "A multiplayer agent harness where every person and every room gets its own memory, files, keychain, crons and durable sandbox — on a harness you choose."
publishDate: 2026-08-16
category: ai
tags: ["agents", "Slack", "multi-tenant", "TypeScript"]
repo:
  owner: yc-software
  name: qm
  url: https://github.com/yc-software/qm
  stars: 13601
  language: TypeScript
  license: MIT
  createdAt: 2026-07-29
  pushedAt: 2026-08-15
  latestRelease:
    tag: v0.1.4
    date: 2026-07-31
  homepage: https://x.com/qm__dev
  snapshotAt: 2026-08-15
sources:
  - label: "yc-software/qm"
    url: "https://github.com/yc-software/qm"
    publisher: "GitHub"
    published: 2026-07-29
  - label: "Release v0.1.4"
    url: "https://github.com/yc-software/qm/releases/latest"
    publisher: "GitHub"
    published: 2026-07-31
reviewed: false
---

Most agents are built as one assistant with one memory. Point that at a company and the design starts to fight you: everyone's context lands in the same place, permissions become a patch, and one person's experiment changes everyone's assistant. QM's answer is to make the scope the primary object.

## What it is

An MIT-licensed multiplayer agent harness that lives in Slack and on the web. Every employee gets an isolated workspace, and every room — channel, group message, project — is its own scope too. Each scope carries its own memory, files, keychain view, permissions, crons, web apps and durable sandbox. Identity and configuration carry between Slack and the web app, so it is one agent, not two integrations.

It is also deliberately not tied to a vendor: Pi, OpenCode, Codex and Claude Code all drive the same core, and admins choose which harnesses and models are available at the org level.

## Why it showed up now

Two weeks old at the time of writing, v0.1.4 tagged days after the first release, pushed daily. Five figures of stars on a repository that young is attention running ahead of the software — which is the reason to read the architecture rather than the star count.

## How it actually works

The README's diagram is unusually informative. A headless core owns the API, identity, policy and scheduler, and sits next to the agent loop; Postgres holds sessions, memory and the queue; and each scope gets its own sandbox. The agent has a small fixed tool surface, and one of those tools is `execute`, which runs commands in that scope's sandbox — a durable computer where installed tools stay installed between sessions.

That is the design decision worth taking away. Giving each person and each room a persistent machine, rather than a fresh container per task, means the agent accumulates a working environment the way a colleague would, while the blast radius of anything it installs or breaks stops at that scope.

The web UI, the admin panel and the public portal are optional plugins over the core's HTTP API, so the core is usable headless. Skills are scope-owned and shared by grant, with admin-gated promotion to the whole org and skill packs importable from git repositories. Crons and watches run work when nobody is looking.

## Try it

The repository is the deployment: it needs Postgres, a Slack app and a harness of your choice. Start with a single scope before pointing it at an org.

## Where it is weak

233 open issues on a two-week-old project is the clearest signal in this post. That is a lot of people finding a lot of edges very fast, and the `0.1.x` version says the maintainers agree it is early.

A per-scope durable sandbox with a keychain view is a serious security surface: you are giving an agent a persistent machine with credentials, per employee, and the security posture is configured by an admin rather than enforced by isolation you can audit from the outside. That is worth a threat model before a pilot, not after.

The homepage listed on the repository is an X profile rather than documentation, which tells you where this project currently is: shipping and talking, with the docs still catching up.
