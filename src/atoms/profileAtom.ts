import { atom } from 'recoil';

interface Profile {
  id: number;
  profilePic: string;
}

export const profileState = atom<Profile | null>({
  key: 'userInfo',
  default: null,
});
