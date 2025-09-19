import Image, { ImageProps } from 'next/image';
import React, { useEffect, useState } from 'react';

interface FallbackImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallback?: string;
  webp?: boolean;
  className?: string;
}

const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  fallback,
  webp = true,
  alt,
  className,
  priority,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>();

  useEffect(() => {
    if (!webp || !src) {
      setImgSrc(src);
      return;
    }

    const webpSrc = `${src}.webp`;
    const img = new window.Image();

    img.onload = () => setImgSrc(webpSrc);
    img.onerror = () => setImgSrc(fallback || src);

    img.src = webpSrc;
  }, [src, fallback, webp]);

  if (!imgSrc) return null;

  return <Image {...props} className={className} src={imgSrc} alt={alt} priority={priority} loading={priority ? 'eager' : 'lazy'} />;
};

export default FallbackImage;
