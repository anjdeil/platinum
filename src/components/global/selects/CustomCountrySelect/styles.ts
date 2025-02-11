import styled from '@emotion/styled';
export const CustomSelectInput = styled.div<{ noPaddings?: boolean }>`
  padding: ${({ noPaddings }) => (noPaddings ? '0px' : '5px')};
`;
