import { useEffect } from 'react';
import { useStore, stateLabel } from '../store';
import { useT } from '../i18n/hooks';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function OfficialPanel() {
  const officialsData = useStore((s) => s.officialsData);
  const selectedOfficial = useStore((s) => s.selectedOfficial);
  const setSelectedOfficial = useStore((s) => s.setSelectedOfficial);
  const loadOfficials = useStore((s) => s.loadOfficials);
  const setModalTaskId = useStore((s) => s.setModalTaskId);

  const T = useT();

  useEffect(() => {
    loadOfficials();
  }, [loadOfficials]);

  if (!officialsData?.officials) {
    return <div className="empty">{T('officials.error.no_server')}</div>;
  }

  const offs = officialsData.officials;
  const totals = officialsData.totals || { tasks_done: 0, cost_cny: 0 };
  const maxTk = Math.max(...offs.map((o) => o.tokens_in + o.tokens_out + o.cache_read + o.cache_write), 1);

  // Active officials
  const alive = offs.filter((o) => o.heartbeat?.status === 'active');

  // Selected official detail
  const sel = offs.find((o) => o.id === (selectedOfficial || offs[0]?.id));
  const selId = sel?.id || offs[0]?.id;

  return (
    <div>
      {/* Activity banner */}
      {alive.length > 0 && (
        <div className="off-activity">
          <span>{T('officials.activity.current_active')}</span>
          {alive.map((o) => (
            <span key={o.id} style={{ fontSize: 12 }}>{o.emoji} {o.role}</span>
          ))}
          <span style={{ color: 'var(--muted)', fontSize: 11, marginLeft: 'auto' }}>{T('officials.activity.others_standby')}</span>
        </div>
      )}

      {/* KPI Row */}
      <div className="off-kpi">
        <div className="kpi">
          <div className="kpi-v" style={{ color: 'var(--acc)' }}>{offs.length}</div>
          <div className="kpi-l">{T('officials.kpi.active_officials')}</div>
        </div>
        <div className="kpi">
          <div className="kpi-v" style={{ color: '#f5c842' }}>{totals.tasks_done || 0}</div>
          <div className="kpi-l">{T('officials.kpi.total_done')}</div>
        </div>
        <div className="kpi">
          <div className="kpi-v" style={{ color: (totals.cost_cny || 0) > 20 ? 'var(--warn)' : 'var(--ok)' }}>
            ¥{totals.cost_cny || 0}
          </div>
          <div className="kpi-l">{T('officials.kpi.total_cost')}</div>
        </div>
        <div className="kpi">
          <div className="kpi-v" style={{ fontSize: 16, paddingTop: 4 }}>{officialsData.top_official || '—'}</div>
          <div className="kpi-l">{T('officials.kpi.top_merit')}</div>
        </div>
      </div>

      {/* Layout: Ranklist + Detail */}
      <div className="off-layout">
        {/* Left: Ranklist */}
        <div className="off-ranklist">
          <div className="orl-hdr">{T('officials.ranklist.title')}</div>
          {offs.map((o) => {
            const hb = o.heartbeat || { status: 'idle' };
            return (
              <div
                key={o.id}
                className={`orl-item${selId === o.id ? ' selected' : ''}`}
                onClick={() => setSelectedOfficial(o.id)}
              >
                <span style={{ minWidth: 24, textAlign: 'center' }}>
                  {o.merit_rank <= 3 ? MEDALS[o.merit_rank - 1] : '#' + o.merit_rank}
                </span>
                <span>{o.emoji}</span>
                <span style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{o.role}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{o.label}</div>
                </span>
                <span style={{ fontSize: 11 }}>{T('officials.merit_score', { n: o.merit_score })}</span>
                <span className={`dc-dot ${hb.status}`} style={{ width: 8, height: 8 }} />
              </div>
            );
          })}
        </div>

        {/* Right: Detail */}
        <div className="off-detail">
          {sel ? (
            <OfficialDetail official={sel} maxTk={maxTk} onOpenTask={setModalTaskId} />
          ) : (
            <div className="empty">{T('officials.detail.select_hint')}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function OfficialDetail({
  official: o,
  maxTk,
  onOpenTask,
}: {
  official: NonNullable<ReturnType<typeof useStore.getState>['officialsData']>['officials'][0];
  maxTk: number;
  onOpenTask: (id: string) => void;
}) {
  const T = useT();
  const hb = o.heartbeat || { status: 'idle', label: T('officials.detail.hb_idle') };
  const totTk = o.tokens_in + o.tokens_out + o.cache_read + o.cache_write;
  const edicts = o.participated_edicts || [];

  const tkBars = [
    { l: T('officials.token.in'), v: o.tokens_in, color: '#6a9eff' },
    { l: T('officials.token.out'), v: o.tokens_out, color: '#a07aff' },
    { l: T('officials.token.cache_read'), v: o.cache_read, color: '#2ecc8a' },
    { l: T('officials.token.cache_write'), v: o.cache_write, color: '#f5c842' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 40 }}>{o.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{o.role}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            {o.label} · <span style={{ color: 'var(--acc)' }}>{o.model_short || o.model}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
            {T('officials.detail.rank_score', { rank: o.rank, score: o.merit_score })}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className={`hb ${hb.status}`} style={{ marginBottom: 4 }}>{hb.label}</div>
          {o.last_active && <div style={{ fontSize: 10, color: 'var(--muted)' }}>{T('officials.detail.last_active', { time: o.last_active })}</div>}
          <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
            {T('officials.detail.sessions_msgs', { sessions: o.sessions, messages: o.messages })}
          </div>
        </div>
      </div>

      {/* Merit Stats */}
      <div style={{ marginBottom: 18 }}>
        <div className="sec-title">{T('officials.detail.merit_stats')}</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ok)' }}>{o.tasks_done}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>{T('officials.detail.tasks_done')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--warn)' }}>{o.tasks_active}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>{T('state.Doing')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--acc)' }}>{o.flow_participations}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>{T('officials.detail.flow_participations')}</div>
          </div>
        </div>
      </div>

      {/* Token Bars */}
      <div style={{ marginBottom: 18 }}>
        <div className="sec-title">{T('officials.detail.token_usage')}</div>
        {tkBars.map((b) => (
          <div key={b.l} style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
              <span style={{ color: 'var(--muted)' }}>{b.l}</span>
              <span>{b.v.toLocaleString()}</span>
            </div>
            <div style={{ height: 6, background: '#0e1320', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${maxTk > 0 ? Math.round((b.v / maxTk) * 100) : 0}%`, background: b.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Cost */}
      <div style={{ marginBottom: 18 }}>
        <div className="sec-title">{T('officials.detail.total_cost')}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 12, color: o.cost_cny > 10 ? 'var(--danger)' : o.cost_cny > 3 ? 'var(--warn)' : 'var(--ok)' }}>
            <b>¥{o.cost_cny}</b> {T('officials.detail.cny')}
          </span>
          <span style={{ fontSize: 12 }}><b>${o.cost_usd}</b> {T('officials.detail.usd')}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{T('officials.detail.total_tokens', { n: totTk.toLocaleString() })}</span>
        </div>
      </div>

      {/* Participated Edicts */}
      <div>
        <div className="sec-title">{T('officials.detail.edicts_title', { n: edicts.length })}</div>
        {edicts.length === 0 ? (
          <div style={{ fontSize: 12, color: 'var(--muted)', padding: '8px 0' }}>{T('officials.detail.edicts_empty')}</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {edicts.map((e) => (
              <div
                key={e.id}
                style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', border: '1px solid var(--line)' }}
                onClick={() => onOpenTask(e.id)}
              >
                <span style={{ fontSize: 10, color: 'var(--acc)', fontWeight: 700 }}>{e.id}</span>
                <span style={{ flex: 1, fontSize: 12 }}>{e.title.substring(0, 35)}</span>
                <span className={`tag st-${e.state}`} style={{ fontSize: 10 }}>{stateLabel({ state: e.state } as Parameters<typeof stateLabel>[0], T)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
