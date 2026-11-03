<script setup>
import { useAppStore } from '../stores/app'

const store = useAppStore()
</script>

<template>
  <nav class="nav-bar">
    <router-link class="nav-item" to="/list">
      <span class="nav-icon">📖</span>
      <span>单词列表</span>
    </router-link>
    <router-link class="nav-item" to="/recall">
      <span class="nav-icon">💭</span>
      <span>看词回忆</span>
    </router-link>
    <router-link class="nav-item" to="/spelling">
      <span class="nav-icon">✍️</span>
      <span>拼写检测</span>
    </router-link>
    <router-link class="nav-item" to="/plan">
      <span class="nav-icon">📅</span>
      <span>每日计划</span>
    </router-link>
    <router-link class="nav-item" to="/stats">
      <span class="nav-icon">📊</span>
      <span>进度统计</span>
    </router-link>
  </nav>
</template>

<style scoped>
/* 样式在全局 main.css 的 .nav-bar / .nav-item 中定义 */
</style>
