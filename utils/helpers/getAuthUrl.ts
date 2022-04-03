import { CLIENT_ID } from '../../constants/api';

export const getAuthUrl = (redirectUrl: string): string => {
  const scope =
    'user-read-email user-read-private user-top-read user-follow-read playlist-modify-public ugc-image-upload';

  const url = new URL('https://accounts.spotify.com/authorize');
  url.searchParams.append('client_id', CLIENT_ID);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('redirect_uri', redirectUrl);
  url.searchParams.append('scope', scope);

  return url.toString();
};
