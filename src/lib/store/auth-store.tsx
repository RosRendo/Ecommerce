'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_0429_vance',
  email: 'marcus.vance@atelier-prive.com',
  name: 'Marcus Vance',
  tier: 'Atelier Privé Collector',
  memberNumber: 'No. 0429',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate user from localStorage or provide default mock session
  useEffect(() => {
    try {
      const stored = localStorage.getItem('atelier_user');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Pre-seed authenticated Marcus Vance for immersive preview, but allow full logout
        setUser(DEFAULT_USER);
        localStorage.setItem('atelier_user', JSON.stringify(DEFAULT_USER));
      }
    } catch {
      setUser(DEFAULT_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, _password?: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid client email address.' };
    }

    const loggedInUser: UserProfile = {
      id: `usr_${Date.now()}`,
      email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      tier: 'Atelier Privé Collector',
      memberNumber: `No. ${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setUser(loggedInUser);
    localStorage.setItem('atelier_user', JSON.stringify(loggedInUser));
    return { success: true };
  };

  const register = async (name: string, email: string, _password?: string) => {
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Please provide your full legal name.' };
    }
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid client email address.' };
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      email,
      name,
      tier: 'Atelier Privé Collector',
      memberNumber: `No. ${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setUser(newUser);
    localStorage.setItem('atelier_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('atelier_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
