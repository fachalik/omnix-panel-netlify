import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { postLoginGoogle } from '@/service/auth';
import Loading from '@/components/Loading';
import { useAuthStore } from '@/store';
import useHasHydrated from '@/hooks/useHydrate';

export default function Google() {
  const hasHydrated = useHasHydrated();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore((state) => state);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const getToken = async () => {
    const redirect =
      import.meta.env.MODE === 'development'
        ? 'http://localhost:3000/google'
        : 'https://omnix-panel.netlify.app/google';
    await axios
      .post(
        `https://oauth2.googleapis.com/token?code=${code}&client_id=${
          import.meta.env.VITE_APP_GOOGLE_CLIENT_ID
        }&client_secret=${
          import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET
        }&redirect_uri=${redirect}&grant_type=authorization_code`,
        {
          headers: {},
        }
      )
      .then(async (res) => {
        // res.data
        const response = await postLoginGoogle({
          idToken: res.data.id_token,
        });
        await setAuth(response);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        navigate('/');
      });
  };

  React.useEffect(() => {
    let isfetch = true;
    if (isfetch && code && hasHydrated) {
      getToken();
    }
    return () => {
      isfetch = false;
    };
  }, [hasHydrated, code]);

  return <Loading />;
}
