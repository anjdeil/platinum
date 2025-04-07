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

const InfoPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { data: themeOptions } = useGetThemeOptionsQuery();
  const { locale } = useRouter();
  const { isMobile } = useResponsive();

  const SESSION_KEY = 'info-popup-shown-this-session';

  const firstBanner = themeOptions?.data?.item?.banners?.find(
    (banner: { title: string }) => banner.title === 'First banner'
  );

  const imageConfig = useMemo(() => {
    if (!firstBanner || !locale) return null;

    const image = firstBanner.images?.[locale];
    if (!image) return null;

    return {
      width: isMobile ? 400 : 800,
      height: isMobile ? 400 / 0.67 : 800 / 1.6,
      imageSrc: isMobile ? image.mobile : image.desktop,
    };
  }, [firstBanner, locale, isMobile]);

  useEffect(() => {
    if (!themeOptions) return;

    const POPUP_DELAY_MS = firstBanner?.delay
      ? +firstBanner.delay * 1000
      : 5000;

    const alreadyShown = sessionStorage.getItem(SESSION_KEY);

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem(SESSION_KEY, 'true');
      }, POPUP_DELAY_MS);

      return () => clearTimeout(timer);
    }
  }, [themeOptions, locale]);

  if (!showPopup) return null;

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  const handleClickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClosePopup();
    }
  };

  // Functionality with the ability to change the frequency

  // const POPUP_STORAGE_KEY = 'info-popup-last-shown';
  // const POPUP_REPEAT_DELAY_MS = 5000;
  // const POPUP_CHECK_INTERVAL_MS = 60 * 1000;
  // const checkAndShowPopup = () => {
  //   const lastShown = localStorage.getItem(POPUP_STORAGE_KEY);
  //   const now = Date.now();

  //   if (!lastShown || now - parseInt(lastShown) > POPUP_REPEAT_DELAY_MS) {
  //     setShowPopup(true);
  //     localStorage.setItem(POPUP_STORAGE_KEY, now.toString());
  //   }
  // };

  // useEffect(() => {
  //   const delayTimer = setTimeout(() => {
  //     checkAndShowPopup();
  //   }, POPUP_DELAY_MS);

  //   const interval = setInterval(() => {
  //     checkAndShowPopup();
  //   }, POPUP_CHECK_INTERVAL_MS);

  //   return () => {
  //     clearTimeout(delayTimer);
  //     clearInterval(interval);
  //   };
  // }, []);

  if (!imageConfig) return null;

  return (
    <StyledContainer onClick={handleClickBackground}>
      <StyledPopupBody>
        <StyledCloseWrapper>
          <CloseIcon onClick={handleClosePopup} padding="0" color="white" />
        </StyledCloseWrapper>
        <StyledLink href={firstBanner?.url} target="_blank">
          <StyledBanner
            src={imageConfig?.imageSrc}
            width={imageConfig?.width || 800}
            height={imageConfig?.height || 500}
            alt={firstBanner?.title || ''}
            priority
          />
        </StyledLink>
      </StyledPopupBody>
    </StyledContainer>
  );
};

export default InfoPopup;
