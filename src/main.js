import './style.css';
import { renderNav } from './components/nav.js';
import { renderFooter } from './components/footer.js';
import { initRouter } from './router.js';

document.getElementById('navbar-mount').innerHTML = renderNav();
document.getElementById('footer-mount').innerHTML = renderFooter();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

initRouter();
