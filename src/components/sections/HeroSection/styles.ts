import styled from "@emotion/styled";
import Image from "next/image";

interface StyledImageProps {
  objectfitprop?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 125px;

  @media ${({ theme }) => theme.media.largePlus} {
    align-items: flex-start;
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledImage = styled(Image)<StyledImageProps>`
  object-fit: ${({ objectfitprop = "contain" }) => objectfitprop};
  width: 524px;
  height: auto;
  aspect-ratio: 1;

  @media ${({ theme }) => theme.media.large} {
    width: 284px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 300px;
  }
`;

export const ContentWrapper = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media ${({ theme }) => theme.media.largePlus} {
    width: 57%;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 300px;
    align-items: center;
  }
`;
