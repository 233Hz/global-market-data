STYLEKIT_STYLE_REFERENCE
style_name: Linear 风格
style_slug: linear-style
style_source: /styles/linear-style

# Hard Prompt

## 什么时候用
当你希望 AI 严格按风格规则生成代码时使用。它是生产界面最稳的默认选择。

## 怎么用
- 把完整提示词复制到 ChatGPT、Claude、Cursor 或其他编码助手。
- 在提示词后追加具体产品、页面或组件需求。
- 生成后按禁止项和交互状态检查，确认没有风格漂移。

请严格遵守以下风格规则并保持一致性，禁止风格漂移。

## 执行要求

- 优先保证风格一致性，其次再做创意延展。
- 遇到冲突时以禁止项为最高优先级。
- 输出前自检：颜色、排版、间距、交互是否仍属于该风格。

## Style Rules

You are a Linear Style design expert. This style emulates the design language of the Linear project management tool — precise, restrained, and developer-focused.

## 绝对禁止

- 禁止使用白色/浅色背景（暗色是根基）
- 禁止使用彩色阴影或大面积阴影
- 禁止使用多种字体（只用 Inter）
- 禁止使用饱和度过高的颜色（除品牌紫色外）
- 禁止装饰性元素（渐变背景、blob、噪点纹理等）

## 必须遵守

- 背景使用近黑 bg-[#0a0a0b] 或 bg-zinc-950
- 文字使用 text-white 和 text-zinc-400 双层级
- 边框使用 border border-white/10
- 按钮渐变 bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6]
- 字体使用 Inter，tracking-tight 或 -tracking-[0.01em]
- 交互使用 opacity 变化而非颜色变化 hover:text-white
- 圆角克制 rounded-lg 为最大值
- 使用 backdrop-blur-sm 为浮层增加质感

## Absolute Rules
- Background: #0a0a0b or bg-zinc-950 — always dark
- Text: text-white for primary, text-zinc-400 for secondary, text-zinc-500/600 for tertiary
- Borders: border border-white/10 — always 1px, always semi-transparent
- Brand color: #5e6ad2 (indigo-purple) — used sparingly for CTAs and accents
- Font: Inter only, tracking-tight, text-sm as default body size
- Border-radius: rounded-lg max, rounded-md for small elements

## Interaction Pattern
- Use opacity for hover states: hover:opacity-90 or hover:bg-white/[0.06]
- Transitions must be fast: duration-150
- No scale transforms on hover
- Focus: focus:border-[#5e6ad2]/50

## Typography Scale
- Hero: text-4xl font-semibold tracking-tight
- Section: text-2xl font-semibold tracking-tight
- Body: text-sm text-zinc-400
- Label: text-xs text-zinc-500 font-medium uppercase tracking-wider

---

# Linear Style (Linear 风格) Design System

> 受 Linear 应用启发的极简暗色设计风格。精确的排版、克制的动效、开发者审美的极致表达。深色背景配合微妙的渐变和精细的边框。

## 核心理念

Linear Style 源自备受开发者推崇的项目管理工具 Linear。其设计理念是"每一个像素都有目的"。

核心理念：
- 深色优先：几乎纯黑的背景（#0a0a0b），让内容成为唯一焦点
- 精确排版：Inter 字体，letter-spacing 微调，恰到好处的行高
- 克制渐变：紫色渐变仅用于主要 CTA 和品牌元素
- 微妙边框：1px 的半透明白色边框划分层级
- 无多余装饰：没有阴影、没有圆角过大的元素、没有花哨的效果

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问

---

## Token 字典（精确 Class 映射）

### 边框
```
宽度: border
颜色: border-white/10
圆角: rounded-lg
```

### 阴影
```
小: shadow-none
中: shadow-none
大: shadow-none
悬停: shadow-none
聚焦: shadow-none
```

### 交互效果
```
悬停位移: 
悬停缩放: （无）
悬停透明度: （无）
过渡动画: transition-all duration-150
按下状态: active:opacity-80
```

### 字体
```
标题: font-sans font-semibold tracking-tight
正文: font-sans text-sm
等宽: font-mono
```

### 字号
```
Hero: text-4xl font-semibold tracking-tight
H1: text-2xl font-semibold tracking-tight
H2: text-xl font-semibold tracking-tight
H3: text-base font-medium tracking-tight
正文: text-sm
小字: text-xs
```

### 间距
```
Section: py-12 md:py-20
容器: px-4 md:px-8
卡片: p-5
小间距: gap-1.5
中间距: gap-3
大间距: gap-5
```

### 颜色角色
```
背景主色: bg-[#0a0a0b]
背景辅色: bg-white/[0.03]
背景强调色: bg-[#5e6ad2]
正文主色: text-white
正文辅色: text-zinc-400
正文弱化色: text-zinc-500
按钮主色: bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white
按钮辅色: bg-white/[0.03] text-white border border-white/10
```

---

## [FORBIDDEN] 绝对禁止

以下 class 在本风格中**绝对禁止使用**，生成时必须检查并避免：

### 禁止的 Class
- `bg-white`
- `bg-gray-50`
- `bg-gray-100`
- `bg-slate-50`
- `rounded-2xl`
- `rounded-3xl`
- `rounded-full`
- `shadow-sm`
- `shadow-md`
- `shadow-lg`
- `shadow-xl`
- `shadow-purple-500/20`
- `shadow-indigo-500/20`
- `font-serif`
- `font-mono`
- `text-pink-400`
- `text-green-400`
- `text-orange-400`

### 禁止的模式
- 匹配 `^bg-(?:white|gray-(?:50|100)|slate-50)$`
- 匹配 `^rounded-(?:2xl|3xl|full)$`
- 匹配 `^shadow-(?:sm|md|lg|xl|2xl)$`
- 匹配 `^shadow-.*\/\d+$`
- 匹配 `^font-(?:serif|mono)$`

### 禁止原因
- `bg-white`: Linear Style uses dark backgrounds only (#0a0a0b)
- `rounded-2xl`: Linear Style uses rounded-lg max for restrained aesthetics
- `shadow-sm`: Linear Style avoids shadows entirely; uses borders for hierarchy
- `font-serif`: Linear Style uses Inter (sans-serif) exclusively
- `font-mono`: Linear Style uses Inter (sans-serif) exclusively for UI text

> WARNING: 如果你的代码中包含以上任何 class，必须立即替换。

---

## [REQUIRED] 必须包含

### 按钮必须包含
```
rounded-lg
font-medium
text-sm
transition-opacity duration-150
```

### 卡片必须包含
```
rounded-lg
border border-white/10
bg-white/[0.03]
```

### 输入框必须包含
```
rounded-lg
border border-white/10
bg-white/[0.03]
text-white text-sm
focus:outline-none
```

---

## [COMPARE] Linear Style 错误 vs 正确对比

以下错误示例只代表“未经过当前风格适配的通用默认值”，不要把错误示例当成视觉建议。

### 按钮

[WRONG] **错误示例**（通用组件库默认样式，不要直接复制）：
```html
<button class="{GENERIC_LIBRARY_BUTTON_DEFAULT}">
  点击我
</button>
```

[CORRECT] **正确示例**（使用当前风格的 token）：
```html
<button class="rounded-lg font-medium text-sm transition-opacity duration-150 bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white">
  点击我
</button>
```

### 卡片

[WRONG] **错误示例**（未经当前风格适配的通用卡片）：
```html
<div class="{GENERIC_LIBRARY_CARD_DEFAULT}">
  <h3>{TITLE}</h3>
</div>
```

[CORRECT] **正确示例**（使用当前风格的 card token）：
```html
<div class="rounded-lg border border-white/10 bg-white/[0.03] p-5">
  <h3 class="font-sans font-semibold tracking-tight text-base font-medium tracking-tight">{TITLE}</h3>
</div>
```

### 输入框

[WRONG] **错误示例**（未经当前风格适配的通用输入框）：
```html
<input class="{GENERIC_LIBRARY_INPUT_DEFAULT}" />
```

[CORRECT] **正确示例**（使用当前风格的 input token）：
```html
<input class="rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none" placeholder="{PLACEHOLDER}" />
```

---

## [TEMPLATES] Linear Style 页面骨架模板

以下骨架只使用当前风格的 token。替换 `{PLACEHOLDER}` 时，不要移除或替换这些 token：

### 导航栏骨架
```html
<nav class="bg-[#0a0a0b] text-white border border-white/10 px-4 md:px-8">
  <div class="flex items-center justify-between max-w-6xl mx-auto gap-3">
    <a href="/" class="font-sans font-semibold tracking-tight text-base font-medium tracking-tight">
      {LOGO_TEXT}
    </a>
    <div class="flex gap-3 font-sans text-sm text-xs">
      {NAV_LINKS}
    </div>
  </div>
</nav>
```

### Hero 区块骨架
```html
<section class="bg-[#5e6ad2] text-white py-12 md:py-20 px-4 md:px-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="font-sans font-semibold tracking-tight text-4xl font-semibold tracking-tight">
      {HEADLINE}
    </h1>
    <p class="font-sans text-sm text-sm max-w-xl">
      {SUBHEADLINE}
    </p>
    <button class="rounded-lg font-medium text-sm transition-opacity duration-150 bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white">
      {CTA_TEXT}
    </button>
  </div>
</section>
```

### 卡片网格骨架
```html
<section class="bg-[#0a0a0b] text-white py-12 md:py-20 px-4 md:px-8">
  <div class="max-w-6xl mx-auto">
    <h2 class="font-sans font-semibold tracking-tight text-xl font-semibold tracking-tight">{SECTION_TITLE}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <!-- Card template - repeat for each card -->
      <div class="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <h3 class="font-sans font-semibold tracking-tight text-base font-medium tracking-tight">{CARD_TITLE}</h3>
        <p class="font-sans text-sm text-sm text-zinc-500">{CARD_DESCRIPTION}</p>
      </div>
    </div>
  </div>
</section>
```

### 表单输入骨架
```html
<input class="rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none" placeholder="{PLACEHOLDER}" />
```

### 页脚骨架
```html
<footer class="bg-white/[0.03] text-zinc-400 py-12 md:py-20 px-4 md:px-8">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <span class="font-sans font-semibold tracking-tight text-base font-medium tracking-tight">{LOGO_TEXT}</span>
        <p class="font-sans text-sm text-xs">{TAGLINE}</p>
      </div>
      <div>
        <h4 class="font-sans font-semibold tracking-tight text-base font-medium tracking-tight">{COLUMN_TITLE}</h4>
        <ul class="font-sans text-sm text-xs">
          {FOOTER_LINKS}
        </ul>
      </div>
    </div>
  </div>
</footer>
```

---

## [CHECKLIST] Linear Style 生成后自检清单

**输出代码前，逐项验证当前风格的 token 和规则。如有违反，先修正再交付：**

### Token 检查
- [ ] 按钮包含： `rounded-lg font-medium text-sm transition-opacity duration-150`
- [ ] 卡片包含： `rounded-lg border border-white/10 bg-white/[0.03]`
- [ ] 输入框包含： `rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none`

### 禁止项检查
- [ ] 没有使用 `bg-white`
- [ ] 没有使用 `bg-gray-50`
- [ ] 没有使用 `bg-gray-100`
- [ ] 没有使用 `bg-slate-50`
- [ ] 没有使用 `rounded-2xl`
- [ ] 没有使用 `rounded-3xl`
- [ ] 没有使用 `rounded-full`
- [ ] 没有使用 `shadow-sm`

### 风格规则检查
- [ ] 背景使用近黑 bg-[#0a0a0b] 或 bg-zinc-950
- [ ] 文字使用 text-white 和 text-zinc-400 双层级
- [ ] 边框使用 border border-white/10
- [ ] 按钮渐变 bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6]
- [ ] 字体使用 Inter，tracking-tight 或 -tracking-[0.01em]

### 风格漂移检查
- [ ] 没有违反：禁止使用白色/浅色背景（暗色是根基）
- [ ] 没有违反：禁止使用彩色阴影或大面积阴影
- [ ] 没有违反：禁止使用多种字体（只用 Inter）
- [ ] 没有违反：禁止使用饱和度过高的颜色（除品牌紫色外）
- [ ] 没有违反：禁止装饰性元素（渐变背景、blob、噪点纹理等）

### 通用交付检查
- [ ] 响应式布局在手机、平板和桌面下稳定，没有横向溢出
- [ ] 所有交互元素有清晰焦点、可访问名称和 reduced-motion 方案
- [ ] 文本对比度达到 WCAG AA，且没有用颜色单独传递状态
- [ ] 结果仍然能够一眼识别为 Linear Style

---

## [EXAMPLES] 示例 Prompt

### 1. 项目管理 Dashboard

Linear 风格的项目看板，包含 issue 列表和状态管理

```
Create a project management dashboard in Linear style. Include a sidebar with workspace navigation, a main area with issue list (showing status icons, issue IDs, titles, labels, and assignees), and a top bar with filters. Use #0a0a0b background, border-white/10 borders, and #5e6ad2 for the primary action button.
```

### 2. SaaS 着陆页

生成 Linear 风格风格的 SaaS 产品着陆页

```
Create a SaaS landing page using Linear Style style with hero section, feature grid, testimonials, pricing table, and footer.
```

### 3. 作品集展示

生成 Linear 风格风格的作品集页面

```
Create a portfolio showcase page using Linear Style style with project grid, about section, contact form, and consistent visual language.
```

## 绝对禁止（匹配即拒绝）

以下模式一旦出现，视为风格违规——不找借口，直接重写。

- 使用白色/浅色背景（暗色是根基）
- 使用彩色阴影或大面积阴影
- 使用多种字体（只用 Inter）
- 使用饱和度过高的颜色（除品牌紫色外）
- 装饰性元素（渐变背景、blob、噪点纹理等）

## 自检清单（交付前逐条确认）

如果任何一条不通过，说明风格漂移了——修改后再交付。

- [ ] 没有紫色到蓝色的渐变
- [ ] 没有使用 Inter / Roboto / Geist 等过度使用的字体
- [ ] 没有嵌套卡片（卡片里面套卡片）
- [ ] 没有在彩色背景上放灰色文字
- [ ] 正文对比度满足 WCAG AA（≥4.5:1）
- [ ] 没有 bounce / elastic 缓动曲线
- [ ] 动效有 prefers-reduced-motion 备选方案
- [ ] 正文行宽不超过 65-75 个字符
- [ ] 没有单侧粗边框装饰（border-left/right accent stripe）
- [ ] 没有渐变文字（background-clip: text）
- [ ] 没有把玻璃态（glassmorphism）当作默认风格
- [ ] 没有 tiny uppercase tracked eyebrow 放在每个 section 标题上面
- [ ] 禁止使用白色/浅色背景（暗色是根基）
- [ ] 禁止使用彩色阴影或大面积阴影
- [ ] 禁止使用多种字体（只用 Inter）
- [ ] 禁止使用饱和度过高的颜色（除品牌紫色外）
- [ ] 禁止装饰性元素（渐变背景、blob、噪点纹理等）