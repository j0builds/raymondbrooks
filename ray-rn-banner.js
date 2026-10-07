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
  var detail = banner.querySelector('[data-detail]');
  var closeBtn = banner.querySelector('[data-close]');
  var lanesEl = banner.querySelector('.rr-lanes');
  var windowEl = document.getElementById('rr-window');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var lanes = {
    drops: [
      { id: 'd1', channel: 'IG', when: '2m', title: 'Daily drop', body: 'Placeholder caption for a social post. Ray RN did not say this.', stat: 'Mock views · not supplied' },
      { id: 'd2', channel: 'TT', when: '18m', title: 'HBCU FC clip', body: 'Stand-in for a daily release while HBCU FC is in the spotlight.', stat: 'Mock plays · not supplied' },
      { id: 'd3', channel: 'IG', when: '1h', title: 'Sideline frame', body: 'Opponent, score, and venue on this card are placeholders.', stat: 'Mock fixture · TBD' },
      { id: 'd4', channel: 'YT', when: '3h', title: 'Season cut', body: 'Longer edit from the season with 42MEDIA. Runtime is a placeholder.', stat: 'Mock length · 00:00' },
      { id: 'd5', channel: 'IG', when: '6h', title: 'Handle check', body: '@rayrn is a stand-in handle, waiting on a confirmed account.', stat: 'Mock handle · @rayrn' }
    ],
    match: [
      { id: 'm1', channel: 'Fixture', when: 'Mock', title: 'Match Day Tour', body: 'Campus, kickoff, and venue on this card are placeholders.', stat: 'Mock site · TBD' },
      { id: 'm2', channel: 'Score', when: 'Mock', title: 'Score held', body: 'No result is published here. The line stays open until a real one is supplied.', stat: 'Mock score · —' },
      { id: 'm3', channel: 'Clock', when: 'Mock', title: 'Design clock', body: 'The clock in the corner counts for this banner. It is a design timer.', stat: 'Mock clock · running' },
      { id: 'm4', channel: 'Table', when: 'Mock', title: 'Power ranking', body: 'Ranking slot waiting on a real table. Nothing on this card is official.', stat: 'Mock rank · —' },
      { id: 'm5', channel: 'Kit', when: 'Mock', title: 'Home kit', body: 'Black field, white number 42, and one pitch line in green.', stat: 'Mock kit · 42' }
    ],
    with: [
      { id: 'w1', channel: '42', when: 'Partner', title: 'In the season', body: '42MEDIA is in the season with Ray RN: story, presence, and the network.', stat: 'Mock term · this season' },
      { id: 'w2', channel: '42', when: 'Drops', title: 'Daily releases', body: 'He is posting every day. This card does not invent the words in the post.', stat: 'Mock cadence · daily' },
      { id: 'w3', channel: '42', when: 'Network', title: 'The network', body: 'While the day is on socials, the 42 network keeps the cut moving.', stat: 'Mock crew · —' },
      { id: 'w4', channel: '42', when: 'Base', title: 'Greensboro', body: 'The company is based in Greensboro. The season travels with the tour.', stat: 'Mock base · GSO' },
      { id: 'w5', channel: '42', when: 'Line', title: 'Fuel the season', body: 'Creative development applied to a season of HBCU FC. Placeholder closer.', stat: 'Mock line · placeholder' }
    ]
  };

  var latestLines = [
    'Mock · New drop on the feed',
    'Mock · HBCU FC clip queued',
    'Mock · Note from the season with 42',
    'Mock · Match-day card refreshed'
  ];

  var byId = {};
  Object.keys(lanes).forEach(function (key) {
    lanes[key].forEach(function (card) { byId[card.id] = card; });
  });

  var seconds = 64 * 60 + 12;
  var latestIndex = 0;
  var lastFocus = null;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function buildCard(card, clone) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'rr-card';
    btn.dataset.id = card.id;
    if (clone) {
      btn.tabIndex = -1;
      btn.setAttribute('aria-hidden', 'true');
    }
    var meta = el('span', 'rr-card-meta');
    meta.appendChild(el('span', 'rr-mock', 'Mock'));
    meta.appendChild(el('span', null, card.channel));
    meta.appendChild(el('span', null, card.when));
    btn.appendChild(meta);
    btn.appendChild(el('span', 'rr-card-title', card.title));
    btn.appendChild(el('span', 'rr-card-body', card.body));
    btn.appendChild(el('span', 'rr-card-stat', card.stat));
    return btn;
  }

  function render(lane) {
    var cards = lanes[lane] || lanes.drops;
    var copies = reduce ? 1 : 2;
    track.textContent = '';
    for (var copy = 0; copy < copies; copy += 1) {
      var set = document.createElement('div');
      set.className = 'rr-feed-set';
      if (copy === 1) set.setAttribute('aria-hidden', 'true');
      cards.forEach(function (card) {
        set.appendChild(buildCard(card, copy === 1));
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

  function selectLane(name) {
    render(name);
    closeDetail(false);
    var tabs = lanesEl.querySelectorAll('[role="tab"]');
    tabs.forEach(function (tab) {
      var on = tab.getAttribute('data-lane') === name;
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.tabIndex = on ? 0 : -1;
    });
    var active = lanesEl.querySelector('[data-lane="' + name + '"]');
    if (active) windowEl.setAttribute('aria-labelledby', active.id);
  }

  function openDetail(id, source) {
    var card = byId[id];
    if (!card) return;
    lastFocus = source || document.activeElement;
    detail.querySelector('[data-detail-title]').textContent = card.title;
    detail.querySelector('[data-detail-meta]').textContent = 'Mock · ' + card.channel + ' · ' + card.when;
    detail.querySelector('[data-detail-body]').textContent = card.body;
    detail.querySelector('[data-detail-stat]').textContent = card.stat;
    detail.hidden = false;
    banner.classList.add('is-reading');
    closeBtn.focus();
  }

  function closeDetail(restore) {
    if (detail.hidden) return;
    detail.hidden = true;
    banner.classList.remove('is-reading');
    if (restore !== false && lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  lanesEl.addEventListener('click', function (event) {
    var tab = event.target.closest('[role="tab"]');
    if (!tab) return;
    selectLane(tab.getAttribute('data-lane'));
  });

  lanesEl.addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    var tabs = Array.prototype.slice.call(lanesEl.querySelectorAll('[role="tab"]'));
    var index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    var next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    tabs[next].focus();
    selectLane(tabs[next].getAttribute('data-lane'));
  });

  windowEl.addEventListener('click', function (event) {
    var card = event.target.closest('.rr-card');
    if (!card) return;
    openDetail(card.getAttribute('data-id'), card);
  });

  closeBtn.addEventListener('click', function () { closeDetail(true); });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeDetail(true);
  });

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

  render('drops');
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
