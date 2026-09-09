/**
 * 资讯接口客户端。
 * 端点取自线上 /news 页实际请求，CORS 为 *，可直接前端调用。
 *
 * 线上原实现固定 page=1&limit=8 且无分页，导致 154 条新闻里只有 8 条能被看到。
 * 这里保留同一端点，改为真实分页。
 */

const ENDPOINT = 'https://admin.bingotalk.cn/Home/InformationApi/list';
const USE_FOR = 'CUIYA_MIDDLE_WEB';

export const TYPE = {
  news: 'CUIYA_NEWS',
  policy: 'CUIYA_POLICY',
};

/** 简单的内存缓存，避免同页重复请求 */
const cache = new Map();

/**
 * @param {'news'|'policy'} kind
 * @param {{page?:number, limit?:number}} opts
 * @returns {Promise<{count:number, list:Array}>}
 */
export async function fetchList(kind, { page = 1, limit = 12 } = {}) {
  const key = `${kind}:${page}:${limit}`;
  if (cache.has(key)) return cache.get(key);

  const url = `${ENDPOINT}?token=&page=${page}&limit=${limit}&use_for=${USE_FOR}&type=${TYPE[kind]}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`接口返回 ${res.status}`);

  const json = await res.json();
  if (!json || !json.data) throw new Error('接口返回结构异常');

  const out = {
    count: Number(json.data.count) || 0,
    list: (json.data.list || []).map(normalize),
  };
  cache.set(key, out);
  return out;
}

/** 按 id 取单条。接口无单条端点，故按页扫描定位。 */
export async function fetchOne(kind, id) {
  const target = String(id);
  const first = await fetchList(kind, { page: 1, limit: 50 });
  let hit = first.list.find((x) => String(x.id) === target);
  if (hit) return hit;

  const pages = Math.ceil(first.count / 50);
  for (let p = 2; p <= pages; p++) {
    const chunk = await fetchList(kind, { page: p, limit: 50 });
    hit = chunk.list.find((x) => String(x.id) === target);
    if (hit) return hit;
  }
  return null;
}

function normalize(raw) {
  return {
    id: raw.id,
    title: decodeEntities(raw.title || ''),
    subtitle: decodeEntities(raw.subtitle || ''),
    content: raw.content || '',
    cover: fixUrl(raw.cover || ''),
    source: raw.source || '',
    url: raw.url || '',
    createdAt: raw.created_at || '',
    date: (raw.created_at || '').slice(0, 10),
  };
}

/** 接口里存在 // 双斜杠拼接与 &quot; 实体，统一清理 */
function fixUrl(u) {
  return u.replace(/([^:])\/\/+/g, '$1/');
}

function decodeEntities(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/** 政策文件按发布机构打标签 */
export function orgOf(title) {
  const rules = [
    ['中共中央办公厅', '中办 · 国办'],
    ['中共中央', '中共中央'],
    ['国家教材委员会', '国家教材委员会'],
    ['教育部等六部门', '教育部等六部门'],
    ['教育部等五部门', '教育部等五部门'],
    ['教育部办公厅', '教育部办公厅'],
    ['教育部', '教育部'],
  ];
  for (const [k, v] of rules) if (title.includes(k)) return v;
  return '政策文件';
}
