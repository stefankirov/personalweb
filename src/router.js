const routes = {
  '/': () => import('./pages/home.js'),
  '/projects/meridian-gateway': () => import('./pages/projects/meridian-gateway.js'),
};

let currentPath = null;
let currentPage = null;

async function navigate(href, pushState = true) {
  const url = new URL(href, location.origin);
  const path = url.pathname;
  const hash = url.hash;

  if (pushState) history.pushState({}, '', path + hash);

  // Same path — just scroll to hash if present
  if (path === currentPath && hash) {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const loader = routes[path] ?? routes['/'];
  const page = await loader();

  currentPage?.unmount?.();
  document.getElementById('app').innerHTML = page.render();
  document.title = page.title ?? 'Stefan Kirov — Independent Engineering Consultant';
  currentPath = path;
  currentPage = page;
  page.mount?.();

  if (hash) {
    // Small delay to let DOM settle before scrolling
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
