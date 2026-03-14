import { useEffect } from 'react';
import { useStore, DEPTS, isEdict, stateLabel } from '../store';
import { api, type OfficialInfo } from '../api';
import { useT } from '../i18n/hooks';

export default function MonitorPanel() {
  const liveStatus = useStore((s) => s.liveStatus);
  const agentsStatusData = useStore((s) => s.agentsStatusData);
  const officialsData = useStore((s) => s.officialsData);
  const loadAgentsStatus = useStore((s) => s.loadAgentsStatus);
  const setModalTaskId = useStore((s) => s.setModalTaskId);
  const toast = useStore((s) => s.toast);
  const T = useT();

  useEffect(() => {
    loadAgentsStatus();
  }, [loadAgentsStatus]);

  const tasks = liveStatus?.tasks || [];
  const activeTasks = tasks.filter((t) => isEdict(t) && t.state !== 'Done' && t.state !== 'Next');

  // Build official map
  const offMap: Record<string, OfficialInfo> = {};
  if (officialsData?.officials) {
    officialsData.officials.forEach((o) => { offMap[o.id] = o; });
  }

  // Agent wake
  const handleWake = async (agentId: string) => {
    try {
      const r = await api.agentWake(agentId);
      toast(r.message || T('monitor.agent.wake_sent'));
      setTimeout(() => loadAgentsStatus(), 30000);
    } catch { toast(T('monitor.agent.wake_failed'), 'err'); }
  };

  const handleWakeAll = async () => {
    if (!agentsStatusData) return;
    const toWake = agentsStatusData.agents.filter(
      (a) => a.id !== 'main' && a.status !== 'running' && a.status !== 'unconfigured'
    );
    if (!toWake.length) { toast(T('monitor.agent.all_online')); return; }
    toast(T('monitor.agent.waking_n', { n: toWake.length }));
    for (const a of toWake) {
      try { await api.agentWake(a.id); } catch { /* ignore */ }
    }
    toast(T('monitor.agent.woke_n', { n: toWake.length }));
    setTimeout(() => loadAgentsStatus(), 30000);
  };

  // Agent Status Panel
  const asData = agentsStatusData;
  const filtered = asData?.agents?.filter((a) => a.id !== 'main') || [];
  const running = filtered.filter((a) => a.status === 'running').length;
  const idle = filtered.filter((a) => a.status === 'idle').length;
  const offline = filtered.filter((a) => a.status === 'offline').length;
  const unconf = filtered.filter((a) => a.status === 'unconfigured').length;
  const gw = asData?.gateway;
  const gwCls = gw?.probe ? 'ok' : gw?.alive ? 'warn' : 'err';

  return (
    <div>
      {/* Agent Status Panel */}
      {asData && asData.ok && (
        <div className="as-panel">
          <div className="as-header">
            <span className="as-title">{T('monitor.agent_status.title')}</span>
            <span className={`as-gw ${gwCls}`}>Gateway: {gw?.status || T('monitor.agent_status.gateway_unknown')}</span>
            <button className="btn-refresh" onClick={() => loadAgentsStatus()} style={{ marginLeft: 8 }}>
              {T('common.refresh')}
            </button>
            {(offline + unconf > 0) && (
              <button className="btn-refresh" onClick={handleWakeAll} style={{ marginLeft: 4, borderColor: 'var(--warn)', color: 'var(--warn)' }}>
                {T('monitor.agent.wake_all')}
              </button>
            )}
          </div>
          <div className="as-grid">
            {filtered.map((a) => {
              const canWake = a.status !== 'running' && a.status !== 'unconfigured' && gw?.alive;
              return (
                <div key={a.id} className="as-card" title={`${a.role} · ${a.statusLabel}`}>
                  <div className={`as-dot ${a.status}`} />
                  <div style={{ fontSize: 22 }}>{a.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{a.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{a.role}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{a.statusLabel}</div>
                  {a.lastActive ? (
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>⏰ {a.lastActive}</div>
                  ) : (
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>{T('monitor.agent.no_activity')}</div>
                  )}
                  {canWake && (
                    <button className="as-wake-btn" onClick={(e) => { e.stopPropagation(); handleWake(a.id); }}>
                      {T('monitor.agent.wake')}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="as-summary">
            <span><span className="as-dot running" style={{ position: 'static', width: 8, height: 8 }} /> {T('monitor.agent.count.running', { n: running })}</span>
            <span><span className="as-dot idle" style={{ position: 'static', width: 8, height: 8 }} /> {T('monitor.agent.count.idle', { n: idle })}</span>
            {offline > 0 && <span><span className="as-dot offline" style={{ position: 'static', width: 8, height: 8 }} /> {T('monitor.agent.count.offline', { n: offline })}</span>}
            {unconf > 0 && <span><span className="as-dot unconfigured" style={{ position: 'static', width: 8, height: 8 }} /> {T('monitor.agent.count.unconfigured', { n: unconf })}</span>}
            <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--muted)' }}>
              {T('monitor.agent_status.checked_at', { time: (asData.checkedAt || '').substring(11, 19) })}
            </span>
          </div>
        </div>
      )}

      {/* Duty Grid */}
      <div className="duty-grid">
        {DEPTS.map((d) => {
          const myTasks = activeTasks.filter((t) => t.org === d.label);
          const isActive = myTasks.some((t) => t.state === 'Doing');
          const isBlocked = myTasks.some((t) => t.state === 'Blocked');
          const off = offMap[d.id];
          const hb = off?.heartbeat || { status: 'idle', label: '⚪' };
          const dotCls = isBlocked ? 'blocked' : isActive ? 'busy' : hb.status === 'active' ? 'active' : 'idle';
          const statusText = isBlocked ? T('monitor.dept.status.blocked') : isActive ? T('monitor.dept.status.doing') : hb.status === 'active' ? T('monitor.dept.status.active') : T('monitor.dept.status.idle');
          const cardCls = isBlocked ? 'blocked-card' : isActive ? 'active-card' : '';

          return (
            <div key={d.id} className={`duty-card ${cardCls}`}>
              <div className="dc-hdr">
                <span className="dc-emoji">{d.emoji}</span>
                <div className="dc-info">
                  <div className="dc-name">{d.label}</div>
                  <div className="dc-role">{d.role} · {d.rank}</div>
                </div>
                <div className="dc-status">
                  <span className={`dc-dot ${dotCls}`} />
                  <span>{statusText}</span>
                </div>
              </div>
              <div className="dc-body">
                {myTasks.length > 0 ? (
                  myTasks.map((t) => (
                    <div key={t.id} className="dc-task" onClick={() => setModalTaskId(t.id)}>
                      <div className="dc-task-id">{t.id}</div>
                      <div className="dc-task-title">{t.title || T('edict.no_title')}</div>
                      {t.now && t.now !== '-' && (
                        <div className="dc-task-now">{t.now.substring(0, 70)}</div>
                      )}
                      <div className="dc-task-meta">
                        <span className={`tag st-${t.state}`}>{stateLabel(t, T)}</span>
                        {t.block && t.block !== '无' && (  // '无' is a canonical data value, not UI
                          <span className="tag" style={{ borderColor: '#ff527044', color: 'var(--danger)' }}>🚫{t.block}</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="dc-idle">
                    <span style={{ fontSize: 20 }}>🪭</span>
                    <span>{T('monitor.dept.idle_placeholder')}</span>
                  </div>
                )}
              </div>
              <div className="dc-footer">
                <span className="dc-model">🤖 {off?.model_short || T('monitor.dept.model_unconfigured')}</span>
                {off?.last_active && <span className="dc-la">⏰ {off.last_active}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
