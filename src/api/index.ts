import request from '@/api/axios';

const API_BASENAME = process.env.API_BASENAME;

export const getTodos = () => request.get<any>(`${API_BASENAME}todos/1`);
