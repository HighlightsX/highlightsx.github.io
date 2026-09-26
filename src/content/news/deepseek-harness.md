---
title: "DeepSeek Harness: an agent runner where everything is a plugin"
description: "DeepSeek published its own agent harness, dsh, and it collected six figures of stars in two days. It is also a developer preview that promises to break."
publishDate: 2026-08-03
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

The organising idea is stated in four words in the README: everything is a plugin. The harness itself is assembled out of plugins, and the pieces you would expect to be built in are the same kind of object as the pieces you write.

## Why it showed up now

Two days old, no release tags, no issue backlog, and six figures of stars. That count is what happens when a lab with DeepSeek's following publishes a repository, and it says nothing about the code. Whether the architecture underneath is worth adopting has to be judged separately from the trend list.

## How it actually works

The plugin system is not homegrown. It runs on Cordis, an existing framework whose design is written up in a paper the README links, on what it calls spatiotemporal composability. In practice that means plugins are scoped by lifetime as well as by capability: a plugin can be loaded, reloaded and disposed while the process keeps running, and the things it registered go away with it. That is the property a long-lived agent session needs and the one an ordinary plugin registry does not give you.

For anyone building on it, an extension has the same standing as the built-ins. A discoverability convention is already in place too: DeepSeek asks plugin authors to tag their repositories with the `dsh-plugin` topic.

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

The developer-preview warning in the README should be read literally: this is a two-day-old public repository with no tagged release, so anything you build against it today is building against a moving target.

The issue tracker is empty. Feedback is routed to GitHub Discussions and a Discord server instead. That is a legitimate choice for a project this young, but it means there is no public record yet of what is broken, and no way to judge maintainer response time from the outside.

The plugin ecosystem is, at the moment, a topic tag with almost nothing under it. The architecture's main claim is composability, and so far nobody outside DeepSeek has built anything to compose with it.
