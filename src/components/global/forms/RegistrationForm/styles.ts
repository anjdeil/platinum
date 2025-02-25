import styled from '@emotion/styled';

interface CustomFormProps {
  maxWidth?: string;
}

export const CustomForm = styled.form<CustomFormProps>`
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};

  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '1000px')};
  @media ${({ theme }) => theme.media.middle} {
    margin: 0 auto;
  }
`;

export const StyledFomContainer = styled.div`
  padding: 32px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  margin-bottom: 24px;
`;

export const StyledFieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(49%, 1fr));
  column-gap: 2%;
  align-items: baseline;
  row-gap: 16px;

  @media ${({ theme }) => theme.media.preSmall} {
    display: flex;
    flex-direction: column;
    align-items: normal;
    row-gap: 10px;
  }
`;
