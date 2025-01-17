import styled from '@emotion/styled';

interface CustomFormProps {
  maxWidth?: string;
  border?: boolean;
}

export const CustomForm = styled.form<CustomFormProps>`
  padding: 32px;
  border: ${({ theme, border }) =>
    border ? `1px solid ${theme.colors.lightBorder}` : 'none'};
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
  @media ${({ theme }) => theme.media.middle} {
    padding: 0;
    border: none;
  }
`;

export const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(49%, 1fr));
  column-gap: 1%;
  row-gap: 15px;
  padding-bottom: 20px;

  @media ${({ theme }) => theme.media.medium} {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;

export const FormWrapperBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;
