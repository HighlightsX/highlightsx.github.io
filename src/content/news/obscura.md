---
title: "Obscura is a headless browser in Rust, without Chromium"
description: "A V8-backed engine speaking the Chrome DevTools Protocol as a drop-in for headless Chrome under Puppeteer and Playwright, with native screenshots and PDFs."
publishDate: 2026-08-23
category: web
tags: ["Rust", "headless browser", "scraping", "automation"]
repo:
  owner: h4ckf0r0day
  name: obscura
  url: https://github.com/h4ckf0r0day/obscura
  stars: 21415
  language: Rust
  license: Apache-2.0
  createdAt: 2026-04-13
  pushedAt: 2026-08-15
  latestRelease:
    tag: v0.2.0
    date: 2026-08-08
  homepage: https://obscura.sh
  snapshotAt: 2026-08-15
sources:
  - label: "h4ckf0r0day/obscura"
    url: "https://github.com/h4ckf0r0day/obscura"
    publisher: "GitHub"
    published: 2026-04-13
  - label: "Release v0.2.0"
    url: "https://github.com/h4ckf0r0day/obscura/releases/latest"
    publisher: "GitHub"
    published: 2026-08-08
reviewed: false
---

Headless Chrome is how almost everything scrapes and automates the web, and it is a browser pretending to be a library — hundreds of megabytes, a process tree, and a memory profile that makes concurrency expensive. Obscura is an Apache-2.0 attempt at the same job from the other direction: a headless engine written in Rust that runs real JavaScript through V8.

## What it is

A browser engine, not a wrapper. It implements the Chrome DevTools Protocol and positions itself as a drop-in replacement for headless Chrome under Puppeteer and Playwright, so existing automation scripts point at it rather than being rewritten for it. As of v0.2.0 it renders natively — screenshots, live page screencasting and PDF export without Chromium in the picture.

## Why it showed up now

Four months old, 21,000 stars, v0.2.0 on August 8 and pushed the day of the snapshot. Native rendering is the change that makes the "no Chromium required" claim complete rather than aspirational.

## How it actually works

The interesting bet is protocol compatibility as the adoption path. CDP is the lingua franca of browser automation, so anything that speaks it inherits the entire Puppeteer and Playwright ecosystem for free. That reduces the project's problem from "convince people to rewrite their scrapers" to "be correct enough at the protocol boundary" — still hard, but a different kind of hard.

Rust plus V8 means the JavaScript is real while the surrounding engine is not a full Chromium build, which is where the lightness comes from. For agent workloads the practical consequence is concurrency: how many pages you can hold open per machine determines what a scraping or browsing agent costs to run.

## Try it

The engine is Apache-2.0 and the README's own framing is that the open-source version stays fully featured with no feature gating. Point an existing Puppeteer or Playwright script at it over CDP and compare against your current headless Chrome runs on the sites you actually target.

## Where it is weak

Read the README with your eyes open: a large part of it is proxy-vendor sponsorship, complete with affiliate discount codes for residential and mobile proxy networks, and one of them advertises "no KYC required". That tells you plainly which use case funds this project, and the `antidetect` topic on the repository says the same thing. Scraping behind rotating residential IPs to evade blocking is a legal and terms-of-service question wherever you operate, and the engine's stealth framing does not answer it for you.

There is also a hosted Obscura Cloud on a waitlist, so the usual open-core dynamic applies — the promise is no feature gating, and it is a promise, not a licence term.

Technically, v0.2.0 with 71 open issues is early for something claiming drop-in parity with a browser as sprawling as Chromium. Compatibility with the protocol is not compatibility with every site's rendering quirks; test against your real targets before migrating anything that matters.
