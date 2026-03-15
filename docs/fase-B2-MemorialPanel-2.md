### Planner Response

Com prazer! Vamos completar a migração do [MemorialPanel.tsx](cci:7://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/MemorialPanel.tsx:0:0-0:0), focando agora na tradução dinâmica dos **departamentos**, **status operacionais** e **fluxos** que aparecem nos logs.

Como esses termos vêm dos dados (backend/demo), implementarei um sistema de mapeamento para as keys `memorial.department.*` e `memorial.status.*` preservando a lógica de comparação original.

### 1) Atualização dos Locales ([zh.ts](cci:7://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/zh.ts:0:0-0:0) e [en.ts](cci:7://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/en.ts:0:0-0:0))

Vou adicionar as keys solicitadas para departamentos, status e fluxos comuns.

#### No arquivo [edict/frontend/src/i18n/locales/zh.ts](cci:7://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/zh.ts:0:0-0:0):


*Edited relevant file*

### Planner Response

#### No arquivo [edict/frontend/src/i18n/locales/en.ts](cci:7://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/en.ts:0:0-0:0):


*Edited relevant file*

### Planner Response

### 2) Implementação no [MemorialPanel.tsx](cci:7://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/MemorialPanel.tsx:0:0-0:0)

Agora vou atualizar o componente para usar essas novas keys. Vou criar mapeamentos internos para traduzir strings conhecidas que vêm dos dados do log.

Destaques da refatoração:
1.  **Mapeamentos de Dados:** Criarei objetos `DEPT_MAP` e `STATUS_MAP` para converter os termos originais (chinês) em keys i18n.
2.  **Lógica i18n:** Aplicarei o [T()](cci:2://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/zh.ts:520:0-520:45) em todos os pontos onde departamentos ou comentários são exibidos.
3.  **Preservação da Lógica:** As comparações condicionais (ex: `f.from === '皇上'`) continuam usando as strings originais para não quebrar a organização dos logs, mas a exibição será traduzida.



*Edited relevant file*

### Planner Response

### Checklist de Auditoria concluído:

- [x] **Nomes de Departamentos:** Agora são renderizados via [tDept()](cci:1://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/MemorialPanel.tsx:41:2-41:71), que mapeia strings como "工部" ou "中书省" para keys i18n (`memorial.department.*`).
- [x] **Status e Verbos:** A função [tStatus()](cci:1://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/MemorialPanel.tsx:160:2-166:4) traduz termos como "完成", "准奏", "系统初始化完成" etc., mesmo que estejam dentro de frases ou logs.
- [x] **Timeline e Logs:** Todos os campos `from`, `to` e `remark` agora passam pelos helpers de tradução antes de serem exibidos.
- [x] **UI Chrome:** Todos os botões, filtros e rótulos de exportação Markdown já utilizam o sistema de tradução [T()](cci:2://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/i18n/locales/zh.ts:520:0-520:45).
- [x] **Fallbacks:** O sistema mantém o texto original se não encontrar um mapeamento, garantindo que novos departamentos ou mensagens não mapeadas ainda sejam legíveis.

A migração do [MemorialPanel](cci:1://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/MemorialPanel.tsx:34:0-142:1) está completa e robusta contra dados vindos em chinês do backend!