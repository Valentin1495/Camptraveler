import axios from 'axios';
import { UserInfo } from '../pages/Register';
import { User } from '../pages/Signin';

export interface ColInfo {
  coinId: string;
  name: string;
  description: string;
  logoImgName: string;
  bannerImgName: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const accessToken = JSON.stringify(localStorage.getItem('accessToken'));
const refreshtoken = JSON.stringify(localStorage.getItem('refreshToken'));

export const signup = ({ email, password, nickname }: UserInfo) =>
  api.post('/api/members', {
    email,
    password,
    nickname,
  });

export const login = ({ email, password }: User) =>
  api.post('/auth/login', {
    email,
    password,
  });

export const logout = () => {
  return api.get('/auth/logout', {
    headers: { refreshtoken },
  });
};

export const reissue = () => {
  return api.get('/auth/reissue', {
    headers: { refreshtoken },
  });
};

export const getUser = (id: string) =>
  api.get('/api/members/' + id).then((res) => res.data);

export const getCollection = (id: string) =>
  api.get(`/api/collections/only/${id}`).then((res) => res.data);

export const createCollection = ({
  coinId,
  name,
  description,
  logoImgName,
  bannerImgName,
}: ColInfo) =>
  api.post(
    '/api/collections',
    {
      coinId,
      name,
      description,
      logoImgName,
      bannerImgName,
    },
    { headers: { Authorization: accessToken } }
  );

export const getHomeCol = (page: number, size: number) =>
  api
    .get(`/api/collections/main?page=${page}&size=${size}`)
    .then((res) => res.data);

export const getItemsPerPage = (id: string, page: number) =>
  api
    .get(`/api/items/collections/${id}?page=${page}&size=15`)
    .then((res) => res.data);

export const search = (keyword: string, page: number) =>
  api
    .get(`/api/search?keyword=${keyword}&page=${page}&size=15`)
    .then((res) => res.data);
