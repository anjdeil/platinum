import { StyledButton, Title } from "@/styles/components";
import styled from "@emotion/styled";

interface CouponTextProps {
  uppercase?: boolean;
  marginBottom?: string;
}

export const CartSummaryBlockWrapper = styled.div`
  display: flex;
  align-items: top;
  gap: 75px;
  @media ${({ theme }) => theme.media.large} {
    flex-direction: column;
  }
`;
export const CartCommentsWrapper = styled.div`
  display: flex;
  flex: 7;
  flex-direction: column;
  height: 100%;
  @media ${({ theme }) => theme.media.large} {
    padding-right: 32px;
  }
`;
export const CartSummaryWrapper = styled.div`
  flex: 4.4;
`;

export const CartSummaryCard = styled.div`
  padding: 24px 35px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: none;
  margin-bottom: 16px;
`;
export const CartCommentInput = styled.textarea`
  min-height: 178px;
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.background.secondary};

  & placeholder {
    text-align: left;
    align-items: center;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    color: ${({ theme }) => theme.colors.grey};
  }
  outline: 1px solid ${({ theme }) => theme.background.formElements};
  background-color: ${({ theme }) => theme.background.formElements};
  transition: outline-width 0.2s ease-in-out;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
  }

  @media ${({ theme }) => theme.media.large} {
    max-width: none;
    min-height: 100px;
  }
`;

export const CartSummaryTitleWrapper = styled.div`
  margin-bottom: 24px;
  @media ${({ theme }) => theme.media.large} {
    background: ${({ theme }) => theme.background.secondary};
    padding: 16px 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-bottom: 0px;
  }
`;
export const CartCommentsTitle = styled(Title)`
  margin-bottom: 24px;
  @media ${({ theme }) => theme.media.large} {
    margin-bottom: 16px;
  }
`;
export const CartCommentHint = styled.p`
  padding-top: 6px;
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
`;
