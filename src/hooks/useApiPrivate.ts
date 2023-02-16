import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { api } from '../api/NFTeamApi';

const useApiPrivate = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (!config.headers['authorization']) {
          config.headers['authorization'] = accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (res) => res,
      (error) => {
        const prevReq = error.config;
        if (error.response.status === 403 && !prevReq.sent) {
          prevReq.sent = true;
          useRefreshToken().then((newAccessToken) => {
            prevReq.headers['authorization'] = newAccessToken;
            localStorage.setItem('accessToken', newAccessToken);
            // window.location.reload();
          });

          return api(prevReq);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return api;
};

export default useApiPrivate;
