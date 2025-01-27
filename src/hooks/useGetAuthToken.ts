import { useState, useEffect } from 'react';
import parseCookies from '@/utils/parseCookies';

const useGetAuthToken = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const cookies = parseCookies(document.cookie);
    setAuthToken(cookies.authToken || null);
  }, []);

  return authToken;
};

export default useGetAuthToken;
