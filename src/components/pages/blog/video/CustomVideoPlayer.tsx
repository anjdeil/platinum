import { useRef, useState } from 'react';
import { StyledPlayButton, StyledVideo, StyledVideoContainer } from './styles';
import Image from 'next/image';

type CustomVideoPlayerProps = {
  src: string;
};

export const CustomVideoPlayer = ({ src }: CustomVideoPlayerProps) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef.current as HTMLVideoElement | null;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <StyledVideoContainer>
      <StyledVideo ref={videoRef} src={src} onClick={handlePlayPause} />
      {!isPlaying && (
        <StyledPlayButton onClick={handlePlayPause}>
          <Image
            src="/assets/icons/play.svg"
            alt="Play"
            width={93}
            height={93}
          />
        </StyledPlayButton>
      )}
    </StyledVideoContainer>
  );
};
