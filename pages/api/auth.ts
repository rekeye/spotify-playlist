// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

type Data = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(405);

  const spotifyWebApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  const { code } = req.body;
  if (typeof code !== 'string') return res.status(400);

  spotifyWebApi
    .authorizationCodeGrant(code)
    .then(({ body: { access_token, refresh_token, expires_in } }) =>
      res.status(200).json({ access_token, refresh_token, expires_in })
    )
    .catch((err) => res.status(500).send(err));
}
