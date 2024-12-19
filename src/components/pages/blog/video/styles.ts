import styled from '@emotion/styled';

export const StyledVideoContainer = styled.div`
  position: relative;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
`;

export const StyledVideo = styled.video`
  display: block;
  height: 477px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  object-fit: contain;

  @media ${({ theme }) => theme.media.large} {
    height: 291px;
  }
`;

export const StyledPlayButton = styled.button`
  position: absolute;
  width: 93px;
  height: 93px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
