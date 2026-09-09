# 待设计图片清单 · DESIGN-MANIFEST

> 本文档列出所有**仍为占位图**、需要重新设计并同名覆盖的资源。
> Codex 可通过以下方式识别：
>
> 1. **HTML/JS 中的 `data-todo-design="待设计"` 属性**
>    ```bash
>    grep -rn 'data-todo-design' --include='*.html' --include='*.js' .
>    ```
> 2. **`<meta property="og:image">` 下方的 `<!-- todo-design: ... -->` 注释**
> 3. **`<section class="phero">` 中的 HERO 背景大图设计要点注释**（`hero-*.jpg` 已完成，注释保留供参考）
> 4. **本文件（DESIGN-MANIFEST.md）**：单一事实来源
>
> 替换方式：**保持文件名与尺寸不变**，直接覆盖同名文件即可，无需修改 HTML/CSS/JS。

---

## 状态一览

| 类别 | 数量 | 状态 |
| --- | --- | --- |
| 产品页 HERO 背景大图 | 5 | DONE |
| 产品 icon | 5 | DONE |
| 产品页正文配图 | 6 | DONE |
| 非遗课程封面 | 9 | DONE |
| 空中课堂三大能力配图 | 3 | DONE |
| 空中课堂课程方向配图 | 4 | DONE |
| 首页科技影像 | 3 | TODO |
| OG 分享封面 | 1 | TODO |
| **合计待设计** | **4** | |

---

## DONE 1 · 产品 icon（5 张）

- **路径**：`assets/images/products/icon-<slug>.png`
- **尺寸**：144×144（透明底 PNG，建议出图 288×288 以上带 @2x 清晰度）
- **使用位置**：
  - 首页产品矩阵卡（46px 槽位）· `index.html`
  - "关于我们" 产品卡（46px 槽位）· `about.html`
  - 产品页底部同级切换条（46px 槽位）· `assets/js/product-nav.js`
  - 顶部导航 "产品中心" 下拉（34px 槽位）· `assets/js/chrome.js`
- **风格约束**：
  - 图形化，避免继续用汉字铺满
  - 圆角 20~24px 底 + 品牌渐变或线性图标
  - 单个 icon 视觉重量要接近，能作为一套呈现
  - 深色背景可读（暗底页面 + 浅底页面均需清晰）
- **矢量源文件**：`assets/images/products/icons-src/*.svg`

| 文件 | 产品 | 主题关键词 |
| --- | --- | --- |
| `icon-bingo-book.png` | 缤果数字教材 | 数字教材 / 知识图谱 / 阅读 |
| `icon-bingo-plus.png` | 缤果融合出版 | 纸数融合 / 翻页 / 闯关 |
| `icon-bingo-live.png` | 缤果空中课堂 | 直播 / 云端 / 连接 |
| `icon-bingo-mate.png` | 缤果数字非遗 | 非遗纹样 / 手工 / 传承 |
| `icon-bingo-mate-app.png` | 缤果学伴 | 具身机器人 / AI 陪伴 |

---

## DONE 2 · 产品页正文配图（6 张）

### 缤果数字教材 · 三大平台 Tab 截图

- **路径**：`assets/images/products/bingo-book-{create,publish,apply}.jpg`
- **尺寸**：1600×900（16:9），JPEG，≤ 200 KB
- **使用位置**：`products/bingo-book.html` 三大平台 Tab 面板
- **风格**：产品 UI 截图或概念界面示意；深色底、卡片式 UI、品牌橙点缀高光

| 文件 | 内容 |
| --- | --- |
| `bingo-book-create.jpg` | 创作平台：智能编排 · AI 辅助编写 · 知识图谱 |
| `bingo-book-publish.jpg` | 出版平台：审校反馈 · AI 智能审核 · 快速出版 |
| `bingo-book-apply.jpg` | 应用平台：任务式教学 · 轻量实训 · 智能评估 |

### 缤果融合出版 · 读本案例（2 张）· 已停用

> ⚠️ 这两张已**不再被任何页面引用**。`products/bingo-plus.html` 的读本案例区块已按原站布局
> 重做为「左侧真实绘本 → 右侧 AI 数字化视频」的对照卡，不再需要合成插画。
> 文件仍保留在仓库中未删除，如需复用或清理请自行决定。

| 文件 | 原用途 | 现状 |
| --- | --- | --- |
| `bingo-plus-case-ink.jpg` | 《黑与白的和谐之道》纸质 → 数字化 | 已停用 |
| `bingo-plus-case-cat.jpg` | 《仰望天空的猫》纸质 → 数字化 | 已停用 |

**替代它们的真实素材（不需要设计，请勿覆盖）：**

| 文件 | 尺寸 | 内容 |
| --- | --- | --- |
| `bingo-plus-case-ink-cover.png` | 322×472 | 《中华优秀传统文化》读本五年级上册封面 |
| `bingo-plus-case-ink-spread.png` | 516×333 | 《黑与白的和谐之道》课文内页插图 |
| `bingo-plus-case-cat-front.png` | 426×558 | 《仰望天空的猫》绘本封面 |
| `bingo-plus-case-cat-back.png` | 400×558 | 《仰望天空的猫》绘本封底 |
| `bingo-plus-case-ink-poster.jpg` | 1280×720 | v-1 视频抽帧封面 |
| `bingo-plus-case-cat-poster.jpg` | 1280×719 | v-3 视频抽帧封面 |

视频沿用原站链接（`preload="none"`，点击才加载）：
`https://cuiya.cn/static/media/v-1.45268372.mp4`、`https://cuiya.cn/static/media/v-3.86e92c39.mp4`

### 缤果学伴 · AI 超级教师主图

- **文件**：`assets/images/products/bingo-mate-app-hero.jpg`
- **尺寸**：1280×800（16:10），JPEG，≤ 200 KB
- **使用位置**：`products/bingo-mate-app.html` "AI 超级教师"段落右侧
- **风格**：具身智能机器人 + 智能语音波形 + 图像识别框 + 多模态交互反馈；氛围温暖有陪伴感

---

## DONE 3 · 九大非遗课程封面（9 张）

- **路径**：`assets/images/products/craft-XX-<slug>.jpg`
- **尺寸**：800×600（4:3），JPEG，≤ 80 KB
- **使用位置**：`products/bingo-mate.html` #craftGrid 网格
- **风格**：每张突出一项非遗技艺的实物 / 工艺细节；朱红鎏金基调，避免过度未来感

| 文件 | 课程 | 建议主体 |
| --- | --- | --- |
| `craft-01-jewelry.jpg` | 典籍里的首饰 | 传统金银首饰 / 花钿 |
| `craft-02-lacquer.jpg` | 丹漆成器 | 大漆器物 / 剔红 |
| `craft-03-jianzi.jpg` | 指尖鞠舞 | 蹴鞠 / 中国传统球艺 |
| `craft-04-cloth.jpg` | 布语时光 | 蓝染 / 扎染布匹 |
| `craft-05-weave.jpg` | 时光织语 | 织机 / 织锦纹样 |
| `craft-06-brocade.jpg` | 锦绣华章 | 蜀锦 / 云锦局部 |
| `craft-07-bead.jpg` | 珠韵绣梦 | 珠绣 / 传统串珠 |
| `craft-08-herb.jpg` | 中药造物 | 中药材 / 药秤药戥 |
| `craft-09-wood.jpg` | 木意匠心 | 木雕 / 榫卯结构 |

---

## DONE 4 · 空中课堂 · 三大能力配图（3 张）

- **路径**：`assets/images/products/bingo-live-teach-{content,teacher,method}.jpg`
- **尺寸**：1200×1500（4:5 竖构图），JPEG，≤ 220 KB
- **使用位置**：`products/bingo-live.html` CAPABILITIES 段，一行三张并排展示
- **风格约束**：
  - 真实课堂摄影，冷调科技蓝与暖橙细节点缀
  - 三张色调统一、视觉重量接近，作为一组呈现
  - 主体居中偏上；卡片底部有 HTML 文字区，图片底部 15% 不放关键信息

| 文件 | 标题 | 建议主体 |
| --- | --- | --- |
| `bingo-live-teach-content.jpg` | 教学内容 | 屏幕中的互动课件 / 可点击知识卡 |
| `bingo-live-teach-teacher.jpg` | 教学师资 | 主讲教师直播授课实景 + 补光设备 |
| `bingo-live-teach-method.jpg` | 教学方法 | 乡村教室大屏授课 + 助教巡视（双师协作） |

---

## DONE 5 · 空中课堂 · 课程方向配图（4 张）

- **路径**：`assets/images/products/bingo-live-course-{culture,safety,subject,heritage}.jpg`
- **尺寸**：900×900（1:1），JPEG，≤ 120 KB
- **使用位置**：`products/bingo-live.html` COURSES 段，一行四张
- **风格约束**：
  - **图内不要放文字**，分类名由 HTML 输出（原站是把文字烤进图里，已改为可读文本）
  - 真实课堂摄影，四张分别对应具体课程实践
  - 主体明确，缩到 260px 宽仍可辨识

| 文件 | 分类 | 意象 | 主色 |
| --- | --- | --- | --- |
| `bingo-live-course-culture.jpg` | 传统文化类 | 远程书法课堂 | 暖橙 |
| `bingo-live-course-safety.jpg` | 安全教育类 | 应急演练课堂 | 青蓝 |
| `bingo-live-course-subject.jpg` | 赋能学科类 | 远程实验课堂 | 蓝紫 |
| `bingo-live-course-heritage.jpg` | 文化传承类 | 远程剪纸课堂 | 品红 |

---

## TODO 6 · 首页科技影像组合（3 张）

- **路径**：`assets/images/home-*.jpg`
- **使用位置**：`index.html` mission 段 `.mission-visual`（一大两小组合，左右错落）
- **风格**：真实感科技影像；教育场景 + 互联互通；同一色调体系（冷调科技蓝 + 品牌橙点缀）

| 文件 | 尺寸 | 角色 | 建议内容 |
| --- | --- | --- | --- |
| `home-ai-exhibition.jpg` | 1280×960 | 主图 · 右侧大图 | AI 教育场景 / 展会现场 / 沉浸式教室 |
| `home-smart-classroom.jpg` | 1500×1125 | 副图 · 左下小图 | 智慧教室实景 / 学生远程互动 |
| `home-learning-platform.jpg` | 1400×671 | 副图 · 右上小图 | 数字教学平台界面截图 |

---

## TODO 7 · OG 分享封面（1 张）

- **文件**：`assets/images/og-cover.jpg`
- **尺寸**：1200×630（Open Graph 标准），JPEG，≤ 200 KB
- **使用位置**：全站 13 页 `<meta property="og:image">`
- **风格**：品牌 Logo + slogan「萃教育之精华 · 扬文化之正道」+ 品牌视觉；深色底、大字标题、右侧或底部品牌图形

---

## 已完成 · 无需再动（DONE）

- `assets/images/products/hero-<slug>.jpg` × 5：产品页 hero 背景大图，已替换为真图。原占位备份在 `assets/images/products/placeholders/`。
- `assets/images/favicon.svg` / `favicon-32.png` / `apple-touch-icon.png`：站点图标，基于 logo 生成，无需重设计。
- `assets/images/logo-on-dark.svg` / `logo-on-light.svg`：品牌 Logo。
