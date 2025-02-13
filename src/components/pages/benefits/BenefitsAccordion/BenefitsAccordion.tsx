import { useAppSelector } from '@/store';
import {
  BenefitsProps,
  loyaltyDescriptionSchema,
} from '@/types/components/pages/benefits/benefitsAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';
import { MenuSkeleton } from '../../../menus/MenuSkeleton';
import { BenefitsList } from '../BenefitsList';
import { CustomSvgMarker } from '../CustomSvgMarker';
import {
  AccordionHeader,
  AccordionTitle,
  BenefitsAccordionDetails,
  BenefitsAccordionStyled,
  BenefitsItem,
  BenefitsLayout,
  BenefitsPrice,
  BenefitsTitle,
  CustomAccordionSummary,
} from './styles';

const renderDescriptionList = (
  description: string | undefined,
  svgColor?: string
) => {
  if (!description) return null;

  return description.split('\r\n').map((item, index) => (
    <li
      key={index}
      style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '400' }}
    >
      <CustomSvgMarker color={svgColor} /> {item}
    </li>
  ));
};

export const BenefitsAccordion: FC<BenefitsProps> = ({
  gapSm,
  gapMedium,
  gapLg,
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [expanded, setExpanded] = useState<string | false>(
    !isMobile ? 'expanded' : false
  );

  const handleChange = useCallback(
    (panel: string) => (_: unknown, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  const themeOptions = useAppSelector(state => state.themeOptions);

  const data = useMemo(() => {
    return themeOptions.data.item.loyalty_options;
  }, [themeOptions.data.item.loyalty_options]);

  const validatedData = useMemo(() => {
    if (!data.lang) {
      return null;
    }

    try {
      return loyaltyDescriptionSchema.parse(data.lang);
    } catch (error) {
      console.error('Validation Error:', error);
      return null;
    }
  }, [data.lang]);

  return (
    <BenefitsLayout gapLg={gapLg} gapMedium={gapLg}>
      <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
        <AccordionHeader gapMedium={gapMedium}>
          <BenefitsPrice>2500 - 5%</BenefitsPrice>
          <BenefitsTitle as={'h3'}>Silver</BenefitsTitle>
        </AccordionHeader>
        <BenefitsAccordionStyled
          expanded={!isMobile || expanded === 'panel1'}
          onChange={handleChange('panel1')}
          level="silver"
          role="region"
          aria-labelledby="accordion1-header"
        >
          <CustomAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="accordion1-content"
            id="accordion1-header"
          >
            <AccordionTitle>Silver Level Benefits</AccordionTitle>
          </CustomAccordionSummary>
          <BenefitsAccordionDetails
            className="silver"
            aria-expanded={expanded === 'panel1'}
            id="accordion1-content"
          >
            <BenefitsList>
              {validatedData ? (
                renderDescriptionList(validatedData.silver)
              ) : (
                <li>
                  <MenuSkeleton width={'100%'} height={'50px'} elements={3} />
                </li>
              )}
            </BenefitsList>
          </BenefitsAccordionDetails>
        </BenefitsAccordionStyled>
      </BenefitsItem>

      <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
        <AccordionHeader gapMedium={gapMedium}>
          <BenefitsPrice>10 000 - 10%</BenefitsPrice>
          <BenefitsTitle as={'h3'}>Gold</BenefitsTitle>
        </AccordionHeader>
        <BenefitsAccordionStyled
          expanded={!isMobile || expanded === 'panel2'}
          onChange={handleChange('panel2')}
          level="gold"
          role="region"
          aria-labelledby="accordion2-header"
        >
          <CustomAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="accordion2-content"
            id="accordion2-header"
          >
            <AccordionTitle>Gold Level Benefits</AccordionTitle>
          </CustomAccordionSummary>
          <BenefitsAccordionDetails
            className="gold"
            aria-expanded={expanded === 'panel2'}
            id="accordion2-content"
          >
            <BenefitsList>
              {validatedData ? (
                renderDescriptionList(validatedData.gold, 'white')
              ) : (
                <li>
                  <MenuSkeleton width={'100%'} height={'50px'} elements={4} />
                </li>
              )}
            </BenefitsList>
          </BenefitsAccordionDetails>
        </BenefitsAccordionStyled>
      </BenefitsItem>

      <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
        <AccordionHeader gapMedium={gapMedium}>
          <BenefitsPrice>20 000 - 15%</BenefitsPrice>
          <BenefitsTitle as={'h3'}>Platinum</BenefitsTitle>
        </AccordionHeader>
        <BenefitsAccordionStyled
          expanded={!isMobile || expanded === 'panel3'}
          onChange={handleChange('panel3')}
          level="platinum"
          role="region"
          aria-labelledby="accordion3-header"
        >
          <CustomAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="accordion3-content"
            id="accordion3-header"
          >
            <AccordionTitle>Platinum Level Benefits</AccordionTitle>
          </CustomAccordionSummary>
          <BenefitsAccordionDetails
            className="platinum"
            aria-expanded={expanded === 'panel3'}
            id="accordion3-content"
          >
            <BenefitsList>
              {validatedData ? (
                renderDescriptionList(validatedData.platinum, 'white')
              ) : (
                <li>
                  <MenuSkeleton width={'100%'} height={'50px'} elements={7} />
                </li>
              )}
            </BenefitsList>
          </BenefitsAccordionDetails>
        </BenefitsAccordionStyled>
      </BenefitsItem>
    </BenefitsLayout>
  );
};
