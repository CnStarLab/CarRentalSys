'use client'
import { useRouter } from 'next/navigation';
import { createContext, useState, useContext, useMemo } from 'react';
import { useLocalStorage } from "./UseLocalStorage";

// 创建AuthContext
const AuthContext = createContext();

// 创建AuthProvider组件
export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isloggedin",false);
  const [username, setUsername] = useLocalStorage("user", null);

  const login = (router, username:string) => {
    setIsLoggedIn(true);
    setUsername(username)
    console.log('[AuthProvider]: Login!')
    router.push('/');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  const authValue = useMemo(
    () => ({
      isLoggedIn,
      username,
      login,
      logout
    }),
    [username]
  );

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// create useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};