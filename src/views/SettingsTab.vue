<template>
  <div class="space-y-3.5 md:space-y-4 max-w-2xl mx-auto">
    <!-- Card 0: 主题外观 (亮色 / 暗色) -->
    <div class="rounded-lg border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3.5 md:p-5 transition-colors duration-150">
      <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-zinc-900 dark:text-white mb-1">
        界面主题外观
      </h3>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-3.5">
        自由切换暗黑极简与明亮雅致风格，兼具高对比度与专业看盘体验。
      </p>

      <div class="grid grid-cols-2 gap-3">
        <button
          @click="settings.theme = 'dark'"
          :class="[
            'p-3.5 rounded-lg border text-left transition-all duration-150',
            settings.theme === 'dark'
              ? 'border-[#5e6ad2] bg-[#5e6ad2]/10 text-white'
              : 'border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          ]"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="font-medium text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
              <Moon class="w-3.5 h-3.5 text-[#8b5cf6]" /> 暗色模式 (默认)
            </span>
            <span v-if="settings.theme === 'dark'" class="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">极简纯黑背景，减少眼部疲劳</p>
        </button>

        <button
          @click="settings.theme = 'light'"
          :class="[
            'p-3.5 rounded-lg border text-left transition-all duration-150',
            settings.theme === 'light'
              ? 'border-[#5e6ad2] bg-[#5e6ad2]/10 text-zinc-900'
              : 'border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          ]"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="font-medium text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
              <Sun class="w-3.5 h-3.5 text-amber-500" /> 亮色模式
            </span>
            <span v-if="settings.theme === 'light'" class="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">明亮素净基调，日间清晰悦目</p>
        </button>
      </div>
    </div>

    <!-- Card 1: 涨跌配色偏好 -->
    <div class="rounded-lg border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3.5 md:p-5 transition-colors duration-150">
      <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-zinc-900 dark:text-white mb-1">
        涨跌色彩模式
      </h3>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-3.5">
        根据您的看盘习惯设定涨跌展示颜色，始终辅以 ▲ / ▼ 明确方向。
      </p>

      <div class="grid grid-cols-2 gap-3">
        <button
          @click="settings.colorMode = 'cn'"
          :class="[
            'p-3.5 rounded-lg border text-left transition-all duration-150',
            settings.colorMode === 'cn'
              ? 'border-[#5e6ad2] bg-[#5e6ad2]/10 text-zinc-900 dark:text-white'
              : 'border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          ]"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-medium text-sm text-zinc-900 dark:text-white">国内习惯 (默认)</span>
            <span v-if="settings.colorMode === 'cn'" class="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
          </div>
          <div class="flex items-center gap-2 text-xs font-semibold">
            <span class="text-rose-500 dark:text-rose-400">▲ 上涨 (红)</span>
            <span class="text-zinc-400">/</span>
            <span class="text-emerald-500 dark:text-emerald-400">▼ 下跌 (绿)</span>
          </div>
        </button>

        <button
          @click="settings.colorMode = 'global'"
          :class="[
            'p-3.5 rounded-lg border text-left transition-all duration-150',
            settings.colorMode === 'global'
              ? 'border-[#5e6ad2] bg-[#5e6ad2]/10 text-zinc-900 dark:text-white'
              : 'border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          ]"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-medium text-sm text-zinc-900 dark:text-white">国际惯例</span>
            <span v-if="settings.colorMode === 'global'" class="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
          </div>
          <div class="flex items-center gap-2 text-xs font-semibold">
            <span class="text-emerald-500 dark:text-emerald-400">▲ 上涨 (绿)</span>
            <span class="text-zinc-400">/</span>
            <span class="text-rose-500 dark:text-rose-400">▼ 下跌 (红)</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Card 2: 自动刷新设置 -->
    <div class="rounded-lg border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3.5 md:p-5 transition-colors duration-150">
      <div class="flex items-center justify-between mb-1">
        <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-zinc-900 dark:text-white">
          自动更新行情
        </h3>
        <!-- Linear toggle switch -->
        <button
          @click="settings.autoRefresh = !settings.autoRefresh"
          :class="[
            'w-11 h-6 rounded-full border transition-colors duration-150 relative focus:outline-none',
            settings.autoRefresh
              ? 'bg-[#5e6ad2] border-[#5e6ad2]'
              : 'bg-zinc-200 dark:bg-white/[0.06] border-zinc-300 dark:border-white/10'
          ]"
        >
          <span
            :class="[
              'block w-4 h-4 rounded-full bg-white transition-transform duration-150 transform',
              settings.autoRefresh ? 'translate-x-5' : 'translate-x-1'
            ]"
          ></span>
        </button>
      </div>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-3.5">
        是否在后台定时拉取最新市场行情数据。
      </p>

      <!-- Refresh interval options -->
      <div v-if="settings.autoRefresh" class="space-y-2 pt-2 border-t border-zinc-200/60 dark:border-white/5">
        <label class="block text-xs font-medium text-zinc-600 dark:text-zinc-400">刷新频率间隔</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="opt in intervalOptions"
            :key="opt.value"
            @click="settings.refreshInterval = opt.value"
            :class="[
              'py-2 px-3 rounded-lg border text-center text-xs font-medium transition-all duration-150',
              settings.refreshInterval === opt.value
                ? 'border-[#5e6ad2] bg-[#5e6ad2]/15 text-zinc-900 dark:text-white'
                : 'border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            ]"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Card 3: 行情数据维护 -->
    <div class="rounded-lg border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3.5 md:p-5 transition-colors duration-150">
      <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-zinc-900 dark:text-white mb-1">
        数据同步与维护
      </h3>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-3.5">
        手动触发接口拉取或清理浏览器缓存以重新拉取基准行情。
      </p>

      <div class="flex flex-col sm:flex-row gap-2.5">
        <button
          @click="refreshData"
          :disabled="isRefreshing"
          :class="[
            'rounded-lg font-medium text-sm transition-opacity duration-150 px-4 py-2 bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white flex items-center justify-center gap-2',
            isRefreshing ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
          ]"
        >
          <RotateCw :class="['w-4 h-4', isRefreshing ? 'animate-spin' : '']" />
          <span>{{ isRefreshing ? '正在同步行情...' : '立即同步最新数据' }}</span>
        </button>

        <button
          @click="handleResetCache"
          class="rounded-lg font-medium text-sm transition-all duration-150 px-4 py-2 bg-zinc-100 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-200/80 dark:hover:bg-white/[0.08] flex items-center justify-center gap-2"
        >
          <Trash2 class="w-4 h-4 text-zinc-400" />
          <span>重置并清空缓存</span>
        </button>
      </div>

      <p v-if="cacheResetMsg" class="text-xs text-emerald-500 dark:text-emerald-400 mt-2">
        {{ cacheResetMsg }}
      </p>
    </div>

    <!-- Card 4: 关于与免责声明 -->
    <div class="rounded-lg border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3.5 md:p-5 transition-colors duration-150">
      <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-zinc-900 dark:text-white mb-1.5">
        关于与免责声明
      </h3>
      <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
        本项目遵循 Linear 极简设计规范，行情覆盖全球宏观经济、美股核心产业链、日韩亚洲综指与核心产业、有色金属及 AI 算力与硬件全链路价格。<br/>
        <span class="text-zinc-400 dark:text-zinc-500 mt-2 block">
          免责声明：本程序展示的公开查询数据，仅供参考，不构成任何投资建议。
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RotateCw, Trash2, Moon, Sun } from 'lucide-vue-next'
import { useMarket } from '../composables/useMarket'
import { MarketDataService } from '../services/marketDataService'

const { settings, isRefreshing, refreshData } = useMarket()

const intervalOptions = [
  { label: '30 秒', value: 30 },
  { label: '1 分钟 (推荐)', value: 60 },
  { label: '5 分钟', value: 300 },
]

const cacheResetMsg = ref('')

function handleResetCache() {
  MarketDataService.clearCache()
  cacheResetMsg.value = '本地缓存已清空，正在重载基准行情...'
  setTimeout(() => {
    refreshData()
    setTimeout(() => {
      cacheResetMsg.value = ''
    }, 2000)
  }, 400)
}
</script>
