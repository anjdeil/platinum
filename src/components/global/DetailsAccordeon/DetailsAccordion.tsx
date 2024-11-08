import Collapse from '@mui/material/Collapse';
import { FC, ReactNode, useState } from "react";
import ArrowIcon from "../icons/ArrowIcon/ArrowIcon";
import { DetailsWrapper, SummaryStyled } from "./styles";

interface NotificationPropsType
{
    children: ReactNode,
    summary: string,
}

const DetailsAccordion: FC<NotificationPropsType> = ({ summary, children }) =>
{
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () =>
    {
        setIsOpen(prevState => !prevState);
    };

    return (
        <DetailsWrapper>
            <SummaryStyled onClick={handleToggle}>
                {summary}
                <ArrowIcon isOpen={isOpen} />
            </SummaryStyled>
            <Collapse in={isOpen} timeout={300}>
                {children}
            </Collapse>
        </DetailsWrapper>
    );
};

export default DetailsAccordion;