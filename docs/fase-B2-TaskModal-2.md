## Planner Response

Now I can see the exact location. Let me look at the render section for the phase bars:

*Viewed [TaskModal.tsx](file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/TaskModal.tsx) *

### Planner Response

Good, I have all the context I need. Now let me do all three changes in parallel:
1. Add `phase.*` keys to both locale files
2. Update [TaskModal.tsx](cci:7://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/TaskModal.tsx:0:0-0:0) to add `phaseKeyMap` and use [T(key) || p.phase](cci:1://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/TaskModal.tsx:39:0-385:1)

*Edited relevant file*

*Edited relevant file*

### Planner Response

The lint error confirms en.ts is now updated correctly (zh.ts defines the keys, en.ts must mirror them — it's now complete). Now let's update [TaskModal.tsx](cci:7://file:///home/cartine/.openclaw/edict-BR/edict/frontend/src/components/TaskModal.tsx:0:0-0:0) to add the `phaseKeyMap` and use it in the render:

*Edited relevant file*

### Planner Response

Now let's run the build to validate:

*User accepted the command `cd /home/cartine/.openclaw/edict-BR/edict/frontend && npm run build 2>&1`*

*Checked command status*

*Checked command status*