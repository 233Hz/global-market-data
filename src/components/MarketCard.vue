<template>
  <div class="rounded-lg border-4 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] bg-[#fffef0] dark:bg-[#202024] p-3.5 md:p-5 transition-all duration-100">
    <!-- Card Header (Manga Panel Title) -->
    <div class="flex items-center justify-between mb-3.5">
      <div class="flex items-center gap-2">
        <h3 class="font-black uppercase tracking-wide text-base md:text-lg text-[#1a1a1a] dark:text-white">
          {{ title }}
        </h3>
      </div>

      <!-- Comic Badge / Speech Tag -->
      <span
        v-if="badge"
        :class="[
          'text-[11px] px-2.5 py-0.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] font-black uppercase tracking-wider',
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

    <!-- Items Grid with configurable column density for PC multi-column views -->
    <div :class="gridClass">
      <MetricItem
        v-for="item in items"
        :key="item.id"
        :item="item"
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
    columns?: 2 | 3 | 4 | 6
  }>(),
  {
    columns: 2
  }
)

const gridClass = computed(() => {
  switch (props.columns) {
    case 6:
      return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5'
    case 4:
      return 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3'
    case 3:
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'
    case 2:
    default:
      return 'grid grid-cols-2 gap-3'
  }
})
</script>
