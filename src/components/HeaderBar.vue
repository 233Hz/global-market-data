<template>
  <header
    class="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0a0a0b]/95 backdrop-blur-sm border-b border-zinc-200 dark:border-white/10 px-4 md:px-8 pt-3.5 md:pt-0 pb-2.5 md:pb-0 transition-colors duration-150"
    style="padding-top: max(14px, env(safe-area-inset-top));"
  >
    <!-- Main Header Bar -->
    <div class="max-w-7xl mx-auto flex items-center justify-between h-10 md:h-16 gap-3">
      <!-- Left: Logo & Status indicator -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/[0.03] flex items-center justify-center text-[#5e6ad2]">
            <Globe class="w-4 h-4" />
          </div>
          <span class="font-sans font-semibold tracking-tight text-base md:text-lg text-zinc-900 dark:text-white">市场板块</span>
        </div>

        <!-- Status Dot (Desktop & Tablet) -->
        <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-white/10 bg-zinc-100/80 dark:bg-white/[0.03] text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <span :class="['w-1.5 h-1.5 rounded-full', hasUpdatedOnce ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping']"></span>
          <span>{{ currentTabLabel }} · {{ hasUpdatedOnce ? `已更新 (${formattedLastUpdated})` : '初始数据 (正在同步行情...)' }}</span>
        </div>
      </div>

      <!-- Center: Desktop Tabs (Visible on md and up) -->
      <nav class="hidden md:flex items-center gap-1 p-1 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100/60 dark:bg-white/[0.02]">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-3.5 py-1.5 rounded-md font-sans text-xs font-medium transition-all duration-150 flex items-center gap-1.5',
            activeTab === tab.key
              ? 'bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/[0.04]'
          ]"
        >
          <component :is="tab.icon" class="w-3.5 h-3.5" />
          <span>{{ tab.label }}</span>
        </button>
      </nav>

      <!-- Right: Action & Refresh & Theme Buttons -->
      <div class="flex items-center gap-2">
        <!-- Countdown Badge (if autoRefresh enabled) -->
        <div
          v-if="settings.autoRefresh"
          class="text-xs text-zinc-500 dark:text-zinc-500 font-sans px-2.5 py-1 rounded border border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-white/[0.02] hidden lg:block"
          title="下次自动刷新倒计时"
        >
          {{ countdown }}s 倒计时
        </div>

        <!-- Theme Toggle Button -->
        <button
          @click="toggleTheme"
          :class="[
            'rounded-lg font-medium text-xs md:text-sm transition-all duration-150 flex items-center gap-1.5 px-2.5 py-1.5 border border-zinc-200 dark:border-white/10 bg-zinc-100/80 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/80 dark:hover:bg-white/[0.06] active:opacity-80'
          ]"
          :title="settings.theme === 'dark' ? '切换为亮色模式' : '切换为暗色模式'"
        >
          <Sun v-if="settings.theme === 'dark'" class="w-3.5 h-3.5 text-amber-400" />
          <Moon v-else class="w-3.5 h-3.5 text-zinc-600" />
        </button>

        <!-- Manual Refresh Button -->
        <button
          @click="refreshData"
          :disabled="isRefreshing"
          :class="[
            'rounded-lg font-medium text-xs md:text-sm transition-all duration-150 flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-white/10 bg-zinc-100/80 dark:bg-white/[0.03] text-zinc-800 dark:text-white hover:bg-zinc-200/80 dark:hover:bg-white/[0.06] active:opacity-80',
            isRefreshing ? 'opacity-60 cursor-not-allowed' : ''
          ]"
          title="立即刷新行情数据"
        >
          <RotateCw :class="['w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400', isRefreshing ? 'animate-spin text-[#8b5cf6]' : '']" />
          <span class="hidden sm:inline">{{ isRefreshing ? '更新中...' : '刷新' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Subheader with Live Status & Countdown -->
    <div class="sm:hidden flex items-center justify-between pt-2 pb-1 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/80 dark:border-white/5 mt-2">
      <div class="flex items-center gap-1.5">
        <span :class="['w-1.5 h-1.5 rounded-full', hasUpdatedOnce ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping']"></span>
        <span>{{ currentTabLabel }} · {{ hasUpdatedOnce ? `已更新 (${formattedLastUpdated})` : '初始数据 (正在同步...)' }}</span>
      </div>
      <div v-if="settings.autoRefresh" class="text-zinc-500 font-sans text-[11px]">
        {{ countdown }}s 自动刷新
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Globe, RotateCw, Compass, Layers, Cpu, Settings, Sun, Moon } from 'lucide-vue-next'
import { useMarket } from '../composables/useMarket'
import { TabKey } from '../types/market'

const { activeTab, isRefreshing, hasUpdatedOnce, formattedLastUpdated, countdown, settings, refreshData, toggleTheme } = useMarket()

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
