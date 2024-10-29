import { FC, useCallback, useMemo } from "react";
import React, { useState } from 'react';
import { BenefitsLayout, BenefitsTitle, BenefitsPrice, BenefitsItem, BenefitsAccordionStyled, CustomAccordionSummary, AccordionTitle, AccordionHeader, BenefitsAccordionDetails } from './styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';
import { CustomSvgMarker } from "@/components/global/icons/CustomSvgMarker/CustomSvgMarker";
import { CustomList } from "@/components/global/lists/List";
import { BenefitsProps, loyaltyDescriptionSchema } from '@/types/pages/benefits/index';
import { useAppSelector } from "@/store";
import { CustomListSkeleton } from "../CustomListSkeleton";

const renderDescriptionList = (description: string | undefined, svgColor?: string) => {
    if (!description) return null;

    return description.split('\r\n').map((item, index) => (
        <li key={index}>
            <CustomSvgMarker color={svgColor} /> {item}
        </li>
    ));
};

export const BenefitsAccordion: FC = ({ gapSm, gapMedium, gapLg }: BenefitsProps) => {

    const isMobile = useMediaQuery('(max-width: 768px)');
    const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'expanded' : false);

    const handleChange = useCallback((panel: string) => (_: unknown, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }, []);

    const themeOptions = useAppSelector(state => state.themeOptions);

    const data = useMemo(() => {
        return themeOptions.data.item.loyalty_options;
    }, [themeOptions.data.item.loyalty_options]);

    const validatedData = useMemo(() => {
        try {
            console.log(loyaltyDescriptionSchema.parse(data.lang))
            return loyaltyDescriptionSchema.parse(data.lang);
        } catch (error) {
            console.error("Validation Error:", error);
            return null;
        }
    }, [data.lang]);

    return (
        <BenefitsLayout gapLg={gapLg} gapMedium={gapLg}>
            <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
                <AccordionHeader gapMedium={gapMedium}>
                    <BenefitsPrice>2500 - 5%</BenefitsPrice>
                    <BenefitsTitle as={"h3"}>Silver</BenefitsTitle>
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
                            {
                                validatedData ?
                                    renderDescriptionList(validatedData.silver) :
                                    <li>
                                        <CustomListSkeleton
                                            width={"100%"}
                                            height={"50px"}
                                            elements={3}
                                        />
                                    </li>
                            }
                        </CustomList>
                    </BenefitsAccordionDetails>
                </BenefitsAccordionStyled>
            </BenefitsItem>

            <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
                <AccordionHeader gapMedium={gapMedium}>
                    <BenefitsPrice>10 000 - 10%</BenefitsPrice>
                    <BenefitsTitle as={"h3"}>Gold</BenefitsTitle>
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
                            {
                                validatedData ?
                                    renderDescriptionList(validatedData.gold, "white") :
                                    <li>
                                        <CustomListSkeleton
                                            width={"100%"}
                                            height={"50px"}
                                            elements={4}
                                        />
                                    </li>
                            }
                        </CustomList>
                    </BenefitsAccordionDetails>
                </BenefitsAccordionStyled>
            </BenefitsItem>

            <BenefitsItem gapSm={gapSm} gapMedium={gapMedium}>
                <AccordionHeader gapMedium={gapMedium}>
                    <BenefitsPrice>20 000 - 15%</BenefitsPrice>
                    <BenefitsTitle as={"h3"}>Platinum</BenefitsTitle>
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
                            {
                                validatedData ?
                                    renderDescriptionList(validatedData.platinum, "white") :
                                    <li>
                                        <CustomListSkeleton
                                            width={"100%"}
                                            height={"50px"}
                                            elements={7}
                                        />
                                    </li>
                            }
                        </CustomList>
                    </BenefitsAccordionDetails>
                </BenefitsAccordionStyled>
            </BenefitsItem>
        </BenefitsLayout>
    );
};
