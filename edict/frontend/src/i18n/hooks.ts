/**
 * i18n/hooks.ts — feat/i18n-ui
 *
 * React hook(s) for i18n. Kept separate from index.ts to avoid
 * circular dependencies (index.ts is pure; store.ts imports only types).
 */

import { useStore } from '../store';
import { t } from './index';
import type { TranslationKey, Lang } from './index';

/**
 * useT() — Returns a bound translation function for the current language.
 *
 * No React Context. Reads `language` from Zustand store directly.
 *
 * Usage:
 *   const T = useT();
 *   <span>{T('app.title')}</span>
 *   <span>{T('app.edicts_count', { n: count })}</span>
 *
 * The returned function is stable across renders when language doesn't change
 * (same Zustand selector pattern as the rest of the app).
 */
export function useT() {
    const lang = useStore((s) => s.language) as Lang;
    return (key: TranslationKey, vars?: Record<string, string | number>) =>
        t(lang, key, vars);
}
