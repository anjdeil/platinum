import React from "react";
import { z } from "zod";

const isValidReactElement = (value: any) => {
    return React.isValidElement(value) || (Array.isArray(value) && value.every(React.isValidElement));
};

export const CustomSingleAccordionSchema = z.object({
    title: z.string(),
    detailsPadding: z.string().optional(),
    children: z.custom(isValidReactElement, {
        message: "Children must be valid React components.",
    })
});
export const StyledAccordionDetailsSchema = z.object({
    padding: z.string().optional(),
});

export type CustomSingleAccordionType = z.infer<typeof CustomSingleAccordionSchema>;
export type StyledAccordionDetailsProps = z.infer<typeof StyledAccordionDetailsSchema>;