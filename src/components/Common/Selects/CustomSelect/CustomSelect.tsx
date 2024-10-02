import { CustomSelectProps } from "@/types/layouts/Select";
import { useCallback, useEffect, useRef, useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon/ArrowIcon";
import { CustomSelectStyled, DropdownMenu, MenuItem } from "./styles";

export default function CustomSelect({
  options,
  value,
  onChange,
  borderRadius,
  background,
  padding,
  fontSize,
  mobFontSize,
  mobPadding,
  tabletPadding,
  allignItem,
  paddingOptions,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
      <CustomSelectStyled
        ref={containerRef}
        onClick={handleToggle}
        isOpen={isOpen}
        borderRadius={borderRadius}
        background={background}
        padding={padding}
        fontSize={fontSize}
        mobFontSize={mobFontSize}
        mobPadding={mobPadding}
        tabletPadding={tabletPadding}
      >
        {value}        
        <ArrowIcon isOpen={isOpen}/>
        <DropdownMenu
          isOpen={isOpen}          
          borderRadius={borderRadius}          
        >
          {options.map(option => (
            <MenuItem
              key={option.code}
              onClick={() => onChange({ target: { value: option.code } } as React.ChangeEvent<HTMLSelectElement>)}
              mobFontSize={mobFontSize}
              background={background}
              padding={padding}
              mobPadding={mobPadding}
              tabletPadding={tabletPadding}
              allignItem={allignItem}
              paddingOptions={paddingOptions}
            >
              {option.symbol}
            </MenuItem>
          ))}
        </DropdownMenu>
      </CustomSelectStyled>
    );
}
