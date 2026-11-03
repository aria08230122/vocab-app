<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { words } from '../data/words'
import { useAppStore } from '../stores/app'

const router = useRouter()
const store = useAppStore()

const keyword = ref('')
const visibleCount = ref(100)
const PAGE = 60

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  if (!k) return words
  return words.filter(
    (w) => w.word.toLowerCase().includes(k) || w.meanings.some((m) => m.includes(keyword.value.trim())),
  )
})

const visible = computed(() => filtered.value.slice(0, visibleCount.value))

watch(keyword, () => {
  visibleCount.value = 100
})

function loadMore() {
  visibleCount.value += PAGE
}

function openWord(w) {
  router.push({ name: 'detail', params: { word: w.word } })
}
</script>

<template>
  <div class="page-wrap">
    <header class="list-head">
      <h1 class="page-title">单词列表</h1>
      <p class="text-sub">{{ words.length }} 个单词 · 粉色小本本</p>
    </header>

    <input v-model="keyword" class="search" type="search" placeholder="搜索单词或中文释义…" />

    <div class="list">
      <div v-for="w in visible" :key="w.word" class="row-card" @click="openWord(w)">
        <div class="row-left">
          <div class="row-word">{{ w.word }}</div>
          <div class="row-meaning">{{ w.meanings[0] }}</div>
        </div>
        <div class="row-marks">
          <span v-if="store.isFavorite(w.word)" class="mark" title="已收藏">♥</span>
          <span v-if="store.isMastered(w.word)" class="mark known" title="已掌握">✓</span>
        </div>
      </div>
      <p v-if="filtered.length === 0" class="text-sub empty">没有匹配的单词</p>
      <button v-else-if="visible.length < filtered.length" class="load-more" @click="loadMore">
        加载更多（{{ visible.length }}/{{ filtered.length }}）
      </button>
    </div>
  </div>
</template>

<style scoped>
.list-head { margin-bottom: 14px; }
.list-head .text-sub { margin: 4px 0 0; }

.search {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--block-border);
  border-radius: 999px;
  background: var(--block-bg);
  font-size: 15px;
  color: var(--text-main);
  outline: none;
  margin-bottom: 16px;
}
.search:focus { border-color: var(--btn-to); }

.row-left { min-width: 0; }
.row-word { font-size: 18px; font-weight: 700; }
.row-meaning {
  font-size: 13px;
  color: var(--text-sub);
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 260px;
}
.row-marks { display: flex; gap: 6px; }
.mark {
  color: #ff6b9d;
  font-size: 16px;
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 107, 157, 0.08);
}
.mark.known { color: #4caf7d; background: rgba(255, 255, 255, 0.1); }
.empty { text-align: center; padding: 30px 0; }
.load-more {
  display: block;
  margin: 16px auto 4px;
  padding: 10px 22px;
  border: 1px solid var(--block-border);
  border-radius: 999px;
  background: var(--block-bg);
  color: var(--btn-to);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
</style>
