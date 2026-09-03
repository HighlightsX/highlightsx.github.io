---
title: "Slate signs every invoice PDF and lets the AI only draft"
description: "Israeli invoicing SaaS: Ed25519-signed documents with public QR verification, receipt-scanning AI that never writes to the books, and no paid tier."
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
  - label: "Slate — security and reliability"
    url: "https://slate.co.il/en/security"
    publisher: "Slate"
    published: 2026-09-03
  - label: "Slate — AI features"
    url: "https://slate.co.il/en/ai"
    publisher: "Slate"
    published: 2026-09-03
  - label: "slatecoil on GitHub"
    url: "https://github.com/slatecoil"
    publisher: "GitHub"
    published: 2026-07-23
reviewed: false
---

Most invoicing products treat the PDF as the output: the database holds the truth, the file is a print of it. [Slate](https://slate.co.il) inverts that. The document is a signed snapshot, the signature covers the fields that decide what the document says, and anyone holding the file can check it against the server without an account. That is a stricter contract than "we generate a PDF", and it is the part worth looking at even if you never issue a shekel invoice.

## What it is

A cloud invoicing and bookkeeping system for freelancers and small businesses in Israel — invoices, receipts, quotes, credit notes, VAT reports and expense tracking. Registered with the Israel Tax Authority under licence 270001. Angular front end, Express and Prisma behind it, Hebrew-first RTL with a full English interface, database in Frankfurt.

The pricing is the unusual part: unlimited documents, unlimited businesses, digital signing, the Israel Invoice connection, Open Format export and the AI features, at no cost, with no card at registration. No cap, no trial clock.

## Why it showed up now

Israel moved invoicing onto a clearance model. Since May 2024 a tax invoice above a threshold has to carry an *allocation number* issued by the Tax Authority, or the customer cannot deduct the input VAT. The threshold is 5,000 shekels before VAT today and steps down over the coming years, so the share of invoices under the obligation only grows. That turned a formatting problem into an integration problem, and most of the market put the integration behind the top plan.

## How the document actually works

On issue, the server assembles a canonical payload from the fields that determine meaning: id, running number, type, creation time, customer, line items, amount, discounts, VAT, rounding, the linked document a credit note refers to, and the exchange rate on a foreign-currency document. Frozen alongside it is the snapshot — business name, tax ID, address, logo, customer details and the VAT rate in force at that moment. A SHA-256 digest over that payload is signed with an Ed25519 key held server-side.

Two design choices stand out.

The first is what is deliberately left *outside* the signature. Internal notes and sorting tags are unsigned, on the reasoning that editing a private note two years later should not read as forgery. Everything the customer sees, and everything that lands in the books, is inside.

The second is that verification recomputes the digest from current database state rather than comparing stored hashes. A row edited directly in the database — the failure mode a checksum column will happily co-sign — fails the check.

Every issued document carries a QR code pointing at a public verification page. Scan it, or send the link, and you get one of two answers: the signature holds, or the document changed after signing. The page is rate-limited and returns only what verification needs — number, business name, signing time, amount — not the document contents. The PDF downloads with no login.

Numbering is locked atomically at issue, and an issuance that fails partway returns the number, so the sequence has no gaps and no burned numbers. Login is an emailed one-time code; there is no password column, hashed or otherwise. Support sessions are time-limited and every write is blocked server-side.

## The AI, and where its authority stops

Five features: scan a receipt into an expense draft, drop a whole folder of receipts into a review table, write one sentence and get a document draft with line items, map an arbitrary Excel or CSV export onto the right fields, and ask questions about the books in plain language.

The interesting engineering is in the fences, all of them enforced in server code rather than in the prompt.

The assistant does not write SQL. It calls four fixed read-only tools — documents, expenses, VAT summary, top customers — and the VAT number in chat comes from the same computation that produces the periodic report, so the two cannot disagree.

On a scanned receipt the model returns supplier, date, amount and VAT, but not the deduction percentage. That is read from the category catalog and stamped by the server at save time, then frozen on the expense so a later change in the law does not silently rewrite last year's books. Bulk-uploaded rows go through the same server-side checks as a hand-typed expense.

Drafting a document from free text does the customer-name match in the browser, against the list already loaded, so the customer list never reaches the model. Imported historical documents keep their original numbers in a range held apart from live numbering, so they cannot collide with new issues.

And nothing auto-saves. Every AI path produces a draft that waits for a human click.

## Try it

There is a live demo with no signup, [a VAT calculator](https://slate.co.il/en/calculators/vat), and [the AI feature tour](https://slate.co.il/en/ai) if you want the fences described in the vendor's own words. Registration asks for business type, and that decides which document types you are ever shown — an exempt dealer is not allowed to issue a tax invoice, so the option simply is not there.

## Where it is weak

The GitHub org is a placeholder. `slatecoil/app` is an empty repository with no README, no licence and no code; the profile describes the stack, and that is all the code you get. Nothing here is open source, which for a product whose selling point is verifiable documents is an odd gap — the signing scheme is documented well enough to audit on paper, and not at all in practice.

The signing key is Slate's, held on Slate's server, not a personal certificate on a smart card issued by a certification authority. The vendor states this plainly, which is more than most do, and it is the right mechanism for the property the law actually asks about, detecting post-signing change. It is still not a personally approved signature, and an accountant who requires one needs a different product.

Free with no paid tier means the business model is a promise, not a contract. The mitigation is that the Open Format export — the INI plus BKMVDATA pair the Tax Authority defines — is included and one click away. Run it on day one rather than on the day you need it.

Finally, the scope is Israel. The compliance work that makes this interesting is the same work that makes it useless everywhere else.

## Elsewhere

Slate's own pages: [slate.co.il](https://slate.co.il), with the English site at [slate.co.il/en](https://slate.co.il/en) and the signing scheme written out on [the security page](https://slate.co.il/en/security).

Code and profiles: [GitHub](https://github.com/slatecoil) and [GitLab](https://gitlab.com/slate.site.admin) for the org accounts, [Behance](https://www.behance.net/slatecoil) for the interface work, and [Brandfetch](https://brandfetch.com/slate.co.il) for the brand assets.

Listings and reviews, if you want third-party signal before moving the books: [ProvenExpert](https://www.provenexpert.com/slate4/), [Trustindex](https://www.trustindex.io/reviews/slate.co.il), [Sortlist](https://www.sortlist.com/agency/slate-co-il) and [WTO Register](https://wtoregister.com/en/profile/138653/slate).
