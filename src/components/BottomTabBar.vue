<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0a0a0b]/95 backdrop-blur-sm border-t border-zinc-200 dark:border-white/10 px-2 py-1.5 transition-colors duration-150">
    <div class="grid grid-cols-5 items-center justify-items-center max-w-lg mx-auto">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all duration-150 w-full',
          activeTab === tab.key
            ? 'text-zinc-900 dark:text-white'
            : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-400'
        ]"
      >
        <div class="relative">
          <component
            :is="tab.icon"
            :class="[
              'w-5 h-5 transition-transform duration-150',
              activeTab === tab.key ? 'text-[#5e6ad2] dark:text-[#8b5cf6]' : 'text-zinc-400 dark:text-zinc-500'
            ]"
          />
        </div>
        <span
          :class="[
            'text-[10px] mt-1 font-sans tracking-tight',
            activeTab === tab.key ? 'font-medium text-zinc-900 dark:text-white' : 'font-normal text-zinc-500 dark:text-zinc-500'
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
