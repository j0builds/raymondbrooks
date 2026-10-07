document.getElementById('year').textContent = new Date().getFullYear();

(function () {
  var ring = document.getElementById('cursor-ring');
  if (!ring) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.body.classList.add('has-custom-cursor');
  ring.hidden = false;

  var x = -200;
  var y = -200;
  var tx = -200;
  var ty = -200;
  var raf;

  function tick() {
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    ring.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
    raf = requestAnimationFrame(tick);
  }

  window.addEventListener(
    'pointermove',
    function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    },
    { passive: true }
  );

  document.addEventListener('mouseleave', function () {
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    ring.style.opacity = '';
  });
})();
