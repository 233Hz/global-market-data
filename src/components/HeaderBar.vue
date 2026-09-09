<template>
  <header
    class="sticky top-0 z-40 w-full bg-[#fffef0] dark:bg-[#18181b] border-b-4 border-[#1a1a1a] shadow-[0_4px_0px_0px_rgba(26,26,26,1)] px-4 md:px-8 pt-3.5 md:pt-0 pb-2.5 md:pb-0 transition-colors duration-100"
    style="padding-top: max(14px, env(safe-area-inset-top));"
  >
    <!-- Main Header Bar -->
    <div class="max-w-7xl mx-auto flex items-center justify-between h-12 md:h-16 gap-2 lg:gap-3">
      <!-- Left: Logo & Status indicator -->
      <div class="flex items-center gap-2 lg:gap-3 flex-shrink-0">
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="w-8 h-8 md:w-9 md:h-9 rounded-lg border-3 border-[#1a1a1a] bg-[#facc15] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center text-[#1a1a1a] flex-shrink-0">
            <Globe class="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
          </div>
          <span class="font-black uppercase tracking-wider text-base md:text-lg lg:text-xl text-[#1a1a1a] dark:text-white whitespace-nowrap select-none">
            市场板块
          </span>
        </div>

        <!-- Status Pill: only on wide screens (xl) to guarantee tabs have ample room on 768px-1200px screens -->
        <div class="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 border-[#1a1a1a] bg-white dark:bg-[#27272a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] text-xs font-black uppercase text-[#1a1a1a] dark:text-zinc-200 whitespace-nowrap flex-shrink-0">
          <span :class="['w-2.5 h-2.5 rounded-sm border border-[#1a1a1a]', hasUpdatedOnce ? 'bg-[#22c55e]' : 'bg-[#facc15] animate-pulse']"></span>
          <span class="whitespace-nowrap">{{ currentTabLabel }} · {{ hasUpdatedOnce ? `已更新 (${formattedLastUpdated})` : '初始状态 (待同步)' }}</span>
        </div>
      </div>

      <!-- Center: Desktop Tabs (Visible on md and up, guaranteed zero wrapping) -->
      <nav class="hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-lg border-3 border-[#1a1a1a] bg-white dark:bg-[#222226] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] flex-shrink-0">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all duration-100 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0',
            activeTab === tab.key
              ? 'bg-[#facc15] text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
              : 'border-2 border-transparent text-[#4a4a4a] dark:text-zinc-400 hover:text-[#1a1a1a] dark:hover:text-white hover:border-[#1a1a1a] hover:bg-[#fffef0] dark:hover:bg-[#2b2b30] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
          ]"
        >
          <component :is="tab.icon" class="w-3.5 h-3.5 stroke-[2.5] flex-shrink-0" />
          <span class="whitespace-nowrap">{{ tab.label }}</span>
        </button>
      </nav>

      <!-- Right: Action & Refresh & Theme Buttons -->
      <div class="flex items-center gap-1.5 lg:gap-2 flex-shrink-0">
        <!-- Countdown Badge (if autoRefresh enabled) -->
        <div
          v-if="settings.autoRefresh"
          class="text-xs font-mono font-black text-[#1a1a1a] dark:text-zinc-200 px-2.5 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#27272a] hidden 2xl:block whitespace-nowrap flex-shrink-0"
          title="下次自动刷新倒计时"
        >
          {{ countdown }}S 倒计时
        </div>

        <!-- Theme Toggle Button -->
        <button
          @click="toggleTheme"
          :class="[
            'rounded-lg text-xs md:text-sm transition-all duration-100 flex items-center justify-center p-2 border-2 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#27272a] text-[#1a1a1a] dark:text-zinc-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none flex-shrink-0'
          ]"
          :title="settings.theme === 'dark' ? '切换为亮色模式' : '切换为暗色模式'"
        >
          <Sun v-if="settings.theme === 'dark'" class="w-4 h-4 text-[#facc15] stroke-[2.5]" />
          <Moon v-else class="w-4 h-4 text-[#1a1a1a] stroke-[2.5]" />
        </button>

        <!-- Manual Refresh Button (Comic Red Action) -->
        <button
          @click="refreshData"
          :disabled="isRefreshing"
          :class="[
            'rounded-lg font-black uppercase text-xs md:text-sm tracking-wider transition-all duration-100 flex items-center gap-1.5 px-3 lg:px-3.5 py-1.5 border-2 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] bg-[#ef4444] text-white hover:bg-[#ff3333] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none whitespace-nowrap flex-shrink-0',
            isRefreshing ? 'opacity-60 cursor-not-allowed' : ''
          ]"
          title="立即刷新行情数据"
        >
          <RotateCw :class="['w-4 h-4 stroke-[2.5] flex-shrink-0', isRefreshing ? 'animate-spin' : '']" />
          <span class="hidden sm:inline whitespace-nowrap">{{ isRefreshing ? '更新中...' : '刷新' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Subheader with Live Status & Countdown -->
    <div class="sm:hidden flex items-center justify-between pt-2 pb-1.5 text-xs text-[#1a1a1a] dark:text-zinc-300 border-t-2 border-[#1a1a1a] mt-2 font-black uppercase">
      <div class="flex items-center gap-1.5">
        <span :class="['w-2 h-2 rounded-sm border border-[#1a1a1a]', hasUpdatedOnce ? 'bg-[#22c55e]' : 'bg-[#facc15] animate-pulse']"></span>
        <span>{{ currentTabLabel }} · {{ hasUpdatedOnce ? `已更新 (${formattedLastUpdated})` : '初始状态 (待同步)' }}</span>
      </div>
      <div v-if="settings.autoRefresh" class="text-[#1a1a1a] dark:text-zinc-300 font-mono font-bold text-[11px]">
        {{ countdown }}S 自动刷新
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Globe, RotateCw, Compass, Layers, TrendingUp, Settings, Sun, Moon } from 'lucide-vue-next'
import { useMarket } from '../composables/useMarket'
import { TabKey } from '../types/market'

const { activeTab, isRefreshing, hasUpdatedOnce, formattedLastUpdated, countdown, settings, refreshData, toggleTheme } = useMarket()

const tabs = [
  { key: 'global' as TabKey, label: '全球·美股', icon: Globe },
  { key: 'asia' as TabKey, label: '亚太·外汇', icon: Compass },
  { key: 'metals' as TabKey, label: '有色金属', icon: Layers },
  { key: 'china' as TabKey, label: 'A股·港股', icon: TrendingUp },
  { key: 'settings' as TabKey, label: '设置', icon: Settings },
]

const currentTabLabel = computed(() => {
  const t = tabs.find(item => item.key === activeTab.value)
  return t ? t.label : '全球·美股'
})
</script>
