import { useQuery } from '@tanstack/react-query';
import { reissue } from '../api/NFTeamApi';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const setAuth = useAuth()?.setAuth;

  const { data: response } = useQuery({
    queryKey: ['reissue'],
    queryFn: () => reissue(),
    onSuccess: (res) => {
      if (setAuth)
        setAuth((prev) => {
          return {
            ...prev,
            email: res.data.email,
            id: res.data.id,
            profileImageName: res.data.profileImageName,
            accessToken: res.headers.authorization,
            refreshToken: res.headers.refreshtoken,
          };
        });
    },
  });

  return response?.headers.authorization;
};

export default useRefreshToken;
