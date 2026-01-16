import styled from '@emotion/styled';


export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/assets/images/newsletter-bg.webp');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  padding: 137px 0;

  @media (max-width: 767px) {
    background-image: url('/assets/images/newsletter-mob-bg.webp');
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;

  & h1 {
    text-transform: uppercase;
    margin: 0;
    margin-bottom: 12px;
  }

  
  & p {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5em;
    margin: 0;
  }
`;

export const StyledCard = styled.div`
  width: 849px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;
  background-color: rgba(242, 248, 254, 0.8);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 1024px) {
    width: 498px;
    border-radius: 8px;
    padding: 16px;
    gap: 16px;
  }

  @media (max-width: 767px) {
    width: 271px;
  }
`;

export const LogoWrapper = styled.div`
  width: 92px;
  height: 70px;
  display: flex;
  align-items: center;
`;
