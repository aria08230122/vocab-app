import { defineStore } from 'pinia'

const STORAGE_KEY = 'vocab-app-state-v1'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export const useAppStore = defineStore('app', {
  state: () => {
    const saved = loadSaved()
    return {
      favorites: saved.favorites || [],        // 收藏的单词
      mastered: saved.mastered || [],          // 已掌握的单词
      recallResults: saved.recallResults || {}, // word -> { correct, total }
      spellingResults: saved.spellingResults || {}, // word -> { correct, total }
      dailyGoal: saved.dailyGoal || 20,        // 每日目标单词数
      learnedToday: saved.learnedToday || 0,   // 今日已学
      learnedDate: saved.learnedDate || '',    // 记录学习数的日期
    }
  },

  getters: {
    isFavorite: (s) => (word) => s.favorites.includes(word),
    isMastered: (s) => (word) => s.mastered.includes(word),
    /** 今日进度（0~1），跨天自动清零 */
    todayProgress: (s) => {
      if (s.learnedDate !== todayKey()) return 0
      return s.dailyGoal > 0 ? Math.min(1, s.learnedToday / s.dailyGoal) : 0
    },
    todayCount: (s) => (s.learnedDate === todayKey() ? s.learnedToday : 0),
    /** 正确率（拼写+回忆 汇总） */
    accuracy: (s) => {
      let correct = 0
      let total = 0
      for (const w of Object.keys(s.recallResults)) {
        correct += s.recallResults[w].correct
        total += s.recallResults[w].total
      }
      for (const w of Object.keys(s.spellingResults)) {
        correct += s.spellingResults[w].correct
        total += s.spellingResults[w].total
      }
      return total > 0 ? Math.round((correct / total) * 100) : 0
    },
  },

  actions: {
    toggleFavorite(word) {
      const i = this.favorites.indexOf(word)
      if (i >= 0) this.favorites.splice(i, 1)
      else this.favorites.push(word)
      this.save()
    },
    toggleMastered(word) {
      const i = this.mastered.indexOf(word)
      if (i >= 0) this.mastered.splice(i, 1)
      else this.mastered.push(word)
      this.save()
    },
    /** 学过一个词：计入今日进度 */
    markLearned(word) {
      if (this.learnedDate !== todayKey()) {
        this.learnedDate = todayKey()
        this.learnedToday = 0
      }
      this.learnedToday += 1
      this.save()
    },
    recordRecall(word, correct) {
      const r = this.recallResults[word] || { correct: 0, total: 0 }
      r.total += 1
      if (correct) r.correct += 1
      this.recallResults[word] = r
      this.save()
    },
    recordSpelling(word, correct) {
      const r = this.spellingResults[word] || { correct: 0, total: 0 }
      r.total += 1
      if (correct) r.correct += 1
      this.spellingResults[word] = r
      this.save()
    },
    setDailyGoal(n) {
      this.dailyGoal = Math.max(1, Math.min(200, Math.round(n) || 20))
      this.save()
    },
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state))
    },
  },
})
