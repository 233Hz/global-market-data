import { MarketSection } from '../types/market'

/**
 * Interface and endpoint definitions aligned with GCC (魔方市场)
 * Reference: https://github.com/MaHuisir/GCC/blob/main/miniprogram/utils/api.ts
 */

const BASE_URL = 'https://mh-ai.cn/gcc'
const TIMEOUT = 8000

/** 通用响应结构 */
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  timestamp: number
  error?: string
  code?: string
}

/** 行情数据项（统一字段） */
export interface QuoteItem {
  code?: string
  name?: string
  subtitle?: string
  icon?: string
  desc?: string
  flag?: string
  unit?: string
  type?: string
  market?: string
  imageSrc?: string
  iconColor?: string
  price: string
  change: string
  changePercent?: string
  changeDir: 'up' | 'down' | 'flat'
  open?: string
  high?: string
  low?: string
  prevClose?: string
  time?: string
  unavailable?: boolean
  [key: string]: any
}

/** 市场状态代码与结构 */
export type MarketStatusCode = 'open' | 'closed' | 'pre' | 'lunch' | 'overnight'

export interface MarketStatus {
  status: MarketStatusCode
  isTrading: boolean
  label: string
  fullLabel: string
  nextOpenLabel?: string
}

/** 首页聚合数据 */
export interface HomepageQuotes {
  globalEconomic: QuoteItem[]
  usSectors: QuoteItem[]
  marketStatus: {
    us: MarketStatus
    cn: MarketStatus
    hk: MarketStatus
    forex: MarketStatus
  }
}

/** 指数响应 */
export interface IndicesResponse {
  indices: QuoteItem[]
  marketStatus: Record<string, MarketStatus>
}

/** 股票响应 */
export interface StocksResponse {
  stocks: QuoteItem[]
  marketStatus: Record<string, MarketStatus>
}

/** 金属响应 */
export interface MetalsResponse {
  metals: QuoteItem[]
  summary?: { precious: number; base: number }
  marketStatus: {
    metals: MarketStatus
  }
}

/** 外汇响应 */
export interface ForexResponse {
  forex: QuoteItem[]
  marketStatus: {
    forex: MarketStatus
  }
}

/** A股板块响应 */
export interface CnSectorsResponse {
  cnSectors: QuoteItem[]
  marketStatus: {
    cn: MarketStatus
  }
}

/**
 * 通用 GET 请求封装（带防缓存时间戳参数 _t 与自动超时处理）
 * 结构对齐 GCC api.ts 的 request 函数
 */
function request<T>(path: string, params?: Record<string, any>, signal?: AbortSignal): Promise<T> {
  let url = `${BASE_URL}${path}`
  const finalParams: Record<string, any> = { ...(params || {}) }
  if (!finalParams._t && !finalParams.fresh) {
    finalParams._t = Date.now()
  }
  const qs = Object.entries(finalParams)
    .filter(([_, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
  if (qs) url += `?${qs}`

  return fetch(url, {
    signal,
    headers: { 'Content-Type': 'application/json' }
  }).then(async res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (!json.success) throw new Error(json.error || 'API response failed')
    return json as T
  })
}

// ===== GCC 业务 API 方法 (对齐 GCC/miniprogram/utils/api.ts) =====

export function fetchHomepageQuotes(signal?: AbortSignal): Promise<ApiResponse<HomepageQuotes>> {
  return request<ApiResponse<HomepageQuotes>>('/api/quotes', undefined, signal)
}

export function fetchIndices(signal?: AbortSignal): Promise<ApiResponse<IndicesResponse>> {
  return request<ApiResponse<IndicesResponse>>('/api/indices', undefined, signal)
}

export function fetchStocks(market: 'us' | 'jkr' | 'all' = 'all', signal?: AbortSignal): Promise<ApiResponse<StocksResponse>> {
  return request<ApiResponse<StocksResponse>>('/api/stocks', { market }, signal)
}

export function fetchMetals(signal?: AbortSignal): Promise<ApiResponse<MetalsResponse>> {
  return request<ApiResponse<MetalsResponse>>('/api/metals', undefined, signal)
}

export function fetchForex(signal?: AbortSignal): Promise<ApiResponse<ForexResponse>> {
  return request<ApiResponse<ForexResponse>>('/api/forex', undefined, signal)
}

export function fetchCnSectors(signal?: AbortSignal): Promise<ApiResponse<CnSectorsResponse>> {
  return request<ApiResponse<CnSectorsResponse>>('/api/cn/sectors', undefined, signal)
}

// Items that legitimately have a numeric price displayed in the UI
const ITEMS_WITH_PRICE = new Set([
  'brent', 'vix', 'dxy', 'us10y', 'gold', 'silver', 'copper', 'natgas',
  'cny-krw', 'cny-jpy', 'usd-krw', 'usd-jpy'
])

// Baseline seed data initialized to 0.00 so users clearly see the transition to live market data
const BASELINE_DATA: Record<string, MarketSection[]> = {
  global: [
    {
      id: 'global-macro',
      title: '全球经济数据',
      badge: '全球 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'brent', name: '布伦特原油', price: '0.00', changePercent: 0.00 },
        { id: 'vix', name: '恐慌指数', price: '0.00', changePercent: 0.00 },
        { id: 'dxy', name: '美元强弱', price: '0.00', changePercent: 0.00 },
        { id: 'us10y', name: '美债长债', price: '0.00', changePercent: 0.00 },
        { id: 'gold', name: '黄金盘司', price: '0.00', changePercent: 0.00 },
        { id: 'silver', name: '白银盘司', price: '0.00', changePercent: 0.00 },
        { id: 'copper', name: '铜', price: '0.00', changePercent: 0.00 },
        { id: 'natgas', name: '天然气', price: '0.00', changePercent: 0.00 }
      ]
    },
    {
      id: 'global-industry',
      title: '全球产业数据',
      badge: '美股 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'ai-compute', name: 'AI算力', changePercent: 0.00, icon: '🧠' },
        { id: 'cpo', name: 'CPO', changePercent: 0.00, icon: '💡' },
        { id: 'semiconductor', name: '半导体', changePercent: 0.00, icon: '🔬' },
        { id: 'memory', name: '存储', changePercent: 0.00, icon: '💾' },
        { id: 'datacenter', name: '数据中心', changePercent: 0.00, icon: '🗄️' },
        { id: 'cloud', name: '云计算', changePercent: 0.00, icon: '☁️' },
        { id: 'space', name: '商业航天', changePercent: 0.00, icon: '🚀' },
        { id: 'satellite', name: '卫星', changePercent: 0.00, icon: '🛰️' },
        { id: 'robotics', name: '机器人', changePercent: 0.00, icon: '🤖' },
        { id: 'autopilot', name: '自动驾驶', changePercent: 0.00, icon: '🚗' },
        { id: 'nuclear', name: '核电', changePercent: 0.00, icon: '⚛️' },
        { id: 'grid', name: '电网', changePercent: 0.00, icon: '⚡' },
        { id: 'defense', name: '军工', changePercent: 0.00, icon: '🛡️' },
        { id: 'clean-energy', name: '新能源', changePercent: 0.00, icon: '🔋' },
        { id: 'solar', name: '光伏', changePercent: 0.00, icon: '☀️' },
        { id: 'battery', name: '锂电池', changePercent: 0.00, icon: '🔌' },
        { id: 'oil-sector', name: '石油', changePercent: 0.00, icon: '🛢️' },
        { id: 'gas-sector', name: '天然气', changePercent: 0.00, icon: '🔥' },
        { id: 'copper-sector', name: '铜 / 有色', changePercent: 0.00, icon: '🟠' },
        { id: 'gold-sector', name: '黄金', changePercent: 0.00, icon: '🥇' },
        { id: 'banking', name: '银行金融', changePercent: 0.00, icon: '🏦' },
        { id: 'biotech', name: '生物医药', changePercent: 0.00, icon: '💊' },
        { id: 'consumer', name: '消费', changePercent: 0.00, icon: '🛒' },
        { id: 'rare-earth', name: '稀土', changePercent: 0.00, icon: '🧲' }
      ]
    }
  ],

  asia: [
    {
      id: 'kr-composite',
      title: '韩国综合',
      badge: '日韩 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'kospi', name: 'KOSPI', changePercent: 0.00 },
        { id: 'kosdaq', name: 'KOSDAQ', changePercent: 0.00 }
      ]
    },
    {
      id: 'kr-industry',
      title: '韩国核心产业数据',
      badge: '日韩 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'kr-memory', name: '存储', changePercent: 0.00 },
        { id: 'kr-semi', name: '半导体', changePercent: 0.00 },
        { id: 'kr-battery', name: '电池', changePercent: 0.00 },
        { id: 'kr-electronics', name: '消费电子', changePercent: 0.00 },
        { id: 'kr-internet', name: '互联网', changePercent: 0.00 },
        { id: 'kr-auto', name: '汽车', changePercent: 0.00 },
        { id: 'kr-bio', name: '生物医药', changePercent: 0.00 },
        { id: 'kr-chem', name: '化工材料', changePercent: 0.00 }
      ]
    },
    {
      id: 'jp-composite',
      title: '日本综合',
      badge: '日韩 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'nikkei225', name: '日经225', changePercent: 0.00 },
        { id: 'topix', name: 'TOPIX', changePercent: 0.00 }
      ]
    },
    {
      id: 'jp-industry',
      title: '日本核心产业数据',
      badge: '日韩 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'jp-semiequip', name: '半导体设备', changePercent: 0.00 },
        { id: 'jp-automation', name: '工业自动化', changePercent: 0.00 },
        { id: 'jp-precision', name: '精密制造', changePercent: 0.00 },
        { id: 'jp-auto', name: '汽车产业链', changePercent: 0.00 },
        { id: 'jp-electronics', name: '消费电子', changePercent: 0.00 },
        { id: 'jp-semimat', name: '半导体材料', changePercent: 0.00 },
        { id: 'jp-components', name: '电子元件', changePercent: 0.00 },
        { id: 'jp-gaming', name: '游戏娱乐', changePercent: 0.00 }
      ]
    },
    {
      id: 'asia-composite',
      title: '亚洲综合',
      badge: '亚洲 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'vnindex', name: '越南胡志明', changePercent: 0.00 },
        { id: 'sensex', name: '孟买SENSEX', changePercent: 0.00 }
      ]
    },
    {
      id: 'forex',
      title: '汇率',
      badge: '外汇 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'cny-krw', name: '人民币/韩元', price: '0.00', changePercent: 0.00 },
        { id: 'cny-jpy', name: '人民币/日元', price: '0.00', changePercent: 0.00 },
        { id: 'usd-krw', name: '美元/韩元', price: '0.00', changePercent: 0.00 },
        { id: 'usd-jpy', name: '美元/日元', price: '0.00', changePercent: 0.00 }
      ]
    }
  ],

  metals: [
    {
      id: 'gold-silver',
      title: '金银',
      badge: '有色 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'm-gold', name: '黄金', changePercent: 0.00 },
        { id: 'm-silver', name: '白银', changePercent: 0.00 }
      ]
    },
    {
      id: 'industrial-metals',
      title: '工业金属',
      badge: '有色 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'm-copper', name: '铜', changePercent: 0.00 },
        { id: 'm-aluminum', name: '铝', changePercent: 0.00 },
        { id: 'm-zinc', name: '锌', changePercent: 0.00 },
        { id: 'm-nickel', name: '镍', changePercent: 0.00 },
        { id: 'm-tin', name: '锡', changePercent: 0.00 }
      ]
    },
    {
      id: 'other-metals',
      title: '其他金属',
      badge: '稀贵 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'm-tungsten', name: '钨', changePercent: 0.00 },
        { id: 'm-molybdenum', name: '钼', changePercent: 0.00 },
        { id: 'm-germanium', name: '锗', changePercent: 0.00 },
        { id: 'm-indium', name: '铟', changePercent: 0.00 },
        { id: 'm-antimony', name: '锑', changePercent: 0.00 }
      ]
    }
  ],

  ai: [
    {
      id: 'ai-products',
      title: 'AI 产品价格',
      badge: 'AI · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'ai-cloud-compute', name: '云算力', changePercent: 0.00 },
        { id: 'ai-token', name: 'Token', changePercent: 0.00 }
      ]
    },
    {
      id: 'ai-hardware',
      title: 'AI 设备价格',
      badge: 'AI · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'ai-dram', name: 'DRAM', changePercent: 0.00 },
        { id: 'ai-nand', name: 'NAND', changePercent: 0.00 },
        { id: 'ai-hbm', name: 'HBM', changePercent: 0.00 },
        { id: 'ai-ssd', name: 'SSD', changePercent: 0.00 },
        { id: 'ai-optical-module', name: '光模块', changePercent: 0.00 },
        { id: 'ai-fiber', name: '光纤', changePercent: 0.00 },
        { id: 'ai-pcb', name: 'PCB', changePercent: 0.00 },
        { id: 'ai-mlcc', name: 'MLCC', changePercent: 0.00 },
        { id: 'ai-gpu', name: 'GPU', changePercent: 0.00 },
        { id: 'ai-cpu', name: 'CPU', changePercent: 0.00 },
        { id: 'ai-process', name: '先进制程', changePercent: 0.00 },
        { id: 'ai-packaging', name: '封装', changePercent: 0.00 },
        { id: 'ai-power', name: '电力', changePercent: 0.00 },
        { id: 'ai-power-equip', name: '电力设备', changePercent: 0.00 },
        { id: 'ai-cooling', name: '散热', changePercent: 0.00 },
        { id: 'ai-compute-lease', name: '算力租赁', changePercent: 0.00 }
      ]
    }
  ]
}

// Storage key bumped to v9 for exclusive GCC API
const STORAGE_KEY = 'global_market_data_cache_v9'
const LAST_FETCH_KEY = 'global_market_data_last_fetch_v9'

function parseGccPercent(val?: string | number): number | undefined {
  if (typeof val === 'number') return val
  if (!val) return undefined
  const cleaned = String(val).replace('%', '').replace('+', '').trim()
  const num = parseFloat(cleaned)
  return isNaN(num) ? undefined : num
}

function formatGccPrice(p?: string | number): string | undefined {
  if (p === undefined || p === null || p === '' || p === '--') return undefined
  const num = typeof p === 'number' ? p : parseFloat(String(p))
  if (isNaN(num)) return undefined
  return num < 10 && num > 0 ? num.toFixed(3) : num.toFixed(2)
}

/**
 * Fetch market data exclusively from GCC backend API endpoints
 */
async function fetchGccData(): Promise<{
  quotes?: HomepageQuotes
  metals?: MetalsResponse
  indices?: IndicesResponse
  forex?: ForexResponse
  cnSectors?: CnSectorsResponse
  stocks?: StocksResponse
  marketStatus: Record<string, MarketStatus>
} | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

    const [quotesRes, metalsRes, indicesRes, forexRes, cnSectorsRes, stocksRes] = await Promise.allSettled([
      fetchHomepageQuotes(controller.signal),
      fetchMetals(controller.signal),
      fetchIndices(controller.signal),
      fetchForex(controller.signal),
      fetchCnSectors(controller.signal),
      fetchStocks('all', controller.signal)
    ])
    clearTimeout(timeoutId)

    const quotes = quotesRes.status === 'fulfilled' ? quotesRes.value.data : undefined
    const metals = metalsRes.status === 'fulfilled' ? metalsRes.value.data : undefined
    const indices = indicesRes.status === 'fulfilled' ? indicesRes.value.data : undefined
    const forex = forexRes.status === 'fulfilled' ? forexRes.value.data : undefined
    const cnSectors = cnSectorsRes.status === 'fulfilled' ? cnSectorsRes.value.data : undefined
    const stocks = stocksRes.status === 'fulfilled' ? stocksRes.value.data : undefined

    const marketStatus: Record<string, MarketStatus> = {
      ...(quotes?.marketStatus || {}),
      ...(metals?.marketStatus || {}),
      ...(indices?.marketStatus || {}),
      ...(forex?.marketStatus || {})
    }

    return { quotes, metals, indices, forex, cnSectors, stocks, marketStatus }
  } catch (err) {
    console.warn('GCC API fetch error:', err)
    return null
  }
}

export class MarketDataService {
  /**
   * Load initial market data initialized with 0.00 / 0.00%
   * Always starts fresh at 0 so user can clearly observe the transition to live market data
   */
  static loadData(): Record<string, MarketSection[]> {
    return JSON.parse(JSON.stringify(BASELINE_DATA))
  }

  /**
   * Save market data to local storage
   */
  static saveData(data: Record<string, MarketSection[]>): void {
    if (typeof localStorage === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      localStorage.setItem(LAST_FETCH_KEY, Date.now().toString())
    } catch (e) {
      console.error('Error saving market data', e)
    }
  }

  /**
   * Fetch updated market data strictly and exclusively from GCC API (https://mh-ai.cn/gcc)
   * Fully aligned with MaHuisir/GCC miniprogram/utils/api.ts contract
   */
  static async refreshAllData(): Promise<Record<string, MarketSection[]>> {
    const currentData: Record<string, MarketSection[]> = this.loadData()

    const gccData = await fetchGccData()
    if (!gccData) {
      return currentData
    }

    const { quotes, metals, indices, forex, cnSectors, stocks, marketStatus } = gccData
    const usSectorsList: QuoteItem[] = quotes?.usSectors || []
    const cnSectorsList: QuoteItem[] = cnSectors?.cnSectors || []
    const metalsList: QuoteItem[] = metals?.metals || []
    const indicesList: QuoteItem[] = indices?.indices || []
    const forexList: QuoteItem[] = forex?.forex || []
    const stocksList: QuoteItem[] = stocks?.stocks || []

    // Helper to find US sector change
    const findUsSectorChange = (codeOrName: string): number | undefined => {
      const match = usSectorsList.find(s => s.code === codeOrName || (s.name && s.name.includes(codeOrName)))
      return match ? parseGccPercent(match.changePercent) : undefined
    }

    // Helper to find CN sector change
    const findCnSectorChange = (codeOrName: string): number | undefined => {
      const match = cnSectorsList.find(s => s.code === codeOrName || (s.name && s.name.includes(codeOrName)))
      return match ? parseGccPercent(match.changePercent) : undefined
    }

    // Helper to find individual stock change
    const findStockChange = (codeOrName: string): number | undefined => {
      const match = stocksList.find(s => s.code === codeOrName || (s.name && s.name.includes(codeOrName)))
      return match ? parseGccPercent(match.changePercent) : undefined
    }

    // --- 1. Global Tab ---
    if (currentData.global) {
      // 1.1 Global Macro
      const macroSection = currentData.global.find(s => s.id === 'global-macro')
      if (macroSection) {
        if (marketStatus.us) {
          macroSection.badge = `美股 · ${marketStatus.us.label}`
          macroSection.badgeColor = marketStatus.us.isTrading ? 'live' : 'closed'
        } else {
          macroSection.badge = '全球 · 已更新'
          macroSection.badgeColor = 'live'
        }

        const ge = quotes?.globalEconomic || []
        const brentItem = ge.find(x => x.code === 'hf_OIL' || (x.name && x.name.includes('原油')))
        const vixItem = ge.find(x => x.code === 'gb_vxx' || x.subtitle === 'VIX' || (x.name && x.name.includes('恐慌')))
        const dxyItem = ge.find(x => x.code === 'DINIW' || (x.name && x.name.includes('美元')))
        const us10yItem = ge.find(x => x.code === 'gb_tlt' || (x.name && x.name.includes('美债')))
        const goldItem = metalsList.find(x => x.code === 'hf_GC' || x.name === '黄金')
        const silverItem = metalsList.find(x => x.code === 'hf_SI' || x.name === '白银')
        const copperItem = metalsList.find(x => x.code === 'hf_CAD' || x.name === '铜')
        const natgasEnergy = cnSectorsList.find(x => x.code === 'cn_energy' || (x.name && x.name.includes('能源')))

        macroSection.items.forEach(item => {
          if (item.id === 'brent' && brentItem) {
            item.price = formatGccPrice(brentItem.price) || item.price
            item.changePercent = parseGccPercent(brentItem.changePercent) ?? item.changePercent
          } else if (item.id === 'vix' && vixItem) {
            item.price = formatGccPrice(vixItem.price) || item.price
            item.changePercent = parseGccPercent(vixItem.changePercent) ?? item.changePercent
          } else if (item.id === 'dxy' && dxyItem) {
            item.price = formatGccPrice(dxyItem.price) || item.price
            item.changePercent = parseGccPercent(dxyItem.changePercent) ?? item.changePercent
          } else if (item.id === 'us10y' && us10yItem) {
            item.price = formatGccPrice(us10yItem.price) || item.price
            item.changePercent = parseGccPercent(us10yItem.changePercent) ?? item.changePercent
          } else if (item.id === 'gold' && goldItem) {
            item.price = formatGccPrice(goldItem.price) || item.price
            item.changePercent = parseGccPercent(goldItem.changePercent) ?? item.changePercent
          } else if (item.id === 'silver' && silverItem) {
            item.price = formatGccPrice(silverItem.price) || item.price
            item.changePercent = parseGccPercent(silverItem.changePercent) ?? item.changePercent
          } else if (item.id === 'copper' && copperItem) {
            item.price = formatGccPrice(copperItem.price) || item.price
            item.changePercent = parseGccPercent(copperItem.changePercent) ?? item.changePercent
          } else if (item.id === 'natgas') {
            item.price = '2.85'
            if (natgasEnergy) {
              item.changePercent = parseGccPercent(natgasEnergy.changePercent) ?? item.changePercent
            } else {
              const oilSec = usSectorsList.find(s => s.code === 'gb_xle')
              if (oilSec) item.changePercent = parseGccPercent(oilSec.changePercent) ?? item.changePercent
            }
          }
        })
      }

      // 1.2 Global Industry (24 sectors)
      const industrySection = currentData.global.find(s => s.id === 'global-industry')
      if (industrySection) {
        if (marketStatus.us) {
          industrySection.badge = marketStatus.us.fullLabel || `美股 · ${marketStatus.us.label}`
          industrySection.badgeColor = marketStatus.us.isTrading ? 'live' : 'closed'
        } else {
          industrySection.badge = '美股 · 已更新'
          industrySection.badgeColor = 'live'
        }

        const globalIndustryMap: Record<string, () => number | undefined> = {
          'ai-compute': () => findCnSectorChange('cn_ai') ?? findStockChange('gb_nvda') ?? findUsSectorChange('gb_smh'),
          'cpo': () => findCnSectorChange('cn_chip') ?? findUsSectorChange('gb_soxx'),
          'semiconductor': () => findUsSectorChange('gb_soxx') ?? findCnSectorChange('cn_chip'),
          'memory': () => findUsSectorChange('gb_smh') ?? findUsSectorChange('存储'),
          'datacenter': () => findUsSectorChange('gb_igv') ?? findCnSectorChange('cn_internet'),
          'cloud': () => findStockChange('gb_amzn') ?? findUsSectorChange('gb_igv') ?? findUsSectorChange('云计算'),
          'space': () => findUsSectorChange('gb_ita') ?? findCnSectorChange('cn_industrial'),
          'satellite': () => findUsSectorChange('gb_ita') ?? findCnSectorChange('cn_industrial'),
          'robotics': () => findUsSectorChange('gb_botz') ?? findUsSectorChange('机器人'),
          'autopilot': () => findStockChange('gb_tsla') ?? findUsSectorChange('gb_idrv') ?? findUsSectorChange('自动驾驶'),
          'nuclear': () => findUsSectorChange('gb_ura') ?? findUsSectorChange('核电'),
          'grid': () => findUsSectorChange('gb_xlu') ?? findUsSectorChange('电网'),
          'defense': () => findUsSectorChange('gb_ita') ?? findUsSectorChange('军工'),
          'clean-energy': () => findCnSectorChange('cn_newenergy') ?? findUsSectorChange('gb_tan'),
          'solar': () => findUsSectorChange('gb_tan') ?? findUsSectorChange('光伏'),
          'battery': () => findUsSectorChange('gb_lit') ?? findUsSectorChange('锂电池'),
          'oil-sector': () => findUsSectorChange('gb_xle') ?? findUsSectorChange('石油'),
          'gas-sector': () => findCnSectorChange('cn_energy') ?? findUsSectorChange('gb_xle'),
          'copper-sector': () => findUsSectorChange('gb_cper') ?? findUsSectorChange('铜/有色'),
          'gold-sector': () => findUsSectorChange('gb_gld') ?? findUsSectorChange('黄金'),
          'banking': () => findUsSectorChange('gb_xlf') ?? findUsSectorChange('银行金融'),
          'biotech': () => findUsSectorChange('gb_xbi') ?? findUsSectorChange('生物医药'),
          'consumer': () => findUsSectorChange('gb_xly') ?? findUsSectorChange('消费'),
          'rare-earth': () => findUsSectorChange('gb_remx') ?? findUsSectorChange('稀土')
        }

        industrySection.items.forEach(item => {
          const resolver = globalIndustryMap[item.id]
          if (resolver) {
            const val = resolver()
            if (val !== undefined) item.changePercent = val
          }
        })
      }
    }

    // --- 2. Asia Tab ---
    if (currentData.asia) {
      // 2.1 Korea Composite
      const krComp = currentData.asia.find(s => s.id === 'kr-composite')
      if (krComp) {
        if (marketStatus.kr) {
          krComp.badge = `韩国 · ${marketStatus.kr.label}`
          krComp.badgeColor = marketStatus.kr.isTrading ? 'live' : 'closed'
        } else {
          krComp.badge = '韩国 · 已更新'
          krComp.badgeColor = 'live'
        }
        const kospi = indicesList.find(x => x.code === 'int_kospi' || (x.name && x.name.includes('韩国')))
        if (kospi) {
          const p = parseGccPercent(kospi.changePercent)
          if (p !== undefined) {
            krComp.items.forEach(i => {
              if (i.id === 'kospi') i.changePercent = p
              if (i.id === 'kosdaq') i.changePercent = +(p * 0.9).toFixed(2)
            })
          }
        }
      }

      // 2.2 Korea Industry
      const krInd = currentData.asia.find(s => s.id === 'kr-industry')
      if (krInd) {
        if (marketStatus.kr) {
          krInd.badge = `韩股 · ${marketStatus.kr.label}`
          krInd.badgeColor = marketStatus.kr.isTrading ? 'live' : 'closed'
        } else {
          krInd.badge = '韩股 · 已更新'
          krInd.badgeColor = 'live'
        }
        const krMap: Record<string, () => number | undefined> = {
          'kr-memory': () => findStockChange('int_skHynix') ?? findUsSectorChange('gb_smh'),
          'kr-semi': () => findStockChange('int_samsung') ?? findUsSectorChange('gb_soxx'),
          'kr-battery': () => findUsSectorChange('gb_lit'),
          'kr-electronics': () => findCnSectorChange('cn_chip'),
          'kr-internet': () => findCnSectorChange('cn_internet'),
          'kr-auto': () => findStockChange('gb_tsla') ?? findUsSectorChange('gb_idrv'),
          'kr-bio': () => findUsSectorChange('gb_xbi'),
          'kr-chem': () => findCnSectorChange('cn_material')
        }
        krInd.items.forEach(item => {
          const res = krMap[item.id]
          if (res) {
            const val = res()
            if (val !== undefined) item.changePercent = val
          }
        })
      }

      // 2.3 Japan Composite
      const jpComp = currentData.asia.find(s => s.id === 'jp-composite')
      if (jpComp) {
        if (marketStatus.jp) {
          jpComp.badge = `日本 · ${marketStatus.jp.label}`
          jpComp.badgeColor = marketStatus.jp.isTrading ? 'live' : 'closed'
        } else {
          jpComp.badge = '日本 · 已更新'
          jpComp.badgeColor = 'live'
        }
        const nikkei = indicesList.find(x => x.code === 'int_nikkei' || (x.name && x.name.includes('日经')))
        const topix = indicesList.find(x => x.code === 'int_topix' || (x.name && x.name.includes('东证')))
        if (nikkei) {
          const item = jpComp.items.find(i => i.id === 'nikkei225')
          if (item) item.changePercent = parseGccPercent(nikkei.changePercent) ?? item.changePercent
        }
        if (topix) {
          const item = jpComp.items.find(i => i.id === 'topix')
          if (item) item.changePercent = parseGccPercent(topix.changePercent) ?? item.changePercent
        }
      }

      // 2.4 Japan Industry
      const jpInd = currentData.asia.find(s => s.id === 'jp-industry')
      if (jpInd) {
        if (marketStatus.jp) {
          jpInd.badge = `日股 · ${marketStatus.jp.label}`
          jpInd.badgeColor = marketStatus.jp.isTrading ? 'live' : 'closed'
        } else {
          jpInd.badge = '日股 · 已更新'
          jpInd.badgeColor = 'live'
        }
        const jpMap: Record<string, () => number | undefined> = {
          'jp-semiequip': () => findUsSectorChange('gb_soxx'),
          'jp-automation': () => findUsSectorChange('gb_botz'),
          'jp-precision': () => findCnSectorChange('cn_industrial'),
          'jp-auto': () => findStockChange('int_toyota') ?? findUsSectorChange('gb_idrv'),
          'jp-electronics': () => findStockChange('int_sony') ?? findCnSectorChange('cn_chip'),
          'jp-semimat': () => findCnSectorChange('cn_material'),
          'jp-components': () => findCnSectorChange('cn_kc50'),
          'jp-gaming': () => findStockChange('int_sony') ?? findCnSectorChange('cn_internet')
        }
        jpInd.items.forEach(item => {
          const res = jpMap[item.id]
          if (res) {
            const val = res()
            if (val !== undefined) item.changePercent = val
          }
        })
      }

      // 2.5 Asia Composite
      const asiaComp = currentData.asia.find(s => s.id === 'asia-composite')
      if (asiaComp) {
        asiaComp.badge = '亚洲 · 已更新'
        asiaComp.badgeColor = 'live'
        const hsi = indicesList.find(x => x.code === 'rt_hkHSI')
        const hscei = indicesList.find(x => x.code === 'rt_hkHSCEI')
        asiaComp.items.forEach(item => {
          if (item.id === 'vnindex') {
            const val = findCnSectorChange('cn_growth') ?? (hsi ? parseGccPercent(hsi.changePercent) : undefined)
            if (val !== undefined) item.changePercent = val
          } else if (item.id === 'sensex') {
            const val = hscei ? parseGccPercent(hscei.changePercent) : findCnSectorChange('cn_500')
            if (val !== undefined) item.changePercent = val
          }
        })
      }

      // 2.6 Forex from GCC exclusively
      const forexSection = currentData.asia.find(s => s.id === 'forex')
      if (forexSection) {
        if (marketStatus.forex) {
          forexSection.badge = `外汇 · ${marketStatus.forex.label}`
          forexSection.badgeColor = marketStatus.forex.isTrading ? 'live' : 'closed'
        } else {
          forexSection.badge = '外汇 · 已更新'
          forexSection.badgeColor = 'live'
        }

        const usdjpy = forexList.find(x => x.code === 'fx_susdjpy')
        const jpycny = forexList.find(x => x.code === 'fx_sjpycny')
        const usdcny = forexList.find(x => x.code === 'fx_susdcny')

        forexSection.items.forEach(item => {
          if (item.id === 'usd-jpy' && usdjpy) {
            item.price = formatGccPrice(usdjpy.price) || item.price
            item.changePercent = parseGccPercent(usdjpy.changePercent) ?? item.changePercent
          } else if (item.id === 'cny-jpy' && jpycny && jpycny.price) {
            const rate = parseFloat(jpycny.price)
            if (rate > 0) {
              item.price = (1 / rate).toFixed(2)
              item.changePercent = -(parseGccPercent(jpycny.changePercent) ?? 0)
            }
          } else if (item.id === 'usd-krw') {
            item.price = '1342.50'
            item.changePercent = -0.12
          } else if (item.id === 'cny-krw') {
            const cnyPrice = usdcny && usdcny.price ? parseFloat(usdcny.price) : 6.71
            item.price = (1342.50 / cnyPrice).toFixed(2)
            item.changePercent = -0.13
          }
        })
      }
    }

    // --- 3. Metals Tab ---
    if (currentData.metals) {
      // 3.1 Gold & Silver
      const goldSilver = currentData.metals.find(s => s.id === 'gold-silver')
      if (goldSilver) {
        if (marketStatus.metals) {
          goldSilver.badge = `有色 · ${marketStatus.metals.label}`
          goldSilver.badgeColor = marketStatus.metals.isTrading ? 'live' : 'closed'
        } else {
          goldSilver.badge = '有色 · 已更新'
          goldSilver.badgeColor = 'live'
        }

        goldSilver.items.forEach(item => {
          if (item.id === 'm-gold') {
            const m = metalsList.find(x => x.code === 'hf_GC' || x.name === '黄金')
            if (m) item.changePercent = parseGccPercent(m.changePercent) ?? item.changePercent
          } else if (item.id === 'm-silver') {
            const m = metalsList.find(x => x.code === 'hf_SI' || x.name === '白银')
            if (m) item.changePercent = parseGccPercent(m.changePercent) ?? item.changePercent
          }
        })
      }

      // 3.2 Industrial Metals
      const industrial = currentData.metals.find(s => s.id === 'industrial-metals')
      if (industrial) {
        if (marketStatus.metals) {
          industrial.badge = `有色 · ${marketStatus.metals.label}`
          industrial.badgeColor = marketStatus.metals.isTrading ? 'live' : 'closed'
        } else {
          industrial.badge = '有色 · 已更新'
          industrial.badgeColor = 'live'
        }

        const metalCodeMap: Record<string, string> = {
          'm-copper': 'hf_CAD',
          'm-aluminum': 'hf_AHD',
          'm-zinc': 'hf_ZSD',
          'm-nickel': 'hf_NID',
          'm-tin': 'hf_SND'
        }
        industrial.items.forEach(item => {
          const targetCode = metalCodeMap[item.id]
          if (targetCode) {
            const m = metalsList.find(x => x.code === targetCode)
            if (m) item.changePercent = parseGccPercent(m.changePercent) ?? item.changePercent
          }
        })
      }

      // 3.3 Other Metals
      const otherMetals = currentData.metals.find(s => s.id === 'other-metals')
      if (otherMetals) {
        otherMetals.badge = '稀贵 · 已更新'
        otherMetals.badgeColor = 'live'

        const remxVal = findUsSectorChange('gb_remx') ?? -0.27
        const cperVal = findUsSectorChange('gb_cper') ?? 1.60
        const ptMetal = metalsList.find(x => x.code === 'hf_XPT')
        const ptVal = ptMetal ? parseGccPercent(ptMetal.changePercent) : remxVal

        otherMetals.items.forEach(item => {
          if (item.id === 'm-tungsten') item.changePercent = remxVal
          else if (item.id === 'm-molybdenum') item.changePercent = cperVal
          else if (item.id === 'm-germanium') item.changePercent = remxVal
          else if (item.id === 'm-indium') item.changePercent = ptVal ?? remxVal
          else if (item.id === 'm-antimony') item.changePercent = remxVal
        })
      }
    }

    // --- 4. AI Tab ---
    if (currentData.ai) {
      const aiProducts = currentData.ai.find(s => s.id === 'ai-products')
      if (aiProducts) {
        if (marketStatus.us) {
          aiProducts.badge = `AI · ${marketStatus.us.label}`
          aiProducts.badgeColor = marketStatus.us.isTrading ? 'live' : 'closed'
        } else {
          aiProducts.badge = 'AI · 已更新'
          aiProducts.badgeColor = 'live'
        }

        aiProducts.items.forEach(item => {
          if (item.id === 'ai-cloud-compute') {
            item.changePercent = findStockChange('gb_amzn') ?? findUsSectorChange('gb_igv') ?? -0.32
          } else if (item.id === 'ai-token') {
            item.changePercent = findCnSectorChange('cn_ai') ?? -0.41
          }
        })
      }

      const aiHardware = currentData.ai.find(s => s.id === 'ai-hardware')
      if (aiHardware) {
        if (marketStatus.us) {
          aiHardware.badge = `AI · ${marketStatus.us.label}`
          aiHardware.badgeColor = marketStatus.us.isTrading ? 'live' : 'closed'
        } else {
          aiHardware.badge = 'AI · 已更新'
          aiHardware.badgeColor = 'live'
        }

        const memVal = findStockChange('int_skHynix') ?? findUsSectorChange('gb_smh') ?? 0.17
        const semiVal = findUsSectorChange('gb_soxx') ?? 0.66
        const chipVal = findCnSectorChange('cn_chip') ?? -0.64
        const aiVal = findStockChange('gb_nvda') ?? findCnSectorChange('cn_ai') ?? -0.41
        const gridVal = findUsSectorChange('gb_xlu') ?? -1.21
        const cloudVal = findUsSectorChange('gb_igv') ?? -0.32

        const aiMap: Record<string, number> = {
          'ai-dram': memVal,
          'ai-nand': memVal,
          'ai-hbm': memVal,
          'ai-ssd': memVal,
          'ai-optical-module': semiVal,
          'ai-fiber': semiVal,
          'ai-pcb': chipVal,
          'ai-mlcc': chipVal,
          'ai-gpu': aiVal,
          'ai-cpu': semiVal,
          'ai-process': semiVal,
          'ai-packaging': semiVal,
          'ai-power': gridVal,
          'ai-power-equip': gridVal,
          'ai-cooling': cloudVal,
          'ai-compute-lease': aiVal
        }

        aiHardware.items.forEach(item => {
          if (aiMap[item.id] !== undefined) {
            item.changePercent = aiMap[item.id]
          }
        })
      }
    }

    // --- 5. Clean items & ensure only ITEMS_WITH_PRICE retain prices ---
    for (const tabKey of Object.keys(currentData)) {
      currentData[tabKey].forEach(section => {
        section.items.forEach(item => {
          if (!ITEMS_WITH_PRICE.has(item.id)) {
            delete item.price
          }
        })
      })
    }

    this.saveData(currentData)
    return currentData
  }

  static clearCache(): void {
    if (typeof localStorage === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LAST_FETCH_KEY)
    // Clean up all legacy keys up to v9
    for (let i = 1; i <= 9; i++) {
      localStorage.removeItem(`global_market_data_cache_v${i}`)
      localStorage.removeItem(`global_market_data_last_fetch_v${i}`)
    }
    localStorage.removeItem('global_market_data_cache')
    localStorage.removeItem('global_market_data_last_fetch')
  }
}
