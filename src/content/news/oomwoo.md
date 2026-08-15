---
title: "OOMWOO is a robot vacuum you print, wire and own"
description: "A LiDAR-mapping vacuum built from a Raspberry Pi, an ESP32 and 3D-printed parts, running ROS2 and Home Assistant with no cloud in the loop."
publishDate: 2026-08-15
category: hardware
tags: ["robotics", "ROS2", "Raspberry Pi", "Home Assistant"]
repo:
  owner: makerspet
  name: oomwoo
  url: https://github.com/makerspet/oomwoo
  stars: 8532
  language: Python
  license: Apache-2.0
  createdAt: 2026-06-10
  pushedAt: 2026-08-12
  snapshotAt: 2026-08-15
sources:
  - label: "makerspet/oomwoo"
    url: "https://github.com/makerspet/oomwoo"
    publisher: "GitHub"
    published: 2026-06-10
  - label: "oomwoo.com"
    url: "https://oomwoo.com/"
    publisher: "Maker's Pet"
    published: 2026-08-12
reviewed: false
---

A robot vacuum is a mobile computer with a camera-class sensor that maps the inside of your home and uploads the result to a company you did not choose. OOMWOO is the other version: an Apache-2.0 vacuum you build yourself from a Raspberry Pi, an ESP32, an affordable 2D LiDAR and 3D-printed parts, with no cloud required for normal operation.

## What it is

Open hardware, firmware and software for a home robot vacuum that maps and navigates autonomously using ROS2 and Nav2, integrates natively with Home Assistant for local control, and runs on a chassis you print and can modify. The stated goals are unusually disciplined for a DIY project: affordable, fully open, home-appliance quality rather than a throwaway build, and buildable from parts you source yourself with zero-to-hero instructions.

## Why it showed up now

The project is two months old, has 8,532 stars, and is being built in public across Discord, YouTube, Reddit and a newsletter — but it is not finished. The README says early build instructions arrive in autumn 2026, and the images in the repository are labelled reference designs showing approximately how the finished machine will look.

That gap between attention and availability is exactly why it is worth covering carefully rather than enthusiastically.

## How it actually works

The division of labour is the conventional and correct one for a hobby robot: an ESP32 with Arduino firmware handles the real-time motor and sensor work, and a Raspberry Pi runs ROS2 with Nav2 for SLAM and navigation using the 2D LiDAR. Home Assistant is the control surface, which means scheduling and automation come from the system you already run rather than from a vendor's app.

The consequential decision is the sensor: a 2D LiDAR is what makes autonomous mapping cheap enough for a build like this, and it is also what most budget commercial vacuums use, so the navigation ceiling is roughly comparable rather than a toy.

Everything local by default, with the README allowing optional extra functionality when connected to a cloud — the correct order for those two sentences, and the opposite of the products it competes with.

## Try it

There is nothing to install yet. The repository is the design and the community; the build instructions are the deliverable still to come. If you want to be ready, the parts list and reference design are the place to start reading.

## Where it is weak

There is no release, and the build instructions do not exist yet. Three open issues on 8,500 stars is not a sign of a smooth project — it is a sign that almost nobody has built one, because almost nobody can yet.

Hardware projects carry a failure mode software does not: parts availability. A build defined around specific LiDAR and motor modules ages when a supplier discontinues one, and the cost of your build depends on markets nobody in the project controls.

And "home appliance product quality" is a high bar for a printed chassis with a Pi taped to a battery. It is a good goal, stated honestly as a goal. Read the project as something to follow into autumn, not as a vacuum you can have this month.
