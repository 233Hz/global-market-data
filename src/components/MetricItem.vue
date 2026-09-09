<template>
  <div
    class="rounded-lg border border-zinc-200/80 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02] hover:bg-zinc-100/90 dark:hover:bg-white/[0.05] transition-colors duration-150 p-2.5 md:p-3 flex flex-col justify-between"
  >
    <!-- Case 1: Item with distinct Price (e.g. Macro commodities, Forex) -->
    <template v-if="item.price !== undefined">
      <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
        <span class="truncate pr-1">{{ item.name }}</span>
        <span :class="['font-semibold text-xs tracking-tight', trend.textClass]">
          {{ trend.formattedPercent }}
        </span>
      </div>
      <div class="mt-1.5 flex items-baseline justify-between">
        <span class="text-sm md:text-base font-semibold text-zinc-900 dark:text-white font-sans tracking-tight">
          {{ item.price }}
        </span>
        <span v-if="item.unit" class="text-[11px] text-zinc-400 dark:text-zinc-500 font-normal">
          {{ item.unit }}
        </span>
      </div>
    </template>

    <!-- Case 2: Pure percentage change item (e.g. Industry sectors, Sub-indices, Hardware prices) -->
    <template v-else>
      <div class="flex items-center justify-between py-0.5">
        <div class="flex items-center gap-1.5 md:gap-2 min-w-0 pr-1.5">
          <span v-if="item.icon" class="text-xs md:text-sm select-none flex-shrink-0 leading-none">{{ item.icon }}</span>
          <span class="font-sans text-xs md:text-sm font-medium text-zinc-900 dark:text-white truncate tracking-tight">
            {{ item.name }}
          </span>
        </div>
        <span :class="['font-sans font-semibold text-xs md:text-sm whitespace-nowrap tracking-tight', trend.textClass]">
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
