<template>
  <header class="sticky top-0 z-40 w-full bg-[#0a0a0b]/95 backdrop-blur-sm border-b border-white/10 px-4 md:px-8">
    <div class="max-w-6xl mx-auto flex items-center justify-between h-14 md:h-16 gap-3">
      <!-- Left: Logo & Status indicator -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#5e6ad2]">
            <Globe class="w-4 h-4" />
          </div>
          <span class="font-sans font-semibold tracking-tight text-base md:text-lg text-white">市场板块</span>
        </div>

        <!-- Status Dot -->
        <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-400">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{{ currentTabLabel }} · 已更新 ({{ formattedLastUpdated }})</span>
        </div>
      </div>

      <!-- Center: Desktop Tabs (Visible on md and up) -->
      <nav class="hidden md:flex items-center gap-1 p-1 rounded-lg border border-white/10 bg-white/[0.02]">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-3.5 py-1.5 rounded-md font-sans text-xs font-medium transition-all duration-150 flex items-center gap-1.5',
            activeTab === tab.key
              ? 'bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
          ]"
        >
          <component :is="tab.icon" class="w-3.5 h-3.5" />
          <span>{{ tab.label }}</span>
        </button>
      </nav>

      <!-- Right: Action & Refresh Buttons -->
      <div class="flex items-center gap-2">
        <!-- Countdown Badge (if autoRefresh enabled) -->
        <div
          v-if="settings.autoRefresh"
          class="text-xs text-zinc-500 font-sans px-2 py-1 rounded border border-white/5 bg-white/[0.02] hidden lg:block"
          title="下次自动刷新倒计时"
        >
          {{ countdown }}s
        </div>

        <!-- Manual Refresh Button -->
        <button
          @click="refreshData"
          :disabled="isRefreshing"
          :class="[
            'rounded-lg font-medium text-xs md:text-sm transition-all duration-150 flex items-center gap-1.5 px-3 py-1.5 border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] active:opacity-80',
            isRefreshing ? 'opacity-60 cursor-not-allowed' : ''
          ]"
          title="立即刷新行情数据"
        >
          <RotateCw :class="['w-3.5 h-3.5 text-zinc-400', isRefreshing ? 'animate-spin text-[#8b5cf6]' : '']" />
          <span class="hidden sm:inline">{{ isRefreshing ? '更新中...' : '刷新' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Subheader with Live Status on Small Screens -->
    <div class="sm:hidden flex items-center justify-between py-1.5 text-xs text-zinc-400 border-t border-white/5">
      <div class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{{ currentTabLabel }} · 已更新 ({{ formattedLastUpdated }})</span>
      </div>
      <div v-if="settings.autoRefresh" class="text-zinc-500 font-sans text-[11px]">
        {{ countdown }}s 自动刷新
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Globe, RotateCw, Compass, Layers, Cpu, Settings } from 'lucide-vue-next'
import { useMarket } from '../composables/useMarket'
import { TabKey } from '../types/market'

const { activeTab, isRefreshing, formattedLastUpdated, countdown, settings, refreshData } = useMarket()

const tabs = [
  { key: 'global' as TabKey, label: '全球', icon: Globe },
  { key: 'asia' as TabKey, label: '日韩', icon: Compass },
  { key: 'metals' as TabKey, label: '有色', icon: Layers },
  { key: 'ai' as TabKey, label: 'AI', icon: Cpu },
  { key: 'settings' as TabKey, label: '设置', icon: Settings },
]

const currentTabLabel = computed(() => {
  const t = tabs.find(item => item.key === activeTab.value)
  return t ? t.label : '全球'
})
</script>
