import { Input } from '@/components/global/forms/CustomFormInput/styles';
import styled from '@emotion/styled';

export const StyledSubscribeForm = styled.form`
  position: relative;
  margin-bottom: 16px;

  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 0px;
  }
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
    margin-bottom: 24px;
  }
`;

type StyledSubscribeButtonProps = {
  isdisabled?: boolean;
};
export const StyledSubscribeButton = styled.button<StyledSubscribeButtonProps>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: auto;
  max-width: 45%;
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
  opacity: ${({ isdisabled }) => (isdisabled ? 0.8 : 1)};

  overflow-wrap: break-word;

  &:hover {
    background-color: ${({ theme }) => theme.background.hover};
  }

  @media ${({ theme }) => theme.media.large} {
    height: 48px;
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }

  @media ${({ theme }) => theme.media.medium} {
    position: relative;
    width: 100%;
    max-width: unset;
  }
`;

export const StyledError = styled.p`
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};

  @media ${({ theme }) => theme.media.large} {
    top: 56px;
  }
  @media ${({ theme }) => theme.media.medium} {
    top: 48px;
  }
`;

export const StyledSuccessMessage = styled.p`
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.new};

  @media ${({ theme }) => theme.media.large} {
    top: 48px;
  }

  @media ${({ theme }) => theme.media.medium} {
    position: static;
    padding: 8px 0;
  }
`;