import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

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
