import React, { FC, useState } from 'react';
import { BenefitsLayout, BenefitsTitle, BenefitsPrice, BenefitsItem, BenefitsAccordionStyled, CustomAccordionSummary, AccordionTitle, AccordionHeader, BenefitsInfo, BenefitsAccordionDetails } from './styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';
import { CustomSvgMarker } from '@/components/Common/Icons/CustomSvgMarker/CustomSvgMarker';
import { CustomList } from '@/components/shared/List/List';
import { BenefitsProps } from '@/types/layouts/Benefits';

export function BenefitsAccordion({ gapMedium, gapLg, gapSm }: BenefitsProps) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'expanded' : false);

    const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (<>
        <head>
            <title>LOYALTY PROGRAM</title>
            <meta charSet="utf-8" />
            <meta
                name="description"
                content="The description that i didn't uploaded from data" />
        </head>
        <main>
            <BenefitsLayout gapLg={gapLg} gapMedium={gapLg}>
                <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
                    <AccordionHeader gapMedium={gapMedium}>
                        {/* Add ARIA role for header */}
                        {/* role="heading" aria-level="3" */}
                        <BenefitsPrice>
                            2500 - 5%
                        </BenefitsPrice>

                        <BenefitsTitle>
                            Silver
                        </BenefitsTitle>
                    </AccordionHeader>

                    <BenefitsAccordionStyled
                        expanded={!isMobile || expanded === 'panel1'}
                        onChange={handleChange('panel1')}
                        level="silver"
                    /* Add ARIA region for the accordion, labeled by the heading */
                    /* role="region" aria-labelledby="accordion1-header" */
                    >
                        <CustomAccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            /* Add ARIA-controls for summary expansion */
                            /* aria-controls="accordion1-content" */
                            id="accordion1-header"
                        >
                            <AccordionTitle>Silver Level Benefits</AccordionTitle>
                        </CustomAccordionSummary>
                        <BenefitsAccordionDetails
                            /* Add ARIA-expanded for details visibility */
                            /* aria-expanded={expanded === 'panel1'} */
                            id="accordion1-content"
                        >
                            <CustomList>
                                <li>
                                    <CustomSvgMarker />
                                    <span>Users who have purchased more than 2500 PLN within a year receive a 5% discount on their future purchases.</span>
                                </li>
                                <li><CustomSvgMarker />Enjoy a complimentary welcome gift upon registration.</li>
                                <li><CustomSvgMarker />Take advantage of ongoing discounts available exclusively to registered users.</li>
                            </CustomList>
                        </BenefitsAccordionDetails>
                    </BenefitsAccordionStyled>
                </BenefitsItem>

                <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
                    <AccordionHeader gapMedium={gapMedium}>
                        {/* Add ARIA role for header */}
                        {/* role="heading" aria-level="3" */}
                        <BenefitsPrice>
                            10 000 - 10%
                        </BenefitsPrice>

                        <BenefitsTitle>
                            Gold
                        </BenefitsTitle>
                    </AccordionHeader>

                    <BenefitsAccordionStyled
                        expanded={!isMobile || expanded === 'panel2'}
                        onChange={handleChange('panel2')}
                        level="gold"
                    /* Add ARIA region for the accordion, labeled by the heading */
                    /* role="region" aria-labelledby="accordion2-header" */
                    >
                        <CustomAccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            /* Add ARIA-controls for summary expansion */
                            /* aria-controls="accordion2-content" */
                            id="accordion2-header"
                        >
                            <AccordionTitle>Gold Level Benefits</AccordionTitle>
                        </CustomAccordionSummary>
                        <BenefitsAccordionDetails
                            /* Add ARIA-expanded for details visibility */
                            /* aria-expanded={expanded === 'panel2'} */
                            id="accordion2-content"
                        >
                            <CustomList>
                                <li><CustomSvgMarker color='white' />Once users reach a total of 10,000 PLN in purchases within a year, they qualify for a 10% discount on all future purchases.</li>
                                <li><CustomSvgMarker color='white' />Enjoy complimentary samples of the latest products.</li>
                                <li><CustomSvgMarker color='white' />Receive prioritized assistance from our support team.</li>
                                <li><CustomSvgMarker color='white' />Benefit from an ongoing discount available to Gold level users.</li>
                            </CustomList>
                        </BenefitsAccordionDetails>
                    </BenefitsAccordionStyled>
                </BenefitsItem>

                <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
                    <AccordionHeader gapMedium={gapMedium}>
                        {/* Add ARIA role for header */}
                        {/* role="heading" aria-level="3" */}
                        <BenefitsPrice>
                            20 000 - 15%
                        </BenefitsPrice>

                        <BenefitsTitle>
                            Platinum
                        </BenefitsTitle>
                    </AccordionHeader>

                    <BenefitsAccordionStyled
                        expanded={!isMobile || expanded === 'panel3'}
                        onChange={handleChange('panel3')}
                        level="platinum"
                    /* Add ARIA region for the accordion, labeled by the heading */
                    /* role="region" aria-labelledby="accordion3-header" */
                    >
                        <CustomAccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            /* Add ARIA-controls for summary expansion */
                            /* aria-controls="accordion3-content" */
                            id="accordion3-header"
                        >
                            <AccordionTitle>Platinum Level Benefits</AccordionTitle>
                        </CustomAccordionSummary>
                        <BenefitsAccordionDetails
                            /* Add ARIA-expanded for details visibility */
                            /* aria-expanded={expanded === 'panel3'} */
                            id="accordion3-content"
                        >
                            <CustomList>
                                <li><CustomSvgMarker color='white' />Achieve a total of 20,000 PLN in purchases within a year to enjoy a 15% discount on all future purchases.</li>
                                <li><CustomSvgMarker color='white' />Benefit from complimentary shipping for all orders within Poland.</li>
                                <li><CustomSvgMarker color='white' />Receive top-tier, prioritized assistance from our support team.</li>
                                <li><CustomSvgMarker color='white' />Get exclusive access to free samples of the latest products.</li>
                                <li><CustomSvgMarker color='white' />Enjoy ongoing discounts exclusively available to Platinum level users.</li>
                                <li><CustomSvgMarker color='white' />Enjoy complimentary entry to all our events and activities.</li>
                                <li><CustomSvgMarker color='white' />Access informative and engaging training videos every year.</li>
                            </CustomList>
                        </BenefitsAccordionDetails>
                    </BenefitsAccordionStyled>
                </BenefitsItem>
            </BenefitsLayout>

            <BenefitsInfo>
                {/* Add ARIA role for additional info */}
                {/* role="complementary" */}
                <AccordionTitle>Delivery costs are not included in the purchase calculation.</AccordionTitle>

                <CustomList>
                    <li><CustomSvgMarker />Free delivery within Poland for orders over 200 PLN.</li>
                    <li><CustomSvgMarker />Free delivery to Germany, Austria, Slovakia, Slovenia, Belgium, Hungary, Lithuania, Czech Republic, Denmark, Romania, and Estonia for orders over 150 EUR.</li>
                </CustomList>

            </BenefitsInfo>
        </main>

    </>
    )
}
