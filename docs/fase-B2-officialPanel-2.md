### Planner Response

Boa estratégia. Deixa eu primeiro descobrir os `o.id` reais olhando nos arquivos de dados do payload, antes de inventar qualquer key:

*Searched filesystem*

*Viewed [officials_stats.json](file:///home/cartine/.openclaw/edict-BR/docker/demo_data/officials_stats.json) *

*Viewed [agent_config.json](file:///home/cartine/.openclaw/edict-BR/data/agent_config.json) *

### Planner Response

Excelente! Tenho todos os dados reais. Deixa eu compilar o inventário completo:

**IDs de officials (officials_stats.json + agent_config.json):**
| `o.id` | `o.label` (CN) | `o.role` (CN) | EN label | EN role |
|---|---|---|---|---|
| `zhongshu` | 中书省 | 中书令 | Secretariat | Grand Chancellor |
| `shangshu` | 尚书省 | 尚书令 | Department of State Affairs | Minister of State |
| `menxia` | 门下省 | 侍中 | Chancellery | Chief Attendant |
| `bingbu` | 兵部 | 兵部尚书 | Ministry of War | Minister of War |
| `gongbu` | 工部 | 工部尚书 | Ministry of Works | Minister of Works |
| `libu` | 礼部 | 礼部尚书 | Ministry of Rites | Minister of Rites |
| `hubu` | 户部 | 户部尚书 | Ministry of Revenue | Minister of Revenue |
| `xingbu` | 刑部 | 刑部尚书 | Ministry of Justice | Minister of Justice |
| `libu_hr` | 吏部 | 吏部尚书 | Ministry of Personnel | Minister of Personnel |
| `taizi` | 太子 | 太子 | Crown Prince | Crown Prince |
| `zaochao` | 钦天监 | 朝报官 | Imperial Observatory | Morning Reporter |

**Heartbeat statuses reais:** `active`, `idle`, `warn` (+ `offline` defensivo)

Agora implemento tudo:

*Viewed [zh.ts](file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/zh.ts) *

*Edited relevant file*

*Viewed [en.ts](file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/en.ts) *

*Edited relevant file*

### Planner Response

Locales prontos. Agora o componente — a lógica é: o TypeScript vai reclamar que `'officials.role.' + o.id` não é uma [TranslationKey](cci:2://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/zh.ts:184:0-184:45) literal. Preciso fazer um cast seguro ou um helper. A abordagem mais limpa é um helper inline com cast:

*Viewed [OfficialPanel.tsx](file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/OfficialPanel.tsx) *

*Viewed [OfficialPanel.tsx](file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/OfficialPanel.tsx) *

### Planner Response

Agora vejo todos os pontos de uso. O plano:

1. **Adicionar import de [TranslationKey](cci:2://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/zh.ts:184:0-184:45)** no topo
2. **Helper `tOr`** — faz o cast seguro e retorna fallback se key não existir
3. **Substituir `o.role` e `o.label`** nos 3 lugares (activity banner, ranklist, detail hero)
4. **Substituir `hb.label` do payload** pela função `hbLabel(status)`

*Edited relevant file*

### Planner Response

Agora faço o mesmo no [OfficialDetail](cci:1://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/OfficialPanel.tsx:119:0-233:1) — adicionar helpers locais e substituir `o.role`, `o.label` e `hb.label`:

*Viewed [OfficialPanel.tsx](file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/OfficialPanel.tsx) *

*Edited relevant file*

### Planner Response

Perfeito. Tudo feito — locales e componente. Agora valide e faça os 2 commits:

```bash
# 1) Build (valida TypeScript + Vite)
cd /home/cartine/.openclaw/edict-BR/edict/frontend && npm run build

# 2) Check CJK (deve zerar — só payload fixo vai aparecer)
rg -n "[\u4e00-\u9fff]" /home/cartine/.openclaw/edict-BR/edict/frontend/src/components/OfficialPanel.tsx

# 3) Commit B2 OfficialPanel (chrome UI)
cd /home/cartine/.openclaw/edict-BR && \
git add edict/frontend/src/components/OfficialPanel.tsx \
        edict/frontend/src/i18n/locales/zh.ts \
        edict/frontend/src/i18n/locales/en.ts && \
git commit -m "i18n(front): Fase B2 — OfficialPanel"

# 4) Commit B2.1 (display names + heartbeat)
git add edict/frontend/src/components/OfficialPanel.tsx \
        edict/frontend/src/i18n/locales/zh.ts \
        edict/frontend/src/i18n/locales/en.ts && \
git commit -m "i18n(front): B2.1 — OfficialPanel display names + heartbeat"
```

---

**O que foi feito neste commit extra (B2.1):**

| Elemento | Antes | Depois |
|---|---|---|
| `o.role` no ranklist/detail/banner | sempre CN payload | [T('officials.role.{id}') \|\| o.role](cci:1://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/OfficialPanel.tsx:16:2-18:60) (fallback seguro) |
| `o.label` no ranklist/detail | sempre CN payload | [T('officials.label.{id}') \|\| o.label](cci:1://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/OfficialPanel.tsx:16:2-18:60) |
| `hb.label` do payload | string CN dinâmica do servidor | [T('hb.{status}') \|\| T('hb.unknown')](cci:1://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/OfficialPanel.tsx:16:2-18:60) |
| Keys novas | — | 11×role + 11×label + 5×hb = **27 keys** |

> **Zero risco de lógica quebrada**: o cast `as TranslationKey` é só de apresentação — o `o.id`, `o.heartbeat.status` e todo o estado continuam intocados.