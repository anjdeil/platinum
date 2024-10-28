import React, { FC, useEffect, useMemo, useState } from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledAccordion, StyledAccordionSummary } from './styles';
import { CustomSingleAccordionType } from '@/types/components/global/accordions/customSingleAccordion';
import { validateCustomSingleAccordion } from '@/utils/zodValidators/validateCustomSingleAccordion';

export const CustomSingleAccordion: FC<CustomSingleAccordionType> = ({ title, children }) =>
{
    const [isPropsValidated, setPropsValidated] = useState(false);

    useEffect(() =>
    {
        const validate = async () =>
        {
            const valid = await validateCustomSingleAccordion(title, children);
            setPropsValidated(valid);
        };
        validate();
    }, [title, children])

    if (!isPropsValidated) return null;

    return (
        <StyledAccordion>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </StyledAccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </StyledAccordion>
    );
};
