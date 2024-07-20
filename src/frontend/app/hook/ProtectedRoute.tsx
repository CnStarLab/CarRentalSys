'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext'; // 修改为你的 AuthContext 路径
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
  
    useEffect(() => {
        if (!isLoggedIn && pathname !== '/' && pathname !== '/login' && pathname !== '/authwarn' && pathname !== '/register') {
            router.push('/authwarn');
        }
    }, [isLoggedIn, router, pathname]);
  
    return children;
};
