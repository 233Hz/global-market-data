<template>
  <div class="space-y-4 md:space-y-5">
    <!-- On PC: 3 columns side-by-side (Gold/Silver, Industrial, Minor Metals) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
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

    <!-- Bottom Disclaimer (Comic Style) -->
    <div class="py-3 text-center">
      <p class="text-xs text-[#4a4a4a] dark:text-zinc-400 font-black uppercase tracking-wider">
        ※ 本程序展示公开查询数据，仅供参考，不构成任何投资建议 ※
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
