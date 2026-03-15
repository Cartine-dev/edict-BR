import { useState } from 'react';
import { useStore, isEdict, stateLabel } from '../store';
import type { Task, FlowEntry } from '../api';
import { useT } from '../i18n/hooks';

// Helper maps to translate data-driven strings to i18n keys
const DEPT_MAP: Record<string, string> = {
  '皇上': 'memorial.department.emperor',
  '太子': 'memorial.department.taizi',
  '中书省': 'memorial.department.zhongshu',
  '门下省': 'memorial.department.menxia',
  '尚书省': 'memorial.department.shangshu',
  '户部': 'memorial.department.hubu',
  '工部': 'memorial.department.gongbu',
  '兵部': 'memorial.department.bingbu',
  '礼部': 'memorial.department.libu',
  '刑部': 'memorial.department.xingbu',
  '吏部': 'memorial.department.libu_hr',
};

const STATUS_MAP: Record<string, string> = {
  '系统初始化完成': 'memorial.status.init_done',
  '三省六部系统已就绪': 'memorial.status.ready',
  '派发：系统初始化': 'memorial.status.dispatch_init',
  '准奏': 'memorial.status.approved',
  '封驳': 'memorial.status.rejected',
  '完成': 'memorial.status.done',
  '✅ 完成': 'memorial.status.done',
  '回奏': 'memorial.status.back',
  '起草': 'memorial.status.draft',
  '审议': 'memorial.status.review',
  '落实': 'memorial.status.exec',
};

export default function MemorialPanel() {
  const liveStatus = useStore((s) => s.liveStatus);
  const [filter, setFilter] = useState('all');
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const toast = useStore((s) => s.toast);
  const T = useT();

  const tDept = (d: string) => DEPT_MAP[d] ? T(DEPT_MAP[d] as any) : d;
  const tStatus = (s: string) => {
    if (!s) return s;
    // Check for exact matches or parts in descending order of length to avoid partial matches
    const sortedKeys = Object.keys(STATUS_MAP).sort((a, b) => b.length - a.length);
    let result = s;
    for (const key of sortedKeys) {
      if (result.includes(key)) {
        result = result.replace(key, T(STATUS_MAP[key] as any));
      }
    }
    return result;
  };

  const tasks = liveStatus?.tasks || [];
  let mems = tasks.filter((t) => isEdict(t) && ['Done', 'Cancelled'].includes(t.state));
  if (filter !== 'all') mems = mems.filter((t) => t.state === filter);

  const exportMemorial = (t: Task) => {
    const fl = t.flow_log || [];
    const unknownTime = T('memorial.export.unknown_time');
    let md = `# ${T('memorial.export.header', { title: t.title })}\n\n`;
    md += `- **${T('memorial.export.id')}**: ${t.id}\n`;
    md += `- **${T('memorial.export.state')}**: ${t.state}\n`;
    md += `- **${T('memorial.export.org')}**: ${tDept(t.org || '')}\n`;
    if (fl.length) {
      const startAt = fl[0].at ? fl[0].at.substring(0, 19).replace('T', ' ') : unknownTime;
      const endAt = fl[fl.length - 1].at ? fl[fl.length - 1].at.substring(0, 19).replace('T', ' ') : unknownTime;
      md += `- **${T('memorial.export.start')}**: ${startAt}\n`;
      md += `- **${T('memorial.export.end')}**: ${endAt}\n`;
    }
    md += `\n## ${T('memorial.export.flow_section')}\n\n`;
    for (const f of fl) {
      md += `- **${tDept(f.from || '')}** → **${tDept(f.to || '')}**  \n  ${tStatus(f.remark || '')}  \n  _${(f.at || '').substring(0, 19)}_\n\n`;
    }
    if (t.output && t.output !== '-') md += `## ${T('memorial.export.output_section')}\n\n\`${t.output}\`\n`;
    navigator.clipboard.writeText(md).then(
      () => toast(T('memorial.toast.copy_ok'), 'ok'),
      () => toast(T('memorial.toast.copy_err'), 'err')
    );
  };

  return (
    <div>
      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{T('memorial.filter.label')}</span>
        {[
          { key: 'all', label: T('memorial.filter.all') },
          { key: 'Done', label: T('memorial.filter.done') },
          { key: 'Cancelled', label: T('memorial.filter.cancelled') },
        ].map((f) => (
          <span
            key={f.key}
            className={`sess-filter${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </span>
        ))}
      </div>

      {/* List */}
      <div className="mem-list">
        {!mems.length ? (
          <div className="mem-empty">{T('memorial.empty')}</div>
        ) : (
          mems.map((t) => {
            const fl = t.flow_log || [];
            const depts = [...new Set(fl.map((f) => f.from).concat(fl.map((f) => f.to)).filter((x) => x && x !== '皇上'))];
            const firstAt = fl.length ? (fl[0].at || '').substring(0, 16).replace('T', ' ') : '';
            const lastAt = fl.length ? (fl[fl.length - 1].at || '').substring(0, 16).replace('T', ' ') : '';
            const stIcon = t.state === 'Done' ? '✅' : '🚫';
            return (
              <div className="mem-card" key={t.id} onClick={() => setDetailTask(t)}>
                <div className="mem-icon">📜</div>
                <div className="mem-info">
                  <div className="mem-title">
                    {stIcon} {t.title || t.id}
                  </div>
                  <div className="mem-sub">
                    {t.id} · {tDept(t.org || '')} · {T('memorial.card.flow_steps', { n: fl.length })}
                  </div>
                  <div className="mem-tags">
                    {depts.slice(0, 5).map((d) => (
                      <span className="mem-tag" key={d}>{tDept(d || '')}</span>
                    ))}
                  </div>
                </div>
                <div className="mem-right">
                  <span className="mem-date">{firstAt}</span>
                  {lastAt !== firstAt && <span className="mem-date">{lastAt}</span>}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {detailTask && (
        <MemorialDetailModal task={detailTask} onClose={() => setDetailTask(null)} onExport={exportMemorial} />
      )}
    </div>
  );
}

function MemorialDetailModal({
  task: t,
  onClose,
  onExport,
}: {
  task: Task;
  onClose: () => void;
  onExport: (t: Task) => void;
}) {
  const T = useT();
  const fl = t.flow_log || [];
  const st = t.state || 'Unknown';
  const stIcon = st === 'Done' ? '✅' : st === 'Cancelled' ? '🚫' : '🔄';
  const depts = [...new Set(fl.map((f) => f.from).concat(fl.map((f) => f.to)).filter((x) => x && x !== '皇上'))];

  const tDept = (d: string) => DEPT_MAP[d] ? T(DEPT_MAP[d] as any) : d;
  const tStatus = (s: string) => {
    if (!s) return s;
    for (const [key, val] of Object.entries(STATUS_MAP)) {
      if (s.includes(key)) return s.replace(key, T(val as any));
    }
    return s;
  };

  // Reconstruct phases (logic remains in Original Chinese for matching backend data)
  const originLog: FlowEntry[] = [];
  const planLog: FlowEntry[] = [];
  const reviewLog: FlowEntry[] = [];
  const execLog: FlowEntry[] = [];
  const resultLog: FlowEntry[] = [];
  for (const f of fl) {
    if (f.from === '皇上') originLog.push(f);
    else if (f.to === '中书省' || f.from === '中书省') planLog.push(f);
    else if (f.to === '门下省' || f.from === '门下省') reviewLog.push(f);
    else if (f.remark && (f.remark.includes('完成') || f.remark.includes('回奏'))) resultLog.push(f);
    else execLog.push(f);
  }

  const renderPhase = (title: string, icon: string, items: FlowEntry[]) => {
    if (!items.length) return null;
    return (
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
          {icon} {title}
        </div>
        <div className="md-timeline">
          {items.map((f, i) => {
            const dotCls = f.remark?.includes('✅') ? 'green' : f.remark?.includes('驳') ? 'red' : '';
            return (
              <div className="md-tl-item" key={i}>
                <div className={`md-tl-dot ${dotCls}`} />
                <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
                  <span className="md-tl-from">{tDept(f.from || '')}</span>
                  <span className="md-tl-to">→ {tDept(f.to || '')}</span>
                </div>
                <div className="md-tl-remark">{tStatus(f.remark || '')}</div>
                <div className="md-tl-time">{(f.at || '').substring(0, 19).replace('T', ' ')}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="modal-bg open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <div style={{ fontSize: 11, color: 'var(--acc)', fontWeight: 700, letterSpacing: '.04em', marginBottom: 4 }}>{t.id}</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{stIcon} {t.title || t.id}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            <span className={`tag st-${st}`}>{stateLabel({ state: st } as Task, T)}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{tDept(t.org || '')}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{T('memorial.card.flow_steps', { n: fl.length })}</span>
            {depts.map((d) => (
              <span className="mem-tag" key={d}>{tDept(d || '')}</span>
            ))}
          </div>

          {t.now && (
            <div style={{ background: 'var(--panel2)', border: '1px solid var(--line)', borderRadius: 8, padding: '10px 14px', marginBottom: 18, fontSize: 12, color: 'var(--muted)' }}>
              {tStatus(t.now)}
            </div>
          )}

          {renderPhase(T('memorial.phase.origin'), '👑', originLog)}
          {renderPhase(T('memorial.phase.plan'), '📋', planLog)}
          {renderPhase(T('memorial.phase.review'), '🔍', reviewLog)}
          {renderPhase(T('memorial.phase.exec'), '⚔️', execLog)}
          {renderPhase(T('memorial.phase.result'), '📨', resultLog)}

          {t.output && t.output !== '-' && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{T('memorial.label.output')}</div>
              <code style={{ fontSize: 11, wordBreak: 'break-all' }}>{t.output}</code>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
            <button className="btn btn-g" onClick={() => onExport(t)} style={{ fontSize: 12, padding: '6px 16px' }}>
              {T('memorial.button.copy')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
