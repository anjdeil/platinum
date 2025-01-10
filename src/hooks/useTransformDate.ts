import { useAppSelector } from '@/store';

export function useTransformDate(date: string): string {
  const language = useAppSelector(state => state.languageSlice);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format');
  }

  const languageTransform: Record<string, string> = {
    en: 'en-GB',
    de: 'de-DE',
    pl: 'pl-PL',
    ru: 'ru-RU',
    uk: 'uk-UA',
  };

  const locale = languageTransform[language.code];

  if (!locale) {
    throw new Error(`Unsupported language symbol: ${language.code}`);
  }

  return parsedDate.toLocaleDateString(locale, options);
}
