import { useAppDispatch } from '@/store';
import {
  languageSymbols,
  setCurrentLanguage,
} from '@/store/slices/languageSlice';
import { useRouter } from 'next/router';

type UseLanguageSwitcherResult = {
  switchLanguage: (language: string) => void;
  locale: string | undefined;
};

export default function useLanguageSwitcher(): UseLanguageSwitcherResult {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { locale, pathname, query, asPath } = router;

  const switchLanguage = (language: string) => {
    const defaultLanguage = router.defaultLocale || 'pl';
    const currentLanguage =
      languageSymbols.find(lang => lang.code === language)?.name ||
      defaultLanguage;
    dispatch(setCurrentLanguage({ name: currentLanguage }));
    router.push({ pathname, query }, asPath, { locale: language });
  };

  return {
    switchLanguage,
    locale,
  };
}
