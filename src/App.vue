<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>



<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
