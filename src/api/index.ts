import request from '@/api/axios';
import { UploadResponse } from '@/types/general';
import { Material } from '@/types/spatialData';

export const getDictionary = (dictionary: string) =>
  request.get<any>(`apimap/api/Dictionary/${dictionary}`);

export const getDictionaryFundsettings = (dictionary: string) =>
  request.get<any>(`apimap/api/Dictionary/fundsettings/${dictionary}`);

export const getSpatialData = (uuid: string) =>
  request.get<Material>(`apimap/api/Material/fetch/${uuid}`);

export const postSpatialData = (data: Material) =>
  request.post('apimap/api/Material', data);

export const putSpatialData = (uuid: string, data: Partial<Material>) =>
  request.put(`apimap/api/Material/${uuid}`, data);

export const deleteSpatialData = (uuid: string) =>
  request.detele(`apimap/api/Material/${uuid}`);

export const postToCart = (data: { materialId: string; quantity: number }) =>
  request.post(`apiorders/api/ShoppingCart/items`, data);

export const getCurrentUser = () => request.get(`apimap/api/me`);

export const uploadRepoFile = (data: FormData) =>
  request.post<UploadResponse[], FormData>(`apiorders/Repo/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
