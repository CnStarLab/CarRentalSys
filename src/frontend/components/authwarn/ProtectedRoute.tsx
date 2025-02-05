'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext'; // 修改为你的 AuthContext 路径
import { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ProtectedRouteProps, AuthContextType } from '../../app/interface'

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth() as AuthContextType;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn && pathname !== '/' && pathname !== '/user/login' && pathname !== '/browser' && pathname !== '/user/register'&& pathname !== '/service/health') {
      router.push('/service/authwarn');
    }
  }, [isLoggedIn, router, pathname]);

  return children;
};
