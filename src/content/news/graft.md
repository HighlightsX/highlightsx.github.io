---
title: "Graft gives coding agents a prebuilt map of the repository"
description: "A TypeScript CLI that parses a codebase with tree-sitter into linked files an agent can read, with its own benchmarks claiming fewer tokens and more fixes."
publishDate: 2026-09-27
category: devtools
tags: ["agents", "Claude Code", "MCP", "TypeScript", "CLI"]
repo:
  owner: trailhq
  name: Graft
  url: https://github.com/trailhq/Graft
  stars: 9236
  starsGained: 2045
  language: TypeScript
  license: MIT
  createdAt: 2026-07-03
  pushedAt: 2026-09-26
  homepage: https://trailhq.com/graft
  snapshotAt: 2026-09-26
sources:
  - label: "trailhq/Graft"
    url: "https://github.com/trailhq/Graft"
    publisher: "GitHub"
    published: 2026-07-03
  - label: "Graft: Giving AI Coding Agents a Map of Your Codebase"
    url: "https://www.mindstudio.ai/blog/graft-code-graph-ai-agents"
    publisher: "MindStudio"
    published: 2026-09-14
  - label: "Remove the user-facing 'tokens saved' claim: it is not measured (issue #474)"
    url: "https://github.com/trailhq/Graft/issues/474"
    publisher: "GitHub"
    published: 2026-09-25
reviewed: false
---

A coding agent that opens a repository starts by searching for words, opening files and following imports, and it does the same work again in the next session. Graft builds that picture once, writes it to disk, and hands it to the agent at the start of each prompt.

## What it is

A command-line tool, published on npm as `@nanonets/graft`, that turns a codebase into two things: a per-symbol code graph (every function, class and call edge) and, optionally, a folder of Markdown pages that describe each subsystem in plain English. It wires itself into Claude Code through hooks and a statusline, and into Cursor, Codex and others through an MCP server, the standard plug-in interface agents use to call outside tools. The repository started under the NanoNets organisation and now lives under Trail, a company selling a shared "brain" of team rules for agents.

## Why it showed up now

9,236 stars on September 26, 2,045 of them in the discovery window, on a repository created July 3. There are no GitHub releases; the latest tag is v0.20.0. A Show HN post on August 6 drew 3 points, so the growth came later and from elsewhere.

## How it actually works

The structural layer is plain parsing. `package.json` pulls in tree-sitter grammars per language, and the query files in `src/graph/queries/` define what counts as a symbol and a call. No model is involved: `src/ask/ask.ts`, which answers `graft ask`, imports the graph loader and a local text index and nothing from `src/ai/`. The README's claim that the basic graph needs no key and no network holds up in the code.

The freshness claim also holds, with limits the README skips. `src/graph/refresh.ts` runs before every query: it compares each file's size and modification time against the last build (`src/graph/fingerprint.ts`, commented as about 3ms for 280 files) and rebuilds only when something moved. If another rebuild holds the lock for more than 2 seconds, the query answers from the old graph. A same-length edit within one timestamp tick goes unseen unless you set `GRAFT_REFRESH=hash`.

The English pages come from `graft build --deep`, which sends each file to a model you choose, under your own key, and groups the summaries into a few dozen nodes.

Understand Anything, covered here earlier, builds a similar graph, but with a multi-agent model pipeline doing the whole job. Graft keeps the model optional, which is why it can afford to rebuild on every query.

## Try it

```bash
npm install -g @nanonets/graft   # install the CLI, once
graft init                       # build the graph + wire it into Claude Code
```

`graft init --dry-run` lists every file it would touch before writing anything.

## Where it is weak

The headline numbers are the project's own. The internal sweep is 162 runs on two repositories, one of them Graft itself, scored by an Opus judge. The SWE-bench Verified run is 50 instances: 33 solved with Graft against 27 without, a six-instance gap, and the token and cost savings are counted only on instances both sides solved. A MindStudio write-up from September 14, which walks through a debugging example rather than testing independently, makes the same point: the percentages come from Trail's own setup.

The "tokens saved" figure the tool prints inside sessions is weaker still. Issue #474, opened September 25, says it is a file-size guess, and `src/context/savings.ts` confirms it: the characters of the files a query touched, divided by 4, assuming the agent would otherwise have read all of them.

The README says the only network traffic is your model calls, a version check and one daily usage ping. The npm install script sends an install event immediately, which `TELEMETRY.md` does disclose. `graft trail push` in `src/brain/push.ts` uploads commit messages, pull-request comments and docs to Trail's servers; it is a command you have to run, but it is not on that list.

216 open issues, and a recent run of them report `graft callers` missing real callers in TypeScript, Python and PHP (issues #452, #465, #478). For a tool whose selling point is knowing who calls what, that is the part to test on your own code first.
