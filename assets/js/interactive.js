/* 交互实验室：战略地图 / 力量结构 / 理论比较 / 时间轴 / 地缘分析 / 组织关系 */
(function () {
  'use strict';
  var IR = window.IR = window.IR || {};
  var C = window.IR_CATALOG;
  var esc = function (s) { return IR.esc ? IR.esc(s) : String(s); };

  function header(l) {
    return '<section class="page-head"><div class="section-shell"><span class="ph-code">INTERACTIVE LAB / ' + l.en + '</span>' +
      '<h1>' + l.title + '</h1><p>' + l.desc + '</p>' +
      '<div style="margin-top:18px;display:flex;gap:8px;flex-wrap:wrap"><a class="btn ghost" href="#/lab">← 返回工具列表</a></div></div></section>';
  }
  function shell(inner, note) {
    return '<div class="lab-view section-shell"><div class="lab-toolbar"><h2>互动视图</h2></div>' +
      '<div class="lab-stage">' + inner + '<div class="info-panel" id="infoPanel" style="display:none"></div></div>' +
      '<div class="stage-note">' + note + '</div></div>';
  }
  function showInfo(ev, title, body, meta) {
    var p = document.getElementById('infoPanel'); if (!p) return;
    var stage = p.parentNode, sr = stage.getBoundingClientRect();
    var x = ev.clientX - sr.left + 14, y = ev.clientY - sr.top + 10;
    if (x + 300 > sr.width) x = Math.max(12, sr.width - 312);
    if (y + 190 > sr.height) y = Math.max(12, sr.height - 200);
    p.style.left = x + 'px'; p.style.top = y + 'px';
    p.innerHTML = '<button class="ip-close" aria-label="关闭">×</button><h4>' + title + '</h4><p>' + body + '</p><div class="ip-meta">' + meta + '</div>';
    p.style.display = 'block';
    p.querySelector('.ip-close').onclick = function () { p.style.display = 'none'; };
  }

  /* ---------------- 1. 全球战略地图 ---------------- */
  var CHOKES = [
    { n: '马六甲海峡', c: [100, 2], t: '海上咽喉', d: '连接印度洋与太平洋的关键航道，是东亚能源进口的生命线之一。其战略意义来自航运量而非宽度本身。', m: '对应课程：第 37、45 章' },
    { n: '苏伊士运河', c: [32, 30], t: '人工通道', d: '大幅缩短欧洲与亚洲之间的航程。1956 年苏伊士危机显示了航道控制权如何成为大国博弈的焦点。', m: '对应课程：第 37、46 章' },
    { n: '巴拿马运河', c: [-80, 9], t: '人工通道', d: '连接大西洋与太平洋，对美国两洋海军的调动具有历史性意义，也是美国地区影响力的象征。', m: '对应课程：第 37、42、48 章' },
    { n: '霍尔木兹海峡', c: [56, 27], t: '能源咽喉', d: '波斯湾石油外运的主要出口。其战略价值来自全球能源市场对这条航道依赖的集中度。', m: '对应课程：第 29、38、46 章' },
    { n: '台湾海峡', c: [121, 24], t: '海上通道', d: '西太平洋重要的南北航运通道，也是区域安全结构中的敏感节点。涉及事实、立场与判断须分开表述。', m: '对应课程：第 43、44 章' },
    { n: '直布罗陀海峡', c: [-5, 36], t: '海上咽喉', d: '地中海通往大西洋的唯一海上出口，历史上长期是海权竞争的焦点。', m: '对应课程：第 33、37、40 章' },
    { n: '好望角航线', c: [18, -34], t: '备用航道', d: '在苏伊士运河受阻时成为欧亚航运的替代路线，说明战略通道往往存在替代与冗余问题。', m: '对应课程：第 37 章' },
    { n: '曼德海峡', c: [43, 13], t: '海上咽喉', d: '红海进入印度洋的门户，与苏伊士运河共同构成欧亚航运的关键链条。', m: '对应课程：第 37、46 章' },
    { n: '白令海峡', c: [-169, 66], t: '极地通道', d: '连接北冰洋与太平洋，随着北极航道开发，其战略关注度上升。', m: '对应课程：第 49 章' },
    { n: '南海', c: [114, 15], t: '争议海域', d: '岛礁主权与海洋权益争议叠加航行自由议题，是海权理论与当代地缘竞争交织的典型区域。', m: '对应课程：第 37、44 章' }
  ];
  function labMap(stage) {
    function px(l) { return (l + 180) / 360 * 800; }
    function py(a) { return (90 - a) / 180 * 400; }
    var dots = CHOKES.map(function (h, i) {
      return '<g class="hot" data-i="' + i + '"><circle cx="' + px(h.c[0]).toFixed(1) + '" cy="' + py(h.c[1]).toFixed(1) + '" r="12" fill="transparent"/>' +
        '<circle cx="' + px(h.c[0]).toFixed(1) + '" cy="' + py(h.c[1]).toFixed(1) + '" r="4.5" fill="#e2c68d" stroke="#0c1b2a" stroke-width="1"/>' +
        '<text x="' + (px(h.c[0]) + 9).toFixed(1) + '" y="' + (py(h.c[1]) - 7).toFixed(1) + '" fill="#e2c68d" font-size="10" font-family="sans-serif">' + h.n + '</text></g>';
    }).join('');
    // override stage content by inserting hotspot layer into existing map
    var svg = IR.mapSVG({ hubs: [], routes: [[[-98, 39], [10, 50], 28], [[10, 50], [121, 25], 42], [[56, 27], [100, 2], 20]] });
    svg = svg.replace('</svg>', dots + '</svg>');
    stage.insertAdjacentHTML('afterbegin', svg);
    stage.querySelectorAll('.hot').forEach(function (g) {
      g.addEventListener('click', function (e) {
        var h = CHOKES[+g.getAttribute('data-i')];
        showInfo(e, h.n + ' · ' + h.t, h.d, h.m);
      });
    });
  }

  /* ---------------- 2. 力量结构图 ---------------- */
  var NODES = [
    { n: '美国', x: 140, y: 150, r: 34, c: '#4f7f9c', d: '海权与联盟体系的核心，两洋屏障与全球基地网络是其战略基础。' },
    { n: '中国', x: 470, y: 190, r: 32, c: '#a8544a', d: '陆海复合型大国，周边战略与海洋方向构成主要地缘议题。' },
    { n: '俄罗斯', x: 400, y: 85, r: 29, c: '#8a7142', d: '心脏地带的继承者，战略纵深与能源是其主要权力资源。' },
    { n: '欧盟', x: 300, y: 205, r: 25, c: '#3d736b', d: '制度性力量与规范影响力的代表，安全上仍高度依赖外部。' },
    { n: '印度', x: 555, y: 285, r: 23, c: '#a8794a', d: '印度洋地区的主要力量，人口与地理条件构成长期潜力。' },
    { n: '日本', x: 655, y: 165, r: 20, c: '#6d8798', d: '西太平洋岛链的重要环节，海洋安全是其核心关切。' },
    { n: '伊朗', x: 470, y: 310, r: 18, c: '#9a6a52', d: '中东地区的关键力量，能源通道与地区网络是其影响力来源。' }
  ];
  var EDGES = [
    [0, 3, '联盟', '#c8a45c', 1], [0, 5, '同盟', '#c8a45c', 1], [0, 1, '竞争', '#5f8ba8', 0],
    [0, 2, '对抗', '#a8544a', 0], [1, 2, '协作', '#8a7142', 0], [1, 4, '竞争', '#5f8ba8', 0],
    [2, 6, '协作', '#8a7142', 0], [4, 5, '协作', '#3d736b', 1], [3, 2, '对抗', '#a8544a', 0], [1, 6, '协作', '#8a7142', 1]
  ];
  function labPower(stage) {
    var w = 760, h = 380;
    var edges = EDGES.map(function (e, i) {
      var a = NODES[e[0]], b = NODES[e[1]];
      return '<line class="edge" data-a="' + e[0] + '" data-b="' + e[1] + '" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y +
        '" stroke="' + e[3] + '" stroke-width="' + (e[4] ? 2.2 : 1.3) + '" stroke-opacity=".75" ' + (e[3] === '#a8544a' ? 'stroke-dasharray="7 5"' : '') + '/>' +
        '<text x="' + ((a.x + b.x) / 2) + '" y="' + ((a.y + b.y) / 2 - 5) + '" fill="' + e[3] + '" font-size="9" text-anchor="middle" font-family="sans-serif" class="elabel" data-i="' + i + '">' + e[2] + '</text>';
    }).join('');
    var nodes = NODES.map(function (n, i) {
      return '<g class="hot" data-i="' + i + '"><circle cx="' + n.x + '" cy="' + n.y + '" r="' + (n.r + 7) + '" fill="none" stroke="' + n.c + '" stroke-width=".7" opacity=".5"/>' +
        '<circle cx="' + n.x + '" cy="' + n.y + '" r="' + n.r + '" fill="#0f2133" stroke="' + n.c + '" stroke-width="2"/>' +
        '<text x="' + n.x + '" y="' + (n.y + 5) + '" fill="#f5f0e4" font-size="13" text-anchor="middle" font-family="sans-serif">' + n.n + '</text></g>';
    }).join('');
    var svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="大国力量结构关系图">' +
      '<rect width="' + w + '" height="' + h + '" fill="#0c1b2a"/>' +
      '<g opacity=".08" stroke="#c8a45c" stroke-width=".5">' +
      Array.from({ length: 10 }, function (_, i) { return '<line x1="0" y1="' + (i * 42) + '" x2="760" y2="' + (i * 42) + '"/>'; }).join('') + '</g>' + edges + nodes + '</svg>';
    stage.insertAdjacentHTML('afterbegin', svg);
    stage.querySelectorAll('.hot').forEach(function (g) {
      g.addEventListener('click', function (e) {
        var i = +g.getAttribute('data-i'), n = NODES[i];
        var rel = EDGES.filter(function (x) { return x[0] === i || x[1] === i; }).map(function (x) {
          var other = NODES[x[0] === i ? x[1] : x[0]].n;
          return other + '（' + x[2] + '）';
        }).join('、');
        showInfo(e, n.n, n.d, '图中关系：' + (rel || '无直接连线'));
      });
    });
    stage.insertAdjacentHTML('beforeend', '<div class="legend"><span><i style="background:#c8a45c"></i>联盟／同盟</span><span><i style="background:#5f8ba8"></i>竞争</span><span><i style="background:#a8544a"></i>对抗（虚线）</span><span style="color:#8ba3b4">示意图：关系为教学性概括，不对应具体时点的官方定性</span></div>');
  }

  /* ---------------- 3. 理论比较台 ---------------- */
  var THEORY_DATA = {
    '现实主义': {
      '核心问题': '国家如何在无政府体系中求得安全与生存',
      '行为假设': '国家是理性、单一、以自身利益为准的行为体',
      '体系性质': '无政府状态，不存在高于国家的权威',
      '主要行为体': '民族国家（国家中心主义）',
      '权力与安全': '权力是安全的手段也是目标；均势是秩序的基础',
      '合作前景': '合作可能但脆弱，受相对收益与欺诈担忧制约',
      '代表学者': '修昔底德、摩根索、沃尔兹、米尔斯海默',
      '主要局限': '难以解释合作深化、跨国行为体与观念变化'
    },
    '自由主义': {
      '核心问题': '在相互依赖世界中合作与制度如何可能',
      '行为假设': '国家偏好多元，制度与国内结构会影响行为',
      '体系性质': '无政府但可被制度、互赖与规范所缓和',
      '主要行为体': '国家、国际制度、跨国行为体',
      '权力与安全': '军事权力的重要性下降，经济与制度权力上升',
      '合作前景': '制度降低交易成本与不确定性，合作可持续',
      '代表学者': '洛克、康德、基欧汉、奈伊',
      '主要局限': '对权力不平等与制度背后的支配关系关注不足'
    },
    '建构主义': {
      '核心问题': '身份、规范与观念如何建构国际政治',
      '行为假设': '行为体的身份与利益并非给定，而是被建构的',
      '体系性质': '无政府状态本身是国家间互动建构的结果',
      '主要行为体': '国家，也包括规范企业家、跨国网络',
      '权力与安全': '权力不仅是物质能力，更是意义与规范的塑造能力',
      '合作前景': '当共享规范与身份形成时，合作可超越纯粹利益计算',
      '代表学者': '温特、芬尼莫尔、卡赞斯坦',
      '主要局限': '对物质约束的解释力较弱，规范性判断较难检验'
    },
    '英国学派': {
      '核心问题': '无政府状态中为何仍存在秩序与国际社会',
      '行为假设': '国家既追求权力，也受共同规范与制度约束',
      '体系性质': '国际体系之上还存在「国际社会」',
      '主要行为体': '国家构成的「国家社会」',
      '权力与安全': '秩序来自权力平衡与共同规范的双重支撑',
      '合作前景': '共享的文明标准与制度提供合作基础',
      '代表学者': '怀特、布尔、文特',
      '主要局限': '欧洲中心主义色彩，规范的标准由谁界定存在争议'
    },
    '马克思主义': {
      '核心问题': '国际政治中的不平等与支配关系从何而来',
      '行为假设': '国家行为受生产方式、阶级利益与资本逻辑塑造',
      '体系性质': '资本主义世界体系，中心与边缘结构不平等',
      '主要行为体': '阶级、资本、国家与世界体系整体',
      '权力与安全': '经济结构决定政治权力，安全服务于生产关系',
      '合作前景': '合作受制于结构性不平等，本质上是支配关系',
      '代表学者': '马克思、列宁、沃勒斯坦、弗兰克',
      '主要局限': '经济决定论倾向，对国家自主性与观念因素估计不足'
    },
    '海权论': {
      '核心问题': '海上交通与海军力量如何决定国家命运',
      '行为假设': '控制海洋通道的能力是国家权力的关键变量',
      '体系性质': '海洋空间是战略竞争的主要场域',
      '主要行为体': '拥有远洋海军与海上贸易的国家',
      '权力与安全': '制海权来自舰队、基地、航运与地理区位的组合',
      '合作前景': '海上秩序通常由主导海权国家提供',
      '代表学者': '马汉、科贝特',
      '主要局限': '对陆权国家与陆上生产能力的解释力有限'
    },
    '陆权论': {
      '核心问题': '大陆腹地是否决定全球战略格局',
      '行为假设': '大陆腹地的资源与纵深赋予陆权国家长期优势',
      '体系性质': '世界岛的心脏地带是全球权力的枢纽',
      '主要行为体': '控制欧亚大陆腹地的陆权大国',
      '权力与安全': '战略纵深、资源自给与铁路网络构成陆权基础',
      '合作前景': '边缘地带的海陆竞争决定秩序走向',
      '代表学者': '麦金德、 Haushofer（批判性看待）',
      '主要局限': '地理决定论色彩，低估技术、制度与观念的作用'
    }
  };
  function labTheory(stage) {
    var names = Object.keys(THEORY_DATA);
    var picker = '<div class="cmp-picker" style="border-bottom:1px solid rgba(200,164,92,.14)">' +
      names.map(function (n, i) { return '<button data-t="' + n + '" class="' + (i < 2 ? 'on' : '') + '">' + n + '</button>'; }).join('') +
      '<span style="align-self:center;margin-left:10px;font-size:11px;color:#8ba3b4">最多同时比较 3 项</span></div><div id="cmpOut" style="overflow-x:auto"></div>';
    stage.insertAdjacentHTML('afterbegin', picker);
    var selected = names.slice(0, 2);
    function draw() {
      var dims = Object.keys(THEORY_DATA[selected[0]]);
      var html = '<table class="tcomp"><thead><tr><th>比较维度</th>' + selected.map(function (n) { return '<th>' + n + '</th>'; }).join('') + '</tr></thead><tbody>' +
        dims.map(function (d) {
          return '<tr><th>' + d + '</th>' + selected.map(function (n) { return '<td>' + THEORY_DATA[n][d] + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table>';
      document.getElementById('cmpOut').innerHTML = html;
    }
    draw();
    stage.querySelectorAll('.cmp-picker button').forEach(function (b) {
      b.onclick = function () {
        var t = b.getAttribute('data-t');
        if (b.classList.contains('on')) {
          if (selected.length <= 1) return;
          b.classList.remove('on'); selected = selected.filter(function (x) { return x !== t; });
        } else {
          if (selected.length >= 3) return;
          b.classList.add('on'); selected.push(t);
        }
        draw();
      };
    });
  }

  /* ---------------- 4. 历史时间轴 ---------------- */
  var EVENTS = [
    { y: '1648', t: '威斯特伐利亚和约', d: '确立主权国家平等与不干涉内政的原则，被视为现代国际体系的起点。' },
    { y: '1815', t: '维也纳体系', d: '拿破仑战争后的欧洲协调机制，是均势原则制度化的一次重要实践。' },
    { y: '1914', t: '第一次世界大战', d: '联盟体系、军备竞赛与决策误判叠加，欧洲均势体系崩溃。' },
    { y: '1919', t: '巴黎和会与国际联盟', d: '威尔逊主义制度化尝试；集体安全理念诞生但美国未加入。' },
    { y: '1939', t: '第二次世界大战', d: '集体安全失败与绥靖政策的后果，全球力量格局彻底重组。' },
    { y: '1945', t: '联合国成立', d: '以安理会为核心的集体安全机制建立，大国一致原则写入宪章。' },
    { y: '1947', t: '冷战开始', d: '杜鲁门主义与马歇尔计划标志美苏对抗全面展开，两极结构形成。' },
    { y: '1949', t: '北约成立', d: '美国北大西洋联盟体系形成，遏制战略获得制度载体。' },
    { y: '1962', t: '古巴导弹危机', d: '核时代最危险的危机之一，危机管理与威慑逻辑的经典案例。' },
    { y: '1971', t: '中国恢复联合国合法席位', d: '国际格局变化在制度层面的重要体现。' },
    { y: '1991', t: '苏联解体', d: '两极结构终结，国际体系进入一超多强与全球化加速阶段。' },
    { y: '1993', t: '欧盟正式成立', d: '区域一体化从经济合作走向政治与制度整合。' },
    { y: '2001', t: '九一一事件与阿富汗战争', d: '非国家行为体的暴力成为全球安全议程的核心议题。' },
    { y: '2003', t: '伊拉克战争', d: '围绕大规模杀伤性武器与合法性的争议，暴露国际制度的约束边界。' },
    { y: '2008', t: '全球金融危机', d: '金融相互依赖的风险显现，G20 机制地位上升。' },
    { y: '2013', t: '「一带一路」倡议提出', d: '基础设施互联互通成为经济外交与地缘影响的重要工具。' },
    { y: '2022', t: '俄乌冲突爆发', d: '冷战后欧洲安全架构遭遇重大冲击，能源、制裁与联盟政治重新交织。' }
  ];
  function labTimeline(stage) {
    var html = '<div class="timeline"><div class="tl-line"></div>' + EVENTS.map(function (e, i) {
      return '<div class="tl-item"><div class="tl-dot" data-i="' + i + '"></div><div class="tl-card" data-i="' + i + '">' +
        '<div class="tl-year">' + e.y + '</div><h4>' + e.t + '</h4><p>' + e.d + '</p></div></div>';
    }).join('') + '</div>';
    stage.insertAdjacentHTML('afterbegin', html);
    stage.querySelectorAll('.tl-card').forEach(function (c) {
      c.onclick = function (e) { var v = EVENTS[+c.getAttribute('data-i')]; showInfo(e, v.y + ' · ' + v.t, v.d, '时间轴节点 · 点击空白处或右上角关闭'); };
    });
  }

  /* ---------------- 5. 地缘分析工具 ---------------- */
  var GEO = {
    '美国': { s: [5, 4, 5, 5, 5], t: '两洋屏障提供了极高的本土安全冗余；全球海军与联盟网络把海洋优势转化为投送能力。其地缘弱项在于距离主要潜在战场较远，长期投射需要庞大的基地与后勤体系支撑。' },
    '中国': { s: [4, 4, 3, 4, 4], t: '陆海复合型国家：西部有大陆纵深，东部面向海洋。海洋方向是战略资源与贸易通道所在，也是主要压力来源；周边地理条件复杂，需要同时处理陆上与海上两类议题。' },
    '俄罗斯': { s: [5, 5, 2, 5, 3], t: '拥有巨大的战略纵深与资源自给能力，是典型陆权国家。海洋出海口受限且不连续，使其长期寻求暖水港与陆上缓冲区；铁路与能源管道是维系腹地整合的关键。' },
    '印度': { s: [4, 3, 4, 3, 4], t: '印度洋中部的突出位置赋予其区域主导潜力；北部山地构成天然屏障也限制了陆上投送。人口规模与海洋区位是长期资产，但基础设施与工业能力制约了潜力转化。' },
    '德国': { s: [3, 3, 3, 3, 5], t: '位于欧洲中部的「十字路口」位置，既是经济与交通优势，也是战略上的脆弱性。地处海陆之间，安全政策长期在依赖海洋盟友与维持大陆平衡之间摆动。' },
    '日本': { s: [2, 3, 5, 2, 4], t: '岛国地形提供天然防御，但资源高度依赖海上进口，使海上交通线成为生命线。其战略逻辑更接近马汉传统：制海权直接关系到经济生存。' },
    '伊朗': { s: [4, 4, 3, 4, 5], t: '波斯湾与内陆之间的枢纽位置，加上霍尔木兹海峡的邻近性，使其具备不对称的通道影响力。山地地形提供防御纵深，但区域经济整合程度有限。' },
    '巴西': { s: [3, 4, 3, 5, 2], t: '南美大陆的核心国家，资源丰富、地形多样，亚马逊构成巨大而难以治理的内部空间。远离全球主要冲突区，战略压力低，但投送能力有限。' }
  };
  var DIMS = ['地理位置', '地形纵深', '海洋条件', '资源禀赋', '通道控制'];
  function labGeo(stage) {
    var inner = '<div class="geo-panel"><div class="geo-controls">' +
      '<label>选择分析对象</label><select id="geoCountry">' + Object.keys(GEO).map(function (n) { return '<option>' + n + '</option>'; }).join('') + '</select>' +
      '<label>分析视角</label><select id="geoLens"><option>海权理论（马汉）</option><option>陆权理论（麦金德）</option><option>边缘地带（斯皮克曼）</option><option>综合地缘分析</option></select>' +
      '<label>关注维度</label><input id="geoFocus" placeholder="例如：能源通道 / 战略纵深" value="战略纵深">' +
      '<button id="geoRun">生成分析框架</button>' +
      '<p style="font-size:11px;color:#8ba3b4;line-height:1.7;margin-top:18px">教学工具：评分是对地理条件的课程性概括，用于练习分析思路，不构成对现实局势的预测或政策判断。</p>' +
      '</div><div class="geo-result" id="geoResult"><h3>地缘分析框架</h3><p style="color:#8ba3b4;font-size:13px">选择国家与视角后点击「生成分析框架」，工具将从五个地理维度展示条件，并给出对应的分析提示。</p></div></div>';
    stage.insertAdjacentHTML('afterbegin', inner);
    document.getElementById('geoRun').onclick = function () {
      var n = document.getElementById('geoCountry').value, lens = document.getElementById('geoLens').value, focus = document.getElementById('geoFocus').value || '所选维度';
      var g = GEO[n];
      var bars = DIMS.map(function (d, i) {
        return '<div class="gauge-row"><div class="gr-top"><span>' + d + '</span><span>' + g.s[i] + ' / 5</span></div><div class="gauge"><span style="width:' + (g.s[i] * 20) + '%"></span></div></div>';
      }).join('');
      var lensNote = {
        '海权理论（马汉）': '用海权视角看，重点看该国能否控制关键海上交通线、是否拥有足够海军与海外基地，以及航运对其经济存续的重要程度。',
        '陆权理论（麦金德）': '用陆权视角看，重点看该国的腹地纵深、资源自给能力与陆上交通网络，判断其在世界岛中的结构性位置。',
        '边缘地带（斯皮克曼）': '用边缘地带视角看，重点看该国是否位于欧亚沿海的竞争前沿，以及海陆力量在此如何交汇。',
        '综合地缘分析': '综合视角要求同时考虑地理条件、技术变化与制度选择；地理给出长期约束，但不决定具体政策。'
      }[lens];
      document.getElementById('geoResult').innerHTML = '<h3>' + n + ' · ' + lens + '</h3>' + bars +
        '<div class="geo-verdict"><b style="color:#e2c68d">地理条件</b><br>' + g.t + '</div>' +
        '<div class="geo-verdict" style="border-left-color:#4f7f9c"><b style="color:#8ba3b4">分析提示</b><br>' + lensNote + ' 本轮关注：<em style="color:#e2c68d">' + esc(focus) + '</em>。下一步应补充历史、政治制度与对外关系三个维度的资料，再形成判断。</div>';
    };
  }

  /* ---------------- 6. 国际组织关系图 ---------------- */
  var ORGS = [
    { n: '联合国', x: 380, y: 70, r: 32, c: '#c8a45c', d: '1945 年成立，总部纽约。以安理会为核心的集体安全机制，是最具普遍性的国际组织。' },
    { n: '北约', x: 190, y: 180, r: 26, c: '#5f8ba8', d: '1949 年成立，总部布鲁塞尔。北美与欧洲的军事同盟，冷战遏制战略的制度载体。' },
    { n: '欧盟', x: 360, y: 200, r: 28, c: '#3d736b', d: '1993 年正式成立，总部布鲁塞尔。从经济一体化走向政治与规范整合的区域组织。' },
    { n: '东盟', x: 590, y: 220, r: 25, c: '#a8794a', d: '1967 年成立，总部雅加达。东南亚区域合作机制，以协商与不干涉为特点。' },
    { n: '非盟', x: 400, y: 330, r: 23, c: '#8a7142', d: '2002 年成立，总部亚的斯亚贝巴。非洲区域整合与冲突调解的主要平台。' },
    { n: '金砖国家', x: 620, y: 350, r: 24, c: '#a8544a', d: '新兴经济体合作机制，聚焦经济协调与全球治理改革诉求，不是军事同盟。' },
    { n: '上合组织', x: 550, y: 90, r: 22, c: '#6d8798', d: '2001 年成立，聚焦欧亚地区安全与经贸合作，强调成员国间的协商一致。' },
    { n: 'WTO', x: 170, y: 330, r: 21, c: '#7fa6a0', d: '1995 年成立，总部日内瓦。以规则为基础的多边贸易体制，争端解决机制是其核心。' },
    { n: 'G20', x: 190, y: 65, r: 21, c: '#9a8f6a', d: '1999 年成立，非正式论坛。在全球金融危机后成为宏观经济协调的主要平台。' }
  ];
  var OEDGES = [[0, 1, '伙伴'], [0, 3, '合作'], [0, 4, '合作'], [0, 7, '专门机构关联'], [1, 2, '安全协作'], [2, 7, '贸易规则'], [3, 6, '区域协作'], [4, 5, '经济合作'], [5, 6, '战略协作'], [0, 10 - 1, '协调']];
  function labOrgs(stage) {
    var edges = OEDGES.map(function (e) {
      var a = ORGS[e[0]], b = ORGS[e[1]]; if (!b) return '';
      return '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="#7fa6a0" stroke-width="1.2" stroke-opacity=".5"/>';
    }).join('');
    var nodes = ORGS.map(function (n, i) {
      return '<g class="hot" data-i="' + i + '"><circle cx="' + n.x + '" cy="' + n.y + '" r="' + (n.r + 6) + '" fill="none" stroke="' + n.c + '" stroke-width=".7" opacity=".45"/>' +
        '<circle cx="' + n.x + '" cy="' + n.y + '" r="' + n.r + '" fill="#0f2133" stroke="' + n.c + '" stroke-width="2"/>' +
        '<text x="' + n.x + '" y="' + (n.y + 4) + '" fill="#f5f0e4" font-size="11.5" text-anchor="middle" font-family="sans-serif">' + n.n + '</text></g>';
    }).join('');
    stage.insertAdjacentHTML('afterbegin', '<svg viewBox="0 0 780 410" role="img" aria-label="国际组织关系示意图"><rect width="780" height="410" fill="#0c1b2a"/>' + edges + nodes + '</svg>');
    stage.querySelectorAll('.hot').forEach(function (g) {
      g.onclick = function (e) { var n = ORGS[+g.getAttribute('data-i')]; showInfo(e, n.n, n.d, '国际组织索引 · 相关章节见课程体系'); };
    });
    stage.insertAdjacentHTML('beforeend', '<div class="legend"><span style="color:#8ba3b4">连线表示议题协作或制度关联，不代表隶属关系；点击任一组织查看说明</span></div>');
  }

  /* ---------------- 路由接入 ---------------- */
  IR.renderLab = function (app, id) {
    var l = C.labs.find(function (x) { return x.id === id; });
    if (!l) { app.innerHTML = '<section class="page-head"><div class="section-shell"><h1>未找到该工具</h1><a class="btn" href="#/lab">返回实验室</a></div></section>'; return; }
    var notes = {
      map: '地图为教学示意图，大陆轮廓经过高度简化，标注位置用于说明战略通道的相对区位，不作为精确地理数据使用。',
      power: '关系连线是对长期结构性趋势的概括性表达，不对应当天或某一具体时点的官方关系定性。理解国际关系时，务必区分结构趋势与具体政策。',
      theory: '比较表中的「局限」不是对理论的否定，而是界定其解释范围。成熟的分析者会根据问题选择合适的理论，或同时使用多个视角。',
      timeline: '时间轴只列出具有结构性意义的节点。历史不是单线因果链，每个事件都包含多种可能路径。',
      geo: '地理条件是长期变量，不是命运。技术、制度与政策选择可以改变地理条件的战略含义。',
      orgs: '国际组织之间的关系多为议题协作，而非上下级隶属。理解组织时，应同时看其章程、实际运作与大国影响。'
    };
    var base = header(l) + shell('', notes[id] || '');
    app.innerHTML = base;
    var stage = app.querySelector('.lab-stage');
    ({ map: labMap, power: labPower, theory: labTheory, timeline: labTimeline, geo: labGeo, orgs: labOrgs })[id](stage);
  };
})();
