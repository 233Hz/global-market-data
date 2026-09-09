<template>
  <div class="space-y-3.5 md:space-y-4">
    <!-- On PC: 3 columns side-by-side (Gold/Silver, Industrial, Minor Metals) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3.5 md:gap-4">
      <MarketCard
        v-if="goldSilver"
        :title="goldSilver.title"
        :badge="goldSilver.badge"
        :badge-color="goldSilver.badgeColor"
        :items="goldSilver.items"
        :columns="2"
      />

      <MarketCard
        v-if="industrialMetals"
        :title="industrialMetals.title"
        :items="industrialMetals.items"
        :columns="2"
      />

      <MarketCard
        v-if="otherMetals"
        :title="otherMetals.title"
        :items="otherMetals.items"
        :columns="2"
      />
    </div>

    <!-- Bottom Disclaimer -->
    <div class="py-2 text-center">
      <p class="text-[11px] text-zinc-500 dark:text-zinc-500 font-sans tracking-tight">
        本程序展示的公开查询数据，仅供参考，不构成任何投资建议
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMarket } from '../composables/useMarket'
import MarketCard from '../components/MarketCard.vue'

const { marketData } = useMarket()

const goldSilver = computed(() => (marketData.value.metals || []).find(s => s.id === 'gold-silver'))
const industrialMetals = computed(() => (marketData.value.metals || []).find(s => s.id === 'industrial-metals'))
const otherMetals = computed(() => (marketData.value.metals || []).find(s => s.id === 'other-metals'))
</script>
