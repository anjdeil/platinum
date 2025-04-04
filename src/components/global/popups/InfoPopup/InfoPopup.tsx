import { useEffect, useState } from 'react';
import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import {
  StyledBanner,
  StyledCloseWrapper,
  StyledContainer,
  StyledLink,
  StyledPopupBody,
} from './style';
import { useGetThemeOptionsQuery } from '@/store/rtk-queries/wpCustomApi';

const InfoPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const { data: themeOptions } = useGetThemeOptionsQuery();

  const SESSION_KEY = 'info-popup-shown-this-session';

  const firstBanner = themeOptions?.data?.item?.banners?.find(
    (banner: { _type: string }) => banner._type === '_'
  );

  useEffect(() => {
    if (!themeOptions) return;

    const POPUP_DELAY_MS = firstBanner?.delay
      ? +firstBanner.delay * 1000
      : 1000;

    const alreadyShown = sessionStorage.getItem(SESSION_KEY);

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem(SESSION_KEY, 'true');
      }, POPUP_DELAY_MS);

      return () => clearTimeout(timer);
    }
  }, [themeOptions]);

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

  return (
    <StyledContainer onClick={handleClickBackground}>
      <StyledPopupBody>
        <StyledCloseWrapper>
          <CloseIcon onClick={handleClosePopup} padding="0" />
        </StyledCloseWrapper>
        <StyledLink href={firstBanner?.url} target="_blank">
          <StyledBanner
            src={firstBanner?.image || '/assets/images/no-image.jpg'}
            width={700}
            height={288}
            alt={firstBanner?.title || ''}
            priority
          />
        </StyledLink>
      </StyledPopupBody>
    </StyledContainer>
  );
};

export default InfoPopup;
