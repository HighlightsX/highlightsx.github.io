import { readdirSync, renameSync, rmSync, readFileSync, writeFileSync } from 'node:fs';

// @astrojs/sitemap always writes `sitemap-index.xml` plus numbered chunks, and
// Search Console reports an index it was handed as "Couldn't fetch" long after
// every URL in it answers 200. This site is ~140 URLs, three orders of
// magnitude under the 50k-per-file limit, so the index buys nothing. The chunks
// are merged into one dist/sitemap.xml - the name Search Console pre-fills -
// and the generated files are deleted.
const dist = new URL('../dist/', import.meta.url);
const files = readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f)).sort();

if (files.length === 0) {
  console.error('flatten-sitemap: no sitemap-N.xml in dist/, did the build run?');
  process.exit(1);
}

if (files.length === 1) {
  renameSync(new URL(files[0], dist), new URL('sitemap.xml', dist));
} else {
  // More than 50k URLs would need the index back rather than one merged file.
  const urls = files
    .map((f) => readFileSync(new URL(f, dist), 'utf8'))
    .flatMap((xml) => xml.match(/<url>[\s\S]*?<\/url>/g) ?? []);
  const head = readFileSync(new URL(files[0], dist), 'utf8').split('<url>')[0];
  writeFileSync(new URL('sitemap.xml', dist), `${head}${urls.join('')}</urlset>`);
  files.forEach((f) => rmSync(new URL(f, dist)));
}

rmSync(new URL('sitemap-index.xml', dist), { force: true });
console.log(`flatten-sitemap: dist/sitemap.xml written from ${files.length} file(s)`);
