<template>
  <div class="space-y-4 md:space-y-6">
    <MarketCard
      v-for="section in sections"
      :key="section.id"
      :title="section.title"
      :badge="section.badge"
      :badge-color="section.badgeColor"
      :items="section.items"
    />

    <!-- Bottom Disclaimer -->
    <div class="py-4 text-center">
      <p class="text-[11px] text-zinc-500 font-sans tracking-tight">
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

const sections = computed(() => marketData.value.ai || [])
</script>
