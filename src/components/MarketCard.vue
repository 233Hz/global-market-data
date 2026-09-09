<template>
  <div class="rounded-lg border-3 sm:border-4 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] bg-[#fffef0] dark:bg-[#1a1a1e] p-3 sm:p-4 md:p-5 transition-all duration-100">
    <!-- Card Header (Manga Panel Title) -->
    <div class="flex items-center justify-between mb-3 gap-2">
      <div class="flex items-center gap-2 min-w-0">
        <h3 class="font-black uppercase tracking-wide text-sm sm:text-base md:text-lg text-[#1a1a1a] dark:text-white truncate">
          {{ title }}
        </h3>
        <span class="text-xs font-mono font-bold text-[#71717a] dark:text-zinc-400">
          ({{ items.length }})
        </span>
      </div>

      <!-- Comic Badge / Speech Tag -->
      <span
        v-if="badge"
        :class="[
          'text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] font-black uppercase tracking-wider flex-shrink-0',
          badgeColor === 'live'
            ? 'bg-[#22c55e] text-[#1a1a1a]'
            : badgeColor === 'closed'
            ? 'bg-[#facc15] text-[#1a1a1a]'
            : 'bg-white dark:bg-[#2b2b30] text-[#1a1a1a] dark:text-white'
        ]"
      >
        {{ badge }}
      </span>
    </div>

    <!-- Items Grid with configurable column density for PC and Mobile views -->
    <div :class="gridClass">
      <MetricItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        :is-sector="isSector"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MarketItem } from '../types/market'
import MetricItem from './MetricItem.vue'

const props = withDefaults(
  defineProps<{
    title: string
    badge?: string
    badgeColor?: 'normal' | 'live' | 'closed'
    items: MarketItem[]
    columns?: 2 | 3 | 4 | 5 | 6
    isSector?: boolean
  }>(),
  {
    columns: 2,
    isSector: false
  }
)

const gridClass = computed(() => {
  switch (props.columns) {
    case 6:
      // High-density sector matrix: 2 on mobile, 3 on tablet, 4 on small desktop, 6 on large desktop
      return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5'
    case 5:
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3'
    case 4:
      // 4-column layout: 1 on small mobile for full OHLC visibility, 2 on tablet, 4 on desktop
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3'
    case 3:
      // 3-column layout: 1 on mobile, 2 on tablet, 3 on desktop
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3'
    case 2:
    default:
      return 'grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3'
  }
})
</script>
