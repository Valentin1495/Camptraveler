import { useQuery } from '@tanstack/react-query';
import { reissue } from '../api/NFTeamApi';

const useRefreshToken = () => {
  const { data: response } = useQuery({
    queryKey: ['reissue'],
    queryFn: () => reissue(),
    onSuccess: (res) => {
      localStorage.setItem('accessToken', res.headers.authorization);
    },
  });

  return response?.headers.authorization;
};

export default useRefreshToken;
