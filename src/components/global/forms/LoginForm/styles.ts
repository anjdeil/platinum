import styled from '@emotion/styled';
import Link from 'next/link';

export const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 1%;
  gap: 15px;
  padding-bottom: 20px;

  @media ${({ theme }) => theme.media.medium} {
    row-gap: 10px;
  }
`;

export const StyledCheckboxWrapper = styled.div`
  & > div > label {
    display: inline-block;
  }
`;

export const ActiveText = styled(Link)`
  color: ${({ theme }) => ` ${theme.colors.active}`};
  text-decoration: none;
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
  }
`;
