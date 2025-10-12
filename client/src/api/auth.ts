import axios from 'axios';
import type { IloginForm, IloginRes } from '../type/api/auth.type';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})
  
export const register = async (values: IloginForm): Promise<IloginRes> => {
    return (await api.post('user/register', values)).data;
}
  
export const login = async (values: IloginForm): Promise<IloginRes> => {
    return (await api.post('user/login', values)).data;
}