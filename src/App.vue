<template>
  <div class="min-h-screen bg-[#0a0a0b] text-white flex flex-col selection:bg-[#5e6ad2]/30 selection:text-white">
    <!-- Top Navigation / Header -->
    <HeaderBar />

    <!-- Main Content Canvas -->
    <main class="flex-1 max-w-4xl w-full mx-auto px-3.5 md:px-6 py-4 md:py-8 pb-20 md:pb-12">
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

const { activeTab, setup, refreshData } = useMarket()

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
  setup()
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
