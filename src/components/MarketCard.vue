<template>
  <div class="rounded-lg border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3.5 md:p-4.5 transition-colors duration-150">
    <!-- Card Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-zinc-900 dark:text-white">
          {{ title }}
        </h3>
      </div>

      <!-- Optional Badge -->
      <span
        v-if="badge"
        :class="[
          'text-[11px] px-2 py-0.5 rounded border font-medium tracking-tight',
          badgeColor === 'live'
            ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
            : badgeColor === 'closed'
            ? 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/40'
            : 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10'
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
      return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'
    case 4:
      return 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5'
    case 3:
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5'
    case 2:
    default:
      return 'grid grid-cols-2 gap-2.5'
  }
})
</script>
