import FallbackImage from "@/components/global/FallbackImage/FallbackImage";
import styled from "@emotion/styled";

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

  @media ${({ theme }) => theme.media.xl} {
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.middle} {
    align-items: flex-start;
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledImage = styled(FallbackImage) <StyledImageProps>`
  width: 40%;
  max-width: 524px;
  height: auto;
  object-fit: ${({ objectfitprop = 'contain' }) => objectfitprop};
  aspect-ratio: 1;

  @media ${({ theme }) => theme.media.xl} {
    width: 43%;
  }

  @media ${({ theme }) => theme.media.middle} {
    width: 39%;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 100%;
  }
`;

export const ContentWrapper = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media ${({ theme }) => theme.media.xl} {
    width: 54%;
  }

  @media ${({ theme }) => theme.media.middle} {
    width: 57%;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 100%;
    align-items: center;
  }
`;
