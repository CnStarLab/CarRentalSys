'use client'
import router from 'next/router';
import { createContext, useState, useContext } from 'react';

// 创建AuthContext
const AuthContext = createContext();

// 创建AuthProvider组件
export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const login = (router, username:string) => {
    setIsLoggedIn(true);
    setUsername(username)
    console.log('[AuthProvider]: Login!')
    router.push('/');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const authValue = {
    isLoggedIn,
    username,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// create useAuth hook
export const useAuth = () => useContext(AuthContext);