/**
 * zh-types.ts — re-exports TranslationKey from zh.ts so en.ts can import
 * the type without creating a circular dependency through index.ts.
 */
export type { TranslationKey } from './locales/zh';
