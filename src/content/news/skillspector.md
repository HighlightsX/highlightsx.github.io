---
title: "NVIDIA scans agent skills before you install them"
description: "SkillSpector reads a skill for prompt injection, exfiltration and supply-chain risk, citing research that 26.1% carry vulnerabilities and 5.2% look malicious."
publishDate: 2026-08-27
category: security
tags: ["agent skills", "prompt injection", "supply chain", "scanning"]
repo:
  owner: NVIDIA
  name: SkillSpector
  url: https://github.com/NVIDIA/SkillSpector
  stars: 14667
  language: Python
  license: Apache-2.0
  createdAt: 2026-03-21
  pushedAt: 2026-08-15
  latestRelease:
    tag: v2.9.5
    date: 2026-08-15
  homepage: https://docs.nvidia.com/skills/scanning-agent-skills
  snapshotAt: 2026-08-16
sources:
  - label: "NVIDIA/SkillSpector"
    url: "https://github.com/NVIDIA/SkillSpector"
    publisher: "GitHub"
    published: 2026-03-21
  - label: "Scanning agent skills"
    url: "https://docs.nvidia.com/skills/scanning-agent-skills"
    publisher: "NVIDIA"
    published: 2026-08-15
reviewed: false
---

Agent skills are instructions that run with your agent's permissions, distributed the way npm packages were in 2013: a URL, a README and implicit trust. SkillSpector is NVIDIA's Apache-2.0 answer to the obvious question that arrangement raises.

## What it is

A scanner that answers one thing: is this skill safe to install? It takes a Git repository, a URL, a zip, a directory or a single file, and reports what it found before the skill ever reaches your agent's skills folder.

The numbers in its README are the reason the tool exists. Citing research on the ecosystem, it states that **26.1% of skills contain vulnerabilities and 5.2% show likely malicious intent**. One in twenty is not a tail risk.

## Why it showed up now

v2.9.5 shipped the day before this snapshot, five months after the repository appeared. It is also not a standalone tool: SkillSpector is the scanning stage of the NVIDIA Verified Skills pipeline, which scans, evaluates and signs skills before publishing them to a catalog. That makes it infrastructure for a supply chain rather than a linter someone wrote.

## How it actually works

Two stages. Fast static analysis first, then an optional LLM semantic pass — the right order, because most of what you want to catch is cheap to find and you should not pay a model to notice `curl | sh`.

The pattern library is 69 checks across 17 categories, and the category list is the clearest map of this threat model published anywhere: prompt injection, data exfiltration, privilege escalation, supply chain, excessive agency, output handling, system prompt leakage, memory poisoning, tool misuse, rogue agent, anti-refusal, trigger abuse, dangerous code via AST analysis, taint tracking, YARA signatures, MCP least privilege, and MCP tool poisoning.

Two of those deserve a second look. *Trigger abuse* is a skill written so its description fires it in situations the user did not intend — the skill equivalent of typosquatting. *Anti-refusal* is instruction text designed to talk the model out of its own guardrails, which is exactly what the jailbreak-installer genre ships as a feature.

Supply-chain checks query [OSV.dev](https://osv.dev) live for CVE data, with automatic offline fallback. Output is terminal, JSON, Markdown or SARIF — SARIF being the one that matters, since it drops straight into existing code-scanning pipelines. A 0–100 risk score comes with severity labels, and a baseline file lets you accept known findings so re-scans surface only new ones.

## Try it

Point it at a skill repository before installing, and gate installs on the score. There is also a Pi extension so scans can run from inside an agent session — useful, and slightly recursive.

## Where it is weak

Pattern matching plus an LLM pass finds what it knows to look for. A skill written to evade 69 published patterns is a solvable problem for whoever writes it, and the check that catches yesterday's malicious skill is public.

The optional semantic stage costs tokens and introduces the same failure mode it is guarding against: judgement from a model reading attacker-authored text.

There are 78 open issues, and the deeper structural point is worth saying plainly — a scanner is a mitigation for an ecosystem that ships executable instructions with no signing by default. The Verified Skills pipeline is NVIDIA's attempt at the actual fix, and it only covers skills published through it.
