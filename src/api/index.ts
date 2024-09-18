import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T;
}

const API_URL = process.env.API_URL;
const API_BASENAME = process.env.API_BASENAME;
const API_KEY = process.env.API_KEY;

const axiosConfig: AxiosRequestConfig = {
  baseURL: `${API_URL}`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(new Error(`Request error: ${error.message}`));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(new Error(`Response error: ${error.message}`));
  }
);

const fetchApi = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url);
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('Unexpected error');
    }
  }
};

const api = {
  getData: () =>
    fetchApi<any>(`${API_BASENAME}todos/1`)
};

export default api;
