
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister, logoutUser as apiLogout, getAuthenticatedUserFromToken, User } from '@/lib/auth';
import type { LoginFormValues, RegisterFormValues } from '@/lib/schemas';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginFormValues) => Promise<void>;
  register: (details: RegisterFormValues) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkUserStatus = useCallback(() => {
    setIsLoading(true);
    const { user: foundUser, token: foundToken } = getAuthenticatedUserFromToken();
    if (foundUser && foundToken) {
      setUser(foundUser);
      setToken(foundToken);
    } else {
      setUser(null);
      setToken(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkUserStatus();
    // Optional: Add event listener for storage changes to sync across tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'authToken') {
        checkUserStatus();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, [checkUserStatus]);

  const login = async (credentials: LoginFormValues) => {
    setIsLoading(true);
    const { user: loggedInUser, token: authToken } = await apiLogin(credentials);
    setUser(loggedInUser);
    setToken(authToken);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const register = async (details: RegisterFormValues) => {
    setIsLoading(true);
    const { user: registeredUser, token: authToken } = await apiRegister(details);
    setUser(registeredUser);
    setToken(authToken);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const logout = async () => {
    setIsLoading(true);
    await apiLogout();
    setUser(null);
    setToken(null);
    setIsLoading(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
