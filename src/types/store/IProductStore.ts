import { IProduct } from '../model';

export interface IProductStore {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  limit: number;

  setLimit: (limit: number) => void;
  fetchProducts: () => Promise<void>;
}
