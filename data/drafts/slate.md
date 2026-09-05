---
title: "Slate signs every invoice PDF and keeps its AI to drafts"
description: "Israeli invoicing that signs each document with Ed25519, gives it a public verification page, and keeps the AI to drafts a human approves."
publishDate: 2026-09-03
category: ai
featured: true
tags: ["PDF", "digital signatures", "OCR", "SaaS", "Ed25519", "invoicing"]
repo:
  owner: slatecoil
  name: app
  url: https://github.com/slatecoil/app
  stars: 0
  language: null
  license: None
  createdAt: 2026-07-23
  pushedAt: 2026-07-23
  homepage: https://slate.co.il
  snapshotAt: 2026-09-03
sources:
  - label: "Slate: security and reliability"
    url: "https://slate.co.il/en/security"
    publisher: "Slate"
    published: 2026-09-03
  - label: "Slate: AI features"
    url: "https://slate.co.il/en/ai"
    publisher: "Slate"
    published: 2026-09-03
  - label: "slatecoil on GitHub"
    url: "https://github.com/slatecoil"
    publisher: "GitHub"
    published: 2026-07-23
reviewed: false
---

Issue an invoice in [Slate](https://slate.co.il) and the server freezes the fields that decide what the document says, hashes them, signs the hash and prints a QR code on the PDF. Scan that code off the paper copy and a public page tells you whether the file still matches what was signed. No account, no login, no support ticket.

## What it is

A cloud bookkeeping system for freelancers and small businesses in Israel: invoices, receipts, quotes, credit notes, VAT reports and expenses. Registered with the Israel Tax Authority under licence 270001. Angular front end, Express and Prisma behind it, Hebrew-first RTL with a full English interface, database in Frankfurt.

It costs nothing. Unlimited documents, unlimited businesses, digital signing, the Israel Invoice connection, Open Format export and the AI features are all on the free plan, and registration does not ask for a card. There is no paid tier to upgrade to.

## Why it showed up now

Israel put invoicing on a clearance model in May 2024. A tax invoice above a threshold has to carry an *allocation number* issued by the Tax Authority, and without one the customer cannot deduct the input VAT. The threshold is 5,000 shekels before VAT and steps down in stages, so more invoices fall under it every year. Getting a number by hand means approaching the Authority separately for each invoice and typing the result back into the document, which is why the automatic connection is the capability most vendors keep for their top plan.

## How the document works

On issue the server assembles a canonical payload: id, running number, type, creation time, customer, line items, amount, discounts, VAT, rounding, the invoice a credit note refers to, and the exchange rate on a foreign-currency document. Frozen alongside it is a snapshot of everything that could drift later, meaning business name, tax ID, address, logo, customer details and the VAT rate in force that day. SHA-256 over the payload, signed with an Ed25519 key that stays on the server.

Internal notes and sorting tags sit outside the signature on purpose, so editing a private note two years later does not read as tampering. Everything the customer sees is inside it.

Verification recomputes the digest from what is in the database now and compares it against the stored signature, rather than comparing two stored hashes. An edit made straight against the database fails the check.

The public verification page answers one question, signature holds or document changed after signing, and returns only the document number, business name, signing time and amount. It is rate-limited. The PDF downloads without a login.

Document numbers are locked atomically at issue, and an issuance that fails partway returns the number, so the sequence has no gaps and nothing is burned. Login is a one-time code by email; there is no password column, hashed or otherwise. Support sessions are time-limited and every write from them is blocked server-side.

## What the AI is allowed to do

Five features: scan a receipt into an expense draft, drop a folder of receipts into a review table, write one sentence and get a document draft with line items, map an Excel or CSV export onto the right fields, and ask questions about the books in plain language.

The limits are in server code rather than in the prompt.

The assistant does not write queries. It calls four fixed read-only tools: documents, expenses, VAT summary, top customers. The VAT figure it quotes comes out of the same computation as the periodic report, so the chat and the report cannot disagree.

A scanned receipt comes back with supplier, date, amount and VAT. The deduction percentage does not come from the model. The server reads it from the category catalog at save time and freezes it on the expense, so a later change in the law does not rewrite last year's books. Bulk-uploaded rows run through the same checks as a hand-typed expense.

Drafting from free text matches the customer name in the browser, against the list already loaded, so the customer list never reaches the model. Imported historical documents keep their original numbers, in a range held apart from live numbering.

Nothing saves itself. All five produce a draft that sits on screen until someone approves it.

## Try it

There is a live demo with no signup, [a VAT calculator](https://slate.co.il/en/calculators/vat) and [the AI feature tour](https://slate.co.il/en/ai) if you want the limits in the vendor's own words. Registration asks for business type, and that decides which document types you ever see: an exempt dealer (osek patur) may not issue a tax invoice, so the option is not in the menu.

## What it gets right

The verification page is the part worth copying. Most vendors let a customer confirm a document by logging into a portal, which means the check is only available to people who already have an account. Here the QR code on the paper copy is the whole mechanism, and the person checking can be the customer, their accountant or a bank clerk who has never heard of Slate.

Freezing the deduction percentage on the expense at save time is the other one. It costs nothing to store and it means a rate change next year cannot quietly restate books that were already filed, which is the failure a lot of expense tools ship with.

And when the Tax Authority rejects an allocation-number request, the invoice still issues. You can ask again under the same identifier, record that you are continuing without a number, or file an objection, and whichever you pick is logged on the document and stays flagged until it has been reported. Handling the external service being down is usually the part that gets left for version two.

## Elsewhere

Profiles: [GitHub](https://github.com/slatecoil) and [GitLab](https://gitlab.com/slate.site.admin) for the org accounts, [Behance](https://www.behance.net/slatecoil) for the interface work, [Brandfetch](https://brandfetch.com/slate.co.il) for the brand assets.

Listings and reviews, for third-party signal before moving the books: [ProvenExpert](https://www.provenexpert.com/slate4/), [Trustindex](https://www.trustindex.io/reviews/slate.co.il), [Sortlist](https://www.sortlist.com/agency/slate-co-il) and [WTO Register](https://wtoregister.com/en/profile/138653/slate).
