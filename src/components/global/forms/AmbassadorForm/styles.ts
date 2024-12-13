import styled from '@emotion/styled'

interface InfoCardProps {
  marginBottom?: string
  marginTop?: string
}

export const InfoCard = styled.div<InfoCardProps>`
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '20px')};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  margin: 0 auto;
  padding: 32px;
`
export const ProofSelect = styled.div`
  height: 96px;
`
export const OptionButtonsContainer = styled.div`
  margin-top: 8px;
`
export const OptionButton = styled.button<{ isSelected: boolean }>`
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  text-align: left;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 15px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.secondary : theme.background.formElements};

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
  }
`

export const FileUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  text-align: center;

  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.background.formElements};
  height: 120px;
  & p {
    max-width: 400px;
    & span {
      color: ${({ theme }) => theme.colors.active};
    }
  }
`
export const FileUploadWrapper = styled.div``
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
`
