(() => {
  const KEY = 'gh-a11y';
  const root = document.documentElement;

  // theme: the class is set by an inline script in the head so the page never
  // paints the wrong one first. This only wires the button.
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    const sync = () => themeBtn.setAttribute('aria-pressed', String(root.classList.contains('light')));
    themeBtn.addEventListener('click', () => {
      localStorage.setItem('gh-theme', root.classList.toggle('light') ? 'light' : 'dark');
      sync();
    });
    sync();
  }

  const state = Object.assign(
    { fontStep: 0, contrast: false, links: false, motion: false, spacing: false },
    JSON.parse(localStorage.getItem(KEY) || '{}'),
  );

  function apply() {
    root.style.fontSize = state.fontStep ? `${90 + state.fontStep * 12.5}%` : '';
    root.classList.toggle('a11y-contrast', state.contrast);
    root.classList.toggle('a11y-links', state.links);
    root.classList.toggle('a11y-no-motion', state.motion);
    root.classList.toggle('a11y-spacing', state.spacing);
    for (const el of document.querySelectorAll('[data-a11y]')) {
      const k = el.dataset.a11y;
      if (k in state && typeof state[k] === 'boolean') el.setAttribute('aria-pressed', state[k]);
    }
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-a11y]');
    if (btn) {
      const key = btn.dataset.a11y;
      if (key === 'bigger') state.fontStep = Math.min(3, state.fontStep + 1);
      else if (key === 'smaller') state.fontStep = Math.max(-1, state.fontStep - 1);
      else if (key === 'reset')
        Object.assign(state, { fontStep: 0, contrast: false, links: false, motion: false, spacing: false });
      else state[key] = !state[key];
      apply();
      return;
    }

    const panelBtn = e.target.closest('#a11y-btn');
    const panel = document.getElementById('a11y-panel');
    if (panelBtn) {
      const open = panel.hasAttribute('hidden');
      panel.toggleAttribute('hidden', !open);
      panelBtn.setAttribute('aria-expanded', String(open));
      return;
    }
    if (panel && !panel.hasAttribute('hidden') && !e.target.closest('.a11y')) {
      panel.setAttribute('hidden', '');
      document.getElementById('a11y-btn').setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const panel = document.getElementById('a11y-panel');
    if (panel && !panel.hasAttribute('hidden')) {
      panel.setAttribute('hidden', '');
      document.getElementById('a11y-btn').focus();
    }
  });

  apply();

  // table of contents, built from the article's own headings
  const body = document.querySelector('.post-body');
  const toc = document.getElementById('toc');
  if (toc && body) {
    const heads = [...body.querySelectorAll('h2')];
    if (heads.length >= 3) {
      const ol = toc.querySelector('ol');
      heads.forEach((h, i) => {
        h.id = h.id || `sec-${i + 1}`;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.textContent = h.textContent;
        li.appendChild(a);
        ol.appendChild(li);
      });
      toc.removeAttribute('hidden');

      const links = [...ol.querySelectorAll('a')];
      const spy = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            links.forEach((l) =>
              l.classList.toggle('current', l.getAttribute('href') === `#${entry.target.id}`),
            );
          }
        },
        { rootMargin: '-10% 0px -75% 0px' },
      );
      heads.forEach((h) => spy.observe(h));
    }
  }

  // reading progress
  const bar = document.getElementById('read-progress');
  if (bar && body) {
    const update = () => {
      const rect = body.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      bar.style.transform = `scaleX(${done})`;
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
  }

  // search page
  const input = document.getElementById('q');
  if (input) {
    const results = document.getElementById('search-results');
    const count = document.getElementById('search-count');
    let data = [];

    const esc = (s) =>
      String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const render = (q) => {
      const terms = q.trim().split(/\s+/).filter(Boolean);
      if (!terms.length) {
        results.innerHTML = '';
        count.textContent = '';
        return;
      }
      // English is case-sensitive in a way Hebrew was not: someone typing "rust"
      // has to match "Rust", so both sides are folded before comparing.
      const needles = terms.map((t) => t.toLowerCase());
      const hits = data
        .map((item) => {
          const hay = `${item.t} ${item.d} ${item.g.join(' ')} ${item.c} ${item.r} ${item.l} ${item.b}`.toLowerCase();
          const title = item.t.toLowerCase();
          const repo = item.r.toLowerCase();
          let score = 0;
          for (const term of needles) {
            if (!hay.includes(term)) return null;
            if (repo.includes(term)) score += 6;
            if (title.includes(term)) score += 5;
            if (item.g.some((g) => g.toLowerCase().includes(term))) score += 3;
            if (item.d.toLowerCase().includes(term)) score += 2;
            score += 1;
          }
          return { item, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score);

      count.textContent = hits.length
        ? `${hits.length} result${hits.length === 1 ? '' : 's'}`
        : 'Nothing found. Try one shorter word.';
      results.innerHTML = hits
        .map(
          ({ item }) => `<a class="card" href="${esc(item.u)}" style="--cat: ${esc(item.s)}">
            <div class="card-body">
              <span class="tag">${esc(item.c)}</span>
              <h3>${esc(item.t)}</h3>
              <p class="card-repo">${esc(item.r)}</p>
              <p>${esc(item.d)}</p>
            </div>
          </a>`,
        )
        .join('');
    };

    fetch('/search-index.json')
      .then((r) => r.json())
      .then((json) => {
        data = json;
        const q = new URLSearchParams(location.search).get('q');
        if (q) {
          input.value = q;
          render(q);
        }
      });

    input.addEventListener('input', () => render(input.value));
  }
})();
