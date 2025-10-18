import { authStore } from '../store/auth.store';
import { Role } from '../types';

export function useAuth() {
  const {
    isAuthenticated,
    role,
    userId,
    setIsAuthenticated,
    setRole,
    setUserId,
  } = authStore((state) => state);

  const auth = () => setIsAuthenticated(true);
  const exit = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };
  const isAdmin = role === Role.ADMIN;

  return {
    isAuthenticated,
    role,
    userId,
    setRole,
    setUserId,
    auth,
    exit,
    isAdmin,
  };
}
