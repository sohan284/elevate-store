import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../services/auth-service";
import { cookies } from "../utils";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  setCredentials: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setCredentials: (user, token) => {
        // Save to cookie for API interceptor and security
        cookies.set("elevate_token", token);
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        cookies.remove("elevate_token");
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null
      })),
    }),
    {
      name: "elevate-auth-storage",
      // Only persist the user object, token is handled by cookies separately for interceptors
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
