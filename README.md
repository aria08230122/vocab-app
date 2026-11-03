# 粉粉背单词 · Vocab App

参照「不背单词」的交互与内容结构做的背单词前端（首版·学习功能版）。

## 功能

- **单词列表**：全部单词 + 中文释义，支持搜索（单词 / 释义）
- **单词详情**：音标、全部中文释义、词组搭配、词根词缀派生、近义词；可收藏、可标记已掌握
- **看词回忆**：看词先回忆释义，翻卡核对，自评「记得 / 忘了」
- **拼写检测**：看中文释义写英文单词，自动判对错
- **每日计划**：设定每日目标单词数，跟踪今日进度（跨天自动重置）
- **进度统计**：词库总数、已掌握、已收藏、今日已学、练习正确率

数据用 localStorage 持久化，无需后端。

## 技术栈

- Vue 3 + Vite
- Vue Router（hash 路由，方便静态部署）
- Pinia（状态管理 + localStorage 持久化）

## 主题自定义

所有颜色与背景集中在 `src/config/theme.js` 一处配置：

- `sectionTitleColor`：分区标题（词组搭配 / 词根词缀 / 近义词）颜色
- `primaryButton.from / to / text`：底部按钮的渐变与文字颜色
- `background.mode`：`color`（纯色） / `gradient`（渐变，默认） / `image`（背景图）
- `background.imageUrl`：自定义背景图 URL（mode 设为 `image` 后生效）

## 词典数据

单词数据在 `src/data/words.js`，词条结构：

```js
{
  word: 'abandon',          // 单词
  phonetic: '/əˈbændən/',  // 音标
  meanings: ['v. 放弃…'],   // 全部中文释义
  phrases: [{ text, meaning }],   // 词组搭配
  affixes: [{ part, meaning }],   // 词根词缀
  synonyms: ['desert', …],        // 近义词
  derivation: '派生词说明',       // 可选
}
```

## 本地运行

```bash
npm install
npm run dev      # 开发
npm run build    # 构建
npm run preview  # 预览构建产物
```

## 在线访问

仓库推送后，可在 GitHub 仓库 Settings → Pages 中开启 GitHub Pages（分支选 main、目录选 /root）即可获得在线地址。
