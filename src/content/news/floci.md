---
title: "Floci emulates AWS locally with no account and no gates"
description: "A free local AWS emulator on port 4566 that your existing SDK, CLI, Terraform and Testcontainers setup can point at unchanged. No account, no paid tiers."
publishDate: 2026-08-22
category: infra
tags: ["AWS", "testing", "Docker", "Java"]
repo:
  owner: floci-io
  name: floci
  url: https://github.com/floci-io/floci
  stars: 20116
  language: Java
  license: MIT
  createdAt: 2026-02-18
  pushedAt: 2026-08-15
  latestRelease:
    tag: "1.6.0"
    date: 2026-08-06
  homepage: https://floci.io/floci/
  snapshotAt: 2026-08-15
sources:
  - label: "floci-io/floci"
    url: "https://github.com/floci-io/floci"
    publisher: "GitHub"
    published: 2026-02-18
  - label: "Release 1.6.0"
    url: "https://github.com/floci-io/floci/releases/latest"
    publisher: "GitHub"
    published: 2026-08-06
reviewed: false
---

Local AWS emulation is a category with one obvious incumbent and a familiar complaint: the useful services keep moving behind a paid tier. Floci is an MIT-licensed emulator whose entire positioning is the absence of that — no account, no auth token, no feature gates, just `docker compose up`.

## What it is

AWS-shaped services on your own machine for development, testing and CI, listening on `http://localhost:4566` — the same port the incumbent uses, which is a deliberate compatibility choice rather than a coincidence. Point your AWS SDK, CLI, Terraform, CDK, OpenTofu or test suite at it and keep the workflow you already have. S3, DynamoDB, SQS, ECS, EC2 and more, with Testcontainers integration for test suites.

It is named after floccus, the cloud formation that looks like popcorn.

## Why it showed up now

Six months old, 1.6.0 in August, pushed the day of the snapshot, 20,000 stars. The interest is not mysterious: this is the alternative-to-the-paid-tier project for a tool that sits in a lot of CI pipelines, arriving with a migration guide as a first-class document.

## How it actually works

The design decision that makes or breaks an emulator is API surface fidelity, and Floci's answer is to be a drop-in at the protocol level rather than a library you code against. Your credentials and endpoint come from environment variables:

```bash
floci start
eval $(floci env)
```

After that, ordinary tooling works unchanged:

```bash
aws s3 mb s3://my-bucket
aws dynamodb create-table --table-name demo-table \
  --attribute-definitions AttributeName=pk,AttributeType=S \
  --key-schema AttributeName=pk,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

Written in Java, distributed as a container plus a separate CLI repository, with SDK notes and Testcontainers wiring in the docs.

## Try it

```bash
floci start
```

Or `docker compose up` if you would rather not install the CLI first.

## Where it is weak

Every emulator is an approximation, and the approximation is invisible until it is expensive. IAM semantics, eventual consistency, throttling behaviour and error shapes are where local AWS and real AWS diverge, and a test suite that passes against an emulator has proven something narrower than it appears to. That is true of the whole category, not just this project.

191 open issues is the highest count on anything covered here, which for a six-month-old emulator of a service surface this large is arguably just honesty about scope. Check the specific services you depend on rather than the headline list.

The free-forever positioning is the reason to adopt it and the thing to watch: the incumbent it is reacting to also started free, and nothing in a licence prevents a future project from adding a hosted tier around the open core.
