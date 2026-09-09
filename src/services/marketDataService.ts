import { MarketSection, MarketItem } from '../types/market'

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
  price?: string | number
  change?: string | number
  changePercent?: string | number
  changeDir?: 'up' | 'down' | 'flat'
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
    us?: MarketStatus
    cn?: MarketStatus
    hk?: MarketStatus
    forex?: MarketStatus
    [key: string]: MarketStatus | undefined
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
    metals?: MarketStatus
    [key: string]: MarketStatus | undefined
  }
}

/** 外汇响应 */
export interface ForexResponse {
  forex: QuoteItem[]
  marketStatus: {
    forex?: MarketStatus
    [key: string]: MarketStatus | undefined
  }
}

/** A股板块响应 */
export interface CnSectorsResponse {
  cnSectors: QuoteItem[]
  marketStatus: {
    cn?: MarketStatus
    [key: string]: MarketStatus | undefined
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

export function parseGccPercent(val?: string | number): number | undefined {
  if (typeof val === 'number') return val
  if (!val) return undefined
  const cleaned = String(val).replace('%', '').replace('+', '').trim()
  const num = parseFloat(cleaned)
  return isNaN(num) ? undefined : num
}

export function formatPrice(p?: string | number): string | undefined {
  if (p === undefined || p === null || p === '') return undefined
  if (p === '--') return '--'
  if (typeof p === 'string') {
    const trimmed = p.trim()
    if (!isNaN(parseFloat(trimmed))) return trimmed
  }
  const num = typeof p === 'number' ? p : parseFloat(String(p))
  return isNaN(num) ? undefined : num.toString()
}

// Baseline seed data initialized to 0.00 / 0.00% so users can immediately observe the transition to live market data
const BASELINE_DATA: Record<string, MarketSection[]> = {
  global: [
    {
      id: 'global-economic',
      title: '全球宏观经济指标',
      badge: '全球 · 待同步',
      badgeColor: 'normal',
      columns: 4,
      items: [
        { id: 'hf_OIL', name: '布伦特原油', price: '0.00', changePercent: 0.0, unit: '美元/桶' },
        { id: 'gb_vxx', name: '恐慌指数', price: '0.00', changePercent: 0.0, symbol: 'VIX' },
        { id: 'DINIW', name: '美元指数', price: '0.00', changePercent: 0.0, symbol: 'DXY' },
        { id: 'gb_tlt', name: '20年美债ETF', price: '0.00', changePercent: 0.0, symbol: 'TLT' }
      ]
    },
    {
      id: 'us-sectors',
      title: '美股核心产业板块',
      badge: '美股 · 待同步',
      badgeColor: 'normal',
      columns: 6,
      items: [
        { id: 'gb_ixic', name: '纳斯达克', icon: '📈', changePercent: 0.0 },
        { id: 'gb_dji', name: '道琼斯', icon: '📈', changePercent: 0.0 },
        { id: 'gb_smh', name: '存储', icon: '💾', changePercent: 0.0 },
        { id: 'gb_soxx', name: '半导体', icon: '🔬', changePercent: 0.0 },
        { id: 'gb_botz', name: '机器人', icon: '🤖', changePercent: 0.0 },
        { id: 'gb_idrv', name: '自动驾驶', icon: '🚗', changePercent: 0.0 },
        { id: 'gb_igv', name: '云计算', icon: '☁️', changePercent: 0.0 },
        { id: 'gb_ita', name: '军工', icon: '🛡️', changePercent: 0.0 },
        { id: 'gb_ura', name: '核电', icon: '⚛️', changePercent: 0.0 },
        { id: 'gb_xlu', name: '电网', icon: '⚡', changePercent: 0.0 },
        { id: 'gb_tan', name: '光伏', icon: '☀️', changePercent: 0.0 },
        { id: 'gb_lit', name: '锂电池', icon: '🔋', changePercent: 0.0 },
        { id: 'gb_xle', name: '石油', icon: '🛢️', changePercent: 0.0 },
        { id: 'gb_cper', name: '铜/有色', icon: '🟠', changePercent: 0.0 },
        { id: 'gb_gld', name: '黄金', icon: '🥇', changePercent: 0.0 },
        { id: 'gb_xlf', name: '银行金融', icon: '🏦', changePercent: 0.0 },
        { id: 'gb_xbi', name: '生物医药', icon: '💊', changePercent: 0.0 },
        { id: 'gb_xly', name: '消费', icon: '🛒', changePercent: 0.0 },
        { id: 'gb_remx', name: '稀土', icon: '🧲', changePercent: 0.0 }
      ]
    }
  ],

  asia: [
    {
      id: 'asia-indices',
      title: '亚太与主要股指',
      badge: '亚太 · 待同步',
      badgeColor: 'normal',
      columns: 3,
      items: [
        { id: 'int_nikkei', name: '日经225', symbol: 'NIKKEI', price: '0.00', changePercent: 0.0 },
        { id: 'int_topix', name: '东证指数', symbol: 'TOPIX', price: '0.00', changePercent: 0.0 },
        { id: 'int_kospi', name: '韩国综指', symbol: 'KOSPI', price: '0.00', changePercent: 0.0 },
        { id: 'rt_hkHSI', name: '恒生指数', symbol: 'HSI', price: '0.00', changePercent: 0.0 },
        { id: 'rt_hkHSCEI', name: '国企指数', symbol: 'HSCEI', price: '0.00', changePercent: 0.0 }
      ]
    },
    {
      id: 'jkr-stocks',
      title: '日韩核心龙头企业',
      badge: '日韩 · 待同步',
      badgeColor: 'normal',
      columns: 4,
      items: [
        { id: 'int_toyota', name: '丰田汽车', symbol: 'TOYOTA', price: '0.00', changePercent: 0.0 },
        { id: 'int_sony', name: '索尼集团', symbol: 'SONY', price: '0.00', changePercent: 0.0 },
        { id: 'int_samsung', name: '三星电子', symbol: 'SAMSUNG', price: '0.00', changePercent: 0.0 },
        { id: 'int_skHynix', name: 'SK海力士', symbol: 'HYNIX', price: '0.00', changePercent: 0.0 }
      ]
    },
    {
      id: 'forex',
      title: '全球主要外汇牌价',
      badge: '外汇 · 待同步',
      badgeColor: 'normal',
      columns: 3,
      items: [
        { id: 'fx_susdcny', name: '美元/人民币', symbol: 'USD/CNY', price: '0.0000', changePercent: 0.0 },
        { id: 'fx_seurcny', name: '欧元/人民币', symbol: 'EUR/CNY', price: '0.0000', changePercent: 0.0 },
        { id: 'fx_sjpycny', name: '日元/人民币', symbol: 'JPY/CNY', price: '0.0000', changePercent: 0.0 },
        { id: 'fx_sgbpcny', name: '英镑/人民币', symbol: 'GBP/CNY', price: '0.0000', changePercent: 0.0 },
        { id: 'fx_shkdcny', name: '港币/人民币', symbol: 'HKD/CNY', price: '0.0000', changePercent: 0.0 },
        { id: 'fx_saudcny', name: '澳元/人民币', symbol: 'AUD/CNY', price: '0.0000', changePercent: 0.0 },
        { id: 'fx_susdhkd', name: '美元/港币', symbol: 'USD/HKD', price: '0.0000', changePercent: 0.0 },
        { id: 'fx_susdjpy', name: '美元/日元', symbol: 'USD/JPY', price: '0.00', changePercent: 0.0 },
        { id: 'fx_susdeur', name: '美元/欧元', symbol: 'USD/EUR', price: '0.0000', changePercent: 0.0 }
      ]
    }
  ],

  metals: [
    {
      id: 'precious-metals',
      title: '国际贵金属',
      badge: '贵金属 · 待同步',
      badgeColor: 'normal',
      columns: 4,
      items: [
        { id: 'hf_GC', name: '黄金', price: '0.00', changePercent: 0.0, unit: '美元/盎司' },
        { id: 'hf_SI', name: '白银', price: '0.00', changePercent: 0.0, unit: '美元/盎司' },
        { id: 'hf_XPT', name: '铂金', price: '0.00', changePercent: 0.0, unit: '美元/盎司' },
        { id: 'hf_XPD', name: '钯金', price: '0.00', changePercent: 0.0, unit: '美元/盎司' }
      ]
    },
    {
      id: 'base-metals',
      title: '工业基本金属 (LME)',
      badge: '工业金属 · 待同步',
      badgeColor: 'normal',
      columns: 3,
      items: [
        { id: 'hf_CAD', name: '铜', price: '0.00', changePercent: 0.0, unit: '美元/吨' },
        { id: 'hf_AHD', name: '铝', price: '0.00', changePercent: 0.0, unit: '美元/吨' },
        { id: 'hf_NID', name: '镍', price: '0.00', changePercent: 0.0, unit: '美元/吨' },
        { id: 'hf_ZSD', name: '锌', price: '0.00', changePercent: 0.0, unit: '美元/吨' },
        { id: 'hf_PBD', name: '铅', price: '0.00', changePercent: 0.0, unit: '美元/吨' },
        { id: 'hf_SND', name: '锡', price: '0.00', changePercent: 0.0, unit: '美元/吨' }
      ]
    }
  ],

  ai: [
    {
      id: 'us-tech-giants',
      title: '全球科技巨头与算力龙头',
      badge: '美股科技 · 待同步',
      badgeColor: 'normal',
      columns: 4,
      items: [
        { id: 'gb_nvda', name: '英伟达', symbol: 'NVDA', price: '0.00', changePercent: 0.0 },
        { id: 'gb_tsla', name: '特斯拉', symbol: 'TSLA', price: '0.00', changePercent: 0.0 },
        { id: 'gb_msft', name: '微软', symbol: 'MSFT', price: '0.00', changePercent: 0.0 },
        { id: 'gb_amzn', name: '亚马逊', symbol: 'AMZN', price: '0.00', changePercent: 0.0 },
        { id: 'gb_aapl', name: '苹果', symbol: 'AAPL', price: '0.00', changePercent: 0.0 },
        { id: 'gb_goog', name: '谷歌', symbol: 'GOOG', price: '0.00', changePercent: 0.0 },
        { id: 'gb_meta', name: 'Meta', symbol: 'META', price: '0.00', changePercent: 0.0 },
        { id: 'gb_baba', name: '阿里巴巴', symbol: 'BABA', price: '0.00', changePercent: 0.0 }
      ]
    },
    {
      id: 'cn-tech-sectors',
      title: 'A股核心产业与科技板块',
      badge: 'A股板块 · 待同步',
      badgeColor: 'normal',
      columns: 6,
      items: [
        { id: 'cn_kc50etf', name: '科创50ETF', icon: '🌟', changePercent: 0.0 },
        { id: 'cn_cyb', name: '创业板指', icon: '🚀', changePercent: 0.0 },
        { id: 'cn_sz50', name: '上证50', icon: '🏛️', changePercent: 0.0 },
        { id: 'cn_kc50', name: '科创50', icon: '💡', changePercent: 0.0 },
        { id: 'cn_chip', name: '芯片', icon: '🔬', changePercent: 0.0 },
        { id: 'cn_ai', name: 'AI算力', icon: '🧠', changePercent: 0.0 },
        { id: 'cn_internet', name: '互联网', icon: '🌐', changePercent: 0.0 },
        { id: 'cn_consumer', name: '消费', icon: '🛒', changePercent: 0.0 },
        { id: 'cn_auto', name: '可选消费', icon: '🚗', changePercent: 0.0 },
        { id: 'cn_pharma', name: '医药', icon: '💊', changePercent: 0.0 },
        { id: 'cn_financial', name: '金融', icon: '🏦', changePercent: 0.0 },
        { id: 'cn_bank', name: '银行', icon: '🏧', changePercent: 0.0 },
        { id: 'cn_energy', name: '能源', icon: '⚡', changePercent: 0.0 },
        { id: 'cn_newenergy', name: '新能源', icon: '🔋', changePercent: 0.0 },
        { id: 'cn_env', name: '环保', icon: '🌱', changePercent: 0.0 },
        { id: 'cn_industrial', name: '工业', icon: '🏭', changePercent: 0.0 },
        { id: 'cn_material', name: '材料', icon: '🧪', changePercent: 0.0 },
        { id: 'cn_growth', name: '成长', icon: '📈', changePercent: 0.0 },
        { id: 'cn_value', name: '价值', icon: '💎', changePercent: 0.0 },
        { id: 'cn_hs300', name: '沪深300', icon: '📊', changePercent: 0.0 },
        { id: 'cn_500', name: '中证500', icon: '📉', changePercent: 0.0 },
        { id: 'cn_1000', name: '中证1000', icon: '🎯', changePercent: 0.0 },
        { id: 'cn_500sh', name: '500沪市', icon: '🏢', changePercent: 0.0 },
        { id: 'cn_szcomp', name: '深证成指', icon: '🏙️', changePercent: 0.0 }
      ]
    }
  ]
}

// Storage key bumped to v10 for directly classified GCC API response rendering
const STORAGE_KEY = 'global_market_data_cache_v10'
const LAST_FETCH_KEY = 'global_market_data_last_fetch_v10'

/**
 * Fetch market data exclusively from official GCC backend API endpoints
 */
async function fetchGccData(): Promise<{
  quotes?: HomepageQuotes
  metals?: MetalsResponse
  indices?: IndicesResponse
  forex?: ForexResponse
  cnSectors?: CnSectorsResponse
  stocks?: StocksResponse
  marketStatus: Record<string, MarketStatus | undefined>
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

    const marketStatus: Record<string, MarketStatus | undefined> = {
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
   * Fetch updated market data directly classified from GCC API endpoints
   * Fully aligned with MaHuisir/GCC API responses and categories
   */
  static async refreshAllData(): Promise<Record<string, MarketSection[]>> {
    const baseline = this.loadData()

    const gccData = await fetchGccData()
    if (!gccData) {
      return baseline
    }

    const { quotes, metals, indices, forex, cnSectors, stocks, marketStatus } = gccData
    const globalEcoList: QuoteItem[] = quotes?.globalEconomic || []
    const usSectorsList: QuoteItem[] = quotes?.usSectors || []
    const cnSectorsList: QuoteItem[] = cnSectors?.cnSectors || []
    const metalsList: QuoteItem[] = metals?.metals || []
    const indicesList: QuoteItem[] = indices?.indices || []
    const forexList: QuoteItem[] = forex?.forex || []
    const stocksList: QuoteItem[] = stocks?.stocks || []

    const result: Record<string, MarketSection[]> = {}

    // ==========================================
    // 1. 全球 Tab: 全球经济数据 + 美股板块
    // ==========================================
    const usStatus = marketStatus.us
    const usStatusBadge = usStatus?.fullLabel || (usStatus ? `美股 · ${usStatus.label}` : '美股 · 实时')
    const usStatusColor: 'live' | 'closed' = usStatus?.isTrading ? 'live' : 'closed'

    // 1.1 全球宏观经济指标
    const economicItems: MarketItem[] = globalEcoList.length > 0
      ? globalEcoList.map(item => ({
          id: item.code || item.name || '',
          name: item.name || '',
          symbol: item.subtitle || item.desc,
          price: formatPrice(item.price) || '0.00',
          changePercent: parseGccPercent(item.changePercent) ?? 0,
          unit: item.unit || (item.name?.includes('原油') ? '美元/桶' : undefined)
        }))
      : baseline.global[0].items

    // 1.2 美股热门产业板块
    const usSectorItems: MarketItem[] = usSectorsList.length > 0
      ? usSectorsList.map(item => ({
          id: item.code || item.name || '',
          name: item.name || '',
          symbol: item.subtitle || item.desc,
          icon: item.icon || '📈',
          changePercent: parseGccPercent(item.changePercent) ?? 0
        }))
      : baseline.global[1].items

    result.global = [
      {
        id: 'global-economic',
        title: '全球宏观经济指标',
        badge: usStatusBadge,
        badgeColor: usStatusColor,
        columns: 4,
        items: economicItems
      },
      {
        id: 'us-sectors',
        title: '美股核心产业板块',
        badge: `美股板块 · 共${usSectorItems.length}项`,
        badgeColor: usStatusColor,
        columns: 6,
        items: usSectorItems
      }
    ]

    // ==========================================
    // 2. 日韩与亚洲 Tab: 亚太主要股指 + 日韩龙头 + 外汇牌价
    // ==========================================
    // 2.1 亚太主要股指
    const asiaIndicesCodes = ['int_nikkei', 'int_topix', 'int_kospi', 'rt_hkHSI', 'rt_hkHSCEI']
    const rawAsiaIndices = indicesList.filter(item => asiaIndicesCodes.includes(item.code || ''))
    const asiaIndicesItems: MarketItem[] = rawAsiaIndices.length > 0
      ? rawAsiaIndices.map(item => ({
          id: item.code || item.name || '',
          name: item.name || '',
          symbol: item.subtitle,
          price: formatPrice(item.price) || (item.price === '--' ? '--' : '0.00'),
          changePercent: parseGccPercent(item.changePercent) ?? 0
        }))
      : baseline.asia[0].items

    // 2.2 日韩核心龙头企业
    const rawJkrStocks = stocksList.filter(s => s.market === 'jkr' || (s.code && s.code.startsWith('int_')))
    const jkrStockItems: MarketItem[] = rawJkrStocks.length > 0
      ? rawJkrStocks.map(item => ({
          id: item.code || item.name || '',
          name: item.name || '',
          symbol: item.subtitle || (item.code ? item.code.replace('int_', '').toUpperCase() : undefined),
          price: formatPrice(item.price) || '0.00',
          changePercent: parseGccPercent(item.changePercent) ?? 0
        }))
      : baseline.asia[1].items

    // 2.3 全球主要外汇牌价
    const forexStatus = marketStatus.forex
    const forexBadge = forexStatus ? `外汇 · ${forexStatus.label}` : '外汇牌价 · 实时'
    const forexBadgeColor: 'live' | 'closed' = forexStatus?.isTrading ? 'live' : 'closed'

    const forexItems: MarketItem[] = forexList.length > 0
      ? forexList.map(item => ({
          id: item.code || item.name || '',
          name: item.name || '',
          symbol: item.subtitle,
          price: formatPrice(item.price) || '0.0000',
          changePercent: parseGccPercent(item.changePercent) ?? 0
        }))
      : baseline.asia[2].items

    result.asia = [
      {
        id: 'asia-indices',
        title: '亚太与主要股指',
        badge: '亚太股指 · 实时',
        badgeColor: 'live',
        columns: 3,
        items: asiaIndicesItems
      },
      {
        id: 'jkr-stocks',
        title: '日韩核心龙头企业',
        badge: '日韩龙头 · 实时',
        badgeColor: 'live',
        columns: 4,
        items: jkrStockItems
      },
      {
        id: 'forex',
        title: '全球主要外汇牌价',
        badge: forexBadge,
        badgeColor: forexBadgeColor,
        columns: 3,
        items: forexItems
      }
    ]

    // ==========================================
    // 3. 有色金属 Tab: 国际贵金属 + 工业基本金属
    // ==========================================
    const metalsStatus = marketStatus.metals
    const metalsBadge = metalsStatus ? `贵金属 · ${metalsStatus.label}` : '贵金属 · 实时'
    const metalsBadgeColor: 'live' | 'closed' = metalsStatus?.isTrading ? 'live' : 'closed'

    // 3.1 贵金属 (type === 'precious')
    const rawPrecious = metalsList.filter(m => m.type === 'precious')
    const preciousItems: MarketItem[] = rawPrecious.length > 0
      ? rawPrecious.map(item => ({
          id: item.code || item.name || '',
          name: item.name || '',
          symbol: item.subtitle,
          price: formatPrice(item.price) || '0.00',
          changePercent: parseGccPercent(item.changePercent) ?? 0,
          unit: item.unit || '美元/盎司'
        }))
      : baseline.metals[0].items

    // 3.2 工业基本金属 (type === 'base')
    const rawBase = metalsList.filter(m => m.type === 'base')
    const baseItems: MarketItem[] = rawBase.length > 0
      ? rawBase.map(item => ({
          id: item.code || item.name || '',
          name: item.name || '',
          symbol: item.subtitle,
          price: formatPrice(item.price) || '0.00',
          changePercent: parseGccPercent(item.changePercent) ?? 0,
          unit: item.unit || '美元/吨'
        }))
      : baseline.metals[1].items

    result.metals = [
      {
        id: 'precious-metals',
        title: '国际贵金属',
        badge: metalsBadge,
        badgeColor: metalsBadgeColor,
        columns: 4,
        items: preciousItems
      },
      {
        id: 'base-metals',
        title: '工业基本金属 (LME)',
        badge: '工业金属 · LME',
        badgeColor: metalsBadgeColor,
        columns: 3,
        items: baseItems
      }
    ]

    // ==========================================
    // 4. AI 与科技板块 Tab: 全球科技巨头 + A股核心板块
    // ==========================================
    const cnStatus = marketStatus.cn
    const cnStatusBadge = cnStatus ? `A股 · ${cnStatus.label}` : 'A股板块 · 实时'
    const cnStatusColor: 'live' | 'closed' = cnStatus?.isTrading ? 'live' : 'closed'

    // 4.1 全球科技巨头与算力龙头 (US stocks)
    const rawUsStocks = stocksList.filter(s => s.market === 'us')
    const usStockItems: MarketItem[] = rawUsStocks.length > 0
      ? rawUsStocks.map(item => ({
          id: item.code || item.name || '',
          name: item.name || '',
          symbol: item.subtitle || (item.code ? item.code.replace('gb_', '').toUpperCase() : undefined),
          price: formatPrice(item.price) || '0.00',
          changePercent: parseGccPercent(item.changePercent) ?? 0
        }))
      : baseline.ai[0].items

    // 4.2 A股核心产业与科技板块
    const cnSectorItems: MarketItem[] = cnSectorsList.length > 0
      ? cnSectorsList.map(item => ({
          id: item.code || item.name || '',
          name: item.name || '',
          symbol: item.subtitle || item.desc,
          icon: item.icon || '🚀',
          changePercent: parseGccPercent(item.changePercent) ?? 0
        }))
      : baseline.ai[1].items

    result.ai = [
      {
        id: 'us-tech-giants',
        title: '全球科技巨头与算力龙头',
        badge: `美股科技 · 共${usStockItems.length}巨头`,
        badgeColor: usStatusColor,
        columns: 4,
        items: usStockItems
      },
      {
        id: 'cn-tech-sectors',
        title: 'A股核心产业与科技板块',
        badge: cnStatusBadge,
        badgeColor: cnStatusColor,
        columns: 6,
        items: cnSectorItems
      }
    ]

    this.saveData(result)
    return result
  }

  static clearCache(): void {
    if (typeof localStorage === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LAST_FETCH_KEY)
    for (let i = 1; i <= 10; i++) {
      localStorage.removeItem(`global_market_data_cache_v${i}`)
      localStorage.removeItem(`global_market_data_last_fetch_v${i}`)
    }
    localStorage.removeItem('global_market_data_cache')
    localStorage.removeItem('global_market_data_last_fetch')
  }
}
