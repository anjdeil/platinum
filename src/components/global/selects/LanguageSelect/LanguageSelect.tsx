import useLanguageSwitcher from "@/hooks/useLanguageSwitcher";
import { languageSymbols } from "@/store/slices/languageSlice";
import { ChangeEvent } from "react";
import CustomSelect from "../../../global/selects/CustomSelect/CustomSelect";

export default function LanguageSelect() {
  const { switchLanguage, locale } = useLanguageSwitcher();

  function handleChange(evt: ChangeEvent<HTMLSelectElement>) {
      switchLanguage(evt.target.value);
  }

  return (
    <CustomSelect
      options={languageSymbols}
      value={locale}
      onChange={handleChange}
    />
  );
}
