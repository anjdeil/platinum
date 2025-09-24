import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';

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
  const [imgSrc, setImgSrc] = useState<string>(`${src}.webp`);

  return <Image {...props} className={className} src={imgSrc} alt={alt} priority={priority} loading={priority ? 'eager' : 'lazy'} onError={() => setImgSrc(fallback || src)} />;
};

export default FallbackImage;
