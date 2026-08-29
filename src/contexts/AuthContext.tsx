import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { User } from '../types/auth';

interface StoredUser {
  user: User;
  passwordHash: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const USERS_KEY = 'monarch-prototype-users';
const SESSION_KEY = 'monarch-prototype-session';
const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUsers(): StoredUser[] {
  try {
    const stored = window.localStorage.getItem(USERS_KEY);
    return stored ? (JSON.parse(stored) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

async function hashPassword(password: string) {
  const bytes = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Protótipo local: substituir este contexto por autenticação real via backend/API antes de produção.
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = window.localStorage.getItem(SESSION_KEY);
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    const passwordHash = await hashPassword(password);
    const match = readStoredUsers().find((entry) => entry.user.email === email.trim().toLowerCase() && entry.passwordHash === passwordHash);
    if (!match) return false;
    setUser(match.user);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(match.user));
    return true;
  };

  const register = async (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readStoredUsers();
    if (users.some((entry) => entry.user.email === normalizedEmail)) return false;
    const newUser: User = { id: `prototype-${Date.now()}`, name: name.trim(), email: normalizedEmail };
    const nextUsers = [...users, { user: newUser, passwordHash: await hashPassword(password) }];
    window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
