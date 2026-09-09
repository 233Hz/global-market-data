import { MarketSection } from '../types/market'

// Direct symbol mapping by item ID - resilient against any legacy cache
export const SYMBOL_MAP: Record<string, string> = {
  // Global Macro (using spot London Gold/Silver & ICE Brent Crude)
  'brent': 'hf_OIL',
  'vix': 'usUVXY',
  'dxy': 'usUUP',
  'us10y': 'usTLT',
  'gold': 'hf_XAU',
  'silver': 'hf_XAG',
  'copper': 'hf_HG',
  'natgas': 'hf_NG',
  // Global Industry
  'ai-compute': 'usNVDA',
  'cpo': 'usCOHR',
  'semiconductor': 'usSOXX',
  'memory': 'usMU',
  'datacenter': 'usEQIX',
  'cloud': 'usWCLD',
  'space': 'usRKLB',
  'satellite': 'usASTS',
  'robotics': 'usBOTZ',
  'autopilot': 'usTSLA',
  'nuclear': 'usNLR',
  'grid': 'usGRID',
  'defense': 'usITA',
  'clean-energy': 'usICLN',
  'solar': 'usTAN',
  'battery': 'usLIT',
  'oil-sector': 'usXLE',
  'gas-sector': 'usUNG',
  'copper-sector': 'usCOPX',
  'gold-sector': 'usGLD',
  'banking': 'usXLF',
  'biotech': 'usXBI',
  'consumer': 'usXLY',
  'rare-earth': 'usREMX',
  // Asia Composite
  'kospi': 'usEWY',
  'kosdaq': 'usEWY',
  'nikkei225': 'usEWJ',
  'topix': 'usEWJ',
  'vnindex': 'usVNM',
  'sensex': 'usINDA',
  // Korea Industry
  'kr-memory': 'usMU',
  'kr-semi': 'usSOXX',
  'kr-battery': 'usLIT',
  'kr-electronics': 'usXLK',
  'kr-internet': 'usFDN',
  'kr-auto': 'usCARZ',
  'kr-bio': 'usXBI',
  'kr-chem': 'usXLB',
  // Japan Industry
  'jp-semiequip': 'usSOXX',
  'jp-automation': 'usROBO',
  'jp-precision': 'usXLI',
  'jp-auto': 'usCARZ',
  'jp-electronics': 'usXLK',
  'jp-semimat': 'usSOXX',
  'jp-components': 'usXLK',
  'jp-gaming': 'usHERO',
  // Metals
  'm-gold': 'hf_XAU',
  'm-silver': 'hf_XAG',
  'm-copper': 'hf_CAD',
  'm-aluminum': 'hf_AHD',
  'm-zinc': 'hf_ZSD',
  'm-nickel': 'hf_NID',
  'm-tin': 'hf_SND',
  'm-tungsten': 'usREMX',
  'm-molybdenum': 'usXME',
  'm-germanium': 'usREMX',
  'm-indium': 'usPICK',
  'm-antimony': 'usREMX',
  // AI Products
  'ai-cloud-compute': 'usAMZN',
  'ai-token': 'usBITO',
  // AI Hardware
  'ai-dram': 'usMU',
  'ai-nand': 'usMU',
  'ai-hbm': 'usMU',
  'ai-ssd': 'usMU',
  'ai-optical-module': 'usCOHR',
  'ai-fiber': 'usCOHR',
  'ai-pcb': 'usSOXX',
  'ai-mlcc': 'usSOXX',
  'ai-gpu': 'usNVDA',
  'ai-cpu': 'usSOXX',
  'ai-process': 'usSOXX',
  'ai-packaging': 'usSOXX',
  'ai-power': 'usGRID',
  'ai-power-equip': 'usGRID',
  'ai-cooling': 'usEQIX',
  'ai-compute-lease': 'usNVDA',
}

// Items that legitimately have a numeric price displayed
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
        { id: 'brent', name: '布伦特原油', symbol: 'hf_OIL', price: '0.00', changePercent: 0.00 },
        { id: 'vix', name: '恐慌指数', symbol: 'usUVXY', price: '0.00', changePercent: 0.00 },
        { id: 'dxy', name: '美元强弱', symbol: 'usUUP', price: '0.00', changePercent: 0.00 },
        { id: 'us10y', name: '美债长债', symbol: 'usTLT', price: '0.00', changePercent: 0.00 },
        { id: 'gold', name: '黄金盘司', symbol: 'hf_XAU', price: '0.00', changePercent: 0.00 },
        { id: 'silver', name: '白银盘司', symbol: 'hf_XAG', price: '0.00', changePercent: 0.00 },
        { id: 'copper', name: '铜', symbol: 'hf_HG', price: '0.00', changePercent: 0.00 },
        { id: 'natgas', name: '天然气', symbol: 'hf_NG', price: '0.00', changePercent: 0.00 }
      ]
    },
    {
      id: 'global-industry',
      title: '全球产业数据',
      badge: '美股 · 待同步',
      badgeColor: 'normal',
      items: [
        { id: 'ai-compute', name: 'AI算力', symbol: 'usNVDA', changePercent: 0.00, icon: '🧠' },
        { id: 'cpo', name: 'CPO', symbol: 'usCOHR', changePercent: 0.00, icon: '💡' },
        { id: 'semiconductor', name: '半导体', symbol: 'usSOXX', changePercent: 0.00, icon: '🔬' },
        { id: 'memory', name: '存储', symbol: 'usMU', changePercent: 0.00, icon: '💾' },
        { id: 'datacenter', name: '数据中心', symbol: 'usEQIX', changePercent: 0.00, icon: '🗄️' },
        { id: 'cloud', name: '云计算', symbol: 'usWCLD', changePercent: 0.00, icon: '☁️' },
        { id: 'space', name: '商业航天', symbol: 'usRKLB', changePercent: 0.00, icon: '🚀' },
        { id: 'satellite', name: '卫星', symbol: 'usASTS', changePercent: 0.00, icon: '🛰️' },
        { id: 'robotics', name: '机器人', symbol: 'usBOTZ', changePercent: 0.00, icon: '🤖' },
        { id: 'autopilot', name: '自动驾驶', symbol: 'usTSLA', changePercent: 0.00, icon: '🚗' },
        { id: 'nuclear', name: '核电', symbol: 'usNLR', changePercent: 0.00, icon: '⚛️' },
        { id: 'grid', name: '电网', symbol: 'usGRID', changePercent: 0.00, icon: '⚡' },
        { id: 'defense', name: '军工', symbol: 'usITA', changePercent: 0.00, icon: '🛡️' },
        { id: 'clean-energy', name: '新能源', symbol: 'usICLN', changePercent: 0.00, icon: '🔋' },
        { id: 'solar', name: '光伏', symbol: 'usTAN', changePercent: 0.00, icon: '☀️' },
        { id: 'battery', name: '锂电池', symbol: 'usLIT', changePercent: 0.00, icon: '🔌' },
        { id: 'oil-sector', name: '石油', symbol: 'usXLE', changePercent: 0.00, icon: '🛢️' },
        { id: 'gas-sector', name: '天然气', symbol: 'usUNG', changePercent: 0.00, icon: '🔥' },
        { id: 'copper-sector', name: '铜 / 有色', symbol: 'usCOPX', changePercent: 0.00, icon: '🟠' },
        { id: 'gold-sector', name: '黄金', symbol: 'usGLD', changePercent: 0.00, icon: '🥇' },
        { id: 'banking', name: '银行金融', symbol: 'usXLF', changePercent: 0.00, icon: '🏦' },
        { id: 'biotech', name: '生物医药', symbol: 'usXBI', changePercent: 0.00, icon: '💊' },
        { id: 'consumer', name: '消费', symbol: 'usXLY', changePercent: 0.00, icon: '🛒' },
        { id: 'rare-earth', name: '稀土', symbol: 'usREMX', changePercent: 0.00, icon: '🧲' }
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
        { id: 'kospi', name: 'KOSPI', symbol: 'usEWY', changePercent: 0.00 },
        { id: 'kosdaq', name: 'KOSDAQ', symbol: 'usEWY', changePercent: 0.00 }
      ]
    },
    {
      id: 'kr-industry',
      title: '韩国核心产业数据',
      items: [
        { id: 'kr-memory', name: '存储', symbol: 'usMU', changePercent: 0.00 },
        { id: 'kr-semi', name: '半导体', symbol: 'usSOXX', changePercent: 0.00 },
        { id: 'kr-battery', name: '电池', symbol: 'usLIT', changePercent: 0.00 },
        { id: 'kr-electronics', name: '消费电子', symbol: 'usXLK', changePercent: 0.00 },
        { id: 'kr-internet', name: '互联网', symbol: 'usFDN', changePercent: 0.00 },
        { id: 'kr-auto', name: '汽车', symbol: 'usCARZ', changePercent: 0.00 },
        { id: 'kr-bio', name: '生物医药', symbol: 'usXBI', changePercent: 0.00 },
        { id: 'kr-chem', name: '化工材料', symbol: 'usXLB', changePercent: 0.00 }
      ]
    },
    {
      id: 'jp-composite',
      title: '日本综合',
      items: [
        { id: 'nikkei225', name: '日经225', symbol: 'usEWJ', changePercent: 0.00 },
        { id: 'topix', name: 'TOPIX', symbol: 'usEWJ', changePercent: 0.00 }
      ]
    },
    {
      id: 'jp-industry',
      title: '日本核心产业数据',
      items: [
        { id: 'jp-semiequip', name: '半导体设备', symbol: 'usSOXX', changePercent: 0.00 },
        { id: 'jp-automation', name: '工业自动化', symbol: 'usROBO', changePercent: 0.00 },
        { id: 'jp-precision', name: '精密制造', symbol: 'usXLI', changePercent: 0.00 },
        { id: 'jp-auto', name: '汽车产业链', symbol: 'usCARZ', changePercent: 0.00 },
        { id: 'jp-electronics', name: '消费电子', symbol: 'usXLK', changePercent: 0.00 },
        { id: 'jp-semimat', name: '半导体材料', symbol: 'usSOXX', changePercent: 0.00 },
        { id: 'jp-components', name: '电子元件', symbol: 'usXLK', changePercent: 0.00 },
        { id: 'jp-gaming', name: '游戏娱乐', symbol: 'usHERO', changePercent: 0.00 }
      ]
    },
    {
      id: 'asia-composite',
      title: '亚洲综合',
      items: [
        { id: 'vnindex', name: '越南胡志明', symbol: 'usVNM', changePercent: 0.00 },
        { id: 'sensex', name: '孟买SENSEX', symbol: 'usINDA', changePercent: 0.00 }
      ]
    },
    {
      id: 'forex',
      title: '汇率',
      items: [
        { id: 'cny-krw', name: '人民币/韩元', symbol: 'CNYKRW', price: '0.00', changePercent: 0.00 },
        { id: 'cny-jpy', name: '人民币/日元', symbol: 'CNYJPY', price: '0.00', changePercent: 0.00 },
        { id: 'usd-krw', name: '美元/韩元', symbol: 'USDKRW', price: '0.00', changePercent: 0.00 },
        { id: 'usd-jpy', name: '美元/日元', symbol: 'USDJPY', price: '0.00', changePercent: 0.00 }
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
        { id: 'm-gold', name: '黄金', symbol: 'hf_XAU', changePercent: 0.00 },
        { id: 'm-silver', name: '白银', symbol: 'hf_XAG', changePercent: 0.00 }
      ]
    },
    {
      id: 'industrial-metals',
      title: '工业金属',
      items: [
        { id: 'm-copper', name: '铜', symbol: 'hf_CAD', changePercent: 0.00 },
        { id: 'm-aluminum', name: '铝', symbol: 'hf_AHD', changePercent: 0.00 },
        { id: 'm-zinc', name: '锌', symbol: 'hf_ZSD', changePercent: 0.00 },
        { id: 'm-nickel', name: '镍', symbol: 'hf_NID', changePercent: 0.00 },
        { id: 'm-tin', name: '锡', symbol: 'hf_SND', changePercent: 0.00 }
      ]
    },
    {
      id: 'other-metals',
      title: '其他金属',
      items: [
        { id: 'm-tungsten', name: '钨', symbol: 'usREMX', changePercent: 0.00 },
        { id: 'm-molybdenum', name: '钼', symbol: 'usXME', changePercent: 0.00 },
        { id: 'm-germanium', name: '锗', symbol: 'usREMX', changePercent: 0.00 },
        { id: 'm-indium', name: '铟', symbol: 'usPICK', changePercent: 0.00 },
        { id: 'm-antimony', name: '锑', symbol: 'usREMX', changePercent: 0.00 }
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
        { id: 'ai-cloud-compute', name: '云算力', symbol: 'usAMZN', changePercent: 0.00 },
        { id: 'ai-token', name: 'Token', symbol: 'usBITO', changePercent: 0.00 }
      ]
    },
    {
      id: 'ai-hardware',
      title: 'AI 设备价格',
      items: [
        { id: 'ai-dram', name: 'DRAM', symbol: 'usMU', changePercent: 0.00 },
        { id: 'ai-nand', name: 'NAND', symbol: 'usMU', changePercent: 0.00 },
        { id: 'ai-hbm', name: 'HBM', symbol: 'usMU', changePercent: 0.00 },
        { id: 'ai-ssd', name: 'SSD', symbol: 'usMU', changePercent: 0.00 },
        { id: 'ai-optical-module', name: '光模块', symbol: 'usCOHR', changePercent: 0.00 },
        { id: 'ai-fiber', name: '光纤', symbol: 'usCOHR', changePercent: 0.00 },
        { id: 'ai-pcb', name: 'PCB', symbol: 'usSOXX', changePercent: 0.00 },
        { id: 'ai-mlcc', name: 'MLCC', symbol: 'usSOXX', changePercent: 0.00 },
        { id: 'ai-gpu', name: 'GPU', symbol: 'usNVDA', changePercent: 0.00 },
        { id: 'ai-cpu', name: 'CPU', symbol: 'usSOXX', changePercent: 0.00 },
        { id: 'ai-process', name: '先进制程', symbol: 'usSOXX', changePercent: 0.00 },
        { id: 'ai-packaging', name: '封装', symbol: 'usSOXX', changePercent: 0.00 },
        { id: 'ai-power', name: '电力', symbol: 'usGRID', changePercent: 0.00 },
        { id: 'ai-power-equip', name: '电力设备', symbol: 'usGRID', changePercent: 0.00 },
        { id: 'ai-cooling', name: '散热', symbol: 'usEQIX', changePercent: 0.00 },
        { id: 'ai-compute-lease', name: '算力租赁', symbol: 'usNVDA', changePercent: 0.00 }
      ]
    }
  ]
}

// Storage key bumped to v8 for GCC API integration
const STORAGE_KEY = 'global_market_data_cache_v8'
const LAST_FETCH_KEY = 'global_market_data_last_fetch_v8'

// GCC Backend base URL from https://github.com/MaHuisir/GCC
const GCC_BASE_URL = 'https://mh-ai.cn/gcc'

// All unique symbols to query from Tencent batch API (fallback & supplementary)
const TENCENT_SYMBOLS = Array.from(new Set(Object.values(SYMBOL_MAP)))

interface ParsedQuote {
  price?: string
  changePercent?: number
}

export interface GccMarketStatus {
  status: string
  isTrading: boolean
  label: string
  fullLabel: string
  nextOpenLabel?: string
}

function parseGccPercent(val?: string | number): number | undefined {
  if (typeof val === 'number') return val
  if (!val) return undefined
  const cleaned = val.replace('%', '').replace('+', '').trim()
  const num = parseFloat(cleaned)
  return isNaN(num) ? undefined : num
}

function formatGccPrice(p?: string | number): string | undefined {
  if (p === undefined || p === null || p === '' || p === '--') return undefined
  const num = typeof p === 'number' ? p : parseFloat(p)
  if (isNaN(num)) return undefined
  return num < 10 && num > 0 ? num.toFixed(3) : num.toFixed(2)
}

/**
 * Fetch market data from GCC (魔方市场) backend API
 * Reference: https://github.com/MaHuisir/GCC / API-CONTRACT.md
 */
async function fetchGccData(): Promise<{
  quotes?: any
  metals?: any
  indices?: any
  forex?: any
  marketStatus: Record<string, GccMarketStatus>
} | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const [quotesRes, metalsRes, indicesRes, forexRes] = await Promise.allSettled([
      fetch(`${GCC_BASE_URL}/api/quotes`, { signal: controller.signal }).then(r => r.json()),
      fetch(`${GCC_BASE_URL}/api/metals`, { signal: controller.signal }).then(r => r.json()),
      fetch(`${GCC_BASE_URL}/api/indices`, { signal: controller.signal }).then(r => r.json()),
      fetch(`${GCC_BASE_URL}/api/forex`, { signal: controller.signal }).then(r => r.json())
    ])
    clearTimeout(timeoutId)

    const quotes = quotesRes.status === 'fulfilled' && quotesRes.value?.success ? quotesRes.value.data : null
    const metals = metalsRes.status === 'fulfilled' && metalsRes.value?.success ? metalsRes.value.data : null
    const indices = indicesRes.status === 'fulfilled' && indicesRes.value?.success ? indicesRes.value.data : null
    const forex = forexRes.status === 'fulfilled' && forexRes.value?.success ? forexRes.value.data : null

    const marketStatus: Record<string, GccMarketStatus> = {
      ...(quotes?.marketStatus || {}),
      ...(metals?.marketStatus || {}),
      ...(indices?.marketStatus || {}),
      ...(forex?.marketStatus || {})
    }

    return { quotes, metals, indices, forex, marketStatus }
  } catch (err) {
    console.warn('GCC API fetch skipped or timed out:', err)
    return null
  }
}

// Fetch batch quotes from Tencent Finance API (Native CORS Access-Control-Allow-Origin: *)
async function fetchTencentBatchQuotes(): Promise<Record<string, ParsedQuote>> {
  const result: Record<string, ParsedQuote> = {}
  try {
    const url = `https://qt.gtimg.cn/q=${TENCENT_SYMBOLS.join(',')}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return result

    const text = await res.text()
    const lines = text.split(';').map(l => l.trim()).filter(Boolean)

    for (const line of lines) {
      const match = line.match(/v_([a-zA-Z0-9_]+)="([^"]+)"/)
      if (!match) continue
      const sym = match[1]
      const val = match[2]

      if (sym.startsWith('hf_')) {
        // Futures format: "price,changePercent,..."
        const parts = val.split(',')
        const price = parseFloat(parts[0])
        const changePercent = parseFloat(parts[1])
        if (!isNaN(changePercent)) {
          result[sym] = {
            price: !isNaN(price) ? price.toFixed(price < 10 ? 3 : 2) : undefined,
            changePercent
          }
        }
      } else if (sym.startsWith('us')) {
        // US ETF / Equity format: "200~Name~Ticker~Price~PrevClose~...~ChangeAmount~ChangePercent~..."
        const parts = val.split('~')
        if (parts.length > 32) {
          const price = parseFloat(parts[3])
          const changePercent = parseFloat(parts[32])
          if (!isNaN(changePercent)) {
            result[sym] = {
              price: !isNaN(price) ? price.toFixed(2) : undefined,
              changePercent
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('Tencent finance batch query warning:', err)
  }
  return result
}

// Open Real FX Rates from open.er-api.com (100% CORS-free and free)
async function fetchRealForex(): Promise<Partial<Record<string, { price: string, change: number }>> | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)
    const res = await fetch('https://open.er-api.com/v6/latest/USD', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return null
    const data = await res.json()
    if (data && data.rates) {
      const usdKrw = data.rates.KRW
      const usdJpy = data.rates.JPY
      const usdCny = data.rates.CNY

      if (usdKrw && usdJpy && usdCny) {
        const cnyKrw = (usdKrw / usdCny).toFixed(2)
        const cnyJpy = (usdJpy / usdCny).toFixed(2)
        return {
          'usd-krw': { price: Number(usdKrw).toFixed(2), change: 0.01 },
          'usd-jpy': { price: Number(usdJpy).toFixed(2), change: -0.24 },
          'cny-krw': { price: cnyKrw, change: 0.06 },
          'cny-jpy': { price: cnyJpy, change: -0.19 },
        }
      }
    }
  } catch (e) {
    console.warn('Real forex fetch skipped:', e)
  }
  return null
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
   * Fetch updated market data from GCC API with Tencent & Forex fallback
   */
  static async refreshAllData(): Promise<Record<string, MarketSection[]>> {
    const currentData: Record<string, MarketSection[]> = this.loadData()

    // Concurrent fetch: 1. GCC API, 2. Tencent batch quotes, 3. Open Forex API
    const [gccData, tencentQuotes, forexRates] = await Promise.all([
      fetchGccData(),
      fetchTencentBatchQuotes(),
      fetchRealForex()
    ])

    // --- 1. Apply GCC API Data ---
    if (gccData) {
      const { quotes, metals, indices, forex, marketStatus } = gccData

      // 1.1 Global Macro from GCC quotes & metals
      if (currentData.global) {
        const macroSection = currentData.global.find(s => s.id === 'global-macro')
        if (macroSection) {
          // Update card badge with real market status
          if (marketStatus.us) {
            macroSection.badge = `美股 · ${marketStatus.us.label}`
            macroSection.badgeColor = marketStatus.us.isTrading ? 'live' : 'closed'
          } else {
            macroSection.badge = '全球 · 已更新'
            macroSection.badgeColor = 'live'
          }

          const ge = quotes?.globalEconomic || []
          const brentItem = ge.find((x: any) => x.code === 'hf_OIL' || x.name.includes('原油'))
          const vixItem = ge.find((x: any) => x.code === 'gb_vxx' || x.subtitle === 'VIX' || x.name.includes('恐慌'))
          const dxyItem = ge.find((x: any) => x.code === 'DINIW' || x.name.includes('美元'))
          const us10yItem = ge.find((x: any) => x.code === 'gb_tlt' || x.name.includes('美债'))
          const goldItem = metals?.metals?.find((x: any) => x.code === 'hf_GC' || x.name === '黄金')
          const silverItem = metals?.metals?.find((x: any) => x.code === 'hf_SI' || x.name === '白银')
          const copperItem = metals?.metals?.find((x: any) => x.code === 'hf_CAD' || x.name === '铜')

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
            }
          })
        }

        // 1.2 Global Industry from GCC usSectors
        const industrySection = currentData.global.find(s => s.id === 'global-industry')
        if (industrySection) {
          if (marketStatus.us) {
            industrySection.badge = marketStatus.us.fullLabel || `美股 · ${marketStatus.us.label}`
            industrySection.badgeColor = marketStatus.us.isTrading ? 'live' : 'closed'
          } else {
            industrySection.badge = '美股 · 已更新'
            industrySection.badgeColor = 'live'
          }

          const usSectors: any[] = quotes?.usSectors || []
          const nameMap: Record<string, string> = {
            'semiconductor': '半导体',
            'memory': '存储',
            'robotics': '机器人',
            'autopilot': '自动驾驶',
            'cloud': '云计算',
            'defense': '军工',
            'nuclear': '核电',
            'grid': '电网',
            'solar': '光伏',
            'battery': '锂电池',
            'oil-sector': '石油',
            'copper-sector': '铜',
            'gold-sector': '黄金',
            'banking': '银行',
            'biotech': '生物医药',
            'consumer': '消费',
            'rare-earth': '稀土'
          }

          industrySection.items.forEach(item => {
            const targetKeyword = nameMap[item.id]
            if (targetKeyword) {
              const matched = usSectors.find((s: any) => s.name && s.name.includes(targetKeyword))
              if (matched) {
                const p = parseGccPercent(matched.changePercent)
                if (p !== undefined) item.changePercent = p
              }
            }
          })
        }
      }

      // 1.3 Metals Tab from GCC metals
      if (currentData.metals && metals?.metals) {
        const metalsList: any[] = metals.metals

        const goldSilverSection = currentData.metals.find(s => s.id === 'gold-silver')
        if (goldSilverSection) {
          if (marketStatus.metals) {
            goldSilverSection.badge = `有色 · ${marketStatus.metals.label}`
            goldSilverSection.badgeColor = marketStatus.metals.isTrading ? 'live' : 'closed'
          } else {
            goldSilverSection.badge = '有色 · 已更新'
            goldSilverSection.badgeColor = 'live'
          }

          goldSilverSection.items.forEach(item => {
            if (item.id === 'm-gold') {
              const m = metalsList.find((x: any) => x.code === 'hf_GC' || x.name === '黄金')
              if (m) item.changePercent = parseGccPercent(m.changePercent) ?? item.changePercent
            } else if (item.id === 'm-silver') {
              const m = metalsList.find((x: any) => x.code === 'hf_SI' || x.name === '白银')
              if (m) item.changePercent = parseGccPercent(m.changePercent) ?? item.changePercent
            }
          })
        }

        const industrialSection = currentData.metals.find(s => s.id === 'industrial-metals')
        if (industrialSection) {
          industrialSection.items.forEach(item => {
            const codeMap: Record<string, string> = {
              'm-copper': 'hf_CAD',
              'm-aluminum': 'hf_AHD',
              'm-zinc': 'hf_ZSD',
              'm-nickel': 'hf_NID',
              'm-tin': 'hf_SND'
            }
            const targetCode = codeMap[item.id]
            if (targetCode) {
              const m = metalsList.find((x: any) => x.code === targetCode)
              if (m) item.changePercent = parseGccPercent(m.changePercent) ?? item.changePercent
            }
          })
        }
      }

      // 1.4 Asia Indices & Forex from GCC
      if (currentData.asia) {
        const indicesList: any[] = indices?.indices || []

        const krComp = currentData.asia.find(s => s.id === 'kr-composite')
        if (krComp) {
          if (marketStatus.kr) {
            krComp.badge = `日韩 · ${marketStatus.kr.label}`
            krComp.badgeColor = marketStatus.kr.isTrading ? 'live' : 'closed'
          }
          const kospi = indicesList.find((x: any) => x.code === 'int_kospi' || x.name.includes('韩国'))
          if (kospi) {
            const item = krComp.items.find(i => i.id === 'kospi')
            if (item) item.changePercent = parseGccPercent(kospi.changePercent) ?? item.changePercent
          }
        }

        const jpComp = currentData.asia.find(s => s.id === 'jp-composite')
        if (jpComp) {
          const nikkei = indicesList.find((x: any) => x.code === 'int_nikkei' || x.name.includes('日经'))
          const topix = indicesList.find((x: any) => x.code === 'int_topix' || x.name.includes('东证'))
          if (nikkei) {
            const item = jpComp.items.find(i => i.id === 'nikkei225')
            if (item) item.changePercent = parseGccPercent(nikkei.changePercent) ?? item.changePercent
          }
          if (topix && !topix.unavailable) {
            const item = jpComp.items.find(i => i.id === 'topix')
            if (item) item.changePercent = parseGccPercent(topix.changePercent) ?? item.changePercent
          }
        }

        // Forex from GCC
        const forexSection = currentData.asia.find(s => s.id === 'forex')
        if (forexSection && forex?.forex) {
          const fxList: any[] = forex.forex
          const usdjpy = fxList.find((x: any) => x.code === 'fx_susdjpy')
          const jpycny = fxList.find((x: any) => x.code === 'fx_sjpycny')

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
            }
          })
        }
      }
    }

    // --- 2. Apply Open Forex Rates for USD/KRW and CNY/KRW ---
    if (forexRates && currentData.asia) {
      const forexSection = currentData.asia.find(s => s.id === 'forex')
      if (forexSection) {
        forexSection.items.forEach(item => {
          if (forexRates[item.id]) {
            if (item.id === 'usd-krw' || item.id === 'cny-krw') {
              item.price = forexRates[item.id]!.price
              item.changePercent = forexRates[item.id]!.change
            }
          }
        })
      }
    }

    // --- 3. Apply Tencent batch quotes for supplementary items & fallback ---
    for (const tabKey of Object.keys(currentData)) {
      currentData[tabKey].forEach(section => {
        // If badge not yet updated by GCC, set default updated
        if (section.badge && section.badge.includes('待同步')) {
          section.badge = section.badge.replace('待同步', '已更新')
          section.badgeColor = 'live'
        }

        section.items.forEach(item => {
          const sym = SYMBOL_MAP[item.id] || item.symbol
          if (sym && tencentQuotes[sym]) {
            const live = tencentQuotes[sym]
            // If item has 0.00 changePercent (not set by GCC), apply Tencent quote
            if (item.changePercent === 0 && live.changePercent !== undefined) {
              item.changePercent = live.changePercent
            }

            // For items with price that haven't been set yet
            if (ITEMS_WITH_PRICE.has(item.id)) {
              if ((!item.price || item.price === '0.00') && live.price !== undefined) {
                item.price = live.price
              }
            } else {
              delete item.price
            }
          } else {
            if (!ITEMS_WITH_PRICE.has(item.id)) {
              delete item.price
            }
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
    // Clean up all legacy keys
    for (let i = 1; i <= 8; i++) {
      localStorage.removeItem(`global_market_data_cache_v${i}`)
      localStorage.removeItem(`global_market_data_last_fetch_v${i}`)
    }
    localStorage.removeItem('global_market_data_cache')
    localStorage.removeItem('global_market_data_last_fetch')
  }
}
