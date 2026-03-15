/**
 * en.ts — English locale — feat/i18n-ui
 *
 * Must mirror every key in zh.ts. TypeScript will enforce this via
 * `Record<TranslationKey, string>` in index.ts.
 */
import type { TranslationKey } from './zh';

const en: Record<TranslationKey, string> = {
    // ── App header ───────────────────────────────────────────────────────────
    'app.title': 'Three Departments · Control Center',
    'app.subtitle': 'OpenClaw Sansheng-Liubu Dashboard',
    'app.sync.ok': '✅ Sync OK',
    'app.sync.err': '❌ Server offline',
    'app.sync.pending': '⏳ Connecting…',
    'app.edicts_count': '{n} Edicts',
    'app.lang_toggle': '中文',            // shown when current lang=en

    // ── Common actions ───────────────────────────────────────────────────────
    'common.refresh': '⟳ Refresh',
    'common.loading': 'Loading…',
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.ok': 'OK',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.server_error': 'Server connection failed',
    'common.op_success': 'Operation successful',
    'common.op_failed': 'Operation failed',

    // ── Tabs ─────────────────────────────────────────────────────────────────
    'tabs.edicts': 'Edict Board',
    'tabs.monitor': 'Department Monitor',
    'tabs.officials': 'Officials Overview',
    'tabs.models': 'Model Config',
    'tabs.skills': 'Skills Config',
    'tabs.sessions': 'Sessions',
    'tabs.memorials': 'Memorial Hall',
    'tabs.templates': 'Templates',
    'tabs.morning': 'Morning Brief',

    // ── Monitor tab badge ────────────────────────────────────────────────────
    'tabs.monitor.badge': '{n} active',

    // ── Task states (UI labels) ───────────────────────────────────────────────
    'state.Inbox': 'Inbox',
    'state.Pending': 'Pending',
    'state.Taizi': 'Crown Prince Sorting',
    'state.Zhongshu': 'Secretariat Drafting',
    'state.Menxia': 'Chancellery Review',
    'state.Assigned': 'Assigned',
    'state.Doing': 'In Progress',
    'state.Review': 'Under Review',
    'state.Done': 'Done',
    'state.Blocked': 'Blocked',
    'state.Cancelled': 'Cancelled',
    'state.Next': 'Next Up',
    'state.Menxia.round': 'Chancellery Review (Round {r})',
    'state.Zhongshu.round': 'Secretariat Revision (Round {r})',

    // ── Relative time ─────────────────────────────────────────────────────────
    'time.just_now': 'just now',
    'time.minutes_ago': '{n}m ago',
    'time.hours_ago': '{n}h ago',
    'time.days_ago': '{n}d ago',

    // ── EdictBoard ────────────────────────────────────────────────────────────
    'edict.filter.label': 'Filter:',
    'edict.filter.active': 'Active',
    'edict.filter.archived': 'Archived',
    'edict.filter.all': 'All',
    'edict.archive_all': '📦 Archive All',
    'edict.archive_all.confirm': 'Move all Done/Cancelled edicts to archive?',
    'edict.archive_all.done': '📦 {n} edicts archived',
    'edict.archive_all.err': 'Bulk archive failed',
    'edict.scan': '🧭 Scheduler Scan',
    'edict.scan.done': '🧭 Scan complete: {n} actions',
    'edict.scan.err': 'Scan failed',
    'edict.empty': 'No edicts',
    'edict.empty.hint': 'Send a task to the Crown Prince via Feishu to get started',
    'edict.count': 'Active {active} · Archived {archived} · Total {total}',
    'edict.current': 'Current:',
    'edict.no_title': '(no title)',
    'edict.round': 'Round {r} deliberation',
    'edict.todos.done': '✅ All done',
    'edict.todos.progress': '🔄 In progress',
    'edict.stop': '⏸ Pause',
    'edict.stop.prompt': 'Enter reason for pausing:',
    'edict.stop.done': 'Paused',
    'edict.cancel': '🚫 Cancel',
    'edict.cancel.prompt': 'Enter reason for cancellation:',
    'edict.resume': '▶ Resume',
    'edict.resume.done': 'Resumed',
    'edict.archive': '📦 Archive',
    'edict.unarchive': '📤 Unarchive',

    // ── Monitor panel ─────────────────────────────────────────────────────────
    'monitor.agent_status.title': '🔌 Agent Online Status',
    'monitor.agent_status.gateway_unknown': 'Unknown',
    'monitor.agent_status.checked_at': 'Checked at {time}',
    'monitor.agent.no_activity': 'No activity recorded',
    'monitor.agent.wake': '⚡ Wake',
    'monitor.agent.wake_all': '⚡ Wake All',
    'monitor.agent.wake_sent': 'Wake command sent',
    'monitor.agent.wake_failed': 'Wake failed',
    'monitor.agent.all_online': 'All agents are online',
    'monitor.agent.waking_n': 'Waking {n} agents…',
    'monitor.agent.woke_n': '{n} wake commands sent, refreshing in 30s',
    'monitor.agent.count.running': '{n} running',
    'monitor.agent.count.idle': '{n} idle',
    'monitor.agent.count.offline': '{n} offline',
    'monitor.agent.count.unconfigured': '{n} unconfigured',
    'monitor.dept.status.blocked': '⚠️ Blocked',
    'monitor.dept.status.doing': '⚙️ In progress',
    'monitor.dept.status.active': '🟢 Active',
    'monitor.dept.status.idle': '⚪ On standby',
    'monitor.dept.idle_placeholder': 'On standby',
    'monitor.dept.model_unconfigured': 'Not configured',

    // ── Officials panel ───────────────────────────────────────────────────────
    'officials.error.no_server': '⚠️ Please ensure the local server is running',
    'officials.activity.current_active': '🟢 Currently active:',
    'officials.activity.others_standby': 'Others on standby',
    'officials.kpi.active_officials': 'Active Officials',
    'officials.kpi.total_done': 'Total Edicts Done',
    'officials.kpi.total_cost': 'Total Cost (incl. cache)',
    'officials.kpi.top_merit': 'Top Merit',
    'officials.ranklist.title': 'Merit Ranking',
    'officials.merit_score': '{n} pts',
    'officials.detail.select_hint': 'Select an official on the left to view details',
    'officials.detail.hb_idle': '⚪ Standby',
    'officials.token.in': 'Input',
    'officials.token.out': 'Output',
    'officials.token.cache_read': 'Cache Read',
    'officials.token.cache_write': 'Cache Write',
    'officials.detail.rank_score': '🏅 {rank} · Merit {score}',
    'officials.detail.last_active': 'Active {time}',
    'officials.detail.sessions_msgs': '{sessions} sessions · {messages} messages',
    'officials.detail.merit_stats': 'Merit Stats',
    'officials.detail.tasks_done': 'Edicts Done',
    'officials.detail.flow_participations': 'Flow Participations',
    'officials.detail.token_usage': 'Token Usage',
    'officials.detail.total_cost': 'Total Cost',
    'officials.detail.cny': 'CNY',
    'officials.detail.usd': 'USD',
    'officials.detail.total_tokens': 'Total {n} tokens',
    'officials.detail.edicts_title': 'Participated Edicts ({n})',
    'officials.detail.edicts_empty': 'No edict records yet',

    // ── Officials — display names by id (presentation layer only) ─────────────
    'officials.role.taizi': 'Crown Prince',
    'officials.role.zhongshu': 'Grand Chancellor',
    'officials.role.menxia': 'Chief Attendant',
    'officials.role.shangshu': 'Minister of State',
    'officials.role.hubu': 'Minister of Revenue',
    'officials.role.libu': 'Minister of Rites',
    'officials.role.bingbu': 'Minister of War',
    'officials.role.xingbu': 'Minister of Justice',
    'officials.role.gongbu': 'Minister of Works',
    'officials.role.libu_hr': 'Minister of Personnel',
    'officials.role.zaochao': 'Morning Reporter',
    'officials.label.taizi': 'Crown Prince',
    'officials.label.zhongshu': 'Secretariat',
    'officials.label.menxia': 'Chancellery',
    'officials.label.shangshu': 'Dept. of State Affairs',
    'officials.label.hubu': 'Revenue',
    'officials.label.libu': 'Rites',
    'officials.label.bingbu': 'War',
    'officials.label.xingbu': 'Justice',
    'officials.label.gongbu': 'Works',
    'officials.label.libu_hr': 'Personnel',
    'officials.label.zaochao': 'Imperial Observatory',

    // ── Heartbeat status labels ───────────────────────────────────────────────
    'hb.active': '🟢 Active',
    'hb.idle': '⚪ Standby',
    'hb.warn': '🟡 Possibly stalled',
    'hb.offline': '🔴 Offline',
    'hb.unknown': '❓ Unknown',

    // ── Task Modal ────────────────────────────────────────────────────────────
    'task_modal.no_title': '(no title)',
    'task_modal.cur_stage': 'Current Stage: {action}',
    'task_modal.btn.stop': '⏸ Pause Task',
    'task_modal.btn.cancel': '🚫 Cancel Task',
    'task_modal.btn.resume': '▶️ Resume',
    'task_modal.btn.approve': '✅ Approve',
    'task_modal.btn.reject': '🚫 Reject',
    'task_modal.btn.advance': '⏩ Advance to Next',

    'task_modal.review.prompt': '{label} {id}\n\nEnter comment (optional):',
    'task_modal.review.approve': 'Approve',
    'task_modal.review.reject': 'Reject',
    'task_modal.review.success': '✅ {id} {label}ed',

    'task_modal.advance.prompt': '⏩ Manually advance {id}\nCurrent: {curr} → Next: {next}\n\nEnter comment (optional):',
    'task_modal.advance.next_default': 'Next',

    'task_modal.sched.scan.done': '🔍 Scan complete: {n} actions',
    'task_modal.sched.scan.fail': 'Scan failed',

    'task_modal.sched.action.retry': 'Retry',
    'task_modal.sched.action.escalate': 'Escalate',
    'task_modal.sched.action.rollback': 'Rollback',
    'task_modal.sched.prompt': 'Enter {label} reason (optional):',

    'task_modal.stop.prompt': 'Enter pause reason (optional):',
    'task_modal.cancel.confirm': 'Are you sure you want to cancel {id}?',
    'task_modal.cancel.prompt': 'Enter cancel reason (optional):',

    'task_modal.sched.title': '🧭 Crown Prince Scheduler',
    'task_modal.sched.loading': 'Loading...',
    'task_modal.sched.disabled': 'Disabled',
    'task_modal.sched.running': 'Running',
    'task_modal.sched.threshold': 'Threshold {n}s',
    'task_modal.sched.stalled': 'Stalled For',
    'task_modal.sched.retries': 'Retries',
    'task_modal.sched.escalation': 'Escalation',
    'task_modal.sched.escalation.none': 'None',
    'task_modal.sched.escalation.menxia': 'Chancellery',
    'task_modal.sched.escalation.shangshu': 'Dept. of State',
    'task_modal.sched.dispatch_st': 'Dispatch Status',
    'task_modal.sched.last_prog': 'Last progress {time}',
    'task_modal.sched.last_disp': 'Last dispatch {time}',
    'task_modal.sched.auto_rollback': 'Auto rollback: {status}',
    'task_modal.sched.on': 'On',
    'task_modal.sched.off': 'Off',
    'task_modal.sched.target': 'Target {tgt}',
    'task_modal.sched.btn.retry': '🔁 Retry Dispatch',
    'task_modal.sched.btn.escalate': '📣 Escalate',
    'task_modal.sched.btn.rollback': '↩️ Rollback',
    'task_modal.sched.btn.scan': '🔍 Scan Now',

    'task_modal.todos.title': 'Sub-tasks ({done}/{total})',
    'task_modal.todos.st.done': 'Done',
    'task_modal.todos.st.prog': 'In Progress',
    'task_modal.todos.st.wait': 'Pending',

    'task_modal.info.status': 'Status',
    'task_modal.info.rounds': '{n} rounds',
    'task_modal.info.dept': 'Department',
    'task_modal.info.eta': 'ETA',
    'task_modal.info.block': 'Blocker',
    'task_modal.info.now': 'Current Progress',
    'task_modal.info.ac': 'Acceptance Criteria',
    'task_modal.log.title': 'Flow Log ({n} entries)',
    'task_modal.output': 'Output',

    'task_modal.la.title.done': 'Execution Review',
    'task_modal.la.title.live': 'Live Activity',
    'task_modal.la.agents_count': '{n} Agents',
    'task_modal.la.last_active': 'Last active: {time}',
    'task_modal.la.dur.title': '⏱ Phase Durations',
    'task_modal.la.dur.total': 'Total {time}',
    'task_modal.la.dur.ongoing': ' ●Ongoing',
    'task_modal.la.prog.title': '📊 Execution Progress',
    'task_modal.la.prog.stat': '✅{done} 🔄{prog} ⬜{wait} / Total {total}',
    'task_modal.la.res.title': '📈 Resource Usage',
    'task_modal.la.res.tokens': '🔢 {n} tokens',
    'task_modal.la.res.cost': '💰 ${n}',
    'task_modal.la.res.time': '⏳ {m}m {s}s',
    'task_modal.la.res.time_s': '⏳ {s}s',
    'task_modal.la.empty': 'No agent activity reported yet.',

    'task_modal.la.group.update': 'Last updated {time}',
    'task_modal.la.entry.prog': 'Progress: ',
    'task_modal.la.entry.plan': '📝 Execution Plan',
    'task_modal.la.entry.done': '✨Done',
    'task_modal.la.entry.new': '🆕New',

    'task_modal.time.sec': '{s}s',
    'task_modal.time.min_sec': '{m}m {s}s',
    'task_modal.time.hr_min': '{h}h {m}m',

    'task_modal.next.taizi': 'Secretariat Drafting',
    'task_modal.next.zhongshu': 'Chancellery Review',
    'task_modal.next.menxia': 'State Dept. Dispatch',
    'task_modal.next.assigned': 'Start Execution',
    'task_modal.next.doing': 'Enter Review',
    'task_modal.next.review': 'Complete',

    // ── Phase labels (from phaseDurations payload) ────────────────────────────
    'phase.emperor': 'Emperor',
    'phase.taizi': 'Crown Prince',
    'phase.zhongshu': 'Secretariat',
    'phase.menxia': 'Chancellery',
    'phase.shangshu': 'State Affairs',
    'phase.liubu': 'Six Ministries',
    'phase.libu': 'Rites',
    'phase.hubu': 'Revenue',
    'phase.bingbu': 'War',
    'phase.xingbu': 'Justice',
    'phase.gongbu': 'Works',
    'phase.libu_hr': 'Personnel',

    // ── Sessions panel ────────────────────────────────────────────────────────
    'sessions.filter.all': 'All ({n})',
    'sessions.filter.active': 'Active',
    'sessions.empty': 'No sessions / sub-tasks found',

    // channel labels
    'sessions.channel.feishu_direct': 'Feishu DM',
    'sessions.channel.feishu': 'Feishu',
    'sessions.channel.webchat': 'WebChat',
    'sessions.channel.cron': 'Scheduled',
    'sessions.channel.direct': 'Direct',
    'sessions.channel.session': 'Session',

    // human title suffixes
    'sessions.title.heartbeat': '💓 Heartbeat Check',
    'sessions.title.main': ' · Main Session',
    'sessions.title.subagent': ' · Sub-agent Exec',
    'sessions.title.cron': ' · Scheduled Task',

    // detail modal — stats
    'sessions.stat.total_tokens': 'Total Tokens',
    'sessions.stat.input': 'Input',
    'sessions.stat.output': 'Output',

    // detail modal — activity
    'sessions.activity.title': '📋 Recent Activity',
    'sessions.activity.count': '({n} entries)',
    'sessions.activity.empty': 'No activity recorded',
    'sessions.activity.kind.assistant': 'Reply',
    'sessions.activity.kind.tool': 'Tool',
    'sessions.activity.kind.user': 'User',
    'sessions.activity.kind.event': 'Event',

    // ── Skills Config panel ───────────────────────────────────────────────────
    'skills.error.no_load': 'Unable to load',
    'skills.loading': '⟳ Loading…',

    // tabs
    'skills.tab.local': '🏛️ Local Skills',
    'skills.tab.remote': '🌐 Remote Skills',

    // labels
    'skills.label.skill_count': '{n} skills',
    'skills.label.no_desc': 'No description',
    'skills.label.remote_count': '{n} remote skills total',
    'skills.label.target_agent': 'Target Agent:',
    'skills.label.select_agent': '— Select Agent —',

    // section headers
    'skills.section.community': '🌐 Community Sources — One-click Import',

    // status badges
    'skills.status.valid': '✓ Valid',
    'skills.status.missing': '✗ File missing',
    'skills.status.imported': '✓ Imported',

    // buttons
    'skills.button.add_local': '＋ Add Skill',
    'skills.button.add_remote': '＋ Add Remote Skill',
    'skills.button.refresh': '⟳ Refresh List',
    'skills.button.import': 'Import',
    'skills.button.view': 'View',
    'skills.button.update': 'Update',
    'skills.button.delete': 'Delete',
    'skills.button.create': '📦 Create Skill',
    'skills.button.creating': '⟳ Creating…',
    'skills.button.add_remote_confirm': '🌐 Add Remote Skill',
    'skills.button.downloading': '⟳ Downloading…',

    // empty states
    'skills.empty.local': 'No skills yet',
    'skills.empty.remote': 'No remote skills yet',
    'skills.empty.remote_hint': 'Import from community sources or add a URL manually',

    // content modal
    'skills.content.err_read': 'Unable to read',

    // toast messages
    'skills.toast.added': '✅ Skill {name} added to {agent}',
    'skills.toast.add_fail': 'Add failed',
    'skills.toast.remote_added': '✅ Remote skill {name} added to {agent}',
    'skills.toast.updated': '✅ Skill {name} updated',
    'skills.toast.update_fail': 'Update failed',
    'skills.toast.removed': '🗑️ Skill {name} removed',
    'skills.toast.remove_fail': 'Remove failed',
    'skills.toast.no_agent': 'Please select a target Agent first',
    'skills.toast.import_fail': 'Import failed',
    'skills.toast.remote_load_fail': 'Failed to load remote skills list',

    // local skill modal
    'skills.modal.add_title': 'Add Skill to {agent}',
    'skills.modal.add_heading': '＋ New Skill',
    'skills.modal.spec_title': '📋 Skill Spec',
    'skills.modal.spec_line1': 'Skill name must use {fmt}',
    'skills.modal.spec_fmt': 'lowercase letters + hyphens',
    'skills.modal.spec_line2': 'A SKILL.md template file will be created',
    'skills.modal.spec_line3': 'Skill will be {auto} when the agent receives a relevant task',
    'skills.modal.spec_auto': 'auto-activated',

    // remote skill modal
    'skills.modal.remote_mgmt': 'Remote Skill Manager',
    'skills.modal.remote_heading': '🌐 Add Remote Skill',
    'skills.modal.remote_hint': 'Supports GitHub Raw URL, e.g.:',

    // form fields
    'skills.field.name': 'Skill Name',
    'skills.field.name_placeholder': 'e.g. data-analysis, code-review',
    'skills.field.name_placeholder_remote': 'e.g. brainstorming, code-review',
    'skills.field.desc': 'Description',
    'skills.field.desc_placeholder': 'One-line description of purpose',
    'skills.field.desc_optional': 'Description (optional)',
    'skills.field.trigger': 'Trigger Condition (optional)',
    'skills.field.trigger_placeholder': 'When should this skill activate?',
    'skills.field.target_agent': 'Target Agent',
    'skills.field.source_url': 'Source URL',

    // ── Morning Brief panel ───────────────────────────────────────────────────
    'morning.title': '🌅 Morning Brief',
    'morning.date_format': '$1-$2-$3',

    // category display names (presentation layer — keys match CAT_META / payload keys)
    'morning.cat.政治': 'Politics',
    'morning.cat.军事': 'Military',
    'morning.cat.经济': 'Economy',
    'morning.cat.AI大模型': 'AI & LLMs',

    // labels
    'morning.label.collected_at': 'Collected at {time}',
    'morning.label.total_news': '{n} items',
    'morning.label.item_count': '{n} items',
    'morning.label.watched': '⭐ Watching',

    // section headers
    'morning.section.categories': 'Categories',
    'morning.section.keywords': 'Watched Keywords',
    'morning.section.custom_feeds': 'Custom Feeds',
    'morning.section.webhook': 'Feishu Webhook',

    // buttons
    'morning.button.config': '⚙ Subscription Config',
    'morning.button.refresh': '⟳ Collect Now',
    'morning.button.collecting': '⟳ Collecting…',
    'morning.button.collecting_s': '⟳ Collecting… ({s}s)',
    'morning.button.add': 'Add',
    'morning.button.save_config': '💾 Save Config',

    // empty states
    'morning.empty.hint': 'No data yet — click “Collect Now” to fetch today’s brief',
    'morning.empty.no_news': 'No news',

    // form fields
    'morning.field.keyword_placeholder': 'Enter keyword',
    'morning.field.feed_name_placeholder': 'Feed name',

    // toast messages
    'morning.toast.triggered': 'Collection triggered, polling for updates…',
    'morning.toast.timeout': 'Collection timed out, please retry',
    'morning.toast.updated': '✅ Morning Brief updated',
    'morning.toast.trigger_fail': 'Trigger failed',
    'morning.toast.feed_required': 'Please fill in feed name and URL',
    'morning.toast.config_saved': 'Subscription config saved',
    'morning.toast.save_fail': 'Save failed',

    // ── Memorial panel ────────────────────────────────────────────────────────
    'memorial.filter.label': 'Filter:',
    'memorial.filter.all': 'All',
    'memorial.filter.done': '✅ Done',
    'memorial.filter.cancelled': '🚫 Cancelled',

    'memorial.empty': 'No memorials yet — generated automatically when tasks complete',

    'memorial.card.flow_steps': '{n} steps',

    'memorial.phase.origin': 'Imperial Decree',
    'memorial.phase.plan': 'Secretariat Plan',
    'memorial.phase.review': 'Chancellery Review',
    'memorial.phase.exec': 'Ministry Execution',
    'memorial.phase.result': 'Final Report',

    'memorial.label.output': '📦 Output',
    'memorial.button.copy': '📋 Copy Memorial',

    // export markdown labels (UI chrome — not backend content)
    'memorial.export.header': '📜 Memorial · {title}',
    'memorial.export.id': 'Task ID',
    'memorial.export.state': 'Status',
    'memorial.export.org': 'Department',
    'memorial.export.start': 'Started',
    'memorial.export.end': 'Completed',
    'memorial.export.flow_section': 'Flow Log',
    'memorial.export.output_section': 'Output',
    'memorial.export.unknown_time': 'unknown',

    'memorial.toast.copy_ok': '✅ Memorial copied as Markdown',
    'memorial.toast.copy_err': 'Copy failed',

    // Departments
    'memorial.department.emperor': 'Emperor',
    'memorial.department.taizi': 'Crown Prince',
    'memorial.department.zhongshu': 'Secretariat',
    'memorial.department.menxia': 'Chancellery',
    'memorial.department.shangshu': 'Dept. of State',
    'memorial.department.hubu': 'Revenue',
    'memorial.department.gongbu': 'Works',
    'memorial.department.bingbu': 'War',
    'memorial.department.libu': 'Rites',
    'memorial.department.xingbu': 'Justice',
    'memorial.department.libu_hr': 'Personnel',

    // Status & Flow Labels
    'memorial.status.ready': 'Three Departments & Six Ministries system ready',
    'memorial.status.init_done': '✅ 🎉 System initialization complete',
    'memorial.status.dispatch_init': 'Dispatch: System initialization',
    'memorial.status.approved': 'Approved',
    'memorial.status.rejected': 'Vetoed',
    'memorial.status.done': '✅ Complete',
    'memorial.status.back': 'Reported Back',
    'memorial.status.draft': 'Drafting',
    'memorial.status.review': 'Reviewing',
    'memorial.status.exec': 'Implementing',
};

export default en;
