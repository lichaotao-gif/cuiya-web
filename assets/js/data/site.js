/**
 * 站点结构与产品数据。
 * 文案与线上 cuiya.cn 保持一致，仅重组呈现方式。
 */

export const CONTACT = {
  email: 'contact@cuiya.cn',
  phone: '400-168-0260',
  icp: '蜀ICP备2021023754号-3',
  icpUrl: 'https://beian.miit.gov.cn',
};

const PRODUCT_CATALOG = [
  {
    slug: 'bingo-book',
    name: '缤果数字教材',
    tagline: '科技让知识更易得',
    sub: '为学生量身定制个性化学习方案',
    icon: '书',
    iconImg: '/assets/images/products/icon-bingo-book.png',
    blurb: 'AI 互动式数字教材，支撑立体化阅读与基于知识图谱的个性化学习。',
    keys: [
      { b: '新形态', s: 'AI互动式教材' },
      { b: '立体化', s: '阅读模式' },
      { b: '互动式', s: '学习体验' },
      { b: '智能化', s: '教学出版新生态' },
    ],
  },
  {
    slug: 'bingo-plus',
    name: '缤果融合出版',
    tagline: '科技让教育更有趣',
    sub: '让每个孩子的个性得到完美绽放',
    icon: '融',
    iconImg: '/assets/images/products/icon-bingo-plus.png',
    blurb: '依托出版社纸质出版物，纸数一体、故事化闯关式学习。',
    keys: [
      { b: '优质输出', s: '数字化高质量供给' },
      { b: '创新呈现', s: '技术重塑传统出版物' },
      { b: '双效俱佳', s: '纸数一体融合出版' },
      { b: '情景课堂', s: '故事化闯关式学习' },
    ],
  },
  {
    slug: 'bingo-live',
    name: '缤果空中课堂',
    tagline: '科技让教育更平等',
    sub: '为每个孩子提供创造和实现他们美好梦想的机会',
    icon: '课',
    iconImg: '/assets/images/products/icon-bingo-live.png',
    blurb: '严选优质师资线上实景实时授课，助教线下同步协作。',
    keys: [
      { b: '严选', s: '优质师资' },
      { b: '互动式', s: '教学内容' },
      { b: '浸入式', s: '教学模式' },
      { b: '云保护', s: '数据安全' },
    ],
  },
  {
    slug: 'bingo-mate',
    name: '缤果数字非遗',
    tagline: '科技让文化活起来',
    sub: '让孩子领略中华文化之美',
    icon: '遗',
    iconImg: '/assets/images/products/icon-bingo-mate.png',
    blurb: '非遗主题与经典名著融合，在动手制作中感受传统文化。',
    keys: [
      { b: '趣味化', s: '教学内容' },
      { b: '特色化', s: '非遗主题' },
      { b: '动手实践', s: '手工制作体验' },
      { b: '生动化', s: '经典名著重现' },
    ],
  },
  {
    slug: 'bingo-mate-app',
    name: '缤果学伴',
    visible: false,
    tagline: 'AI 陪伴每一次成长',
    sub: '面向教育的具身智能机器人，AI驱动的智能教师',
    icon: '伴',
    iconImg: '/assets/images/products/icon-bingo-mate-app.png',
    blurb: '融合先进教育科技，提供个性化陪伴与高效互动学习体验。',
    keys: [
      { b: '具身智能', s: '教育机器人' },
      { b: '多模态', s: '语音图像交互' },
      { b: '全情感', s: '成长陪护' },
      { b: '因材施教', s: '课后陪伴学习' },
    ],
  },
];

/** 暂未开放的产品保留资料，但不进入任何公开产品入口。 */
export const PRODUCTS = PRODUCT_CATALOG.filter((product) => product.visible !== false);

export const NAV = [
  { label: '首页', href: '/' },
  { label: '关于我们', href: '/about.html' },
  { label: '产品中心', href: '/products/bingo-book.html', panel: true },
  { label: '研究院', href: '/research.html' },
  { label: '媒体报道', href: '/news.html' },
  { label: '下载', href: '/download.html' },
];

/** 首页数据条 —— 数值均来自线上既有文案 */
export const STATS = [
  { val: 5, suffix: '家', label: '国有资本共同出资成立' },
  { val: 100, suffix: '+', label: '所学校提供课程支持' },
  { val: 4, suffix: '大', label: '核心产品线覆盖大中小学' },
  { val: 7, suffix: '类', label: '教学客户端全平台支持' },
];

export const CULTURE = [
  { name: '创新性', desc: '以创新性为引领，持续探索教育与科技结合的新范式。' },
  { name: '权威性', desc: '依托出版社与国有资本背景，保障内容科学权威。' },
  { name: '系统性', desc: '以科学系统性为保障，构建完整的产品与服务体系。' },
  { name: '严谨性', desc: '遵循学生成长规律与教育规律，严谨对待每一个细节。' },
];

export const RESOURCE_MATRIX = [
  { name: '出版内容', desc: '汇聚权威出版内容与优质知识资源。' },
  { name: '主流传媒', desc: '连接专业传播渠道与多元内容生态。' },
  { name: '广电网络', desc: '拓展数字内容在多场景中的触达能力。' },
  { name: '教育服务', desc: '深化学校场景、课程实施与教学服务。' },
  { name: '科技创新', desc: '以人工智能与数字技术驱动产品升级。' },
];
