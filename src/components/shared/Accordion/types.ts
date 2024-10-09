import { z } from 'zod';
//AccordionDetails
//AccordionSummary
//AccordionTitle

export const accordionPropsSchema = z.object({
  title: z.string(),
  children: z.any(),
  /* expandedIcon: z.elementType,
  collapsedIcon: z.elementType, */
  titleStyles: z.object({
    color: z.string().optional(),
    font: z.string().optional(),
    
  }).optional(),

  panel: z.string(),

});

export type AccordionProps = z.infer<typeof accordionPropsSchema>;
