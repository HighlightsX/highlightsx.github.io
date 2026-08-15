---
title: "T3MP3ST turns your coding agent into a red team"
description: "An offensive-security harness driving the agent you already run through recon, exploit and report — with every README number recomputable by one command."
publishDate: 2026-08-26
category: security
tags: ["red teaming", "offensive security", "benchmarks", "agents"]
repo:
  owner: elder-plinius
  name: T3MP3ST
  url: https://github.com/elder-plinius/T3MP3ST
  stars: 5578
  language: TypeScript
  license: AGPL-3.0
  createdAt: 2026-07-02
  pushedAt: 2026-08-12
  snapshotAt: 2026-08-15
sources:
  - label: "elder-plinius/T3MP3ST"
    url: "https://github.com/elder-plinius/T3MP3ST"
    publisher: "GitHub"
    published: 2026-07-02
reviewed: false
---

Penetration-testing frameworks are a normal category of open-source software, and automating one with an LLM was inevitable. T3MP3ST is an AGPL-3.0 multi-agent offensive-security harness that runs the kill chain — recon, exploit, report — on top of whatever coding agent you are already signed into.

This is a tool for authorised targets. Everything below assumes you have written permission to attack the system you point it at; without that, running it is a crime in most jurisdictions regardless of intent.

## What it is

A meta-harness rather than a scanner. It supplies the workflow, the tooling and a browser War Room or CLI, and the brain is Claude Code, Codex, Hermes, OpenCode, Oh My Pi — or a fully offline model through Ollama, LM Studio or vLLM. No API keys of its own, no cloud tenant, no second bill.

## Why it showed up now

Six weeks old, and the benchmark claims are unusually checkable: 90.1% pass@1 on XBOW's own 104-challenge suite, above XBOW's self-reported 85%, plus hint-free CTF solves and what the README calls a cold hunt on real post-cutoff CVEs the model had not seen.

## How it actually works

The three properties the project leads with are worth separating from the marketing voice around them.

**Reproducible.** Every number in the README recomputes from committed data with `npm run verify-claims`, reported as 27/27 green. A claim that cannot be reproduced does not ship. That is a higher evidentiary bar than almost anything else covered on this site, and it is the reason the benchmark figures are worth reading at all.

**Keyless.** The agent already on your machine is the backbone, so there is no separate inference bill and no third party in the loop — which also means an offline model can drive the whole chain.

**Honest about scope.** A status table marks each capability as stable, experimental or roadmap. Given how much of this category ships as a README describing software that does not exist, an explicit "this part is scaffolding" column is a real contribution.

## Try it

Only against systems you are authorised to test: your own infrastructure, a lab, a CTF, or an engagement with a signed scope. Start from the status table so you know which parts are live before planning around them.

## Where it is weak

The legal exposure is the main risk, and it is yours. An autonomous kill chain will not check whether your scope document covers the host it just found through recon, and "the agent did it" is not a defence. Scope discipline has to come from you, in advance.

There is a second, subtler risk specific to autonomous exploitation: a tool that finds and exercises vulnerabilities without a human in the loop can knock over the thing it is testing. Production systems and automated exploitation are a bad combination even with authorisation.

The benchmark, for all its reproducibility, is still self-run — reproducible means you can recompute the author's numbers from the author's data, not that a third party has independently verified them. Four open issues on 5,578 stars, no tagged release, and AGPL-3.0, which is the licence to check before any of this touches commercial consulting work.
