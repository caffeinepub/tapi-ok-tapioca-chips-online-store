import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useActor } from '../hooks/useActor';

interface User {
  id?: number;
  username: string;
  email: string;
  name: string;
}

interface InternalAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
}

const InternalAuthContext = createContext<InternalAuthContextType | undefined>(undefined);

// Simple hash function for password (not cryptographically secure, but better than plaintext)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'tapi-ok-salt-2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function InternalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { actor } = useActor();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('internalAuthUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('internalAuthUser');
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    const trimmedUsername = username.trim().toLowerCase();
    if (!trimmedUsername || !password) {
      throw new Error('Username and password are required');
    }

    // Look up stored credentials by username
    const credKey = `internalAuthCred_${trimmedUsername}`;
    const storedCred = localStorage.getItem(credKey);

    if (!storedCred) {
      throw new Error('No account found with this username. Please sign up first.');
    }

    const cred = JSON.parse(storedCred) as {
      username: string;
      email: string;
      displayName: string;
      passwordHash: string;
      accountId?: number;
    };

    const inputHash = await hashPassword(password);
    if (cred.passwordHash !== inputHash) {
      throw new Error('Invalid username or password');
    }

    const userData: User = {
      id: cred.accountId,
      username: cred.username,
      email: cred.email,
      name: cred.displayName,
    };

    setUser(userData);
    localStorage.setItem('internalAuthUser', JSON.stringify(userData));
  };

  const signup = async (username: string, email: string, password: string, displayName: string) => {
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedDisplayName = displayName.trim();

    if (!trimmedUsername || !trimmedEmail || !password || !trimmedDisplayName) {
      throw new Error('All fields are required');
    }

    if (trimmedUsername.length < 4 || trimmedUsername.length > 20) {
      throw new Error('Username must be between 4 and 20 characters');
    }

    if (/[./]/.test(trimmedUsername)) {
      throw new Error('Username cannot contain . or /');
    }

    // Check if username already taken locally
    const credKey = `internalAuthCred_${trimmedUsername}`;
    if (localStorage.getItem(credKey)) {
      throw new Error('Username already taken. Please choose a different username.');
    }

    // Register in backend
    let accountId: number | undefined;
    if (actor) {
      try {
        const id = await actor.createUserAccount(trimmedUsername, trimmedEmail, trimmedDisplayName);
        accountId = Number(id);
      } catch (error: any) {
        const msg = error?.message || String(error);
        if (msg.includes('Username already exists')) {
          throw new Error('Username already taken. Please choose a different username.');
        }
        // If backend fails for other reasons, still allow local registration
        console.warn('Backend registration failed, continuing with local storage:', msg);
      }
    }

    // Hash password and store credentials
    const passwordHash = await hashPassword(password);
    const cred = {
      username: trimmedUsername,
      email: trimmedEmail,
      displayName: trimmedDisplayName,
      passwordHash,
      accountId,
    };
    localStorage.setItem(credKey, JSON.stringify(cred));

    const userData: User = {
      id: accountId,
      username: trimmedUsername,
      email: trimmedEmail,
      name: trimmedDisplayName,
    };

    setUser(userData);
    localStorage.setItem('internalAuthUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('internalAuthUser');
  };

  return (
    <InternalAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </InternalAuthContext.Provider>
  );
}

export function useInternalAuth() {
  const context = useContext(InternalAuthContext);
  if (context === undefined) {
    throw new Error('useInternalAuth must be used within an InternalAuthProvider');
  }
  return context;
}
