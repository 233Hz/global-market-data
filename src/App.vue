<template>
  <div class="min-h-screen bg-[#fffef0] dark:bg-[#121212] comic-dots text-[#1a1a1a] dark:text-[#f4f4f5] flex flex-col selection:bg-[#facc15] selection:text-[#1a1a1a] transition-colors duration-100 font-sans">
    <!-- Top Navigation / Header -->
    <HeaderBar />

    <!-- Main Content Canvas: max-w-7xl allows high-density layout on PC with comic framing -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-5 md:pt-7 pb-24 md:pb-12">
      <Transition name="comic-fade" mode="out-in">
        <KeepAlive>
          <component :is="currentView" />
        </KeepAlive>
      </Transition>
    </main>

    <!-- Bottom Mobile Tab Bar -->
    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMarket } from './composables/useMarket'
import HeaderBar from './components/HeaderBar.vue'
import BottomTabBar from './components/BottomTabBar.vue'
import GlobalTab from './views/GlobalTab.vue'
import AsiaTab from './views/AsiaTab.vue'
import MetalsTab from './views/MetalsTab.vue'
import AiTab from './views/AiTab.vue'
import SettingsTab from './views/SettingsTab.vue'

const { activeTab, refreshData } = useMarket()

const currentView = computed(() => {
  switch (activeTab.value) {
    case 'global':
      return GlobalTab
    case 'asia':
      return AsiaTab
    case 'metals':
      return MetalsTab
    case 'ai':
      return AiTab
    case 'settings':
      return SettingsTab
    default:
      return GlobalTab
  }
})

onMounted(() => {
  // Trigger initial live fetch in background
  refreshData()
})
</script>

<style scoped>
.comic-fade-enter-active,
.comic-fade-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}

.comic-fade-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.comic-fade-leave-to {
  opacity: 0;
  transform: scale(1.01);
}
</style>
