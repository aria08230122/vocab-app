import { createRouter, createWebHashHistory } from 'vue-router'
import WordListView from '../views/WordListView.vue'
import WordDetailView from '../views/WordDetailView.vue'
import RecallView from '../views/RecallView.vue'
import SpellingView from '../views/SpellingView.vue'
import PlanView from '../views/PlanView.vue'
import StatsView from '../views/StatsView.vue'

const routes = [
  { path: '/', redirect: '/list' },
  { path: '/list', name: 'list', component: WordListView, meta: { title: '单词列表' } },
  { path: '/detail/:word', name: 'detail', component: WordDetailView, props: true, meta: { title: '单词详情' } },
  { path: '/recall', name: 'recall', component: RecallView, meta: { title: '看词回忆' } },
  { path: '/spelling', name: 'spelling', component: SpellingView, meta: { title: '拼写检测' } },
  { path: '/plan', name: 'plan', component: PlanView, meta: { title: '每日计划' } },
  { path: '/stats', name: 'stats', component: StatsView, meta: { title: '进度统计' } },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
