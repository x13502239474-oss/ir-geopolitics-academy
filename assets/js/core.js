/* 核心引擎：路由 / 渲染 / 世界地图 / 阅读器 */
(function () {
  'use strict';
  var C = window.IR_CATALOG;
  var IR = window.IR = window.IR || {};
  var app;

  /* ============ 简化世界地图（等距圆柱投影示意，非精确边界） ============ */
  var LAND = [
    /* 北美 */ '-168,64 -150,70 -128,70 -112,62 -96,58 -84,50 -70,48 -56,52 -62,44 -76,35 -82,26 -97,25 -112,30 -124,40 -132,54 -150,58',
    /* 格陵兰 */ '-56,60 -38,68 -22,78 -38,84 -56,80 -64,72',
    /* 中美 */ '-97,25 -88,21 -84,10 -78,8 -80,16 -90,19',
    /* 南美 */ '-80,9 -68,12 -56,10 -48,2 -36,-6 -38,-16 -48,-25 -56,-36 -70,-54 -75,-44 -72,-24 -78,-8',
    /* 欧洲 */ '-10,36 -2,43 8,44 18,41 28,45 40,48 58,56 44,68 28,71 12,60 -4,57 -11,50',
    /* 非洲 */ '-17,15 -6,6 10,5 26,-4 40,-14 51,-24 36,-34 20,-35 12,-18 4,4 -12,6',
    /* 亚洲 */ '28,45 48,44 68,54 92,74 120,74 145,68 162,58 150,46 134,42 126,32 122,24 110,20 106,10 99,6 94,16 82,8 72,21 60,26 45,40',
    /* 印度半岛 */ '68,23 78,9 88,21 82,24',
    /* 东南亚 */ '94,16 106,10 110,2 104,-4 100,6',
    /* 澳洲 */ '114,-22 130,-12 145,-14 153,-28 145,-38 130,-34 115,-30',
    /* 日本 */ '130,32 136,35 141,42 145,44 140,38 134,33',
    /* 英伦 */ '-6,50 -2,58 1,54 -3,50',
    /* 新西兰 */ '170,-36 176,-40 172,-45 167,-46',
    /* 马达加斯加 */ '47,-13 50,-20 46,-26 44,-18'
  ];
  function px(lon) { return (lon + 180) / 360 * 800; }
  function py(lat) { return (90 - lat) / 180 * 400; }
  function pt(str) {
    return str.trim().split(/\s+/).map(function (p) {
      var a = p.split(','); return px(+a[0]).toFixed(1) + ',' + py(+a[1]).toFixed(1);
    }).join(' ');
  }
  function arc(a, b, lift) {
    var x1 = px(a[0]), y1 = py(a[1]), x2 = px(b[0]), y2 = py(b[1]);
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - (lift || 28);
    return 'M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1);
  }
  IR.mapSVG = function (opts) {
    opts = opts || {};
    var grid = '';
    for (var lon = -150; lon <= 150; lon += 30) grid += '<line x1="' + px(lon).toFixed(1) + '" y1="0" x2="' + px(lon).toFixed(1) + '" y2="400"/>';
    for (var lat = -60; lat <= 60; lat += 30) grid += '<line x1="0" y1="' + py(lat).toFixed(1) + '" x2="800" y2="' + py(lat).toFixed(1) + '"/>';
    var land = LAND.map(function (s) { return '<polygon points="' + pt(s) + '"/>'; }).join('');
    var dots = '';
    (opts.hubs || []).forEach(function (h) {
      var x = px(h[0]), y = py(h[1]);
      dots += '<circle class="hub" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.4" fill="#e2c68d"/>' +
              '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="8" fill="none" stroke="#c8a45c" stroke-width=".7" opacity=".6"/>';
    });
    var routes = '';
    (opts.routes || []).forEach(function (r) { routes += '<path d="' + arc(r[0], r[1], r[2]) + '" fill="none" stroke="#c8a45c" stroke-width="1" stroke-dasharray="4 5" opacity=".55"/>'; });
    return '<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="世界战略地图示意图">' +
      '<defs><radialGradient id="og"><stop offset="0" stop-color="#1c4159"/><stop offset="1" stop-color="#0a1826"/></radialGradient></defs>' +
      '<rect width="800" height="400" fill="url(#og)"/>' +
      '<g stroke="#c8a45c" stroke-width=".4" opacity=".1">' + grid + '</g>' +
      '<line x1="0" y1="' + py(0).toFixed(1) + '" x2="800" y2="' + py(0).toFixed(1) + '" stroke="#c8a45c" stroke-width=".6" opacity=".35" stroke-dasharray="6 5"/>' +
      '<g fill="#1d4350" stroke="#7fa6a0" stroke-width=".7" opacity=".92">' + land + '</g>' +
      routes + dots + '</svg>';
  };

  /* ============ 路由与工具 ============ */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  IR.esc = esc;
  function pad(n) { return String(n).padStart(2, '0'); }

  function navActive(key) {
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === key);
    });
  }
  function closeMenu() {
    var m = document.getElementById('mobileMenu'), b = document.getElementById('menuBtn');
    m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); b.setAttribute('aria-expanded', 'false');
  }
  function sectionHead(kicker, title, desc) {
    return '<div class="block-head"><div><span class="block-kicker">' + kicker + '</span><h2>' + title + '</h2><div class="head-rule"></div></div>' +
      (desc ? '<p>' + desc + '</p>' : '') + '</div>';
  }

  /* ============ 首页 ============ */
  function viewHome() {
    var heroMap = IR.mapSVG({
      hubs: [[-98, 39], [31, 30], [56, 27], [78, 22], [104, 35], [121, 25], [100, 2], [-80, 9], [18, -34]],
      routes: [[[-98, 39], [10, 50], 30], [[10, 50], [104, 35], 40], [[78, 22], [121, 25], 18], [[31, 30], [100, 2], 26]]
    });
    var parts = C.parts.map(function (p) {
      return '<a class="part-card" href="#/catalog" style="--pc:' + p.accent + '">' +
        '<div class="pc-code">' + p.code + ' · ' + pad(p.range[0]) + '—' + pad(p.range[1]) + '</div>' +
        '<h3>' + p.title + '</h3><div class="pc-en">' + p.en + '</div>' +
        '<p>' + p.desc + '</p>' +
        '<div class="pc-foot"><span>' + (p.range[1] - p.range[0] + 1) + ' 章课程</span><b>进入 →</b></div></a>';
    }).join('');
    var theory = C.theories.slice(0, 8).map(function (t) {
      return '<a class="index-item" href="#/lesson/' + t.lesson + '"><div class="ix-top"><h4>' + t.name + '</h4><span class="tag">' + esc(t.tag) + '</span></div>' +
        '<p>' + t.core + '</p><div class="ix-go">第 ' + t.lesson + ' 章 →</div></a>';
    }).join('');
    var region = C.regions.map(function (r) {
      return '<a class="index-item" href="#/lesson/' + r.lesson + '"><div class="ix-top"><h4>' + r.name + '</h4><span class="tag">' + r.en + '</span></div>' +
        '<p>' + r.note + '</p><div class="ix-go">第 ' + r.lesson + ' 章 →</div></a>';
    }).join('');
    var labCards = C.labs.slice(0, 3).map(function (l) {
      return '<a class="lab-card" href="#/lab/' + l.id + '"><div class="lc-icon">' + l.icon + '</div><h3>' + l.title + '</h3><div class="lc-en">' + l.en + '</div><p>' + l.desc + '</p></a>';
    }).join('');
    return '<section class="hero"><div class="hero-grid"><div>' +
      '<div class="hero-eyebrow">A SYSTEMATIC DIGITAL COURSE</div>' +
      '<h1>理解权力、秩序与地理<span class="accent">国际关系与地缘政治</span></h1>' +
      '<p class="hero-lead">这不是新闻资讯，也不是知识词条，而是一套从零基础到进阶的系统课程。<strong>七大部分、五十七章</strong>，带你在理论、历史与地图之间，建立一套属于自己的国际政治分析能力。</p>' +
      '<div class="hero-actions"><a class="btn primary" href="#/catalog">开始系统学习 →</a><a class="btn ghost" href="#/lesson/1">阅读第一章</a></div>' +
      '</div><div class="hero-map">' + heroMap + '<span class="map-caption">STRATEGIC WORLD MAP · 示意图</span></div></div>' +
      '<div class="hero-stats"><div class="hero-stat"><b>07</b><span>课程部分</span></div><div class="hero-stat"><b>57</b><span>完整章节</span></div>' +
      '<div class="hero-stat"><b>16</b><span>深度案例</span></div><div class="hero-stat"><b>06</b><span>交互工具</span></div></div></section>' +

      '<section class="block"><div class="section-shell">' + sectionHead('CURRICULUM · 课程体系', '从概念地基到独立分析', '七部分循序渐进：先建立概念，再掌握理论，最后学会把理论用于真实世界。') +
      '<div class="part-grid">' + parts + '</div></div></section>' +

      '<section class="block alt"><div class="section-shell">' + sectionHead('CURRENT FOCUS · 当前重点', '为什么现实主义仍是必读的第一课', '在无政府状态的世界里，国家为何首先追求权力？理解这一点，就拿到了进入国际关系学的钥匙。') +
      '<div class="feature"><div class="feature-art">' + IR.mapSVG({ hubs: [[-98, 39], [10, 50], [95, 60], [121, 25]], routes: [[[-98, 39], [10, 50], 26], [[10, 50], [95, 60], 20]] }) + '</div>' +
      '<div class="feature-body"><span class="fk">PART II · 第 09 章</span><h3>现实主义理论</h3>' +
      '<p>从修昔底德的「强者行其所能行，弱者忍其所必忍」，到沃尔兹的结构现实主义，现实主义提供了理解国际政治最持久的一套语言。本章将完整讲清它的核心假设、内部流派、解释力与局限。</p>' +
      '<a class="btn" href="#/lesson/9">阅读本章 →</a></div></div></div></section>' +

      '<section class="block"><div class="section-shell">' + sectionHead('THEORY INDEX · 理论索引', '把理论当作观察世界的眼镜', '点击任一理论，进入对应章节。') +
      '<div class="index-grid">' + theory + '</div></div></section>' +

      '<section class="block alt"><div class="section-shell">' + sectionHead('REGIONAL INDEX · 地缘区域索引', '把理论放回世界地图', '从欧洲到北极，逐一分析各战略区域的地理条件与竞争逻辑。') +
      '<div class="index-grid">' + region + '</div></div></section>' +

      '<section class="block"><div class="section-shell">' + sectionHead('INTERACTIVE LAB · 交互实验室', '用工具而不是用直觉分析', '六项交互工具，全部服务知识学习，手机端可直接操作。') +
      '<div class="lab-grid">' + labCards + '</div><div style="text-align:center;margin-top:28px"><a class="btn" href="#/lab">查看全部六项工具 →</a></div></div></section>';
  }

  /* ============ 课程目录 ============ */
  function viewCatalog() {
    var parts = C.parts.map(function (p) {
      var rows = C.lessons.filter(function (l) { return l.part === p.id; }).map(function (l) {
        return '<a class="lesson-row ' + (l.ready ? 'ready' : '') + '" href="#/lesson/' + l.id + '">' +
          '<span class="ln">' + pad(l.id) + '</span><div><h3>' + l.title + '</h3><p>' + l.brief + '</p></div>' +
          '<span class="lstate ' + (l.ready ? '' : 'soon') + '">' + (l.ready ? '已开课' : '编写中') + '</span></a>';
      }).join('');
      return '<section class="catalog-part"><div class="section-shell"><div class="cp-head"><span class="cp-num">' + pad(p.id) + '</span>' +
        '<div><h2>' + p.title + '</h2><span class="cp-en">' + p.code + ' · ' + p.en + '</span></div></div>' +
        '<p class="cp-desc">' + p.desc + '</p><div class="lesson-list">' + rows + '</div></div></section>';
    }).join('');
    return '<section class="page-head"><div class="section-shell"><span class="ph-code">COURSE CATALOG / 课程总目录</span>' +
      '<h1>一条从入门到进阶的学习路径</h1><p>建议按顺序学习。已开课章节可直接进入；标注「编写中」的章节正在按批次完善，结构与深度保持一致。</p></div></section>' + parts;
  }

  /* ============ 章节阅读器 ============ */
  function loadLessonData(id) {
    return new Promise(function (resolve) {
      window.IR_LESSONS = window.IR_LESSONS || {};
      if (window.IR_LESSONS[id]) return resolve(window.IR_LESSONS[id]);
      var s = document.createElement('script');
      s.src = 'data/lessons/lesson-' + pad(id) + '.js';
      s.onload = function () { resolve(window.IR_LESSONS[id] || null); };
      s.onerror = function () { resolve(null); };
      document.head.appendChild(s);
    });
  }
  function modNav(mods) {
    return '<nav class="mod-nav"><div class="mn-title">本章目录</div>' + mods.map(function (m, i) {
      return '<a href="#m' + (i + 1) + '" data-target="m' + (i + 1) + '"><b>' + pad(i + 1) + '</b>' + m.title + '</a>';
    }).join('') + '</nav>';
  }
  function viewLessonSkeleton(meta) {
    return '<div class="reader-top"><div class="reader-top-inner"><div class="crumb"><a href="#/catalog">课程体系</a> / 第 ' + pad(meta.id) + ' 章</div>' +
      '<h1>' + meta.title + '</h1><div class="rt-en">' + meta.en + '</div><p class="rt-lead">' + meta.brief + '</p>' +
      '<div class="rt-keys">' + meta.keywords.map(function (k) { return '<span>' + esc(k) + '</span>'; }).join('') + '</div></div></div>' +
      '<div class="reader-wrap"><div class="reader-shell"><div id="modNavSlot"></div><article class="paper" id="paperBody"><p>正在载入章节内容…</p></article></div></div>';
  }
  function renderLessonContent(data, meta) {
    var mods = data.modules || [];
    document.getElementById('modNavSlot').innerHTML = modNav(mods);
    var html = mods.map(function (m, i) {
      return '<section class="module" id="m' + (i + 1) + '"><div class="mod-head"><span class="mno">' + pad(i + 1) + '</span><h2>' + m.title + '</h2></div>' + m.html + '</section>';
    }).join('');
    var prev = C.getLesson(meta.id - 1), next = C.getLesson(meta.id + 1);
    html += '<div class="reader-foot">' +
      (prev ? '<a href="#/lesson/' + prev.id + '"><small>← 上一章 · ' + pad(prev.id) + '</small><b>' + prev.title + '</b></a>' : '<span></span>') +
      (next ? '<a class="next" href="#/lesson/' + next.id + '"><small>下一章 · ' + pad(next.id) + ' →</small><b>' + next.title + '</b></a>' : '<span></span>') + '</div>';
    document.getElementById('paperBody').innerHTML = html;
    bindModNav();
  }
  function bindModNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.mod-nav a'));
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var el = document.getElementById(a.getAttribute('data-target'));
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
      });
    });
    if ('IntersectionObserver' in window && links.length) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-target') === en.target.id); });
          }
        });
      }, { rootMargin: '-100px 0px -70% 0px' });
      document.querySelectorAll('.module').forEach(function (m) { obs.observe(m); });
    }
  }

  /* ============ 实验室 / 案例 / 关于 ============ */
  function viewLabIndex() {
    var cards = C.labs.map(function (l) {
      return '<a class="lab-card" href="#/lab/' + l.id + '"><div class="lc-icon">' + l.icon + '</div><h3>' + l.title + '</h3><div class="lc-en">' + l.en + '</div><p>' + l.desc + '</p></a>';
    }).join('');
    return '<section class="page-head"><div class="section-shell"><span class="ph-code">INTERACTIVE LAB / 交互实验室</span><h1>六项工具，六种看世界的方式</h1>' +
      '<p>地图、关系网络、理论比较、时间轴与地缘分析——每一项都对应课程中的核心方法，可直接在手机端操作。</p></div></section>' +
      '<section class="block"><div class="section-shell"><div class="lab-grid">' + cards + '</div></div></section>';
  }
  function viewCases() {
    var groups = {}, order = [];
    C.cases.forEach(function (c) { if (!groups[c.cat]) { groups[c.cat] = []; order.push(c.cat); } groups[c.cat].push(c); });
    var html = order.map(function (cat) {
      var cards = groups[cat].map(function (c) {
        return '<article class="case-card"><div class="cc-top"><span>' + c.era + '</span><span>' + c.id.toUpperCase() + '</span></div>' +
          '<h3>' + c.title + '</h3><p>' + c.brief + '</p>' +
          '<div class="cc-foot">关联章节：' + c.lessons.map(function (id) { return '第' + id + '章'; }).join(' · ') + '</div></article>';
      }).join('');
      return '<div style="margin-top:34px">' + sectionHead('CASE FILE', cat, '') + '<div class="case-grid">' + cards + '</div></div>';
    }).join('');
    return '<section class="page-head"><div class="section-shell"><span class="ph-code">CASE STUDIES / 案例研究</span><h1>把理论放进真实历史</h1>' +
      '<p>案例按战争、大国竞争、危机决策、同盟与地区冲突分类。涉及仍在发展的事件，课程严格区分<strong>已确认事实</strong>、<strong>各方立场</strong>与<strong>分析判断</strong>，不把推测写成事实。</p></div></section>' +
      '<section class="block"><div class="section-shell">' + html + '</div></section>';
  }
  function viewAbout() {
    var src = '<li><b>《国际关系学入门》（第二版）</b>邢悦 编著，清华大学出版社 — 概念框架与问题意识的主要来源<span>用户提供的扫描版教材</span></li>' +
      '<li><b>《国际关系学理论与方法》（第四版）</b>Robert Jackson、Georg Sørensen 著 — 理论谱系与流派比较的主要来源<span>用户提供的扫描版教材</span></li>' +
      '<li><b>《地缘政治学：国际关系的地理学》</b>Saul B. Cohen 著 — 地缘理论传统与区域分析的主要来源<span>用户提供的扫描版教材</span></li>';
    return '<section class="page-head"><div class="section-shell"><span class="ph-code">ABOUT / 关于本站</span><h1>一套为系统学习而建的数字课程</h1>' +
      '<p>本站以三本经典教材为核心参考，用原创语言重新组织讲解，不复制受版权保护的原文。所有学者的观点均标注来源，理论分歧处以多视角呈现。</p></div></section>' +
      '<section class="block"><div class="section-shell"><div class="about-grid">' +
      '<div class="about-block"><h3>编写原则</h3><p>每章统一包含十个元素：本章导读、核心概念、历史背景、理论体系、运行机制、代表学者、经典案例、理论比较、现实应用、本章总结。重要理论展开到本科高年级与研究生入门的深度，概念给定义也给来源，案例给经过也给分析。</p>' +
      '<p>涉及仍在发展的国际事件，一律区分「已确认事实」「各方立场」「分析判断」三个层次。本站立场是帮助学习者形成独立、系统、多角度的分析能力，而非提供某种单一结论。</p></div>' +
      '<div class="about-block"><h3>核心参考教材</h3><ul class="src-list">' + src + '</ul></div></div></div></section>';
  }

  /* ============ 路由入口 ============ */
  function render() {
    var hash = location.hash || '#/';
    var parts = hash.replace(/^#\/?/, '').split('/');
    var key = parts[0] || '';
    closeMenu();
    if (key === '' || key === 'home') {
      app.innerHTML = viewHome(); navActive('home'); window.scrollTo(0, 0); return;
    }
    if (key === 'catalog') { app.innerHTML = viewCatalog(); navActive('catalog'); window.scrollTo(0, 0); return; }
    if (key === 'cases') { app.innerHTML = viewCases(); navActive('cases'); window.scrollTo(0, 0); return; }
    if (key === 'about') { app.innerHTML = viewAbout(); navActive('about'); window.scrollTo(0, 0); return; }
    if (key === 'lab') {
      navActive('lab');
      if (!parts[1]) { app.innerHTML = viewLabIndex(); window.scrollTo(0, 0); }
      else if (IR.renderLab) IR.renderLab(app, parts[1]);
      else { app.innerHTML = viewLabIndex(); }
      return;
    }
    if (key === 'lesson') {
      var id = Number(parts[1]);
      var meta = C.getLesson(id);
      if (!meta) { app.innerHTML = viewCatalog(); return; }
      navActive('catalog');
      app.innerHTML = viewLessonSkeleton(meta);
      window.scrollTo(0, 0);
      loadLessonData(id).then(function (data) {
        if (data && data.modules) renderLessonContent(data, meta);
        else document.getElementById('paperBody').innerHTML = '<div class="callout note"><div class="cl-title">CHAPTER IN PREPARATION</div><p>本章正文正在按批次编写中。课程目录、学习路径与相邻章节已就绪，完成后将以相同的十模块结构交付。你可先阅读本部分其他已开课章节。</p></div>';
      });
      return;
    }
    app.innerHTML = viewHome(); navActive('home');
  }

  IR.boot = function () {
    app = document.getElementById('app');
    document.getElementById('menuBtn').addEventListener('click', function () {
      var m = document.getElementById('mobileMenu'), open = m.classList.toggle('open');
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
      m.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
    document.getElementById('mobileMenu').addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
    document.getElementById('toTop').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    window.addEventListener('scroll', function () {
      document.getElementById('toTop').classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    window.addEventListener('hashchange', render);
    render();
  };
})();
