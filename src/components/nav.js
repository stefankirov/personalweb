export function renderNav() {
  return `
<nav id="navbar">
  <a href="/" class="nav-logo" data-link>Stefan Kirov</a>
  <ul class="nav-links" id="nav-links">
    <li><a href="/#offer"    data-link>Services</a></li>
    <li><a href="/#process"  data-link>Process</a></li>
    <li><a href="/#projects" data-link>Projects</a></li>
    <li><a href="/#stack"    data-link>Stack</a></li>
    <li><a href="/#contact"  data-link>Work With Me</a></li>
  </ul>
  <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>`;
}
