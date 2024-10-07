import styled from "@emotion/styled";

export const SliderWrapper = styled.div`
    position: relative;
    padding: 40px 0; 
    width: 13vw; 
    @media ${({ theme }) => theme.media.largePlus} {
      width: 30vw;
    } 
    @media ${({ theme }) => theme.media.medium} {
      width: 50vw;
    } 
    @media ${({ theme }) => theme.media.small} {
      width: 76vw;
    }   
`;
export const Slide = styled.li`
    @media ${({ theme }) => theme.media.medium} {
      text-align: center;
      height:22px;
    } 
    white-space: nowrap; 
`;

export const NavButton = styled.button`
      height:28px;
      color: ${({ theme }) => theme.colors.white};
      width: 100%;
      border: 1px solid ${({ theme }) => theme.colors.secondary};
      border-radius: 20px;
      position: absolute;
      background: none;
      cursor: pointer;
      z-index: 1;

  &.prev {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &.next {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;
