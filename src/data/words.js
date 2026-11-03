/**
 * 单词词典数据
 *
 * 数据来源：用户 PDF 中的单词列表 + Agent 补全（中文释义 / 词组搭配 / 词根词缀 / 近义词）。
 * 当前为示例词条，展示数据结构；PDF 提供后按相同结构扩充。
 *
 * 词条结构：
 * {
 *   word:      英文单词
 *   phonetic:  音标
 *   meanings:  中文释义（全部义项）
 *   phrases:   词组搭配 [{ text, meaning }]
 *   affixes:   词根词缀 [{ part, meaning, note? }]
 *   synonyms:  近义词
 *   derivation: 派生词说明（可选，展示同根派生）
 * }
 */

export const words = [
  {
    word: 'abandon',
    phonetic: "/əˈbændən/",
    meanings: [
      'v. 放弃；抛弃；离弃（某人、某物、某地）',
      'v. 中止，停止（做某事）',
      'n. 放纵；放任（with abandon 尽情地）',
    ],
    phrases: [
      { text: 'abandon oneself to', meaning: '沉溺于；纵情于' },
      { text: 'abandon ship', meaning: '弃船（离船求生）' },
      { text: 'with abandon', meaning: '尽情地；放纵地' },
    ],
    affixes: [
      { part: 'a-', meaning: '加强语气（源自 ad-，表“向、到”）' },
      { part: '-bandon', meaning: '源自拉丁语 bandum（旗帜/命令），古法语 abandoner“置于他人控制之下”→ 放弃控制' },
      { part: 'abandoned', meaning: 'adj. 被抛弃的；无拘束的（派生词）' },
      { part: 'abandonment', meaning: 'n. 放弃；抛弃（派生词）' },
    ],
    synonyms: ['desert', 'forsake', 'give up', 'relinquish', 'renounce'],
    derivation: 'abandon → abandoned（adj.）/ abandonment（n.）',
  },
  {
    word: 'affect',
    phonetic: '/əˈfekt/',
    meanings: [
      'v. 影响',
      'v. 使感动；使悲伤（常用被动）',
      'v. 假装；装作',
    ],
    phrases: [
      { text: 'be affected by', meaning: '受到……的影响' },
      { text: 'affect to do', meaning: '假装做某事' },
    ],
    affixes: [
      { part: 'af-', meaning: '向、加强（ad- 的变体）' },
      { part: '-fect', meaning: '做、作用（拉丁语 facere）' },
      { part: 'affection', meaning: 'n. 喜爱；感情（派生词）' },
      { part: 'affected', meaning: 'adj. 受影响的；假装的（派生词）' },
    ],
    synonyms: ['influence', 'impact', 'move', 'pretend'],
    derivation: 'affect → affected（adj.）/ affection（n.）/ affectionate（adj.）',
  },
  {
    word: 'benefit',
    phonetic: '/ˈbenɪfɪt/',
    meanings: [
      'n. 好处，益处',
      'n. 福利；救济金',
      'v. 有益于；得益',
    ],
    phrases: [
      { text: 'benefit from', meaning: '从……中获益' },
      { text: 'for the benefit of', meaning: '为了……的利益' },
      { text: 'mutual benefit', meaning: '互利' },
    ],
    affixes: [
      { part: 'bene-', meaning: '好（拉丁语）' },
      { part: '-fit', meaning: '做、行为（facere 的变体）' },
      { part: 'beneficial', meaning: 'adj. 有益的（派生词）' },
      { part: 'beneficiary', meaning: 'n. 受益人（派生词）' },
    ],
    synonyms: ['advantage', 'profit', 'gain', 'welfare'],
    derivation: 'benefit → beneficial（adj.）/ beneficiary（n.）',
  },
  {
    word: 'commit',
    phonetic: '/kəˈmɪt/',
    meanings: [
      'v. 犯（罪、错）',
      'v. 承诺；投入（commit to）',
      'v. 委托；送交',
    ],
    phrases: [
      { text: 'commit a crime', meaning: '犯罪' },
      { text: 'commit oneself to', meaning: '致力于；承诺' },
      { text: 'commit to memory', meaning: '牢记' },
    ],
    affixes: [
      { part: 'com-', meaning: '一起、加强' },
      { part: '-mit', meaning: '送、发（拉丁语 mittere）' },
      { part: 'commitment', meaning: 'n. 承诺；投入（派生词）' },
      { part: 'committee', meaning: 'n. 委员会（派生词）' },
    ],
    synonyms: ['perform', 'pledge', 'devote', 'entrust'],
    derivation: 'commit → commitment（n.）/ committee（n.）',
  },
  {
    word: 'diverse',
    phonetic: '/daɪˈvɜːrs/',
    meanings: [
      'adj. 多种多样的；不同的',
    ],
    phrases: [
      { text: 'diverse cultures', meaning: '多元文化' },
      { text: 'a diverse range of', meaning: '各种各样的' },
    ],
    affixes: [
      { part: 'di-', meaning: '分开（dis- 的变体）' },
      { part: '-verse', meaning: '转（拉丁语 vertere）' },
      { part: 'diversity', meaning: 'n. 多样性（派生词）' },
      { part: 'diversify', meaning: 'v. 使多样化（派生词）' },
    ],
    synonyms: ['various', 'varied', 'different', 'assorted'],
    derivation: 'diverse → diversity（n.）/ diversify（v.）',
  },
  {
    word: 'evidence',
    phonetic: '/ˈevɪdəns/',
    meanings: [
      'n. 证据；证词；迹象',
      'v. 证明；表明',
    ],
    phrases: [
      { text: 'evidence of / for', meaning: '……的证据' },
      { text: 'in evidence', meaning: '显而易见的；明显的' },
      { text: 'give evidence', meaning: '作证' },
    ],
    affixes: [
      { part: 'e-', meaning: '向外（ex- 的变体）' },
      { part: '-vid-', meaning: '看见（拉丁语 videre）' },
      { part: '-ence', meaning: '名词后缀（表性质/状态）' },
      { part: 'evident', meaning: 'adj. 明显的（派生词）' },
    ],
    synonyms: ['proof', 'testimony', 'indication', 'sign'],
    derivation: 'evidence → evident（adj.）/ evidently（adv.）',
  },
]

export function getWord(word) {
  return words.find((w) => w.word === word)
}
