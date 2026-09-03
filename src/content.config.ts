import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_SLUGS } from './data/site';

const source = z.object({
  label: z.string(),
  url: z.string().url(),
  publisher: z.string(),
  published: z.date(),
});

// Repository facts are a snapshot, never a build-time fetch: a static site that
// calls the GitHub API on every build burns rate limit and silently rewrites the
// numbers the prose argues about. `snapshotAt` is rendered next to the stars so
// the reader knows which day the figure belongs to.
const repo = z.object({
  owner: z.string(),
  name: z.string(),
  url: z.string().regex(/^https:\/\/github\.com\/[^/]+\/[^/]+$/, 'must be https://github.com/owner/name'),
  stars: z.number().int().nonnegative(),
  // Stars added over the discovery window. Absent on the first sighting of a
  // repo, when there is no earlier count to subtract.
  starsGained: z.number().int().optional(),
  language: z.string().nullable(),
  license: z.string(),
  createdAt: z.date(),
  pushedAt: z.date(),
  latestRelease: z.object({ tag: z.string(), date: z.date() }).optional(),
  homepage: z.string().url().optional(),
  snapshotAt: z.date(),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    publishDate: z.date(),
    category: z.enum(CATEGORY_SLUGS),
    tags: z.array(z.string()).default([]),
    // At most one post at a time: the homepage opens the first featured post it
    // finds in full, above the listing, and leaves it out of the cards below.
    featured: z.boolean().default(false),
    repo,
    // A post with no source to point at is the one thing the generator must
    // never publish, so the floor is enforced here rather than in review.
    sources: z.array(source).min(1),
    generated: z.object({ model: z.string(), at: z.date() }).optional(),
    reviewed: z.boolean().default(false),
    // A correction lives on the post it corrects, so there is one place to edit
    // and no way for the two to drift. /corrections aggregates them.
    corrections: z.array(z.object({ date: z.date(), text: z.string() })).default([]),
  }),
});

export const collections = { news };
