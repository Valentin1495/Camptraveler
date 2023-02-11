import { useQuery } from '@tanstack/react-query';
import { logout } from '../api/NFTeamApi';

const useLogout = () => {
  useQuery({
    queryKey: ['logout'],
    queryFn: () => logout(),
    onSuccess: () => localStorage.clear(),
    onError: (err: Error) => console.error(err),
  });
};

export default useLogout;
