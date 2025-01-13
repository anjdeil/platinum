import React, { FC, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from './styles';
import { CustomSingleAccordionType } from '@/types/components/global/accordions/customSingleAccordion';
import { validateCustomSingleAccordion } from '@/utils/zodValidators/validateCustomSingleAccordion';
import { Title } from '@/styles/components';

export const CustomSingleAccordion: FC<CustomSingleAccordionType> = ({
  title,
  children,
  detailsPadding,
}) => {
  const [isPropsValidated, setPropsValidated] = useState(false);

  useEffect(() => {
    const validate = async () => {
      const valid = await validateCustomSingleAccordion(title, children);
      setPropsValidated(valid);
    };
    validate();
  }, [title, children]);

  if (!isPropsValidated) return null;

  return (
    <StyledAccordion disableGutters>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Title as={'h3'} uppercase fontSize="16px" fontWeight={400}>
          {title}
        </Title>
      </StyledAccordionSummary>
      <StyledAccordionDetails padding={detailsPadding}>
        {children}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};
