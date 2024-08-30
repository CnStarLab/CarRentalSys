'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext'; // 修改为你的 AuthContext 路径
import { useEffect, ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ProtectedRouteProps, AuthContextType } from '../app/interface';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth() as AuthContextType;
  const router = useRouter();
  const pathname = usePathname();
  const [renderChildren, setRenderChildren] = useState(false);

  // useEffect(() => {
  //   if (!isLoggedIn && pathname !== '/' && pathname !== '/login' && pathname !== '/authwarn' && pathname !== '/register' && pathname !== '/health') {
  //     router.push('/authwarn');
  //   } else {
  //     setRenderChildren(true);
  //   }
  // }, [isLoggedIn, router, pathname]);

  // return renderChildren ? children : null;
  return children;
};