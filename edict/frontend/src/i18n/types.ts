/**
 * i18n types — feat/i18n-ui
 * TranslationKey is derived from the zh locale so TS catches missing keys at compile time.
 */

export type Lang = 'zh' | 'en';

// TranslationDict is the shape of a locale file.
// TranslationKey is constrained to the keys of zh.ts via `keyof typeof zh` in index.ts.
export type TranslationDict = Record<string, string>;
