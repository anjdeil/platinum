import styled from '@emotion/styled';

export const StyledCountrySelect = styled.div`
  align-self: flex-end;
`;

export const FileUploadLabel = styled.label<{ isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  text-align: center;
  margin-bottom: 5px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme, isDragging }) =>
    isDragging ? theme.colors.secondary : theme.background.formElements};
  color: ${({ theme, isDragging }) => isDragging && theme.colors.white};
  min-height: 120px;
  transition: background-color 0.3s;
  & p {
    max-width: 400px;
    & span {
      color: ${({ theme, isDragging }) =>
        isDragging ? theme.colors.white : theme.colors.active};
    }
  }
`;
export const FileUploadWrapper = styled.div``;
export const FileUploadPreview = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  & img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
