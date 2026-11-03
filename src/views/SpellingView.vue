<script setup>
import { computed, ref } from 'vue'
import { words } from '../data/words'
import { useAppStore } from '../stores/app'

const store = useAppStore()

const index = ref(0)
const input = ref('')
const result = ref(null) // null | 'correct' | 'wrong'
const revealWord = ref(false)

const current = computed(() => words[index.value % words.length])
const prompt = computed(() => current.value.meanings[0])

function check() {
  const answer = input.value.trim().toLowerCase()
  if (!answer) return
  const ok = answer === current.value.word.toLowerCase()
  result.value = ok ? 'correct' : 'wrong'
  store.recordSpelling(current.value.word, ok)
  store.markLearned(current.value.word)
  if (ok) store.toggleMastered(current.value.word)
}

function next() {
  input.value = ''
  result.value = null
  revealWord.value = false
  index.value += 1
}
</script>

<template>
  <div class="page-wrap">
    <header class="spell-head">
      <h1 class="page-title">拼写检测</h1>
      <p class="text-sub">看中文释义，写出英文单词</p>
    </header>

    <section class="section-block prompt-block">
      <div class="prompt-text">{{ prompt }}</div>
      <div class="prompt-phonetic" v-if="revealWord">{{ current.word }} · {{ current.phonetic }}</div>
    </section>

    <input
      v-model="input"
      class="spell-input"
      type="text"
      :placeholder="'拼写：' + '·'.repeat(current.word.length)"
      @keyup.enter="check"
      :disabled="result !== null"
    />

    <div v-if="result === null" class="spell-actions">
      <button class="btn-ghost" @click="revealWord = !revealWord">
        {{ revealWord ? '隐藏答案' : '偷看一眼' }}
      </button>
      <button class="btn-primary" @click="check" :disabled="!input.trim()">提交</button>
    </div>

    <div v-else class="result-box" :class="result">
      <template v-if="result === 'correct'">🎀 拼写正确，太棒了！</template>
      <template v-else>正确答案是 <b>{{ current.word }}</b>，再记一次～</template>
      <button class="btn-primary next-btn" @click="next">下一个</button>
    </div>
  </div>
</template>

<style scoped>
.spell-head { margin-bottom: 22px; }
.spell-head .text-sub { margin: 4px 0 0; }

.prompt-block { text-align: center; padding: 30px 20px; }
.prompt-text { font-size: 19px; line-height: 1.7; font-weight: 600; }
.prompt-phonetic { margin-top: 12px; font-size: 14px; color: var(--btn-to); }

.spell-input {
  width: 100%;
  margin: 16px 0;
  padding: 14px 18px;
  border: 1.5px solid var(--block-border);
  border-radius: var(--radius-md);
  background: var(--block-bg);
  font-size: 18px;
  text-align: center;
  letter-spacing: 3px;
  outline: none;
  color: var(--text-main);
}
.spell-input:focus { border-color: var(--btn-to); }
.spell-input:disabled { opacity: 0.7; }

.spell-actions { display: flex; gap: 12px; }
.spell-actions .btn-primary,
.spell-actions .btn-ghost { flex: 1; }

.result-box {
  border-radius: var(--radius-md);
  padding: 16px;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
}
.result-box.correct { background: rgba(76, 175, 125, 0.10); color: #2e7d5b; }
.result-box.wrong { background: rgba(255, 107, 157, 0.10); color: #c94f7f; }
.next-btn { width: 100%; margin-top: 14px; }
</style>
