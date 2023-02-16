import { toast } from 'react-toastify';
import { logout } from '../api/NFTeamApi';
import { AxiosError } from 'axios';

const useLogout = async () => {
  try {
    const res = await logout();
    if (res.status === 200) {
      localStorage.clear();
      location.replace('/signin');
    }
  } catch (error) {
    const err = error as AxiosError;
    toast.error('Something went wrong ' + err.message);
  }
};

export default useLogout;
