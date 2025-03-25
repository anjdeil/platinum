import { Input } from '@/components/global/forms/CustomFormInput/styles';
import styled from '@emotion/styled';

export const StyledNotifyForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 8px;
  width: 100%;
`;

export const StyledNotifyInput = styled(Input)`
  width: 100%;
  height: 56px;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  background-color: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  outline: none;

  &:hover {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 6px 0 rgba(17, 55, 96, 0.4);
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 6px 0 rgba(17, 55, 96, 0.4);
  }

  @media ${({ theme }) => theme.media.large} {
    height: 48px;
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }
`;

export const StyledNotifyButton = styled.button`
  width: 100%;
  height: 56px;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  padding: 0 16px;
  margin-top: 8px;
  text-decoration: none;
  cursor: pointer;
  overflow-wrap: break-word;

  &:hover {
    background-color: ${({ theme }) => theme.background.hover};
  }

  @media ${({ theme }) => theme.media.large} {
    height: 48px;
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }
`;

export const StyledError = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
  padding-top: 16px;
  align-self: center;

  @media ${({ theme }) => theme.media.medium} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

export const StyledSuccessMessage = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.new};
  padding-top: 16px;
  align-self: center;

  @media ${({ theme }) => theme.media.medium} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;
