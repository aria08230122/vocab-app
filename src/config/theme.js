/**
 * 主题配置 —— 全站颜色与背景都在这里自定义
 *
 * 定稿风格：粉色主题、干净分区、无素材装饰。
 * 可自定义项：
 *  1. sectionTitleColor  分区标题颜色（原稿为粉色）
 *  2. primaryButton      底部按钮颜色（粉到深粉渐变）
 *  3. background         背景：color / gradient / image 三种模式
 *                        —— 想用自定义背景图时：mode 改为 'image'，imageUrl 填图片 URL
 */
export const themeConfig = {
  /** 分区标题（词组搭配 / 词根词缀 / 近义词）颜色 */
  sectionTitleColor: '#D96B96',

  /** 底部主按钮 */
  primaryButton: {
    from: '#F6AFC8',   // 渐变起点（浅粉）
    to: '#E4739F',     // 渐变终点（深粉）
    text: '#FFFFFF',   // 按钮文字色
  },

  /** 背景 */
  background: {
    mode: 'gradient',            // 'color' | 'gradient' | 'image'
    color: '#FFF5F7',            // mode=color 时使用
    gradient: { from: '#FFF8FA', to: '#FFE7EF' }, // mode=gradient 时使用
    imageUrl: '',                // mode=image 时使用（自定义背景图 URL）
  },
}

/** 把配置写入 CSS 变量，供全局样式使用 */
export function applyTheme() {
  const root = document.documentElement
  const t = themeConfig
  root.style.setProperty('--section-title-color', t.sectionTitleColor)
  root.style.setProperty('--btn-from', t.primaryButton.from)
  root.style.setProperty('--btn-to', t.primaryButton.to)
  root.style.setProperty('--btn-text', t.primaryButton.text)

  const bg = t.background
  if (bg.mode === 'image' && bg.imageUrl) {
    root.dataset.bg = 'image'
    root.style.setProperty('--bg-image', `url("${bg.imageUrl}")`)
  } else if (bg.mode === 'gradient') {
    root.dataset.bg = 'gradient'
    root.style.setProperty('--bg-gradient-from', bg.gradient.from)
    root.style.setProperty('--bg-gradient-to', bg.gradient.to)
  } else {
    root.dataset.bg = 'color'
    root.style.setProperty('--bg-color', bg.color)
  }
}
