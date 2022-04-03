import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = (code: string): string => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState(0);

  useEffect(() => {
    if (!code) return;

    axios
      .post('/api/auth', { code })
      .then(({ data: { accessToken, refreshToken, expiresIn } }) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setExpiresIn(expiresIn);

        window.history.pushState({}, '', '/dashboard');
      })
      .catch((err) => console.log('Something went wrong!', err));
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post('/api/refresh', { refreshToken })
        .then(({ data: { accessToken, expiresIn } }) => {
          setAccessToken(accessToken);
          setExpiresIn(expiresIn);
        })
        .catch((err) => console.error('Something went wrong!', err));
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};
