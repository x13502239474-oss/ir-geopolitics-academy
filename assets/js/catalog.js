/* 国际关系与地缘政治研究院 — 课程总目录（单一元数据源） */
(function () {
  'use strict';

  var PARTS = [
    {
      id: 1, code: 'PART I', title: '国际关系学基础', en: 'Foundations of International Relations',
      desc: '从最根本的问题出发：国际关系研究什么？国家、主权、权力、利益、战争与秩序这些词汇究竟意味着什么？本部分建立全课程的概念地基。',
      range: [1, 8], accent: '#c8a45c'
    },
    {
      id: 2, code: 'PART II', title: '国际关系主要理论', en: 'Major Theories of International Relations',
      desc: '现实主义、自由主义、建构主义……理论不是空谈，而是不同的「观察眼镜」。本部分逐一戴上每副眼镜，看清它们能看见什么、看不见什么。',
      range: [9, 16], accent: '#9fb8c4'
    },
    {
      id: 3, code: 'PART III', title: '国际关系研究方法', en: 'Research Methods',
      desc: '从「有观点」走向「能论证」：历史比较、定量与定性、因果推断。本部分训练把直觉变成可检验命题的能力。',
      range: [17, 21], accent: '#8fae9e'
    },
    {
      id: 4, code: 'PART IV', title: '国际政治的主要领域', en: 'Core Issue Areas',
      desc: '安全、核武器、国际组织、国际法、国际政治经济、全球化、能源与非传统安全——国际政治在现实世界中展开的七个主要战场。',
      range: [22, 30], accent: '#b98f6a'
    },
    {
      id: 5, code: 'PART V', title: '地缘政治学基础', en: 'Foundations of Geopolitics',
      desc: '地理不是背景板，而是塑造国家战略的长期变量。本部分讲清海权、陆权、边缘地带等经典地缘理论，以及地理如何进入权力计算。',
      range: [31, 39], accent: '#a8b98f'
    },
    {
      id: 6, code: 'PART VI', title: '全球地缘战略格局', en: 'Global Strategic Landscape',
      desc: '把理论放到世界地图上：欧洲、欧亚、印太、中东、非洲、北极。本部分逐一分析各战略区域的地理条件、力量结构与竞争逻辑。',
      range: [40, 50], accent: '#c19a72'
    },
    {
      id: 7, code: 'PART VII', title: '国际关系综合分析', en: 'Applied Analysis',
      desc: '从学习者变为分析者：用一套可复用的框架，系统分析战争、战略竞争、同盟、制裁、危机与地区冲突，并逐步建立你自己的分析工具箱。',
      range: [51, 57], accent: '#d0b078'
    }
  ];

  /* 每章：id / part / title / en / brief / keywords / ready */
  var LESSONS = [
    { id: 1,  part: 1, title: '国际关系学的研究对象与发展历史', en: 'The Study of International Relations', brief: '界定学科边界：国际关系研究什么、不研究什么，以及它如何在战争与和平的追问中形成一门独立学科。', keywords: ['学科边界', '国际关系史', '威尔逊', '现实主义转向'], ready: true },
    { id: 2,  part: 1, title: '国际体系、国际社会与国际秩序', en: 'System, Society and Order', brief: '区分「体系」「社会」「秩序」三个常被混用的概念，理解无政府状态为何不等于混乱。', keywords: ['无政府状态', '国际社会', '英国学派', '秩序'], ready: false },
    { id: 3,  part: 1, title: '国家、主权与民族国家体系', en: 'State, Sovereignty and the Nation-State', brief: '追溯主权概念从博丹到威斯特伐利亚的演变，解析主权的内外两面与当代争议。', keywords: ['主权', '威斯特伐利亚', '民族国家', '承认'], ready: false },
    { id: 4,  part: 1, title: '国家利益、国家权力与国家战略', en: 'Interest, Power and Strategy', brief: '拆解「国家利益」这一核心概念，说明权力如何被定义、测量，又如何转化为战略。', keywords: ['国家利益', '国家权力', '战略', '国力要素'], ready: false },
    { id: 5,  part: 1, title: '国际政治中的权力分配', en: 'Distribution of Power', brief: '从多极、两极到一超多强，理解权力结构如何影响战争概率与体系稳定。', keywords: ['极', '均势', '权力转移', '霸权'], ready: false },
    { id: 6,  part: 1, title: '外交、外交政策与国家决策', en: 'Diplomacy and Foreign Policy', brief: '外交作为沟通与博弈的机制，决策中的理性模型、官僚政治与小集团思维。', keywords: ['外交', '外交政策', '决策模型', '官僚政治'], ready: false },
    { id: 7,  part: 1, title: '战争、冲突与和平', en: 'War, Conflict and Peace', brief: '为什么战争反复发生？从战争原因的层次分析到和平建设的路径。', keywords: ['战争原因', '冲突解决', '和平研究', '安全困境'], ready: false },
    { id: 8,  part: 1, title: '国际合作与国际竞争', en: 'Cooperation and Competition', brief: '在无政府状态下合作何以可能：囚徒困境、重复博弈、制度与信任。', keywords: ['囚徒困境', '合作', '制度', '相互依赖'], ready: false },

    { id: 9,  part: 2, title: '现实主义理论', en: 'Realism', brief: '国际政治的第一种系统理论：无政府、国家中心、权力政治。读懂现实主义，就读懂了国际关系学的一半。', keywords: ['现实主义', '无政府状态', '权力政治', '均势'], ready: true },
    { id: 10, part: 2, title: '古典现实主义与新现实主义', en: 'Classical and Structural Realism', brief: '从修昔底德、摩根索到沃尔兹：人性现实主义与结构现实主义的根本分歧及其解释力。', keywords: ['摩根索', '沃尔兹', '结构现实主义', '防御性现实主义'], ready: false },
    { id: 11, part: 2, title: '自由主义与新自由制度主义', en: 'Liberalism and Neoliberal Institutionalism', brief: '从洛克、康德到基欧汉：制度、相互依赖与民主如何改变合作的可能性。', keywords: ['自由主义', '新自由制度主义', '复合相互依赖', '制度'], ready: false },
    { id: 12, part: 2, title: '建构主义理论', en: 'Constructivism', brief: '「无政府状态是国家建构出来的」——观念、身份、规范如何塑造国际政治，以及温特的经典论断。', keywords: ['建构主义', '身份', '规范', '温特'], ready: false },
    { id: 13, part: 2, title: '英国学派', en: 'The English School', brief: '介于现实主义与自由主义之间：国际社会、文明标准与国际秩序的多元视角。', keywords: ['英国学派', '怀特', '布尔', '国际社会'], ready: false },
    { id: 14, part: 2, title: '马克思主义与批判理论', en: 'Marxism and Critical Theory', brief: '从生产方式、阶级与不平等出发，追问国际体系中的权力与支配关系。', keywords: ['马克思主义', '依附理论', '批判理论', '世界体系'], ready: false },
    { id: 15, part: 2, title: '女性主义与后殖民主义国际关系理论', en: 'Feminist and Postcolonial IR', brief: '谁被传统理论排除在外？性别、种族与殖民遗产如何重塑我们对国际政治的理解。', keywords: ['女性主义', '后殖民主义', '性别', '边缘声音'], ready: false },
    { id: 16, part: 2, title: '国际关系理论的比较与应用', en: 'Comparing and Applying Theories', brief: '把各理论放在同一张表格上比较核心假设、解释范围与盲区，建立「多视角合参」的分析习惯。', keywords: ['理论比较', '范式', '多视角', '解释力'], ready: false },

    { id: 17, part: 3, title: '国际关系研究的基本方法', en: 'Research Methods in IR', brief: '问题意识、文献综述、假设与验证——从读者变为研究者的方法论起点。', keywords: ['研究设计', '假设', '文献综述', '方法论'], ready: false },
    { id: 18, part: 3, title: '历史分析与比较研究', en: 'Historical and Comparative Analysis', brief: '案例选择、过程追踪与比较逻辑：如何从历史中提炼可迁移的洞见。', keywords: ['比较研究', '过程追踪', '案例选择', '密尔方法'], ready: false },
    { id: 19, part: 3, title: '定量研究与定性研究', en: 'Quantitative and Qualitative Methods', brief: '两种不同的研究传统各自回答什么问题，数据与访谈如何各自证成结论。', keywords: ['定量研究', '定性研究', '数据', '混合方法'], ready: false },
    { id: 20, part: 3, title: '国际关系中的因果关系分析', en: 'Causal Inference', brief: '相关不等于因果：反事实、机制与混淆变量，如何更审慎地谈论「因为」。', keywords: ['因果推断', '反事实', '机制', '内生性'], ready: false },
    { id: 21, part: 3, title: '如何使用国际关系理论分析国际事件', en: 'Applying Theory to Events', brief: '把抽象理论落到具体事件上的操作步骤：选问题、选理论、找证据、下判断。', keywords: ['理论应用', '分析框架', '证据', '审慎判断'], ready: false },

    { id: 22, part: 4, title: '国际安全与国家安全', en: 'International and National Security', brief: '安全研究的核心问题：安全是什么、谁的安全、如何实现，以及「安全化」的意义。', keywords: ['安全研究', '安全困境', '安全化', '综合安全'], ready: false },
    { id: 23, part: 4, title: '核武器、核威慑与军备控制', en: 'Nuclear Weapons and Deterrence', brief: '相互确保摧毁如何维持了「长和平」？核威慑的逻辑、条件与局限。', keywords: ['核威慑', 'MAD', '军备控制', '核不扩散'], ready: false },
    { id: 24, part: 4, title: '国际组织与联合国体系', en: 'International Organizations and the UN', brief: '国际组织为何存在、如何运作、权力从何而来，以及联合国体系的结构与改革争议。', keywords: ['国际组织', '联合国', '安理会', '合法性'], ready: false },
    { id: 25, part: 4, title: '国际法与国际制度', en: 'International Law and Institutions', brief: '国际法为何被遵守？条约、习惯、国际法院与制度设计的基本逻辑。', keywords: ['国际法', '国际制度', '条约', '合规'], ready: false },
    { id: 26, part: 4, title: '国际政治经济学', en: 'International Political Economy', brief: '谁得到什么、如何得到：贸易、货币、生产结构背后的权力与利益分配。', keywords: ['IPE', '政治经济', '霸权稳定', '国家利益'], ready: false },
    { id: 27, part: 4, title: '全球化与全球治理', en: 'Globalization and Global Governance', brief: '全球化的动力、波折与反弹，以及没有世界政府的治理如何可能。', keywords: ['全球化', '全球治理', '跨国行为体', '逆全球化'], ready: false },
    { id: 28, part: 4, title: '国际贸易、金融与经济制裁', en: 'Trade, Finance and Sanctions', brief: '从比较优势到货币权力：经济相互依赖如何既促进合作，又被用作施压工具。', keywords: ['国际贸易', '金融权力', '经济制裁', '相互依赖'], ready: false },
    { id: 29, part: 4, title: '国际能源政治', en: 'International Energy Politics', brief: '石油、天然气与电力如何塑造国家行为：资源禀赋、供应安全与能源转型的地缘后果。', keywords: ['能源安全', '石油', '能源转型', '资源政治'], ready: false },
    { id: 30, part: 4, title: '非传统安全与跨国问题', en: 'Non-Traditional Security', brief: '气候变化、公共卫生、网络与恐怖主义：当威胁跨越国界，传统安全框架如何调整。', keywords: ['非传统安全', '气候变化', '网络安全', '跨国威胁'], ready: false },

    { id: 31, part: 5, title: '地缘政治学的起源与发展', en: 'Origins of Geopolitics', brief: '从拉采尔到豪斯霍弗再到科恩：地缘政治学的学术脉络、政治争议与当代复兴。', keywords: ['地缘政治', '拉采尔', '生存空间', '科恩'], ready: false },
    { id: 32, part: 5, title: '地理环境与国家权力', en: 'Geography and National Power', brief: '位置、地形、气候、资源与距离：地理条件如何长期影响国家的战略选择。', keywords: ['地理环境', '自然屏障', '距离', '资源禀赋'], ready: false },
    { id: 33, part: 5, title: '海权理论与马汉', en: 'Sea Power and Mahan', brief: '《海权对历史的影响》的核心命题：海上交通、海军与国家利益如何相互塑造。', keywords: ['海权论', '马汉', '海上交通线', '决定性海战'], ready: true },
    { id: 34, part: 5, title: '陆权理论与麦金德', en: 'Land Power and Mackinder', brief: '「谁统治心脏地带，谁就统治世界岛」——麦金德命题的地理逻辑、历史语境与当代 validity。', keywords: ['陆权论', '麦金德', '心脏地带', '世界岛'], ready: true },
    { id: 35, part: 5, title: '边缘地带理论与斯皮克曼', en: 'Rimland and Spykman', brief: '对麦金德的修正：边缘地带才是关键——理解美国遏制战略的地理根源。', keywords: ['边缘地带', '斯皮克曼', '遏制', '欧亚大陆'], ready: false },
    { id: 36, part: 5, title: '地缘政治与战略缓冲区', en: 'Buffer Zones in Geopolitics', brief: '缓冲区为何存在、如何运作、何时失效：从历史案例看战略纵深的政治意义。', keywords: ['缓冲区', '战略纵深', '势力范围', '前沿防御'], ready: false },
    { id: 37, part: 5, title: '海洋、陆地、岛屿与战略通道', en: 'Seas, Islands and Chokepoints', brief: '海峡、运河、岛链与咽喉要道：地理节点如何成为全球战略的杠杆。', keywords: ['战略通道', '海峡', '岛链', '咽喉点'], ready: false },
    { id: 38, part: 5, title: '资源、能源与地缘竞争', en: 'Resources and Geopolitical Rivalry', brief: '资源诅咒、供应安全与争夺逻辑：从石油到关键矿产的资源地缘政治。', keywords: ['资源政治', '关键矿产', '供应安全', '资源诅咒'], ready: false },
    { id: 39, part: 5, title: '地缘政治中的人口、民族与宗教因素', en: 'Population, Ethnicity and Religion', brief: '人口结构、民族分布与宗教版图如何与地理空间叠加，形成长期政治张力。', keywords: ['人口地理', '民族', '宗教', '人口结构'], ready: false },

    { id: 40, part: 6, title: '欧洲地缘政治格局', en: 'European Geopolitics', brief: '从威斯特伐利亚到欧盟与俄乌冲突：欧洲这一「边缘地带」为何长期是大国竞争的焦点。', keywords: ['欧洲', '北约', '欧盟', '均势'], ready: false },
    { id: 41, part: 6, title: '俄罗斯与欧亚大陆战略', en: 'Russia and Eurasia', brief: '俄罗斯的地理困境与战略选择：心脏地带的继承者如何在东西之间寻找空间。', keywords: ['俄罗斯', '欧亚', '心脏地带', '战略纵深'], ready: false },
    { id: 42, part: 6, title: '美国的全球战略与海权体系', en: 'US Global Strategy and Sea Power', brief: '两洋屏障、海军优势与联盟网络：美国全球战略的地缘基础与岛链体系。', keywords: ['美国', '海权', '联盟网络', '印太'], ready: false },
    { id: 43, part: 6, title: '中国的地缘环境与周边战略', en: 'China and Its Strategic Environment', brief: '陆海复合国家的地缘条件、周边挑战与战略选择：从内陆边疆到海洋方向。', keywords: ['中国', '陆海复合', '周边战略', '一带一路'], ready: false },
    { id: 44, part: 6, title: '东亚与西太平洋地缘政治', en: 'East Asia and the Western Pacific', brief: '岛链、海峡与海上争议：西太平洋为何是全球地缘竞争最密集的区域之一。', keywords: ['东亚', '西太平洋', '岛链', '海上争端'], ready: false },
    { id: 45, part: 6, title: '南亚与印度洋战略', en: 'South Asia and the Indian Ocean', brief: '印度洋作为全球航运枢纽，南亚次大陆的力量结构与外部竞争的地理逻辑。', keywords: ['南亚', '印度洋', '印度', '海上通道'], ready: false },
    { id: 46, part: 6, title: '中东地缘政治与能源格局', en: 'Middle East and Energy', brief: '三洲五海之地：宗教、民族、能源与外部干预如何叠加成持续冲突。', keywords: ['中东', '能源', '宗教', '外部干预'], ready: false },
    { id: 47, part: 6, title: '非洲的地缘政治与大国竞争', en: 'Africa and Great-Power Competition', brief: '资源、人口与基础设施：非洲在全球战略中的角色变化与外部竞争的新形态。', keywords: ['非洲', '资源', '基础设施', '大国竞争'], ready: false },
    { id: 48, part: 6, title: '拉丁美洲与美国的地区影响力', en: 'Latin America and US Influence', brief: '门罗主义以来的美国地区战略、拉美的自主性追求与外部力量进入。', keywords: ['拉美', '门罗主义', '地区霸权', '美国'], ready: false },
    { id: 49, part: 6, title: '北极与全球战略通道', en: 'The Arctic and Strategic Routes', brief: '冰层消退带来的航道、资源与军事竞争：北极如何从边缘走向战略前沿。', keywords: ['北极', '航道', '资源', '军事竞争'], ready: false },
    { id: 50, part: 6, title: '全球大国竞争与国际秩序变化', en: 'Great-Power Rivalry and Order Change', brief: '权力转移、制度竞争与秩序之争：如何理解当前国际体系的结构性变化。', keywords: ['大国竞争', '权力转移', '国际秩序', '制度竞争'], ready: false },

    { id: 51, part: 7, title: '如何分析一场国际战争', en: 'Analyzing an International War', brief: '以层次分析为骨架，把战争的起因、进程与后果拆成可逐项验证的问题清单。', keywords: ['战争分析', '层次分析', '案例', '因果'], ready: false },
    { id: 52, part: 7, title: '如何分析国家之间的战略竞争', en: 'Analyzing Strategic Rivalry', brief: '区分结构压力与政策选择：竞争如何开始、升级、管理与缓和。', keywords: ['战略竞争', '安全困境', '信号', '危机管理'], ready: false },
    { id: 53, part: 7, title: '如何分析国际联盟与军事同盟', en: 'Analyzing Alliances', brief: '同盟为何形成、如何维持、何时解体：从均势逻辑到「牵连与抛弃」困境。', keywords: ['同盟', '均势', '北约', '联盟管理'], ready: false },
    { id: 54, part: 7, title: '如何分析国际制裁与经济博弈', en: 'Analyzing Sanctions', brief: '制裁的目标、机制与实际效果：经济施压何时奏效、何时反噬。', keywords: ['经济制裁', '金融权力', '博弈', '效果评估'], ready: false },
    { id: 55, part: 7, title: '如何分析地区冲突与代理人战争', en: 'Analyzing Proxy Wars', brief: '外部力量如何通过代理人竞争，以及地区冲突为何难以结束。', keywords: ['代理人战争', '地区冲突', '外部干预', '和平谈判'], ready: false },
    { id: 56, part: 7, title: '如何分析国际危机与外交决策', en: 'Analyzing Crises and Decision-Making', brief: '以古巴导弹危机为范本，练习在时间压力下识别信息、选项与误判。', keywords: ['危机管理', '外交决策', '古巴导弹危机', '误判'], ready: false },
    { id: 57, part: 7, title: '如何建立自己的国际关系分析框架', en: 'Building Your Own Framework', brief: '把全课程的视角整合成一套个人可用的检查清单与判断习惯。', keywords: ['分析框架', '综合', '多视角', '独立判断'], ready: false }
  ];

  /* 理论索引 */
  var THEORIES = [
    { name: '现实主义', lesson: 9, tag: '权力政治', core: '无政府状态下国家以权力与安全为首要目标' },
    { name: '古典现实主义', lesson: 10, tag: '人性', core: '政治受人性中权力欲望的驱动' },
    { name: '结构现实主义', lesson: 10, tag: '体系', core: '国际体系结构决定国家行为' },
    { name: '新自由制度主义', lesson: 11, tag: '制度', core: '制度降低交易成本、促进合作' },
    { name: '复合相互依赖', lesson: 11, tag: '相互依赖', core: '多渠道联系使军事力量作用下降' },
    { name: '建构主义', lesson: 12, tag: '观念', core: '身份与规范建构利益，无政府是文化的产物' },
    { name: '英国学派', lesson: 13, tag: '国际社会', core: '无政府状态中仍存在共享规范与秩序' },
    { name: '马克思主义', lesson: 14, tag: '生产', core: '经济结构与阶级关系塑造国际政治' },
    { name: '女性主义', lesson: 15, tag: '性别', core: '揭示国际政治中的性别化权力关系' },
    { name: '后殖民主义', lesson: 15, tag: '殖民遗产', core: '质疑西方中心的知识与权力结构' },
    { name: '海权论', lesson: 33, tag: '海洋', core: '控制海上交通线是全球权力的关键' },
    { name: '陆权论', lesson: 34, tag: '心脏地带', core: '欧亚大陆腹地是全球战略的枢纽' },
    { name: '边缘地带论', lesson: 35, tag: '边缘地带', core: '欧亚沿岸地带才是海陆竞争的关键区域' }
  ];

  /* 全球地缘区域索引 */
  var REGIONS = [
    { name: '欧洲', lesson: 40, en: 'EUROPE', note: '多极均势的历史发源地与当代前沿' },
    { name: '俄罗斯与欧亚', lesson: 41, en: 'EURASIA', note: '心脏地带继承者的战略空间' },
    { name: '北美与全球海权', lesson: 42, en: 'NORTH AMERICA', note: '两洋屏障与海洋联盟体系' },
    { name: '中国与周边', lesson: 43, en: 'CHINA', note: '陆海复合国家的地缘转型' },
    { name: '东亚与西太平洋', lesson: 44, en: 'EAST ASIA', note: '岛链、海峡与海上竞争密集区' },
    { name: '南亚与印度洋', lesson: 45, en: 'INDIAN OCEAN', note: '全球航运枢纽与新兴竞争场' },
    { name: '中东', lesson: 46, en: 'MIDDLE EAST', note: '能源、宗教与外部干预叠加区' },
    { name: '非洲', lesson: 47, en: 'AFRICA', note: '资源、人口与基础设施的新战场' },
    { name: '拉丁美洲', lesson: 48, en: 'LATIN AMERICA', note: '美国后院与自主性追求' },
    { name: '北极', lesson: 49, en: 'ARCTIC', note: '航道、资源与军事竞争的新前沿' }
  ];

  /* 案例库索引（facts=已确认事实 / stances=各方立场 / analysis=分析判断） */
  var CASES = [
    { id:'c01', title:'第一次世界大战', era:'1914–1918', cat:'战争与体系崩溃', lessons:[5,7,40], brief:'均势体系为何未能阻止大战？结构性压力、联盟机制与决策误判的叠加。' },
    { id:'c02', title:'第二次世界大战', era:'1939–1945', cat:'战争与体系崩溃', lessons:[5,10,40], brief:'集体安全的失败、绥靖政策的逻辑与全球秩序的重建。' },
    { id:'c03', title:'冷战与美苏竞争', era:'1947–1991', cat:'大国竞争', lessons:[5,9,42], brief:'两极结构、核威慑、代理人竞争与长期和平的悖论。' },
    { id:'c04', title:'古巴导弹危机', era:'1962', cat:'危机决策', lessons:[23,56], brief:'十三天里，信息、选项与误判如何把世界推到核战边缘。' },
    { id:'c05', title:'北约的建立与扩张', era:'1949至今', cat:'同盟与制度', lessons:[40,53], brief:'从遏制苏联到冷战后扩张：同盟的生命周期与「开放性」争议。' },
    { id:'c06', title:'苏联解体', era:'1991', cat:'体系变迁', lessons:[5,41], brief:'内部矛盾、改革失误与结构性压力如何共同导致一个超级大国的消失。' },
    { id:'c07', title:'海湾战争', era:'1990–1991', cat:'战争与国际制度', lessons:[24,51], brief:'联合国授权、 coalition 联盟与高技术战争的新形态。' },
    { id:'c08', title:'阿富汗战争', era:'2001–2021', cat:'战争与反叛乱', lessons:[51,55], brief:'反恐战争的初始目标、长期占领的困境与撤出的后果。' },
    { id:'c09', title:'伊拉克战争', era:'2003', cat:'战争与国际法', lessons:[25,51], brief:'大规模杀伤性武器争议、合法性危机与战后秩序重建的失败。' },
    { id:'c10', title:'俄乌冲突', era:'2022至今', cat:'地区冲突与大国竞争', lessons:[40,41,51], brief:'冷战后欧洲安全架构的危机；对进行中事件严格区分事实、立场与判断。' },
    { id:'c11', title:'巴以冲突', era:'1948至今', cat:'地区冲突', lessons:[39,46,55], brief:'领土、宗教、身份与外部干预长期叠加的复杂冲突。' },
    { id:'c12', title:'南海问题', era:'当代', cat:'海上争端', lessons:[37,44], brief:'岛礁主权、海洋权益与航行自由之争的地缘与法律维度。' },
    { id:'c13', title:'台海局势', era:'当代', cat:'海上争端与大国竞争', lessons:[43,44], brief:'两岸关系的内部维度与外部战略介入；区分已确认事实与各方立场。' },
    { id:'c14', title:'中美战略竞争', era:'当代', cat:'大国竞争', lessons:[42,43,50,52], brief:'权力转移、制度竞争与相互依赖武器化的多重博弈。' },
    { id:'c15', title:'一带一路与国际经济合作', era:'2013至今', cat:'经济外交', lessons:[26,38], brief:'基础设施互联互通的经济逻辑、地缘效应与可持续性争议。' },
    { id:'c16', title:'全球能源与贸易竞争', era:'当代', cat:'资源与贸易', lessons:[28,29,38], brief:'能源转型、供应链重组与经济制裁交织的新竞争形态。' }
  ];

  /* 六项交互工具 */
  var LABS = [
    { id:'map',      title:'全球战略地图',   en:'STRATEGIC MAP',      desc:'在地图上查看主要国家、战略通道与关键地缘区域的分布。', icon:'◎' },
    { id:'power',    title:'力量结构图',     en:'POWER STRUCTURE',    desc:'观察大国之间的联盟、竞争与冲突关系网络。', icon:'⟐' },
    { id:'theory',   title:'理论比较台',     en:'THEORY COMPARATOR',  desc:'并排比较各理论的核心假设、分析视角与局限。', icon:'⇄' },
    { id:'timeline', title:'历史时间轴',     en:'HISTORICAL TIMELINE',desc:'沿时间轴理解国际体系与重大事件的演变脉络。', icon:'⌁' },
    { id:'geo',      title:'地缘分析工具',   en:'GEO ANALYZER',       desc:'用位置、地形、海洋与通道等维度分析战略环境。', icon:'◇' },
    { id:'orgs',     title:'国际组织关系图', en:'ORGANIZATION MAP',   desc:'梳理联合国、北约、欧盟、东盟、金砖等组织的结构。', icon:'⊛' }
  ];

  window.IR_CATALOG = {
    parts: PARTS,
    lessons: LESSONS,
    theories: THEORIES,
    regions: REGIONS,
    cases: CASES,
    labs: LABS,
    getLesson: function (id) { return LESSONS.find(function (l) { return l.id === Number(id); }); },
    getPart: function (id) { return PARTS.find(function (p) { return p.id === Number(id); }); }
  };
})();
