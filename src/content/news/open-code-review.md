---
title: "Open Code Review: Alibaba's internal review bot, opened up"
description: "A Go CLI that reviews git diffs with a hybrid of deterministic pipelines and an LLM agent, and claims a ninth of the tokens a general agent spends."
publishDate: 2026-08-15
category: devtools
tags: ["code review", "Go", "agents", "CLI"]
repo:
  owner: alibaba
  name: open-code-review
  url: https://github.com/alibaba/open-code-review
  stars: 20537
  language: Go
  license: Apache-2.0
  createdAt: 2026-05-18
  pushedAt: 2026-08-15
  latestRelease:
    tag: v1.9.4
    date: 2026-08-15
  homepage: https://open-codereview.ai
  snapshotAt: 2026-08-15
sources:
  - label: "alibaba/open-code-review"
    url: "https://github.com/alibaba/open-code-review"
    publisher: "GitHub"
    published: 2026-05-18
  - label: "Release v1.9.4"
    url: "https://github.com/alibaba/open-code-review/releases/latest"
    publisher: "GitHub"
    published: 2026-08-15
reviewed: false
---

`ocr` is a command-line code reviewer written in Go, Apache-2.0 licensed, and it did not start life as an open-source project. Alibaba ran it internally as its official AI review assistant for about two years before publishing it, which is a different provenance from most tools in this category: the design was settled by people who had to live with its false positives.

## What it is

It reads a git diff, sends the changed files to a model endpoint you configure, and writes structured review comments pinned to specific lines. The agent can open full files, search the codebase and look at other changed files for context, so a comment can depend on something outside the diff hunk. A second mode, `ocr scan`, reviews whole files rather than a diff — the case where you have inherited a directory and there is nothing to compare against.

Any OpenAI- or Anthropic-compatible endpoint works, which means the tool is free and the inference is your bill.

## Why it showed up now

v1.9.4 shipped on the day of writing, and the repository has been pushed to continuously since May. The release cadence, not the star count, is the signal: this is a project being maintained at the pace of something people depend on internally.

## How it actually works

The interesting design decision is the refusal to be a pure agent. The README's diagnosis of general-purpose coding agents doing review work is specific and matches what most teams find: on a large changeset the agent quietly reviews some files and skips others; reported line numbers drift off the code they describe; and quality swings with small prompt edits, which makes regressions impossible to debug.

Their answer is a hybrid — deterministic pipelines handle the parts that must not vary (which files get reviewed, where a comment is anchored, which rules run), and the model is used for the judgement that cannot be encoded. On top of that sits a built-in multi-language ruleset for the classic defect families: null-pointer dereferences, thread safety, XSS, SQL injection.

The published benchmark is worth reading carefully. It is built from 200 pull requests across 50 popular repositories and 10 languages, with 1,505 ground-truth issues annotated and cross-checked by more than 80 senior engineers. Against a general-purpose agent on the same underlying model, they report higher precision and F1 while spending roughly a ninth of the tokens — and lower recall, which they state outright as a deliberate trade. The tool is tuned to say fewer things and be right more often.

## Try it

The distribution is npm, even though the tool is Go:

```sh
npx @alibaba-group/open-code-review
```

Point it at a model endpoint, run it in a repository with uncommitted changes, and read the comments before you trust them on anything that matters.

## Where it is weak

The benchmark is the vendor's own. The dataset is published on Hugging Face and the methodology is described, which is more than most projects offer, but the comparison was designed and run by the people whose tool wins it.

Lower recall is a real cost, not a footnote: a reviewer tuned for precision misses defects, and if you are replacing a human reviewer rather than adding to one, that is the number that matters to you.

There are 105 open issues, and the project carries the assumptions of the codebase it grew up in — a very large monorepo culture with its own rule priorities. The built-in ruleset reflects what breaks at Alibaba, which may not be what breaks at your shop.
