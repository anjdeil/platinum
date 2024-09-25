import { SortSelectProps } from "@/types/layouts/SortSelect";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import ArrowIcon from "../Icons/ArrowIcon/ArrowIcon";
import { DropdownMenu, MenuItem, SortSelectStyled } from "./styles";

const SortSelect: React.FC<SortSelectProps> = ({ list }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Product");

    const handleToggle = () => setIsOpen(!isOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <SortSelectStyled ref={containerRef} onClick={handleToggle} isOpen={isOpen}>
            {t("sortBy")}...           
            <ArrowIcon isOpen={isOpen} />
            <DropdownMenu isOpen={isOpen}>
                {list.map(item => (
                    <MenuItem key={item}>{item}</MenuItem>
                ))}
            </DropdownMenu>
        </SortSelectStyled>
    );
}

export default SortSelect;