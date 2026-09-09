<template>
  <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4 md:p-5 transition-all duration-150">
    <!-- Card Header -->
    <div class="flex items-center justify-between mb-3.5">
      <div class="flex items-center gap-2">
        <h3 class="font-sans font-semibold tracking-tight text-sm md:text-base text-white">
          {{ title }}
        </h3>
      </div>

      <!-- Optional Badge -->
      <span
        v-if="badge"
        :class="[
          'text-[11px] px-2 py-0.5 rounded border font-medium tracking-tight',
          badgeColor === 'live'
            ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
            : badgeColor === 'closed'
            ? 'border-zinc-700 text-zinc-400 bg-zinc-800/40'
            : 'border-rose-500/30 text-rose-400 bg-rose-500/10'
        ]"
      >
        {{ badge }}
      </span>
    </div>

    <!-- Items Grid (2 columns on mobile, adapts cleanly on desktop) -->
    <div class="grid grid-cols-2 gap-2 md:gap-3">
      <MetricItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MarketItem } from '../types/market'
import MetricItem from './MetricItem.vue'

defineProps<{
  title: string
  badge?: string
  badgeColor?: 'normal' | 'live' | 'closed'
  items: MarketItem[]
}>()
</script>
