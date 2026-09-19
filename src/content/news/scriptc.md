---
title: "scriptc compiles TypeScript to a native binary, no Node"
description: "Vercel Labs' experimental compiler emits C, LLVM IR, objects, executables and WebAssembly. Code it cannot type statically comes back as a diagnostic."
publishDate: 2026-09-13
category: languages
tags: ["TypeScript", "compilers", "WebAssembly", "LLVM"]
repo:
  owner: vercel-labs
  name: scriptc
  url: https://github.com/vercel-labs/scriptc
  stars: 4817
  starsGained: 1286
  language: TypeScript
  license: Apache-2.0
  createdAt: 2026-07-22
  pushedAt: 2026-09-11
  latestRelease:
    tag: v0.0.38
    date: 2026-09-05
  homepage: https://scriptc.dev
  snapshotAt: 2026-09-12
sources:
  - label: "vercel-labs/scriptc"
    url: "https://github.com/vercel-labs/scriptc"
    publisher: "GitHub"
    published: 2026-07-22
reviewed: false
---

Compiling TypeScript to a native binary has been attempted often enough to be a genre. The attempts mostly die on the same rock: JavaScript's dynamism means either you ship an engine, or you refuse to compile real code. scriptc picks the second option and says so out loud.

## What it is

A compiler that takes TypeScript and JavaScript through a typed intermediate representation to readable C, textual LLVM IR, assembly, object files, native executables and WebAssembly modules over WASI Preview 1. Parsing and type checking are done by the TypeScript compiler itself, so the type system is not a reimplementation.

## Why it showed up now

4,817 stars, 1,286 of them in the discovery window. Created July 22, pushed September 11, v0.0.38 on September 5. Thirty-eight releases in seven weeks is the cadence of something being worked on daily.

## How it actually works

Static builds link a small native runtime and contain no Node and no JavaScript engine. The trade is stated as a rule: code that cannot compile statically is reported as a diagnostic. If you want npm packages and `any`-typed code, `--dynamic` embeds [quickjs-ng](https://github.com/quickjs-ng/quickjs) explicitly, and you have chosen to ship an engine rather than had one smuggled in.

The emit ladder is the useful part of the design. `--emit=ir`, `--emit=c` and `--emit=llvm` need only Node, so you can read the C or the LLVM IR the compiler produced without a toolchain installed at all:

```console
$ scriptc build hello.ts --emit=c
$ ls .scriptc/
hello.c
```

`--emit=asm` and `--emit=obj` use an optional platform helper that ships with scriptc and needs no compiler, archiver, linker or SDK. Ordinary executables need a platform linker driver, selectable through `SCRIPTC_LINKER`. On macOS 15+ arm64 the bundled helper and a precompiled runtime pack do the work, and clang appears only as the linker driver.

[Nub](/nub) went after Bun's ergonomics without leaving Node. scriptc goes the other way entirely and leaves the runtime behind.

## Try it

```console
$ npm install -g scriptc
$ scriptc run hello.ts
$ scriptc build hello.ts -o hello
```

Node 24 or newer is required for the compiler. The executables it produces do not require Node.

## Where it is weak

v0.0.38, and the README opens by calling itself experimental. Treat the output as something to inspect, not to deploy.

The install section reads like a compatibility matrix because it is one: what you need depends on which emit target you pick, which host you are on, and whether you asked for sanitizers or explicit C builds. The best path, bundled helper plus precompiled runtime, is specified as macOS 15+ arm64 with an `arm64-apple-macosx14.0.0` deployment target. Linux and Windows are supported, but the README's precision drops noticeably when it leaves Apple silicon.

"No JavaScript engine" holds only for the statically compilable subset, and that subset excludes npm packages. Most real TypeScript is npm packages. The honest reading is that this compiles your code, not your dependency tree.

79 open issues, external object consumption marked experimental, and sanitized assembly emission rejected outright until the helper's AddressSanitizer pipeline catches up with the executable path.
