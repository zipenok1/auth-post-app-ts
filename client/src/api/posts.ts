import axios from 'axios'
import type { IPostsData, IPostsRes } from '../type/api/posts.type';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const getPosts = async (): Promise<IPostsRes[]> => {
    return (await api.get('posts/')).data;
}
  
export const postPosts = async (values: IPostsData) => {
    return (await api.post('posts/', values)).data;
}
  
export const updatePosts = async (id: number, values: IPostsData): Promise<IPostsRes> => {
    return (await api.put(`posts/${id}`, values)).data;
}
  
export const deletePosts = async (id: number) => {
    return (await api.delete(`posts/${id}`)).data;
}