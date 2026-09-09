import { ref, reactive, computed, watch } from 'vue'
import { TabKey, UserSettings, MarketSection } from '../types/market'
import { MarketDataService } from '../services/marketDataService'

const SETTINGS_KEY = 'global_market_user_settings'

const defaultSettings: UserSettings = {
  colorMode: 'cn',
  autoRefresh: true,
  refreshInterval: 60,
  lastSyncTime: Date.now()
}

// Global state shared across components
const activeTab = ref<TabKey>('global')
const marketData = ref<Record<string, MarketSection[]>>(MarketDataService.loadData())
const isRefreshing = ref(false)
const lastUpdatedTime = ref<Date>(new Date())
const countdown = ref(60)

// Load settings from storage
function loadSavedSettings(): UserSettings {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY)
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) }
    }
  } catch (e) {
    console.error('Error loading settings', e)
  }
  return { ...defaultSettings }
}

const settings = reactive<UserSettings>(loadSavedSettings())

export function useMarket() {
  let timerId: any = null
  let countdownTimerId: any = null

  // Save settings when modified
  watch(
    settings,
    (newVal) => {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newVal))
      } catch (e) {
        console.error('Error saving settings', e)
      }
      resetAutoRefresh()
    },
    { deep: true }
  )

  const formattedLastUpdated = computed(() => {
    const d = lastUpdatedTime.value
    const hours = d.getHours().toString().padStart(2, '0')
    const minutes = d.getMinutes().toString().padStart(2, '0')
    const seconds = d.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  })

  // Manual or automatic refresh trigger
  async function refreshData() {
    if (isRefreshing.value) return
    isRefreshing.value = true
    try {
      const updated = await MarketDataService.refreshAllData()
      marketData.value = updated
      lastUpdatedTime.value = new Date()
      settings.lastSyncTime = Date.now()
      countdown.value = settings.refreshInterval
    } catch (e) {
      console.error('Failed to refresh data', e)
    } finally {
      // Small delay for smooth UI feedback
      setTimeout(() => {
        isRefreshing.value = false
      }, 400)
    }
  }

  function resetAutoRefresh() {
    if (timerId) clearInterval(timerId)
    if (countdownTimerId) clearInterval(countdownTimerId)

    countdown.value = settings.refreshInterval

    if (settings.autoRefresh && settings.refreshInterval > 0) {
      countdownTimerId = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--
        } else {
          countdown.value = settings.refreshInterval
        }
      }, 1000)

      timerId = setInterval(() => {
        refreshData()
      }, settings.refreshInterval * 1000)
    }
  }

  function getTrendInfo(changePercent: number) {
    const isUp = changePercent > 0
    const isDown = changePercent < 0

    // Domestic Chinese: Up = Red, Down = Green
    // Global: Up = Green, Down = Red
    let isRed = false
    let isGreen = false

    if (settings.colorMode === 'cn') {
      isRed = isUp
      isGreen = isDown
    } else {
      isGreen = isUp
      isRed = isDown
    }

    let textClass = 'text-zinc-400'
    let arrow = '—'
    let sign = ''

    if (isUp) {
      arrow = '▲'
      sign = '+'
      textClass = isRed ? 'text-rose-400' : 'text-emerald-400'
    } else if (isDown) {
      arrow = '▼'
      sign = ''
      textClass = isGreen ? 'text-emerald-400' : 'text-rose-400'
    }

    return {
      arrow,
      sign,
      textClass,
      formattedPercent: `${arrow} ${sign}${changePercent.toFixed(2)}%`
    }
  }

  function setup() {
    resetAutoRefresh()
  }

  return {
    activeTab,
    marketData,
    isRefreshing,
    lastUpdatedTime,
    formattedLastUpdated,
    countdown,
    settings,
    refreshData,
    resetAutoRefresh,
    getTrendInfo,
    setup
  }
}
