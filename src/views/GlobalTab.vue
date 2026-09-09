<template>
  <div class="space-y-4 md:space-y-5">
    <MarketCard
      v-for="section in sections"
      :key="section.id"
      :title="section.title"
      :badge="section.badge"
      :badge-color="section.badgeColor"
      :items="section.items"
      :columns="section.columns || 4"
    />

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

const sections = computed(() => marketData.value.global || [])
</script>
