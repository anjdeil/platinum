import React from 'react';
import { z } from 'zod';

const isValidReactElement = (value: any) => {
  return (
    React.isValidElement(value) ||
    (Array.isArray(value) && value.every(React.isValidElement))
  );
};

export const AccordionPropsSchema = z.object({
  title: z.string(),
  children: z.custom(isValidReactElement, {
    message: 'Children must be valid React components.',
  }),
  titleStyles: z.object({}),
  panel: z.string(),
});

export type AccordionPropsType = z.infer<typeof AccordionPropsSchema>;
