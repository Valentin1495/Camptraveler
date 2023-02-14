import { reissue } from '../api/NFTeamApi';
import useLogout from './useLogout';

const useRefreshToken = async () => {
  try {
    const res = await reissue();

    localStorage.setItem('accessToken', res.headers.authorization);

    return res.headers.authorization;
  } catch (error) {
    console.error(error);
    // useLogout();
  }
};

export default useRefreshToken;
