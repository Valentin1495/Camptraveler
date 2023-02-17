import { reissue } from '../api/NFTeamApi';
import useLogout from './useLogout';

const useRefreshToken = async () => {
  try {
    const res = await reissue();

    return res.headers.authorization;
  } catch (error) {
    console.error(error);
    useLogout();
  }
};

export default useRefreshToken;
