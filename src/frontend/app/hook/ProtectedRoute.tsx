'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext'; // 修改为你的 AuthContext 路径
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    useEffect(() => {
      if (isClient) {
        if (!isLoggedIn && pathname !== '/' && pathname !== '/login') {
          router.push('/');
        }
      }
    }, [isClient, isLoggedIn, router]);
  
    return children;
};
