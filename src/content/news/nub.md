---
title: "Nub: Bun's ergonomics without leaving Node"
description: "A Rust toolkit that runs TypeScript, installs packages and manages Node versions — by extending stock Node rather than replacing the runtime."
publishDate: 2026-08-16
category: languages
tags: ["Node.js", "Rust", "TypeScript", "package manager"]
repo:
  owner: nubjs
  name: nub
  url: https://github.com/nubjs/nub
  stars: 3984
  language: Rust
  license: MIT
  createdAt: 2026-06-03
  pushedAt: 2026-08-15
  latestRelease:
    tag: v0.7.5
    date: 2026-08-09
  homepage: https://nubjs.com
  snapshotAt: 2026-08-15
sources:
  - label: "nubjs/nub"
    url: "https://github.com/nubjs/nub"
    publisher: "GitHub"
    published: 2026-06-03
  - label: "Release v0.7.5"
    url: "https://github.com/nubjs/nub/releases/latest"
    publisher: "GitHub"
    published: 2026-08-09
reviewed: false
---

The pitch for Bun and Deno was that Node's developer experience needed a new runtime to fix. Nub takes the opposite bet: keep stock `node`, and put the missing ergonomics in a Rust tool that wraps it.

## What it is

One binary that runs your files, runs your scripts, installs your dependencies and manages your Node versions. `nub index.ts` executes TypeScript with no build step. `nub run dev` replaces `pnpm run`. `nub install` replaces the install step. `nubx` replaces `npx`. `nub node install 26` replaces the version manager. MIT, written in Rust, and explicit that it augments Node instead of competing with it — no new runtime, no vendor-specific API surface.

## Why it showed up now

Two months old, tagged v0.7.5 in August, pushed to daily. The interesting timing is not the release but the premise: Node has spent the last few years growing the extension points that make this possible, and Nub is the first widely-noticed tool built specifically on top of them rather than around them.

## How it actually works

The README explains the trick in one paragraph, and it is the reason this project is worth reading about rather than just installing. Nub uses Node surfaces that mostly did not exist when Deno and Bun were designed: `--import` and `--require` preloads, `module.registerHooks()` for transpilation and resolution, and N-API native addons — which is how it embeds [oxc](https://oxc.rs/) to pre-transpile TypeScript.

So the TypeScript support, the `tsconfig.json#paths` resolution, the extensionless imports, JSX, decorators and `using` are all handled by hooks inside a normal Node process. The claimed numbers follow from doing the slow parts in Rust: 2.9× faster startup than `tsx`, 24× faster script running than `pnpm run`, 19× faster than `npx`, 18× faster installs.

It also unflags things Node still hides behind experimental flags — `node:sqlite`, `vm.Module`, `localStorage`, `WebSocket`, `EventSource` — and polyfills `Temporal`, `Worker` and `URLPattern` where they are missing. Automatic `.env` loading matches what Next.js and Vite already do.

## Try it

```sh
curl -fsSL https://nubjs.com/install.sh | bash
```

Homebrew, Nix, mise, PowerShell and plain `npm install -g @nubjs/nub` all work. In CI, `nubjs/setup-nub@v0` is a one-to-one swap for `actions/setup-node@v4`.

## Where it is weak

It is v0.7.x. The version number is the honest signal about a tool that sits between you and every dependency install in your project, and there are 44 open issues.

The compatibility claim is carefully worded — flag-for-flag drop-in with `node`, "mostly via passthrough" — and passthrough is where the edge cases live. If your build depends on an unusual loader chain or a native addon with its own opinions about the module system, that is the part to test before you switch a team over.

The deeper trade is strategic rather than technical: the whole design depends on Node's hook APIs staying stable and staying capable. That is a bet on someone else's roadmap, which is exactly the bet Bun and Deno declined to make.
