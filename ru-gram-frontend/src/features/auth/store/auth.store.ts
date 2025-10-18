import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Role } from '../types';
import { AuthStore } from './auth.types';

export const authStore = create(
  persist<AuthStore>(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      role: Role.USER,
      setRole: (role) => set({ role }),
      userId: null,
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
