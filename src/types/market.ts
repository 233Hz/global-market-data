export interface MarketItem {
  id: string
  name: string
  subtitle?: string
  symbol?: string
  icon?: string
  price?: string | number
  change?: string | number
  changePercent: number
  changeDir?: 'up' | 'down' | 'flat'
  open?: string | number
  high?: string | number
  low?: string | number
  prevClose?: string | number
  time?: string
  unit?: string
  unavailable?: boolean
}

export interface MarketSection {
  id: string
  title: string
  badge?: string
  badgeColor?: 'normal' | 'live' | 'closed'
  columns?: 2 | 3 | 4 | 5 | 6
  isSector?: boolean
  items: MarketItem[]
}

export type TabKey = 'global' | 'asia' | 'metals' | 'china' | 'settings'

export interface UserSettings {
  colorMode: 'cn' | 'global' // 'cn': red up green down, 'global': green up red down
  theme: 'dark' | 'light'
  autoRefresh: boolean
  refreshInterval: number // in seconds
  lastSyncTime?: number
}
