/**
 * 预约演示表单。
 *
 * 线上原站全站无任何表单，仅页脚留邮箱电话。这里补上转化入口。
 * 后端接口尚未提供，故提交时退化为 mailto: 草稿 —— 不静默丢弃用户输入。
 */

import { CONTACT } from '../data/site.js';

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const org = String(data.get('org') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const need = String(data.get('need') || '').trim();

    if (!name || !phone) {
      if (status) {
        status.textContent = '请填写姓名与联系电话。';
        status.className = 'form-note';
      }
      return;
    }

    const body = [
      `姓名：${name}`,
      `学校 / 单位：${org || '（未填写）'}`,
      `联系电话：${phone}`,
      '',
      '需求描述：',
      need || '（未填写）',
    ].join('\n');

    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `预约演示 - ${org || name}`
    )}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.textContent = `已为你生成邮件草稿，如未自动打开可直接联系 ${CONTACT.phone}。`;
      status.className = 'form-ok';
    }

    location.href = href;
  });
}
