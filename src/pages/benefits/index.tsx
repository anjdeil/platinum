import React, { FC, useEffect, useState } from 'react';
import { BenefitsLayout, BenefitsTitle, BenefitsPrice, BenefitsItem, BenefitsAccordionStyled, CustomAccordionSummary, AccordionTitle, AccordionHeader, BenefitsInfo, BenefitsAccordionDetails } from './styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';
import { CustomSvgMarker } from '@/components/Common/Icons/CustomSvgMarker/CustomSvgMarker';
import { CustomList } from '@/components/shared/List/List';
import { BenefitsProps, loyaltyDescriptionSchema } from '@/types/layouts/Benefits';
import { useAppSelector } from "@/store";
import { z } from 'zod';

export function BenefitsAccordion({ gapMedium, gapLg, gapSm }: BenefitsProps) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'expanded' : false);

    const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const themeOptions = useAppSelector(state => state.themeOptions);

    const data = themeOptions.data.item.loyalty_options;

    if (data) {
        console.log(data)
    }

    const validateLoyaltyData = (data: any) => {
        try {
            const parsedData = loyaltyDescriptionSchema.parse(data.lang);
            return parsedData;
        } catch (error) {
            console.error("Validation Error:", error);
            return null;
        }
    };

    const validatedData = validateLoyaltyData(data);

    const renderDescriptionList = (description: string | undefined, svgColor = "#1E71BE") => {
        if (!description) return null;

        return description.split('\r\n').map((item, index) => (
            <li key={index}>
                <CustomSvgMarker color={svgColor} /> {item}
            </li>
        ));
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
                        <BenefitsPrice>2500 - 5%</BenefitsPrice>
                        <BenefitsTitle as={"h3"} fontSize={48}>Silver</BenefitsTitle>
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
                            aria-expanded={expanded === 'panel1'}
                            id="accordion1-content"
                        >
                            <CustomList>
                                {validatedData && renderDescriptionList(validatedData.silver)}
                            </CustomList>

                        </BenefitsAccordionDetails>
                    </BenefitsAccordionStyled>
                </BenefitsItem>

                <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
                    <AccordionHeader gapMedium={gapMedium}>
                        <BenefitsPrice>10 000 - 10%</BenefitsPrice>
                        <BenefitsTitle as={"h3"} fontSize={48}>Gold</BenefitsTitle>
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
                            aria-expanded={expanded === 'panel2'}
                            id="accordion2-content"
                        >
                            <CustomList>
                                {validatedData && renderDescriptionList(validatedData.gold, "white")}
                            </CustomList>

                        </BenefitsAccordionDetails>
                    </BenefitsAccordionStyled>
                </BenefitsItem>

                <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
                    <AccordionHeader gapMedium={gapMedium}>
                        <BenefitsPrice>20 000 - 15%</BenefitsPrice>
                        <BenefitsTitle as={"h3"} fontSize={48}>Platinum</BenefitsTitle>
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
                            aria-expanded={expanded === 'panel3'}
                            id="accordion3-content"
                        >
                            <CustomList>
                                {validatedData && renderDescriptionList(validatedData.platinum, "white")}
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
        </main>
    </>
    );
}
