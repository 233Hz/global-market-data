<template>
  <div class="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0a0b] text-zinc-900 dark:text-white flex flex-col selection:bg-[#5e6ad2]/30 selection:text-white transition-colors duration-150">
    <!-- Top Navigation / Header -->
    <HeaderBar />

    <!-- Main Content Canvas: max-w-7xl allows high-density layout on PC -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-5 md:pt-7 pb-24 md:pb-12">
      <Transition name="fade" mode="out-in">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
