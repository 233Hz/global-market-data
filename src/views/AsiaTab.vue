<template>
  <div class="space-y-3.5 md:space-y-4">
    <!-- Row 1 on PC: Korea & Japan side-by-side -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3.5 md:gap-4">
      <!-- Korea Column -->
      <div class="space-y-3.5 md:space-y-4">
        <MarketCard
          v-if="krComposite"
          :title="krComposite.title"
          :badge="krComposite.badge"
          :badge-color="krComposite.badgeColor"
          :items="krComposite.items"
          :columns="2"
        />
        <MarketCard
          v-if="krIndustry"
          :title="krIndustry.title"
          :items="krIndustry.items"
          :columns="4"
        />
      </div>

      <!-- Japan Column -->
      <div class="space-y-3.5 md:space-y-4">
        <MarketCard
          v-if="jpComposite"
          :title="jpComposite.title"
          :items="jpComposite.items"
          :columns="2"
        />
        <MarketCard
          v-if="jpIndustry"
          :title="jpIndustry.title"
          :items="jpIndustry.items"
          :columns="4"
        />
      </div>
    </div>

    <!-- Row 2 on PC: Asia Composite & Forex side-by-side -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3.5 md:gap-4">
      <MarketCard
        v-if="asiaComposite"
        :title="asiaComposite.title"
        :items="asiaComposite.items"
        :columns="2"
      />
      <MarketCard
        v-if="forex"
        :title="forex.title"
        :items="forex.items"
        :columns="4"
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

const krComposite = computed(() => (marketData.value.asia || []).find(s => s.id === 'kr-composite'))
const krIndustry = computed(() => (marketData.value.asia || []).find(s => s.id === 'kr-industry'))
const jpComposite = computed(() => (marketData.value.asia || []).find(s => s.id === 'jp-composite'))
const jpIndustry = computed(() => (marketData.value.asia || []).find(s => s.id === 'jp-industry'))
const asiaComposite = computed(() => (marketData.value.asia || []).find(s => s.id === 'asia-composite'))
const forex = computed(() => (marketData.value.asia || []).find(s => s.id === 'forex'))
</script>
