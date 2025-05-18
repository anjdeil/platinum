import { useEffect, useMemo, useState } from 'react';
import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import {
  StyledBanner,
  StyledCloseWrapper,
  StyledContainer,
  StyledLink,
  StyledPopupBody,
} from './style';
import { useGetThemeOptionsQuery } from '@/store/rtk-queries/wpCustomApi';
import { useRouter } from 'next/router';
import { useResponsive } from '@/hooks/useResponsive';

type Banner = {
  title: string;
  url: string;
  delay: string | number;
  images: {
    [key: string]: {
      desktop: string;
      mobile: string;
    };
  };
};

const InfoPopup: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number | null>(
    null
  );
  const { data: themeOptions } = useGetThemeOptionsQuery();
  const { locale } = useRouter();
  const { isMobile } = useResponsive();

  const visibleBanners = useMemo(() => {
    const rawBanners: Banner[] = themeOptions?.data?.item?.banners || [];

    return rawBanners.filter(banner => {
      const images = banner.images?.[locale ?? ''];
      return images?.desktop || images?.mobile;
    });
  }, [themeOptions, locale]);

  const currentBanner = visibleBanners[currentBannerIndex ?? -1] || null;

  const imageConfig = useMemo(() => {
    if (!currentBanner || !locale) return null;

    const image = currentBanner.images?.[locale];
    if (!image) return null;

    return {
      width: isMobile ? 400 : 800,
      height: isMobile ? 400 / 0.67 : 800 / 1.6,
      imageSrc: isMobile ? image.mobile : image.desktop,
    };
  }, [currentBanner, locale, isMobile]);

  useEffect(() => {
    if (!visibleBanners.length || currentBannerIndex !== null) return;

    const nextIndex = visibleBanners.findIndex(banner => {
      const sessionKey = `info-popup-shown-${banner.title}`;
      return !sessionStorage.getItem(sessionKey);
    });

    if (nextIndex !== -1) {
      const banner = visibleBanners[nextIndex];
      const delayMs =
        Number(banner.delay) > 0 ? Number(banner.delay) * 1000 : 5000;

      const timer = setTimeout(() => {
        setCurrentBannerIndex(nextIndex);
        sessionStorage.setItem(`info-popup-shown-${banner.title}`, 'true');
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [visibleBanners, currentBannerIndex]);

  const handleClosePopup = () => {
    setCurrentBannerIndex(null);
  };

  const handleClickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClosePopup();
    }
  };

  if (currentBannerIndex === null || !imageConfig) return null;

  return (
    <StyledContainer onClick={handleClickBackground}>
      <StyledPopupBody>
        <StyledCloseWrapper>
          <CloseIcon onClick={handleClosePopup} padding="0" color="white" />
        </StyledCloseWrapper>
        <StyledLink href={currentBanner?.url || ''}>
          <StyledBanner
            src={imageConfig?.imageSrc}
            width={imageConfig?.width || 800}
            height={imageConfig?.height || 500}
            alt={currentBanner?.title || ''}
            priority
          />
        </StyledLink>
      </StyledPopupBody>
    </StyledContainer>
  );
};

export default InfoPopup;