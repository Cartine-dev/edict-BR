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
};

export default en;
