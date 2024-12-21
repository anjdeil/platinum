import styled from '@emotion/styled';

export const StyledVideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
`;

export const StyledVideo = styled.video`
  display: block;
  width: 100%;
  height: 477px;
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;

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
