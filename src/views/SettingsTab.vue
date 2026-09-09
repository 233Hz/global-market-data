<template>
  <div class="space-y-4 md:space-y-6 max-w-3xl mx-auto">
    <!-- Card 0: 主题外观 (亮色 / 暗色) -->
    <div class="rounded-lg border-4 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] bg-[#fffef0] dark:bg-[#202024] p-4 md:p-6 transition-all duration-100">
      <h3 class="font-black uppercase tracking-wide text-base md:text-lg text-[#1a1a1a] dark:text-white mb-1">
        🎨 界面主题外观
      </h3>
      <p class="text-xs text-[#4a4a4a] dark:text-zinc-400 font-bold mb-4">
        自由切换漫画米白复古纸张与暗黑墨感风格，浓重墨线与硬边印刷阴影始终如一。
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <button
          @click="settings.theme = 'light'"
          :class="[
            'p-4 rounded-lg border-3 border-[#1a1a1a] text-left transition-all duration-100',
            settings.theme === 'light'
              ? 'bg-[#facc15] text-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]'
              : 'bg-white dark:bg-[#2a2a2f] text-[#1a1a1a] dark:text-zinc-200 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:shadow-none'
          ]"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-black uppercase text-sm text-[#1a1a1a] flex items-center gap-1.5">
              <Sun class="w-4 h-4 stroke-[2.5] text-amber-500" /> 亮色模式 · 漫画纸张
            </span>
            <span v-if="settings.theme === 'light'" class="w-3 h-3 rounded-sm bg-[#ef4444] border border-[#1a1a1a]"></span>
          </div>
          <p class="text-xs text-[#4a4a4a] font-bold">经典米白纸质底纹，还原日漫出版物触感</p>
        </button>

        <button
          @click="settings.theme = 'dark'"
          :class="[
            'p-4 rounded-lg border-3 border-[#1a1a1a] text-left transition-all duration-100',
            settings.theme === 'dark'
              ? 'bg-[#facc15] text-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]'
              : 'bg-white dark:bg-[#2a2a2f] text-[#1a1a1a] dark:text-zinc-200 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:shadow-none'
          ]"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-black uppercase text-sm text-[#1a1a1a] flex items-center gap-1.5">
              <Moon class="w-4 h-4 stroke-[2.5] text-[#1a1a1a]" /> 暗色模式 · 深墨黑底
            </span>
            <span v-if="settings.theme === 'dark'" class="w-3 h-3 rounded-sm bg-[#ef4444] border border-[#1a1a1a]"></span>
          </div>
          <p class="text-xs text-[#4a4a4a] font-bold">高对比度深色背景，夜间看盘沉浸护眼</p>
        </button>
      </div>
    </div>

    <!-- Card 1: 涨跌配色偏好 -->
    <div class="rounded-lg border-4 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] bg-[#fffef0] dark:bg-[#202024] p-4 md:p-6 transition-all duration-100">
      <h3 class="font-black uppercase tracking-wide text-base md:text-lg text-[#1a1a1a] dark:text-white mb-1">
        📈 涨跌色彩模式
      </h3>
      <p class="text-xs text-[#4a4a4a] dark:text-zinc-400 font-bold mb-4">
        根据您的看盘习惯设定涨跌展示颜色，始终辅以 ▲ / ▼ 明确方向。
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <button
          @click="settings.colorMode = 'cn'"
          :class="[
            'p-4 rounded-lg border-3 border-[#1a1a1a] text-left transition-all duration-100',
            settings.colorMode === 'cn'
              ? 'bg-[#facc15] text-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]'
              : 'bg-white dark:bg-[#2a2a2f] text-[#1a1a1a] dark:text-zinc-200 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:shadow-none'
          ]"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-black uppercase text-sm text-[#1a1a1a]">国内习惯 (红涨绿跌)</span>
            <span v-if="settings.colorMode === 'cn'" class="w-3 h-3 rounded-sm bg-[#ef4444] border border-[#1a1a1a]"></span>
          </div>
          <div class="flex items-center gap-2 text-xs font-mono font-black">
            <span class="px-2 py-0.5 rounded bg-[#ef4444] text-white border border-[#1a1a1a]">▲ 上涨 (红)</span>
            <span class="text-[#1a1a1a]">/</span>
            <span class="px-2 py-0.5 rounded bg-[#22c55e] text-[#1a1a1a] border border-[#1a1a1a]">▼ 下跌 (绿)</span>
          </div>
        </button>

        <button
          @click="settings.colorMode = 'global'"
          :class="[
            'p-4 rounded-lg border-3 border-[#1a1a1a] text-left transition-all duration-100',
            settings.colorMode === 'global'
              ? 'bg-[#facc15] text-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]'
              : 'bg-white dark:bg-[#2a2a2f] text-[#1a1a1a] dark:text-zinc-200 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:shadow-none'
          ]"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-black uppercase text-sm text-[#1a1a1a]">国际惯例 (绿涨红跌)</span>
            <span v-if="settings.colorMode === 'global'" class="w-3 h-3 rounded-sm bg-[#ef4444] border border-[#1a1a1a]"></span>
          </div>
          <div class="flex items-center gap-2 text-xs font-mono font-black">
            <span class="px-2 py-0.5 rounded bg-[#22c55e] text-[#1a1a1a] border border-[#1a1a1a]">▲ 上涨 (绿)</span>
            <span class="text-[#1a1a1a]">/</span>
            <span class="px-2 py-0.5 rounded bg-[#ef4444] text-white border border-[#1a1a1a]">▼ 下跌 (红)</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Card 2: 自动刷新设置 -->
    <div class="rounded-lg border-4 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] bg-[#fffef0] dark:bg-[#202024] p-4 md:p-6 transition-all duration-100">
      <div class="flex items-center justify-between mb-1">
        <h3 class="font-black uppercase tracking-wide text-base md:text-lg text-[#1a1a1a] dark:text-white">
          ⚡ 自动更新行情
        </h3>
        <!-- Comic Toggle Switch -->
        <button
          @click="settings.autoRefresh = !settings.autoRefresh"
          :class="[
            'w-13 h-7 rounded-lg border-3 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] relative transition-colors duration-100 focus:outline-none',
            settings.autoRefresh ? 'bg-[#22c55e]' : 'bg-zinc-300 dark:bg-zinc-700'
          ]"
        >
          <span
            :class="[
              'block w-5 h-5 rounded-md bg-white border-2 border-[#1a1a1a] transition-transform duration-100 transform',
              settings.autoRefresh ? 'translate-x-6' : 'translate-x-1'
            ]"
          ></span>
        </button>
      </div>
      <p class="text-xs text-[#4a4a4a] dark:text-zinc-400 font-bold mb-4">
        是否在后台定时拉取最新市场行情数据（已对接 GCC 官方后端）。
      </p>

      <!-- Refresh interval options -->
      <div v-if="settings.autoRefresh" class="space-y-2 pt-3 border-t-2 border-[#1a1a1a]">
        <label class="block text-xs font-black uppercase text-[#1a1a1a] dark:text-zinc-300">刷新频率间隔</label>
        <div class="grid grid-cols-3 gap-2.5">
          <button
            v-for="opt in intervalOptions"
            :key="opt.value"
            @click="settings.refreshInterval = opt.value"
            :class="[
              'py-2 px-3 rounded-lg border-2 border-[#1a1a1a] text-center text-xs font-black uppercase transition-all duration-100',
              settings.refreshInterval === opt.value
                ? 'bg-[#facc15] text-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
                : 'bg-white dark:bg-[#2a2a2f] text-[#1a1a1a] dark:text-zinc-300 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px]'
            ]"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Card 3: 行情数据维护 -->
    <div class="rounded-lg border-4 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] bg-[#fffef0] dark:bg-[#202024] p-4 md:p-6 transition-all duration-100">
      <h3 class="font-black uppercase tracking-wide text-base md:text-lg text-[#1a1a1a] dark:text-white mb-1">
        🛠️ 数据同步与维护
      </h3>
      <p class="text-xs text-[#4a4a4a] dark:text-zinc-400 font-bold mb-4">
        手动触发官方后端同步或清理浏览器缓存以重新加载基准状态。
      </p>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="refreshData"
          :disabled="isRefreshing"
          :class="[
            'rounded-lg font-black uppercase text-sm px-5 py-2.5 border-3 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] bg-[#3b82f6] text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none flex items-center justify-center gap-2 transition-all duration-100',
            isRefreshing ? 'opacity-60 cursor-not-allowed' : ''
          ]"
        >
          <RotateCw :class="['w-4 h-4 stroke-[2.5]', isRefreshing ? 'animate-spin' : '']" />
          <span>{{ isRefreshing ? '正在同步行情...' : '立即同步最新数据' }}</span>
        </button>

        <button
          @click="handleResetCache"
          class="rounded-lg font-black uppercase text-sm px-5 py-2.5 border-3 border-[#1a1a1a] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] bg-[#ef4444] text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none flex items-center justify-center gap-2 transition-all duration-100"
        >
          <Trash2 class="w-4 h-4 stroke-[2.5]" />
          <span>重置并清空本地缓存</span>
        </button>
      </div>

      <p v-if="cacheResetMsg" class="text-xs font-black uppercase text-[#22c55e] mt-3">
        ✓ {{ cacheResetMsg }}
      </p>
    </div>

    <!-- Card 4: 权威财经网页实时对比 -->
    <div class="rounded-lg border-4 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] bg-[#fffef0] dark:bg-[#202024] p-4 md:p-6 transition-all duration-100">
      <h3 class="font-black uppercase tracking-wide text-base md:text-lg text-[#1a1a1a] dark:text-white mb-1">
        🔗 权威财经行情核对
      </h3>
      <p class="text-xs text-[#4a4a4a] dark:text-zinc-400 font-bold mb-4">
        点击在新标签页打开权威财经行情页面，对比真实大盘与商品走势图。
      </p>

      <div class="space-y-3.5">
        <!-- 宏观与大宗商品 -->
        <div>
          <span class="text-xs font-black uppercase text-[#1a1a1a] dark:text-zinc-300 block mb-2">全球大宗商品与宏观</span>
          <div class="flex flex-wrap gap-2.5">
            <a
              href="https://finance.sina.com.cn/futures/quotes/OIL.shtml"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>布伦特原油 (新浪财经)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href="https://finance.sina.com.cn/futures/quotes/GC.shtml"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>COMEX黄金 (新浪财经)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href="https://finance.sina.com.cn/futures/quotes/SI.shtml"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>COMEX白银 (新浪财经)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href="https://xueqiu.com/S/TLT"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>美债长债 TLT (雪球)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>

        <!-- 汇率牌价 -->
        <div>
          <span class="text-xs font-black uppercase text-[#1a1a1a] dark:text-zinc-300 block mb-2">全球外汇牌价</span>
          <div class="flex flex-wrap gap-2.5">
            <a
              href="https://finance.sina.com.cn/money/forex/hq/USDJPY.shtml"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>美元/日元 (新浪外汇)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href="https://finance.sina.com.cn/money/forex/hq/CNYJPY.shtml"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>人民币/日元 (新浪外汇)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href="https://finance.sina.com.cn/money/forex/hq/USDKRW.shtml"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>美元/韩元 (新浪外汇)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>

        <!-- 科技与产业龙头 -->
        <div>
          <span class="text-xs font-black uppercase text-[#1a1a1a] dark:text-zinc-300 block mb-2">核心科技龙头标的</span>
          <div class="flex flex-wrap gap-2.5">
            <a
              href="https://xueqiu.com/S/NVDA"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>英伟达 NVDA (雪球)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href="https://xueqiu.com/S/MU"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>美光科技 MU (雪球)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href="https://xueqiu.com/S/SOXX"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>半导体 ETF SOXX (雪球)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <a
              href="https://xueqiu.com/S/TSLA"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] bg-white dark:bg-[#2b2b30] text-xs font-black text-[#1a1a1a] dark:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:shadow-none transition-all duration-100"
            >
              <span>特斯拉 TSLA (雪球)</span>
              <ExternalLink class="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 5: 关于与免责声明 -->
    <div class="rounded-lg border-4 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] bg-[#fffef0] dark:bg-[#202024] p-4 md:p-6 transition-all duration-100">
      <h3 class="font-black uppercase tracking-wide text-base md:text-lg text-[#1a1a1a] dark:text-white mb-2">
        📖 关于与设计说明
      </h3>
      <p class="text-xs text-[#4a4a4a] dark:text-zinc-300 font-bold leading-relaxed">
        本项目遵循 <span class="text-[#ef4444] font-black">Comic Style (漫画风格)</span> 设计规范，行情全面接入开源项目 [MaHuisir/GCC: 魔方市场] 官方生产环境 API 矩阵，覆盖全球宏观经济、美股核心板块、日韩核心产业、有色金属及 AI 全链路价格。<br/>
        <span class="text-[#4a4a4a] dark:text-zinc-400 mt-2 block font-black">
          ※ 免责声明：本程序展示的公开查询数据，仅供参考，不构成任何投资建议。※
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RotateCw, Trash2, Moon, Sun, ExternalLink } from 'lucide-vue-next'
import { useMarket } from '../composables/useMarket'
import { MarketDataService } from '../services/marketDataService'

const { settings, isRefreshing, refreshData } = useMarket()

const intervalOptions = [
  { label: '30 秒', value: 30 },
  { label: '1 分钟 (推荐)', value: 60 },
  { label: '5 分钟', value: 300 },
]

const cacheResetMsg = ref('')

function handleResetCache() {
  MarketDataService.clearCache()
  cacheResetMsg.value = '本地缓存已清空，正在重载基准行情...'
  setTimeout(() => {
    refreshData()
    setTimeout(() => {
      cacheResetMsg.value = ''
    }, 2000)
  }, 400)
}
</script>
