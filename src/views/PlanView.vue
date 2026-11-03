<script setup>
import { computed, ref } from 'vue'
import { words } from '../data/words'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const goalInput = ref(String(store.dailyGoal))

const goal = computed(() => store.dailyGoal)
const count = computed(() => store.todayCount)
const progress = computed(() => Math.round(store.todayProgress * 100))

const tips = [
  '每天固定时间背一轮，记忆更牢固',
  '先 5 词一小轮，再复习，再学新词',
  '结合词组搭配记忆，单词更立体',
]

function applyGoal() {
  const n = parseInt(goalInput.value, 10)
  if (!Number.isNaN(n)) store.setDailyGoal(n)
  goalInput.value = String(store.dailyGoal)
}
</script>

<template>
  <div class="page-wrap">
    <header class="plan-head">
      <h1 class="page-title">每日计划</h1>
      <p class="text-sub">定个小目标，每天进步一点点</p>
    </header>

    <section class="section-block">
      <h3 class="section-title">今日进度</h3>
      <div class="progress-num">
        <b>{{ count }}</b><span> / {{ goal }} 词</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="progress-tip">{{ progress >= 100 ? '🎉 今日目标达成！' : `还差 ${Math.max(0, goal - count)} 个单词` }}</p>
    </section>

    <section class="section-block">
      <h3 class="section-title">目标单词数</h3>
      <div class="goal-row">
        <input v-model="goalInput" class="goal-input" type="number" min="1" max="200" />
        <button class="btn-primary goal-btn" @click="applyGoal">设置</button>
      </div>
    </section>

    <section class="section-block">
      <h3 class="section-title">学习小贴士</h3>
      <ul class="tips">
        <li v-for="(t, i) in tips" :key="i">{{ t }}</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.plan-head { margin-bottom: 22px; }
.plan-head .text-sub { margin: 4px 0 0; }

.progress-num {
  font-size: 15px;
  color: var(--text-sub);
  margin-bottom: 12px;
}
.progress-num b {
  font-size: 34px;
  color: var(--btn-to);
  margin-right: 4px;
}
.progress-track {
  height: 12px;
  border-radius: 999px;
  background: rgba(224, 122, 158, 0.12);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--btn-from), var(--btn-to));
  transition: width 0.4s ease;
}
.progress-tip {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--text-sub);
}

.goal-row { display: flex; gap: 12px; }
.goal-input {
  flex: 1;
  padding: 12px 16px;
  border: 1.5px solid var(--block-border);
  border-radius: var(--radius-md);
  font-size: 17px;
  text-align: center;
  background: rgba(255, 255, 255, 0.6);
  outline: none;
  color: var(--text-main);
}
.goal-input:focus { border-color: var(--btn-to); }
.goal-btn { padding: 12px 28px; font-size: 15px; }

.tips { margin: 0; padding-left: 20px; }
.tips li { font-size: 14px; line-height: 1.9; color: var(--text-main); }
</style>
