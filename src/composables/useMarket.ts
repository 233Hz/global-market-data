import { ref, reactive, computed, watch } from 'vue'
import { TabKey, UserSettings, MarketSection } from '../types/market'
import { MarketDataService } from '../services/marketDataService'

const SETTINGS_KEY = 'global_market_user_settings'

const defaultSettings: UserSettings = {
  colorMode: 'cn',
  theme: 'dark',
  autoRefresh: true,
  refreshInterval: 60,
  lastSyncTime: Date.now()
}

// Global shared reactive states
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

export const settings = reactive<UserSettings>(loadSavedSettings())

// Apply theme to DOM
function applyTheme(t: 'dark' | 'light') {
  if (typeof document !== 'undefined') {
    if (t === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }
}

// SINGLETON Timers at Module Scope - strictly one timer instance across entire app
let timerId: any = null
let countdownTimerId: any = null

export async function refreshData() {
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
    setTimeout(() => {
      isRefreshing.value = false
    }, 300)
  }
}

export function resetAutoRefresh() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
  if (countdownTimerId) {
    clearInterval(countdownTimerId)
    countdownTimerId = null
  }

  countdown.value = settings.refreshInterval

  if (settings.autoRefresh && settings.refreshInterval > 0) {
    countdownTimerId = setInterval(() => {
      if (countdown.value > 1) {
        countdown.value--
      } else {
        countdown.value = settings.refreshInterval
        refreshData()
      }
    }, 1000)
  }
}

// Global singleton watcher on settings
watch(
  settings,
  (newVal) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newVal))
    } catch (e) {
      console.error('Error saving settings', e)
    }
    applyTheme(newVal.theme || 'dark')
    resetAutoRefresh()
  },
  { deep: true }
)

let initialized = false

export function useMarket() {
  if (!initialized) {
    initialized = true
    applyTheme(settings.theme || 'dark')
    resetAutoRefresh()
  }

  const formattedLastUpdated = computed(() => {
    const d = lastUpdatedTime.value
    const hours = d.getHours().toString().padStart(2, '0')
    const minutes = d.getMinutes().toString().padStart(2, '0')
    const seconds = d.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  })

  function toggleTheme() {
    settings.theme = settings.theme === 'dark' ? 'light' : 'dark'
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

    let textClass = 'text-zinc-400 dark:text-zinc-400'
    let arrow = '—'
    let sign = ''

    if (isUp) {
      arrow = '▲'
      sign = '+'
      textClass = isRed ? 'text-rose-500 dark:text-rose-400' : 'text-emerald-500 dark:text-emerald-400'
    } else if (isDown) {
      arrow = '▼'
      sign = ''
      textClass = isGreen ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
    }

    return {
      arrow,
      sign,
      textClass,
      formattedPercent: `${arrow} ${sign}${changePercent.toFixed(2)}%`
    }
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
    toggleTheme
  }
}
