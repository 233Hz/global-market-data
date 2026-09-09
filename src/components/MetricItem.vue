<template>
  <div
    class="rounded-lg border-2 sm:border-3 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] md:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#202024] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 p-2.5 sm:p-3 flex flex-col justify-between group"
  >
    <!-- Top Row: Name, Subtitle & Icon on Left; Trend Badges on Right -->
    <div class="flex items-start justify-between gap-1.5 mb-1.5">
      <div class="flex items-center gap-1.5 min-w-0">
        <span v-if="item.icon" class="text-sm sm:text-base select-none flex-shrink-0 leading-none">{{ item.icon }}</span>
        <div class="flex flex-col min-w-0">
          <span class="whitespace-nowrap text-xs sm:text-sm text-[#1a1a1a] dark:text-white font-black tracking-tight leading-tight">
            {{ item.name }}
          </span>
          <span
            v-if="item.subtitle || item.symbol"
            class="text-[10px] text-[#71717a] dark:text-zinc-400 font-mono font-bold whitespace-nowrap leading-tight mt-0.5"
          >
            {{ item.subtitle || item.symbol }}
          </span>
        </div>
      </div>

      <!-- Trend Badges: Percent Change + Change Amount -->
      <div class="flex flex-col items-end flex-shrink-0 gap-0.5">
        <span :class="['px-1.5 py-0.5 rounded font-mono font-black text-[11px] sm:text-xs whitespace-nowrap tracking-tight', trend.badgeClass]">
          {{ trend.formattedPercent }}
        </span>
        <span
          v-if="formattedChange"
          :class="['text-[10px] font-mono font-black tracking-tight whitespace-nowrap', trend.textClass]"
        >
          {{ formattedChange }}
        </span>
      </div>
    </div>

    <!-- Middle Row: Price & Unit (if item has price) -->
    <div v-if="item.price !== undefined && item.price !== ''" class="flex items-baseline justify-between my-1">
      <span class="text-base sm:text-lg md:text-xl font-mono font-black text-[#1a1a1a] dark:text-white tracking-tight">
        {{ item.price }}
      </span>
      <span v-if="item.unit" class="text-[10px] text-[#52525b] dark:text-zinc-400 font-black uppercase tracking-wider ml-1">
        {{ item.unit }}
      </span>
    </div>

    <!-- Bottom Row: OHLC Detail Grid (Open, High, Low) & Timestamp -->
    <div
      v-if="hasOhlc || item.time"
      class="pt-1.5 mt-1 border-t-2 border-dashed border-[#1a1a1a]/20 dark:border-zinc-700/60 flex flex-col gap-1 text-[10px] font-mono"
    >
      <div v-if="hasOhlc" class="grid grid-cols-3 gap-1 text-center font-bold">
        <div class="bg-[#fffef0] dark:bg-[#2b2b30] rounded px-1 py-0.5 border border-[#1a1a1a]/30 dark:border-zinc-700">
          <span class="text-[#71717a] dark:text-zinc-400 text-[9px] mr-0.5">高</span>
          <span class="text-[#1a1a1a] dark:text-zinc-200 font-black">{{ item.high || '--' }}</span>
        </div>
        <div class="bg-[#fffef0] dark:bg-[#2b2b30] rounded px-1 py-0.5 border border-[#1a1a1a]/30 dark:border-zinc-700">
          <span class="text-[#71717a] dark:text-zinc-400 text-[9px] mr-0.5">低</span>
          <span class="text-[#1a1a1a] dark:text-zinc-200 font-black">{{ item.low || '--' }}</span>
        </div>
        <div class="bg-[#fffef0] dark:bg-[#2b2b30] rounded px-1 py-0.5 border border-[#1a1a1a]/30 dark:border-zinc-700">
          <span class="text-[#71717a] dark:text-zinc-400 text-[9px] mr-0.5">开</span>
          <span class="text-[#1a1a1a] dark:text-zinc-200 font-black">{{ item.open || '--' }}</span>
        </div>
      </div>
      <div v-if="item.time" class="flex justify-between items-center text-[9px] text-[#71717a] dark:text-zinc-400 font-mono px-0.5 mt-0.5">
        <span>更新: {{ formatDisplayTime(item.time) }}</span>
        <span v-if="item.prevClose">昨收 {{ item.prevClose }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MarketItem } from '../types/market'
import { useMarket } from '../composables/useMarket'

const props = defineProps<{
  item: MarketItem
}>()

const { getTrendInfo } = useMarket()

const trend = computed(() => getTrendInfo(props.item.changePercent))

const formattedChange = computed(() => {
  const val = props.item.change
  if (val === undefined || val === null || val === '' || val === '--') return ''
  const str = String(val).trim()
  if (str.startsWith('+') || str.startsWith('-')) return str
  const num = parseFloat(str)
  if (isNaN(num)) return str
  if (num > 0) return `+${str}`
  return str
})

const hasOhlc = computed(() => {
  return (
    (props.item.high !== undefined && props.item.high !== '' && props.item.high !== '--') ||
    (props.item.low !== undefined && props.item.low !== '' && props.item.low !== '--') ||
    (props.item.open !== undefined && props.item.open !== '' && props.item.open !== '--')
  )
})

function formatDisplayTime(t?: string): string {
  if (!t) return ''
  const parts = t.split(' ')
  if (parts.length > 1) return parts[1]
  return t
}
</script>
