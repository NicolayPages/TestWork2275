import { create } from 'zustand';

import { ICatchError } from '@/types/model';
import { IProductStore } from '@/types/store';

import { productService } from '../services/productService';

const { getProducts } = productService;

export const useProductStore = create<IProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  limit: 12,

  fetchProducts: async () => {
    const { limit } = get();
    set({ loading: true, error: null });

    try {
      const products = await getProducts(limit);
      set({ products, loading: false });
    } catch (err: unknown) {
      set({ error: (err as ICatchError).message, loading: false });
    }
  },
  setLimit: limit => {
    set({ limit });
    get().fetchProducts();
  },
}));
