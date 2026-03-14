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

    // ── Task Modal ────────────────────────────────────────────────────────────
    'task_modal.no_title': '(无标题)',
    'task_modal.cur_stage': '当前阶段：{action}',
    'task_modal.btn.stop': '⏸ 叫停任务',
    'task_modal.btn.cancel': '🚫 取消任务',
    'task_modal.btn.resume': '▶️ 恢复执行',
    'task_modal.btn.approve': '✅ 准奏',
    'task_modal.btn.reject': '🚫 封驳',
    'task_modal.btn.advance': '⏩ 推进到下一步',

    'task_modal.review.prompt': '{label} {id}\n\n请输入批注（可留空）：',
    'task_modal.review.approve': '准奏',
    'task_modal.review.reject': '封驳',
    'task_modal.review.success': '✅ {id} 已{label}',

    'task_modal.advance.prompt': '⏩ 手动推进 {id}\n当前: {curr} → 下一步: {next}\n\n请输入说明（可留空）：',
    'task_modal.advance.next_default': '下一步',

    'task_modal.sched.scan.done': '🔍 扫描完成：{n} 个动作',
    'task_modal.sched.scan.fail': '扫描失败',

    'task_modal.sched.action.retry': '重试',
    'task_modal.sched.action.escalate': '升级',
    'task_modal.sched.action.rollback': '回滚',
    'task_modal.sched.prompt': '请输入{label}原因（可留空）：',

    'task_modal.stop.prompt': '请输入叫停原因（可留空）：',
    'task_modal.cancel.confirm': '确定要取消 {id} 吗？',
    'task_modal.cancel.prompt': '请输入取消原因（可留空）：',

    'task_modal.sched.title': '🧭 太子调度',
    'task_modal.sched.loading': '加载中...',
    'task_modal.sched.disabled': '已禁用',
    'task_modal.sched.running': '运行中',
    'task_modal.sched.threshold': '阈值 {n}s',
    'task_modal.sched.stalled': '停滞时长',
    'task_modal.sched.retries': '重试次数',
    'task_modal.sched.escalation': '升级级别',
    'task_modal.sched.escalation.none': '无',
    'task_modal.sched.escalation.menxia': '门下省',
    'task_modal.sched.escalation.shangshu': '尚书省',
    'task_modal.sched.dispatch_st': '派发状态',
    'task_modal.sched.last_prog': '最近进展 {time}',
    'task_modal.sched.last_disp': '最近派发 {time}',
    'task_modal.sched.auto_rollback': '自动回滚 {status}',
    'task_modal.sched.on': '开启',
    'task_modal.sched.off': '关闭',
    'task_modal.sched.target': '目标 {tgt}',
    'task_modal.sched.btn.retry': '🔁 重试派发',
    'task_modal.sched.btn.escalate': '📣 升级协调',
    'task_modal.sched.btn.rollback': '↩️ 回滚稳定点',
    'task_modal.sched.btn.scan': '🔍 立即扫描',

    'task_modal.todos.title': '子任务清单（{done}/{total}）',
    'task_modal.todos.st.done': '已完成',
    'task_modal.todos.st.prog': '进行中',
    'task_modal.todos.st.wait': '待开始',

    'task_modal.info.status': '状态',
    'task_modal.info.rounds': '共磋商 {n} 轮',
    'task_modal.info.dept': '执行部门',
    'task_modal.info.eta': '预计完成',
    'task_modal.info.block': '阻塞项',
    'task_modal.info.now': '当前进展',
    'task_modal.info.ac': '验收标准',
    'task_modal.log.title': '流转日志（{n} 条）',
    'task_modal.output': '产出物',

    'task_modal.la.title.done': '执行回顾',
    'task_modal.la.title.live': '实时动态',
    'task_modal.la.agents_count': '{n}个 Agent',
    'task_modal.la.last_active': '最后活跃: {time}',
    'task_modal.la.dur.title': '⏱ 阶段耗时',
    'task_modal.la.dur.total': '总耗时 {time}',
    'task_modal.la.dur.ongoing': ' ●进行中',
    'task_modal.la.prog.title': '📊 执行进度',
    'task_modal.la.prog.stat': '✅{done} 🔄{prog} ⬜{wait} / 共{total}项',
    'task_modal.la.res.title': '📈 资源消耗',
    'task_modal.la.res.tokens': '🔢 {n} tokens',
    'task_modal.la.res.cost': '💰 ${n}',
    'task_modal.la.res.time': '⏳ {m}分{s}秒',
    'task_modal.la.res.time_s': '⏳ {s}秒',
    'task_modal.la.empty': 'Agent 尚未上报进展（等待 Agent 调用 progress 命令）',

    'task_modal.la.group.update': '最近更新 {time}',
    'task_modal.la.entry.prog': '当前进展：',
    'task_modal.la.entry.plan': '📝 执行计划',
    'task_modal.la.entry.done': '✨刚完成',
    'task_modal.la.entry.new': '🆕新增',

    'task_modal.time.sec': '{s}秒',
    'task_modal.time.min_sec': '{m}分{s}秒',
    'task_modal.time.hr_min': '{h}小时{m}分',

    'task_modal.next.taizi': '中书省起草',
    'task_modal.next.zhongshu': '门下省审议',
    'task_modal.next.menxia': '尚书省派发',
    'task_modal.next.assigned': '开始执行',
    'task_modal.next.doing': '进入审查',
    'task_modal.next.review': '完成',

    // ── Phase labels (from phaseDurations payload) ────────────────────────────
    'phase.emperor': '皇上',
    'phase.taizi': '太子',
    'phase.zhongshu': '中书省',
    'phase.menxia': '门下省',
    'phase.shangshu': '尚书省',
    'phase.liubu': '六部',
    'phase.libu': '礼部',
    'phase.hubu': '户部',
    'phase.bingbu': '兵部',
    'phase.xingbu': '刑部',
    'phase.gongbu': '工部',
    'phase.libu_hr': '吏部',

    // ── Sessions panel ────────────────────────────────────────────────────────
    'sessions.filter.all': '全部 ({n})',
    'sessions.filter.active': '活跃',
    'sessions.empty': '暂无小任务/会话数据',

    // channel labels
    'sessions.channel.feishu_direct': '飞书对话',
    'sessions.channel.feishu': '飞书',
    'sessions.channel.webchat': 'WebChat',
    'sessions.channel.cron': '定时',
    'sessions.channel.direct': '直连',
    'sessions.channel.session': '会话',

    // human title suffixes
    'sessions.title.heartbeat': '💓 心跳检测',
    'sessions.title.main': ' · 主会话',
    'sessions.title.subagent': ' · 子任务执行',
    'sessions.title.cron': ' · 定时任务',

    // detail modal — stats
    'sessions.stat.total_tokens': '总 Tokens',
    'sessions.stat.input': '输入',
    'sessions.stat.output': '输出',

    // detail modal — activity
    'sessions.activity.title': '📋 最近活动',
    'sessions.activity.count': '({n} 条)',
    'sessions.activity.empty': '暂无活动记录',
    'sessions.activity.kind.assistant': '回复',
    'sessions.activity.kind.tool': '工具',
    'sessions.activity.kind.user': '用户',
    'sessions.activity.kind.event': '事件',

    // ── Skills Config panel ───────────────────────────────────────────────────
    'skills.error.no_load': '无法加载',
    'skills.loading': '⟳ 加载中…',

    // tabs
    'skills.tab.local': '🏛️ 本地技能',
    'skills.tab.remote': '🌐 远程技能',

    // labels
    'skills.label.skill_count': '{n} 技能',
    'skills.label.no_desc': '无描述',
    'skills.label.remote_count': '共 {n} 个远程技能',
    'skills.label.target_agent': '目标 Agent：',
    'skills.label.select_agent': '— 选择 Agent —',

    // section headers
    'skills.section.community': '🌐 社区技能源 — 一键导入',

    // status badges
    'skills.status.valid': '✓ 有效',
    'skills.status.missing': '✗ 文件丢失',
    'skills.status.imported': '✓ 已导入',

    // buttons
    'skills.button.add_local': '＋ 添加技能',
    'skills.button.add_remote': '＋ 添加远程 Skill',
    'skills.button.refresh': '⟳ 刷新列表',
    'skills.button.import': '导入',
    'skills.button.view': '查看',
    'skills.button.update': '更新',
    'skills.button.delete': '删除',
    'skills.button.create': '📦 创建技能',
    'skills.button.creating': '⟳ 创建中…',
    'skills.button.add_remote_confirm': '🌐 添加远程技能',
    'skills.button.downloading': '⟳ 下载中…',

    // empty states
    'skills.empty.local': '暂无 Skills',
    'skills.empty.remote': '尚无远程技能',
    'skills.empty.remote_hint': '从社区技能源快速导入，或手动添加 URL',

    // content modal
    'skills.content.err_read': '无法读取',

    // toast messages
    'skills.toast.added': '✅ 技能 {name} 已添加到 {agent}',
    'skills.toast.add_fail': '添加失败',
    'skills.toast.remote_added': '✅ 远程技能 {name} 已添加到 {agent}',
    'skills.toast.updated': '✅ 技能 {name} 已更新',
    'skills.toast.update_fail': '更新失败',
    'skills.toast.removed': '🗑️ 技能 {name} 已移除',
    'skills.toast.remove_fail': '移除失败',
    'skills.toast.no_agent': '请先选择目标 Agent',
    'skills.toast.import_fail': '导入失败',
    'skills.toast.remote_load_fail': '远程技能列表加载失败',

    // local skill modal
    'skills.modal.add_title': '为 {agent} 添加技能',
    'skills.modal.add_heading': '＋ 新增 Skill',
    'skills.modal.spec_title': '📋 Skill 规范说明',
    'skills.modal.spec_line1': '技能名称使用{fmt}',
    'skills.modal.spec_fmt': '小写英文 + 连字符',
    'skills.modal.spec_line2': '创建后会生成模板文件 SKILL.md',
    'skills.modal.spec_line3': '技能会在 agent 收到相关任务时{auto}',
    'skills.modal.spec_auto': '自动激活',

    // remote skill modal
    'skills.modal.remote_mgmt': '远程技能管理',
    'skills.modal.remote_heading': '🌐 添加远程 Skill',
    'skills.modal.remote_hint': '支持 GitHub Raw URL，如：',

    // form fields
    'skills.field.name': '技能名称',
    'skills.field.name_placeholder': '如 data-analysis, code-review',
    'skills.field.name_placeholder_remote': '如 brainstorming, code-review',
    'skills.field.desc': '技能描述',
    'skills.field.desc_placeholder': '一句话说明用途',
    'skills.field.desc_optional': '描述（可选）',
    'skills.field.trigger': '触发条件（可选）',
    'skills.field.trigger_placeholder': '何时激活此技能',
    'skills.field.target_agent': '目标 Agent',
    'skills.field.source_url': '源 URL',

    // ── Morning Brief panel ───────────────────────────────────────────────────
    'morning.title': '🌅 天下要闻',
    'morning.date_format': '$1年$2月$3日',

    // labels
    'morning.label.collected_at': '采集于 {time}',
    'morning.label.total_news': '共 {n} 条要闻',
    'morning.label.item_count': '{n} 条',
    'morning.label.watched': '⭐ 关注',

    // section headers
    'morning.section.categories': '订阅分类',
    'morning.section.keywords': '关注关键词',
    'morning.section.custom_feeds': '自定义信息源',
    'morning.section.webhook': '飞书 Webhook',

    // buttons
    'morning.button.config': '⚙ 订阅配置',
    'morning.button.refresh': '⟳ 立即采集',
    'morning.button.collecting': '⟳ 采集中…',
    'morning.button.collecting_s': '⟳ 采集中… ({s}s)',
    'morning.button.add': '添加',
    'morning.button.save_config': '💾 保存配置',

    // empty states
    'morning.empty.hint': '暂无数据，点击右上角「立即采集」获取今日简报',
    'morning.empty.no_news': '暂无新闻',

    // form fields
    'morning.field.keyword_placeholder': '输入关键词',
    'morning.field.feed_name_placeholder': '源名称',

    // toast messages
    'morning.toast.triggered': '采集已触发，自动检测更新中…',
    'morning.toast.timeout': '采集超时，请重试',
    'morning.toast.updated': '✅ 天下要闻已更新',
    'morning.toast.trigger_fail': '触发失败',
    'morning.toast.feed_required': '请填写源名称和URL',
    'morning.toast.config_saved': '订阅配置已保存',
    'morning.toast.save_fail': '保存失败',
} as const;

export default zh;
export type TranslationKey = keyof typeof zh;
