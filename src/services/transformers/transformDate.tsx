import { useAppSelector } from "@/store";

export function transformDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const parsedDate = new Date(date);
  const language = useAppSelector((state) => state.languageSlice);

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format');
  }

  const languageTransform: Record<string, string> = {
    'en': "en-GB",
    'de': "de-DE",
    'pl': "pl-PL",
    'ru': "ru-RU",
    'uk': "uk-UA",
  }

  const locale = languageTransform[language.code];

  if (!locale) {
    throw new Error(`Unsupported language symbol: ${language.code}`);
  }

  const formattedDate = parsedDate.toLocaleDateString(locale, options);

  return formattedDate;
}
