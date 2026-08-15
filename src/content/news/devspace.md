---
title: "DevSpace gives ChatGPT a tunnel to your actual machine"
description: "A self-hosted MCP server that lets a web chat read, edit, search and run code in your real local projects — no upload, and a password only you hold."
publishDate: 2026-08-26
category: devtools
tags: ["MCP", "self-hosted", "ChatGPT", "TypeScript"]
repo:
  owner: Waishnav
  name: devspace
  url: https://github.com/Waishnav/devspace
  stars: 3701
  language: TypeScript
  license: MIT
  createdAt: 2026-06-14
  pushedAt: 2026-08-13
  latestRelease:
    tag: v1.0.7
    date: 2026-08-11
  snapshotAt: 2026-08-15
sources:
  - label: "Waishnav/devspace"
    url: "https://github.com/Waishnav/devspace"
    publisher: "GitHub"
    published: 2026-06-14
  - label: "Release v1.0.7"
    url: "https://github.com/Waishnav/devspace/releases/latest"
    publisher: "GitHub"
    published: 2026-08-11
reviewed: false
---

The web chat interface and the coding agent are separate products with separate subscriptions, and the difference between them is mostly that one can touch your files. DevSpace is an MIT-licensed MCP server that closes that gap from the user's side: it gives ChatGPT — or Claude on the web — a connection to your real machine.

## What it is

A self-hosted server you run locally, exposed through a tunnel you control, protected by a password only you have. Once connected, the chat can read, edit, search and run code in your actual projects, using your files, your tools and your terminal. Nothing is uploaded to a third party in the sense of a sync service; the model reaches your machine instead of a copy of it.

## Why it showed up now

v1.0.7 on August 11, two months after the first commit. The pitch — "turn ChatGPT into Codex, or Claude web into Claude Code" — is a direct response to people paying for a chat plan and wanting the agent behaviour that ships in a different product.

## How it actually works

MCP is the mechanism, and this is one of the cleaner illustrations of what the protocol is for: the model host does not need to know anything about your setup beyond the endpoint and the credential. The server is the part that knows your filesystem, and it stays on your hardware.

```bash
npm install -g @waishnav/devspace
```

Node 22.19 or later (and below 27). Then initialise and connect, and approve the tunnel with your password.

The design consequence worth noting is where trust sits. Unlike an editor extension, the privileged component is a server you started and can stop, so revoking access is closing a process rather than uninstalling something.

## Where it is weak

You are exposing a shell and a filesystem to a chat interface over a public tunnel. A password gates the connection, but everything downstream of that gate is your machine, and the request to run a command arrives from a model that has been reading whatever content you pasted or it browsed. Prompt injection turns into command execution here in a way it does not in a sandboxed cloud agent. Run it against a scratch directory before you point it at anything you care about, and stop the server when you are done.

There is also a terms-of-service question worth checking on the chat side. Driving a web plan as a coding agent through a self-hosted bridge is exactly the kind of use that provider policies address, and the consequence would land on your account.

58 open issues on a two-month-old project, and the README carries a sponsor block for a service that inserts a paid footer into your coding agent's sessions in exchange for cash back — worth knowing about the project's funding model, and worth reading before you enable anything optional it ships.
