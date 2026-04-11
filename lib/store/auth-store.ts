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
  logout: (isBroadcast?: boolean) => void;
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

      logout: (isBroadcast = false) => {
        cookies.remove("elevate_token");
        set({ user: null, token: null, isAuthenticated: false });

        // Broadcast to other tabs to logout instantly
        if (!isBroadcast && typeof window !== "undefined") {
          const authChannel = new BroadcastChannel("elevate_auth_channel");
          authChannel.postMessage("LOGOUT");
          authChannel.close();
        }
      },

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: "elevate-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Global Listener for cross-tab synchronization
if (typeof window !== "undefined") {
  const authChannel = new BroadcastChannel("elevate_auth_channel");
  authChannel.onmessage = (event) => {
    if (event.data === "LOGOUT") {
      useAuthStore.getState().logout(true); // pass true to avoid infinite loops
      // Optional: redirect to signin
      if (!window.location.pathname.includes("/signin")) {
        window.location.href =
          "/signin?message=Logged out successfuly.";
      }
    }
  };
}
