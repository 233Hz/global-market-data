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
const tabLoading = reactive<Record<TabKey, boolean>>({
  global: false,
  asia: false,
  metals: false,
  china: false,
  settings: false
})
const tabFetchedOnce = reactive<Record<TabKey, boolean>>({
  global: false,
  asia: false,
  metals: false,
  china: false,
  settings: true
})
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
let countdownTimerId: any = null

/**
 * 按需仅刷新指定 Tab 的接口数据（杜绝一次性全量请求）
 */
export async function refreshTabData(targetTab?: TabKey) {
  const tab = targetTab || activeTab.value
  if (tab === 'settings') return
  if (isRefreshing.value) return

  isRefreshing.value = true
  tabLoading[tab] = true

  try {
    const sections = await MarketDataService.refreshTabData(tab)
    if (sections && sections.length > 0) {
      marketData.value = {
        ...marketData.value,
        [tab]: sections
      }
      MarketDataService.saveData(marketData.value)
    }
    lastUpdatedTime.value = new Date()
    settings.lastSyncTime = Date.now()
    countdown.value = settings.refreshInterval
    tabFetchedOnce[tab] = true
  } catch (e) {
    console.error(`Failed to refresh tab: ${tab}`, e)
  } finally {
    setTimeout(() => {
      isRefreshing.value = false
      tabLoading[tab] = false
    }, 250)
  }
}

/**
 * 重置自动刷新倒计时
 */
export function resetAutoRefresh() {
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
        // 自动刷新仅请求当前激活的标签页
        refreshTabData(activeTab.value)
      }
    }, 1000)
  }
}

// 监听标签页切换：按需请求该标签页的接口！
watch(activeTab, (newTab) => {
  if (newTab !== 'settings') {
    // 切换时仅请求当前新选中的标签页
    refreshTabData(newTab)
  }
})

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

  const hasUpdatedOnce = computed(() => tabFetchedOnce[activeTab.value])

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

    let textClass = 'text-[#1a1a1a] dark:text-zinc-300'
    let badgeClass = 'bg-[#facc15] text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[1.5px_1.5px_0px_0px_rgba(26,26,26,1)]'
    let formattedPercent = '0.00%'
    let arrow = '—'
    let sign = ''

    if (isUp) {
      arrow = '▲'
      sign = '+'
      textClass = isRed ? 'text-[#ef4444]' : 'text-[#22c55e]'
      badgeClass = isRed
        ? 'bg-[#ef4444] text-white border-2 border-[#1a1a1a] shadow-[1.5px_1.5px_0px_0px_rgba(26,26,26,1)]'
        : 'bg-[#22c55e] text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[1.5px_1.5px_0px_0px_rgba(26,26,26,1)]'
      formattedPercent = `▲+${changePercent.toFixed(2)}%`
    } else if (isDown) {
      arrow = '▼'
      sign = ''
      textClass = isGreen ? 'text-[#22c55e]' : 'text-[#ef4444]'
      badgeClass = isGreen
        ? 'bg-[#22c55e] text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[1.5px_1.5px_0px_0px_rgba(26,26,26,1)]'
        : 'bg-[#ef4444] text-white border-2 border-[#1a1a1a] shadow-[1.5px_1.5px_0px_0px_rgba(26,26,26,1)]'
      formattedPercent = `▼${Math.abs(changePercent).toFixed(2)}%`
    }

    return {
      arrow,
      sign,
      textClass,
      badgeClass,
      formattedPercent
    }
  }

  return {
    activeTab,
    marketData,
    isRefreshing,
    tabLoading,
    tabFetchedOnce,
    hasUpdatedOnce,
    lastUpdatedTime,
    formattedLastUpdated,
    countdown,
    settings,
    refreshData: () => refreshTabData(activeTab.value),
    refreshTabData,
    resetAutoRefresh,
    getTrendInfo,
    toggleTheme
  }
}
