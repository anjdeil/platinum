import { Input } from '@/components/global/forms/CustomFormInput/styles';
import styled from '@emotion/styled';

export const StyledSubscribeForm = styled.form`
  position: relative;
`;

export const StyledSubscribeInput = styled(Input)`
  width: 418px;
  height: 56px;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  background-color: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  outline: none;
  padding: 16px 140px 16px 10px;

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
    padding: 13px 140px 13px 10px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 100%;
    padding: 13px 10px;
    margin-bottom: 16px;
  }
`;

export const StyledSubscribeButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 132px;
  height: 56px;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  padding: 0 16px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.background.hover};
  }

  @media ${({ theme }) => theme.media.large} {
    height: 48px;
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }

  @media ${({ theme }) => theme.media.medium} {
    position: relative;
    width: 239px;
  }
`;

export const StyledError = styled.p`
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.error};
  padding-top: 8px;

  @media ${({ theme }) => theme.media.medium} {
    padding-top: 0;
    padding-bottom: 8px;
  }
`;

export const StyledSuccessMessage = styled.p`
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  font-weight: 600;
  color: ${({ theme }) => theme.background.success};
  padding-top: 8px;

  @media ${({ theme }) => theme.media.medium} {
    padding-top: 0;
    padding-bottom: 8px;
  }
`;