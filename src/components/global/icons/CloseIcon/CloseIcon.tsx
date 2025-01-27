import { CloseButton } from "./styles";

export interface CloseProps {
    onClick: () => void;
    padding?: string;
    color?: string
}

const CloseIcon = ({ onClick, padding, color = 'black' }: CloseProps) => (
    <CloseButton color={color} padding={padding} onClick={onClick} aria-label="Close hamburger menu">
        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13M1 1L13 13" stroke="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </CloseButton>
);

export default CloseIcon;