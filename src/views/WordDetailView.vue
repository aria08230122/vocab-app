<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getWord, words } from '../data/words'
import { useAppStore } from '../stores/app'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const entry = getWord(route.params.word)
const word = computed(() => entry)

const isFav = computed(() => store.isFavorite(word.value?.word))
const isKnown = computed(() => store.isMastered(word.value?.word))

const toast = ref('')
let toastTimer = null
function showToast(msg) {
  toast.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), 1600)
}

function toggleFav() {
  store.toggleFavorite(word.value.word)
  showToast(isFav.value ? '已取消收藏' : '已收藏 ♡')
}

/** 学习动作：known=true 表示“认识”（标记已掌握），false 表示“不认识” */
function act(known) {
  store.markLearned(word.value.word)
  if (known && !isKnown.value) {
    store.toggleMastered(word.value.word)
  }
  showToast(known ? '真棒，已掌握 🎀' : '已记录，下次再见')
  // 跳到列表中的下一个词
  const i = words.findIndex((w) => w.word === word.value.word)
  const next = words[(i + 1) % words.length]
  setTimeout(() => router.push({ name: 'detail', params: { word: next.word } }), 600)
}
</script>

<template>
  <div v-if="word" class="page-wrap detail-page">
    <header class="detail-head">
      <router-link class="back" to="/list" aria-label="返回列表">‹</router-link>
      <span class="head-word">{{ word.word }}</span>
      <button class="fav" :class="{ on: isFav }" @click="toggleFav" :aria-label="isFav ? '取消收藏' : '收藏'">
        {{ isFav ? '♥' : '♡' }}
      </button>
    </header>

    <!-- 单词主区：单词 + 音标 + 全部释义 -->
    <section class="word-hero">
      <h1 class="word-main">{{ word.word }}</h1>
      <p class="phonetic">{{ word.phonetic }}</p>
      <div class="meanings">
        <div v-for="(m, i) in word.meanings" :key="i" class="meaning-line">
          <span class="idx">{{ i + 1 }}</span>
          <span>{{ m }}</span>
        </div>
      </div>
    </section>

    <!-- 分区：词组搭配 -->
    <section class="section-block">
      <h3 class="section-title">词组搭配</h3>
      <div v-for="(p, i) in word.phrases" :key="i" class="phrase-line">
        <span class="phrase-en">{{ p.text }}</span>
        <span class="phrase-cn">{{ p.meaning }}</span>
      </div>
    </section>

    <!-- 分区：词根词缀 -->
    <section class="section-block">
      <h3 class="section-title">词根词缀</h3>
      <div v-for="(a, i) in word.affixes" :key="i" class="affix-line">
        <span class="affix-part">{{ a.part }}</span>
        <span class="affix-cn">{{ a.meaning }}</span>
      </div>
      <div v-if="word.derivation" class="derivation">派生：{{ word.derivation }}</div>
    </section>

    <!-- 分区：近义词 -->
    <section class="section-block">
      <h3 class="section-title">近义词</h3>
      <div class="synonym-tags">
        <span v-for="(s, i) in word.synonyms" :key="i" class="syn-tag">{{ s }}</span>
      </div>
    </section>

    <!-- 底部学习动作 -->
    <div class="detail-actions">
      <button class="btn-primary" @click="act(false)">不认识</button>
      <button class="btn-primary" @click="act(true)">认识</button>
    </div>

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
  <div v-else class="page-wrap">
    <p class="text-sub">未找到该单词</p>
    <router-link class="btn-ghost" style="display:block;text-align:center" to="/list">返回列表</router-link>
  </div>
</template>

<style scoped>
.detail-page { padding-bottom: calc(120px + env(safe-area-inset-bottom)); }

.detail-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.back {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--block-bg);
  border: 1px solid var(--block-border);
  color: var(--text-main);
  font-size: 24px;
  line-height: 1;
  text-decoration: none;
}
.head-word {
  font-size: 14px;
  color: var(--text-sub);
  letter-spacing: 2px;
}
.fav {
  width: 38px;
  height: 38px;
  border: 1px solid var(--block-border);
  border-radius: 50%;
  background: var(--block-bg);
  font-size: 19px;
  color: var(--text-sub);
  cursor: pointer;
  line-height: 1;
}
.fav.on { color: #ff6b9d; border-color: rgba(255, 107, 157, 0.4); }

.word-hero {
  text-align: center;
  margin-bottom: 18px;
}
.word-main {
  font-size: 46px;
  font-weight: 800;
  margin: 4px 0 6px;
  letter-spacing: 1px;
  color: var(--text-main);
}
.phonetic {
  color: var(--text-sub);
  font-size: 15px;
  margin: 0 0 16px;
}
.meanings {
  text-align: left;
  background: var(--block-bg);
  border: 1px solid var(--block-border);
  border-radius: var(--radius-lg);
  padding: 16px 18px;
}
.meaning-line {
  display: flex;
  gap: 10px;
  padding: 5px 0;
  font-size: 15px;
  line-height: 1.6;
}
.idx {
  color: var(--btn-to);
  font-weight: 700;
  min-width: 18px;
}

.section-block { margin-bottom: 14px; }

.phrase-line {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 7px 0;
  border-bottom: 1px dashed rgba(224, 122, 158, 0.18);
}
.phrase-line:last-child { border-bottom: none; }
.phrase-en { font-weight: 600; font-size: 15px; }
.phrase-cn { font-size: 14px; color: var(--text-sub); }

.affix-line {
  display: flex;
  gap: 10px;
  padding: 6px 0;
  font-size: 14px;
  line-height: 1.55;
  border-bottom: 1px dashed rgba(224, 122, 158, 0.14);
}
.affix-line:last-of-type { border-bottom: none; }
.affix-part {
  min-width: 92px;
  font-weight: 700;
  color: var(--section-title-color);
}
.affix-cn { color: var(--text-main); flex: 1; }
.derivation {
  margin-top: 8px;
  font-size: 13px;
  color: var(--text-sub);
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-md);
  padding: 9px 12px;
}

.synonym-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.syn-tag {
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid var(--block-border);
  color: var(--text-main);
  border-radius: 999px;
  padding: 6px 13px;
  font-size: 14px;
  font-weight: 600;
}

.detail-actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 12px;
  padding: 12px 18px calc(14px + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, rgba(255, 245, 247, 0), rgba(255, 245, 247, 0.92) 45%);
}
.detail-actions .btn-primary {
  flex: 1;
  font-size: 17px;
}
.detail-actions .btn-primary:last-child {
  background: linear-gradient(135deg, var(--btn-to), #c94f7f);
}
</style>
