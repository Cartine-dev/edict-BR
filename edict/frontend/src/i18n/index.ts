/**
 * i18n/index.ts — feat/i18n-ui
 *
 * Pure translation function — no React, no store dependency here.
 * Use useT() from './hooks' in React components.
 *
 * Exports:
 *   t(lang, key, vars?)  — pure translation function
 *   TranslationKey       — re-exported for convenience
 */

import zh from './locales/zh';
import en from './locales/en';
import type { Lang } from './types';
import type { TranslationKey } from './locales/zh';

export type { TranslationKey } from './locales/zh';
export type { Lang } from './types';

// ── Locale registry ───────────────────────────────────────────────────────

const dicts: Record<Lang, Record<TranslationKey, string>> = { zh, en };

// ── Core translation function ─────────────────────────────────────────────

/**
 * t(lang, key, vars?) — Translates a key for the given language.
 *
 * - Falls back to 'zh' if the key is missing in the requested locale.
 * - Falls back to the key string itself if missing in both.
 * - Supports {var} interpolation: t('zh', 'app.edicts_count', { n: 3 }) → "3 道旨意"
 */
export function t(
    lang: Lang,
    key: TranslationKey,
    vars?: Record<string, string | number>,
): string {
    const raw: string = dicts[lang]?.[key] ?? dicts['zh'][key] ?? (key as string);
    if (!vars) return raw;
    return Object.entries(vars).reduce(
        (s, [k, v]) => s.replace(`{${k}}`, String(v)),
        raw,
    );
}
