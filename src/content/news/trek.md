---
title: "TREK plans a trip on your own server, mostly without keys"
description: "A self-hosted AGPL travel planner: drag-and-drop day plans, maps with no token, split expenses, packing lists and booking import from EML, PDF and PKPass."
publishDate: 2026-09-14
category: apps
tags: ["self-hosted", "maps", "travel", "TypeScript"]
repo:
  owner: liketrek
  name: TREK
  url: https://github.com/liketrek/TREK
  stars: 13616
  starsGained: 1337
  language: TypeScript
  license: AGPL-3.0
  createdAt: 2026-03-19
  pushedAt: 2026-09-11
  latestRelease:
    tag: v4.2.1
    date: 2026-09-06
  homepage: https://demo.liketrek.com
  snapshotAt: 2026-09-12
sources:
  - label: "liketrek/TREK"
    url: "https://github.com/liketrek/TREK"
    publisher: "GitHub"
    published: 2026-03-19
reviewed: false
---

Trip planning software is a graveyard of abandoned side projects, because the feature list is endless and the fun part ends after the map. TREK is at v4.2.1 with 13,616 stars, and the reason to look at it is how much of the boring half it finished.

## What it is

A self-hosted, real-time collaborative travel planner: day plans, maps, bookings, expense splitting, packing lists, documents and a journal. AGPL-3.0, with a live demo the project runs itself.

## Why it showed up now

13,616 stars, 1,337 added in the discovery window, created March 19, pushed September 11, v4.2.1 on September 6. Four major versions in under six months, and 22 open issues, which for a project with this surface area is a striking number.

## How it actually works

Most of the feature set is an addon an administrator switches on or off. Lists, Costs, Documents, Collab, Vacay and Atlas ship on; Journey, Collections, MCP, AI parsing and AirTrail ship off. Shipping the AI features off by default in 2026 is a decision worth noticing.

The planning side is drag and drop with undo: places move between days and reorder inside a day, notes and bookings drag the same way, and a map marker drops onto a day. Move the trip dates and the days re-date themselves, either dragging the bookings along or re-anchoring them.

The map layer is the part that respects your wallet. Leaflet, Mapbox GL or MapLibre GL against OpenFreeMap with no token. Place search uses Google Places when a key is set, and OpenStreetMap when it is not. Place enrichment pulls descriptions, hours and photo candidates from OpenStreetMap, Wikipedia, Wikidata and Wikimedia Commons. Routes auto-sort a day with nearest neighbour then 2-opt, keeping locked stops and hotel anchors in place, over OSRM. Public transport itineraries come from Transitous, weather from Open-Meteo.

The bookings side is where the unglamorous work went. Sixteen reservation types with status, confirmation code, travellers and attachments. Flights with per-leg times and endpoint timezones resolved against 4,045 bundled airports, so local times are right without a key. Confirmation emails import through KItinerary from EML, PDF, PKPass, HTML and TXT.

Costs are split in integer cents with custom shares, several payers per expense, settle-up suggestions and a settlement log. Currency rates are frozen at entry, from Frankfurter, no key. Integer cents and a frozen rate are the two details that separate a money feature from a money bug.

## Try it

The demo at demo.liketrek.com is the fastest look. Self-hosting is Docker, and the image bundles the `kitinerary-extractor` binary that booking import needs.

## Where it is weak

"No API keys" is true of the defaults and not of the good path. Google Places gives you photos, ratings and opening hours; Mapbox gives you 3D buildings and terrain. Run it fully keyless and you get the honest OpenStreetMap version of both.

The feature list is enormous, and enormous is a maintenance claim as much as a capability one. Addon switches mean a lot of code paths that a small number of self-hosters exercise. POI lookup leans on Overpass, routing on OSRM, transit on Transitous, rates on Frankfurter: free public infrastructure, none of it yours, all of it a dependency your trip planning stops working without.

AGPL-3.0 matters here more than usual, because the natural next step for something this polished is hosting it for other people. Read the licence before that idea gets any further.

Real-time collaboration self-hosted means a database, file uploads, backups and an upgrade path across four major versions in six months. The planning is drag and drop; the operations are not.
