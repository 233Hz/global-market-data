<template>
  <div class="space-y-3.5 md:space-y-4">
    <!-- AI Products Price -->
    <MarketCard
      v-if="aiProducts"
      :title="aiProducts.title"
      :badge="aiProducts.badge"
      :badge-color="aiProducts.badgeColor"
      :items="aiProducts.items"
      :columns="2"
    />

    <!-- AI Hardware Price: 4 columns on PC so all 16 items fit in 4 rows -->
    <MarketCard
      v-if="aiHardware"
      :title="aiHardware.title"
      :items="aiHardware.items"
      :columns="4"
    />

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

const aiProducts = computed(() => (marketData.value.ai || []).find(s => s.id === 'ai-products'))
const aiHardware = computed(() => (marketData.value.ai || []).find(s => s.id === 'ai-hardware'))
</script>
