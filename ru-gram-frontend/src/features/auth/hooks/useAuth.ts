import { authStore } from '../store/auth.store';
import { Role } from '../types';

export function useAuth() {
  const { isAuthenticated, role, setIsAuthenticated, setRole } = authStore(
    (state) => state,
  );

  const auth = () => setIsAuthenticated(true);
  const exit = () => setIsAuthenticated(false);
  const isAdmin = role === Role.ADMIN;

  return { isAuthenticated, role, setRole, auth, exit, isAdmin };
}
