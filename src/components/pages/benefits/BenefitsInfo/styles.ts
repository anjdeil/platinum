import { Box } from '@mui/material';
import styled from '@emotion/styled';

export const BenefitsInfoTitle = styled.h3`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-transform: uppercase;
`;

export const BenefitsInfoWrapper = styled(Box)`
  max-width: 600px;
`;
