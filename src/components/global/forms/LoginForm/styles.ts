import styled from '@emotion/styled';
import Link from 'next/link';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 1%;
  gap: 15px;
  padding-bottom: 20px;

  @media ${({ theme }) => theme.media.medium} {
    row-gap: 10px;
  }
`;
export const ActiveText = styled(Link)`
  color: ${({ theme }) => ` ${theme.colors.active}`};
`;
