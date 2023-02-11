import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { api } from '../api/NFTeamApi';
import { AxiosError } from 'axios';

const useApiPrivate = () => {
  const reissue = useRefreshToken();
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
          const newAccessToken = reissue();
          prevReq.headers['Authorization'] = newAccessToken;
          return api(prevReq);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, reissue]);

  return api;
};

export default useApiPrivate;
