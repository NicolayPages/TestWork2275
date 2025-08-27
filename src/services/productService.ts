import { errors } from '@/constants/erorrs';
import { IProduct } from '@/types/model';
import { IProductsResponse } from '@/types/response';
import axios from 'axios';
import { api } from './api/axiosInstanse';

export const fetchProducts = async (limit: number): Promise<IProduct[]> => {
  try {
    const response = await api.get<IProductsResponse>('/products', {
      params: { limit },
    });
    return response.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    throw new Error(errors.response);
  }
};
