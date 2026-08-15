---
title: "GeoLibre runs 1,000+ GIS tools in the browser, offline"
description: "A cloud-native GIS built on Tauri, MapLibre and DuckDB-WASM that ships the WhiteboxTools toolbox to WebAssembly — desktop, mobile, browser and Jupyter."
publishDate: 2026-08-15
category: data
tags: ["GIS", "geospatial", "WebAssembly", "DuckDB"]
repo:
  owner: opengeos
  name: GeoLibre
  url: https://github.com/opengeos/GeoLibre
  stars: 6104
  language: TypeScript
  license: MIT
  createdAt: 2026-05-27
  pushedAt: 2026-08-15
  latestRelease:
    tag: v2.6.0
    date: 2026-08-14
  homepage: https://geolibre.app
  snapshotAt: 2026-08-15
sources:
  - label: "opengeos/GeoLibre"
    url: "https://github.com/opengeos/GeoLibre"
    publisher: "GitHub"
    published: 2026-05-27
  - label: "GeoLibre Web"
    url: "https://web.geolibre.app/"
    publisher: "opengeos"
    published: 2026-08-14
reviewed: false
---

Desktop GIS is one of the last categories where the serious tool is a large installer and the web version is a toy. GeoLibre is a straightforward attempt to end that: the same MIT-licensed workspace running as a native desktop app, native iOS and Android apps, a browser tab, and a widget inside a Jupyter notebook.

## What it is

A lightweight, cloud-native GIS for visualising, exploring and analysing geospatial data, built on Tauri v2, React, TypeScript, MapLibre GL JS, DuckDB-WASM Spatial and deck.gl. Data stays local. There is a Python package for driving the full app from a notebook and an R package for RStudio, Quarto, R Markdown and Shiny — which tells you who this is aimed at: people who already work in a scientific stack and want the map to live inside it.

## Why it showed up now

v2.6.0 landed the day before the snapshot, three months after the repository was created, with builds distributed through the Mac App Store, the iOS App Store and Google Play. Getting a GIS through three app-store reviews is a different kind of work from writing one, and it is the part that separates this from the many browser-map demos.

## How it actually works

The claim doing the heavy lifting is 1,000+ geoprocessing tools — terrain, hydrology, LiDAR, remote sensing, vector analysis — compiled to WebAssembly and running in the browser tab. No server, no install, and no data leaving the machine. The analysis half of GIS is exactly the half that normally forces a desktop install or a hosted backend, and moving it into WASM is what makes "runs everywhere" more than a rendering claim.

Underneath, DuckDB-WASM Spatial does the tabular and spatial querying, MapLibre draws the base map, and deck.gl handles the large overlay layers. Tauri v2 is what lets one codebase become desktop and mobile binaries instead of an Electron desktop app plus two rewrites.

The demos are specific rather than decorative: Manhattan building footprints extruded and coloured by construction era with a time slider running 1850 to 2025, and planetary basemaps from OpenPlanetaryMap and USGS Astrogeology for the Moon, Mars, Mercury, Venus, the Galilean moons, Titan, Pluto and Charon — with a per-project ellipsoid so distance, area and scale are computed for the right body.

## Try it

Nothing to install:

```
https://web.geolibre.app/
```

Desktop installers for Windows, macOS and Linux are on the project site, and the Python package embeds the same app in a notebook.

## Where it is weak

Browser WebAssembly means browser memory. A toolbox that assumes it can page through a large LiDAR tile set on a workstation behaves differently inside a tab, and the README does not publish limits for where that stops being pleasant — test with your own data volumes before planning a workflow around it.

Twenty-three issues are open, which is low, but the project is three months old and shipping fast across five distribution channels at once. Version 2.6.0 in that window means the surface is still moving.

There is also a scope question worth asking before adopting: 1,000+ tools ported to WASM is a large claim to verify, and the ones you actually need are a small subset. Check that subset specifically, in the browser, on your data.
