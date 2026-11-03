/**
 * 单词词典数据（全量 5523 词）
 *
 * 数据来源：
 *  1. words_part_01..22.json —— 用户《六级大纲词汇》PDF 全量词条（单词/音标/全部中文释义，
 *     按词性拆分），词根词缀由常用词根表程序化标注（quality-checked）。
 *  2. words_extra.js —— 手工补全层（首批 A 字母核心词 + 示例词），
 *     覆盖词组搭配 / 词根词缀 / 近义词 / 派生。后续批次（B-Z）持续追加。
 *
 * 词条结构：
 * {
 *   word:      英文单词
 *   phonetic:  音标
 *   meanings:  中文释义（全部义项，含词性）
 *   phrases:   词组搭配 [{ text, meaning }]（未补全时为空数组，页面自动隐藏）
 *   affixes:   词根词缀 [{ part, meaning }]
 *   synonyms:  近义词
 *   derivation: 派生词说明（可选）
 * }
 */

import p01 from './words_part_01.json'
import p02 from './words_part_02.json'
import p03 from './words_part_03.json'
import p04 from './words_part_04.json'
import p05 from './words_part_05.json'
import p06 from './words_part_06.json'
import p07 from './words_part_07.json'
import p08 from './words_part_08.json'
import p09 from './words_part_09.json'
import p10 from './words_part_10.json'
import p11 from './words_part_11.json'
import p12 from './words_part_12.json'
import p13 from './words_part_13.json'
import p14 from './words_part_14.json'
import p15 from './words_part_15.json'
import p16 from './words_part_16.json'
import p17 from './words_part_17.json'
import p18 from './words_part_18.json'
import p19 from './words_part_19.json'
import p20 from './words_part_20.json'
import p21 from './words_part_21.json'
import p22 from './words_part_22.json'
import { extraWords } from './words_extra'

const fullWords = [
  ...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10,
  ...p11, ...p12, ...p13, ...p14, ...p15, ...p16, ...p17, ...p18, ...p19, ...p20,
  ...p21, ...p22,
]

const extraMap = new Map(extraWords.map((w) => [w.word, w]))

export const words = fullWords.map((w) => {
  const ex = extraMap.get(w.word)
  return ex ? { ...w, ...ex } : w
})

export function getWord(word) {
  return words.find((w) => w.word === word)
}
