---
title: "OpenScience gives a research agent 295 skills and a lab"
description: "A browser workbench that reads the literature, writes code, runs experiments and queries UniProt, PDB, ChEMBL and thirty more databases — on your own API keys."
publishDate: 2026-08-19
category: ai
tags: ["research", "agents", "science", "TypeScript"]
repo:
  owner: synthetic-sciences
  name: openscience
  url: https://github.com/synthetic-sciences/openscience
  stars: 3238
  language: TypeScript
  license: Apache-2.0
  createdAt: 2026-07-03
  pushedAt: 2026-08-15
  latestRelease:
    tag: v2.0.27
    date: 2026-08-15
  homepage: https://openscience.sh
  snapshotAt: 2026-08-15
sources:
  - label: "synthetic-sciences/openscience"
    url: "https://github.com/synthetic-sciences/openscience"
    publisher: "GitHub"
    published: 2026-07-03
  - label: "OpenScience documentation"
    url: "https://openscience.sh/docs"
    publisher: "Synthetic Sciences"
    published: 2026-08-15
reviewed: false
---

"Co-scientist" has been a demo category for two years: an agent that reads papers and proposes hypotheses, with the running of actual experiments left as an exercise. OpenScience is an Apache-2.0 attempt at the whole loop, and the part that makes it worth examining is the tooling inventory rather than the pitch.

## What it is

A workbench that opens in your browser with a file tree, an editor, a terminal, session history, and inline rendering for molecules, structures, genomes and plots. You give it a goal; it reviews the literature, forms a hypothesis, writes and runs code, executes experiments on real compute, queries scientific databases and writes up the result.

It is model-agnostic — Anthropic, OpenAI, Google and dozens of other providers, using your own keys — and needs no account.

## Why it showed up now

v2.0.27 shipped on the day of the snapshot, six weeks after the repository appeared. The version cadence says this is being pushed hard; the 14 open issues say not many people have taken it apart yet.

## How it actually works

One adaptive research agent faces the user and handles the task end to end, loading domain skills when they are useful and delegating bounded Explore, Execute or Review work internally. Two effort levels, Normal and Ultra, control how widely it investigates, and plan mode stays read-only — a small design detail that matters when the alternative is an agent that starts running experiments while you are still thinking.

The substance is in what it can reach. There are 295 bundled skills spanning training (DeepSpeed, PEFT, TRL), evaluation, dataset work, molecular and clinical biology, cheminformatics, papers and LaTeX, figures, and cloud compute through Modal and Tinker. Around thirty scientific databases are exposed as tools the agent can query directly: UniProt, PDB, Ensembl, ChEMBL, PubChem, arXiv, OpenAlex, Semantic Scholar.

That inventory is the difference between an agent that can discuss a protein and one that can look it up, pull the structure, and run something against it. Extensibility covers LSP integration, MCP servers, plugins, custom agents and commands, and a TypeScript SDK.

## Try it

```bash
npm install -g @synsci/openscience
openscience
```

Or `npx synsci` for a single-step run. Platform binaries are attached to the releases page; Linux needs kernel 5.1 or later.

## Where it is weak

An agent that writes and runs code on real compute against live scientific databases is a machine for generating plausible results quickly, and plausibility is precisely the failure mode that matters in research. Nothing in the tooling substitutes for the review step, and the risk is that a fluent write-up makes a wrong experiment look finished.

Compute is your bill, and the Ultra effort level is where that becomes visible. Managed models from the project's own Atlas offering are an option, which is also where the open-source project meets a commercial one — worth understanding before a lab standardises on it.

Six weeks old, on a 2.x version line, with 295 skills that no one has independently audited. For real work, the honest posture is to treat every output as a draft to reproduce rather than a result to cite.
