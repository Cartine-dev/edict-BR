/**
 * zh.ts — Chinese (Simplified) locale — feat/i18n-ui
 *
 * Phase A: minimal set covering App.tsx header + EdictBoard.tsx.
 * Fase B will expand this file per-component (one commit per panel).
 *
 * RULE: Do NOT translate content from data/*.json (title, org, official, etc.)
 *        Only UI chrome / labels / status text that the app itself generates.
 */

const zh = {
    // ── App header ───────────────────────────────────────────────────────────
    'app.title': '三省六部 · 总控台',
    'app.subtitle': 'OpenClaw Sansheng-Liubu Dashboard',
    'app.sync.ok': '✅ 同步正常',
    'app.sync.err': '❌ 服务器未启动',
    'app.sync.pending': '⏳ 连接中…',
    'app.edicts_count': '{n} 道旨意',
    'app.lang_toggle': 'English',         // label shown when current lang=zh

    // ── Common actions ───────────────────────────────────────────────────────
    'common.refresh': '⟳ 刷新',
    'common.loading': '加载中…',
    'common.confirm': '确认',
    'common.cancel': '取消',
    'common.ok': '确定',
    'common.error': '错误',
    'common.success': '成功',
    'common.server_error': '服务器连接失败',
    'common.op_success': '操作成功',
    'common.op_failed': '操作失败',

    // ── Tabs ─────────────────────────────────────────────────────────────────
    'tabs.edicts': '旨意看板',
    'tabs.monitor': '省部调度',
    'tabs.officials': '官员总览',
    'tabs.models': '模型配置',
    'tabs.skills': '技能配置',
    'tabs.sessions': '小任务',
    'tabs.memorials': '奏折阁',
    'tabs.templates': '旨库',
    'tabs.morning': '天下要闻',

    // ── Monitor tab badge ────────────────────────────────────────────────────
    'tabs.monitor.badge': '{n}活跃',

    // ── Task states (UI labels, NOT data content) ────────────────────────────
    'state.Inbox': '收件',
    'state.Pending': '待处理',
    'state.Taizi': '太子分拣',
    'state.Zhongshu': '中书起草',
    'state.Menxia': '门下审议',
    'state.Assigned': '已派发',
    'state.Doing': '执行中',
    'state.Review': '待审查',
    'state.Done': '已完成',
    'state.Blocked': '阻塞',
    'state.Cancelled': '已取消',
    'state.Next': '待执行',
    'state.Menxia.round': '门下审议（第{r}轮）',
    'state.Zhongshu.round': '中书修订（第{r}轮）',

    // ── Relative time ─────────────────────────────────────────────────────────
    'time.just_now': '刚刚',
    'time.minutes_ago': '{n}分钟前',
    'time.hours_ago': '{n}小时前',
    'time.days_ago': '{n}天前',

    // ── EdictBoard ────────────────────────────────────────────────────────────
    'edict.filter.label': '筛选:',
    'edict.filter.active': '活跃',
    'edict.filter.archived': '归档',
    'edict.filter.all': '全部',
    'edict.archive_all': '📦 一键归档',
    'edict.archive_all.confirm': '将所有已完成/已取消的旨意移入归档？',
    'edict.archive_all.done': '📦 {n} 道旨意已归档',
    'edict.archive_all.err': '批量归档失败',
    'edict.scan': '🧭 太子巡检',
    'edict.scan.done': '🧭 太子巡检完成：{n} 个动作',
    'edict.scan.err': '巡检失败',
    'edict.empty': '暂无旨意',
    'edict.empty.hint': '通过飞书向太子发送任务，太子分拣后转中书省处理',
    'edict.count': '活跃 {active} · 归档 {archived} · 共 {total}',
    'edict.current': '当前:',
    'edict.no_title': '(无标题)',
    'edict.round': '第 {r} 轮磋商',
    'edict.todos.done': '✅ 全部完成',
    'edict.todos.progress': '🔄 进行中',
    'edict.stop': '⏸ 叫停',
    'edict.stop.prompt': '请输入叫停原因：',
    'edict.stop.done': '已叫停',
    'edict.cancel': '🚫 取消',
    'edict.cancel.prompt': '请输入取消原因：',
    'edict.resume': '▶ 恢复',
    'edict.resume.done': '已恢复',
    'edict.archive': '📦 归档',
    'edict.unarchive': '📤 取消归档',

    // ── Monitor panel ─────────────────────────────────────────────────────────
    'monitor.agent_status.title': '🔌 Agent 在线状态',
    'monitor.agent_status.gateway_unknown': '未知',
    'monitor.agent_status.checked_at': '检测于 {time}',
    'monitor.agent.no_activity': '无活动记录',
    'monitor.agent.wake': '⚡ 唤醒',
    'monitor.agent.wake_all': '⚡ 全部唤醒',
    'monitor.agent.wake_sent': '唤醒指令已发出',
    'monitor.agent.wake_failed': '唤醒失败',
    'monitor.agent.all_online': '所有 Agent 均已在线',
    'monitor.agent.waking_n': '正在唤醒 {n} 个 Agent…',
    'monitor.agent.woke_n': '{n} 个唤醒指令已发出，30秒后刷新状态',
    'monitor.agent.count.running': '{n} 运行中',
    'monitor.agent.count.idle': '{n} 待命',
    'monitor.agent.count.offline': '{n} 离线',
    'monitor.agent.count.unconfigured': '{n} 未配置',
    'monitor.dept.status.blocked': '⚠️ 阻塞',
    'monitor.dept.status.doing': '⚙️ 执行中',
    'monitor.dept.status.active': '🟢 活跃',
    'monitor.dept.status.idle': '⚪ 候命',
    'monitor.dept.idle_placeholder': '候命中',
    'monitor.dept.model_unconfigured': '待配置',

    // ── Officials panel ───────────────────────────────────────────────────────
    'officials.error.no_server': '⚠️ 请确保本地服务器已启动',
    'officials.activity.current_active': '🟢 当前活跃：',
    'officials.activity.others_standby': '其余官员待命',
    'officials.kpi.active_officials': '在职官员',
    'officials.kpi.total_done': '累计完成旨意',
    'officials.kpi.total_cost': '累计费用（含缓存）',
    'officials.kpi.top_merit': '功绩最高',
    'officials.ranklist.title': '功绩排行',
    'officials.merit_score': '{n}分',
    'officials.detail.select_hint': '选择左侧官员查看详情',
    'officials.detail.hb_idle': '⚪ 待命',
    'officials.token.in': '输入',
    'officials.token.out': '输出',
    'officials.token.cache_read': '缓存读',
    'officials.token.cache_write': '缓存写',
    'officials.detail.rank_score': '🏅 {rank} · 功绩分 {score}',
    'officials.detail.last_active': '活跃 {time}',
    'officials.detail.sessions_msgs': '{sessions} 个会话 · {messages} 条消息',
    'officials.detail.merit_stats': '功绩统计',
    'officials.detail.tasks_done': '完成旨意',
    'officials.detail.flow_participations': '流转参与',
    'officials.detail.token_usage': 'Token 消耗',
    'officials.detail.total_cost': '累计费用',
    'officials.detail.cny': '人民币',
    'officials.detail.usd': '美元',
    'officials.detail.total_tokens': '总计 {n} tokens',
    'officials.detail.edicts_title': '参与旨意（{n} 道）',
    'officials.detail.edicts_empty': '暂无旨意记录',

    // ── Officials — display names by id (presentation layer only) ─────────────
    'officials.role.taizi': '太子',
    'officials.role.zhongshu': '中书令',
    'officials.role.menxia': '侍中',
    'officials.role.shangshu': '尚书令',
    'officials.role.hubu': '户部尚书',
    'officials.role.libu': '礼部尚书',
    'officials.role.bingbu': '兵部尚书',
    'officials.role.xingbu': '刑部尚书',
    'officials.role.gongbu': '工部尚书',
    'officials.role.libu_hr': '吏部尚书',
    'officials.role.zaochao': '朝报官',
    'officials.label.taizi': '太子',
    'officials.label.zhongshu': '中书省',
    'officials.label.menxia': '门下省',
    'officials.label.shangshu': '尚书省',
    'officials.label.hubu': '户部',
    'officials.label.libu': '礼部',
    'officials.label.bingbu': '兵部',
    'officials.label.xingbu': '刑部',
    'officials.label.gongbu': '工部',
    'officials.label.libu_hr': '吏部',
    'officials.label.zaochao': '钦天监',

    // ── Heartbeat status labels ───────────────────────────────────────────────
    'hb.active': '🟢 活跃',
    'hb.idle': '⚪ 待命',
    'hb.warn': '🟡 可能停滞',
    'hb.offline': '🔴 离线',
    'hb.unknown': '❓ 未知',
} as const;

export default zh;
export type TranslationKey = keyof typeof zh;
