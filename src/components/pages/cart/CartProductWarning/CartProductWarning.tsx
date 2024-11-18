import React from "react";
import { UpdateButton, WarningWrapper } from "./style";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface CartProductWarningProps {
    onUpdate: () => void;
    resolveCount: number | false | undefined;
}

const CartProductWarning: React.FC<CartProductWarningProps> = ({ onUpdate, resolveCount }) => {
    return (
        <WarningWrapper>
            {resolveCount === 0 ?
                (<span>This product is not available.</span>)
                :
                (<>
                    <div>
                        <ExpandLessIcon />
                        <span>This product is not available in selected quantity.</span>
                    </div>
                    <UpdateButton onClick={onUpdate}>Update</UpdateButton>
                </>)}
        </WarningWrapper>
    );
};

export default CartProductWarning;
