import { CustomSelectProps } from "@/types/layouts/Select";
import { useCallback, useEffect, useRef, useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon/ArrowIcon";
import { DropdownMenu, MenuItem, SortSelectStyled, StyledSelect } from "./styles";

export default function CustomSelect({ options, value, onChange }: CustomSelectProps) {
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
      <SortSelectStyled ref={containerRef} onClick={handleToggle} isOpen={isOpen}>
        {value}
        <StyledSelect
          value={value}
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
        >
          {options.map(option => (
            <option key={option.code} value={option.code}>
              {option.symbol}
            </option>
          ))}
        </StyledSelect>
        <ArrowIcon isOpen={isOpen} />
        <DropdownMenu isOpen={isOpen}>
          {options.map(option => (
            <MenuItem key={option.code} onClick={() => onChange({ target: { value: option.code } } as React.ChangeEvent<HTMLSelectElement>)}>
              {option.symbol}
            </MenuItem>
          ))}
        </DropdownMenu>
      </SortSelectStyled>
    );
}
