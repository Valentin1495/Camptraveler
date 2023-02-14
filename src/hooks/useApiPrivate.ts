import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { api } from '../api/NFTeamApi';
import { AxiosError } from 'axios';

const useApiPrivate = () => {
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        const prevReq = error.config;
        if (error.response?.status === 403 && prevReq) {
          useRefreshToken().then((newAccessToken) => {
            prevReq.headers['Authorization'] = newAccessToken;
            localStorage.setItem('accessToken', newAccessToken);
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
  }, [accessToken]);

  return api;
};

export default useApiPrivate;
