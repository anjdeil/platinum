import useLanguageSwitcher from "@/hooks/useLanguageSwitcher";
import { SelectOptionsProps } from "@/types/layouts/Select";
import { ChangeEvent } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";

export const languageSymbols: SelectOptionsProps[] = [
    { code: 'en', symbol: 'En' },
    { code: 'pl', symbol: 'PL' },
    { code: 'de', symbol: 'De' },
    { code: 'ru', symbol: 'Ru' },
    { code: 'uk', symbol: 'Ua' },
];

export default function LanguageSelect() {
  const { switchLanguage, locale } = useLanguageSwitcher();

  const currentSymbol = languageSymbols.find(lang => lang.code === locale)?.symbol || '';

  function handleChange(evt: ChangeEvent<HTMLSelectElement>) {
      switchLanguage(evt.target.value);
  }
  
  return (  
    <CustomSelect
      options={languageSymbols} 
      value={currentSymbol}
      onChange={handleChange} 
    />
  );
}
