---
title: "DeepSeek Harness: an agent runner where everything is a plugin"
description: "DeepSeek published its own agent harness, dsh, and it collected six figures of stars in two days. It is also a developer preview that promises to break."
publishDate: 2026-08-15
category: ai
tags: ["agents", "TypeScript", "developer preview", "plugins"]
repo:
  owner: deepseek-ai
  name: deepseek-harness
  url: https://github.com/deepseek-ai/deepseek-harness
  stars: 111884
  language: TypeScript
  license: MIT
  createdAt: 2026-08-13
  pushedAt: 2026-08-13
  homepage: https://deepseek.com/harness
  snapshotAt: 2026-08-15
sources:
  - label: "deepseek-ai/deepseek-harness"
    url: "https://github.com/deepseek-ai/deepseek-harness"
    publisher: "GitHub"
    published: 2026-08-13
  - label: "Cordis"
    url: "https://github.com/cordiverse/cordis"
    publisher: "GitHub"
    published: 2026-08-13
reviewed: false
---

DeepSeek released `dsh`, an agent harness of its own, and the repository went from empty to one of the most-starred things on GitHub inside two days. The code is MIT-licensed TypeScript, the docs are in English and Chinese, and the README opens with a warning in bold capitals that compatibility will break.

## What it is

A harness is the part of an agent product that is not the model: the loop that calls tools, the session state, the permission prompts, the interface you actually sit in front of. DeepSeek Harness ships that layer as an open-source program you run locally, pointed at a model of your choosing, with a web UI on `127.0.0.1:3080`.

The organising idea is stated in four words in the README: everything is a plugin. Not "extensible through plugins" — the harness itself is assembled out of them, and the pieces you would expect to be built in are the same kind of object as the pieces you write.

## Why it showed up now

Two days old, no release tags, no issue backlog, and six figures of stars. That number is not a verdict on the software; it is what happens when a lab with DeepSeek's following publishes a repository. Worth knowing precisely because the star count tells you nothing here — the interesting question is whether the architecture underneath is worth adopting, and that has an answer independent of the trend list.

## How it actually works

The plugin system is not homegrown. It runs on [Cordis](https://github.com/cordiverse/cordis), an existing framework whose design is written up in a paper the README links, on what it calls spatiotemporal composability. In practice that means plugins are scoped by lifetime as well as by capability: a plugin can be loaded, reloaded and disposed while the process keeps running, and the things it registered go away with it. That is the property a long-lived agent session needs and the one an ordinary plugin registry does not give you.

The consequence for anyone building on it: your extension is not a callback bolted onto a fixed pipeline. It is a unit with the same standing as the built-ins, and the discoverability convention is already in place — DeepSeek asks plugin authors to tag their repositories with the `dsh-plugin` topic.

## Try it

Node installed, then one command:

```sh
npx @deepseek-ai/dsh web
```

From a checkout, if you want to read the source while it runs:

```sh
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

## Where it is weak

The developer-preview warning is the honest part of the README and should be read literally: this is a two-day-old public repository with no tagged release, so anything you build against it today is building against a moving target.

The issue tracker is empty — feedback is routed to GitHub Discussions and a Discord server instead. That is a legitimate choice for a project this young, but it means there is no public record yet of what is broken, and no way to judge maintainer response time from the outside.

The plugin ecosystem is, at the moment, a topic tag with almost nothing under it. An architecture whose main claim is composability is only as good as the things composed with it, and that part has not been built by anyone but DeepSeek yet.
