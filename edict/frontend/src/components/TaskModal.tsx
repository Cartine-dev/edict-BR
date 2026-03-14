import { useEffect, useState, useRef, useCallback } from 'react';
import { useStore, getPipeStatus, deptColor, stateLabel } from '../store';
import { useT } from '../i18n/hooks';
import { api } from '../api';
import type {
  Task,
  TaskActivityData,
  SchedulerStateData,
  ActivityEntry,
  TodoItem,
  PhaseDuration,
} from '../api';

function getAgentLabel(agent: string, T: any): string {
  if (agent === 'main') return T('officials.label.taizi') || agent;
  const labelKey = `officials.label.${agent}` as any;
  const label = T(labelKey);
  return label && label !== labelKey ? label : agent;
}

function fmtStalled(sec: number, T: any): string {
  const v = Math.max(0, sec);
  if (v < 60) return T('task_modal.time.sec', { s: v });
  if (v < 3600) return T('task_modal.time.min_sec', { m: Math.floor(v / 60), s: v % 60 });
  const h = Math.floor(v / 3600);
  const m = Math.floor((v % 3600) / 60);
  return T('task_modal.time.hr_min', { h, m });
}

function fmtActivityTime(ts: number | string | undefined): string {
  if (!ts) return '';
  if (typeof ts === 'number') {
    const d = new Date(ts);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  }
  if (typeof ts === 'string' && ts.length >= 19) return ts.substring(11, 19);
  return String(ts).substring(0, 8);
}

export default function TaskModal() {
  const modalTaskId = useStore((s) => s.modalTaskId);
  const setModalTaskId = useStore((s) => s.setModalTaskId);
  const liveStatus = useStore((s) => s.liveStatus);
  const loadAll = useStore((s) => s.loadAll);
  const toast = useStore((s) => s.toast);
  const T = useT();

  const [activityData, setActivityData] = useState<TaskActivityData | null>(null);
  const [schedData, setSchedData] = useState<SchedulerStateData | null>(null);
  const laTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const task = liveStatus?.tasks?.find((t) => t.id === modalTaskId) || null;

  const fetchActivity = useCallback(async () => {
    if (!modalTaskId) return;
    try {
      const d = await api.taskActivity(modalTaskId);
      setActivityData(d);
    } catch {
      setActivityData(null);
    }
  }, [modalTaskId]);

  const fetchSched = useCallback(async () => {
    if (!modalTaskId) return;
    try {
      const d = await api.schedulerState(modalTaskId);
      setSchedData(d);
    } catch {
      setSchedData(null);
    }
  }, [modalTaskId]);

  useEffect(() => {
    if (!modalTaskId || !task) return;
    fetchActivity();
    fetchSched();

    const isDone = ['Done', 'Cancelled'].includes(task.state);
    if (!isDone) {
      laTimerRef.current = setInterval(() => {
        fetchActivity();
        fetchSched();
      }, 4000);
    }

    return () => {
      if (laTimerRef.current) {
        clearInterval(laTimerRef.current);
        laTimerRef.current = null;
      }
    };
  }, [modalTaskId, task?.state, fetchActivity, fetchSched]);

  // scroll log on new entries
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [activityData?.activity?.length]);

  if (!modalTaskId || !task) return null;

  const close = () => setModalTaskId(null);

  const stages = getPipeStatus(task);
  const activeStage = stages.find((s) => s.status === 'active');
  const hb = task.heartbeat || { status: 'unknown' as const, label: T('hb.unknown') };
  const flowLog = task.flow_log || [];
  const todos = task.todos || [];
  const todoDone = todos.filter((x) => x.status === 'completed').length;
  const todoTotal = todos.length;
  const canStop = !['Done', 'Blocked', 'Cancelled'].includes(task.state);
  const canResume = ['Blocked', 'Cancelled'].includes(task.state);

  const doTaskAction = async (action: string, reason: string) => {
    try {
      const r = await api.taskAction(task.id, action, reason);
      if (r.ok) {
        toast(r.message || T('common.op_success'), 'ok');
        loadAll();
        close();
      } else {
        toast(r.error || T('common.op_failed'), 'err');
      }
    } catch {
      toast(T('common.server_error'), 'err');
    }
  };

  const doReview = async (action: string) => {
    const labels: Record<string, string> = { approve: T('task_modal.review.approve'), reject: T('task_modal.review.reject') };
    const comment = prompt(T('task_modal.review.prompt', { label: labels[action] || action, id: task.id }));
    if (comment === null) return;
    try {
      const r = await api.reviewAction(task.id, action, comment || '');
      if (r.ok) {
        toast(T('task_modal.review.success', { id: task.id, label: labels[action] || action }), 'ok');
        loadAll();
        close();
      } else {
        toast(r.error || T('common.op_failed'), 'err');
      }
    } catch {
      toast(T('common.server_error'), 'err');
    }
  };

  const doAdvance = async () => {
    const nextKey = `task_modal.next.${task.state.toLowerCase()}` as any;
    const next = T(nextKey) || T('task_modal.advance.next_default');
    const comment = prompt(T('task_modal.advance.prompt', { id: task.id, curr: task.state, next }));
    if (comment === null) return;
    try {
      const r = await api.advanceState(task.id, comment || '');
      if (r.ok) {
        toast(`⏩ ${r.message}`, 'ok');
        loadAll();
        close();
      } else {
        toast(r.error || T('common.op_failed'), 'err');
      }
    } catch {
      toast(T('common.server_error'), 'err');
    }
  };

  const doSchedAction = async (action: string) => {
    if (action === 'scan') {
      try {
        const r = await api.schedulerScan(180);
        if (r.ok) toast(T('task_modal.sched.scan.done', { n: r.count || 0 }), 'ok');
        else toast(r.error || T('task_modal.sched.scan.fail'), 'err');
        fetchSched();
      } catch {
        toast(T('common.server_error'), 'err');
      }
      return;
    }
    const labels: Record<string, string> = { retry: T('task_modal.sched.action.retry'), escalate: T('task_modal.sched.action.escalate'), rollback: T('task_modal.sched.action.rollback') };
    const reason = prompt(T('task_modal.sched.prompt', { label: labels[action] || action }));
    if (reason === null) return;
    const handlers: Record<string, (id: string, r: string) => Promise<{ ok: boolean; message?: string; error?: string }>> = {
      retry: api.schedulerRetry,
      escalate: api.schedulerEscalate,
      rollback: api.schedulerRollback,
    };
    try {
      const r = await handlers[action](task.id, reason);
      if (r.ok) toast(r.message || T('common.op_success'), 'ok');
      else toast(r.error || T('common.op_failed'), 'err');
      fetchSched();
      loadAll();
    } catch {
      toast(T('common.server_error'), 'err');
    }
  };

  const handleStop = () => {
    const reason = prompt(T('task_modal.stop.prompt'));
    if (reason === null) return;
    doTaskAction('stop', reason);
  };

  const handleCancel = () => {
    if (!confirm(T('task_modal.cancel.confirm', { id: task.id }))) return;
    const reason = prompt(T('task_modal.cancel.prompt'));
    if (reason === null) return;
    doTaskAction('cancel', reason);
  };

  // Scheduler state
  const sched = schedData?.scheduler;
  const stalledSec = schedData?.stalledSec || 0;

  return (
    <div className="modal-bg open" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close}>✕</button>
        <div className="modal-body">
          <div className="modal-id">{task.id}</div>
          <div className="modal-title">{task.title || T('task_modal.no_title')}</div>

          {/* Current Stage Banner */}
          {activeStage && (
            <div className="cur-stage">
              <div className="cs-icon">{activeStage.icon}</div>
              <div className="cs-info">
                <div className="cs-dept" style={{ color: deptColor(activeStage.dept) }}>{activeStage.dept}</div>
                <div className="cs-action">{T('task_modal.cur_stage', { action: activeStage.action })}</div>
              </div>
              <span className={`hb ${hb.status} cs-hb`}>{hb.label}</span>
            </div>
          )}

          {/* Pipeline */}
          <div className="m-pipe">
            {stages.map((s, i) => (
              <div className="mp-stage" key={s.key}>
                <div className={`mp-node ${s.status}`}>
                  {s.status === 'done' && <div className="mp-done-tick">✓</div>}
                  <div className="mp-icon">{s.icon}</div>
                  <div className="mp-dept" style={s.status === 'active' ? { color: 'var(--acc)' } : s.status === 'done' ? { color: 'var(--ok)' } : {}}>
                    {s.dept}
                  </div>
                  <div className="mp-action">{s.action}</div>
                </div>
                {i < stages.length - 1 && (
                  <div className="mp-arrow" style={s.status === 'done' ? { color: 'var(--ok)', opacity: 0.6 } : {}}>→</div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="task-actions">
            {canStop && (
              <>
                <button className="btn-action btn-stop" onClick={handleStop}>{T('task_modal.btn.stop')}</button>
                <button className="btn-action btn-cancel" onClick={handleCancel}>{T('task_modal.btn.cancel')}</button>
              </>
            )}
            {canResume && (
              <button className="btn-action btn-resume" onClick={() => doTaskAction('resume', 'Resume')}>{T('task_modal.btn.resume')}</button>
            )}
            {['Review', 'Menxia'].includes(task.state) && (
              <>
                <button className="btn-action" style={{ background: '#2ecc8a22', color: '#2ecc8a', border: '1px solid #2ecc8a44' }} onClick={() => doReview('approve')}>{T('task_modal.btn.approve')}</button>
                <button className="btn-action" style={{ background: '#ff527022', color: '#ff5270', border: '1px solid #ff527044' }} onClick={() => doReview('reject')}>{T('task_modal.btn.reject')}</button>
              </>
            )}
            {['Pending', 'Taizi', 'Zhongshu', 'Menxia', 'Assigned', 'Doing', 'Review', 'Next'].includes(task.state) && (
              <button className="btn-action" style={{ background: '#7c5cfc18', color: '#7c5cfc', border: '1px solid #7c5cfc44' }} onClick={doAdvance}>{T('task_modal.btn.advance')}</button>
            )}
          </div>

          {/* Scheduler Section */}
          <div className="sched-section">
            <div className="sched-head">
              <span className="sched-title">{T('task_modal.sched.title')}</span>
              <span className="sched-status">
                {sched ? `${sched.enabled === false ? T('task_modal.sched.disabled') : T('task_modal.sched.running')} · ${T('task_modal.sched.threshold', { n: sched.stallThresholdSec || 180 })}` : T('task_modal.sched.loading')}
              </span>
            </div>
            <div className="sched-grid">
              <div className="sched-kpi"><div className="k">{T('task_modal.sched.stalled')}</div><div className="v">{fmtStalled(stalledSec, T)}</div></div>
              <div className="sched-kpi"><div className="k">{T('task_modal.sched.retries')}</div><div className="v">{sched?.retryCount || 0}</div></div>
              <div className="sched-kpi"><div className="k">{T('task_modal.sched.escalation')}</div><div className="v">{!sched?.escalationLevel ? T('task_modal.sched.escalation.none') : sched.escalationLevel === 1 ? T('task_modal.sched.escalation.menxia') : T('task_modal.sched.escalation.shangshu')}</div></div>
              <div className="sched-kpi"><div className="k">{T('task_modal.sched.dispatch_st')}</div><div className="v">{sched?.lastDispatchStatus || 'idle'}</div></div>
            </div>
            {sched && (
              <div className="sched-line">
                {sched.lastProgressAt && <span>{T('task_modal.sched.last_prog', { time: (sched.lastProgressAt || '').replace('T', ' ').substring(0, 19) })}</span>}
                {sched.lastDispatchAt && <span>{T('task_modal.sched.last_disp', { time: (sched.lastDispatchAt || '').replace('T', ' ').substring(0, 19) })}</span>}
                <span>{T('task_modal.sched.auto_rollback', { status: sched.autoRollback === false ? T('task_modal.sched.off') : T('task_modal.sched.on') })}</span>
                {sched.lastDispatchAgent && <span>{T('task_modal.sched.target', { tgt: getAgentLabel(sched.lastDispatchAgent, T) })}</span>}
              </div>
            )}
            <div className="sched-actions">
              <button className="sched-btn" onClick={() => doSchedAction('retry')}>{T('task_modal.sched.btn.retry')}</button>
              <button className="sched-btn warn" onClick={() => doSchedAction('escalate')}>{T('task_modal.sched.btn.escalate')}</button>
              <button className="sched-btn danger" onClick={() => doSchedAction('rollback')}>{T('task_modal.sched.btn.rollback')}</button>
              <button className="sched-btn" onClick={() => doSchedAction('scan')}>{T('task_modal.sched.btn.scan')}</button>
            </div>
          </div>

          {/* Todo List */}
          {todoTotal > 0 && (
            <TodoSection todos={todos} todoDone={todoDone} todoTotal={todoTotal} T={T} />
          )}

          {/* Basic Info */}
          <div className="m-section">
            <div className="m-rows">
              <div className="m-row">
                <div className="mr-label">{T('task_modal.info.status')}</div>
                <div className="mr-val">
                  <span className={`tag st-${task.state}`}>{stateLabel(task, T)}</span>
                  {(task.review_round || 0) > 0 && <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>{T('task_modal.info.rounds', { n: task.review_round })}</span>}
                </div>
              </div>
              <div className="m-row">
                <div className="mr-label">{T('task_modal.info.dept')}</div>
                <div className="mr-val"><span className={`tag dt-${(task.org || '').replace(/\s/g, '')}`}>{task.org || '—'}</span></div>
              </div>
              {task.eta && task.eta !== '-' && (
                <div className="m-row"><div className="mr-label">{T('task_modal.info.eta')}</div><div className="mr-val">{task.eta}</div></div>
              )}
              {task.block && task.block !== '无' && task.block !== '-' && (
                <div className="m-row"><div className="mr-label" style={{ color: 'var(--danger)' }}>{T('task_modal.info.block')}</div><div className="mr-val" style={{ color: 'var(--danger)' }}>{task.block}</div></div>
              )}
              {task.now && task.now !== '-' && (
                <div className="m-row" style={{ gridColumn: '1/-1' }}>
                  <div className="mr-label">{T('task_modal.info.now')}</div>
                  <div className="mr-val" style={{ fontWeight: 400, fontSize: 12 }}>{task.now}</div>
                </div>
              )}
              {task.ac && (
                <div className="m-row" style={{ gridColumn: '1/-1' }}>
                  <div className="mr-label">{T('task_modal.info.ac')}</div>
                  <div className="mr-val" style={{ fontWeight: 400, fontSize: 12 }}>{task.ac}</div>
                </div>
              )}
            </div>
          </div>

          {/* Flow Log */}
          {flowLog.length > 0 && (
            <div className="m-section">
              <div className="m-sec-label">{T('task_modal.log.title', { n: flowLog.length })}</div>
              <div className="fl-timeline">
                {flowLog.map((fl, i) => {
                  const col = deptColor(fl.from || '');
                  return (
                    <div className="fl-item" key={i}>
                      <div className="fl-time">{fl.at ? fl.at.substring(11, 16) : ''}</div>
                      <div className="fl-dot" style={{ background: col }} />
                      <div className="fl-content">
                        <div className="fl-who">
                          <span className="from" style={{ color: col }}>{fl.from}</span>
                          <span style={{ color: 'var(--muted)' }}> → </span>
                          <span className="to" style={{ color: deptColor(fl.to || '') }}>{fl.to}</span>
                        </div>
                        <div className="fl-rem">{fl.remark}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Output */}
          {task.output && task.output !== '-' && task.output !== '' && (
            <div className="m-section">
              <div className="m-sec-label">{T('task_modal.output')}</div>
              <code>{task.output}</code>
            </div>
          )}

          {/* Live Activity */}
          <LiveActivitySection data={activityData} isDone={['Done', 'Cancelled'].includes(task.state)} logRef={logRef} T={T} />
        </div>
      </div>
    </div>
  );
}

function TodoSection({ todos, todoDone, todoTotal, T }: { todos: TodoItem[]; todoDone: number; todoTotal: number; T: any }) {
  return (
    <div className="todo-section">
      <div className="todo-header">
        <div className="m-sec-label" style={{ marginBottom: 0, border: 'none', padding: 0 }}>
          {T('task_modal.todos.title', { done: todoDone, total: todoTotal })}
        </div>
        <div className="todo-progress">
          <div className="todo-bar">
            <div className="todo-bar-fill" style={{ width: `${Math.round((todoDone / todoTotal) * 100)}%` }} />
          </div>
          <span>{Math.round((todoDone / todoTotal) * 100)}%</span>
        </div>
      </div>
      <div className="todo-list">
        {todos.map((td) => {
          const ico = td.status === 'completed' ? '✅' : td.status === 'in-progress' ? '🔄' : '⬜';
          const stLabel = td.status === 'completed' ? T('task_modal.todos.st.done') : td.status === 'in-progress' ? T('task_modal.todos.st.prog') : T('task_modal.todos.st.wait');
          const stCls = td.status === 'completed' ? 's-done' : td.status === 'in-progress' ? 's-progress' : 's-notstarted';
          const itemCls = td.status === 'completed' ? 'done' : '';
          return (
            <div className={`todo-item ${itemCls}`} key={td.id}>
              <div className="t-row">
                <span className="t-icon">{ico}</span>
                <span className="t-id">#{td.id}</span>
                <span className="t-title">{td.title}</span>
                <span className={`t-status ${stCls}`}>{stLabel}</span>
              </div>
              {td.detail && <div className="todo-detail">{td.detail}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LiveActivitySection({
  data,
  isDone,
  logRef,
  T,
}: {
  data: TaskActivityData | null;
  isDone: boolean;
  logRef: React.RefObject<HTMLDivElement | null>;
  T: any;
}) {
  if (!data) return null;

  const activity = data.activity || [];
  const isActive = (() => {
    if (!activity.length) return false;
    const last = activity[activity.length - 1];
    if (!last.at) return false;
    const ts = typeof last.at === 'number' ? last.at : new Date(last.at).getTime();
    return Date.now() - ts < 300000;
  })();

  const agentParts: string[] = [];
  if (data.agentLabel) agentParts.push(getAgentLabel(data.agentLabel, T));
  if (data.relatedAgents && data.relatedAgents.length > 1) agentParts.push(T('task_modal.la.agents_count', { n: data.relatedAgents.length }));
  if (data.lastActive) agentParts.push(T('task_modal.la.last_active', { time: data.lastActive }));

  // Phase durations
  const phaseDurations = data.phaseDurations || [];
  const maxDur = Math.max(...phaseDurations.map((p) => p.durationSec || 1), 1);
  const phaseColors: Record<string, string> = {
    '皇上': '#eab308', '太子': '#f97316', '中书省': '#3b82f6', '门下省': '#8b5cf6',
    '尚书省': '#10b981', '六部': '#06b6d4', '礼部': '#ec4899', '户部': '#f59e0b',
    '兵部': '#ef4444', '刑部': '#6366f1', '工部': '#14b8a6', '吏部': '#d946ef',
  };
  // CN phase string → i18n key
  const phaseKeyMap: Record<string, string> = {
    '皇上': 'phase.emperor', '太子': 'phase.taizi', '中书省': 'phase.zhongshu', '门下省': 'phase.menxia',
    '尚书省': 'phase.shangshu', '六部': 'phase.liubu', '礼部': 'phase.libu', '户部': 'phase.hubu',
    '兵部': 'phase.bingbu', '刑部': 'phase.xingbu', '工部': 'phase.gongbu', '吏部': 'phase.libu_hr',
  };

  // Todos summary
  const ts = data.todosSummary;

  // Resource summary
  const rs = data.resourceSummary;

  // Group non-flow activity by agent
  const flowItems = activity.filter((a) => a.kind === 'flow');
  const nonFlow = activity.filter((a) => a.kind !== 'flow');
  const grouped = new Map<string, ActivityEntry[]>();
  nonFlow.forEach((a) => {
    const key = a.agent || 'unknown';
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(a);
  });

  return (
    <div className="la-section">
      <div className="la-header">
        <span className="la-title">
          <span className={`la-dot${isActive ? '' : ' idle'}`} />
          {isDone ? T('task_modal.la.title.done') : T('task_modal.la.title.live')}
        </span>
        <span className="la-agent">{agentParts.join(' · ') || T('task_modal.sched.loading')}</span>
      </div>

      {/* Phase Bars */}
      {phaseDurations.length > 0 && (
        <div style={{ padding: '4px 0 8px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600 }}>{T('task_modal.la.dur.title')}</span>
            {data.totalDuration && <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--muted)' }}>{T('task_modal.la.dur.total', { time: data.totalDuration })}</span>}
          </div>
          {phaseDurations.map((p, i) => {
            const pct = Math.max(5, Math.round(((p.durationSec || 1) / maxDur) * 100));
            const color = phaseColors[p.phase] || '#6b7280';
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '2px 0', fontSize: 11 }}>
                <span style={{ minWidth: 48, color: 'var(--muted)', textAlign: 'right' }}>
                  {T(phaseKeyMap[p.phase] as any) || p.phase}
                </span>
                <div style={{ flex: 1, height: 14, background: 'var(--panel)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, opacity: p.ongoing ? 0.6 : 0.85 }} />
                </div>
                <span style={{ minWidth: 60, fontSize: 10, color: 'var(--muted)' }}>
                  {p.durationText}
                  {p.ongoing && <span style={{ fontSize: 9, color: '#60a5fa' }}>{T('task_modal.la.dur.ongoing')}</span>}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Todos Progress */}
      {ts && (
        <div style={{ padding: '4px 0 8px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 600 }}>{T('task_modal.la.prog.title')}</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: ts.percent >= 100 ? '#22c55e' : ts.percent >= 50 ? '#60a5fa' : 'var(--text)' }}>{ts.percent}%</span>
            <span style={{ fontSize: 10, color: 'var(--muted)' }}>{T('task_modal.la.prog.stat', { done: ts.completed, prog: ts.inProgress, wait: ts.notStarted, total: ts.total })}</span>
          </div>
          <div style={{ height: 8, background: 'var(--panel)', borderRadius: 4, overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${ts.total ? (ts.completed / ts.total) * 100 : 0}%`, background: '#22c55e', transition: 'width .3s' }} />
            <div style={{ width: `${ts.total ? (ts.inProgress / ts.total) * 100 : 0}%`, background: '#3b82f6', transition: 'width .3s' }} />
          </div>
        </div>
      )}

      {/* Resource Summary */}
      {rs && (rs.totalTokens || rs.totalCost) && (
        <div style={{ padding: '4px 0 8px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600 }}>{T('task_modal.la.res.title')}</span>
          {rs.totalTokens != null && <span style={{ fontSize: 11, color: 'var(--muted)' }}>{T('task_modal.la.res.tokens', { n: rs.totalTokens.toLocaleString() })}</span>}
          {rs.totalCost != null && <span style={{ fontSize: 11, color: 'var(--muted)' }}>{T('task_modal.la.res.cost', { n: rs.totalCost.toFixed(4) })}</span>}
          {rs.totalElapsedSec != null && (
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>
              {rs.totalElapsedSec >= 60 ? T('task_modal.la.res.time', { m: Math.floor(rs.totalElapsedSec / 60), s: rs.totalElapsedSec % 60 }) : T('task_modal.la.res.time_s', { s: rs.totalElapsedSec })}
            </span>
          )}
        </div>
      )}

      {/* Activity Log */}
      <div className="la-log" ref={logRef as React.RefObject<HTMLDivElement>}>
        {/* Flow entries */}
        {flowItems.length > 0 && (
          <div className="la-flow-wrap">
            {flowItems.map((a, i) => (
              <div className="la-entry la-tool" key={`flow-${i}`}>
                <span className="la-icon">📋</span>
                <span className="la-body"><b>{a.from}</b> → <b>{a.to}</b>　{a.remark || ''}</span>
                <span className="la-time">{fmtActivityTime(a.at)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Grouped entries */}
        {grouped.size > 0 ? (
          <div className="la-groups">
            {Array.from(grouped.entries()).map(([agent, items]) => {
              const label = getAgentLabel(agent, T);
              const last = items[items.length - 1];
              const lastTime = last?.at ? fmtActivityTime(last.at) : '--:--:--';
              return (
                <div className="la-group" key={agent}>
                  <div className="la-group-hd">
                    <span className="name">{label}</span>
                    <span>{T('task_modal.la.group.update', { time: lastTime })}</span>
                  </div>
                  <div className="la-group-bd">
                    {items.map((a, i) => (
                      <ActivityEntryView key={i} entry={a} T={T} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !flowItems.length && (
            <div className="la-empty">
              {data.message || data.error || T('task_modal.la.empty')}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function ActivityEntryView({ entry: a, T }: { entry: ActivityEntry; T: any }) {
  const time = fmtActivityTime(a.at);
  const agBadge = a.agent ? (
    <span style={{ fontSize: 9, color: 'var(--muted)', background: 'var(--panel)', padding: '1px 4px', borderRadius: 3, marginRight: 4 }}>
      {getAgentLabel(a.agent, T)}
    </span>
  ) : null;

  if (a.kind === 'progress') {
    return (
      <div className="la-entry la-assistant">
        <span className="la-icon">🔄</span>
        <span className="la-body">{agBadge}<b>{T('task_modal.la.entry.prog')}</b>{a.text}</span>
        <span className="la-time">{time}</span>
      </div>
    );
  }

  if (a.kind === 'todos') {
    const items = a.items || [];
    const diffMap = new Map<string, { type: string; from?: string; to?: string }>();
    if (a.diff) {
      (a.diff.changed || []).forEach((c) => diffMap.set(c.id, { type: 'changed', from: c.from, to: c.to }));
      (a.diff.added || []).forEach((c) => diffMap.set(c.id, { type: 'added' }));
    }
    return (
      <div className="la-entry" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>{agBadge}{T('task_modal.la.entry.plan')}</div>
        {items.map((td) => {
          const icon = td.status === 'completed' ? '✅' : td.status === 'in-progress' ? '🔄' : '⬜';
          const d = diffMap.get(String(td.id));
          const style: React.CSSProperties = td.status === 'completed'
            ? { opacity: 0.5, textDecoration: 'line-through' }
            : td.status === 'in-progress'
              ? { color: '#60a5fa', fontWeight: 'bold' }
              : {};
          return (
            <div key={td.id} style={style}>
              {icon} {td.title}
              {d && d.type === 'changed' && d.to === 'completed' && <span style={{ color: '#22c55e', fontSize: 9, marginLeft: 4 }}>{T('task_modal.la.entry.done')}</span>}
              {d && d.type === 'changed' && d.to !== 'completed' && <span style={{ color: '#f59e0b', fontSize: 9, marginLeft: 4 }}>↻{d.from}→{d.to}</span>}
              {d && d.type === 'added' && <span style={{ color: '#3b82f6', fontSize: 9, marginLeft: 4 }}>{T('task_modal.la.entry.new')}</span>}
            </div>
          );
        })}
        {a.diff?.removed?.map((r) => (
          <div key={r.id} style={{ opacity: 0.4, textDecoration: 'line-through' }}>🗑 {r.title}</div>
        ))}
      </div>
    );
  }

  if (a.kind === 'assistant') {
    return (
      <>
        {a.thinking && (
          <div className="la-entry la-thinking">
            <span className="la-icon">💭</span>
            <span className="la-body">{agBadge}{a.thinking}</span>
            <span className="la-time">{time}</span>
          </div>
        )}
        {a.tools?.map((tc, i) => (
          <div className="la-entry la-tool" key={i}>
            <span className="la-icon">🔧</span>
            <span className="la-body">{agBadge}<span className="la-tool-name">{tc.name}</span><span className="la-trunc">{tc.input_preview || ''}</span></span>
            <span className="la-time">{time}</span>
          </div>
        ))}
        {a.text && (
          <div className="la-entry la-assistant">
            <span className="la-icon">🤖</span>
            <span className="la-body">{agBadge}{a.text}</span>
            <span className="la-time">{time}</span>
          </div>
        )}
      </>
    );
  }

  if (a.kind === 'tool_result') {
    const ok = a.exitCode === 0 || a.exitCode === null || a.exitCode === undefined;
    return (
      <div className={`la-entry la-tool-result ${ok ? 'ok' : 'err'}`}>
        <span className="la-icon">{ok ? '✅' : '❌'}</span>
        <span className="la-body">{agBadge}<span className="la-tool-name">{a.tool || ''}</span>{a.output ? a.output.substring(0, 150) : ''}</span>
        <span className="la-time">{time}</span>
      </div>
    );
  }

  if (a.kind === 'user') {
    return (
      <div className="la-entry la-user">
        <span className="la-icon">📥</span>
        <span className="la-body">{agBadge}{a.text || ''}</span>
        <span className="la-time">{time}</span>
      </div>
    );
  }

  return null;
}
