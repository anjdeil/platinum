import { useState, useEffect } from 'react';
import parseCookies from '@/utils/parseCookies';

const useGetAuthToken = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const getAuthToken = () => {
      const cookies = parseCookies(document.cookie);
      return cookies.authToken || null;
    };

    setAuthToken(getAuthToken());

    const handleCookieChange = () => {
      const updatedToken = getAuthToken();
      setAuthToken(updatedToken);
    };

    window.addEventListener('storage', handleCookieChange);

    return () => {
      window.removeEventListener('storage', handleCookieChange);
    };
  }, [document.cookie]);

  return authToken;
};

export default useGetAuthToken;
