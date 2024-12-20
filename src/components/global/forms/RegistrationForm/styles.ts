import styled from '@emotion/styled';

interface CustomFormProps {
  maxWidth?: string;
}

export const CustomForm = styled.form<CustomFormProps>`
  margin: 0 auto;
  padding: 32px;
  border: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
  border-radius: 10px;
  max-width: ${({ maxWidth = '700px' }) => maxWidth};
  @media ${({ theme }) => theme.media.medium} {
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
  gap: 20px;
`;
