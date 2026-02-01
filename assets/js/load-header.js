// load-header.js
// Inserts the shared header HTML into any element with data-include="site-header"
(function(){
  function loadHeader(el, path) {
    fetch(path).then(function(res){
      if (!res.ok) throw new Error('Failed to load ' + path);
      return res.text();
    }).then(function(html){
      el.innerHTML = html;
    }).catch(function(err){
      console.error(err);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var els = document.querySelectorAll('[data-include="site-header"]');
    els.forEach(function(el){
      var path = el.getAttribute('data-include-path') || 'assets/includes/site-header.html';
      // Adjust relative path if the page is in a subfolder
      if (path.indexOf('../') === 0) path = path; // allow explicit override
      loadHeader(el, path);
    });
  });
})();
