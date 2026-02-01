// Shared loader: injects navbar and footer, matches Skills/Revolve behavior
(function() {
  function resolvePath(relative) {
    // Try same-level first, then parent-level fallback
    return fetch(relative).then(function(r){ if(!r.ok) throw new Error('primary'); return r; })
      .catch(function(){ return fetch('../' + relative); });
  }

  function ensureNavbarContainer() {
    var body = document.body;
    var container = document.getElementById('navbar-include');
    if (!container) {
      container = document.createElement('div');
      container.id = 'navbar-include';
      body.insertBefore(container, body.firstElementChild || null);
    } else if (body.firstElementChild !== container) {
      body.insertBefore(container, body.firstElementChild || null);
    }
    return container;
  }

  function ensureFooterContainer() {
    var body = document.body;
    var container = document.getElementById('footer-include');
    if (!container) {
      container = document.createElement('div');
      container.id = 'footer-include';
      body.appendChild(container); // Always place at the end of the body
    } else {
      // Move to end if not already
      if (body.lastElementChild !== container) {
        body.appendChild(container);
      }
    }
    return container;
  }

  function execScripts(el) {
    var scripts = el.querySelectorAll('script');
    scripts.forEach(function(s){
      var ns = document.createElement('script');
      if (s.src) ns.src = s.src; else ns.textContent = s.textContent;
      (document.head || document.body).appendChild(ns);
      s.parentNode && s.parentNode.removeChild(s);
    });
  }

  function initNavbarBehavior() {
    var navbar = document.querySelector('.main-navbar');
    if (!navbar) return;
    function setBodyOffset() {
      try {
        var h = navbar.offsetHeight || 0;
        document.body.style.paddingTop = h ? (h + 'px') : '';
      } catch(e) {}
    }
    setBodyOffset();
    window.addEventListener('resize', setBodyOffset);
    function updateNavbar() {
      if (window.scrollY < 10) navbar.classList.add('navbar-top');
      else navbar.classList.remove('navbar-top');
    }
    updateNavbar();
    window.addEventListener('scroll', updateNavbar);
    var links = navbar.querySelectorAll('a[href]');
    var current = window.location.pathname.split('/').pop();
    links.forEach(function(link){
      var href = link.getAttribute('href') || '';
      var file = href.split('#')[0];
      if (file && file === current) link.classList.add('active');
      if (href.indexOf('#projects') !== -1 && window.location.hash.indexOf('projects') !== -1) link.classList.add('active');
    });
  }

  // Load navbar
  resolvePath('assets/includes/navbar.html')
    .then(function(r){ return r.text(); })
    .then(function(html){
      var container = ensureNavbarContainer();
      container.innerHTML = html;
      execScripts(container);
      initNavbarBehavior();
    })
    .catch(function(e){ console.error('Navbar load failed:', e); });

  // Load footer
  resolvePath('assets/includes/footer.html')
    .then(function(r){ return r.text(); })
    .then(function(html){
      var container = ensureFooterContainer();
      container.innerHTML = html;
      execScripts(container);
    })
    .catch(function(e){ console.error('Footer load failed:', e); });
})();
