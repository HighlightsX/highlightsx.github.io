---
title: "watermarks-remover strips AI marks, and says which ones it can't"
description: "A Python service and agent skill that scrubs invisible Unicode and C2PA metadata reliably, and attacks statistical text watermarks only by rewriting."
publishDate: 2026-09-20
category: security
tags: ["agent skills", "Python", "Claude Code", "self-hosted", "plugins"]
repo:
  owner: guillaumemeyer
  name: watermarks-remover
  url: https://github.com/guillaumemeyer/watermarks-remover
  stars: 22848
  starsGained: 1091
  language: Python
  license: MIT
  createdAt: 2026-08-11
  pushedAt: 2026-09-26
  latestRelease:
    tag: v0.7.0
    date: 2026-09-03
  homepage: https://github.com/guillaumemeyer/watermarks-remover
  snapshotAt: 2026-09-26
sources:
  - label: "guillaumemeyer/watermarks-remover"
    url: "https://github.com/guillaumemeyer/watermarks-remover"
    publisher: "GitHub"
    published: 2026-08-11
  - label: "AI 'watermark removers' flood the web. Almost none can prove they work."
    url: "https://www.bleepingcomputer.com/news/security/ai-watermark-removers-flood-the-web-almost-none-can-prove-they-work/"
    publisher: "BleepingComputer"
    published: 2026-08-13
reviewed: false
---

Anthropic said in August that Claude would start marking its text invisibly. This repository was created on August 11, the same week, and it is the rare tool in its category whose README spends a section explaining why the hard part mostly doesn't work.

## What it is

An MIT-licensed Python service plus two agent skills that remove AI provenance marks from text and files. It handles three kinds of mark: invisible Unicode characters hidden in text (the README calls this Layer A), statistical watermarks spread across word choices (Layer B), and signed C2PA credentials or generator metadata attached to images, PDFs and Office files. It targets Claude, Gemini and SynthID-Text, OpenAI, and open-weight models. The skill `remove-ai-marks` contains no code; it sends files to the local service over HTTP. A second skill, `clean-user-facing-text`, is self-contained and handles text only.

## Why it showed up now

22,848 stars on September 26, 1,091 of them added in the discovery window. BleepingComputer counted about 4,500 on August 13, two days after creation, in a piece on the wave of watermark removers that followed Anthropic's announcement. Its point was that no public detector exists, so none of these tools can prove they work. v0.7.0 shipped September 3 and the repository was pushed the day of the snapshot.

## How it actually works

The README's claim that the service is stdlib Python holds for the core. `service/scripts/server.py` is built on `http.server` and `ThreadingHTTPServer` with no third-party imports. Metadata inspection shells out to `c2patool` and `exiftool` only if they are on the path, and the pixel-level removers are optional add-ons that pull in torch.

Layer A is a fixed, carefully chosen list. `service/scripts/text_unicode.py` strips 59 invisible codepoints: zero-width spaces, soft hyphens, bidirectional overrides, variation selectors. It also folds look-alike spaces into ordinary ones. It keeps zero-width joiners when they sit inside an emoji sequence or a Persian or Devanagari word, and keeps direction marks in mixed right-to-left text. A cruder cleaner would silently break those.

Layer B is where the name oversells. Anthropic's own help page, quoted in the repo's `how-claude-marks.md`, describes a mark that lives in which words the model picks. The only remedy for that is rewriting. `service/scripts/rewrite_text.py` defaults to a backend called `print-prompt`, which prints a rewrite prompt and changes nothing. Actual rewriting needs an Ollama model or a paid API. The README says a rewrite with a weaker model degrades the text, and that no tool can certify a vendor's detector will fail. v0.7.0 added a `stealer/` module that estimates which tokens a SynthID-style watermark boosts by querying the model at scale. Its own README says it does not recover the key.

The Claude Code hook is the deterministic part. `service/scripts/hook_written_file.py` runs after every file write. In `clean` mode it cleans into a temp file and swaps only if the bytes differ, as the README says, so clean files keep their timestamps.

## Try it

```bash
python3 install_skill.py --skill remove-ai-marks --target claude-code
python3 service/scripts/inspect_file.py draft.md
python3 service/scripts/clean_file.py draft.md -o draft.cleaned.md
```

In Claude Code, `/plugin marketplace add guillaumemeyer/watermarks-remover` installs both skills. The service listens on `127.0.0.1:8765` by default.

## Where it is weak

Issue #356 reports the skill failing in claude.ai's sandbox: the service is unreachable there, and the plugin package is missing the `service/` and `references/` folders that SKILL.md points to. Issue #338, opened September 12, found that eight of the nine Makefile script targets fail, including the `make smoke` checks the README advertises, because the scripts were never committed. A fix is open as a pull request. Issue #369 says `--no-backup` never landed, so in-place cleaning always leaves a `.bak` copy.

Compared with running ExifTool or c2patool yourself, the metadata path mostly adds routing and a safety net for formats those tools don't cover. The text path adds a Unicode list that is better than most. Against a statistical watermark, it offers a paraphrase with a quality cost, and no way to measure whether that worked until Anthropic publishes a detector.
