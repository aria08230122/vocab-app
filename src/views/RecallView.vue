<script setup>
import { computed, ref, watch } from 'vue'
import { words } from '../data/words'
import { useAppStore } from '../stores/app'

const store = useAppStore()

const index = ref(0)
const revealed = ref(false)
const done = ref(false)

const current = computed(() => words[index.value % words.length])

function next() {
  revealed.value = false
  done.value = false
  index.value += 1
}

function reveal() {
  revealed.value = true
}

function rate(known) {
  store.recordRecall(current.value.word, known)
  store.markLearned(current.value.word)
  if (known) store.toggleMastered(current.value.word)
  done.value = true
  setTimeout(next, 700)
}

watch(done, () => {})
</script>

<template>
  <div class="page-wrap">
    <header class="recall-head">
      <h1 class="page-title">看词回忆</h1>
      <p class="text-sub">看到单词，先回忆释义，再翻卡核对</p>
    </header>

    <div class="card" :class="{ revealed }" @click="!revealed && reveal()">
      <div class="card-front">
        <div class="recall-word">{{ current.word }}</div>
        <div class="recall-hint">点击翻卡查看释义</div>
      </div>
      <div class="card-back">
        <div class="recall-meaning" v-for="(m, i) in current.meanings" :key="i">{{ m }}</div>
        <div class="recall-tip">词组 / 词根 / 近义 → 详情页查看</div>
      </div>
    </div>

    <div v-if="revealed" class="rate-row">
      <button class="btn-ghost" @click="rate(false)">忘了</button>
      <button class="btn-primary" @click="rate(true)">记得</button>
    </div>
    <p v-else class="tap-tip">💭 先在心里默想释义</p>
  </div>
</template>

<style scoped>
.recall-head { margin-bottom: 22px; }
.recall-head .text-sub { margin: 4px 0 0; }

.card {
  position: relative;
  min-height: 300px;
  border-radius: var(--radius-lg);
  background: var(--block-bg);
  border: 1px solid var(--block-border);
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  overflow: hidden;
}
.card-front,
.card-back {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 24px;
  text-align: center;
}
.card-back { display: none; }
.card.revealed .card-front { display: none; }
.card.revealed .card-back { display: flex; gap: 10px; }

.recall-word {
  font-size: 44px;
  font-weight: 800;
  letter-spacing: 1px;
}
.recall-hint {
  margin-top: 18px;
  font-size: 13px;
  color: var(--text-sub);
}
.recall-meaning { font-size: 15px; line-height: 1.7; }
.recall-tip {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-sub);
}

.rate-row {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}
.rate-row .btn-primary,
.rate-row .btn-ghost { flex: 1; }
.tap-tip {
  text-align: center;
  color: var(--text-sub);
  font-size: 13px;
  margin-top: 18px;
}
</style>
