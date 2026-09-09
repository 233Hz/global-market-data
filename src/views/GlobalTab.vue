<template>
  <div class="space-y-3.5 md:space-y-4">
    <!-- Macro Section: 4 columns on PC to keep it compact -->
    <MarketCard
      v-if="macroSection"
      :title="macroSection.title"
      :badge="macroSection.badge"
      :badge-color="macroSection.badgeColor"
      :items="macroSection.items"
      :columns="4"
    />

    <!-- Industry Section: 6 columns on PC so all 24 items fit in 4 rows -->
    <MarketCard
      v-if="industrySection"
      :title="industrySection.title"
      :badge="industrySection.badge"
      :badge-color="industrySection.badgeColor"
      :items="industrySection.items"
      :columns="6"
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

const macroSection = computed(() => {
  return (marketData.value.global || []).find(s => s.id === 'global-macro')
})

const industrySection = computed(() => {
  return (marketData.value.global || []).find(s => s.id === 'global-industry')
})
</script>
