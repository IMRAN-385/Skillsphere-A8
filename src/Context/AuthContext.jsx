'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signOut } from '@/lib/auth-client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending } = useSession();
  const [demoUser, setDemoUser] = useState(null);

  useEffect(() => {
    // Check for demo user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setDemoUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing demo user:', e);
      }
    }
  }, []);

  const user = session?.user || demoUser;

  const loginDemoUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setDemoUser(userData);
  };

  const logout = async () => {
    await signOut();
    localStorage.removeItem('user');
    setDemoUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading: isPending,
      logout,
      loginDemoUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}