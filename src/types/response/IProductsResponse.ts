import { IProduct } from '../model';
import { IResponse } from './IResponse';

export interface IProductsResponse extends IResponse {
  products: IProduct[];
}
