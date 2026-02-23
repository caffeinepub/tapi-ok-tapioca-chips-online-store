import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useActor } from '../hooks/useActor';
import type { UserProfile } from '../backend';

interface User {
  email: string;
  name: string;
}

interface InternalAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const InternalAuthContext = createContext<InternalAuthContextType | undefined>(undefined);

export function InternalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { actor } = useActor();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('internalAuthUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('internalAuthUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Retrieve stored credentials
    const storedCredentials = localStorage.getItem('internalAuthCredentials');
    if (!storedCredentials) {
      throw new Error('No account found. Please sign up first.');
    }

    const credentials = JSON.parse(storedCredentials);
    if (credentials.email !== email || credentials.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Retrieve user profile from backend
    if (actor) {
      try {
        const profile = await actor.getCallerUserProfile();
        if (profile) {
          const userData: User = {
            email: profile.email,
            name: profile.name,
          };
          setUser(userData);
          localStorage.setItem('internalAuthUser', JSON.stringify(userData));
        } else {
          // Fallback to stored credentials if backend profile doesn't exist
          const userData: User = {
            email: credentials.email,
            name: credentials.name,
          };
          setUser(userData);
          localStorage.setItem('internalAuthUser', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Failed to fetch user profile from backend:', error);
        // Fallback to stored credentials
        const userData: User = {
          email: credentials.email,
          name: credentials.name,
        };
        setUser(userData);
        localStorage.setItem('internalAuthUser', JSON.stringify(userData));
      }
    } else {
      // If actor is not available, use stored credentials
      const userData: User = {
        email: credentials.email,
        name: credentials.name,
      };
      setUser(userData);
      localStorage.setItem('internalAuthUser', JSON.stringify(userData));
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    // Check if account already exists
    const storedCredentials = localStorage.getItem('internalAuthCredentials');
    if (storedCredentials) {
      const credentials = JSON.parse(storedCredentials);
      if (credentials.email === email) {
        throw new Error('An account with this email already exists');
      }
    }

    // Store credentials in localStorage
    const credentials = { email, password, name };
    localStorage.setItem('internalAuthCredentials', JSON.stringify(credentials));

    // Save user profile to backend
    if (actor) {
      try {
        const profile: UserProfile = { email, name };
        await actor.saveCallerUserProfile(profile);
      } catch (error) {
        console.error('Failed to save user profile to backend:', error);
        // Continue with signup even if backend save fails
      }
    }

    // Set user state
    const userData: User = { email, name };
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
