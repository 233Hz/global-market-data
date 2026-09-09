<template>
  <div class="space-y-4 md:space-y-6 max-w-2xl mx-auto">
    <!-- Card 1: 涨跌配色偏好 -->
    <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-white mb-1">
        涨跌色彩模式
      </h3>
      <p class="text-xs text-zinc-400 mb-4">
        根据您的看盘习惯设定涨跌展示颜色，始终辅以 ▲ / ▼ 明确方向。
      </p>

      <div class="grid grid-cols-2 gap-3">
        <button
          @click="settings.colorMode = 'cn'"
          :class="[
            'p-3.5 rounded-lg border text-left transition-all duration-150',
            settings.colorMode === 'cn'
              ? 'border-[#5e6ad2] bg-[#5e6ad2]/10 text-white'
              : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
          ]"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-medium text-sm text-white">国内习惯 (默认)</span>
            <span v-if="settings.colorMode === 'cn'" class="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
          </div>
          <div class="flex items-center gap-2 text-xs font-semibold">
            <span class="text-rose-400">▲ 上涨 (红)</span>
            <span class="text-zinc-600">/</span>
            <span class="text-emerald-400">▼ 下跌 (绿)</span>
          </div>
        </button>

        <button
          @click="settings.colorMode = 'global'"
          :class="[
            'p-3.5 rounded-lg border text-left transition-all duration-150',
            settings.colorMode === 'global'
              ? 'border-[#5e6ad2] bg-[#5e6ad2]/10 text-white'
              : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
          ]"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-medium text-sm text-white">国际惯例</span>
            <span v-if="settings.colorMode === 'global'" class="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
          </div>
          <div class="flex items-center gap-2 text-xs font-semibold">
            <span class="text-emerald-400">▲ 上涨 (绿)</span>
            <span class="text-zinc-600">/</span>
            <span class="text-rose-400">▼ 下跌 (红)</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Card 2: 自动刷新设置 -->
    <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <div class="flex items-center justify-between mb-1">
        <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-white">
          自动更新行情
        </h3>
        <!-- Linear toggle switch -->
        <button
          @click="settings.autoRefresh = !settings.autoRefresh"
          :class="[
            'w-11 h-6 rounded-full border transition-colors duration-150 relative focus:outline-none',
            settings.autoRefresh
              ? 'bg-[#5e6ad2] border-[#5e6ad2]'
              : 'bg-white/[0.06] border-white/10'
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
      <p class="text-xs text-zinc-400 mb-4">
        是否在后台定时拉取最新市场行情数据。
      </p>

      <!-- Refresh interval options -->
      <div v-if="settings.autoRefresh" class="space-y-2 pt-2 border-t border-white/5">
        <label class="block text-xs font-medium text-zinc-400">刷新频率间隔</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="opt in intervalOptions"
            :key="opt.value"
            @click="settings.refreshInterval = opt.value"
            :class="[
              'py-2 px-3 rounded-lg border text-center text-xs font-medium transition-all duration-150',
              settings.refreshInterval === opt.value
                ? 'border-[#5e6ad2] bg-[#5e6ad2]/15 text-white'
                : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white'
            ]"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Card 3: 行情数据维护 -->
    <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-white mb-1">
        数据同步与缓存
      </h3>
      <p class="text-xs text-zinc-400 mb-4">
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
          class="rounded-lg font-medium text-sm transition-all duration-150 px-4 py-2 bg-white/[0.03] text-zinc-300 border border-white/10 hover:bg-white/[0.08] flex items-center justify-center gap-2"
        >
          <Trash2 class="w-4 h-4 text-zinc-400" />
          <span>重置并清空缓存</span>
        </button>
      </div>

      <p v-if="cacheResetMsg" class="text-xs text-emerald-400 mt-2">
        {{ cacheResetMsg }}
      </p>
    </div>

    <!-- Card 4: 关于与免责声明 -->
    <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-white mb-2">
        关于与免责声明
      </h3>
      <p class="text-xs text-zinc-400 leading-relaxed">
        本项目遵循 Linear 极简暗黑设计规范，行情覆盖全球宏观经济、美股核心产业链、日韩亚洲综指与核心产业、有色小金属及 AI 算力与硬件全链路价格。<br/>
        <span class="text-zinc-500 mt-2 block">
          免责声明：本程序展示的公开查询数据，仅供参考，不构成任何投资建议。
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RotateCw, Trash2 } from 'lucide-vue-next'
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
