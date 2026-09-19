---
title: "Grok Build is SpaceXAI's coding agent, open in Rust"
description: "A full-screen terminal agent with headless mode and an editor protocol. The repository is a periodic sync out of a closed monorepo, not the monorepo itself."
publishDate: 2026-09-12
category: ai
tags: ["agents", "Rust", "CLI", "coding agents"]
repo:
  owner: xai-org
  name: grok-build
  url: https://github.com/xai-org/grok-build
  stars: 26686
  starsGained: 1396
  language: Rust
  license: Apache-2.0
  createdAt: 2026-07-14
  pushedAt: 2026-09-09
  snapshotAt: 2026-09-12
sources:
  - label: "xai-org/grok-build"
    url: "https://github.com/xai-org/grok-build"
    publisher: "GitHub"
    published: 2026-07-14
reviewed: false
---

Every lab now ships a terminal coding agent, and the interesting part is no longer the agent. It is what each one does with the source. Grok Build publishes the whole Rust runtime under Apache-2.0, then tells you plainly that this tree is a copy.

## What it is

`grok`, a full-screen terminal agent that reads a codebase, edits files, runs shell commands, searches the web and keeps long tasks going. Three ways to drive it: interactively in the TUI, headlessly for CI and scripts, or embedded in an editor over the Agent Client Protocol.

## Why it showed up now

26,686 stars, 1,396 of them in the discovery window, on a repository first pushed on July 14 and last updated September 9. There is no release tag here at all. Binaries and the changelog live on x.ai, so the GitHub side is source, not distribution.

## How it actually works

The repository is synced periodically from the SpaceXAI monorepo, and a `SOURCE_REV` file at the root records the exact monorepo commit each tree corresponds to. That is a more honest arrangement than most one-way mirrors, which leave you guessing which internal commit you are looking at.

Building it needs more than cargo. The toolchain is pinned by `rust-toolchain.toml`, and proto codegen resolves a hermetic `protoc` through DotSlash, so `dotslash` has to be on `PATH` before the first build. macOS and Linux are supported build hosts; Windows is best-effort and untested from this tree.

The binary artifact is `xai-grok-pager`. Official installs rename it `grok`. On first launch it opens a browser to authenticate, which is the part worth reading twice: the code is Apache-2.0, the thing it talks to is not.

MCP servers, slash commands, keyboard shortcuts and theming are all documented in a user guide that ships inside the pager crate rather than only on the docs site.

## Try it

```sh
curl -fsSL https://x.ai/cli/install.sh | bash
grok --version
```

From source, `cargo run -p xai-grok-pager-bin` builds and launches the TUI.

## Where it is weak

The GitHub API reports zero open issues on a repository with 26,686 stars. On a project this size that means issues are closed off or triaged somewhere internal, so the public repository is a read path, not a place where your bug gets tracked.

Development happens in a monorepo you cannot see. You can read every line of the runtime, fork it, and still not participate in the history that produces it. Apache-2.0 on a mirror buys you the right to keep using the code, not a seat at the table.

The agent authenticates against x.ai on first launch. Local models are not what this is for, so the open licence covers a client to a paid service. Judge it as one.

Building from source drags in DotSlash and a pinned toolchain before the first compile, and Windows is explicitly not tested. Take the released binary unless you intend to patch the runtime.
