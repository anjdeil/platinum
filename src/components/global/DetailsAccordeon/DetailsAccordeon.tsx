import Collapse from '@mui/material/Collapse';
import { FC, ReactNode, useState } from "react";
import ArrowIcon from "../icons/ArrowIcon/ArrowIcon";
import { DetailsStyled, DetailsWrapper, SummaryStyled } from "./styles";

interface NotificationPropsType {
    children: ReactNode,
    summary: string,
}

const DetailsAccordeon: FC<NotificationPropsType> = ({ summary, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
        setIsOpen(e.currentTarget.open);
    };

    return <DetailsWrapper>
        <DetailsStyled onToggle={handleToggle}>
            <SummaryStyled>
                {summary}
                <ArrowIcon isOpen={isOpen}/>
            </SummaryStyled>
            <Collapse in={isOpen} timeout="auto">
                {children}
            </Collapse>
        </DetailsStyled>
    </DetailsWrapper>;
};

export default DetailsAccordeon;