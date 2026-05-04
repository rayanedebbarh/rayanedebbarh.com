// ── SHARED NAV + FOOTER INJECTION ──────────────────────────────────────────
(function () {
  const NAV_HTML = `
<nav class="navbar">
  <div class="nav-inner">
    <a class="nav-logo" href="index.html" title="Back to Home">
      <span class="nav-logo-text">RD</span>
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="about.html">About Me</a></li>
      <li><a href="experience.html">Work Experience</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="extracurricular.html">Extracurricular</a></li>
      <li><a href="skills.html">Skills</a></li>
    </ul>
    <button class="nav-hamburger" id="nav-ham" aria-label="Toggle menu">&#9776;</button>
  </div>
</nav>`;

  const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <p class="footer-name">Rayane Debbarh</p>
    <p class="footer-tagline">Let's build something worth playing.</p>
    <div class="footer-links">
      <a href="mailto:debbarh1a@alma.edu" class="btn btn-outline"><i class="fa-solid fa-envelope"></i> Email</a>
      <a href="https://www.linkedin.com/in/rayane-debbarh" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
      <a href="https://github.com/rayanedebbarh" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><i class="fa-brands fa-github"></i> GitHub</a>
      <a href="https://drive.google.com/file/d/1NHxsqOk3anfFxrSVff4V9g1b4EzjPoTC/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="fa-solid fa-file-pdf"></i> Resume</a>
    </div>
    <p class="footer-copy">&copy; 2026 Rayane Debbarh</p>
  </div>
</footer>`;

  document.addEventListener('DOMContentLoaded', function () {
    // Inject nav + footer
    document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

    // Inject logo styles
    var logoStyle = document.createElement('style');
    logoStyle.textContent = `
      .nav-logo {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: transform 0.22s, box-shadow 0.22s;
      }
      .nav-logo-text {
        font-family: var(--heading, 'Orbitron', sans-serif);
        font-size: 1.25rem;
        font-weight: 800;
        letter-spacing: 2px;
        color: var(--teal, #00d4c8);
        background: rgba(0,212,200,0.08);
        border: 2px solid rgba(0,212,200,0.5);
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-indent: 2px;
        transition: background 0.22s, box-shadow 0.22s, color 0.22s;
        box-shadow: 0 0 10px rgba(0,212,200,0.18);
      }
      .nav-logo:hover .nav-logo-text {
        background: rgba(0,212,200,0.16);
        box-shadow: 0 0 22px rgba(0,212,200,0.5), 0 0 8px rgba(0,212,200,0.3);
        color: #fff;
      }
      .nav-logo:hover {
        transform: scale(1.08);
      }
      .nav-logo:active .nav-logo-text {
        background: rgba(0,212,200,0.28);
        box-shadow: 0 0 28px rgba(0,212,200,0.65);
      }
    `;
    document.head.appendChild(logoStyle);

    // Active link highlight
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      if (a.getAttribute('href') === path) a.classList.add('active');
    });

    // Hamburger toggle
    var ham = document.getElementById('nav-ham');
    var links = document.getElementById('nav-links');
    ham.addEventListener('click', function () {
      links.classList.toggle('open');
      ham.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    // Close menu on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        ham.textContent = '☰';
      });
    });

    // Navbar scroll state
    var nav = document.querySelector('.navbar');
    function checkScroll() { nav.classList.toggle('scrolled', window.scrollY > 40); }
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });

    // Scroll fade-in
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });
  });
})();
