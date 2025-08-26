import { IAuthResponse } from './IAuthResponse';

export interface IRefreshResponse
  extends Pick<IAuthResponse, 'accessToken' | 'refreshToken'> {}
