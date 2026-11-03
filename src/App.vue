<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { themeConfig } from './config/theme'

const route = useRoute()

/** 背景模式由主题配置决定：image / gradient / color */
const bgMode = computed(() => {
  const bg = themeConfig.background
  if (bg.mode === 'image' && bg.imageUrl) return 'image'
  return bg.mode
})

/** 详情页沉浸阅读，不显示底部导航；其余页面显示 */
const showNav = computed(() => route.name !== 'detail')
</script>

<template>
  <div class="page-bg" :data-bg="bgMode">
    <router-view />
    <NavBar v-if="showNav" />
  </div>
</template>
