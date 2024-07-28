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
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [avatar, setAvatar] = useLocalStorage("avatar", null);

  const login = (router, username:string, userId:string, token:string,currAvatar:string) => {
    setIsLoggedIn(true);
    setUsername(username)
    setUserId(userId)
    setToken(token)
    setAvatar(currAvatar)
    console.log('[AuthProvider]: Login!',currAvatar)
    
    console.log('[AuthProvider]: Login!')
    router.push('/');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setToken(null);
  };

  const authValue = useMemo(
    () => ({
      isLoggedIn,
      username,
      login,
      logout,
      userId,
      avatar,
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