import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const signup = ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) =>
  api
    .post('/api/members', {
      email,
      password,
      nickname,
    })
    .then((res) => res.data);

export const getCollection = (id: string) =>
  api.get(`/api/collections/only/${id}`).then((res) => res.data);

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
