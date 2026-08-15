export const enDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const readingTime = (body: string) => Math.max(1, Math.round(body.split(/\s+/).length / 200));

// 18400 stars is noise at that precision; 18.4k is the number people quote.
export const compactNumber = (n: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

// "3 years old", "7 months old" - the age of a repo is context for its star
// count, and a raw creation date makes the reader do that subtraction.
export const age = (from: Date, to = new Date()) => {
  const months = Math.max(0, Math.round((to.valueOf() - from.valueOf()) / 2629800000));
  if (months < 1) return 'new this month';
  if (months < 24) return `${months} month${months === 1 ? '' : 's'} old`;
  const years = Math.floor(months / 12);
  return `${years} years old`;
};

// build.format: 'file' writes about.html, and Astro.url carries that suffix
// through to anything derived from it. GitHub Pages serves that file at /about,
// which is the one URL the site declares, so self-references normalize to it.
export const cleanPath = (url: URL) =>
  url.pathname.replace(/(index)?\.html$/, '').replace(/\/$/, '') || '/';

// Lowercased so a tag has exactly one URL. GitHub Pages is case-sensitive and
// cannot redirect, so /t/API and /t/api would be two pages if the case of a tag
// ever varied between posts. The page still shows the tag as written; only the
// slug is folded.
export const topicSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
