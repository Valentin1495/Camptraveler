import { logout } from '../api/NFTeamApi';

const useLogout = async () => {
  try {
    const res = await logout();
    if (res.status === 200) {
      localStorage.clear();
      location.replace('/');
    }
  } catch (error) {
    console.error(error);
  }
};

export default useLogout;
