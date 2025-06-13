// Theme Switcher
const switcher = document.querySelector('.theme-switcher');
if (switcher) {
  switcher.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if(document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });
  // On load, set theme
  if(localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
  }
}
// Copy to clipboard for contact info
const copyBtns = document.querySelectorAll('.copy-btn');
copyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(text);
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1200);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var main = document.querySelector('.main');
  if (!main) return;

  function setActiveLink(href) {
    document.querySelectorAll('.side-nav a').forEach(function(link) {
      if (link.getAttribute('href') === href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function ajaxifyLinks() {
    document.querySelectorAll('.side-nav a').forEach(function(link) {
      var href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || link.target === '_blank') return;
      link.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.location.pathname === href) return;
        fetch(href)
          .then(function(resp) { return resp.text(); })
          .then(function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var newMain = doc.querySelector('.main');
            if (newMain) {
              main.innerHTML = newMain.innerHTML;
              window.history.pushState({}, '', href);
              ajaxifyLinks();
              setActiveLink(href);
              window.scrollTo(0, 0);
            } else {
              window.location.href = href;
            }
          });
      });
    });
    setActiveLink(window.location.pathname);
  }

  ajaxifyLinks();

  window.addEventListener('popstate', function() {
    fetch(window.location.pathname)
      .then(function(resp) { return resp.text(); })
      .then(function(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var newMain = doc.querySelector('.main');
        if (newMain) {
          main.innerHTML = newMain.innerHTML;
          ajaxifyLinks();
          setActiveLink(window.location.pathname);
          window.scrollTo(0, 0);
        }
      });
  });
}); 