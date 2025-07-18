import FallbackImage from '@/components/global/FallbackImage/FallbackImage';
import styled from '@emotion/styled';

export const StyledContainer = styled.div`
  box-sizing: content-box;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  overflow: hidden;
  margin: 0 auto;
  padding: 0 108px;
  margin-bottom: 56px;

  @media ${({ theme }) => theme.media.large} {
    padding: 0 60px;
  }

  @media ${({ theme }) => theme.media.medium} {
    padding: 0 20px;
    margin-bottom: 48px;
  }
`;

export const StyledHeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
`;

export const StyledBox = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledHeroImage = styled(FallbackImage)`
  width: 100%;
  height: 477px;
  object-fit: cover;
  border-radius: 20px;

  @media ${({ theme }) => theme.media.large} {
    height: 274px;
  }
`;
