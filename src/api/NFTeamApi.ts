import axios from 'axios';
import { UserInfo } from '../pages/Register';
import { User } from '../pages/Signin';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

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
  const RefreshToken = localStorage.getItem('refreshToken');
  return api.get('/auth/logout', {
    headers: { RefreshToken },
  });
};

export const reissue = () => {
  const RefreshToken = localStorage.getItem('refreshToken');
  return api.get('/auth/reissue', {
    headers: { RefreshToken },
  });
};

export const getUser = (id: string) =>
  api.get('/api/members/' + id).then((res) => res.data);

export const getUserCols = (id: string) =>
  api.get('/api/members/' + id).then((res) => res.data.collections);

export const getCollection = (id: string) =>
  api.get(`/api/collections/only/${id}`).then((res) => res.data);

export const getHomeAssets = (limit: number) =>
  axios
    .get('https://opensea13.p.rapidapi.com/assets?limit=' + limit, {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_X_RapidAPI_Key,
        'X-RapidAPI-Host': 'opensea13.p.rapidapi.com',
      },
    })
    .then((res) => res.data.assets);

export const getHomeCols = (page: number, per_page: number) =>
  axios
    .get(
      `https://api.unsplash.com/photos?client_id=${
        import.meta.env.VITE_CLIENT_ID
      }&page=${page}&per_page=${per_page}`
    )
    .then((res) => res.data);

export const getItemsPerPage = (id: string, page: number) =>
  api
    .get(`/api/items/collections/${id}?page=${page}&size=15`)
    .then((res) => res.data);

export const search = (keyword: string, page: number) =>
  api
    .get(`/api/search?keyword=${keyword}&page=${page}&size=15`)
    .then((res) => res.data);
