import { GET_ME } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  userName: string;
  email: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  initializing: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  const { data, refetch } = useQuery(GET_ME, {
    skip: !token,
  });

  useEffect(() => {
    const t = typeof window !== undefined ? localStorage.getItem('token') : null;
    setToken(t);
    setInitializing(false);

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') setToken(e.newValue)
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    refetch();
  }, [refetch]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user: data?.me ?? null, isAuthenticated: !!token, initializing, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}