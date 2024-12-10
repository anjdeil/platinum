import { StyledButton } from "@/styles/components";
import styled from "@emotion/styled";

interface CouponTextProps {
  uppercase?: boolean;
  marginBottom?: string;
}

export const CouponBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  gap: 16px;
  padding: 16px;
  margin: 16px 0;
`;

export const CouponText = styled.p<CouponTextProps>`
  text-align: center;
  margin-bottom: ${({ marginBottom = "0" }) => marginBottom};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};

  & span {
    color: ${({ theme }) => theme.colors.active};
  }
`;
export const CouponForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
    gap: 12px;
  }
`;

export const CouponInput = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  border-radius: 4px;
  margin-right: 8px;
`;

export const CouponButton = styled(StyledButton)`
  max-width: 308px;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  @media ${({ theme }) => theme.media.medium} {
    max-width: none;
  }
`;
export const CouponError = styled.div`
  color: ${({ theme }) => theme.colors.error};
`;
export const CouponSuccess = styled.div`
  color: ${({ theme }) => theme.colors.active};
`;
