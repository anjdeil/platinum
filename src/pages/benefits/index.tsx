import React, { FC, useState } from 'react';
import { BenefitsLayout, BenefitsTitle, BenefitsPrice, BenefitsItem, BenefitsAccordionStyled, CustomAccordionSummary, AccordionTitle, AccordionHeader, BenefitsInfo, BenefitsAccordionDetails } from './styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';
import { CustomSvgMarker } from '@/components/shared/CustomSvgMarker/CustomSvgMarker';
import { CustomList } from '@/components/shared/List/List';

export function BenefitsAccordion() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'expanded' : false);

    const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (<>

        <BenefitsLayout>
            <BenefitsItem>
                <AccordionHeader>
                    <BenefitsPrice>
                        2500 - 5%
                    </BenefitsPrice>

                    <BenefitsTitle>
                        Silver
                    </BenefitsTitle>
                </AccordionHeader>

                <BenefitsAccordionStyled expanded={!isMobile || expanded === 'panel1'} onChange={handleChange('panel1')} level="silver">
                    <CustomAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <AccordionTitle>Silver Level Benefits</AccordionTitle>
                    </CustomAccordionSummary>
                    <BenefitsAccordionDetails>
                        <CustomList>
                            <li><CustomSvgMarker /><span>Users who have purchased more than 2500 PLN within a year receive a 5% discount on their future purchases.</span></li>
                            <li><CustomSvgMarker />Enjoy a complimentary welcome gift upon registration.</li>
                            <li><CustomSvgMarker />Take advantage of ongoing discounts available exclusively to registered users.</li>
                        </CustomList>
                    </BenefitsAccordionDetails>
                </BenefitsAccordionStyled>
            </BenefitsItem>

            <BenefitsItem>
                <AccordionHeader>
                    <BenefitsPrice>
                        10 000 - 10%
                    </BenefitsPrice>

                    <BenefitsTitle>
                        gold
                    </BenefitsTitle>
                </AccordionHeader>

                <BenefitsAccordionStyled expanded={!isMobile || expanded === 'panel2'} onChange={handleChange('panel2')} level="gold">
                    <CustomAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <AccordionTitle>Gold Level Benefits</AccordionTitle>
                    </CustomAccordionSummary>
                    <BenefitsAccordionDetails>
                        <CustomList>
                            <li><CustomSvgMarker color='white' />Once users reach a total of 10,000 PLN in purchases within a year, they qualify for a 10% discount on all future purchases.</li>
                            <li><CustomSvgMarker color='white' />Enjoy complimentary samples of the latest products.</li>
                            <li><CustomSvgMarker color='white' />Receive prioritized assistance from our support team.</li>
                            <li><CustomSvgMarker color='white' />Benefit from an ongoing discount available to Gold level users.</li>
                        </CustomList>
                    </BenefitsAccordionDetails>
                </BenefitsAccordionStyled>
            </BenefitsItem>

            <BenefitsItem>
                <AccordionHeader>
                    <BenefitsPrice>
                        20 000 - 15%
                    </BenefitsPrice>

                    <BenefitsTitle>
                        platinum
                    </BenefitsTitle>
                </AccordionHeader>

                <BenefitsAccordionStyled expanded={!isMobile || expanded === 'panel3'} onChange={handleChange('panel3')} level="platinum">
                    <CustomAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <AccordionTitle>Platinum Level Benefits</AccordionTitle>
                    </CustomAccordionSummary>
                    <BenefitsAccordionDetails>
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
            <AccordionTitle>Delivery costs are not included in the purchase calculation.</AccordionTitle>

            <CustomList>
                <li><CustomSvgMarker />Free delivery within Poland for orders over 200 PLN.</li>
                <li><CustomSvgMarker />Free delivery to Germany, Austria, Slovakia, Slovenia, Belgium, Hungary, Lithuania, Czech Republic, Denmark, Romania, and Estonia for orders over 150 EUR.</li>
            </CustomList>

        </BenefitsInfo>
    </>
    )
}