import { useAppDispatch, useAppSelector } from "@/store";
import { languageSymbols, setCurrentLanguage } from "@/store/slices/languageSlice";
import CustomSelect from "../../../global/selects/CustomSelect/CustomSelect";

export default function LanguageSelect() {
  const language = useAppSelector((state) => state.languageSlice);
  const dispatch = useAppDispatch();

  const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentLanguage({ code: event.target.value }));
  };

  return (
    <CustomSelect
      options={languageSymbols}
      value={language.symbol}
      onChange={onLanguageChange}
    />
  );
}
