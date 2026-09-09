export interface MarketItem {
  id: string
  name: string
  symbol?: string
  price?: number | string
  changePercent: number
  changeAmount?: number
  icon?: string
  unit?: string
  timestamp?: number
}

export interface MarketSection {
  id: string
  title: string
  badge?: string
  badgeColor?: 'normal' | 'live' | 'closed'
  items: MarketItem[]
}

export type TabKey = 'global' | 'asia' | 'metals' | 'ai' | 'settings'

export interface UserSettings {
  colorMode: 'cn' | 'global' // 'cn': red up green down, 'global': green up red down
  autoRefresh: boolean
  refreshInterval: number // in seconds
  lastSyncTime?: number
}
