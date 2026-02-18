(function () {
  'use strict';

  // ----- 네비 링크 부드러운 스크롤 -----
  var navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var id = href.slice(1);
        var target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ----- 스크롤 시 현재 섹션에 해당하는 네비 링크 활성화 (Brittany 스타일) -----
  var sections = document.querySelectorAll('.section[id]');

  function setActiveNav() {
    var trigger = 280;

    sections.forEach(function (section) {
      var id = section.getAttribute('id');
      var rect = section.getBoundingClientRect();
      if (id && rect.top <= trigger && rect.bottom > 150) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  window.addEventListener('load', setActiveNav);

  // ----- 스크롤 시 섹션 등장 애니메이션 -----
  var revealEls = document.querySelectorAll('.section-heading, .content-block, .big-title, .big-subtitle, .section-desc');
  var observerOptions = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.05 };

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
})();
