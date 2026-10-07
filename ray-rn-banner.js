(function () {
  var banner = document.getElementById('banner');
  var track = banner.querySelector('[data-track]');
  var clock = banner.querySelector('[data-clock]');
  var latestRow = banner.querySelector('[data-latest]');
  var latestText = banner.querySelector('[data-latest-text]');
  var pauseBtn = banner.querySelector('[data-pause]');
  var followBtn = banner.querySelector('[data-follow]');
  var partnerBtn = banner.querySelector('[data-partner]');
  var partner = document.getElementById('rr-partner');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Public posts on YouTube @HBCU_FC. Titles and view counts are the channel
  // shelf figures. Counts that are not public are omitted.
  var posts = [
    {
      href: 'https://www.youtube.com/shorts/R2_VcDcnQqM',
      thumb: 'https://i.ytimg.com/vi/R2_VcDcnQqM/hqdefault.jpg',
      title: 'Nah… this bicycle kick for Alcorn State was INSANE 😭🔥⚽️ #HBCUFC #AlcornState #HBCUSoccer',
      views: '361 views',
      stamp: 'Most watched',
      lead: true
    },
    {
      href: 'https://www.youtube.com/shorts/9DMsLhszpPc',
      thumb: 'https://i.ytimg.com/vi/9DMsLhszpPc/hqdefault.jpg',
      title: '⚽ Did you know? HBCUs have 30+ women’s soccer programs and only ~15 men’s. #HBCUFC',
      views: '336 views',
      stamp: 'Next most watched'
    },
    {
      href: 'https://www.youtube.com/shorts/rm_f8StyJWs',
      thumb: 'https://i.ytimg.com/vi/rm_f8StyJWs/hqdefault.jpg',
      title: 'The passion doesn’t end with the World Cup—it starts with HBCU soccer. ⚽️ #ThePastPresentFuture',
      views: '169 views',
      stamp: 'Third on the channel'
    },
    {
      href: 'https://www.youtube.com/watch?v=ainDZ-FkULU',
      thumb: 'https://i.ytimg.com/vi/ainDZ-FkULU/hqdefault.jpg',
      title: 'The HBCU FC Recap!',
      views: '110 views',
      stamp: 'On the channel'
    },
    {
      href: 'https://www.youtube.com/watch?v=q8X_PgCmBe0',
      thumb: 'https://i.ytimg.com/vi/q8X_PgCmBe0/hqdefault.jpg',
      title: 'HBCU FC X SAY WORD FC',
      views: '110 views',
      stamp: 'On the channel'
    }
  ];

  var latestLines = [
    'Most watched on @HBCU_FC · 361 views',
    'Next most watched · 336 views',
    'Third on the channel · 169 views',
    'The HBCU FC Recap! · 110 views',
    'HBCU FC X SAY WORD FC · 110 views'
  ];

  var seconds = 64 * 60 + 12;
  var latestIndex = 0;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function buildCard(post, clone) {
    var link = document.createElement('a');
    link.className = 'rr-card' + (post.lead ? ' is-lead' : '');
    link.href = post.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = post.title;
    if (clone) {
      link.tabIndex = -1;
    }
    var img = document.createElement('img');
    img.className = 'rr-thumb';
    img.src = post.thumb;
    img.alt = '';
    img.width = 480;
    img.height = 360;
    link.appendChild(img);
    var copy = el('span', 'rr-card-copy');
    var meta = el('span', 'rr-card-meta');
    meta.appendChild(el('span', 'rr-stamp', post.stamp));
    meta.appendChild(el('span', null, post.views));
    copy.appendChild(meta);
    copy.appendChild(el('span', 'rr-card-title', post.title));
    copy.appendChild(el('span', 'rr-open', 'Open the post'));
    link.appendChild(copy);
    return link;
  }

  function render() {
    var copies = reduce ? 1 : 2;
    track.textContent = '';
    for (var copy = 0; copy < copies; copy += 1) {
      var set = document.createElement('div');
      set.className = 'rr-feed-set';
      if (copy === 1) set.setAttribute('aria-hidden', 'true');
      posts.forEach(function (post) {
        set.appendChild(buildCard(post, copy === 1));
      });
      track.appendChild(set);
    }
    track.style.animation = 'none';
    void track.offsetWidth;
    track.style.animation = '';
  }

  function paintClock() {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    var text = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    clock.textContent = text;
    clock.setAttribute('datetime', 'PT' + m + 'M' + s + 'S');
  }

  function showLatest(index) {
    latestText.textContent = latestLines[index];
    latestRow.classList.remove('is-tick');
    void latestRow.offsetWidth;
    latestRow.classList.add('is-tick');
  }

  pauseBtn.addEventListener('click', function () {
    var paused = banner.classList.toggle('is-paused');
    pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    pauseBtn.textContent = paused ? 'Play feed' : 'Pause feed';
  });

  followBtn.addEventListener('click', function () {
    var on = followBtn.getAttribute('aria-pressed') === 'true';
    followBtn.setAttribute('aria-pressed', on ? 'false' : 'true');
    followBtn.classList.toggle('is-following', !on);
    followBtn.textContent = on ? 'Follow the season' : 'Following · mock';
  });

  partnerBtn.addEventListener('click', function () {
    var open = partner.hasAttribute('hidden');
    partner.hidden = !open;
    partnerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    partnerBtn.textContent = open ? 'Hide the partnership' : 'See the partnership';
  });

  render();
  showLatest(0);
  paintClock();

  if (!reduce) {
    window.setInterval(function () {
      if (banner.classList.contains('is-paused')) return;
      seconds = (seconds + 1) % (90 * 60);
      paintClock();
    }, 1000);

    window.setInterval(function () {
      if (banner.classList.contains('is-paused')) return;
      latestIndex = (latestIndex + 1) % latestLines.length;
      showLatest(latestIndex);
    }, 3200);
  }
})();
