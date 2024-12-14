import { StyledButton } from '@/styles/components'
import styled from '@emotion/styled'

export const FormWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 22px 22px 38px 22px;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 16px;
`

export const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 17px;
  margin-bottom: 12px;
  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
    align-items: center;
  }
`
export const ContactsStyledButton = styled(StyledButton)`
  margin-top: 16px;
`
