import request from '@/api/axios';
import { Material } from '@/types/spatialData';
// import { CreateSpatialData, SpatialData } from '@/types/spatialData';

export const getDictionary = (dictionary: string) => request.get<any>(`Dictionary/${dictionary}`);

export const getDictionaryFundsettings = (dictionary: string) => request.get<any>(`Dictionary/fundsettings/${dictionary}`);

export const getSpatialData = (uuid: string) => request.get<Material>(`Material/fetch/${uuid}`);

export const postSpatialData = (data: Material) => request.post('Material', data);

export const putSpatialData = (uuid: string, data: Partial<Material>) => request.put(`Material/${uuid}`, data);

export const deleteSpatialData = (uuid: string) => request.detele(`Material/${uuid}`);

export const postToCart = (data: { materialId: string, quantity: number }) => request.post(`ShoppingCart/items`, data);

export const getCurrentUser = () => request.get(`me`);
