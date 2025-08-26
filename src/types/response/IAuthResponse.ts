import { IUser } from '../model';

export interface IAuthResponse extends IUser {
  accessToken: string;
  refreshToken: string;
}
