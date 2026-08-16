---
title: "Skill Seekers turns docs sites and PDFs into agent skills"
description: "Eighteen source types in, twenty-two targets out, with automatic conflict detection and an AI scan that emits one config per framework it finds in your project."
publishDate: 2026-08-30
category: devtools
tags: ["agent skills", "documentation", "Python", "RAG"]
repo:
  owner: yusufkaraaslan
  name: Skill_Seekers
  url: https://github.com/yusufkaraaslan/Skill_Seekers
  stars: 14768
  language: Python
  license: MIT
  createdAt: 2025-10-17
  pushedAt: 2026-08-09
  latestRelease:
    tag: v3.9.1
    date: 2026-08-03
  homepage: https://skillseekersweb.com/
  snapshotAt: 2026-08-16
sources:
  - label: "yusufkaraaslan/Skill_Seekers"
    url: "https://github.com/yusufkaraaslan/Skill_Seekers"
    publisher: "GitHub"
    published: 2025-10-17
  - label: "Release v3.9.1"
    url: "https://github.com/yusufkaraaslan/Skill_Seekers/releases/latest"
    publisher: "GitHub"
    published: 2026-08-03
reviewed: false
---

The gap between "my agent should know this framework" and a working skill is a few hours of copying documentation into markdown and hoping the result is neither too thin nor too long. Skill Seekers is an MIT-licensed pipeline that does the conversion: documentation sites, repositories, PDFs, videos, notebooks and wikis in — 18 source types — structured skills out, packaged for 22 targets.

## What it is

A data-layer tool rather than a skill. It prepares knowledge once and exports it for Claude, Gemini and OpenAI skills, RAG pipelines like LangChain, LlamaIndex and Pinecone, and coding assistants including Cursor, Windsurf and Cline.

```bash
pip install skill-seekers
skill-seekers create https://docs.djangoproject.com/
skill-seekers package output/django --target claude
```

That leaves `output/django-claude.zip`, ready to install.

## Why it showed up now

v3.9.1 in early August, ten months and three major versions in. The interesting recent capability is not the source list, it is the project scan.

## How it actually works

Point `scan` at a repository and an AI agent reads its manifests, README, Dockerfile and CI config, samples the source imports, and emits one config per framework it detects — plus a `-codebase.json` for your own code:

```bash
skill-seekers scan ./my-react-app --out ./configs/scanned/
# react.json, vite.json, tailwind.json, jest.json, my-react-app-codebase.json
```

That inverts the usual workflow. Instead of deciding which docs your agent needs, the tool reads what you actually depend on and proposes the set. When a detection has no existing preset, it generates a fresh config and offers to publish it back to the community catalogue.

The other feature worth naming is automatic conflict detection. Installing five documentation skills that all describe "routing" is how an agent gets confused, and detecting that overlap before install is a problem most skill tooling has not noticed yet.

The enhancement step is agent-agnostic: `--agent kimi` or an arbitrary `--agent-cmd` runs the generation through whatever model you prefer.

## Try it

Start with one framework you use daily, install the packaged skill, and ask your agent something the docs answer and the base model gets wrong.

## Where it is weak

Generated skills are only as good as the documentation behind them, and they freeze at generation time. A skill built from a docs site in August describes August's API — nothing here re-runs when upstream changes, so a stale skill is an agent confidently using a removed function.

There is a cost dimension: enhancement runs an agent over the extracted content, so building skills for a large docs site is a real token bill.

48 open issues, and the README carries a launch partner and sponsors, one of which is also an export target. That is disclosed rather than hidden, and it is still worth knowing when reading a feature list. The 18-sources, 22-targets framing is a matrix in which some cells are inevitably better tested than others — check the pair you need.
