import { IProductStore } from '@/types/store';
import { create } from 'zustand';
import { fetchProducts } from '../services/productService';


export const useProductStore = create<IProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  limit: 12,

  fetchProducts: async () => {
    const { limit } = get();
    set({ loading: true, error: null });

    try {
      const products = await fetchProducts(limit);
      set({ products, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  setLimit: limit => {
    set({ limit });
    get().fetchProducts();
  },
}));
