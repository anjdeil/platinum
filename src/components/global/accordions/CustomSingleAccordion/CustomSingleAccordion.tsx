import React, { FC, useEffect, useMemo, useState } from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledAccordion, StyledAccordionSummary } from './styles';
import { CustomSingleAccordionType } from '@/types/components/global/accordions/customSingleAccordion';
import { validateCustomSingleAccordion } from '@/utils/zodValidators/validateCustomSingleAccordion';
import { Title } from '@/styles/components';

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
                <Title as={'h3'} uppercase fontSize='16px' fontWeight={400}>{title}</Title>
            </StyledAccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </StyledAccordion>
    );
};
