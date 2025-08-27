import { IUser } from '../model';
import { IAuthRequest } from '../request';

export interface IAuthStore {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (credentials: IAuthRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}
