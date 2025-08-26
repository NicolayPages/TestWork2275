import { IAuth } from '../model';

export interface IAuthRequest extends IAuth {
  expiresInMins?: number;
}
