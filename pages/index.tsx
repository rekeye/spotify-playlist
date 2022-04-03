import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { URLSearchParams } from 'url';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { getAuthUrl } from '../utils/helpers/getAuthUrl';
import { useAuth } from '../utils/hooks/useAuth';

const Login: NextPage = () => {
  const authUrl = useRef('');
  const [code, setCode] = useState('');
  const newAccessToken = useAuth(code);

  useEffect(() => {
    const redirectUrl = window.location.href;
    authUrl.current = getAuthUrl(redirectUrl);
  }, []);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;

    setCode(code);

    const storedAccessToken = sessionStorage.getItem('accessToken');
    if (storedAccessToken) {
      sessionStorage.setItem('accessToken', storedAccessToken);
    } else {
      sessionStorage.setItem('accessToken', newAccessToken && newAccessToken);
    }
  }, [newAccessToken]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify Puppy</title>
        <meta name='description' content='Create your doggo playlist' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Spotify Puppy 🐕</h1>
        <a href={authUrl.current}>
          <button className={styles.button}>Login with spotify</button>
        </a>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Login;
