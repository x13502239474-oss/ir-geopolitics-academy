# 国际关系与地缘政治研究院 — 项目维护说明

## 一、项目结构

```
index.html                  唯一入口，hash 路由 SPA
assets/css/style.css         全局视觉系统（战略研究机构风格 / 手机端优先）
assets/js/catalog.js         课程总目录（七部分57章 + 理论/区域/案例/工具索引）—— 单一元数据源
assets/js/core.js            核心引擎：路由、首页、目录、阅读器、世界地图 SVG
assets/js/interactive.js     六类交互工具
data/lessons/lesson-NN.js    各章正文（NN 为两位章节号）
research/                    教材 OCR 提取的原始资料档案
```

## 二、章节正文规范（扩充时必须遵守）

每个 `lesson-NN.js` 导出 `window.IR_LESSONS[N] = { id: N, modules: [...] }`，
`modules` 固定为 **10 个元素**，顺序与标题口径必须一致：

1. 本章导读：研究什么问题 + 在知识体系中的位置
2. 核心概念：所有重要概念，每个给定义 + 来源（用 `.concept-grid` / `.concept-card`）
3. 历史背景：理论/制度/现象产生的历史语境
4. 理论体系：主要观点、基本假设、逻辑结构、适用条件（用 `.mechanism` 分步）
5. 运行机制：背后的因果机制（用 `.mech-step`）
6. 代表学者：学者 + 主要观点（用 `.scholar`）
7. 经典案例：结合真实事件，多维分析（用 `.case-box` + `.tag-triad` 三分法）
8. 理论比较：不同学派/观点比较（用 `.cmp-scroll > .cmp-table`）
9. 现实应用：如何用于分析当代问题（给出可照做的分析清单）
10. 本章总结：核心逻辑 + 与后续章节的连接 + 延伸阅读

### 内容铁律
- 深度：本科高年级到研究生入门，重要理论必须展开，不得只列标题/关键词。
- 事实：只用已核实的事实与数据；涉及进行中事件，用 `tag-triad` 区分「已确认事实 / 各方立场 / 分析判断」。
- 版权：用原创语言重新组织讲解，不复制教材原文；引用注明出处。
- 措辞：口语化、避免学术腔；谨慎断语，用「倾向于／可以对应／较为吻合」级别表述。
- 正文中不得混入未经翻译的英文词（专有名词、书名、必要的英文术语括注除外）。

### 可用 HTML 组件类（style.css 已定义）
`concept-grid/concept-card`、`callout note/warn`、`mechanism/mech-step`、
`scholar`、`case-box/cb-head/cb-body`、`tag-triad(f/s/a)`、`cmp-scroll/cmp-table`、
`quote-block`、`ref-list`、`rt-keys` 等。

## 三、扩充新章步骤

1. 复制任一 `lesson-NN.js` 为模板，改写 `id` 与 10 个模块内容。
2. 在 `catalog.js` 的 `LESSONS` 中把该章 `ready` 改为 `true`。
3. 运行校验：`node --check data/lessons/lesson-NN.js`。
4. 浏览器访问 `#/lesson/NN` 确认十模块齐全、无横向溢出。

## 四、索引维护

`catalog.js` 中的 `THEORIES`（理论索引）、`REGIONS`（地缘区域索引）、
`CASES`（案例库）、`LABS`（交互工具）与章节号关联。新增内容时同步更新对应
`lesson` 字段，指向的章节须存在（校验脚本会检查引用有效性）。

## 五、视觉规范

配色：深海军蓝 `#0c1b2a` / 墨绿 `#1a3b38` / 暗金 `#c8a45c` / 米白 `#f5f0e4`。
正文阅读区用米白纸面 + 深色字，宽度约 640px（移动端自适应），行高 2.0。
单页正文不堆砌；交互工具服务知识学习，无无意义动画。

## 六、核心教材（用户提供的扫描版 PDF，已 OCR 提取目录档案于 research/）

1. 邢悦《国际关系学入门》（第二版）— 概念框架、问题意识、分析层次、克莱因方程、霍布斯文化
2. Jackson & Sørensen《国际关系学理论与方法》（第四版）— 理论图谱、三种思想传统、理论评价标准
3. Saul B. Cohen《地缘政治学：国际关系的地理学》— 麦金德世界三版本、心脏地带边界、破碎地带、地缘政治辖区

> 注：用户描述中提「第三版」，但实际提供文件为第二版，本站以第二版为准。
