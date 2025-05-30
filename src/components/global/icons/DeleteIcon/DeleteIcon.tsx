import { CloseButton } from "./styles";

interface CloseProps {
    onClick: () => void;
}

const DeleteIcon = ({ onClick }: CloseProps) => (
    <CloseButton onClick={onClick} aria-label="delete product">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L1 9M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </CloseButton>
);

export default DeleteIcon;