import { MarketSection, MarketItem, TabKey } from '../types/market'

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
  symbol?: string
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
  open?: string | number
  high?: string | number
  low?: string | number
  prevClose?: string | number
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

// ===== GCC 业务 API 单独请求方法 =====

export function fetchHomepageQuotes(signal?: AbortSignal): Promise<ApiResponse<HomepageQuotes>> {
  return request<ApiResponse<HomepageQuotes>>('/api/quotes', undefined, signal)
}

export function fetchIndices(signal?: AbortSignal): Promise<ApiResponse<IndicesResponse>> {
  return request<ApiResponse<IndicesResponse>>('/api/indices', undefined, signal)
}

export function fetchStocks(market: 'us' | 'jkr' | 'cn' | 'hk' | 'all' = 'all', signal?: AbortSignal): Promise<ApiResponse<StocksResponse>> {
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

/**
 * 将 QuoteItem 映射为完整的 MarketItem，保留所有返回指标
 */
function mapQuoteToMarketItem(item: QuoteItem, defaultIcon?: string, defaultUnit?: string): MarketItem {
  return {
    id: item.code || item.name || '',
    name: item.name || '',
    subtitle: item.subtitle || item.desc,
    symbol: item.symbol || (item.code ? item.code.replace(/^(gb_|int_|rt_hk|sh|sz)/, '').toUpperCase() : undefined),
    icon: item.icon || defaultIcon,
    price: formatPrice(item.price),
    change: item.change !== undefined && item.change !== '' ? String(item.change) : undefined,
    changePercent: parseGccPercent(item.changePercent ?? item.change) ?? 0,
    changeDir: item.changeDir,
    open: formatPrice(item.open),
    high: formatPrice(item.high),
    low: formatPrice(item.low),
    prevClose: formatPrice(item.prevClose),
    time: item.time,
    unit: item.unit || defaultUnit,
    unavailable: item.unavailable
  }
}

// 基础零值数据（初始待同步状态）
const BASELINE_DATA: Record<string, MarketSection[]> = {
  global: [
    {
      id: 'global-economic',
      title: '全球宏观经济指标',
      badge: '全球 · 待同步',
      badgeColor: 'normal',
      columns: 4,
      items: [
        { id: 'hf_OIL', name: '布伦特原油', subtitle: 'Brent Crude', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: '美元/桶', icon: '🛢️' },
        { id: 'gb_vxx', name: '恐慌指数', subtitle: 'VIX / VXX', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '⚡' },
        { id: 'DINIW', name: '美元指数', subtitle: 'USD Index', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '💵' },
        { id: 'gb_tlt', name: '20年美债ETF', subtitle: 'iShares 20+ Y Treasury', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '📜' }
      ]
    },
    {
      id: 'us-indices',
      title: '美股三大核心股指',
      badge: '美股 · 待同步',
      badgeColor: 'normal',
      columns: 3,
      items: [
        { id: 'gb_dji', name: '道琼斯', subtitle: 'DJIA', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇺🇸' },
        { id: 'gb_ixic', name: '纳斯达克', subtitle: 'NASDAQ', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇺🇸' },
        { id: 'gb_inx', name: '标普500', subtitle: 'S&P 500', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇺🇸' }
      ]
    },
    {
      id: 'us-stocks',
      title: '美股科技八大巨头',
      badge: '美股 · 待同步',
      badgeColor: 'normal',
      columns: 4,
      items: [
        { id: 'gb_aapl', name: '苹果', subtitle: 'AAPL', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🍎' },
        { id: 'gb_tsla', name: '特斯拉', subtitle: 'TSLA', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🚗' },
        { id: 'gb_msft', name: '微软', subtitle: 'MSFT', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '💻' },
        { id: 'gb_nvda', name: '英伟达', subtitle: 'NVDA', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🧠' },
        { id: 'gb_amzn', name: '亚马逊', subtitle: 'AMZN', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '📦' },
        { id: 'gb_goog', name: '谷歌', subtitle: 'GOOG', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🔍' },
        { id: 'gb_meta', name: 'Meta', subtitle: 'META', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '👓' },
        { id: 'gb_baba', name: '阿里巴巴', subtitle: 'BABA', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🛍️' }
      ]
    },
    {
      id: 'us-sectors',
      title: '美股核心产业板块',
      badge: '美股 · 待同步',
      badgeColor: 'normal',
      columns: 6,
      items: [
        { id: 'gb_ixic_sec', name: '纳斯达克', icon: '📈', changePercent: 0.0 },
        { id: 'gb_dji_sec', name: '道琼斯', icon: '📈', changePercent: 0.0 },
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
      title: '亚太主要股指',
      badge: '亚太 · 待同步',
      badgeColor: 'normal',
      columns: 5,
      items: [
        { id: 'int_nikkei', name: '日经225', subtitle: 'Nikkei 225', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇯🇵' },
        { id: 'int_topix', name: '东证指数', subtitle: 'TOPIX', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇯🇵' },
        { id: 'int_kospi', name: '韩国综指', subtitle: 'KOSPI', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇰🇷' },
        { id: 'rt_hkHSI', name: '恒生指数', subtitle: 'HSI', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇭🇰' },
        { id: 'rt_hkHSCEI', name: '国企指数', subtitle: 'HSCEI', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇭🇰' }
      ]
    },
    {
      id: 'jkr-stocks',
      title: '日韩核心龙头企业',
      badge: '日韩 · 待同步',
      badgeColor: 'normal',
      columns: 4,
      items: [
        { id: 'int_toyota', name: '丰田汽车', subtitle: 'TOYOTA', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🚗' },
        { id: 'int_sony', name: '索尼集团', subtitle: 'SONY', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🎮' },
        { id: 'int_samsung', name: '三星电子', subtitle: 'SAMSUNG', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '📱' },
        { id: 'int_skHynix', name: 'SK海力士', subtitle: 'HYNIX', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '💾' }
      ]
    },
    {
      id: 'forex',
      title: '全球主要外汇牌价',
      badge: '外汇 · 待同步',
      badgeColor: 'normal',
      columns: 3,
      items: [
        { id: 'fx_susdcny', name: '美元/人民币', subtitle: 'USD/CNY', price: '0.0000', change: '0.0000', changePercent: 0.0, open: '0.0000', high: '0.0000', low: '0.0000', icon: '🇺🇸🇨🇳' },
        { id: 'fx_seurcny', name: '欧元/人民币', subtitle: 'EUR/CNY', price: '0.0000', change: '0.0000', changePercent: 0.0, open: '0.0000', high: '0.0000', low: '0.0000', icon: '🇪🇺🇨🇳' },
        { id: 'fx_sjpycny', name: '日元/人民币', subtitle: 'JPY/CNY', price: '0.0000', change: '0.0000', changePercent: 0.0, open: '0.0000', high: '0.0000', low: '0.0000', icon: '🇯🇵🇨🇳' },
        { id: 'fx_sgbpcny', name: '英镑/人民币', subtitle: 'GBP/CNY', price: '0.0000', change: '0.0000', changePercent: 0.0, open: '0.0000', high: '0.0000', low: '0.0000', icon: '🇬🇧🇨🇳' },
        { id: 'fx_shkdcny', name: '港币/人民币', subtitle: 'HKD/CNY', price: '0.0000', change: '0.0000', changePercent: 0.0, open: '0.0000', high: '0.0000', low: '0.0000', icon: '🇭🇰🇨🇳' },
        { id: 'fx_saudcny', name: '澳元/人民币', subtitle: 'AUD/CNY', price: '0.0000', change: '0.0000', changePercent: 0.0, open: '0.0000', high: '0.0000', low: '0.0000', icon: '🇦🇺🇨🇳' },
        { id: 'fx_susdhkd', name: '美元/港币', subtitle: 'USD/HKD', price: '0.0000', change: '0.0000', changePercent: 0.0, open: '0.0000', high: '0.0000', low: '0.0000', icon: '🇺🇸🇭🇰' },
        { id: 'fx_susdjpy', name: '美元/日元', subtitle: 'USD/JPY', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇺🇸🇯🇵' },
        { id: 'fx_susdeur', name: '美元/欧元', subtitle: 'USD/EUR', price: '0.0000', change: '0.0000', changePercent: 0.0, open: '0.0000', high: '0.0000', low: '0.0000', icon: '🇺🇸🇪🇺' }
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
        { id: 'hf_GC', name: '黄金', subtitle: 'XAU/USD', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/oz', icon: '🥇' },
        { id: 'hf_SI', name: '白银', subtitle: 'XAG/USD', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/oz', icon: '🥈' },
        { id: 'hf_XPT', name: '铂金', subtitle: 'XPT/USD', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/oz', icon: '✨' },
        { id: 'hf_XPD', name: '钯金', subtitle: 'XPD/USD', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/oz', icon: '⚪' }
      ]
    },
    {
      id: 'base-metals',
      title: '工业基本金属 (LME)',
      badge: '工业金属 · 待同步',
      badgeColor: 'normal',
      columns: 3,
      items: [
        { id: 'hf_CAD', name: '铜', subtitle: 'LME Copper', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/t', icon: '🟠' },
        { id: 'hf_AHD', name: '铝', subtitle: 'LME Aluminum', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/t', icon: '⚪' },
        { id: 'hf_NID', name: '镍', subtitle: 'LME Nickel', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/t', icon: '🔘' },
        { id: 'hf_ZSD', name: '锌', subtitle: 'LME Zinc', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/t', icon: '🔩' },
        { id: 'hf_PBD', name: '铅', subtitle: 'LME Lead', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/t', icon: '🧱' },
        { id: 'hf_SND', name: '锡', subtitle: 'LME Tin', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', unit: 'USD/t', icon: '🪨' }
      ]
    }
  ],

  china: [
    {
      id: 'cn-indices',
      title: '中国主要股指 (A股/港股)',
      badge: '中国市场 · 待同步',
      badgeColor: 'normal',
      columns: 3,
      items: [
        { id: 'sh000001', name: '上证指数', subtitle: 'SSE', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇨🇳' },
        { id: 'sz399001', name: '深证成指', subtitle: 'SZSE', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇨🇳' },
        { id: 'sz399006', name: '创业板指', subtitle: 'ChiNext', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇨🇳' },
        { id: 'sh000300', name: '沪深300', subtitle: 'CSI 300', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇨🇳' },
        { id: 'rt_hkHSI', name: '恒生指数', subtitle: 'HSI', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇭🇰' },
        { id: 'rt_hkHSCEI', name: '国企指数', subtitle: 'HSCEI', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🇭🇰' }
      ]
    },
    {
      id: 'cn-stocks',
      title: '中国核心蓝筹龙头资产',
      badge: '核心龙头 · 待同步',
      badgeColor: 'normal',
      columns: 4,
      items: [
        { id: 'sh600519', name: '贵州茅台', subtitle: '600519', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🍶' },
        { id: 'sz300750', name: '宁德时代', subtitle: '300750', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🔋' },
        { id: 'sz002594', name: '比亚迪', subtitle: '002594', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🚗' },
        { id: 'sh601318', name: '中国平安', subtitle: '601318', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🛡️' },
        { id: 'sh600036', name: '招商银行', subtitle: '600036', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🏦' },
        { id: 'sz000858', name: '五粮液', subtitle: '000858', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🍶' },
        { id: 'sh688981', name: '中芯国际', subtitle: '688981', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🔬' },
        { id: 'sh600276', name: '恒瑞医药', subtitle: '600276', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '💊' },
        { id: 'rt_hk00700', name: '腾讯控股', subtitle: '00700.HK', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🐧' },
        { id: 'rt_hk09988', name: '阿里巴巴-W', subtitle: '09988.HK', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '🛍️' },
        { id: 'rt_hk01810', name: '小米集团', subtitle: '01810.HK', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '📱' },
        { id: 'rt_hk09618', name: '京东集团', subtitle: '09618.HK', price: '0.00', change: '0.00', changePercent: 0.0, open: '0.00', high: '0.00', low: '0.00', icon: '📦' }
      ]
    },
    {
      id: 'cn-sectors',
      title: 'A股核心产业与科技板块',
      badge: 'A股板块 · 待同步',
      badgeColor: 'normal',
      columns: 6,
      items: [
        { id: 'cn_kc50etf', name: '科创50ETF', subtitle: '科创50ETF华夏', icon: '🌟', price: '0.00', changePercent: 0.0 },
        { id: 'cn_cyb', name: '创业板指', subtitle: '创业板ETF', icon: '🚀', price: '0.00', changePercent: 0.0 },
        { id: 'cn_sz50', name: '上证50', subtitle: '上证50ETF', icon: '🏛️', price: '0.00', changePercent: 0.0 },
        { id: 'cn_kc50', name: '科创50', subtitle: '科创50', icon: '💡', price: '0.00', changePercent: 0.0 },
        { id: 'cn_chip', name: '芯片', subtitle: '芯片ETF', icon: '🔬', price: '0.00', changePercent: 0.0 },
        { id: 'cn_ai', name: 'AI算力', subtitle: '人工智能ETF', icon: '🧠', price: '0.00', changePercent: 0.0 },
        { id: 'cn_internet', name: '互联网', subtitle: '中概互联', icon: '🌐', price: '0.00', changePercent: 0.0 },
        { id: 'cn_consumer', name: '消费', subtitle: '主要消费ETF', icon: '🛒', price: '0.00', changePercent: 0.0 },
        { id: 'cn_auto', name: '可选消费', subtitle: '汽车智能', icon: '🚗', price: '0.00', changePercent: 0.0 },
        { id: 'cn_pharma', name: '医药', subtitle: '医药生物', icon: '💊', price: '0.00', changePercent: 0.0 },
        { id: 'cn_financial', name: '金融', subtitle: '大金融', icon: '🏦', price: '0.00', changePercent: 0.0 },
        { id: 'cn_bank', name: '银行', subtitle: '银行ETF', icon: '🏧', price: '0.00', changePercent: 0.0 },
        { id: 'cn_energy', name: '能源', subtitle: '传统能源', icon: '⚡', price: '0.00', changePercent: 0.0 },
        { id: 'cn_newenergy', name: '新能源', subtitle: '光伏储能', icon: '🔋', price: '0.00', changePercent: 0.0 },
        { id: 'cn_env', name: '环保', subtitle: '低碳环保', icon: '🌱', price: '0.00', changePercent: 0.0 },
        { id: 'cn_industrial', name: '工业', subtitle: '先进制造', icon: '🏭', price: '0.00', changePercent: 0.0 },
        { id: 'cn_material', name: '材料', subtitle: '基础化工材料', icon: '🧪', price: '0.00', changePercent: 0.0 },
        { id: 'cn_growth', name: '成长', subtitle: '核心成长风格', icon: '📈', price: '0.00', changePercent: 0.0 },
        { id: 'cn_value', name: '价值', subtitle: '低估值价值', icon: '💎', price: '0.00', changePercent: 0.0 },
        { id: 'cn_hs300', name: '沪深300', subtitle: '大盘核心', icon: '📊', price: '0.00', changePercent: 0.0 },
        { id: 'cn_500', name: '中证500', subtitle: '中小盘成长', icon: '📉', price: '0.00', changePercent: 0.0 },
        { id: 'cn_1000', name: '中证1000', subtitle: '小盘宽基', icon: '🎯', price: '0.00', changePercent: 0.0 },
        { id: 'cn_500sh', name: '500沪市', subtitle: '沪市中盘', icon: '🏢', price: '0.00', changePercent: 0.0 },
        { id: 'cn_szcomp', name: '深证成指', subtitle: '深市基准', icon: '🏙️', price: '0.00', changePercent: 0.0 }
      ]
    }
  ]
}

const STORAGE_KEY = 'global_market_data_cache_v11'
const LAST_FETCH_KEY = 'global_market_data_last_fetch_v11'

export class MarketDataService {
  /**
   * 加载本地初始数据（所有标的 0.00 初始化）
   */
  static loadData(): Record<string, MarketSection[]> {
    if (typeof localStorage === 'undefined') {
      return JSON.parse(JSON.stringify(BASELINE_DATA))
    }
    try {
      const cached = localStorage.getItem(STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        // 确保包含所有必需的 tab key
        if (parsed.global && parsed.asia && parsed.metals && parsed.china) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Failed to parse cache, fallback to baseline', e)
    }
    return JSON.parse(JSON.stringify(BASELINE_DATA))
  }

  /**
   * 保存特定 Tab 或全部数据
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
   * 单独刷新某个 Tab 的数据（按需请求该 Tab 对应接口，杜绝一次性全量请求）
   */
  static async refreshTabData(tab: TabKey): Promise<MarketSection[]> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

    try {
      switch (tab) {
        case 'global': {
          // 全球·美股：仅请求 /api/quotes, /api/stocks?market=us, /api/indices
          const [quotesRes, stocksRes, indicesRes] = await Promise.allSettled([
            fetchHomepageQuotes(controller.signal),
            fetchStocks('us', controller.signal),
            fetchIndices(controller.signal)
          ])
          clearTimeout(timeoutId)

          const quotes = quotesRes.status === 'fulfilled' ? quotesRes.value.data : undefined
          const stocks = stocksRes.status === 'fulfilled' ? stocksRes.value.data : undefined
          const indices = indicesRes.status === 'fulfilled' ? indicesRes.value.data : undefined

          const usStatus = quotes?.marketStatus?.us || indices?.marketStatus?.us
          const usBadge = usStatus?.fullLabel || (usStatus ? `美股 · ${usStatus.label}` : '美股 · 实时')
          const usColor: 'live' | 'closed' = usStatus?.isTrading ? 'live' : 'closed'

          // 1. 全球宏观经济
          const ecoItems: MarketItem[] = (quotes?.globalEconomic || []).map(item =>
            mapQuoteToMarketItem(item, '🌐', item.name?.includes('原油') ? '美元/桶' : undefined)
          )

          // 2. 美股三大指数
          const usIndexCodes = ['gb_dji', 'gb_ixic', 'gb_inx']
          const usIndexItems: MarketItem[] = (indices?.indices || [])
            .filter(item => usIndexCodes.includes(item.code || ''))
            .map(item => mapQuoteToMarketItem(item, '🇺🇸'))

          // 3. 美股科技八大巨头
          const usStockItems: MarketItem[] = (stocks?.stocks || [])
            .filter(item => item.market === 'us' || item.code?.startsWith('gb_'))
            .map(item => mapQuoteToMarketItem(item, '💻'))

          // 4. 美股核心热门板块
          const usSectorItems: MarketItem[] = (quotes?.usSectors || []).map(item =>
            mapQuoteToMarketItem(item, '📈')
          )

          const sections: MarketSection[] = [
            {
              id: 'global-economic',
              title: '全球宏观经济指标',
              badge: usBadge,
              badgeColor: usColor,
              columns: 4,
              items: ecoItems.length > 0 ? ecoItems : BASELINE_DATA.global[0].items
            },
            {
              id: 'us-indices',
              title: '美股三大核心股指',
              badge: usBadge,
              badgeColor: usColor,
              columns: 3,
              items: usIndexItems.length > 0 ? usIndexItems : BASELINE_DATA.global[1].items
            },
            {
              id: 'us-stocks',
              title: '美股科技八大巨头',
              badge: `美股科技 · 共${usStockItems.length}巨头`,
              badgeColor: usColor,
              columns: 4,
              items: usStockItems.length > 0 ? usStockItems : BASELINE_DATA.global[2].items
            },
            {
              id: 'us-sectors',
              title: '美股核心产业板块',
              badge: `美股板块 · 共${usSectorItems.length}项`,
              badgeColor: usColor,
              columns: 6,
              items: usSectorItems.length > 0 ? usSectorItems : BASELINE_DATA.global[3].items
            }
          ]

          return sections
        }

        case 'asia': {
          // 亚太·外汇：仅请求 /api/indices, /api/stocks?market=jkr, /api/forex
          const [indicesRes, stocksRes, forexRes] = await Promise.allSettled([
            fetchIndices(controller.signal),
            fetchStocks('jkr', controller.signal),
            fetchForex(controller.signal)
          ])
          clearTimeout(timeoutId)

          const indices = indicesRes.status === 'fulfilled' ? indicesRes.value.data : undefined
          const stocks = stocksRes.status === 'fulfilled' ? stocksRes.value.data : undefined
          const forex = forexRes.status === 'fulfilled' ? forexRes.value.data : undefined

          const forexStatus = forex?.marketStatus?.forex
          const forexBadge = forexStatus ? `外汇 · ${forexStatus.label}` : '外汇牌价 · 实时'
          const forexColor: 'live' | 'closed' = forexStatus?.isTrading ? 'live' : 'closed'

          // 1. 亚太主要指数
          const asiaCodes = ['int_nikkei', 'int_topix', 'int_kospi', 'rt_hkHSI', 'rt_hkHSCEI']
          const asiaIndexItems: MarketItem[] = (indices?.indices || [])
            .filter(item => asiaCodes.includes(item.code || ''))
            .map(item => mapQuoteToMarketItem(item, '🌏'))

          // 2. 日韩核心龙头企业
          const jkrStockItems: MarketItem[] = (stocks?.stocks || [])
            .filter(item => item.market === 'jkr' || item.code?.startsWith('int_'))
            .map(item => mapQuoteToMarketItem(item, '🏭'))

          // 3. 全球主要外汇牌价
          const forexItems: MarketItem[] = (forex?.forex || []).map(item =>
            mapQuoteToMarketItem(item, '💱')
          )

          const sections: MarketSection[] = [
            {
              id: 'asia-indices',
              title: '亚太主要股指',
              badge: '亚太股指 · 实时',
              badgeColor: 'live',
              columns: 5,
              items: asiaIndexItems.length > 0 ? asiaIndexItems : BASELINE_DATA.asia[0].items
            },
            {
              id: 'jkr-stocks',
              title: '日韩核心龙头企业',
              badge: '日韩龙头 · 实时',
              badgeColor: 'live',
              columns: 4,
              items: jkrStockItems.length > 0 ? jkrStockItems : BASELINE_DATA.asia[1].items
            },
            {
              id: 'forex',
              title: '全球主要外汇牌价',
              badge: forexBadge,
              badgeColor: forexColor,
              columns: 3,
              items: forexItems.length > 0 ? forexItems : BASELINE_DATA.asia[2].items
            }
          ]

          return sections
        }

        case 'metals': {
          // 有色金属：仅请求 /api/metals
          const metalsRes = await fetchMetals(controller.signal)
          clearTimeout(timeoutId)

          const metals = metalsRes?.data
          const metalsStatus = metals?.marketStatus?.metals
          const metalsBadge = metalsStatus ? `贵金属 · ${metalsStatus.label}` : '贵金属 · 实时'
          const metalsColor: 'live' | 'closed' = metalsStatus?.isTrading ? 'live' : 'closed'

          const rawList = metals?.metals || []
          const preciousItems: MarketItem[] = rawList
            .filter(m => m.type === 'precious')
            .map(item => mapQuoteToMarketItem(item, '🥇', 'USD/oz'))

          const baseItems: MarketItem[] = rawList
            .filter(m => m.type === 'base')
            .map(item => mapQuoteToMarketItem(item, '🔩', 'USD/t'))

          const sections: MarketSection[] = [
            {
              id: 'precious-metals',
              title: '国际贵金属',
              badge: metalsBadge,
              badgeColor: metalsColor,
              columns: 4,
              items: preciousItems.length > 0 ? preciousItems : BASELINE_DATA.metals[0].items
            },
            {
              id: 'base-metals',
              title: '工业基本金属 (LME)',
              badge: '工业金属 · LME',
              badgeColor: metalsColor,
              columns: 3,
              items: baseItems.length > 0 ? baseItems : BASELINE_DATA.metals[1].items
            }
          ]

          return sections
        }

        case 'china': {
          // A股·港股：仅请求 /api/cn/sectors, /api/indices, /api/stocks?market=all
          const [cnSectorsRes, indicesRes, stocksRes] = await Promise.allSettled([
            fetchCnSectors(controller.signal),
            fetchIndices(controller.signal),
            fetchStocks('all', controller.signal)
          ])
          clearTimeout(timeoutId)

          const cnSectors = cnSectorsRes.status === 'fulfilled' ? cnSectorsRes.value.data : undefined
          const indices = indicesRes.status === 'fulfilled' ? indicesRes.value.data : undefined
          const stocks = stocksRes.status === 'fulfilled' ? stocksRes.value.data : undefined

          const cnStatus = cnSectors?.marketStatus?.cn || indices?.marketStatus?.cn
          const cnBadge = cnStatus ? `A股 · ${cnStatus.label}` : '中国市场 · 实时'
          const cnColor: 'live' | 'closed' = cnStatus?.isTrading ? 'live' : 'closed'

          // 1. 中国主要股指 (上证、深成、创业板、沪深300、恒生、国企)
          const cnIndexCodes = ['sh000001', 'sz399001', 'sz399006', 'sh000300', 'rt_hkHSI', 'rt_hkHSCEI']
          const cnIndexItems: MarketItem[] = (indices?.indices || [])
            .filter(item => cnIndexCodes.includes(item.code || ''))
            .map(item => mapQuoteToMarketItem(item, '🇨🇳'))

          // 2. 中国核心蓝筹龙头资产 (A股与港股核心标的)
          const cnStockItems: MarketItem[] = (stocks?.stocks || [])
            .filter(item => item.market === 'cn' || item.market === 'hk')
            .map(item => mapQuoteToMarketItem(item, '🏢'))

          // 3. A股核心产业与科技板块 (24项)
          const cnSectorItems: MarketItem[] = (cnSectors?.cnSectors || []).map(item =>
            mapQuoteToMarketItem(item, '🚀')
          )

          const sections: MarketSection[] = [
            {
              id: 'cn-indices',
              title: '中国主要股指 (A股/港股)',
              badge: cnBadge,
              badgeColor: cnColor,
              columns: 3,
              items: cnIndexItems.length > 0 ? cnIndexItems : BASELINE_DATA.china[0].items
            },
            {
              id: 'cn-stocks',
              title: '中国核心蓝筹龙头资产',
              badge: `核心资产 · 共${cnStockItems.length}标的`,
              badgeColor: cnColor,
              columns: 4,
              items: cnStockItems.length > 0 ? cnStockItems : BASELINE_DATA.china[1].items
            },
            {
              id: 'cn-sectors',
              title: 'A股核心产业与科技板块',
              badge: `A股板块 · 共${cnSectorItems.length}项`,
              badgeColor: cnColor,
              columns: 6,
              items: cnSectorItems.length > 0 ? cnSectorItems : BASELINE_DATA.china[2].items
            }
          ]

          return sections
        }

        default:
          return []
      }
    } catch (err) {
      console.warn(`[MarketDataService] Failed to fetch tab: ${tab}`, err)
      clearTimeout(timeoutId)
      const current = this.loadData()
      return current[tab] || BASELINE_DATA[tab] || []
    }
  }

  static clearCache(): void {
    if (typeof localStorage === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LAST_FETCH_KEY)
    for (let i = 1; i <= 11; i++) {
      localStorage.removeItem(`global_market_data_cache_v${i}`)
      localStorage.removeItem(`global_market_data_last_fetch_v${i}`)
    }
    localStorage.removeItem('global_market_data_cache')
    localStorage.removeItem('global_market_data_last_fetch')
  }
}
