import { create } from "zustand";

type User = {
  email: string;
  password: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (email, password) => {
    const res = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    localStorage.setItem("token", data.accessToken);

    set({ user: data.user, token: data.accessToken });
    return true;
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
