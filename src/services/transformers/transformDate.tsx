import { useAppSelector } from "@/store";

export function transformDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const parsedDate = new Date(date);
  const language = useAppSelector((state) => state.languageSlice);

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format');
  }

  const languageTransform: Record<string, string> = {
    'En': "en-GB",
    'De': "de-DE",
    'Pl': "pl-PL",
    'Ru': "ru-RU",
    'Ua': "uk-UA",
  }

  const locale = languageTransform[language.symbol];

  if (!locale) {
    throw new Error(`Unsupported language symbol: ${language.symbol}`);
  }

  const formattedDate = parsedDate.toLocaleDateString(locale, options);

  return formattedDate;
}
