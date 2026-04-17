const routes = {
  '/': () => import('./pages/home.js'),
  '/projects/meridian-gateway': () => import('./pages/projects/meridian-gateway.js'),
};

let currentPath = null;
let currentPage = null;

// ---------------------------------------------------------------------------
// Meta helpers
// ---------------------------------------------------------------------------

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function updatePageMeta(page) {
  const title   = page.meta?.title       ?? page.title ?? 'Stefan Kirov — Senior Engineering Consultant & Team Lead';
  const desc    = page.meta?.description ?? 'Senior Software Engineer with 13+ years building distributed systems, cloud-native platforms, and AI infrastructure.';
  const url     = page.meta?.url         ?? `https://stefankirov.com${location.pathname}`;
  const image   = page.meta?.image       ?? 'https://stefankirov.com/og-image.png';

  document.title = title;

  // Primary
  setMeta('description', desc);

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  // Open Graph
  setMeta('og:title',       title,  'property');
  setMeta('og:description', desc,   'property');
  setMeta('og:url',         url,    'property');
  setMeta('og:image',       image,  'property');

  // Twitter
  setMeta('twitter:title',       title);
  setMeta('twitter:description', desc);
  setMeta('twitter:image',       image);
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

async function navigate(href, pushState = true) {
  const url  = new URL(href, location.origin);
  const path = url.pathname;
  const hash = url.hash;

  if (pushState) history.pushState({}, '', path + hash);

  // Same path — just scroll to hash if present
  if (path === currentPath && hash) {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const loader = routes[path] ?? routes['/'];
  const page   = await loader();

  currentPage?.unmount?.();
  document.getElementById('app').innerHTML = page.render();
  updatePageMeta(page);
  currentPath = path;
  currentPage = page;
  page.mount?.();

  if (hash) {
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

export function initRouter() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-link]');
    if (!a) return;
    e.preventDefault();
    navigate(a.href);
  });

  window.addEventListener('popstate', () => navigate(location.href, false));

  navigate(location.href, false);
}
