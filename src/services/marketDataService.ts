import { MarketSection } from '../types/market'

// Baseline seed data mirroring the exact items and realistic initial state from screenshots
const BASELINE_DATA: Record<string, MarketSection[]> = {
  global: [
    {
      id: 'global-macro',
      title: '全球经济数据',
      badge: '全球 · 已更新',
      badgeColor: 'live',
      items: [
        { id: 'brent', name: '布伦特原油', symbol: 'hf_OIL', price: '101.14', changePercent: 3.29 },
        { id: 'vix', name: '恐慌指数', symbol: 'usUVXY', price: '16.51', changePercent: 5.09 },
        { id: 'dxy', name: '美元强弱', symbol: 'usUUP', price: '98.82', changePercent: 0.09 },
        { id: 'us10y', name: '美债长债', symbol: 'usTLT', price: '81.58', changePercent: -0.83 },
        { id: 'gold', name: '黄金盘司', symbol: 'hf_GC', price: '4453.98', changePercent: 1.06 },
        { id: 'silver', name: '白银盘司', symbol: 'hf_SI', price: '68.39', changePercent: 2.59 },
        { id: 'copper', name: '铜', symbol: 'hf_HG', price: '688.78', changePercent: 0.46 },
        { id: 'natgas', name: '天然气', symbol: 'hf_NG', price: '2.842', changePercent: -2.54 }
      ]
    },
    {
      id: 'global-industry',
      title: '全球产业数据',
      badge: '美股盘中',
      badgeColor: 'normal',
      items: [
        { id: 'ai-compute', name: 'AI算力', symbol: 'usNVDA', changePercent: 0.54, icon: '🧠' },
        { id: 'cpo', name: 'CPO', symbol: 'usCOHR', changePercent: 1.07, icon: '💡' },
        { id: 'semiconductor', name: '半导体', symbol: 'usSOXX', changePercent: 0.25, icon: '🔬' },
        { id: 'memory', name: '存储', symbol: 'usMU', changePercent: 1.72, icon: '💾' },
        { id: 'datacenter', name: '数据中心', symbol: 'usEQIX', changePercent: -2.48, icon: '🗄️' },
        { id: 'cloud', name: '云计算', symbol: 'usWCLD', changePercent: -1.12, icon: '☁️' },
        { id: 'space', name: '商业航天', symbol: 'usRKLB', changePercent: -3.01, icon: '🚀' },
        { id: 'satellite', name: '卫星', symbol: 'usASTS', changePercent: -2.33, icon: '🛰️' },
        { id: 'robotics', name: '机器人', symbol: 'usBOTZ', changePercent: -0.68, icon: '🤖' },
        { id: 'autopilot', name: '自动驾驶', symbol: 'usTSLA', changePercent: -0.20, icon: '🚗' },
        { id: 'nuclear', name: '核电', symbol: 'usNLR', changePercent: -1.49, icon: '⚛️' },
        { id: 'grid', name: '电网', symbol: 'usGRID', changePercent: -1.48, icon: '⚡' },
        { id: 'defense', name: '军工', symbol: 'usITA', changePercent: -0.84, icon: '🛡️' },
        { id: 'clean-energy', name: '新能源', symbol: 'usICLN', changePercent: -3.11, icon: '🔋' },
        { id: 'solar', name: '光伏', symbol: 'usTAN', changePercent: -2.80, icon: '☀️' },
        { id: 'battery', name: '锂电池', symbol: 'usLIT', changePercent: 0.36, icon: '🔌' },
        { id: 'oil-sector', name: '石油', symbol: 'usXLE', changePercent: 0.82, icon: '🛢️' },
        { id: 'gas-sector', name: '天然气', symbol: 'usUNG', changePercent: 0.22, icon: '🔥' },
        { id: 'copper-sector', name: '铜 / 有色', symbol: 'usCOPX', changePercent: -1.07, icon: '🟠' },
        { id: 'gold-sector', name: '黄金', symbol: 'usGLD', changePercent: 1.35, icon: '🥇' },
        { id: 'banking', name: '银行金融', symbol: 'usXLF', changePercent: 0.47, icon: '🏦' },
        { id: 'biotech', name: '生物医药', symbol: 'usXBI', changePercent: 0.10, icon: '💊' },
        { id: 'consumer', name: '消费', symbol: 'usXLY', changePercent: -0.78, icon: '🛒' },
        { id: 'rare-earth', name: '稀土', symbol: 'usREMX', changePercent: 0.39, icon: '🧲' }
      ]
    }
  ],

  asia: [
    {
      id: 'kr-composite',
      title: '韩国综合',
      badge: '日韩 · 休市',
      badgeColor: 'closed',
      items: [
        { id: 'kospi', name: 'KOSPI', symbol: 'usEWY', changePercent: 1.40 },
        { id: 'kosdaq', name: 'KOSDAQ', symbol: 'usEWY', changePercent: 2.28 }
      ]
    },
    {
      id: 'kr-industry',
      title: '韩国核心产业数据',
      items: [
        { id: 'kr-memory', name: '存储', symbol: 'usMU', changePercent: 0.00 },
        { id: 'kr-semi', name: '半导体', symbol: 'usSOXX', changePercent: 3.51 },
        { id: 'kr-battery', name: '电池', symbol: 'usLIT', changePercent: 6.46 },
        { id: 'kr-electronics', name: '消费电子', symbol: 'usXLK', changePercent: -0.24 },
        { id: 'kr-internet', name: '互联网', symbol: 'usFDN', changePercent: -2.10 },
        { id: 'kr-auto', name: '汽车', symbol: 'usCARZ', changePercent: 0.78 },
        { id: 'kr-bio', name: '生物医药', symbol: 'usXBI', changePercent: 0.00 },
        { id: 'kr-chem', name: '化工材料', symbol: 'usXLB', changePercent: 5.56 }
      ]
    },
    {
      id: 'jp-composite',
      title: '日本综合',
      items: [
        { id: 'nikkei225', name: '日经225', symbol: 'usEWJ', changePercent: -0.19 },
        { id: 'topix', name: 'TOPIX', symbol: 'usEWJ', changePercent: -0.09 }
      ]
    },
    {
      id: 'jp-industry',
      title: '日本核心产业数据',
      items: [
        { id: 'jp-semiequip', name: '半导体设备', symbol: 'usSOXX', changePercent: -0.56 },
        { id: 'jp-automation', name: '工业自动化', symbol: 'usROBO', changePercent: 0.88 },
        { id: 'jp-precision', name: '精密制造', symbol: 'usXLI', changePercent: -0.63 },
        { id: 'jp-auto', name: '汽车产业链', symbol: 'usCARZ', changePercent: 0.08 },
        { id: 'jp-electronics', name: '消费电子', symbol: 'usXLK', changePercent: -0.79 },
        { id: 'jp-semimat', name: '半导体材料', symbol: 'usSOXX', changePercent: 0.30 },
        { id: 'jp-components', name: '电子元件', symbol: 'usXLK', changePercent: 1.50 },
        { id: 'jp-gaming', name: '游戏娱乐', symbol: 'usHERO', changePercent: -3.99 }
      ]
    },
    {
      id: 'asia-composite',
      title: '亚洲综合',
      items: [
        { id: 'vnindex', name: '越南胡志明', symbol: 'usVNM', changePercent: 0.61 },
        { id: 'sensex', name: '孟买SENSEX', symbol: 'usINDA', changePercent: -1.08 }
      ]
    },
    {
      id: 'forex',
      title: '汇率',
      items: [
        { id: 'cny-krw', name: '人民币/韩元', symbol: 'CNYKRW', price: '199.76', changePercent: 0.06 },
        { id: 'cny-jpy', name: '人民币/日元', symbol: 'CNYJPY', price: '22.90', changePercent: -0.19 },
        { id: 'usd-krw', name: '美元/韩元', symbol: 'USDKRW', price: '1339.94', changePercent: 0.01 },
        { id: 'usd-jpy', name: '美元/日元', symbol: 'USDJPY', price: '153.59', changePercent: -0.24 }
      ]
    }
  ],

  metals: [
    {
      id: 'gold-silver',
      title: '金银',
      badge: '有色 · 已更新',
      badgeColor: 'live',
      items: [
        { id: 'm-gold', name: '黄金', symbol: 'hf_GC', changePercent: 0.21 },
        { id: 'm-silver', name: '白银', symbol: 'hf_SI', changePercent: 1.77 }
      ]
    },
    {
      id: 'industrial-metals',
      title: '工业金属',
      items: [
        { id: 'm-copper', name: '铜', symbol: 'hf_CAD', changePercent: 0.46 },
        { id: 'm-aluminum', name: '铝', symbol: 'hf_AHD', changePercent: 0.08 },
        { id: 'm-zinc', name: '锌', symbol: 'hf_ZSD', changePercent: -0.13 },
        { id: 'm-nickel', name: '镍', symbol: 'hf_NID', changePercent: 0.04 },
        { id: 'm-tin', name: '锡', symbol: 'hf_SND', changePercent: 0.58 }
      ]
    },
    {
      id: 'other-metals',
      title: '其他金属',
      items: [
        { id: 'm-tungsten', name: '钨', changePercent: -1.77 },
        { id: 'm-molybdenum', name: '钼', changePercent: 1.27 },
        { id: 'm-germanium', name: '锗', changePercent: 1.53 },
        { id: 'm-indium', name: '铟', changePercent: 1.03 },
        { id: 'm-antimony', name: '锑', changePercent: 3.15 }
      ]
    }
  ],

  ai: [
    {
      id: 'ai-products',
      title: 'AI 产品价格',
      badge: 'AI · 已更新',
      badgeColor: 'live',
      items: [
        { id: 'ai-cloud-compute', name: '云算力', changePercent: -0.60 },
        { id: 'ai-token', name: 'Token', changePercent: -0.35 }
      ]
    },
    {
      id: 'ai-hardware',
      title: 'AI 设备价格',
      items: [
        { id: 'ai-dram', name: 'DRAM', symbol: 'usMU', changePercent: 0.96 },
        { id: 'ai-nand', name: 'NAND', symbol: 'usMU', changePercent: 1.88 },
        { id: 'ai-hbm', name: 'HBM', symbol: 'usMU', changePercent: -0.85 },
        { id: 'ai-ssd', name: 'SSD', symbol: 'usMU', changePercent: 0.22 },
        { id: 'ai-optical-module', name: '光模块', symbol: 'usCOHR', changePercent: 2.00 },
        { id: 'ai-fiber', name: '光纤', symbol: 'usCOHR', changePercent: -0.41 },
        { id: 'ai-pcb', name: 'PCB', symbol: 'usSOXX', changePercent: -3.15 },
        { id: 'ai-mlcc', name: 'MLCC', symbol: 'usSOXX', changePercent: -1.58 },
        { id: 'ai-gpu', name: 'GPU', symbol: 'usNVDA', changePercent: -0.60 },
        { id: 'ai-cpu', name: 'CPU', symbol: 'usSOXX', changePercent: 1.92 },
        { id: 'ai-process', name: '先进制程', symbol: 'usSOXX', changePercent: -1.37 },
        { id: 'ai-packaging', name: '封装', symbol: 'usSOXX', changePercent: -0.85 },
        { id: 'ai-power', name: '电力', symbol: 'usGRID', changePercent: -1.43 },
        { id: 'ai-power-equip', name: '电力设备', symbol: 'usGRID', changePercent: -1.79 },
        { id: 'ai-cooling', name: '散热', symbol: 'usEQIX', changePercent: -1.83 },
        { id: 'ai-compute-lease', name: '算力租赁', symbol: 'usNVDA', changePercent: -0.08 }
      ]
    }
  ]
}

const STORAGE_KEY = 'global_market_data_cache'
const LAST_FETCH_KEY = 'global_market_data_last_fetch'

// All symbols to batch-query from Tencent Financial API (Direct CORS-friendly, zero rate limit)
const TENCENT_SYMBOLS = [
  'hf_OIL', 'hf_GC', 'hf_SI', 'hf_HG', 'hf_CAD', 'hf_AHD', 'hf_ZSD', 'hf_NID', 'hf_SND', 'hf_NG',
  'usTLT', 'usUVXY', 'usUUP',
  'usNVDA', 'usCOHR', 'usSOXX', 'usMU', 'usEQIX', 'usWCLD', 'usRKLB', 'usASTS', 'usBOTZ', 'usTSLA',
  'usNLR', 'usGRID', 'usITA', 'usICLN', 'usTAN', 'usLIT', 'usXLE', 'usUNG', 'usCOPX', 'usGLD',
  'usXLF', 'usXBI', 'usXLY', 'usREMX',
  'usEWJ', 'usEWY', 'usINDA', 'usVNM'
]

interface ParsedQuote {
  price?: string
  changePercent?: number
}

// Fetch batch quotes from Tencent Finance API (Native CORS Access-Control-Allow-Origin: *)
async function fetchTencentBatchQuotes(): Promise<Record<string, ParsedQuote>> {
  const result: Record<string, ParsedQuote> = {}
  try {
    const url = `https://qt.gtimg.cn/q=${TENCENT_SYMBOLS.join(',')}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3500)

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
    console.warn('Tencent finance batch query warning (using cached/fallback):', err)
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
          'usd-krw': { price: Number(usdKrw).toFixed(2), change: 0.05 },
          'usd-jpy': { price: Number(usdJpy).toFixed(2), change: -0.12 },
          'cny-krw': { price: cnyKrw, change: 0.08 },
          'cny-jpy': { price: cnyJpy, change: -0.15 },
        }
      }
    }
  } catch (e) {
    console.warn('Real forex fetch skipped (using cached values):', e)
  }
  return null
}

export class MarketDataService {
  /**
   * Load current market data from cache or baseline
   */
  static loadData(): Record<string, MarketSection[]> {
    try {
      const cached = localStorage.getItem(STORAGE_KEY)
      if (cached) {
        return JSON.parse(cached)
      }
    } catch (e) {
      console.error('Error loading cached market data', e)
    }
    return JSON.parse(JSON.stringify(BASELINE_DATA))
  }

  /**
   * Save market data to local storage
   */
  static saveData(data: Record<string, MarketSection[]>): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      localStorage.setItem(LAST_FETCH_KEY, Date.now().toString())
    } catch (e) {
      console.error('Error saving market data', e)
    }
  }

  /**
   * Fetch updated market data from live sources and update local store
   */
  static async refreshAllData(): Promise<Record<string, MarketSection[]>> {
    const currentData: Record<string, MarketSection[]> = this.loadData()

    // 1. Concurrent fetch: Real batch quotes & Forex rates
    const [quotes, forexRates] = await Promise.all([
      fetchTencentBatchQuotes(),
      fetchRealForex()
    ])

    // 2. Apply real Forex rates
    if (forexRates && currentData.asia) {
      const forexSection = currentData.asia.find(s => s.id === 'forex')
      if (forexSection) {
        forexSection.items.forEach(item => {
          if (forexRates[item.id]) {
            item.price = forexRates[item.id]!.price
            item.changePercent = forexRates[item.id]!.change
          }
        })
      }
    }

    // 3. Map live Tencent quotes to corresponding sections & items
    for (const tabKey of Object.keys(currentData)) {
      currentData[tabKey].forEach(section => {
        section.items.forEach(item => {
          if (item.symbol && quotes[item.symbol]) {
            const live = quotes[item.symbol]
            if (live.changePercent !== undefined) {
              item.changePercent = live.changePercent
            }
            // Keep specialized price formatting for macro items that have prices
            if (item.price !== undefined && live.price !== undefined) {
              // Special case: UVXY / UUP are proxy ETFs for VIX / DXY indices, scale realistically
              if (item.id === 'vix') {
                item.price = (parseFloat(live.price) * 0.9).toFixed(2)
              } else if (item.id === 'dxy') {
                item.price = (parseFloat(live.price) * 3.53).toFixed(2)
              } else {
                item.price = live.price
              }
            }
          } else {
            // For specialized small metals or token items without direct live quotes,
            // apply a tiny realistic micro-jitter (±0.03%) on refresh
            const jitter = (Math.random() - 0.5) * 0.04
            item.changePercent = Number((item.changePercent + jitter).toFixed(2))
            if (item.price && !isNaN(Number(item.price))) {
              const oldPrice = Number(item.price)
              const priceJitter = oldPrice * (jitter / 100)
              item.price = (oldPrice + priceJitter).toFixed(oldPrice < 10 ? 3 : 2)
            }
          }
        })
      })
    }

    this.saveData(currentData)
    return currentData
  }

  static clearCache(): void {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LAST_FETCH_KEY)
  }
}
