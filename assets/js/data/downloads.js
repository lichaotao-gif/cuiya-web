/**
 * 下载中心数据 —— URL 取自线上 chunk-82b7fa74 的 downloads 配置，未作改动。
 * 注意：线上未暴露版本号 / 包体积 / 更新日期，故 version、size 一律留空，
 *       待接入真实发布数据后填充，避免展示虚假信息。
 */

const QR_BINGO_BOOK = 'https://cuiya.cn/static/img/qrcode_bingo.548fa5e5.png';
const QR_BINGO_CLASS = 'https://cuiya.cn/static/img/qr-code.1b55b602.png';

export const DOWNLOAD_GROUPS = [
  {
    name: '缤果数字教材',
    scope: '缤果数字教材',
    sections: [
      {
        items: [
          { os: 'mac', label: 'macOS', url: 'https://bingobook.cn/d' },
          { os: 'win', label: 'Windows', url: 'https://bingobook.cn/d' },
          { os: 'android', label: 'Android/Pad', url: 'https://bingobook.cn/d' },
          { os: 'ios', label: 'iOS/iPadOS', url: 'https://bingobook.cn/d' },
        ],
        qr: { label: '缤果数字教材 微信公众号', src: QR_BINGO_BOOK },
      },
    ],
  },
  {
    name: '缤果课堂',
    scope: '缤果空中课堂、缤果融合出版、缤果数字非遗',
    sections: [
      {
        title: '学校上课端',
        items: [
          { os: 'mac', label: 'macOS', url: 'https://bingoclass.com.cn/b' },
          { os: 'win', label: 'Windows', url: 'https://bingoclass.com.cn/b' },
        ],
        qr: { label: '缤果空中课堂 微信公众号', src: QR_BINGO_CLASS },
      },
      {
        title: '主讲老师端',
        items: [
          { os: 'mac', label: 'macOS', url: 'https://bingoclass.com.cn/t' },
          { os: 'win', label: 'Windows', url: 'https://bingoclass.com.cn/t' },
        ],
        qr: { label: '缤果空中课堂 微信公众号', src: QR_BINGO_CLASS },
      },
    ],
  },
  {
    name: '缤果课堂（人工智能版）',
    scope: '人工智能 AI 课',
    sections: [
      {
        items: [
          { os: 'mac', label: 'macOS', url: 'https://bingoclass.com.cn/ai' },
          { os: 'win', label: 'Windows', url: 'https://bingoclass.com.cn/ai' },
        ],
        qr: { label: '缤果空中课堂 微信公众号', src: QR_BINGO_CLASS },
      },
    ],
  },
  {
    name: '缤果课堂（综合实践版）',
    scope: '综合实践 AI 课',
    sections: [
      {
        items: [
          { os: 'mac', label: 'macOS', url: 'https://bingoclass.com.cn/z' },
          { os: 'win', label: 'Windows', url: 'https://bingoclass.com.cn/z' },
        ],
        qr: { label: '缤果空中课堂 微信公众号', src: QR_BINGO_CLASS },
      },
    ],
  },
  {
    name: '缤果 AI 心课堂',
    scope: '心理健康 AI 课',
    sections: [
      {
        items: [
          { os: 'mac', label: 'macOS', url: 'https://bingoclass.com.cn/x' },
          { os: 'win', label: 'Windows', url: 'https://bingoclass.com.cn/x' },
        ],
        qr: { label: '缤果空中课堂 微信公众号', src: QR_BINGO_CLASS },
      },
    ],
  },
];

/** 极简 OS 图标（inline SVG，避免额外请求） */
export const OS_ICON = {
  mac: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.9c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.4 1.1 8.5.7 1 1.5 2.2 2.6 2.1 1-.04 1.4-.7 2.7-.7 1.3 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4-.02 0-2.2-.8-2.2-3.3zM14.3 5.6c.6-.7 1-1.7.9-2.7-.9.04-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z"/></svg>',
  win: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.6l7.4-1v7.1H3V5.6zm0 12.8l7.4 1v-7h-7.4v6zM11.5 4.4L21 3v8.7h-9.5V4.4zm0 8.4H21V21l-9.5-1.3v-6.9z"/></svg>',
  android:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 9h12v8.2c0 .9-.7 1.6-1.6 1.6h-.7v2.1c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1v-2.1h-3v2.1c0 .6-.5 1.1-1.1 1.1S8.3 21.5 8.3 21v-2.1h-.7C6.7 18.8 6 18.1 6 17.2V9zM4.1 9.3c.6 0 1.1.5 1.1 1.1v4.4c0 .6-.5 1.1-1.1 1.1S3 15.4 3 14.8v-4.4c0-.6.5-1.1 1.1-1.1zm15.8 0c.6 0 1.1.5 1.1 1.1v4.4c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1v-4.4c0-.6.5-1.1 1.1-1.1zM15.6 3.6l1-1.7a.4.4 0 10-.7-.4l-1 1.8A6.7 6.7 0 0012 2.8c-1 0-2 .2-2.9.6l-1-1.8a.4.4 0 10-.7.4l1 1.7A5.5 5.5 0 006 8h12a5.5 5.5 0 00-2.4-4.4zM9.6 6.1a.6.6 0 110-1.2.6.6 0 010 1.2zm4.8 0a.6.6 0 110-1.2.6.6 0 010 1.2z"/></svg>',
  ios: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.9c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.4 1.1 8.5.7 1 1.5 2.2 2.6 2.1 1-.04 1.4-.7 2.7-.7 1.3 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4-.02 0-2.2-.8-2.2-3.3zM14.3 5.6c.6-.7 1-1.7.9-2.7-.9.04-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z"/></svg>',
};

/** 检测当前平台，用于高亮推荐项 */
export function detectOS() {
  const ua = navigator.userAgent;
  const p = navigator.platform || '';
  if (/iPhone|iPad|iPod/.test(ua) || (p === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Mac/.test(p) || /Mac OS X/.test(ua)) return 'mac';
  if (/Win/.test(p)) return 'win';
  return null;
}
