import React, { FC, useState } from 'react';
import { AccordionDetails, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionTitle,
  CustomAccordionStyled,
  CustomAccordionSummary,
} from './styles';
import { AccordionPropsType } from '@/types/components/pages/benefits/customAccordion';

const CustomAccordion: FC<AccordionPropsType> = ({
  title,
  children,
  /* expandedIcon: ExpandedIcon, collapsedIcon: CollapsedIcon, */
  titleStyles,
  panel,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [expanded, setExpanded] = useState<string | false>(
    !isMobile ? panel : false
  );
  const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <CustomAccordionStyled
      expanded={!isMobile || expanded === panel}
      onChange={handleChange('panel1')}
    >
      <CustomAccordionSummary
        /*  expandIcon={expanded ? <ExpandedIcon /> : <CollapsedIcon />} */
        expandIcon={<ExpandMoreIcon />}
      >
        <AccordionTitle style={titleStyles}>{title}</AccordionTitle>
      </CustomAccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </CustomAccordionStyled>
  );
};

/* CustomAccordion.defaultProps = {
  expandedIcon: ExpandMoreIcon,
  collapsedIcon: ExpandMoreIcon,
}; */
export default CustomAccordion;
