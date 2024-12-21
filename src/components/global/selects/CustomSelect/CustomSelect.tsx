import { CustomSelectProps } from "@/types/components/global/selects";
import { useCallback, useEffect, useRef, useState } from "react";
import ArrowIcon from "../../icons/ArrowIcon/ArrowIcon";
import { CustomSelectStyled, MenuItem, StyledCollapse } from "./styles";

export default function CustomSelect({
  options,
  width,
  value,
  onChange,
  borderRadius,
  background,
  padding,
  fontSize,
  mobFontSize,
  mobPadding,
  tabletPadding,
  alignItem,
  paddingOptions,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <CustomSelectStyled
      ref={containerRef}
      onClick={handleToggle}
      isOpen={isOpen}
      width={width}
      borderRadius={borderRadius}
      background={background}
      padding={padding}
      fontSize={fontSize}
      mobFontSize={mobFontSize}
      mobPadding={mobPadding}
      tabletPadding={tabletPadding}
    >
      {value}
      <ArrowIcon isOpen={isOpen} />
      <StyledCollapse in={isOpen} timeout="auto">
        {options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={() =>
              onChange({ target: { value: option.code } } as React.ChangeEvent<HTMLSelectElement>)
            }
            mobFontSize={mobFontSize}
            background={background}
            padding={padding}
            mobPadding={mobPadding}
            tabletPadding={tabletPadding}
            alignItem={alignItem}
            paddingOptions={paddingOptions}
          >
            {option.name}
          </MenuItem>
        ))}
      </StyledCollapse>
    </CustomSelectStyled>
  );
}
