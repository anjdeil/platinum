import { z } from 'zod';
import { StyledList } from './styles';
import React from 'react';

const ChildrenSchema = z.array(
  z.object({
    type: z.literal('li'),
  })
);

type BenefitsListProps = {
  children: React.ReactNode;
};

export const BenefitsList: React.FC<BenefitsListProps> = ({ children }) => {
  const result = ChildrenSchema.safeParse(React.Children.toArray(children));

  if (!result.success) {
    console.error('Children must be only <li> elements.');
    return null;
  }

  return <StyledList>{children}</StyledList>;
};
