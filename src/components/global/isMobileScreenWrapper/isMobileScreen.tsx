import { useResponsive } from '@/hooks/useResponsive';
import { Container } from '@/styles/components';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const IsMobileScreen: React.FC<Props> = ({ children }) => {
  const { isMobile } = useResponsive();

  return <>{isMobile ? children : <Container>{children}</Container>}</>;
};
