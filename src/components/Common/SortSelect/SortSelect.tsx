import { useEffect, useRef, useState } from "react";
import { Arrow, DropdownMenu, MenuItem, SortSelectStyled } from "./styles";

const SortSelect: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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
            Sort by...
            <Arrow isOpen={isOpen} xmlns="http://www.w3.org/2000/svg" width="24" height="12" viewBox="0 0 24 12" fill="none">
                <g clipPath="url(#clip0_592_17451)">
                    <path d="M17.4198 2.45199L18.4798 3.51299L12.7028 9.29199C12.6102 9.38514 12.5001 9.45907 12.3789 9.50952C12.2576 9.55997 12.1276 9.58594 11.9963 9.58594C11.8649 9.58594 11.7349 9.55997 11.6137 9.50952C11.4924 9.45907 11.3823 9.38514 11.2898 9.29199L5.50977 3.51299L6.56977 2.45299L11.9948 7.87699L17.4198 2.45199Z" fill="black"/>
                </g>
                <defs>
                    <clipPath id="clip0_592_17451">
                        <rect width="12" height="24" fill="white" transform="translate(24) rotate(90)"/>
                    </clipPath>
                </defs>
            </Arrow>
            <DropdownMenu isOpen={isOpen}>
                <MenuItem>Option 1</MenuItem>
                <MenuItem>Option 2</MenuItem>
                <MenuItem>Option 3</MenuItem>
            </DropdownMenu>
        </SortSelectStyled>
    );
}

export default SortSelect;