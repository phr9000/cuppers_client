<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
body {
  box-sizing: border-box;
  font-family: 'Montserrat', 'Noto Sans KR', -apple-system, system-ui,
    BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, sans-serif;
}
.fade-enter-active {
  transition: opacity 0.25s ease;
  transition-delay: 0.25s;
}
</style>
