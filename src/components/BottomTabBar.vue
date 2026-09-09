<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffef0] dark:bg-[#18181b] border-t-4 border-[#1a1a1a] shadow-[0_-4px_0_0_rgba(26,26,26,1)] px-2 py-1.5 transition-colors duration-100">
    <div class="grid grid-cols-5 items-center justify-items-center max-w-lg mx-auto gap-1">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-all duration-100 w-full',
          activeTab === tab.key
            ? 'bg-[#facc15] text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] font-black'
            : 'text-[#4a4a4a] dark:text-zinc-400 hover:text-[#1a1a1a] dark:hover:text-white border-2 border-transparent'
        ]"
      >
        <div class="relative">
          <component
            :is="tab.icon"
            :class="[
              'w-5 h-5 stroke-[2.5]',
              activeTab === tab.key ? 'text-[#1a1a1a]' : 'text-[#4a4a4a] dark:text-zinc-400'
            ]"
          />
        </div>
        <span
          :class="[
            'text-[10px] mt-0.5 uppercase tracking-wide',
            activeTab === tab.key ? 'font-black text-[#1a1a1a]' : 'font-bold'
          ]"
        >
          {{ tab.label }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Globe, Compass, Layers, Cpu, Settings } from 'lucide-vue-next'
import { useMarket } from '../composables/useMarket'
import { TabKey } from '../types/market'

const { activeTab } = useMarket()

const tabs = [
  { key: 'global' as TabKey, label: '全球', icon: Globe },
  { key: 'asia' as TabKey, label: '日韩', icon: Compass },
  { key: 'metals' as TabKey, label: '有色', icon: Layers },
  { key: 'ai' as TabKey, label: 'AI', icon: Cpu },
  { key: 'settings' as TabKey, label: '设置', icon: Settings },
]
</script>
