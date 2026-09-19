---
title: "CubeSandbox boots an agent sandbox in under 60ms"
description: "Tencent Cloud's RustVMM and KVM sandbox service is E2B SDK compatible, adds cross-node pause and resume, and claims under 5MB of memory overhead per sandbox."
publishDate: 2026-09-14
category: infra
tags: ["sandboxes", "agents", "Go", "self-hosted"]
repo:
  owner: TencentCloud
  name: CubeSandbox
  url: https://github.com/TencentCloud/CubeSandbox
  stars: 12171
  starsGained: 1045
  language: Go
  license: Other (NOASSERTION)
  createdAt: 2026-04-10
  pushedAt: 2026-09-12
  latestRelease:
    tag: v0.7.1
    date: 2026-09-11
  homepage: https://cubesandbox.com
  snapshotAt: 2026-09-12
sources:
  - label: "TencentCloud/CubeSandbox"
    url: "https://github.com/TencentCloud/CubeSandbox"
    publisher: "GitHub"
    published: 2026-04-10
reviewed: false
---

Every agent that runs code needs somewhere to run it that is not your machine. The hosted answer is E2B. CubeSandbox is Tencent Cloud's answer, it speaks E2B's SDK, and you run it yourself.

## What it is

A sandbox service built on RustVMM and KVM: hardware-isolated microVMs, single node or scaled to a cluster, created in under 60ms with less than 5MB of memory overhead each. The E2B SDK compatibility is the strategic part. Code written against the hosted incumbent points at your own cluster instead.

## Why it showed up now

12,171 stars, 1,045 in the discovery window, created April 10, pushed September 12, with v0.7.1 tagged the day before. The release notes read as a product roadmap being executed in public: snapshots and copy-on-write clone in 0.3, credential vault and dashboard in 0.4, AutoPause and Terraform deploy in 0.5, Kubernetes deploy and a pluggable volume framework in 0.6.

## How it actually works

The 0.7 headline is cross-node pause and resume. With an S3 backend, a sandbox suspended on one node resumes on another, and new sandboxes can be created from snapshots. It is marked preview, but it is the feature that turns a sandbox fleet into something schedulable rather than pinned.

Underneath that sits CubeCoW, a copy-on-write snapshot engine introduced in 0.3, which is what makes event-level snapshots, instant clones and rollback to any saved state affordable at hundred-millisecond granularity.

AutoPause suspends idle sandboxes and wakes them on the next request, which is the difference between paying for agent sessions and paying for agent wall-clock. The credential vault keeps API keys outside the sandbox entirely: the agent calls external services as usual, and the keys never enter the box it could leak them from. For anyone who has read the injection literature, that is the single most useful item on the list.

0.7 also splits the control plane from operations, moving node management into CubeOps with multi-replica deployment and its own CLI.

[QM](/qm) gives each employee a sandbox inside Slack. CubeSandbox is the layer such a product sits on if you do not want to rent it.

## Try it

Deployment is Kubernetes or Terraform, with ARM64 supported natively since 0.5. The quick start lives at cubesandbox.com, and the E2B-compatible SDK means existing client code mostly does not change.

## Where it is weak

GitHub's licence detector returns NOASSERTION, which means no standard licence file it recognises. For infrastructure you intend to run in production, that is the first thing to resolve, not the last: read the actual terms in the repository before you plan a deployment around it.

133 open issues, and the README is largely a wall of release announcements rather than an architecture document. Every performance figure quoted here is the vendor's own, measured on unstated hardware.

KVM means bare-metal Linux or nested virtualisation, so this is not something you sprinkle onto an existing managed Kubernetes cluster without checking what the nodes actually are. Cross-node resume needs an S3 backend and is labelled preview.

The open-source project and a hosted product share a domain and a roadmap. That arrangement usually works out fine until the features you depend on stop landing on the side you self-host.
