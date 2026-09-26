---
title: "God's Eye View puts live flights, ships and satellites on a 3D globe"
description: "A browser globe that merges public aircraft, ship, orbit, quake and camera feeds. It runs without keys, but the 3D city view needs one."
publishDate: 2026-09-17
category: apps
tags: ["geospatial", "OSINT", "self-hosted", "CesiumJS"]
repo:
  owner: bilawalsidhu
  name: gods-eye-view
  url: https://github.com/bilawalsidhu/gods-eye-view
  stars: 43234
  starsGained: 15709
  language: JavaScript
  license: "MIT (code only)"
  createdAt: 2026-06-22
  pushedAt: 2026-09-26
  latestRelease:
    tag: v0.1.1
    date: 2026-09-01
  homepage: https://maptheworld.ai/
  snapshotAt: 2026-09-26
sources:
  - label: "bilawalsidhu/gods-eye-view"
    url: "https://github.com/bilawalsidhu/gods-eye-view"
    publisher: "GitHub"
    published: 2026-06-22
  - label: "God's Eye View: a spy satellite in the browser goes open source"
    url: "https://firmatic.nl/en/blog/gods-eye-view-open-source/"
    publisher: "Firmatic"
    published: 2026-08-26
  - label: "feat: get OpenStreetMap data from planet dumps not Overpass (issue 648)"
    url: "https://github.com/bilawalsidhu/gods-eye-view/issues/648"
    publisher: "GitHub"
    published: 2026-09-17
reviewed: false
---

Flight transponders, ship beacons, satellite orbits and earthquake feeds are all public, and each already has its own website. God's Eye View, from former Google Maps product manager Bilawal Sidhu, draws them on one CesiumJS globe styled like a surveillance console, and the videos of it drew millions of views before the code went public.

## What it is

A JavaScript app that runs a local server on your machine and a 3D globe in your browser. Layers include live aircraft, AIS ship positions, satellites from CelesTrak, USGS earthquakes, NASA fire detections, street traffic, public CCTV cameras, launches and radio. Optional voice control goes through OpenAI's realtime API. Each layer is a separate module under `src/layers/`, and the server side lives in `server/providers/`, one file or folder per data source.

## Why it showed up now

43,234 stars on September 26, 15,709 of them added in the discovery window. The repository dates from June 22, but the public release came in late August, with v0.1.0 on August 31 and v0.1.1 on September 1. Development has not slowed: the most recent 30 open items in the tracker are almost all pull requests filed between September 23 and 26, adding weather radar, transit lines and new camera providers.

## How it actually works

The README says you can start without API keys, and the code bears that out with caveats. `.env.example` spells out the fallback: with no Google Maps key and no Cesium ion token, the globe loads flat Esri World Imagery, not the photorealistic 3D cities in the demo videos. Ships need an AISStream key, the NASA fire layer shows "KEY REQUIRED" without a FIRMS key, and voice needs an OpenAI key. The Google and Cesium keys are injected into the browser bundle by design, so the file tells you to restrict them rather than hide them.

This keyless path is new. Firmatic, a Dutch web firm that ran the code on August 26, reported that without a Google key "the planet stays black" and that ten of thirteen layers worked keyless. The v0.1.0 release five days later is titled around "keyless boot".

The README also says traffic is "simulated along real roads", and that is accurate. `src/layers/traffic/model.js` takes road polylines, thins them to a waypoint budget and animates dots along them. `server/providers/traffic.js` proxies TomTom flow tiles when a key is set, only to tune dot density and speed, and caps upstream calls at 6,000 a day so the free monthly allowance lasts the month. Without a TomTom key the endpoint returns an error on purpose and the layer stays pure simulation.

## Try it

```bash
git clone https://github.com/bilawalsidhu/gods-eye-view.git
cd gods-eye-view
npm ci
npm run doctor
npm run dev
```

It needs Node 24.14 or later, or Node 26, and opens on `http://localhost:4173`. A one-click install through the Pinokio launcher is the other supported path.

## Where it is weak

Its data habits have already cost it goodwill. On September 17 an OpenStreetMap Overpass operator opened issue 648 saying the app had used about 20,000 CPU seconds in a day against a fair share of roughly 300, that a user-agent change had been made after an earlier block, and that it was blocked again. `src/layers/traffic/ingestion.js` on main still fetches roads from Overpass. Pull request 742, which moves road data to OpenFreeMap tiles, was still open on September 26.

Issue 751 shows a smaller gap: satellites numbered above 99999 are written with a letter prefix in the old two-line orbit format, the catalog code converts them to `NaN`, and all but one would be dropped. Today they are simply absent, because the CelesTrak request omits them, so new Starlink shells do not appear.

The license field on GitHub reads as unknown because `LICENSE` appends a data notice to MIT: the code is MIT, the bundled submarine cable data is non-commercial only, and Cesium's free plan is for personal use.

Compared with GeoLibre, covered here in August, this is a viewer, not an analysis tool: GeoLibre runs GIS operations on your own data, God's Eye View shows other people's feeds. Flightradar24 does the aircraft part with far better coverage. What this adds is everything in one scene you can run and modify yourself.
