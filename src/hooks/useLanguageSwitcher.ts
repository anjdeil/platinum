import { useRouter } from 'next/router';

type UseLanguageSwitcherResult = {
  switchLanguage: (language: string) => void;
  locale: string | undefined;
};

export default function useLanguageSwitcher(): UseLanguageSwitcherResult {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  const switchLanguage = (language: string) => {
    router.push({ pathname, query }, asPath, { locale: language });
  };

  return {
    switchLanguage,
    locale,
  };
}
