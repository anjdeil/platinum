import { useAppDispatch, useAppSelector } from "@/store";
import { languageSymbols, setCurrentLanguage } from "@/store/slices/languageSlice";
import { SelectChangeEvent } from "@mui/material";
import CustomSelect from "../CustomSelect/CustomSelect";

export default function LanguageSelect() {
  const language = useAppSelector((state) => state.currentLanguage);
  const dispatch = useAppDispatch();

  const onLanguageChange = (event: SelectChangeEvent) => {
    dispatch(setCurrentLanguage({ code: event.target.value }));
  };

  return (  
    <CustomSelect 
      options={languageSymbols} 
      value={language.code} 
      onChange={onLanguageChange} 
    />
  );
}
