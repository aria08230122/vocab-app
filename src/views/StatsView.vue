<script setup>
import { computed } from 'vue'
import { words } from '../data/words'
import { useAppStore } from '../stores/app'

const store = useAppStore()

const total = words.length
const favCount = computed(() => store.favorites.length)
const knownCount = computed(() => store.mastered.length)
const todayCount = computed(() => store.todayCount)
const accuracy = computed(() => store.accuracy)
const goal = computed(() => store.dailyGoal)
const progress = computed(() => Math.round(store.todayProgress * 100))

const stats = computed(() => [
  { label: '词库总数', value: total, unit: '词' },
  { label: '已掌握', value: knownCount.value, unit: '词' },
  { label: '已收藏', value: favCount.value, unit: '词' },
  { label: '今日已学', value: todayCount.value, unit: '词' },
  { label: '今日目标', value: goal.value, unit: '词' },
  { label: '练习正确率', value: accuracy.value, unit: '%' },
])

const knownRate = computed(() =>
  total > 0 ? Math.round((knownCount.value / total) * 100) : 0,
)
</script>

<template>
  <div class="page-wrap">
    <header class="stats-head">
      <h1 class="page-title">进度统计</h1>
      <p class="text-sub">粉色小本本的学习足迹</p>
    </header>

    <section class="section-block overview">
      <div class="overview-num">{{ knownRate }}%</div>
      <div class="overview-label">已掌握进度</div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: knownRate + '%' }"></div>
      </div>
      <div class="overview-sub">今日进度 {{ progress }}% · 目标 {{ goal }} 词</div>
    </section>

    <section class="section-block">
      <h3 class="section-title">数据一览</h3>
      <div class="stat-grid">
        <div v-for="(s, i) in stats" :key="i" class="stat-cell">
          <div class="stat-value">{{ s.value }}<span class="stat-unit">{{ s.unit }}</span></div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.stats-head { margin-bottom: 22px; }
.stats-head .text-sub { margin: 4px 0 0; }

.overview { text-align: center; padding: 26px 20px; }
.overview-num {
  font-size: 46px;
  font-weight: 800;
  color: var(--btn-to);
  line-height: 1.1;
}
.overview-label {
  font-size: 14px;
  color: var(--text-sub);
  margin: 6px 0 14px;
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
.overview-sub {
  margin-top: 12px;
  font-size: 13px;
  color: var(--text-sub);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.stat-cell {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid var(--block-border);
  border-radius: var(--radius-md);
  padding: 16px 12px;
  text-align: center;
}
.stat-value {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-main);
}
.stat-unit { font-size: 13px; color: var(--text-sub); margin-left: 2px; }
.stat-label {
  margin-top: 6px;
  font-size: 13px;
  color: var(--text-sub);
}
</style>
