import { Role } from '../types';

export interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  role: Role;
  setRole: (role: Role) => void;
}
