import { Role } from '../types';

export interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  role: Role;
  setRole: (role: Role) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
}
