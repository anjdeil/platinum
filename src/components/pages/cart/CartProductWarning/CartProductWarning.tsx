import React from "react";
import { UpdateButton, WarningWrapper } from "./style";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface CartProductWarningProps {
    onUpdate: () => void;
}

const CartProductWarning: React.FC<CartProductWarningProps> = ({ onUpdate }) => {
    return (
        <WarningWrapper>
            <div>
                <ExpandLessIcon />
                <span>This product is not available in selected quantity.</span>
            </div>
            <UpdateButton onClick={onUpdate}>Update</UpdateButton>
        </WarningWrapper>
    );
};

export default CartProductWarning;
