export type Language = 'en' | 'ja';

export interface LanguageInfo {
  locale: string;
  language: Language;
  label: string;
}

const languages: Record<Language, LanguageInfo> = {
  en: { locale: 'en', language: 'en', label: 'English' },
  ja: { locale: 'ja-JP', language: 'ja', label: '日本語' },
};

export default languages;
