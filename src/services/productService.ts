import { errors } from '@/constants/erorrs';
import { IProduct } from '@/types/model';
import { IProductsResponse } from '@/types/response';
import axios from 'axios';
import { api } from './api/axiosInstanse';

const PRODUCTS_URL = '/products';

export const fetchProducts = async (limit: number): Promise<IProduct[]> => {
  try {
    const response = await api.get<IProductsResponse>(PRODUCTS_URL, {
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
