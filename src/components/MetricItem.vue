<template>
  <div
    class="rounded-lg border-2 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#28282d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 p-2 sm:p-2.5 md:p-3 flex flex-col justify-between group"
  >
    <!-- Case 1: Item with distinct Price (e.g. Macro commodities, Forex, Stocks, Indices, Metals) -->
    <template v-if="item.price !== undefined && item.price !== ''">
      <div class="flex items-center justify-between text-xs font-black uppercase tracking-tight mb-1.5 gap-1">
        <div class="flex items-center gap-1 min-w-0">
          <span v-if="item.icon" class="text-xs select-none flex-shrink-0 leading-none">{{ item.icon }}</span>
          <span class="whitespace-nowrap text-[#1a1a1a] dark:text-zinc-200 font-black">{{ item.name }}</span>
          <span v-if="item.symbol" class="text-[10px] text-[#71717a] dark:text-zinc-400 font-mono font-bold">{{ item.symbol }}</span>
        </div>
        <span :class="['px-1.5 py-0.5 rounded font-mono font-black text-[11px] whitespace-nowrap flex-shrink-0 tracking-tight', trend.badgeClass]">
          {{ trend.formattedPercent }}
        </span>
      </div>
      <div class="flex items-baseline justify-between">
        <span class="text-sm md:text-base font-mono font-black text-[#1a1a1a] dark:text-white tracking-tight">
          {{ item.price }}
        </span>
        <span v-if="item.unit" class="text-[10px] text-[#4a4a4a] dark:text-zinc-400 font-bold uppercase">
          {{ item.unit }}
        </span>
      </div>
    </template>

    <!-- Case 2: Pure percentage change item (e.g. Industry sectors, Sub-indices, Hardware prices) -->
    <template v-else>
      <div class="flex items-center justify-between gap-1 py-0.5">
        <div class="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-shrink-0">
          <span v-if="item.icon" class="text-xs md:text-sm select-none flex-shrink-0 leading-none">{{ item.icon }}</span>
          <span class="font-black text-xs sm:text-xs md:text-sm text-[#1a1a1a] dark:text-white whitespace-nowrap tracking-tight">
            {{ item.name }}
          </span>
        </div>
        <span :class="['px-1.5 py-0.5 rounded font-mono font-black text-[11px] sm:text-xs whitespace-nowrap tracking-tight flex-shrink-0', trend.badgeClass]">
          {{ trend.formattedPercent }}
        </span>
      </div>
    </template>
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
</script>
